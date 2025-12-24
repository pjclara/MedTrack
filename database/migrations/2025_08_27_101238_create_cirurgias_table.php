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
        Schema::create('cirurgias', function (Blueprint $table) {
            $table->id();
            //registo
            $table->foreignId('registo_cirurgico_id')->constrained('registo_cirurgicos')->onDelete('cascade');
            $table->foreignId('diagnostico_id')->constrained('diagnosticos')->onDelete('cascade');
            $table->foreignId('procedimento_id')->constrained('procedimentos')->onDelete('cascade');
            $table->string('funcao');
            $table->string('clavien-dindo')->nullable();
            $table->text('observacoes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cirurgias');
    }
};
