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
        Schema::create('atividades_cientificas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Basic Info
            $table->string('titulo');
            $table->text('descricao')->nullable();
            $table->string('tipo'); // Enum: Artigo, Poster, Sessão Clínica, etc.
            $table->date('data');
            
            // Publication/Event Details
            $table->string('revista_conferencia')->nullable();
            $table->string('localizacao')->nullable();
            $table->string('categoria')->nullable(); // Nacional/Internacional/Regional
            
            // Authors & Contribution
            $table->text('autores')->nullable();
            $table->boolean('autor_principal')->default(false);
            $table->integer('posicao_autor')->nullable();
            
            // Citation & Impact
            $table->string('doi')->nullable();
            $table->string('isbn')->nullable();
            $table->string('link')->nullable();
            $table->decimal('fator_impacto', 8, 3)->nullable();
            
            // File Attachments
            $table->string('ficheiro_path')->nullable();
            $table->string('ficheiro_original_name')->nullable();
            $table->integer('ficheiro_size')->nullable(); // bytes
            
            // Additional
            $table->text('observacoes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('atividades_cientificas');
    }
};
