<?php

namespace App\Hashing;

use Illuminate\Contracts\Hashing\Hasher as HasherContract;
use Illuminate\Hashing\AbstractHasher;

/**
 * Driver de hash que permite contraseñas en texto plano o Bcrypt.
 *
 * - make(): devuelve el valor sin hashear (almacenamiento en texto plano).
 * - check(): si el valor almacenado es Bcrypt ($2y$/$2a$), verifica con password_verify;
 *   si no, compara en texto plano con hash_equals (solución temporal, no recomendado en producción).
 *
 * @see https://laravel.com/docs/12.x/hashing
 */
class PlainTextFallbackHasher extends AbstractHasher implements HasherContract
{
    /**
     * Indica si el valor almacenado tiene formato Bcrypt.
     */
    protected static function isBcryptHash(string $value): bool
    {
        return str_starts_with($value, '$2y$') || str_starts_with($value, '$2a$');
    }

    /**
     * Hash the given value (en este driver no se hashea; se devuelve tal cual).
     */
    public function make(#[\SensitiveParameter] $value, array $options = []): string
    {
        return $value;
    }

    /**
     * Check the given plain value against a hash.
     * Soporta tanto contraseñas Bcrypt como texto plano.
     */
    public function check(#[\SensitiveParameter] $value, $hashedValue, array $options = []): bool
    {
        if ($hashedValue === null || $hashedValue === '') {
            return false;
        }

        if (self::isBcryptHash($hashedValue)) {
            return password_verify($value, $hashedValue);
        }

        return hash_equals($hashedValue, $value);
    }

    /**
     * Get information about the given hashed value.
     */
    public function info($hashedValue): array
    {
        if (self::isBcryptHash($hashedValue)) {
            return password_get_info($hashedValue);
        }

        return [
            'algo' => null,
            'algoName' => 'plain',
            'options' => [],
        ];
    }

    /**
     * Determine if the given hash needs to be rehashed (siempre false para este driver).
     */
    public function needsRehash($hashedValue, array $options = []): bool
    {
        return false;
    }
}
