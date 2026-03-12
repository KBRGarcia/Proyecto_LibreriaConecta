<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user()->load('role');

        if ($user->isAdmin()) {
            return $this->adminDashboard();
        }

        return $this->clientDashboard($user);
    }

    /**
     * Admin dashboard with statistics.
     */
    private function adminDashboard()
    {
        $stats = [
            'totalBooks' => Book::count(),
            'totalUsers' => User::count(),
            'totalReservations' => Reservation::count(),
            'pendingReservations' => Reservation::where('status', 'pendiente')->count(),
            'confirmedReservations' => Reservation::where('status', 'confirmada')->count(),
            'totalCategories' => Category::count(),
        ];

        $recentReservations = Reservation::with(['user', 'book'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $lowStockBooks = Book::where('stock', '<=', 3)
            ->orderBy('stock')
            ->limit(5)
            ->get();

        // Chart data: Libros por categoría
        $booksByCategory = Category::withCount('books')
            ->orderBy('books_count', 'desc')
            ->get()
            ->map(fn($cat) => ['label' => $cat->name, 'value' => $cat->books_count]);

        // Chart data: Usuarios registrados por rol
        $usersByRole = User::with('role')
            ->get()
            ->groupBy(fn($u) => $u->role?->name ?? 'Sin Rol')
            ->map(fn($group, $roleName) => ['label' => $roleName, 'value' => $group->count()])
            ->values();

        // Chart data: Préstamos/Reservas activos por mes (últimos 6 meses)
        $activeReservationsByMonth = Reservation::selectRaw(
                "DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count"
            )
            ->where('created_at', '>=', now()->subMonths(6)->startOfMonth())
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn($r) => ['label' => $r->month, 'value' => $r->count]);

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentReservations' => $recentReservations,
            'lowStockBooks' => $lowStockBooks,
            'chartData' => [
                'booksByCategory' => $booksByCategory,
                'usersByRole' => $usersByRole,
                'activeReservationsByMonth' => $activeReservationsByMonth,
            ],
        ]);
    }

    /**
     * Client dashboard.
     */
    private function clientDashboard($user)
    {
        $myReservations = $user->reservations()
            ->with('book')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $featuredBooks = Book::with('category')
            ->where('stock', '>', 0)
            ->inRandomOrder()
            ->limit(4)
            ->get();

        $stats = [
            'totalReservations' => $user->reservations()->count(),
            'pendingReservations' => $user->reservations()->where('status', 'pendiente')->count(),
            'confirmedReservations' => $user->reservations()->where('status', 'confirmada')->count(),
        ];

        return Inertia::render('Dashboard', [
            'myReservations' => $myReservations,
            'featuredBooks' => $featuredBooks,
            'stats' => $stats,
        ]);
    }

    /**
     * Admin reports page.
     */
    public function reports()
    {
        $reservationsByStatus = Reservation::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->get();

        $booksByCategory = Category::withCount('books')->get();

        $monthlyReservations = Reservation::selectRaw('MONTH(created_at) as month, YEAR(created_at) as year, count(*) as count')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->limit(12)
            ->get();

        $topBooks = Book::withCount('reservations')
            ->orderBy('reservations_count', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Reports', [
            'reservationsByStatus' => $reservationsByStatus,
            'booksByCategory' => $booksByCategory,
            'monthlyReservations' => $monthlyReservations,
            'topBooks' => $topBooks,
        ]);
    }
}
