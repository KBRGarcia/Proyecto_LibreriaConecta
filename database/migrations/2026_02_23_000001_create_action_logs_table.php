<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('action_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('action', 50);
            $table->string('table_name', 100);
            $table->unsignedBigInteger('record_id');
            $table->text('description');
            $table->string('ip_address', 45);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('action_logs');
    }
};
