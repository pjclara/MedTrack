<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Add tipo_de_abordagem_id column
        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->foreignId('tipo_de_abordagem_id')->nullable()->after('tipo_de_abordagem');
        });

        // 2. Migrate existing data: create TipoDeAbordagem entries for each user and link them
        $registos = DB::table('registo_cirurgicos')
            ->whereNotNull('tipo_de_abordagem')
            ->where('tipo_de_abordagem', '!=', '')
            ->select('user_id', 'tipo_de_abordagem')
            ->distinct()
            ->get();

        foreach ($registos as $registo) {
            $existing = DB::table('tipo_de_abordagems')
                ->where('user_id', $registo->user_id)
                ->where('nome', $registo->tipo_de_abordagem)
                ->first();

            if (!$existing) {
                DB::table('tipo_de_abordagems')->insert([
                    'nome' => $registo->tipo_de_abordagem,
                    'user_id' => $registo->user_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 3. Update registo_cirurgicos to point to the new tipo_de_abordagem_id
        $tiposAbordagem = DB::table('tipo_de_abordagems')->get();
        foreach ($tiposAbordagem as $tipo) {
            DB::table('registo_cirurgicos')
                ->where('user_id', $tipo->user_id)
                ->where('tipo_de_abordagem', $tipo->nome)
                ->update(['tipo_de_abordagem_id' => $tipo->id]);
        }

        // 4. Drop old column and add FK constraint
        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->dropColumn('tipo_de_abordagem');
        });

        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->foreign('tipo_de_abordagem_id')
                ->references('id')
                ->on('tipo_de_abordagems')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->dropForeign(['tipo_de_abordagem_id']);
            $table->string('tipo_de_abordagem')->nullable()->after('tipo_de_abordagem_id');
        });

        // Restore data
        $registos = DB::table('registo_cirurgicos')
            ->whereNotNull('tipo_de_abordagem_id')
            ->get();

        foreach ($registos as $registo) {
            $tipo = DB::table('tipo_de_abordagems')->find($registo->tipo_de_abordagem_id);
            if ($tipo) {
                DB::table('registo_cirurgicos')
                    ->where('id', $registo->id)
                    ->update(['tipo_de_abordagem' => $tipo->nome]);
            }
        }

        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->dropColumn('tipo_de_abordagem_id');
        });
    }
};
