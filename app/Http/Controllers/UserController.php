<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\ActionLog;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display user profile.
     */
    public function profile()
    {
        return Inertia::render('Profile/Edit', [
            'user' => auth()->user()->load('role'),
        ]);
    }

    /**
     * Update user profile.
     */
    public function updateProfile(UpdateProfileRequest $request)
    {
        $request->user()->update($request->validated());

        return redirect()->route('profile')
            ->with('success', 'Perfil actualizado exitosamente.');
    }

    /**
     * Update user password.
     */
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $request->user()->update([
            'password' => $request->password,
        ]);

        return redirect()->route('profile')
            ->with('success', 'Contraseña actualizada exitosamente.');
    }

    /**
     * Admin: Display a listing of users.
     */
    public function index(Request $request)
    {
        $query = User::with('role');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role_id', $request->role);
        }

        $users = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();
        $roles = Role::all();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    /**
     * Admin: Show the form for creating a new user.
     */
    public function create()
    {
        $roles = Role::all();

        return Inertia::render('Admin/Users/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Admin: Store a newly created user.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name'  => ['required', 'string', 'max:100'],
            'email'      => ['required', 'email', 'max:150', 'unique:users,email'],
            'password'   => ['required', 'min:8', 'confirmed'],
            'role_id'    => ['required', 'exists:roles,id'],
            'status'     => ['nullable', 'in:activo,inactivo'],
        ]);

        $validated['password'] = $validated['password'];
        $validated['status'] = $validated['status'] ?? 'activo';

        $user = User::create($validated);

        ActionLog::log(
            auth()->id(),
            'INSERT',
            'users',
            $user->id,
            "Usuario '{$user->full_name}' creado por el administrador",
            $request->ip()
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario creado exitosamente.');
    }

    /**
     * Admin: Show the form for editing a user.
     */
    public function edit(User $user)
    {
        $roles = Role::all();

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user->load('role'),
            'roles' => $roles,
        ]);
    }

    /**
     * Admin: Update the specified user.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name'  => ['required', 'string', 'max:100'],
            'email'      => ['required', 'email', 'max:150', 'unique:users,email,' . $user->id],
            'role_id'    => ['required', 'exists:roles,id'],
            'status'     => ['required', 'in:activo,inactivo'],
        ]);

        if ($request->filled('password')) {
            $request->validate([
                'password' => ['min:8', 'confirmed'],
            ]);
            $validated['password'] = $request->password;
        }

        $user->update($validated);

        ActionLog::log(
            auth()->id(),
            'UPDATE',
            'users',
            $user->id,
            "Usuario '{$user->full_name}' actualizado por el administrador",
            $request->ip()
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario actualizado exitosamente.');
    }

    /**
     * Admin: Remove the specified user.
     */
    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->withErrors(['user' => 'No puedes eliminar tu propia cuenta.']);
        }

        $name = $user->full_name;
        $userId = $user->id;
        $user->delete();

        ActionLog::log(
            auth()->id(),
            'DELETE',
            'users',
            $userId,
            "Usuario '{$name}' eliminado del sistema",
            request()->ip()
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario eliminado exitosamente.');
    }
}
