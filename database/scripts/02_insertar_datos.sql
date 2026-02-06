-- ============================================================================
-- LIBROCONECTA - Script de Inserción de Datos de Prueba
-- ============================================================================
-- Descripción: Inserta datos iniciales y de prueba en la base de datos
-- Versión: 1.0
-- Fecha: Febrero 2026
-- NOTA: Ejecutar después de 01_crear_base_datos.sql
-- ============================================================================

USE libreria_conecta;

-- ============================================================================
-- INSERTAR ROLES
-- ============================================================================
INSERT INTO roles (name, description, created_at, updated_at) VALUES
('Administrator', 'Acceso total al sistema', NOW(), NOW()),
('Client', 'Acceso a catálogo y reservas propias', NOW(), NOW());

-- ============================================================================
-- INSERTAR USUARIOS
-- ============================================================================
-- Contraseña: password (hash generado con bcrypt)
-- El hash corresponde a la palabra "password"

INSERT INTO users (role_id, name, email, phone, address, email_verified_at, password, created_at, updated_at) VALUES
(1, 'Admin User', 'admin@libroconecta.com', NULL, NULL, NOW(), 
    '$2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4S.vfWdh8J5fKJHi', NOW(), NOW()),
(2, 'Client User', 'client@libroconecta.com', NULL, NULL, NOW(), 
    '$2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4S.vfWdh8J5fKJHi', NOW(), NOW());

-- ============================================================================
-- INSERTAR CATEGORÍAS
-- ============================================================================
INSERT INTO categories (name, description, created_at, updated_at) VALUES
('Ficción', 'Novelas, cuentos y obras de ficción literaria', NOW(), NOW()),
('No Ficción', 'Biografías, ensayos y literatura basada en hechos reales', NOW(), NOW()),
('Ciencia Ficción', 'Historias futuristas, espaciales y de tecnología avanzada', NOW(), NOW()),
('Fantasía', 'Mundos mágicos, criaturas fantásticas y aventuras épicas', NOW(), NOW()),
('Misterio', 'Novelas de suspenso, detectives y crímenes', NOW(), NOW()),
('Romance', 'Historias de amor y relaciones', NOW(), NOW()),
('Terror', 'Historias de horror, suspenso psicológico', NOW(), NOW()),
('Historia', 'Libros sobre eventos y personajes históricos', NOW(), NOW()),
('Ciencia', 'Divulgación científica y descubrimientos', NOW(), NOW()),
('Autoayuda', 'Desarrollo personal, motivación y bienestar', NOW(), NOW()),
('Infantil', 'Libros para niños y primeros lectores', NOW(), NOW()),
('Juvenil', 'Literatura para adolescentes y jóvenes adultos', NOW(), NOW());

-- ============================================================================
-- INSERTAR LIBROS
-- ============================================================================
INSERT INTO books (title, author, isbn, description, stock, price, cover_image, category_id, created_at, updated_at) VALUES

-- Ficción (category_id = 1)
('Cien años de soledad', 'Gabriel García Márquez', '978-0307474728', 
    'La obra maestra del realismo mágico que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.', 
    15, 24.99, NULL, 1, NOW(), NOW()),

('Don Quijote de la Mancha', 'Miguel de Cervantes', '978-8420412146', 
    'Las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza.', 
    10, 19.99, NULL, 1, NOW(), NOW()),

('La casa de los espíritus', 'Isabel Allende', '978-0525433477', 
    'Una saga familiar épica que abarca cuatro generaciones y combina elementos de realismo mágico.', 
    8, 18.99, NULL, 1, NOW(), NOW()),

('Rayuela', 'Julio Cortázar', '978-8420437484', 
    'Una novela revolucionaria que puede leerse de múltiples formas.', 
    0, 17.99, NULL, 1, NOW(), NOW()),

-- Ciencia Ficción (category_id = 3)
('1984', 'George Orwell', '978-0451524935', 
    'Una visión distópica de un futuro totalitario donde el Gran Hermano todo lo ve.', 
    20, 14.99, NULL, 3, NOW(), NOW()),

('Dune', 'Frank Herbert', '978-0441172719', 
    'La épica historia de Paul Atreides en el desértico planeta Arrakis.', 
    12, 22.99, NULL, 3, NOW(), NOW()),

('Fundación', 'Isaac Asimov', '978-0553293357', 
    'El inicio de la legendaria saga que explora el futuro de la humanidad galáctica.', 
    7, 16.99, NULL, 3, NOW(), NOW()),

-- Fantasía (category_id = 4)
('El Señor de los Anillos', 'J.R.R. Tolkien', '978-0618640157', 
    'La épica aventura de Frodo Bolsón para destruir el Anillo Único.', 
    18, 29.99, NULL, 4, NOW(), NOW()),

