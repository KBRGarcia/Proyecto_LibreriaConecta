<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActionLogController extends Controller
{
    public function index(Request $request)
    {
        $query = ActionLog::with('user')->latest();

        if ($request->filled('action')) {
            $query->where('action', $request->action);
        }

        if ($request->filled('table_name')) {
            $query->where('table_name', $request->table_name);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                  ->orWhereHas('user', fn($u) => $u->where('first_name', 'like', "%{$search}%")
                      ->orWhere('last_name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%"));
            });
        }

        $logs = $query->paginate(20)->withQueryString();

        $tables  = ActionLog::distinct()->pluck('table_name')->sort()->values();
        $actions = ['INSERT', 'UPDATE', 'DELETE', 'SELECT'];

        return Inertia::render('Admin/ActionLogs/Index', [
            'logs'    => $logs,
            'tables'  => $tables,
            'actions' => $actions,
            'filters' => $request->only(['action', 'table_name', 'search']),
        ]);
    }
}
