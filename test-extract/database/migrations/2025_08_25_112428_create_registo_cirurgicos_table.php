<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registo_cirurgicos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utente_id')->constrained()->onDelete('cascade');
            $table->date('data_cirurgia');
            $table->foreignId('tipo_de_cirurgia_id')->constrained()->onDelete('cascade');
            $table->string('tipo_de_abordagem');
            $table->text('observacoes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registo_cirurgicos');
    }
};
