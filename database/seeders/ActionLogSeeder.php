<?php

namespace Database\Seeders;

use App\Models\ActionLog;
use App\Models\User;
use Illuminate\Database\Seeder;

class ActionLogSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::whereHas('role', fn($q) => $q->where('name', 'Administrador'))->first();
        $maria = User::where('email', 'maria@correo.com')->first();
        $carlos = User::where('email', 'carlos@correo.com')->first();

        if (!$admin) {
            return;
        }

        $logs = [
            [
                'user_id'     => $admin->id,
                'action'      => 'INSERT',
                'table_name'  => 'books',
                'record_id'   => 1,
                'description' => 'Se agregó un nuevo libro al catálogo',
                'ip_address'  => '127.0.0.1',
            ],
            [
                'user_id'     => $admin->id,
                'action'      => 'UPDATE',
                'table_name'  => 'books',
                'record_id'   => 2,
                'description' => 'Se actualizó el precio del libro',
                'ip_address'  => '127.0.0.1',
            ],
            [
                'user_id'     => $maria->id ?? $admin->id,
                'action'      => 'INSERT',
                'table_name'  => 'reservations',
                'record_id'   => 1,
                'description' => 'Nueva reserva creada por el cliente',
                'ip_address'  => '127.0.0.1',
            ],
            [
                'user_id'     => $carlos->id ?? $admin->id,
                'action'      => 'UPDATE',
                'table_name'  => 'reservations',
                'record_id'   => 3,
                'description' => 'Reserva cancelada por el cliente',
                'ip_address'  => '127.0.0.1',
            ],
            [
                'user_id'     => $admin->id,
                'action'      => 'INSERT',
                'table_name'  => 'users',
                'record_id'   => 5,
                'description' => 'Nuevo usuario registrado en el sistema',
                'ip_address'  => '127.0.0.1',
            ],
        ];

        foreach ($logs as $log) {
            ActionLog::create($log);
        }
    }
}
