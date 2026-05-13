<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
        ]);

        $order = Order::findOrFail($request->order_id);

        // Check if order belongs to user and is done
        if ($order->user_id !== Auth::id()) {
            return back()->with('error', 'Anda tidak memiliki akses ke pesanan ini.');
        }

        if ($order->status !== 'done') {
            return back()->with('error', 'Anda hanya dapat memberikan ulasan setelah pesanan selesai.');
        }

        // Check if already reviewed
        if ($order->review()->exists()) {
            return back()->with('error', 'Anda sudah memberikan ulasan untuk pesanan ini.');
        }

        Review::create([
            'user_id' => Auth::id(),
            'product_id' => $order->product_id,
            'order_id' => $order->id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return back()->with('success', 'Terima kasih atas ulasan Anda!');
    }
}
