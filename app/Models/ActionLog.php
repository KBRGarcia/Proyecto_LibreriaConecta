<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActionLog extends Model
{
    protected $fillable = [
        'user_id',
        'action',
        'table_name',
        'record_id',
        'description',
        'ip_address',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Registra una acción en la bitácora.
     */
    public static function log(
        int $userId,
        string $action,
        string $tableName,
        int $recordId,
        string $description,
        string $ipAddress = '127.0.0.1'
    ): self {
        return self::create([
            'user_id'    => $userId,
            'action'     => strtoupper($action),
            'table_name' => $tableName,
            'record_id'  => $recordId,
            'description' => $description,
            'ip_address' => $ipAddress,
        ]);
    }
}
