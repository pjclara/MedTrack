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
        Schema::create('formacoes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Basic Info
            $table->string('titulo');
            $table->text('descricao')->nullable();
            $table->string('tipo'); // Enum: TipoFormacaoEnum
            
            // Dates & Duration
            $table->date('data_inicio');
            $table->date('data_fim')->nullable();
            $table->integer('duracao_horas')->nullable();
            
            // Organization Details
            $table->string('entidade_organizadora')->nullable();
            $table->string('localizacao')->nullable();
            $table->string('categoria')->nullable(); // Nacional/Internacional/Regional/Local
            
            // Participation Type
            $table->string('tipo_participacao')->nullable(); // Enum: TipoParticipacaoEnum
            $table->string('tema_apresentacao')->nullable();
            
            // Certification
            $table->string('certificado_path')->nullable();
            $table->string('certificado_original_name')->nullable();
            $table->integer('certificado_size')->nullable();
            $table->decimal('creditos', 8, 2)->nullable();
            
            // Additional
            $table->text('observacoes')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('user_id');
            $table->index('tipo');
            $table->index('data_inicio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formacoes');
    }
};
