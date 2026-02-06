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
        Role::firstOrCreate(['name' => 'Administrator'], ['description' => 'Acceso total al sistema']);
        Role::firstOrCreate(['name' => 'Client'], ['description' => 'Acceso a catálogo y reservas propias']);
    }
}
