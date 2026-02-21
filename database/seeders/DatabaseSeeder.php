<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Criar usuário de teste
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // Criar admin
        User::firstOrCreate(
            ['email' => 'pjclara@gmail.com'],
            [
                'name' => 'Paulo Clara',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'admin@medtrack.com'],
            [
                'name' => 'Administrador',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // Criar roles e atribuir aos utilizadores
        $this->call([
            RoleSeeder::class,
            AdminUserSeeder::class,
        ]);

        // Seeders do sistema MedTrack (ordem é importante devido às foreign keys)
        $this->call([
            ZonaAnatomicaSeeder::class,
            HospitalSeeder::class,
            EspecialidadeSeeder::class,
            TipoDeCirurgiaSeeder::class,
            TipoDeAbordagemSeeder::class,
            #DiagnosticoSeeder::class,
            #ProcedimentoSeeder::class,
            #UtenteSeeder::class,
            #RegistoCirurgicoSeeder::class,
            #CirurgiaSeeder::class,
            #AtividadeCientificaSeeder::class,
            #FormacaoSeeder::class,
        ]);

        // Associar hospital e especialidade aos utilizadores
        foreach (User::all() as $user) {
            $hospital = \App\Models\Hospital::where('user_id', $user->id)->first();
            $especialidade = \App\Models\Especialidade::where('user_id', $user->id)->first();

            if ($hospital) {
                $user->hospital_de_origem = $hospital->nome;
            }

            if ($especialidade) {
                $user->especialidade = $especialidade->nome;
            }

            $user->save();
        }

        $this->command->info('✅ Database seeding completo!');
        $this->command->info('📊 Dados criados:');
        $this->command->table(
            ['Tabela', 'Registos'],
            [
                ['Hospitais', \App\Models\Hospital::count()],
                ['Especialidades', \App\Models\Especialidade::count()],
                ['Zonas Anatómicas', \App\Models\ZonaAnatomica::count()],
                ['Tipos de Cirurgia', \App\Models\TipoDeCirurgia::count()],
                ['Tipos de Abordagem', \App\Models\TipoDeAbordagem::count()],
                ['Diagnósticos', \App\Models\Diagnostico::count()],
                ['Procedimentos', \App\Models\Procedimento::count()],
                ['Utentes', \App\Models\Utente::count()],
                ['Registos Cirúrgicos', \App\Models\RegistoCirurgico::count()],
                ['Cirurgias', \App\Models\Cirurgia::count()],
                ['Atividades Científicas', \App\Models\AtividadeCientifica::count()],
                ['Formações', \App\Models\Formacao::count()],
                ['Utilizadores', User::count()],
            ]
        );
    }
}