('Harry Potter y la piedra filosofal', 'J.K. Rowling', '978-8478884452', 
    'El inicio de las aventuras del joven mago Harry Potter en Hogwarts.', 
    25, 19.99, NULL, 4, NOW(), NOW()),

('El nombre del viento', 'Patrick Rothfuss', '978-0756404741', 
    'La historia de Kvothe, contada por él mismo, desde su infancia hasta convertirse en leyenda.', 
    10, 21.99, NULL, 4, NOW(), NOW()),

-- Misterio (category_id = 5)
('Asesinato en el Orient Express', 'Agatha Christie', '978-0062693662', 
    'Hercule Poirot investiga un asesinato a bordo del famoso tren.', 
    14, 15.99, NULL, 5, NOW(), NOW()),

('La chica del tren', 'Paula Hawkins', '978-1594634024', 
    'Un thriller psicológico sobre obsesión, celos y secretos.', 
    9, 17.99, NULL, 5, NOW(), NOW()),

-- Romance (category_id = 6)
('Orgullo y prejuicio', 'Jane Austen', '978-0141439518', 
    'La historia de amor entre Elizabeth Bennet y el señor Darcy.', 
    16, 12.99, NULL, 6, NOW(), NOW()),

('Bajo la misma estrella', 'John Green', '978-0142424179', 
    'Una conmovedora historia de amor entre dos adolescentes.', 
    11, 14.99, NULL, 6, NOW(), NOW()),

-- Terror (category_id = 7)
('It', 'Stephen King', '978-1501142970', 
    'La terrorífica historia del payaso Pennywise y los niños de Derry.', 
    12, 21.99, NULL, 7, NOW(), NOW()),

('El resplandor', 'Stephen King', '978-0307743657', 
    'La historia de Jack Torrance y su familia en el aislado Hotel Overlook.', 
    9, 18.99, NULL, 7, NOW(), NOW()),

-- Historia (category_id = 8)
('Sapiens: De animales a dioses', 'Yuval Noah Harari', '978-0062316097', 
    'Una breve historia de la humanidad desde los primeros humanos hasta el presente.', 
    13, 24.99, NULL, 8, NOW(), NOW()),

-- Ciencia (category_id = 9)
('Breve historia del tiempo', 'Stephen Hawking', '978-0553380163', 
    'Una exploración accesible de los misterios del universo.', 
    8, 18.99, NULL, 9, NOW(), NOW()),

('El gen egoísta', 'Richard Dawkins', '978-0199291151', 
    'Una revolucionaria visión de la evolución desde la perspectiva de los genes.', 
    6, 16.99, NULL, 9, NOW(), NOW()),

-- Autoayuda (category_id = 10)
('El poder del ahora', 'Eckhart Tolle', '978-1577314806', 
    'Una guía para la iluminación espiritual y vivir en el presente.', 
    20, 15.99, NULL, 10, NOW(), NOW()),

('Hábitos atómicos', 'James Clear', '978-0735211292', 
    'Un método comprobado para construir buenos hábitos y romper los malos.', 
    22, 19.99, NULL, 10, NOW(), NOW()),

-- Infantil (category_id = 11)
('El Principito', 'Antoine de Saint-Exupéry', '978-0156012195', 
    'El clásico cuento sobre un príncipe de otro planeta.', 
    30, 12.99, NULL, 11, NOW(), NOW()),

('Charlie y la fábrica de chocolate', 'Roald Dahl', '978-0142410318', 
    'La mágica aventura de Charlie en la fábrica del excéntrico Willy Wonka.', 
    15, 11.99, NULL, 11, NOW(), NOW());

-- ============================================================================
-- INSERTAR RESERVAS DE EJEMPLO (Opcional)
-- ============================================================================
INSERT INTO reservations (user_id, book_id, reservation_date, status, notes, created_at, updated_at) VALUES
(2, 1, CURDATE(), 'pending', 'Primera reserva de prueba', NOW(), NOW()),
(2, 5, DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'confirmed', 'Reserva confirmada', NOW(), NOW()),
(2, 8, DATE_SUB(CURDATE(), INTERVAL 7 DAY), 'completed', 'Reserva completada', NOW(), NOW());

-- ============================================================================
-- VERIFICACIÓN DE DATOS INSERTADOS
-- ============================================================================
SELECT 'Roles insertados:' AS mensaje, COUNT(*) AS total FROM roles;
SELECT 'Usuarios insertados:' AS mensaje, COUNT(*) AS total FROM users;
SELECT 'Categorías insertadas:' AS mensaje, COUNT(*) AS total FROM categories;
SELECT 'Libros insertados:' AS mensaje, COUNT(*) AS total FROM books;
SELECT 'Reservas insertadas:' AS mensaje, COUNT(*) AS total FROM reservations;

-- ============================================================================
-- FIN DEL SCRIPT DE INSERCIÓN
-- ============================================================================
