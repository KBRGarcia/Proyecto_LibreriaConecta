# Documentación del Prototipo - LibroConecta

## Sistema Web para Gestión de Catálogo y Reservas de una Librería Local

---

## 4.1 Descripción del Prototipo

### Funcionalidades Implementadas (Funcionales)

#### Sistema de Autenticación
- **Login de usuarios**: Formulario de inicio de sesión funcional con validación de credenciales
- **Logout**: Cierre de sesión seguro con invalidación de tokens
- **Gestión de sesiones**: Sesiones persistentes en base de datos con regeneración de tokens CSRF
- **Protección de rutas**: Middleware de autenticación que protege rutas privadas

#### Gestión de Usuarios
- **Registro de usuarios por administrador**: CRUD completo de usuarios
- **Edición de perfil**: Los usuarios pueden actualizar su información personal
- **Cambio de contraseña**: Con verificación de contraseña actual
- **Asignación de roles**: Administrador puede asignar roles a usuarios

#### Catálogo de Libros
- **Listado público**: Catálogo accesible sin autenticación
- **Búsqueda**: Por título, autor o ISBN
- **Filtrado**: Por categorías
- **Paginación**: Navegación entre páginas de resultados
- **Detalle del libro**: Vista completa con información y libros relacionados

#### Sistema de Reservas
- **Crear reserva**: Clientes pueden reservar libros disponibles
- **Ver mis reservas**: Historial de reservas del usuario
- **Cancelar reserva**: Clientes pueden cancelar reservas pendientes o confirmadas
- **Gestión administrativa**: Admin puede cambiar estados de reservas

#### Panel de Administración
- **Dashboard con estadísticas**: Métricas en tiempo real del sistema
- **Gestión de libros**: CRUD completo (crear, leer, actualizar, eliminar)
- **Gestión de categorías**: CRUD completo
- **Gestión de usuarios**: CRUD completo con asignación de roles
- **Gestión de reservas**: Visualización y cambio de estados
- **Reportes**: Estadísticas de reservas, libros por categoría, libros más reservados

#### Diseño Responsive
- **Mobile First**: Diseño optimizado primero para móviles
- **Adaptable**: Funciona en móvil, tablet y escritorio
- **Menú hamburguesa**: Navegación colapsable en dispositivos móviles

### Funcionalidades Simuladas / Mockupeadas

| Funcionalidad | Estado | Descripción |
|---------------|--------|-------------|
| Subida de imágenes de portada | Parcial | La estructura existe pero requiere configuración de storage en producción |
| Notificaciones por email | Simulado | Los mensajes de éxito aparecen en pantalla, no se envían emails reales |
| Pasarela de pago | No implementado | El precio se muestra pero no hay proceso de pago |
| Recuperación de contraseña | No implementado | No existe flujo de "olvidé mi contraseña" |
| Registro público de usuarios | No implementado | Solo el admin puede crear usuarios |
| Verificación de email | No implementado | Los usuarios se crean como verificados automáticamente |
| Exportación de reportes | No implementado | Los reportes se visualizan pero no se exportan a PDF/Excel |

---

## 4.2 Alcance del Prototipo

### Requisitos Obligatorios - Estado de Cumplimiento

| Requisito | Estado | Evidencia |
|-----------|--------|-----------|
| Maquetación completa de interfaces principales | ✅ CUMPLE | 18+ páginas implementadas con diseño consistente |
| Sistema de autenticación funcional con login | ✅ CUMPLE | Login funcional con validación y manejo de errores |
| DOS niveles de usuario con permisos diferenciados | ✅ CUMPLE | Roles Administrator y Client con permisos distintos |
| Navegación funcional entre pantallas | ✅ CUMPLE | Navegación completa con menús adaptativos por rol |
| Diseño responsive (móvil, tablet, escritorio) | ✅ CUMPLE | Tailwind CSS con enfoque Mobile First |

### Interfaces Implementadas

#### Interfaces Públicas (Sin autenticación)
1. **Catálogo de Libros** (`/catalogo`) - Listado con búsqueda y filtros
2. **Detalle de Libro** (`/libro/{id}`) - Información completa del libro
3. **Login** (`/login`) - Formulario de inicio de sesión

