<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = \App\Models\User::where('email', 'customer1@gmail.com')->first();
        $product = \App\Models\Product::first();

        if ($user && $product) {
            $qty = 24; // 2 lusin
            $totalPrice = $product->price * $qty;
            $dpAmount = $totalPrice * 0.5;

            $order = \App\Models\Order::create([
                'user_id' => $user->id,
                'product_id' => $product->id,
                'qty' => $qty,
                'total_price' => $totalPrice,
                'status' => 'dp_paid',
                'note' => 'Warna kaos hitam, ukuran campur L dan XL.'
            ]);

            // Create DP Payment
            \App\Models\Payment::create([
                'order_id' => $order->id,
                'type' => 'dp',
                'amount' => $dpAmount,
                'status' => 'approved',
                'paid_at' => now(),
            ]);
        }
    }
}
