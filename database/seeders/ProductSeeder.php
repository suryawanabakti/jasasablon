<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Almamater',
                'description' => 'Jas almamater berkualitas tinggi untuk kampus, sekolah, atau organisasi.',
                'price' => 135000,
                'image' => '/images/mockup.png',
            ],
            [
                'name' => 'Raglan',
                'description' => 'Kaos raglan dengan kombinasi warna lengan yang kontras dan stylish.',
                'price' => 75000,
                'image' => '/images/mockup.png',
            ],
            [
                'name' => 'PDH',
                'description' => 'Pakaian Dinas Harian dengan desain formal dan bahan yang nyaman.',
                'price' => 125000,
                'image' => '/images/hero.png',
            ],
            [
                'name' => 'Jersey',
                'description' => 'Jersey olahraga dengan teknik sublimasi full print berkualitas.',
                'price' => 110000,
                'image' => '/images/hero.png',
            ],
            [
                'name' => 'Rompi',
                'description' => 'Rompi custom untuk berbagai kegiatan lapangan atau komunitas.',
                'price' => 95000,
                'image' => '/images/mockup.png',
            ],
            [
                'name' => 'Wangky',
                'description' => 'Kaos wangky (polo) dengan kerah dan bahan lacoste premium.',
                'price' => 85000,
                'image' => '/images/mockup.png',
            ],
            [
                'name' => 'Hoodie',
                'description' => 'Hoodie hangat dengan bahan fleece tebal dan sablon custom.',
                'price' => 150000,
                'image' => '/images/hero.png',
            ],
            [
                'name' => 'Kaos Sablon',
                'description' => 'Kaos katun combed 30s premium dengan sablon awet dan detail.',
                'price' => 65000,
                'image' => '/images/mockup.png',
            ],
            [
                'name' => 'Coach Jacket',
                'description' => 'Jaket coach (windbreaker) yang ringan dan tahan angin.',
                'price' => 145000,
                'image' => '/images/hero.png',
            ],
            [
                'name' => 'Jaket',
                'description' => 'Berbagai jenis jaket custom (bomber, hoodie, dll) sesuai pesanan.',
                'price' => 165000,
                'image' => '/images/hero.png',
            ],
            [
                'name' => 'Polo Shirt',
                'description' => 'Polo shirt formal-casual dengan bordir atau sablon logo.',
                'price' => 80000,
                'image' => '/images/mockup.png',
            ],
        ];

        foreach ($products as $productData) {
            $product = \App\Models\Product::updateOrCreate(
                ['name' => $productData['name']],
                $productData
            );

            // Clear existing images to avoid duplicates during re-seeding
            $product->images()->delete();

            // Add multiple images for each product
            $images = [
                $productData['image'], // Use the main image
                '/images/hero.png',    // Add a secondary image
                '/images/mockup.png',  // Add a tertiary image
            ];

            foreach ($images as $index => $imagePath) {
                $product->images()->create([
                    'image' => $imagePath,
                    'is_primary' => $index === 0,
                ]);
            }
        }
    }
}
