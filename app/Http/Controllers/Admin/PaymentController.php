<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/payments/index', [
            'payments' => Payment::with(['order.user', 'order.product'])->latest()->get()
        ]);
    }

    public function approve(Payment $payment)
    {
        $payment->update([
            'status' => 'approved',
            'paid_at' => now()
        ]);

        // If it's a DP payment, update order status to dp_paid
        if ($payment->type === 'dp') {
            $payment->order->update(['status' => 'dp_paid']);
        }

        return back()->with('success', 'Pembayaran telah disetujui.');
    }

    public function reject(Payment $payment)
    {
        $payment->update(['status' => 'rejected']);
        return back()->with('success', 'Pembayaran ditolak.');
    }
}
