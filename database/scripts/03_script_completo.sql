-- ============================================================================
-- LIBROCONECTA - Script Completo de Base de Datos
-- ============================================================================
-- Descripción: Script único que crea la base de datos e inserta todos los datos
-- Versión: 1.0
-- Fecha: Febrero 2026
-- 
-- INSTRUCCIONES:
-- 1. Abrir phpMyAdmin o MySQL Workbench
-- 2. Ejecutar este script completo
-- 3. La base de datos quedará lista para usar
--
-- ADVERTENCIA: Este script ELIMINA la base de datos existente si existe
-- ============================================================================

-- ============================================================================
-- PARTE 1: CREACIÓN DE LA BASE DE DATOS
-- ============================================================================

DROP DATABASE IF EXISTS libreria_conecta;

CREATE DATABASE libreria_conecta
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE libreria_conecta;

-- ============================================================================
-- PARTE 2: CREACIÓN DE TABLAS
-- ============================================================================

-- Tabla: roles
CREATE TABLE roles (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY roles_name_unique (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: users
CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    role_id BIGINT UNSIGNED NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NULL,
    address TEXT NULL,
    email_verified_at TIMESTAMP NULL DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY users_email_unique (email),
    KEY users_role_id_foreign (role_id),
    CONSTRAINT users_role_id_foreign 
        FOREIGN KEY (role_id) REFERENCES roles (id) 
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: password_reset_tokens
CREATE TABLE password_reset_tokens (
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: sessions
CREATE TABLE sessions (
    id VARCHAR(255) NOT NULL,
    user_id BIGINT UNSIGNED NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    payload LONGTEXT NOT NULL,
    last_activity INT NOT NULL,
    PRIMARY KEY (id),
    KEY sessions_user_id_index (user_id),
    KEY sessions_last_activity_index (last_activity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: categories
CREATE TABLE categories (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: books
CREATE TABLE books (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(255) NOT NULL,
    description TEXT NULL,
    stock INT NOT NULL DEFAULT 0,
    price DECIMAL(8,2) NOT NULL,
    cover_image VARCHAR(255) NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY books_isbn_unique (isbn),
    KEY books_category_id_foreign (category_id),
    CONSTRAINT books_category_id_foreign 
        FOREIGN KEY (category_id) REFERENCES categories (id) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: reservations
CREATE TABLE reservations (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    book_id BIGINT UNSIGNED NOT NULL,
    reservation_date DATE NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') NOT NULL DEFAULT 'pending',
    notes TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY reservations_user_id_foreign (user_id),
    KEY reservations_book_id_foreign (book_id),
    CONSTRAINT reservations_user_id_foreign 
        FOREIGN KEY (user_id) REFERENCES users (id) 
        ON DELETE CASCADE,
    CONSTRAINT reservations_book_id_foreign 
        FOREIGN KEY (book_id) REFERENCES books (id) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: cache
CREATE TABLE cache (
    `key` VARCHAR(255) NOT NULL,
    value MEDIUMTEXT NOT NULL,
    expiration INT NOT NULL,
    PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: cache_locks
CREATE TABLE cache_locks (
    `key` VARCHAR(255) NOT NULL,
    owner VARCHAR(255) NOT NULL,
    expiration INT NOT NULL,
    PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: jobs
CREATE TABLE jobs (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    queue VARCHAR(255) NOT NULL,
    payload LONGTEXT NOT NULL,
    attempts TINYINT UNSIGNED NOT NULL,
    reserved_at INT UNSIGNED NULL,
    available_at INT UNSIGNED NOT NULL,
    created_at INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    KEY jobs_queue_index (queue)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: job_batches
CREATE TABLE job_batches (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    total_jobs INT NOT NULL,
    pending_jobs INT NOT NULL,
    failed_jobs INT NOT NULL,
    failed_job_ids LONGTEXT NOT NULL,
    options MEDIUMTEXT NULL,
    cancelled_at INT NULL,
    created_at INT NOT NULL,
    finished_at INT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: failed_jobs
CREATE TABLE failed_jobs (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    uuid VARCHAR(255) NOT NULL,
    connection TEXT NOT NULL,
    queue TEXT NOT NULL,
    payload LONGTEXT NOT NULL,
    exception LONGTEXT NOT NULL,
    failed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY failed_jobs_uuid_unique (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- PARTE 3: INSERCIÓN DE DATOS
-- ============================================================================

-- Insertar Roles
INSERT INTO roles (name, description, created_at, updated_at) VALUES
('Administrator', 'Acceso total al sistema', NOW(), NOW()),
('Client', 'Acceso a catálogo y reservas propias', NOW(), NOW());

-- Insertar Usuarios (contraseña: password)
INSERT INTO users (role_id, name, email, phone, address, email_verified_at, password, created_at, updated_at) VALUES
(1, 'Admin User', 'admin@libroconecta.com', NULL, NULL, NOW(), 
    '$2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4S.vfWdh8J5fKJHi', NOW(), NOW()),
(2, 'Client User', 'client@libroconecta.com', NULL, NULL, NOW(), 
    '$2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4S.vfWdh8J5fKJHi', NOW(), NOW());

-- Insertar Categorías
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

-- Insertar Libros
INSERT INTO books (title, author, isbn, description, stock, price, cover_image, category_id, created_at, updated_at) VALUES
('Cien años de soledad', 'Gabriel García Márquez', '978-0307474728', 'La obra maestra del realismo mágico que narra la historia de la familia Buendía.', 15, 24.99, NULL, 1, NOW(), NOW()),
('Don Quijote de la Mancha', 'Miguel de Cervantes', '978-8420412146', 'Las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza.', 10, 19.99, NULL, 1, NOW(), NOW()),
('La casa de los espíritus', 'Isabel Allende', '978-0525433477', 'Una saga familiar épica que abarca cuatro generaciones.', 8, 18.99, NULL, 1, NOW(), NOW()),
('Rayuela', 'Julio Cortázar', '978-8420437484', 'Una novela revolucionaria que puede leerse de múltiples formas.', 0, 17.99, NULL, 1, NOW(), NOW()),
('1984', 'George Orwell', '978-0451524935', 'Una visión distópica de un futuro totalitario.', 20, 14.99, NULL, 3, NOW(), NOW()),
('Dune', 'Frank Herbert', '978-0441172719', 'La épica historia de Paul Atreides en el desértico planeta Arrakis.', 12, 22.99, NULL, 3, NOW(), NOW()),
('Fundación', 'Isaac Asimov', '978-0553293357', 'El inicio de la legendaria saga galáctica.', 7, 16.99, NULL, 3, NOW(), NOW()),
('El Señor de los Anillos', 'J.R.R. Tolkien', '978-0618640157', 'La épica aventura de Frodo Bolsón para destruir el Anillo Único.', 18, 29.99, NULL, 4, NOW(), NOW()),
('Harry Potter y la piedra filosofal', 'J.K. Rowling', '978-8478884452', 'El inicio de las aventuras del joven mago Harry Potter.', 25, 19.99, NULL, 4, NOW(), NOW()),
('El nombre del viento', 'Patrick Rothfuss', '978-0756404741', 'La historia de Kvothe, desde su infancia hasta convertirse en leyenda.', 10, 21.99, NULL, 4, NOW(), NOW()),
('Asesinato en el Orient Express', 'Agatha Christie', '978-0062693662', 'Hercule Poirot investiga un asesinato a bordo del famoso tren.', 14, 15.99, NULL, 5, NOW(), NOW()),
('La chica del tren', 'Paula Hawkins', '978-1594634024', 'Un thriller psicológico sobre obsesión, celos y secretos.', 9, 17.99, NULL, 5, NOW(), NOW()),
('Orgullo y prejuicio', 'Jane Austen', '978-0141439518', 'La historia de amor entre Elizabeth Bennet y el señor Darcy.', 16, 12.99, NULL, 6, NOW(), NOW()),
('Bajo la misma estrella', 'John Green', '978-0142424179', 'Una conmovedora historia de amor entre dos adolescentes.', 11, 14.99, NULL, 6, NOW(), NOW()),
('It', 'Stephen King', '978-1501142970', 'La terrorífica historia del payaso Pennywise.', 12, 21.99, NULL, 7, NOW(), NOW()),
('El resplandor', 'Stephen King', '978-0307743657', 'La historia de Jack Torrance en el Hotel Overlook.', 9, 18.99, NULL, 7, NOW(), NOW()),
('Sapiens: De animales a dioses', 'Yuval Noah Harari', '978-0062316097', 'Una breve historia de la humanidad.', 13, 24.99, NULL, 8, NOW(), NOW()),
('Breve historia del tiempo', 'Stephen Hawking', '978-0553380163', 'Una exploración de los misterios del universo.', 8, 18.99, NULL, 9, NOW(), NOW()),
('El gen egoísta', 'Richard Dawkins', '978-0199291151', 'Una revolucionaria visión de la evolución.', 6, 16.99, NULL, 9, NOW(), NOW()),
('El poder del ahora', 'Eckhart Tolle', '978-1577314806', 'Una guía para vivir en el presente.', 20, 15.99, NULL, 10, NOW(), NOW()),
('Hábitos atómicos', 'James Clear', '978-0735211292', 'Un método para construir buenos hábitos.', 22, 19.99, NULL, 10, NOW(), NOW()),
('El Principito', 'Antoine de Saint-Exupéry', '978-0156012195', 'El clásico cuento sobre un príncipe de otro planeta.', 30, 12.99, NULL, 11, NOW(), NOW()),
('Charlie y la fábrica de chocolate', 'Roald Dahl', '978-0142410318', 'La mágica aventura de Charlie con Willy Wonka.', 15, 11.99, NULL, 11, NOW(), NOW());

-- Insertar algunas reservas de ejemplo
INSERT INTO reservations (user_id, book_id, reservation_date, status, notes, created_at, updated_at) VALUES
(2, 1, CURDATE(), 'pending', 'Primera reserva de prueba', NOW(), NOW()),
(2, 5, DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'confirmed', 'Reserva confirmada', NOW(), NOW()),
(2, 8, DATE_SUB(CURDATE(), INTERVAL 7 DAY), 'completed', 'Reserva completada', NOW(), NOW());

-- ============================================================================
-- PARTE 4: VERIFICACIÓN
-- ============================================================================

SELECT '========================================' AS '';
SELECT 'RESUMEN DE DATOS INSERTADOS' AS '';
SELECT '========================================' AS '';
SELECT CONCAT('Roles: ', COUNT(*)) AS resultado FROM roles
UNION ALL
SELECT CONCAT('Usuarios: ', COUNT(*)) FROM users
UNION ALL
SELECT CONCAT('Categorías: ', COUNT(*)) FROM categories
UNION ALL
SELECT CONCAT('Libros: ', COUNT(*)) FROM books
UNION ALL
SELECT CONCAT('Reservas: ', COUNT(*)) FROM reservations;

SELECT '========================================' AS '';
SELECT 'CREDENCIALES DE ACCESO' AS '';
SELECT '========================================' AS '';
SELECT 'Admin: admin@libroconecta.com / password' AS credenciales
UNION ALL
SELECT 'Cliente: client@libroconecta.com / password';

SELECT '========================================' AS '';
SELECT 'BASE DE DATOS LISTA PARA USAR' AS '';
SELECT '========================================' AS '';

-- ============================================================================
-- FIN DEL SCRIPT COMPLETO
-- ============================================================================
