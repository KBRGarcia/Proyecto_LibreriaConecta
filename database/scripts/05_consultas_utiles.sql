-- ============================================================================
-- LIBROCONECTA - Consultas SQL Útiles
-- ============================================================================
-- Descripción: Colección de consultas útiles para administrar el sistema
-- Versión: 1.0
-- Fecha: Febrero 2026
-- ============================================================================

USE libreria_conecta;

-- ============================================================================
-- CONSULTAS DE USUARIOS
-- ============================================================================

-- Ver todos los usuarios con su rol
SELECT 
    u.id,
    u.name AS nombre,
    u.email,
    r.name AS rol,
    u.created_at AS fecha_registro
FROM users u
LEFT JOIN roles r ON u.role_id = r.id
ORDER BY u.id;

-- Ver solo administradores
SELECT * FROM users 
WHERE role_id = (SELECT id FROM roles WHERE name = 'Administrator');

-- Ver solo clientes
SELECT * FROM users 
WHERE role_id = (SELECT id FROM roles WHERE name = 'Client');

-- Contar usuarios por rol
SELECT 
    r.name AS rol,
    COUNT(u.id) AS cantidad
FROM roles r
LEFT JOIN users u ON r.id = u.role_id
GROUP BY r.id, r.name;

-- ============================================================================
-- CONSULTAS DE LIBROS
-- ============================================================================

-- Ver todos los libros con su categoría
SELECT 
    b.id,
    b.title AS titulo,
    b.author AS autor,
    c.name AS categoria,
    b.stock,
    CONCAT('$', FORMAT(b.price, 2)) AS precio
FROM books b
JOIN categories c ON b.category_id = c.id
ORDER BY b.title;

-- Ver libros sin stock (agotados)
SELECT title, author, isbn 
FROM books 
WHERE stock = 0;

-- Ver libros con stock bajo (menos de 5)
SELECT title, author, stock 
FROM books 
WHERE stock > 0 AND stock <= 5
ORDER BY stock;

-- Contar libros por categoría
SELECT 
    c.name AS categoria,
    COUNT(b.id) AS cantidad_libros,
    SUM(b.stock) AS stock_total
FROM categories c
LEFT JOIN books b ON c.id = b.category_id
GROUP BY c.id, c.name
ORDER BY cantidad_libros DESC;

-- Buscar libros por título o autor
-- Cambiar '%texto%' por el término de búsqueda
SELECT title, author, isbn 
FROM books 
WHERE title LIKE '%quijote%' OR author LIKE '%cervantes%';

-- ============================================================================
-- CONSULTAS DE RESERVAS
-- ============================================================================

-- Ver todas las reservas con detalles
SELECT 
    r.id AS reserva_id,
    u.name AS usuario,
    u.email,
    b.title AS libro,
    r.reservation_date AS fecha_reserva,
    r.status AS estado,
    r.created_at AS fecha_creacion
FROM reservations r
JOIN users u ON r.user_id = u.id
JOIN books b ON r.book_id = b.id
ORDER BY r.created_at DESC;

-- Ver reservas pendientes
SELECT 
    r.id,
    u.name AS usuario,
    b.title AS libro,
    r.reservation_date
FROM reservations r
JOIN users u ON r.user_id = u.id
JOIN books b ON r.book_id = b.id
WHERE r.status = 'pending'
ORDER BY r.reservation_date;

-- Contar reservas por estado
SELECT 
    status AS estado,
    COUNT(*) AS cantidad
FROM reservations
GROUP BY status;

-- Ver reservas de un usuario específico (cambiar el email)
SELECT 
    b.title AS libro,
    r.reservation_date AS fecha,
    r.status AS estado
FROM reservations r
JOIN books b ON r.book_id = b.id
JOIN users u ON r.user_id = u.id
WHERE u.email = 'client@libroconecta.com'
ORDER BY r.created_at DESC;

-- Libros más reservados
SELECT 
    b.title AS libro,
    b.author AS autor,
    COUNT(r.id) AS total_reservas
FROM books b
LEFT JOIN reservations r ON b.id = r.book_id
GROUP BY b.id, b.title, b.author
ORDER BY total_reservas DESC
LIMIT 10;

-- ============================================================================
-- CONSULTAS DE ESTADÍSTICAS
-- ============================================================================

-- Resumen general del sistema
SELECT 'Usuarios' AS entidad, COUNT(*) AS total FROM users
UNION ALL
SELECT 'Libros', COUNT(*) FROM books
UNION ALL
SELECT 'Categorías', COUNT(*) FROM categories
UNION ALL
SELECT 'Reservas', COUNT(*) FROM reservations
UNION ALL
SELECT 'Reservas Pendientes', COUNT(*) FROM reservations WHERE status = 'pending'
UNION ALL
SELECT 'Libros Agotados', COUNT(*) FROM books WHERE stock = 0;

-- Valor total del inventario
SELECT 
    COUNT(*) AS total_libros,
    SUM(stock) AS unidades_totales,
    CONCAT('$', FORMAT(SUM(stock * price), 2)) AS valor_inventario
FROM books;

-- Reservas por mes (últimos 12 meses)
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') AS mes,
    COUNT(*) AS reservas
FROM reservations
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY mes DESC;

-- ============================================================================
-- CONSULTAS DE MANTENIMIENTO
-- ============================================================================

-- Ver sesiones activas
SELECT 
    s.id,
    u.name AS usuario,
    s.ip_address,
    FROM_UNIXTIME(s.last_activity) AS ultima_actividad
FROM sessions s
LEFT JOIN users u ON s.user_id = u.id
ORDER BY s.last_activity DESC;

-- Limpiar sesiones antiguas (más de 24 horas)
-- DELETE FROM sessions WHERE last_activity < UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 24 HOUR));

-- Ver tamaño de las tablas
SELECT 
    table_name AS tabla,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'tamaño_MB'
FROM information_schema.tables
WHERE table_schema = 'libreria_conecta'
ORDER BY (data_length + index_length) DESC;

-- ============================================================================
-- CONSULTAS DE ACTUALIZACIÓN
-- ============================================================================

-- Actualizar stock de un libro (cambiar valores)
-- UPDATE books SET stock = stock + 10 WHERE isbn = '978-0307474728';

-- Confirmar todas las reservas pendientes
-- UPDATE reservations SET status = 'confirmed' WHERE status = 'pending';

-- Cambiar rol de un usuario (cambiar email y rol)
-- UPDATE users SET role_id = 1 WHERE email = 'usuario@ejemplo.com';

-- ============================================================================
-- FIN DEL ARCHIVO DE CONSULTAS
-- ============================================================================
