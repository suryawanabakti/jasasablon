<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('customer/orders/index', [
            'orders' => Order::with(['product', 'payments'])
                ->where('user_id', Auth::id())
                ->latest()
                ->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'qty' => 'required|integer|min:1',
            'note' => 'nullable|string',
            'design' => 'nullable|image|max:5120', // Max 5MB
        ]);

        $product = Product::find($request->product_id);
        $total_price = $product->price * $request->qty;

        $design_path = null;
        if ($request->hasFile('design')) {
            $design_path = $request->file('design')->store('designs', 'public');
        }

        $order = Order::create([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
            'qty' => $request->qty,
            'total_price' => $total_price,
            'status' => 'pending',
            'note' => $request->note,
            'design' => $design_path,
        ]);

        return redirect()->route('orders.show', $order->id);
    }

    public function show(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('customer/orders/show', [
            'order' => $order->load(['product', 'payments'])
        ]);
    }

    public function pay(Request $request, Order $order)
    {
        $request->validate([
            'type' => 'required|in:dp,pelunasan',
            'amount' => 'required|numeric|min:1',
            'proof' => 'required|image|max:2048',
        ]);

        $proof_path = $request->file('proof')->store('payments', 'public');

        Payment::create([
            'order_id' => $order->id,
            'type' => $request->type,
            'amount' => $request->amount,
            'proof' => $proof_path,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Bukti pembayaran berhasil diunggah. Menunggu verifikasi admin.');
    }
}
