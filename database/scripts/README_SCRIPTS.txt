================================================================================
                    SCRIPTS DE BASE DE DATOS - LIBROCONECTA
================================================================================

Este directorio contiene los scripts SQL para gestionar la base de datos
del sistema LibroConecta.

================================================================================
                           LISTA DE ARCHIVOS
================================================================================

01_crear_base_datos.sql
-----------------------
    Descripción: Crea la base de datos y todas las tablas necesarias
    Uso: Ejecutar primero si la base de datos no existe
    Advertencia: Elimina la base de datos existente si ya existe

02_insertar_datos.sql
---------------------
    Descripción: Inserta todos los datos de prueba
    Uso: Ejecutar después de 01_crear_base_datos.sql
    Contenido:
        - 2 roles (Administrator, Client)
        - 2 usuarios de prueba
        - 12 categorías de libros
        - 23 libros de ejemplo
        - 3 reservas de ejemplo

03_script_completo.sql
----------------------
    Descripción: Script único que hace todo (crear BD + insertar datos)
    Uso: Ejecutar este único archivo para configurar todo
    Recomendado: Para instalación rápida desde cero

04_eliminar_base_datos.sql
--------------------------
    Descripción: Elimina completamente la base de datos
    Uso: Solo cuando desee eliminar todo
    Advertencia: ELIMINA TODOS LOS DATOS PERMANENTEMENTE

05_consultas_utiles.sql
-----------------------
    Descripción: Colección de consultas SQL útiles
    Uso: Referencia para consultar y administrar datos
    Contenido:
        - Consultas de usuarios
        - Consultas de libros
        - Consultas de reservas
        - Estadísticas
        - Mantenimiento

================================================================================
                        INSTRUCCIONES DE USO
================================================================================

OPCIÓN 1: Instalación Rápida (Recomendada)
------------------------------------------
    1. Abrir phpMyAdmin: http://localhost/phpmyadmin
    2. Click en "Importar" en el menú superior
    3. Seleccionar el archivo: 03_script_completo.sql
    4. Click en "Continuar"
    5. ¡Listo! La base de datos está configurada

OPCIÓN 2: Instalación Paso a Paso
---------------------------------
    1. Abrir phpMyAdmin: http://localhost/phpmyadmin
    2. Importar: 01_crear_base_datos.sql
    3. Importar: 02_insertar_datos.sql

OPCIÓN 3: Desde Línea de Comandos
---------------------------------
    1. Abrir CMD
    2. Navegar a la carpeta de scripts:
       cd C:\xampp\htdocs\Proyecto_LibreríaConecta\database\scripts
    
    3. Ejecutar:
       C:\xampp\mysql\bin\mysql -u root < 03_script_completo.sql

================================================================================
                        CREDENCIALES DE PRUEBA
================================================================================

    ROL               EMAIL                        CONTRASEÑA
    ----------------------------------------------------------------
    Administrador     admin@libroconecta.com       password
    Cliente           client@libroconecta.com      password

================================================================================
                           NOTAS IMPORTANTES
================================================================================

1. El hash de contraseña usado en los scripts corresponde a "password"
   usando bcrypt con costo 12.

2. Las fechas de las reservas de ejemplo usan la fecha actual (CURDATE()).

3. Los scripts están diseñados para MySQL 8.0+ con charset utf8mb4.

4. Si usa MariaDB, los scripts también son compatibles.

5. Para producción, cambie las contraseñas de los usuarios de prueba.

================================================================================
                              FIN DEL README
================================================================================
