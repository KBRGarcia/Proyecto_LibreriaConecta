<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all()->keyBy('name');

        $books = [
            // Ficción
            [
                'title' => 'Cien años de soledad',
                'author' => 'Gabriel García Márquez',
                'isbn' => '978-0307474728',
                'description' => 'La obra maestra del realismo mágico que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.',
                'stock' => 15,
                'price' => 24.99,
                'category' => 'Ficción',
            ],
            [
                'title' => 'Don Quijote de la Mancha',
                'author' => 'Miguel de Cervantes',
                'isbn' => '978-8420412146',
                'description' => 'Las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza.',
                'stock' => 10,
                'price' => 19.99,
                'category' => 'Ficción',
            ],
            [
                'title' => 'La casa de los espíritus',
                'author' => 'Isabel Allende',
                'isbn' => '978-0525433477',
                'description' => 'Una saga familiar épica que abarca cuatro generaciones y combina elementos de realismo mágico.',
                'stock' => 8,
                'price' => 18.99,
                'category' => 'Ficción',
            ],

            // Ciencia Ficción
            [
                'title' => '1984',
                'author' => 'George Orwell',
                'isbn' => '978-0451524935',
                'description' => 'Una visión distópica de un futuro totalitario donde el Gran Hermano todo lo ve.',
                'stock' => 20,
                'price' => 14.99,
                'category' => 'Ciencia Ficción',
            ],
            [
                'title' => 'Dune',
                'author' => 'Frank Herbert',
                'isbn' => '978-0441172719',
                'description' => 'La épica historia de Paul Atreides en el desértico planeta Arrakis.',
                'stock' => 12,
                'price' => 22.99,
                'category' => 'Ciencia Ficción',
            ],
            [
                'title' => 'Fundación',
                'author' => 'Isaac Asimov',
                'isbn' => '978-0553293357',
                'description' => 'El inicio de la legendaria saga que explora el futuro de la humanidad galáctica.',
                'stock' => 7,
                'price' => 16.99,
                'category' => 'Ciencia Ficción',
            ],

            // Fantasía
            [
                'title' => 'El Señor de los Anillos',
                'author' => 'J.R.R. Tolkien',
                'isbn' => '978-0618640157',
                'description' => 'La épica aventura de Frodo Bolsón para destruir el Anillo Único.',
                'stock' => 18,
                'price' => 29.99,
                'category' => 'Fantasía',
            ],
            [
                'title' => 'Harry Potter y la piedra filosofal',
                'author' => 'J.K. Rowling',
                'isbn' => '978-8478884452',
                'description' => 'El inicio de las aventuras del joven mago Harry Potter en Hogwarts.',
                'stock' => 25,
                'price' => 19.99,
                'category' => 'Fantasía',
            ],
            [
                'title' => 'El nombre del viento',
                'author' => 'Patrick Rothfuss',
                'isbn' => '978-0756404741',
                'description' => 'La historia de Kvothe, contada por él mismo, desde su infancia hasta convertirse en leyenda.',
                'stock' => 10,
                'price' => 21.99,
                'category' => 'Fantasía',
            ],

            // Misterio
            [
                'title' => 'Asesinato en el Orient Express',
                'author' => 'Agatha Christie',
                'isbn' => '978-0062693662',
                'description' => 'Hercule Poirot investiga un asesinato a bordo del famoso tren.',
                'stock' => 14,
                'price' => 15.99,
                'category' => 'Misterio',
            ],
            [
                'title' => 'La chica del tren',
                'author' => 'Paula Hawkins',
                'isbn' => '978-1594634024',
                'description' => 'Un thriller psicológico sobre obsesión, celos y secretos.',
                'stock' => 9,
                'price' => 17.99,
                'category' => 'Misterio',
            ],

            // Romance
            [
                'title' => 'Orgullo y prejuicio',
                'author' => 'Jane Austen',
                'isbn' => '978-0141439518',
                'description' => 'La historia de amor entre Elizabeth Bennet y el señor Darcy.',
                'stock' => 16,
                'price' => 12.99,
                'category' => 'Romance',
            ],
            [
                'title' => 'Bajo la misma estrella',
                'author' => 'John Green',
                'isbn' => '978-0142424179',
                'description' => 'Una conmovedora historia de amor entre dos adolescentes.',
                'stock' => 11,
                'price' => 14.99,
                'category' => 'Romance',
            ],

            // Historia
            [
                'title' => 'Sapiens: De animales a dioses',
                'author' => 'Yuval Noah Harari',
                'isbn' => '978-0062316097',
                'description' => 'Una breve historia de la humanidad desde los primeros humanos hasta el presente.',
                'stock' => 13,
                'price' => 24.99,
                'category' => 'Historia',
            ],

            // Ciencia
            [
                'title' => 'Breve historia del tiempo',
                'author' => 'Stephen Hawking',
                'isbn' => '978-0553380163',
                'description' => 'Una exploración accesible de los misterios del universo.',
                'stock' => 8,
                'price' => 18.99,
                'category' => 'Ciencia',
            ],
            [
                'title' => 'El gen egoísta',
                'author' => 'Richard Dawkins',
                'isbn' => '978-0199291151',
                'description' => 'Una revolucionaria visión de la evolución desde la perspectiva de los genes.',
                'stock' => 6,
                'price' => 16.99,
                'category' => 'Ciencia',
            ],

            // Autoayuda
            [
                'title' => 'El poder del ahora',
                'author' => 'Eckhart Tolle',
                'isbn' => '978-1577314806',
                'description' => 'Una guía para la iluminación espiritual y vivir en el presente.',
                'stock' => 20,
                'price' => 15.99,
                'category' => 'Autoayuda',
            ],
            [
                'title' => 'Hábitos atómicos',
                'author' => 'James Clear',
                'isbn' => '978-0735211292',
                'description' => 'Un método comprobado para construir buenos hábitos y romper los malos.',
                'stock' => 22,
                'price' => 19.99,
                'category' => 'Autoayuda',
            ],

            // Infantil
            [
                'title' => 'El Principito',
                'author' => 'Antoine de Saint-Exupéry',
                'isbn' => '978-0156012195',
                'description' => 'El clásico cuento sobre un príncipe de otro planeta.',
                'stock' => 30,
                'price' => 12.99,
                'category' => 'Infantil',
            ],
            [
                'title' => 'Charlie y la fábrica de chocolate',
                'author' => 'Roald Dahl',
                'isbn' => '978-0142410318',
                'description' => 'La mágica aventura de Charlie en la fábrica del excéntrico Willy Wonka.',
                'stock' => 15,
                'price' => 11.99,
                'category' => 'Infantil',
            ],

            // Terror
            [
                'title' => 'It',
                'author' => 'Stephen King',
                'isbn' => '978-1501142970',
                'description' => 'La terrorífica historia del payaso Pennywise y los niños de Derry.',
                'stock' => 12,
                'price' => 21.99,
                'category' => 'Terror',
            ],
            [
                'title' => 'El resplandor',
                'author' => 'Stephen King',
                'isbn' => '978-0307743657',
                'description' => 'La historia de Jack Torrance y su familia en el aislado Hotel Overlook.',
                'stock' => 9,
                'price' => 18.99,
                'category' => 'Terror',
            ],

            // Libros sin stock para pruebas
            [
                'title' => 'Rayuela',
                'author' => 'Julio Cortázar',
                'isbn' => '978-8420437484',
                'description' => 'Una novela revolucionaria que puede leerse de múltiples formas.',
                'stock' => 0,
                'price' => 17.99,
                'category' => 'Ficción',
            ],
        ];

        foreach ($books as $bookData) {
            $categoryName = $bookData['category'];
            unset($bookData['category']);

            if (isset($categories[$categoryName])) {
                $bookData['category_id'] = $categories[$categoryName]->id;
                $bookData['status'] = $bookData['stock'] > 0 ? 'disponible' : 'agotado';
                Book::firstOrCreate(['isbn' => $bookData['isbn']], $bookData);
            }
        }
    }
}
