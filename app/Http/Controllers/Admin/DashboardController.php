<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total_orders' => Order::count(),
                'total_revenue' => Payment::where('status', 'approved')->sum('amount'),
                'pending_payments' => Payment::where('status', 'pending')->count(),
                'total_customers' => User::where('role', 'customer')->count(),
            ],
            'recent_orders' => Order::with(['user', 'product'])->latest()->take(5)->get(),
        ]);
    }
}
