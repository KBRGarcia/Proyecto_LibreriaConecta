================================================================================
                              LIBROCONECTA
          Sistema Web para Gestión de Catálogo y Reservas de Librería
================================================================================

                         INSTRUCCIONES DE INSTALACIÓN Y USO

================================================================================
                              ÍNDICE
================================================================================

    1. Requisitos del Sistema
    2. Instalación Paso a Paso
    3. Configuración de la Base de Datos
    4. Ejecución del Sistema
    5. Credenciales de Acceso
    6. Navegación del Sistema
    7. Solución de Problemas Frecuentes
    8. Estructura del Proyecto

================================================================================
                     1. REQUISITOS DEL SISTEMA
================================================================================

Antes de instalar, asegúrese de tener instalado:

    SOFTWARE                VERSIÓN MÍNIMA      DESCARGA
    ---------------------------------------------------------------
    XAMPP                   8.2+                https://www.apachefriends.org/
    Node.js                 18.x                https://nodejs.org/
    Composer                2.x                 https://getcomposer.org/
    Navegador moderno       Chrome 90+, Firefox 88+, Edge 90+

NOTA: XAMPP incluye Apache, MySQL y PHP. No necesita instalarlos por separado.

================================================================================
                     2. INSTALACIÓN PASO A PASO
================================================================================

PASO 1: Instalar XAMPP
----------------------
    1. Descargar XAMPP desde https://www.apachefriends.org/
    2. Ejecutar el instalador
    3. Seleccionar al menos: Apache, MySQL, PHP, phpMyAdmin
    4. Completar la instalación

PASO 2: Instalar Node.js
------------------------
    1. Descargar Node.js LTS desde https://nodejs.org/
    2. Ejecutar el instalador
    3. Seguir las instrucciones por defecto
    4. Verificar instalación abriendo CMD y ejecutando:
       
       node --version
       npm --version

PASO 3: Instalar Composer
-------------------------
    1. Descargar desde https://getcomposer.org/download/
    2. Ejecutar Composer-Setup.exe
    3. Seguir las instrucciones (detectará PHP automáticamente)
    4. Verificar instalación:
       
       composer --version

PASO 4: Copiar el Proyecto
--------------------------
    1. Copiar la carpeta "Proyecto_LibreríaConecta" completa
    2. Pegarla en: C:\xampp\htdocs\
    
    La ruta final debe ser: C:\xampp\htdocs\Proyecto_LibreríaConecta

PASO 5: Instalar Dependencias PHP
---------------------------------
    1. Abrir CMD o PowerShell
    2. Navegar al proyecto:
       
       cd C:\xampp\htdocs\Proyecto_LibreríaConecta
    
    3. Ejecutar:
       
       composer install
    
    4. Esperar a que termine (puede tomar varios minutos)

PASO 6: Instalar Dependencias JavaScript
----------------------------------------
    1. En la misma terminal, ejecutar:
       
       npm install
    
    2. Esperar a que termine

================================================================================
                  3. CONFIGURACIÓN DE LA BASE DE DATOS
================================================================================

PASO 1: Iniciar XAMPP
---------------------
    1. Abrir XAMPP Control Panel
    2. Click en "Start" junto a Apache
    3. Click en "Start" junto a MySQL
    4. Ambos deben mostrar fondo verde cuando estén activos

PASO 2: Crear la Base de Datos
------------------------------
    1. Abrir navegador
    2. Ir a: http://localhost/phpmyadmin
    3. En el panel izquierdo, click en "Nueva"
    4. En "Nombre de la base de datos" escribir: libreria_conecta
    5. En "Cotejamiento" seleccionar: utf8mb4_unicode_ci
    6. Click en "Crear"

PASO 3: Configurar el Archivo .env
----------------------------------
    1. En la carpeta del proyecto, buscar el archivo ".env"
    2. Si no existe, copiar ".env.example" y renombrarlo a ".env"
    3. Abrir ".env" con un editor de texto
    4. Verificar que estas líneas estén así:

       DB_CONNECTION=mysql
       DB_HOST=localhost
       DB_PORT=3306
       DB_DATABASE=libreria_conecta
       DB_USERNAME=root
       DB_PASSWORD=

    NOTA: En XAMPP, la contraseña de MySQL por defecto está vacía.

