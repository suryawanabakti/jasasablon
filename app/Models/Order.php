<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'qty',
        'total_price',
        'status',
        'note',
        'design'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    // ambil DP
    public function dp()
    {
        return $this->hasOne(Payment::class)->where('type', 'dp');
    }

    // ambil pelunasan
    public function pelunasan()
    {
        return $this->hasOne(Payment::class)->where('type', 'pelunasan');
    }

    public function getRemainingBalanceAttribute()
    {
        $paid = $this->payments()->where('status', 'approved')->sum('amount');
        return $this->total_price - $paid;
    }

    public function getIsDpPaidAttribute()
    {
        return $this->payments()
            ->where('type', 'dp')
            ->where('status', 'approved')
            ->exists();
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }

    public function addons()
    {
        return $this->belongsToMany(Addon::class, 'order_addons')
            ->withPivot('price', 'notes')
            ->withTimestamps();
    }
}
