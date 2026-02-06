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
        $adminRole = Role::where('name', 'Administrator')->first();
        $clientRole = Role::where('name', 'Client')->first();

        // Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@libroconecta.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
            'email_verified_at' => now(),
        ]);

        // Client User
        User::create([
            'name' => 'Client User',
            'email' => 'client@libroconecta.com',
            'password' => Hash::make('password'),
            'role_id' => $clientRole->id,
            'email_verified_at' => now(),
        ]);
    }
}