PASO 4: Generar Clave de Aplicación
-----------------------------------
    En la terminal del proyecto, ejecutar:
    
    php artisan key:generate

PASO 5: Ejecutar Migraciones y Datos de Prueba
----------------------------------------------
    En la terminal del proyecto, ejecutar:
    
    php artisan migrate:fresh --seed

    Esto creará:
    - Todas las tablas necesarias
    - 2 usuarios de prueba (admin y cliente)
    - 12 categorías de libros
    - 23 libros de ejemplo

PASO 6: Crear Enlace de Almacenamiento
--------------------------------------
    En la terminal del proyecto, ejecutar:
    
    php artisan storage:link

================================================================================
                      4. EJECUCIÓN DEL SISTEMA
================================================================================

Para ejecutar el sistema, necesita DOS cosas funcionando:

A) XAMPP (Apache y MySQL)
-------------------------
    1. Abrir XAMPP Control Panel
    2. Iniciar Apache (click en Start)
    3. Iniciar MySQL (click en Start)
    
    DEJAR XAMPP ABIERTO mientras use el sistema.

B) Servidor de Desarrollo Vite
------------------------------
    1. Abrir CMD o PowerShell
    2. Navegar al proyecto:
       
       cd C:\xampp\htdocs\Proyecto_LibreríaConecta
    
    3. Ejecutar:
       
       npm run dev
    
    4. DEJAR ESTA TERMINAL ABIERTA mientras use el sistema.
    
    Verá un mensaje similar a:
    
      VITE v7.0.7  ready in XXX ms
      -> Local: http://localhost:5173/

C) Acceder al Sistema
---------------------
    1. Abrir el navegador
    2. Ir a la dirección:
       
       http://localhost/Proyecto_LibreríaConecta/public

    IMPORTANTE: Use esta URL, NO la de Vite (5173).

================================================================================
                      5. CREDENCIALES DE ACCESO
================================================================================

El sistema tiene DOS tipos de usuarios con diferentes permisos:

+------------------+-------------------------------+-------------+
|      ROL         |          EMAIL                | CONTRASEÑA  |
+------------------+-------------------------------+-------------+
| Administrador    | admin@libroconecta.com        | password    |
+------------------+-------------------------------+-------------+
| Cliente          | client@libroconecta.com       | password    |
+------------------+-------------------------------+-------------+

ADMINISTRADOR - Acceso completo:
    - Dashboard con estadísticas
    - Gestionar libros (crear, editar, eliminar)
    - Gestionar categorías
    - Gestionar usuarios
    - Gestionar reservas de todos los usuarios
    - Ver reportes

CLIENTE - Acceso limitado:
    - Ver catálogo de libros
    - Ver detalle de libros
    - Crear reservas
    - Ver y cancelar sus propias reservas
    - Editar su perfil

================================================================================
                      6. NAVEGACIÓN DEL SISTEMA
================================================================================

PÁGINAS PÚBLICAS (sin iniciar sesión):
--------------------------------------
    /catalogo              - Ver todos los libros disponibles
    /libro/{id}            - Ver detalle de un libro
    /login                 - Iniciar sesión

PÁGINAS DE CLIENTE (requiere login como cliente):
-------------------------------------------------
    /dashboard             - Panel principal con resumen
    /reservas              - Ver mis reservas
    /reservas/nueva        - Crear nueva reserva
    /reservas/{id}         - Ver detalle de una reserva
    /perfil                - Editar mi perfil

PÁGINAS DE ADMINISTRADOR (requiere login como admin):
-----------------------------------------------------
    /dashboard             - Panel con estadísticas globales
    /admin/libros          - Gestionar libros
    /admin/libros/crear    - Agregar nuevo libro
    /admin/categorias      - Gestionar categorías
    /admin/usuarios        - Gestionar usuarios
    /admin/reservas        - Gestionar todas las reservas
    /admin/reportes        - Ver reportes y estadísticas

