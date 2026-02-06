-- ============================================================================
-- LIBROCONECTA - Script de Eliminación de Base de Datos
-- ============================================================================
-- Descripción: Elimina completamente la base de datos
-- Versión: 1.0
-- Fecha: Febrero 2026
--
-- ADVERTENCIA: Este script ELIMINA PERMANENTEMENTE todos los datos
-- Use con precaución
-- ============================================================================

-- Eliminar base de datos
DROP DATABASE IF EXISTS libreria_conecta;

-- Verificar eliminación
SELECT 'Base de datos libreria_conecta eliminada correctamente' AS mensaje;

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================
