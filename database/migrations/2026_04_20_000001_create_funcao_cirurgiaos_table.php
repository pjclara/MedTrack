<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('funcao_cirurgiaos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->timestamps();
        });

        // Seed com os valores do enum original
        DB::table('funcao_cirurgiaos')->insert([
            ['nome' => 'Cirurgião Principal', 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Cirurgião Assistente', 'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Residente',           'created_at' => now(), 'updated_at' => now()],
            ['nome' => 'Interno',             'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('funcao_cirurgiaos');
    }
};
