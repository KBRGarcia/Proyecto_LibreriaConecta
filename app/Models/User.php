<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role_id',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['full_name'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function actionLogs()
    {
        return $this->hasMany(ActionLog::class);
    }

    public function isAdmin(): bool
    {
        return $this->role && $this->role->name === 'Administrador';
    }

    public function isClient(): bool
    {
        return $this->role && $this->role->name === 'Cliente';
    }

    public function isEmpleado(): bool
    {
        return $this->role && $this->role->name === 'Empleado';
    }

    public function isSupervisor(): bool
    {
        return $this->role && $this->role->name === 'Supervisor';
    }

    public function isActivo(): bool
    {
        return $this->status === 'activo';
    }
}
