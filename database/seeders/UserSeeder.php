<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => 'Admin Sablon',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        \App\Models\User::create([
            'name' => 'Customer Satu',
            'email' => 'customer1@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'customer'
        ]);
    }
}
