<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Ficción', 'description' => 'Novelas, cuentos y obras de ficción literaria'],
            ['name' => 'No Ficción', 'description' => 'Biografías, ensayos y literatura basada en hechos reales'],
            ['name' => 'Ciencia Ficción', 'description' => 'Historias futuristas, espaciales y de tecnología avanzada'],
            ['name' => 'Fantasía', 'description' => 'Mundos mágicos, criaturas fantásticas y aventuras épicas'],
            ['name' => 'Misterio', 'description' => 'Novelas de suspenso, detectives y crímenes'],
            ['name' => 'Romance', 'description' => 'Historias de amor y relaciones'],
            ['name' => 'Terror', 'description' => 'Historias de horror, suspenso psicológico'],
            ['name' => 'Historia', 'description' => 'Libros sobre eventos y personajes históricos'],
            ['name' => 'Ciencia', 'description' => 'Divulgación científica y descubrimientos'],
            ['name' => 'Autoayuda', 'description' => 'Desarrollo personal, motivación y bienestar'],
            ['name' => 'Infantil', 'description' => 'Libros para niños y primeros lectores'],
            ['name' => 'Juvenil', 'description' => 'Literatura para adolescentes y jóvenes adultos'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['name' => $category['name']], $category);
        }
    }
}
