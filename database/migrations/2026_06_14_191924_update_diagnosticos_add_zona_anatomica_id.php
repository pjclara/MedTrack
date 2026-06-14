<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 1) Criar nova coluna
        Schema::table('diagnosticos', function (Blueprint $table) {
            $table->unsignedBigInteger('zona_anatomica_id')->nullable()->after('zona_anatomica');
        });

        // 2) Preencher zona_anatomica_id com base no nome
        DB::table('diagnosticos')
            ->select(['id', 'user_id', 'zona_anatomica'])
            ->whereNotNull('zona_anatomica')
            ->orderBy('id')
            ->chunkById(100, function ($diagnosticos) {
                foreach ($diagnosticos as $diagnostico) {
                    $zonaAnatomicaId = DB::table('zona_anatomicas')
                        ->where('user_id', $diagnostico->user_id)
                        ->where('nome', $diagnostico->zona_anatomica)
                        ->value('id');

                    if ($zonaAnatomicaId) {
                        DB::table('diagnosticos')
                            ->where('id', $diagnostico->id)
                            ->update(['zona_anatomica_id' => $zonaAnatomicaId]);
                    }
                }
            });

        // 3) Criar foreign key
        Schema::table('diagnosticos', function (Blueprint $table) {
            $table->foreign('zona_anatomica_id')
                ->references('id')
                ->on('zona_anatomicas')
                ->nullOnDelete();
        });

        // 4) Remover coluna antiga
        Schema::table('diagnosticos', function (Blueprint $table) {
            $table->dropColumn('zona_anatomica');
        });
    }

    public function down(): void
    {
        Schema::table('diagnosticos', function (Blueprint $table) {
            // Recriar coluna antiga
            $table->string('zona_anatomica')->nullable();
        });

        DB::table('diagnosticos')
            ->select(['id', 'zona_anatomica_id'])
            ->whereNotNull('zona_anatomica_id')
            ->orderBy('id')
            ->chunkById(100, function ($diagnosticos) {
                foreach ($diagnosticos as $diagnostico) {
                    $zonaAnatomicaNome = DB::table('zona_anatomicas')
                        ->where('id', $diagnostico->zona_anatomica_id)
                        ->value('nome');

                    if ($zonaAnatomicaNome) {
                        DB::table('diagnosticos')
                            ->where('id', $diagnostico->id)
                            ->update(['zona_anatomica' => $zonaAnatomicaNome]);
                    }
                }
            });

        Schema::table('diagnosticos', function (Blueprint $table) {
            // Remover FK e coluna nova
            $table->dropForeign(['zona_anatomica_id']);
            $table->dropColumn('zona_anatomica_id');
        });
    }
};
