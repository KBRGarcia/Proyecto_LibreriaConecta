<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Models\Book;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of user's reservations.
     */
    public function index(Request $request)
    {
        $reservations = $request->user()
            ->reservations()
            ->with('book.category')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Reservations/Index', [
            'reservations' => $reservations,
        ]);
    }

    /**
     * Show the form for creating a new reservation.
     */
    public function create(Request $request)
    {
        $book = null;
        if ($request->filled('book_id')) {
            $book = Book::with('category')->find($request->book_id);
        }

        return Inertia::render('Reservations/Create', [
            'book' => $book,
        ]);
    }

    /**
     * Store a newly created reservation in storage.
     */
    public function store(StoreReservationRequest $request)
    {
        $book = Book::findOrFail($request->book_id);

        if (!$book->isAvailable()) {
            return back()->withErrors(['book_id' => 'Este libro no está disponible actualmente.']);
        }

        $reservation = Reservation::create([
            'user_id' => $request->user()->id,
            'book_id' => $request->book_id,
            'reservation_date' => $request->reservation_date,
            'notes' => $request->notes,
            'status' => 'pending',
        ]);

        return redirect()->route('reservations.index')
            ->with('success', 'Reserva creada exitosamente. Te notificaremos cuando esté confirmada.');
    }

    /**
     * Display the specified reservation.
     */
    public function show(Reservation $reservation)
    {
        $this->authorizeReservation($reservation);

        $reservation->load('book.category', 'user');

        return Inertia::render('Reservations/Show', [
            'reservation' => $reservation,
        ]);
    }

    /**
     * Cancel a reservation.
     */
    public function cancel(Reservation $reservation)
    {
        $this->authorizeReservation($reservation);

        if ($reservation->status === 'completed') {
            return back()->withErrors(['status' => 'No se puede cancelar una reserva completada.']);
        }

        $reservation->update(['status' => 'cancelled']);

        return redirect()->route('reservations.index')
            ->with('success', 'Reserva cancelada exitosamente.');
    }

    /**
     * Admin: Display all reservations.
     */
    public function adminIndex(Request $request)
    {
        $query = Reservation::with(['user', 'book']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            })->orWhereHas('book', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            });
        }

        $reservations = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();

        return Inertia::render('Admin/Reservations/Index', [
            'reservations' => $reservations,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Admin: Update reservation status.
     */
    public function updateStatus(UpdateReservationRequest $request, Reservation $reservation)
    {
        $reservation->update($request->validated());

        return redirect()->route('admin.reservations.index')
            ->with('success', 'Estado de reserva actualizado.');
    }

    /**
     * Check if user is authorized to view/modify reservation.
     */
    private function authorizeReservation(Reservation $reservation)
    {
        if (auth()->user()->isAdmin()) {
            return true;
        }

        if ($reservation->user_id !== auth()->id()) {
            abort(403, 'No tienes permiso para acceder a esta reserva.');
        }

        return true;
    }
}
