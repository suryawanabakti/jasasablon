<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('images');

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        if ($request->sortBy) {
            switch ($request->sortBy) {
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                default:
                    $query->latest();
                    break;
            }
        } else {
            $query->latest();
        }

        return Inertia::render('admin/products/index', [
            'products' => $query->get(),
            'filters' => $request->only(['search', 'sortBy'])
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/products/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => '/images/mockup.png'
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $file) {
                $path = '/storage/' . $file->store('products', 'public');

                if ($index === 0) {
                    $product->update(['image' => $path]);
                }

                $product->images()->create([
                    'image' => $path,
                    'is_primary' => $index === 0
                ]);
            }
        } else {
            $product->images()->create([
                'image' => '/images/mockup.png',
                'is_primary' => true
            ]);
        }

        return redirect()->route('admin.products')->with('success', 'Produk berhasil ditambahkan.');
    }

    public function show(Product $product)
    {
        return Inertia::render('admin/products/show', [
            'product' => $product->load('images')
        ]);
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/products/edit', [
            'product' => $product->load('images')
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $file) {
                $path = '/storage/' . $file->store('products', 'public');

                // If product currently has only the default placeholder, replace it
                if ($product->image === '/images/mockup.png') {
                    $product->update(['image' => $path]);
                }

                $product->images()->create([
                    'image' => $path,
                    'is_primary' => false
                ]);
            }
        }

        return redirect()->route('admin.products')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return back()->with('success', 'Produk berhasil dihapus.');
    }

    public function destroyImage(ProductImage $image)
    {
        $product = $image->product;

        // Don't delete if it's the last image
        if ($product->images()->count() <= 1) {
            return back()->with('error', 'Produk harus memiliki setidaknya satu gambar.');
        }

        $imagePath = $image->image;
        $image->delete();

        // If the deleted image was the main one, update to the next available image
        if ($product->image === $imagePath) {
            $nextImage = $product->images()->first();
            $product->update(['image' => $nextImage ? $nextImage->image : '/images/mockup.png']);
        }

        return back()->with('success', 'Gambar berhasil dihapus.');
    }
}