#### Interfaces de Cliente (Autenticado)
4. **Dashboard Cliente** (`/dashboard`) - Panel personalizado con reservas y libros destacados
5. **Mis Reservas** (`/reservas`) - Listado de reservas propias
6. **Nueva Reserva** (`/reservas/nueva`) - Formulario de creación
7. **Detalle de Reserva** (`/reservas/{id}`) - Vista detallada
8. **Mi Perfil** (`/perfil`) - Edición de datos personales y contraseña

#### Interfaces de Administrador
9. **Dashboard Admin** (`/dashboard`) - Panel con estadísticas globales
10. **Gestión de Libros** (`/admin/libros`) - Listado con acciones CRUD
11. **Crear Libro** (`/admin/libros/crear`) - Formulario de creación
12. **Editar Libro** (`/admin/libros/{id}/editar`) - Formulario de edición
13. **Gestión de Categorías** (`/admin/categorias`) - CRUD de categorías
14. **Crear Categoría** (`/admin/categorias/crear`)
15. **Editar Categoría** (`/admin/categorias/{id}/editar`)
16. **Gestión de Usuarios** (`/admin/usuarios`) - CRUD de usuarios
17. **Crear Usuario** (`/admin/usuarios/crear`)
18. **Editar Usuario** (`/admin/usuarios/{id}/editar`)
19. **Gestión de Reservas** (`/admin/reservas`) - Administración de todas las reservas
20. **Reportes** (`/admin/reportes`) - Estadísticas y métricas del sistema

---

## 4.3 Niveles de Usuario Implementados

### Nivel 1: Cliente (Client)

#### Credenciales de Prueba
```
Email:      client@libroconecta.com
Contraseña: password
```

#### Descripción
Usuario estándar que representa a los clientes de la librería. Puede explorar el catálogo y gestionar sus propias reservas.

#### Permisos y Funcionalidades
| Permiso | Descripción |
|---------|-------------|
| `viewCatalog` | Explorar el catálogo completo de libros |
| `viewBookDetails` | Ver información detallada de cualquier libro |
| `createReservation` | Crear nuevas reservas de libros disponibles |
| `viewOwnReservations` | Ver historial de sus propias reservas |
| `cancelOwnReservation` | Cancelar sus reservas pendientes o confirmadas |
| `editProfile` | Modificar su información personal |
| `changePassword` | Actualizar su contraseña |

#### Pantallas Accesibles
- `/catalogo` - Catálogo público
- `/libro/{id}` - Detalle de libro
- `/dashboard` - Dashboard personalizado (vista cliente)
- `/reservas` - Mis reservas
- `/reservas/nueva` - Nueva reserva
- `/reservas/{id}` - Detalle de reserva propia
- `/perfil` - Editar perfil

#### Restricciones
- No puede acceder al panel de administración (`/admin/*`)
- No puede ver reservas de otros usuarios
- No puede modificar libros, categorías o usuarios
- No puede cambiar estados de reservas (solo cancelar las propias)

---

### Nivel 2: Administrador (Administrator)

#### Credenciales de Prueba
```
Email:      admin@libroconecta.com
Contraseña: password
```

#### Descripción
Usuario con acceso total al sistema. Puede gestionar todos los recursos: libros, categorías, usuarios y reservas.

#### Permisos y Funcionalidades
| Permiso | Descripción |
|---------|-------------|
| `manageBooks` | CRUD completo de libros (crear, editar, eliminar) |
| `manageCategories` | CRUD completo de categorías |
| `manageUsers` | CRUD completo de usuarios y asignación de roles |
| `manageReservations` | Ver y modificar estado de todas las reservas |
| `viewReports` | Acceso a reportes y estadísticas del sistema |
| `viewDashboardStats` | Ver métricas globales en dashboard |
| `fullAccess` | Acceso a todas las funcionalidades del sistema |

#### Pantallas Accesibles
**Todas las pantallas de Cliente, más:**
- `/dashboard` - Dashboard con estadísticas globales (vista admin)
- `/admin/libros` - Gestión de libros
- `/admin/libros/crear` - Crear libro
- `/admin/libros/{id}/editar` - Editar libro
- `/admin/categorias` - Gestión de categorías
- `/admin/categorias/crear` - Crear categoría
- `/admin/categorias/{id}/editar` - Editar categoría
- `/admin/usuarios` - Gestión de usuarios
- `/admin/usuarios/crear` - Crear usuario
- `/admin/usuarios/{id}/editar` - Editar usuario
- `/admin/reservas` - Gestión de reservas
- `/admin/reportes` - Reportes y estadísticas

