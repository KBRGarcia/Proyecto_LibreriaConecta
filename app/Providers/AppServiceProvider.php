<?php

namespace App\Providers;

use App\Hashing\PlainTextFallbackHasher;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        // Driver temporal: permite contraseñas en texto plano o Bcrypt para evitar
        // "This password does not use the Bcrypt algorithm" en hosting con datos legacy.
        Hash::extend('plain_fallback', function () {
            return new PlainTextFallbackHasher;
        });

        // En producción forzar plain_fallback aunque la config esté cacheada o .env use bcrypt
        if ($this->app->environment('production')) {
            config(['hashing.driver' => 'plain_fallback']);
            Hash::forgetDrivers();
        }
    }
}
