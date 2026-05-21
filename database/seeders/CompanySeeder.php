<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::create([
            'name' => 'Mobster',
            'description' => 'Jasa Sablon Terpercaya dengan Kualitas Terbaik dan Harga Bersahabat.',
            'phone' => '08123456789',
            'email' => 'info@sablonjasakita.com',
            'address' => 'Jl. Merdeka No. 123, Jakarta',
            'instagram' => '@mobster',
            'facebook' => 'Mobster',
        ]);
    }
}
