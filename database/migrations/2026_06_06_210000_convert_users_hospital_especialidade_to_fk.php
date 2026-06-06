<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'hospital_id')) {
                $table->foreignId('hospital_id')->nullable()->after('email');
            }

            if (!Schema::hasColumn('users', 'especialidade_id')) {
                $table->foreignId('especialidade_id')->nullable()->after('hospital_id');
            }
        });

        if (Schema::hasColumn('users', 'hospital_de_origem') || Schema::hasColumn('users', 'especialidade')) {
            $users = DB::table('users')
                ->select('id', 'hospital_de_origem', 'especialidade', 'hospital_id', 'especialidade_id')
                ->get();

            foreach ($users as $user) {
                $hospitalId = $user->hospital_id;
                $especialidadeId = $user->especialidade_id;

                if (!$hospitalId && !empty($user->hospital_de_origem)) {
                    $hospitalId = DB::table('hospitals')
                        ->where('user_id', $user->id)
                        ->where('nome', $user->hospital_de_origem)
                        ->value('id');
                }

                if (!$especialidadeId && !empty($user->especialidade)) {
                    $especialidadeId = DB::table('especialidades')
                        ->where('user_id', $user->id)
                        ->where('nome', $user->especialidade)
                        ->value('id');
                }

                DB::table('users')
                    ->where('id', $user->id)
                    ->update([
                        'hospital_id' => $hospitalId,
                        'especialidade_id' => $especialidadeId,
                    ]);
            }
        }

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('hospital_id')->references('id')->on('hospitals')->nullOnDelete();
            $table->foreign('especialidade_id')->references('id')->on('especialidades')->nullOnDelete();
        });

        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'hospital_de_origem')) {
                $table->dropColumn('hospital_de_origem');
            }

            if (Schema::hasColumn('users', 'especialidade')) {
                $table->dropColumn('especialidade');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'hospital_de_origem')) {
                $table->string('hospital_de_origem')->nullable()->after('email');
            }

            if (!Schema::hasColumn('users', 'especialidade')) {
                $table->string('especialidade')->nullable()->after('hospital_de_origem');
            }
        });

        $users = DB::table('users')
            ->select('id', 'hospital_id', 'especialidade_id')
            ->get();

        foreach ($users as $user) {
            $hospitalNome = null;
            $especialidadeNome = null;

            if (!empty($user->hospital_id)) {
                $hospitalNome = DB::table('hospitals')
                    ->where('id', $user->hospital_id)
                    ->value('nome');
            }

            if (!empty($user->especialidade_id)) {
                $especialidadeNome = DB::table('especialidades')
                    ->where('id', $user->especialidade_id)
                    ->value('nome');
            }

            DB::table('users')
                ->where('id', $user->id)
                ->update([
                    'hospital_de_origem' => $hospitalNome,
                    'especialidade' => $especialidadeNome,
                ]);
        }

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['hospital_id']);
            $table->dropForeign(['especialidade_id']);
            $table->dropColumn(['hospital_id', 'especialidade_id']);
        });
    }
};
