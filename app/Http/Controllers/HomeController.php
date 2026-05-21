<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'products' => Product::with('images')->latest()->take(6)->get(),
            'reviews' => Review::with(['user', 'product'])->latest()->take(6)->get()
            , 'company' => Company::first()
        ]);
    }
}
