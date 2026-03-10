<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasFactory;

    // Menentukan kolom mana saja yang boleh diisi secara massal
    protected $fillable = [
        'product_id',
        'size',
        'price',
        'usage'
    ];

    // Relasi balik ke Product (Setiap varian dimiliki oleh satu produk)
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