================================================================================
                  7. SOLUCIÓN DE PROBLEMAS FRECUENTES
================================================================================

PROBLEMA: "npm no es reconocido como comando"
---------------------------------------------
SOLUCIÓN: 
    1. Verificar que Node.js esté instalado
    2. Reiniciar la terminal después de instalar Node.js
    3. Si persiste, agregar Node.js al PATH del sistema

PROBLEMA: "La ejecución de scripts está deshabilitada" (PowerShell)
-------------------------------------------------------------------
SOLUCIÓN:
    1. Abrir PowerShell como Administrador
    2. Ejecutar:
       Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    3. Confirmar con "S"

PROBLEMA: "Class Ziggy not found"
---------------------------------
SOLUCIÓN:
    1. En la terminal del proyecto, ejecutar:
       composer dump-autoload
       php artisan config:clear
       php artisan cache:clear
    2. Refrescar la página

PROBLEMA: Página en blanco
--------------------------
SOLUCIÓN:
    1. Verificar que Apache y MySQL estén corriendo en XAMPP
    2. Verificar que "npm run dev" esté ejecutándose
    3. Verificar la URL: http://localhost/Proyecto_LibreríaConecta/public
    4. Revisar errores en: storage/logs/laravel.log

PROBLEMA: "SQLSTATE[HY000] No such file or directory"
-----------------------------------------------------
SOLUCIÓN:
    1. Verificar que MySQL esté corriendo en XAMPP
    2. Verificar configuración en .env (DB_HOST=localhost)

PROBLEMA: "Port 80 in use" en XAMPP
-----------------------------------
SOLUCIÓN:
    1. Cerrar Skype u otras aplicaciones que usen el puerto 80
    2. O cambiar el puerto de Apache en XAMPP Config

PROBLEMA: Los estilos no cargan correctamente
----------------------------------------------
SOLUCIÓN:
    1. Verificar que "npm run dev" esté ejecutándose
    2. Refrescar con Ctrl+Shift+R (recarga sin caché)

================================================================================
                     8. ESTRUCTURA DEL PROYECTO
================================================================================

Proyecto_LibreríaConecta/
│
├── app/                    # Código PHP principal
│   ├── Http/
│   │   ├── Controllers/    # Controladores (lógica de negocio)
│   │   ├── Middleware/     # Filtros de autenticación y roles
│   │   └── Requests/       # Validaciones de formularios
│   └── Models/             # Modelos de base de datos
│
├── database/
│   ├── migrations/         # Estructura de tablas
│   └── seeders/            # Datos de prueba
│
├── public/                 # Carpeta pública (punto de entrada)
│   └── index.php
│
├── resources/
│   ├── css/                # Estilos
│   └── js/
│       ├── Components/     # Componentes React reutilizables
│       ├── Layouts/        # Estructuras de página
│       └── Pages/          # Páginas del sistema
│
├── routes/
│   └── web.php             # Definición de rutas
│
├── storage/                # Archivos generados y logs
│
├── .env                    # Configuración local
├── composer.json           # Dependencias PHP
├── package.json            # Dependencias JavaScript
└── vite.config.js          # Configuración del bundler

================================================================================
                           RESUMEN RÁPIDO
================================================================================

Para ejecutar el sistema después de instalarlo:

    1. Abrir XAMPP -> Iniciar Apache y MySQL
    
    2. Abrir terminal en la carpeta del proyecto:
       cd C:\xampp\htdocs\Proyecto_LibreríaConecta
       npm run dev
    
    3. Abrir navegador:
       http://localhost/Proyecto_LibreríaConecta/public
    
    4. Iniciar sesión:
       Admin:   admin@libroconecta.com / password
       Cliente: client@libroconecta.com / password

================================================================================
                              FIN DEL DOCUMENTO
================================================================================

Desarrollado como parte del proyecto LibroConecta
Sistema de gestión de catálogo y reservas para librería local
Febrero 2026
