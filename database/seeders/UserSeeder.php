<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin      = Role::where('name', 'Administrador')->first();
        $cliente    = Role::where('name', 'Cliente')->first();
        $empleado   = Role::where('name', 'Empleado')->first();
        $supervisor = Role::where('name', 'Supervisor')->first();

        $users = [
            [
                'first_name' => 'Ikabaru',
                'last_name'  => 'Garcia',
                'email'      => 'admin@libroconecta.com',
                'password'   => Hash::make('12345678'),
                'role_id'    => $admin->id,
                'status'     => 'activo',
                'email_verified_at' => now(),
            ],
            [
                'first_name' => 'Maria',
                'last_name'  => 'Perez',
                'email'      => 'maria@correo.com',
                'password'   => Hash::make('12345678'),
                'role_id'    => $cliente->id,
                'status'     => 'activo',
                'email_verified_at' => now(),
            ],
            [
                'first_name' => 'Carlos',
                'last_name'  => 'Rodriguez',
                'email'      => 'carlos@correo.com',
                'password'   => Hash::make('12345678'),
                'role_id'    => $cliente->id,
                'status'     => 'activo',
                'email_verified_at' => now(),
            ],
            [
                'first_name' => 'Ana',
                'last_name'  => 'Lopez',
                'email'      => 'ana@correo.com',
                'password'   => Hash::make('12345678'),
                'role_id'    => $empleado->id,
                'status'     => 'activo',
                'email_verified_at' => now(),
            ],
            [
                'first_name' => 'Luis',
                'last_name'  => 'Fernandez',
                'email'      => 'luis@correo.com',
                'password'   => Hash::make('12345678'),
                'role_id'    => $supervisor->id,
                'status'     => 'inactivo',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($users as $userData) {
            User::firstOrCreate(['email' => $userData['email']], $userData);
        }
    }
}
