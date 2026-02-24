<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all()->keyBy('email');
        $books = Book::all();

        if ($books->isEmpty() || $users->isEmpty()) {
            return;
        }

        $reservations = [
            [
                'user_id'          => $users['maria@correo.com']->id ?? null,
                'book_id'          => $books->first()->id,
                'reservation_date' => now(),
                'status'           => 'pendiente',
            ],
            [
                'user_id'          => $users['carlos@correo.com']->id ?? null,
                'book_id'          => $books->skip(2)->first()->id,
                'reservation_date' => now()->subDays(2),
                'status'           => 'confirmada',
            ],
            [
                'user_id'          => $users['maria@correo.com']->id ?? null,
                'book_id'          => $books->skip(1)->first()->id,
                'reservation_date' => now()->subDays(5),
                'status'           => 'cancelada',
            ],
            [
                'user_id'          => $users['carlos@correo.com']->id ?? null,
                'book_id'          => $books->skip(3)->first()->id,
                'reservation_date' => now()->subDay(),
                'status'           => 'pendiente',
            ],
            [
                'user_id'          => $users['ana@correo.com']->id ?? null,
                'book_id'          => $books->first()->id,
                'reservation_date' => now()->subDays(3),
                'status'           => 'confirmada',
            ],
        ];

        foreach ($reservations as $data) {
            if ($data['user_id']) {
                Reservation::create($data);
            }
        }
    }
}
