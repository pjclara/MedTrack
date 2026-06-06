<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            if (!Schema::hasColumn('registo_cirurgicos', 'hospital_id')) {
                $table->foreignId('hospital_id')->nullable()->after('utente_id');
            }

            if (!Schema::hasColumn('registo_cirurgicos', 'especialidade_id')) {
                $table->foreignId('especialidade_id')->nullable()->after('hospital_id');
            }
        });

        if (Schema::hasColumn('registo_cirurgicos', 'hospital') || Schema::hasColumn('registo_cirurgicos', 'especialidade')) {
            $registos = DB::table('registo_cirurgicos')
                ->select('id', 'user_id', 'hospital', 'especialidade', 'hospital_id', 'especialidade_id')
                ->get();

            foreach ($registos as $registo) {
                $hospitalId = $registo->hospital_id;
                $especialidadeId = $registo->especialidade_id;

                if (!$hospitalId && !empty($registo->hospital)) {
                    $hospitalId = DB::table('hospitals')
                        ->where('user_id', $registo->user_id)
                        ->where('nome', $registo->hospital)
                        ->value('id');
                }

                if (!$especialidadeId && !empty($registo->especialidade)) {
                    $especialidadeId = DB::table('especialidades')
                        ->where('user_id', $registo->user_id)
                        ->where('nome', $registo->especialidade)
                        ->value('id');
                }

                DB::table('registo_cirurgicos')
                    ->where('id', $registo->id)
                    ->update([
                        'hospital_id' => $hospitalId,
                        'especialidade_id' => $especialidadeId,
                    ]);
            }
        }

        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->foreign('hospital_id')->references('id')->on('hospitals')->nullOnDelete();
            $table->foreign('especialidade_id')->references('id')->on('especialidades')->nullOnDelete();
        });

        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            if (Schema::hasColumn('registo_cirurgicos', 'hospital')) {
                $table->dropColumn('hospital');
            }

            if (Schema::hasColumn('registo_cirurgicos', 'especialidade')) {
                $table->dropColumn('especialidade');
            }
        });
    }

    public function down(): void
    {
        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            if (!Schema::hasColumn('registo_cirurgicos', 'hospital')) {
                $table->string('hospital')->nullable()->after('utente_id');
            }

            if (!Schema::hasColumn('registo_cirurgicos', 'especialidade')) {
                $table->string('especialidade')->nullable()->after('hospital');
            }
        });

        $registos = DB::table('registo_cirurgicos')
            ->select('id', 'hospital_id', 'especialidade_id')
            ->get();

        foreach ($registos as $registo) {
            $hospitalNome = null;
            $especialidadeNome = null;

            if (!empty($registo->hospital_id)) {
                $hospitalNome = DB::table('hospitals')
                    ->where('id', $registo->hospital_id)
                    ->value('nome');
            }

            if (!empty($registo->especialidade_id)) {
                $especialidadeNome = DB::table('especialidades')
                    ->where('id', $registo->especialidade_id)
                    ->value('nome');
            }

            DB::table('registo_cirurgicos')
                ->where('id', $registo->id)
                ->update([
                    'hospital' => $hospitalNome,
                    'especialidade' => $especialidadeNome,
                ]);
        }

        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->dropForeign(['hospital_id']);
            $table->dropForeign(['especialidade_id']);
            $table->dropColumn(['hospital_id', 'especialidade_id']);
        });
    }
};
