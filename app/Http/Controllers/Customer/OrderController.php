<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('customer/orders/index', [
            'orders' => Order::with(['product', 'payments', 'review'])
                ->where('user_id', Auth::id())
                ->latest()
                ->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'qty' => 'required|integer|min:32',
            'note' => 'nullable|string',
            'design' => 'nullable|image|max:5120',
            'addon_ids' => 'nullable|array',
            'addon_ids.*' => 'exists:addons,id',
            'addon_notes' => 'nullable|array',
            'addon_notes.*' => 'nullable|string|max:500',
        ]);

        $product = Product::find($request->product_id);
        $base_price = $product->price;

        $addons = \App\Models\Addon::whereIn('id', $request->addon_ids ?? [])->get();
        $addons_price = $addons->sum('price');

        $total_price = ($base_price + $addons_price) * $request->qty;

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

        $addonNotes = $request->addon_notes ?? [];
        foreach ($addons as $addon) {
            $order->addons()->attach($addon->id, [
                'price' => $addon->price,
                'notes' => $addonNotes[$addon->id] ?? null,
            ]);
        }

        return redirect()->route('orders.show', $order->id);
    }

    public function show(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('customer/orders/show', [
            'order' => $order->load(['product', 'payments', 'review', 'addons'])
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

    public function destroy(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        // Prevent deletion if there are any approved payments
        if ($order->payments()->where('status', 'approved')->exists()) {
            return back()->with('error', 'Pesanan tidak dapat dihapus karena sudah ada pembayaran yang disetujui.');
        }

        // delete design file if exists
        if ($order->design) {
            Storage::disk('public')->delete($order->design);
        }

        // delete payment proofs and payments
        foreach ($order->payments as $payment) {
            if ($payment->proof) {
                Storage::disk('public')->delete($payment->proof);
            }
            $payment->delete();
        }

        // detach addons
        $order->addons()->detach();

        $order->delete();

        return redirect()->route('orders.index')->with('success', 'Pesanan berhasil dihapus.');
    }
}
