<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryAddonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Category::create(['name' => 'Sablon + Kaos']);
        \App\Models\Category::create(['name' => 'Hanya Sablon']);

        \App\Models\Addon::create(['name' => 'Tambahan Warna', 'description' => 'Sebutkan warna yang diinginkan', 'price' => 2000]);
        \App\Models\Addon::create(['name' => 'Sablon Lengan', 'description' => 'Kiri / Kanan / Keduanya', 'price' => 5000]);
        \App\Models\Addon::create(['name' => 'Lengan Panjang', 'description' => null, 'price' => 5000]);
        \App\Models\Addon::create(['name' => 'Ukuran Kaos XXL', 'description' => null, 'price' => 10000]);
    }
}
