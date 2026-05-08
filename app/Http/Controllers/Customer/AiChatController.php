<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiChatController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'history' => 'nullable|array'
        ]);

        $apiKey = env('GEMINI_API_KEY');

        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={$apiKey}";
        // Fetch dynamic product list
        $products = \App\Models\Product::all()->map(function ($p) {
            return "- {$p->name}: Rp " . number_format($p->price, 0, ',', '.');
        })->implode("\n");

        // Fetch User Context
        $user = auth()->user();
        $latestOrder = \App\Models\Order::where('user_id', $user->id)->with('product')->latest()->first();
        
        $orderContext = "Customer belum memiliki pesanan.";
        if ($latestOrder) {
            $orderContext = "Customer memiliki pesanan terbaru: ID #{$latestOrder->id}, Produk: {$latestOrder->product->name}, Qty: {$latestOrder->qty}, Status: {$latestOrder->status}, Total: Rp " . number_format($latestOrder->total_price, 0, ',', '.');
        }

        $systemPrompt = "Anda adalah CS AI dari MOBSTER INDONESIA. Nama Anda Mobie.
        
        DATA CUSTOMER SAAT INI:
        Nama: {$user->name}
        {$orderContext}

        DAFTAR PRODUK KAMI:
        {$products}
        
        INSTRUKSI UTAMA:
        1. Sapa customer dengan namanya ({$user->name}).
        2. Gunakan DATA CUSTOMER di atas untuk menjawab tentang pesanan secara spesifik.
        3. Karakter: Profesional, ramah, dan keren.
        4. Sistem: DP 50%, pelunasan saat siap kirim.
        5. Gunakan bahasa santai (Kakak/Bosku) dan format **bold** untuk poin penting.
        6. Jawab secara lengkap dan jangan menggantung.";

        $contents = [];

        // Add system instruction as part of history or first message if needed
        // For Gemini 1.5 Flash, system instruction is better placed in system_instruction field but we'll use history for simplicity in this version

        if ($request->history) {
            foreach ($request->history as $chat) {
                $contents[] = [
                    'role' => $chat['role'] === 'ai' ? 'model' : 'user',
                    'parts' => [['text' => $chat['text']]]
                ];
            }
        }

        $contents[] = [
            'role' => 'user',
            'parts' => [['text' => $request->message . "\n\n(Ingat instruksi sistem: " . $systemPrompt . ")"]]
        ];

        try {
            $response = Http::withoutVerifying()->post($url, [
                'contents' => $contents,
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 1000,
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? "Maaf Kak, Mobie lagi agak pusing. Bisa tanya lagi?";
                return response()->json(['reply' => $reply]);
            }

            // Return detailed error for debugging
            $errorDetail = $response->json()['error']['message'] ?? 'API Error';
            return response()->json(['reply' => "Error API: " . $errorDetail], 500);
        } catch (\Exception $e) {
            return response()->json(['reply' => "Error Koneksi: " . $e->getMessage()], 500);
        }
    }
}
