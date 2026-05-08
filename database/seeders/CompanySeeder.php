<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Company::create([
            'name' => 'Sablon Jasa Kita',
            'description' => 'Jasa Sablon Terpercaya dengan Kualitas Terbaik dan Harga Bersahabat.',
            'phone' => '08123456789',
            'email' => 'info@sablonjasakita.com',
            'address' => 'Jl. Merdeka No. 123, Jakarta',
            'instagram' => '@sablonjasakita',
            'facebook' => 'Sablon Jasa Kita'
        ]);
    }
}
