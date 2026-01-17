<?php

namespace Database\Seeders;

use App\Models\Formacao;
use App\Models\User;
use Illuminate\Database\Seeder;

class FormacaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->warn('⚠️  Nenhum utilizador encontrado. A criar utilizador de teste...');
            $users = collect([User::factory()->create()]);
        }

        foreach ($users as $user) {
            // Congressos (2-3 por user)
            Formacao::factory()
                ->count(fake()->numberBetween(2, 3))
                ->congresso()
                ->create(['user_id' => $user->id]);

            // Workshops (3-5 por user)
            Formacao::factory()
                ->count(fake()->numberBetween(3, 5))
                ->workshop()
                ->create(['user_id' => $user->id]);

            // Cursos (1-3 por user)
            Formacao::factory()
                ->count(fake()->numberBetween(1, 3))
                ->curso()
                ->create(['user_id' => $user->id]);

            // Webinars (2-4 por user)
            Formacao::factory()
                ->count(fake()->numberBetween(2, 4))
                ->create([
                    'user_id' => $user->id,
                    'tipo' => 'Webinar',
                    'duracao_horas' => fake()->numberBetween(1, 3),
                ]);

            // Conferências (1-2 por user)
            Formacao::factory()
                ->count(fake()->numberBetween(1, 2))
                ->create([
                    'user_id' => $user->id,
                    'tipo' => 'Conferência',
                    'duracao_horas' => fake()->numberBetween(8, 24),
                ]);

            // Seminários (1-2 por user)
            Formacao::factory()
                ->count(fake()->numberBetween(1, 2))
                ->create([
                    'user_id' => $user->id,
                    'tipo' => 'Seminário',
                    'duracao_horas' => fake()->numberBetween(3, 8),
                ]);

            // Algumas formações como orador (10-20% do total)
            $totalFormacoes = Formacao::where('user_id', $user->id)->count();
            $formacoesComoOrador = fake()->numberBetween(1, max(1, (int)($totalFormacoes * 0.15)));
            
            Formacao::factory()
                ->count($formacoesComoOrador)
                ->orador()
                ->create(['user_id' => $user->id]);
        }

        $totalFormacoes = Formacao::count();
        $this->command->info("✅ {$totalFormacoes} formações criadas para {$users->count()} utilizador(es)");
    }
}
