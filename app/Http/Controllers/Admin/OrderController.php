<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['user', 'product', 'payments', 'addons']);

        if ($request->search) {
            $query->whereHas('user', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            })->orWhereHas('product', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return Inertia::render('admin/orders/index', [
            'orders' => $query->latest()->get(),
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,dp_paid,process,done,cancel'
        ]);

        $order->update(['status' => $request->status]);

        return back()->with('success', 'Status pesanan berhasil diperbarui.');
    }

    public function destroy(Order $order)
    {
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

        return back()->with('success', 'Pesanan berhasil dihapus.');
    }
}
