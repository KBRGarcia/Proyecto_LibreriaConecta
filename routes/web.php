<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return redirect()->route('books.index');
});

// Public catalog (accessible without login)
Route::get('/catalogo', [BookController::class, 'index'])->name('books.index');
Route::get('/libro/{book}', [BookController::class, 'show'])->name('books.show');

/*
|--------------------------------------------------------------------------
| Guest Routes (only for non-authenticated users)
|--------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'create'])->name('login');
    Route::post('login', [AuthController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    // Logout
    Route::post('logout', [AuthController::class, 'destroy'])->name('logout');

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile
    Route::get('/perfil', [UserController::class, 'profile'])->name('profile');
    Route::put('/perfil', [UserController::class, 'updateProfile'])->name('profile.update');
    Route::put('/perfil/password', [UserController::class, 'updatePassword'])->name('profile.password');

    // Reservations (Client)
    Route::get('/reservas', [ReservationController::class, 'index'])->name('reservations.index');
    Route::get('/reservas/nueva', [ReservationController::class, 'create'])->name('reservations.create');
    Route::post('/reservas', [ReservationController::class, 'store'])->name('reservations.store');
    Route::get('/reservas/{reservation}', [ReservationController::class, 'show'])->name('reservations.show');
    Route::post('/reservas/{reservation}/cancelar', [ReservationController::class, 'cancel'])->name('reservations.cancel');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:Administrator'])->prefix('admin')->name('admin.')->group(function () {
    // Reports
    Route::get('/reportes', [DashboardController::class, 'reports'])->name('reports');

    // Books Management
    Route::get('/libros', [BookController::class, 'adminIndex'])->name('books.index');
    Route::get('/libros/crear', [BookController::class, 'create'])->name('books.create');
    Route::post('/libros', [BookController::class, 'store'])->name('books.store');
    Route::get('/libros/{book}/editar', [BookController::class, 'edit'])->name('books.edit');
    Route::put('/libros/{book}', [BookController::class, 'update'])->name('books.update');
    Route::delete('/libros/{book}', [BookController::class, 'destroy'])->name('books.destroy');

    // Categories Management
    Route::get('/categorias', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categorias/crear', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('/categorias', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/categorias/{category}/editar', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/categorias/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categorias/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    // Users Management
    Route::get('/usuarios', [UserController::class, 'index'])->name('users.index');
    Route::get('/usuarios/crear', [UserController::class, 'create'])->name('users.create');
    Route::post('/usuarios', [UserController::class, 'store'])->name('users.store');
    Route::get('/usuarios/{user}/editar', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/usuarios/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/usuarios/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Reservations Management
    Route::get('/reservas', [ReservationController::class, 'adminIndex'])->name('reservations.index');
    Route::put('/reservas/{reservation}', [ReservationController::class, 'updateStatus'])->name('reservations.update');
});
