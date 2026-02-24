<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'Administrador', 'description' => 'Control total del sistema'],
            ['name' => 'Cliente',       'description' => 'Usuario que realiza reservas'],
            ['name' => 'Empleado',      'description' => 'Gestión básica del catálogo'],
            ['name' => 'Supervisor',    'description' => 'Supervisión de operaciones'],
            ['name' => 'Invitado',      'description' => 'Consulta sin permisos de modificación'],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }
}