#### Capacidades Especiales
- Acceso al sidebar de administración
- Visualización de estadísticas globales
- Gestión de stock de libros
- Cambio de estados de reservas
- Creación de nuevos usuarios con cualquier rol

---

## 4.4 Tecnologías Utilizadas en el Prototipo

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **HTML5** | - | Estructura semántica de las páginas |
| **CSS3** | - | Estilos base y animaciones |
| **JavaScript** | ES6+ | Lógica del lado del cliente |
| **React** | 19.2.4 | Biblioteca para construir interfaces de usuario |
| **Inertia.js** | 2.3.13 | Puente entre Laravel y React (SPA sin API) |
| **Tailwind CSS** | 4.0.0 | Framework CSS utility-first para estilos |
| **Vite** | 7.0.7 | Bundler y servidor de desarrollo |

### Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **PHP** | 8.2.12 | Lenguaje de programación del servidor |
| **Laravel** | 12.50.0 | Framework PHP para el backend |
| **Eloquent ORM** | (incluido) | Mapeo objeto-relacional para base de datos |
| **Composer** | 2.x | Gestor de dependencias PHP |

### Base de Datos

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **MySQL** | 8.0+ | Sistema de gestión de base de datos relacional |
| **Migraciones Laravel** | - | Control de versiones del esquema de BD |
| **Seeders** | - | Datos de prueba iniciales |

### Servidor de Desarrollo

| Tecnología | Propósito |
|------------|-----------|
| **XAMPP** | Paquete que incluye Apache y MySQL |
| **Apache** | Servidor web HTTP |

### Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| **npm** | Gestor de paquetes JavaScript |
| **Git** | Control de versiones |
| **Ziggy** | Generador de rutas Laravel para JavaScript |

### Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   React     │  │ Tailwind    │  │    Inertia.js       │  │
│  │ Components  │  │    CSS      │  │   (Client Adapter)  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        SERVIDOR                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    Laravel 12                        │    │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────────┐    │    │
│  │  │Controllers│  │ Middleware│  │ Form Requests │    │    │
│  │  └───────────┘  └───────────┘  └───────────────┘    │    │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────────┐    │    │
│  │  │  Models   │  │  Routes   │  │ Inertia.js    │    │    │
│  │  │ (Eloquent)│  │  (web)    │  │ (Server)      │    │    │
│  │  └───────────┘  └───────────┘  └───────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     BASE DE DATOS                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                      MySQL                           │    │
│  │   users │ roles │ books │ categories │ reservations │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 4.5 Estructura de Archivos

### Diagrama de Estructura Principal

