# LibroConecta

Sistema web para gestión de catálogo y reservas de una librería local.

## Stack Tecnológico

- **Backend**: Laravel 12 + PHP 8.2
- **Frontend**: React 19 + Inertia.js + Tailwind CSS 4
- **Base de Datos**: MySQL
- **Bundler**: Vite

## Arquitectura

- **Patrón Backend**: MVC (Model-View-Controller)
- **Patrón Frontend**: SPA via Inertia.js
- **Estilo**: Client-Server con separación de responsabilidades

## Características

### Autenticación y Roles
- Sistema de login seguro con sesiones
- Dos niveles de usuario:
  - **Administrador**: Gestión completa del sistema
  - **Cliente**: Acceso a catálogo y reservas propias

### Funcionalidades Cliente
- Explorar catálogo de libros
- Ver detalle de libros
- Crear y gestionar reservas
- Editar perfil personal

### Funcionalidades Administrador
- Dashboard con estadísticas
- Gestión de libros (CRUD)
- Gestión de categorías (CRUD)
- Gestión de usuarios (CRUD)
- Gestión de reservas
- Reportes y estadísticas

### Diseño
- Responsive (Mobile First)
- Interfaz moderna con Tailwind CSS
- Navegación intuitiva

## Instalación

### Requisitos
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8+

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd Proyecto_LibreríaConecta
   ```

2. **Instalar dependencias PHP**
   ```bash
   composer install
   ```

3. **Instalar dependencias JavaScript**
   ```bash
   npm install
   ```

4. **Configurar entorno**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configurar base de datos**
   Edita `.env` con tus credenciales de MySQL:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=libroconecta
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. **Crear enlace simbólico para storage**
   ```bash
   php artisan storage:link
   ```

7. **Ejecutar migraciones y seeders**
   ```bash
   php artisan migrate --seed
   ```

## Ejecución

### Desarrollo

Terminal 1 - Servidor Laravel:
```bash
php artisan serve
```

Terminal 2 - Vite (assets):
```bash
npm run dev
```

Acceder a: http://localhost:8000

### Producción

```bash
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Credenciales de Prueba

### Administrador
- **Email**: admin@libroconecta.com
- **Contraseña**: password

### Cliente
- **Email**: client@libroconecta.com
- **Contraseña**: password

## Estructura del Proyecto

```
├── app/
│   ├── Http/
│   │   ├── Controllers/      # Controladores RESTful
│   │   ├── Middleware/       # Middleware de autenticación y roles
│   │   └── Requests/         # Form Requests para validaciones
│   └── Models/               # Modelos Eloquent
├── database/
│   ├── migrations/           # Migraciones de base de datos
│   └── seeders/              # Datos de prueba
├── resources/
│   ├── js/
│   │   ├── Components/       # Componentes React reutilizables
│   │   ├── Layouts/          # Layouts base
│   │   └── Pages/            # Páginas completas
│   └── css/                  # Estilos globales
├── routes/
│   └── web.php               # Definición de rutas
└── public/                   # Assets públicos
```

## Rutas Principales

### Públicas
- `/catalogo` - Catálogo de libros
- `/libro/{id}` - Detalle de libro
- `/login` - Inicio de sesión

### Cliente (autenticado)
- `/dashboard` - Panel principal
- `/reservas` - Mis reservas
- `/perfil` - Mi perfil

### Administrador
- `/admin/libros` - Gestión de libros
- `/admin/categorias` - Gestión de categorías
- `/admin/usuarios` - Gestión de usuarios
- `/admin/reservas` - Gestión de reservas
- `/admin/reportes` - Reportes

## Entidades de Base de Datos

- **users**: Usuarios del sistema
- **roles**: Roles (Administrator, Client)
- **books**: Catálogo de libros
- **categories**: Categorías de libros
- **reservations**: Reservas de libros

## Seguridad

- Protección CSRF
- Hashing de contraseñas (Bcrypt)
- Validación de datos en Form Requests
- Middleware de autorización por rol
- Protección contra SQL Injection via Eloquent

## Testing

```bash
php artisan test
```

## Licencia

MIT License
