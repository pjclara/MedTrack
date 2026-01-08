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
            ['email' => 'admin@medtrack.com'],
            [
                'name' => 'Administrador',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // Seeders do sistema MedTrack (ordem é importante devido às foreign keys)
        $this->call([
            AreaSeeder::class,
            TipoDeCirurgiaSeeder::class,
            TipoDeOrigemSeeder::class,
            DiagnosticoSeeder::class,
            ProcedimentoSeeder::class,
            UtenteSeeder::class,
            RegistoCirurgicoSeeder::class,
            CirurgiaSeeder::class,
            AtividadeCientificaSeeder::class,
            FormacaoSeeder::class,
        ]);

        $this->command->info('✅ Database seeding completo!');
        $this->command->info('📊 Dados criados:');
        $this->command->table(
            ['Tabela', 'Registos'],
            [
                ['Áreas', \App\Models\Area::count()],
                ['Tipos de Cirurgia', \App\Models\TipoDeCirurgia::count()],
                ['Tipos de Origem', \App\Models\TipoDeOrigem::count()],
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
