<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RegistoCirurgico;
use App\Models\Utente;
use App\Models\TipoDeCirurgia;
use App\Models\TipoDeAbordagem;
use App\Models\User;
use Carbon\Carbon;

class RegistoCirurgicoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $tiposDeCirurgia = TipoDeCirurgia::all();

        if ($users->isEmpty() || $tiposDeCirurgia->isEmpty()) {
            $this->command->warn('Execute UserSeeder e TipoDeCirurgiaSeeder primeiro!');
            return;
        }

        $registos = [
            [
                'data_cirurgia' => Carbon::now()->subMonths(6),
                'ambulatorio' => false,
                'observacoes' => 'Cirurgia decorreu sem intercorrências',
            ],
            [
                'data_cirurgia' => Carbon::now()->subMonths(5),
                'ambulatorio' => false,
                'observacoes' => 'Paciente tolerou bem o procedimento',
            ],
            [
                'data_cirurgia' => Carbon::now()->subMonths(4),
                'ambulatorio' => true,
                'observacoes' => null,
            ],
            [
                'data_cirurgia' => Carbon::now()->subMonths(3),
                'ambulatorio' => false,
                'observacoes' => 'Necessária conversão para via aberta',
            ],
            [
                'data_cirurgia' => Carbon::now()->subMonths(2),
                'ambulatorio' => true,
                'observacoes' => 'Cirurgia realizada com sucesso',
            ],
            [
                'data_cirurgia' => Carbon::now()->subMonth(),
                'ambulatorio' => false,
                'observacoes' => 'Boa evolução pós-operatória',
            ],
            [
                'data_cirurgia' => Carbon::now()->subWeeks(3),
                'ambulatorio' => true,
                'observacoes' => null,
            ],
            [
                'data_cirurgia' => Carbon::now()->subWeeks(2),
                'ambulatorio' => false,
                'observacoes' => 'Procedimento complexo realizado em etapas',
            ],
            [
                'data_cirurgia' => Carbon::now()->subWeek(),
                'ambulatorio' => false,
                'observacoes' => 'Paciente em recuperação',
            ],
            [
                'data_cirurgia' => Carbon::now()->subDays(3),
                'ambulatorio' => true,
                'observacoes' => 'Alta prevista para amanhã',
            ],
        ];

        foreach ($registos as $registoData) {
            $user = $users->random();

            // Ensure user has TipoDeAbordagem entries
            $tipoAbordagem = TipoDeAbordagem::where('user_id', $user->id)->inRandomOrder()->first();
            if (!$tipoAbordagem) {
                $defaultAbordagens = ['Convencional', 'Laparoscópica', 'Robótica', 'Endoscópica', 'Híbrida'];
                foreach ($defaultAbordagens as $nome) {
                    TipoDeAbordagem::create([
                        'nome' => $nome,
                        'user_id' => $user->id,
                    ]);
                }
                $tipoAbordagem = TipoDeAbordagem::where('user_id', $user->id)->inRandomOrder()->first();
            }
            
            // Garantir que temos um utente para este utilizador
            $utente = Utente::where('user_id', $user->id)->inRandomOrder()->first();
            
            if (!$utente) {
                $utente = Utente::create([
                    'nome' => 'Utente Gerado ' . rand(1, 999),
                    'data_nascimento' => Carbon::now()->subYears(rand(20, 80)),
                    'sexo' => rand(0, 1) ? \App\Enums\SexoEnum::MASCULINO->value : \App\Enums\SexoEnum::FEMININO->value,
                    'processo' => rand(200000, 300000),
                    'user_id' => $user->id
                ]);
            }

            $hospital = \App\Models\Hospital::where('user_id', $user->id)->inRandomOrder()->first();
            $especialidade = \App\Models\Especialidade::where('user_id', $user->id)->inRandomOrder()->first();

            RegistoCirurgico::create([
                ...$registoData,
                'user_id' => $user->id,
                'utente_id' => $utente->id,
                'tipo_de_cirurgia_id' => $tiposDeCirurgia->random()->id,
                'tipo_de_abordagem_id' => $tipoAbordagem->id,
                'hospital' => $hospital ? $hospital->nome : null,
                'especialidade' => $especialidade ? $especialidade->nome : null,
            ]);
        }
    }
}