```
Proyecto_LibreríaConecta/
│
├── app/                              # Código principal de la aplicación
│   ├── Http/
│   │   ├── Controllers/              # Controladores MVC
│   │   │   ├── AuthController.php        # Autenticación (login/logout)
│   │   │   ├── BookController.php        # CRUD de libros + catálogo
│   │   │   ├── CategoryController.php    # CRUD de categorías
│   │   │   ├── DashboardController.php   # Dashboard + reportes
│   │   │   ├── ReservationController.php # Gestión de reservas
│   │   │   └── UserController.php        # CRUD usuarios + perfil
│   │   │
│   │   ├── Middleware/               # Middleware de la aplicación
│   │   │   ├── HandleInertiaRequests.php # Datos compartidos con React
│   │   │   ├── RoleMiddleware.php        # Control de acceso por rol
│   │   │   └── CheckRole.php             # Verificación múltiples roles
│   │   │
│   │   └── Requests/                 # Validación de formularios
│   │       ├── StoreBookRequest.php
│   │       ├── UpdateBookRequest.php
│   │       ├── StoreCategoryRequest.php
│   │       ├── UpdateCategoryRequest.php
│   │       ├── StoreReservationRequest.php
│   │       ├── UpdateReservationRequest.php
│   │       ├── UpdateProfileRequest.php
│   │       └── UpdatePasswordRequest.php
│   │
│   ├── Models/                       # Modelos Eloquent
│   │   ├── Book.php                      # Modelo de libros
│   │   ├── Category.php                  # Modelo de categorías
│   │   ├── Reservation.php               # Modelo de reservas
│   │   ├── Role.php                      # Modelo de roles
│   │   └── User.php                      # Modelo de usuarios
│   │
│   └── Providers/                    # Proveedores de servicios
│       └── AppServiceProvider.php
│
├── bootstrap/                        # Arranque de la aplicación
│   ├── app.php                           # Configuración de middleware
│   └── providers.php
│
├── config/                           # Archivos de configuración
│   ├── app.php
│   ├── auth.php
│   ├── database.php
│   └── ...
│
├── database/                         # Base de datos
│   ├── migrations/                   # Migraciones (esquema de BD)
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 2026_02_06_191711_create_roles_table.php
│   │   ├── 2026_02_06_191717_create_categories_table.php
│   │   ├── 2026_02_06_191724_create_books_table.php
│   │   ├── 2026_02_06_191729_create_reservations_table.php
│   │   └── 2026_02_06_191856_add_role_id_to_users_table.php
│   │
│   └── seeders/                      # Datos de prueba
│       ├── DatabaseSeeder.php            # Seeder principal
│       ├── RoleSeeder.php                # Roles (Admin, Client)
│       ├── UserSeeder.php                # Usuarios de prueba
│       ├── CategorySeeder.php            # 12 categorías
│       └── BookSeeder.php                # 23 libros de ejemplo
│
├── public/                           # Archivos públicos (punto de entrada)
│   ├── index.php                         # Punto de entrada principal
│   ├── storage/                          # Enlace simbólico a storage
│   └── .htaccess
│
├── resources/                        # Recursos del frontend
│   ├── css/
│   │   └── app.css                       # Estilos globales + Tailwind
│   │
│   ├── js/
│   │   ├── app.jsx                       # Punto de entrada React
│   │   ├── bootstrap.js                  # Configuración inicial
│   │   │
│   │   ├── Components/               # Componentes reutilizables
│   │   │   ├── Alert.jsx
│   │   │   ├── BookCard.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── DangerButton.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── InputError.jsx
│   │   │   ├── InputLabel.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── PrimaryButton.jsx
│   │   │   ├── SearchInput.jsx
│   │   │   ├── SecondaryButton.jsx
│   │   │   ├── SelectInput.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── TextArea.jsx
│   │   │   └── TextInput.jsx
│   │   │
│   │   ├── Layouts/                  # Layouts base
│   │   │   ├── AdminLayout.jsx           # Layout panel admin (sidebar)
│   │   │   ├── AuthenticatedLayout.jsx   # Layout usuarios autenticados
│   │   │   ├── GuestLayout.jsx           # Layout login/público
│   │   │   └── PublicLayout.jsx          # Layout catálogo público
│   │   │
│   │   └── Pages/                    # Páginas (rutas)
│   │       ├── Dashboard.jsx             # Dashboard (admin/cliente)
│   │       │
│   │       ├── Auth/
│   │       │   └── Login.jsx             # Página de login
│   │       │
│   │       ├── Books/
│   │       │   ├── Index.jsx             # Catálogo público
│   │       │   └── Show.jsx              # Detalle de libro
│   │       │
│   │       ├── Reservations/
│   │       │   ├── Index.jsx             # Mis reservas
│   │       │   ├── Create.jsx            # Nueva reserva
│   │       │   └── Show.jsx              # Detalle reserva
│   │       │
│   │       ├── Profile/
│   │       │   └── Edit.jsx              # Editar perfil
│   │       │
│   │       └── Admin/
│   │           ├── Reports.jsx           # Reportes
│   │           │
│   │           ├── Books/
│   │           │   ├── Index.jsx         # Lista libros admin
│   │           │   ├── Create.jsx        # Crear libro
│   │           │   └── Edit.jsx          # Editar libro
│   │           │
│   │           ├── Categories/
│   │           │   ├── Index.jsx         # Lista categorías
│   │           │   ├── Create.jsx        # Crear categoría
│   │           │   └── Edit.jsx          # Editar categoría
│   │           │
│   │           ├── Users/
│   │           │   ├── Index.jsx         # Lista usuarios
│   │           │   ├── Create.jsx        # Crear usuario
│   │           │   └── Edit.jsx          # Editar usuario
│   │           │
│   │           └── Reservations/
│   │               └── Index.jsx         # Gestión reservas
│   │
│   └── views/
│       └── app.blade.php                 # Template base HTML
│
├── routes/                           # Definición de rutas
│   ├── web.php                           # Rutas web principales
│   └── console.php                       # Comandos Artisan
│
├── storage/                          # Almacenamiento
│   ├── app/public/                       # Archivos públicos (imágenes)
│   ├── framework/                        # Caché, sesiones, vistas
│   └── logs/                             # Logs de la aplicación
│
├── tests/                            # Pruebas automatizadas
│   ├── Feature/
│   └── Unit/
│
├── .env                              # Variables de entorno (local)
├── .env.example                      # Plantilla de variables
├── composer.json                     # Dependencias PHP
├── package.json                      # Dependencias JavaScript
├── vite.config.js                    # Configuración de Vite
├── README.md                         # Documentación básica
└── DOCUMENTACION_PROTOTIPO.md        # Este archivo
```

