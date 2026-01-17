<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AtividadeCientifica;
use App\Models\User;

class AtividadeCientificaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->warn('Nenhum utilizador encontrado. Execute o DatabaseSeeder primeiro!');
            return;
        }

        $this->command->info('Criando atividades científicas...');

        // Criar atividades para cada utilizador
        foreach ($users as $user) {
            // Artigos em revista (2-4 por utilizador)
            AtividadeCientifica::factory()
                ->count(rand(2, 4))
                ->artigo()
                ->create(['user_id' => $user->id]);

            // Posters em congressos (2-5 por utilizador)
            AtividadeCientifica::factory()
                ->count(rand(2, 5))
                ->poster()
                ->create(['user_id' => $user->id]);

            // Comunicações orais (1-3 por utilizador)
            AtividadeCientifica::factory()
                ->count(rand(1, 3))
                ->create([
                    'user_id' => $user->id,
                    'tipo' => 'Comunicação Oral',
                ]);

            // Sessões clínicas (3-6 por utilizador)
            AtividadeCientifica::factory()
                ->count(rand(3, 6))
                ->create([
                    'user_id' => $user->id,
                    'tipo' => 'Sessão Clínica',
                ]);

            // Journal clubs (2-4 por utilizador)
            AtividadeCientifica::factory()
                ->count(rand(2, 4))
                ->create([
                    'user_id' => $user->id,
                    'tipo' => 'Journal Club',
                ]);

            // Workshops (1-2 por utilizador)
            AtividadeCientifica::factory()
                ->count(rand(1, 2))
                ->create([
                    'user_id' => $user->id,
                    'tipo' => 'Workshop',
                ]);

            // Algumas atividades variadas
            AtividadeCientifica::factory()
                ->count(rand(2, 4))
                ->create(['user_id' => $user->id]);
        }

        $totalAtividades = AtividadeCientifica::count();
        $this->command->info("✅ {$totalAtividades} atividades científicas criadas!");
    }
}
