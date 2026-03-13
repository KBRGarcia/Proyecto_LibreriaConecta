<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Book;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function users()
    {
        $users = User::with('role')->get();

        $pdf = Pdf::loadView('reports.users', compact('users'));
        
        return $pdf->download('reporte_usuarios.pdf');
    }

    public function books()
    {
        $books = Book::with('category')->get();

        $pdf = Pdf::loadView('reports.books', compact('books'));
        
        return $pdf->download('reporte_libros.pdf');
    }
}