### Descripción de Carpetas Clave

| Carpeta | Descripción |
|---------|-------------|
| `app/Http/Controllers` | Lógica de negocio, manejo de requests y responses |
| `app/Http/Middleware` | Filtros de request (autenticación, roles) |
| `app/Http/Requests` | Clases de validación de formularios |
| `app/Models` | Entidades del dominio con relaciones Eloquent |
| `database/migrations` | Definición versionada del esquema de BD |
| `database/seeders` | Datos de prueba para desarrollo |
| `resources/js/Components` | Componentes React reutilizables |
| `resources/js/Layouts` | Estructuras base de páginas |
| `resources/js/Pages` | Páginas completas (una por ruta) |
| `routes/web.php` | Definición de todas las rutas HTTP |

---

## 4.6 Instrucciones de Instalación y Ejecución

### Requisitos Previos

| Software | Versión Mínima | Descarga |
|----------|----------------|----------|
| XAMPP | 8.2+ | https://www.apachefriends.org/ |
| Node.js | 18.x | https://nodejs.org/ |
| Composer | 2.x | https://getcomposer.org/ |
| Git | 2.x | https://git-scm.com/ |

### Paso 1: Configurar XAMPP

1. Instalar XAMPP con PHP 8.2 o superior
2. Iniciar el **Panel de Control de XAMPP**
3. Iniciar los servicios:
   - **Apache** → Click en "Start"
   - **MySQL** → Click en "Start"

### Paso 2: Crear la Base de Datos

1. Abrir phpMyAdmin: http://localhost/phpmyadmin
2. Click en "Nueva" (panel izquierdo)
3. Nombre de la base de datos: `libreria_conecta`
4. Cotejamiento: `utf8mb4_unicode_ci`
5. Click en "Crear"

### Paso 3: Clonar o Copiar el Proyecto

```bash
# Opción A: Si tienes Git
cd C:\xampp\htdocs
git clone [URL_DEL_REPOSITORIO] Proyecto_LibreríaConecta

# Opción B: Copiar manualmente
# Copiar la carpeta del proyecto a C:\xampp\htdocs\Proyecto_LibreríaConecta
```

### Paso 4: Instalar Dependencias PHP

Abrir terminal (CMD o PowerShell) en la carpeta del proyecto:

```bash
cd C:\xampp\htdocs\Proyecto_LibreríaConecta
composer install
```

### Paso 5: Instalar Dependencias JavaScript

```bash
npm install
```

### Paso 6: Configurar Variables de Entorno

1. Copiar el archivo de ejemplo:
```bash
copy .env.example .env
```

2. Generar clave de aplicación:
```bash
php artisan key:generate
```

3. Editar `.env` y verificar la configuración de base de datos:
```env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=libreria_conecta
DB_USERNAME=root
DB_PASSWORD=
```

### Paso 7: Ejecutar Migraciones y Seeders

```bash
php artisan migrate:fresh --seed
```

Esto creará:
- Las tablas de la base de datos
- 2 roles (Administrator, Client)
- 2 usuarios de prueba
- 12 categorías
- 23 libros de ejemplo

### Paso 8: Crear Enlace Simbólico de Storage

```bash
php artisan storage:link
```

### Paso 9: Iniciar el Servidor de Desarrollo de Vite

Abrir una terminal y ejecutar:

```bash
npm run dev
```

**Dejar esta terminal abierta** mientras se usa la aplicación.

### Paso 10: Acceder a la Aplicación

Abrir el navegador y visitar:

```
http://localhost/Proyecto_LibreríaConecta/public
```

