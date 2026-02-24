<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'category_id',
        'title',
        'author',
        'isbn',
        'price',
        'stock',
        'status',
        'description',
        'cover_image',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function isAvailable(): bool
    {
        return $this->status === 'disponible' && $this->stock > 0;
    }

    public function syncStatus(): void
    {
        $this->status = $this->stock > 0 ? 'disponible' : 'agotado';
        $this->save();
    }
}
