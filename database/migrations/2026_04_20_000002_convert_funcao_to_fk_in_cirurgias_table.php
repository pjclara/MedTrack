<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Adicionar coluna funcao_cirurgiao_id (nullable por enquanto)
        Schema::table('cirurgias', function (Blueprint $table) {
            $table->foreignId('funcao_cirurgiao_id')->nullable()->after('funcao');
        });

        // 2. Migrar dados existentes: mapear string -> id
        $funcoes = DB::table('funcao_cirurgiaos')->get()->keyBy('nome');

        DB::table('cirurgias')
            ->whereNotNull('funcao')
            ->where('funcao', '!=', '')
            ->get(['id', 'funcao'])
            ->each(function ($cirurgia) use ($funcoes) {
                $funcaoObj = $funcoes->get($cirurgia->funcao);
                if ($funcaoObj) {
                    DB::table('cirurgias')
                        ->where('id', $cirurgia->id)
                        ->update(['funcao_cirurgiao_id' => $funcaoObj->id]);
                }
            });

        // 3. Remover coluna antiga e adicionar FK constraint
        Schema::table('cirurgias', function (Blueprint $table) {
            $table->dropColumn('funcao');
        });

        Schema::table('cirurgias', function (Blueprint $table) {
            $table->foreign('funcao_cirurgiao_id')
                ->references('id')
                ->on('funcao_cirurgiaos')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        // Reverter: adicionar coluna funcao de volta
        Schema::table('cirurgias', function (Blueprint $table) {
            $table->dropForeign(['funcao_cirurgiao_id']);
            $table->dropColumn('funcao_cirurgiao_id');
            $table->string('funcao')->nullable();
        });
    }
};