### Credenciales de Acceso

| Rol | Email | Contraseña |
|-----|-------|------------|
| **Administrador** | admin@libroconecta.com | password |
| **Cliente** | client@libroconecta.com | password |

### Solución de Problemas Comunes

#### Error: "npm no reconocido"
```bash
# Verificar que Node.js esté instalado
node --version
npm --version
```

#### Error: "Ejecución de scripts deshabilitada" (PowerShell)
```powershell
# Ejecutar como Administrador:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Error: "Class Ziggy not found"
```bash
composer dump-autoload
php artisan config:clear
php artisan cache:clear
```

#### Error: Página en blanco
1. Verificar que `npm run dev` esté ejecutándose
2. Verificar que Apache y MySQL estén corriendo
3. Revisar logs: `storage/logs/laravel.log`

---

## 4.7 Limitaciones Conocidas

### Funcionalidades No Implementadas

| Funcionalidad | Descripción | Prioridad para Futuro |
|---------------|-------------|----------------------|
| Registro público | Los usuarios no pueden registrarse por sí mismos | Alta |
| Recuperar contraseña | No existe flujo de "olvidé mi contraseña" | Alta |
| Verificación de email | No se verifica el correo electrónico | Media |
| Notificaciones email | No se envían emails de confirmación de reservas | Media |
| Subida de imágenes | Las portadas de libros no se suben (placeholder) | Media |
| Pasarela de pago | No hay proceso de pago/compra | Baja |
| API REST | No hay API para aplicaciones móviles | Baja |
| PWA | No es instalable como app | Baja |

### Limitaciones Técnicas

| Limitación | Impacto | Mitigación |
|------------|---------|------------|
| Sesiones en BD | Rendimiento limitado con muchos usuarios | Migrar a Redis en producción |
| Sin caché de rutas | Tiempo de carga ligeramente mayor | Ejecutar `php artisan route:cache` en producción |
| Sin CDN | Assets servidos localmente | Configurar CDN para producción |
| Sin HTTPS | Tráfico no cifrado | Configurar certificado SSL en producción |

### Limitaciones de Datos de Prueba

- Los 23 libros de ejemplo no tienen imágenes de portada reales
- Las reservas de ejemplo no están pre-creadas (se crean manualmente)
- Los precios son ficticios y en USD

### Compatibilidad de Navegadores

| Navegador | Versión Mínima | Estado |
|-----------|----------------|--------|
| Chrome | 90+ | ✅ Probado |
| Firefox | 88+ | ✅ Compatible |
| Safari | 14+ | ⚠️ No probado |
| Edge | 90+ | ✅ Compatible |
| IE 11 | - | ❌ No soportado |

### Limitaciones de Responsividad

- Tablas de administración pueden requerir scroll horizontal en móviles muy pequeños (<320px)
- El sidebar de admin se colapsa correctamente pero puede sentirse ajustado en tablets en modo portrait

---

## 4.8 URL del Prototipo

### Entorno Local (Desarrollo)

```
URL: http://localhost/Proyecto_LibreríaConecta/public
```

### Credenciales de Prueba

#### Administrador
```
Email:      admin@libroconecta.com
Contraseña: password
```

**Acceso a:**
- Dashboard con estadísticas globales
- Gestión completa de libros, categorías, usuarios y reservas
- Reportes del sistema

#### Cliente
```
Email:      client@libroconecta.com
Contraseña: password
```

**Acceso a:**
- Catálogo de libros
- Crear y gestionar reservas propias
- Editar perfil personal

### Despliegue en Producción (Pendiente)

El prototipo actualmente solo está configurado para entorno local. Para desplegar en producción se requiere:

1. Servidor con PHP 8.2+
2. Base de datos MySQL/MariaDB
3. Configurar variables de entorno de producción
4. Ejecutar optimizaciones:
   ```bash
   npm run build
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```
5. Configurar HTTPS con certificado SSL
6. Configurar dominio DNS

---

## Información Adicional

### Contacto del Desarrollador

Este prototipo fue desarrollado como parte del proyecto **LibroConecta** - Sistema de gestión de catálogo y reservas para librería local.

### Licencia

MIT License - Libre para uso educativo y comercial.

### Fecha de Documentación

Febrero 2026

---

*Documento generado como parte de la entrega del prototipo funcional del sistema LibroConecta.*
