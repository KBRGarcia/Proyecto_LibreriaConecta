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
            'pendingReservations' => Reservation::where('status', 'pending')->count(),
            'confirmedReservations' => Reservation::where('status', 'confirmed')->count(),
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

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentReservations' => $recentReservations,
            'lowStockBooks' => $lowStockBooks,
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
            'pendingReservations' => $user->reservations()->where('status', 'pending')->count(),
            'confirmedReservations' => $user->reservations()->where('status', 'confirmed')->count(),
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
