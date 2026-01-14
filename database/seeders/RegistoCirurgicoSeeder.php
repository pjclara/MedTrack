<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RegistoCirurgico;
use App\Models\Utente;
use App\Models\TipoDeCirurgia;
use App\Models\TipoDeOrigem;
use App\Models\User;
use App\Enums\TipoAbordagemEnum;
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
        $tiposDeOrigem = TipoDeOrigem::all();

        if ($users->isEmpty() || $tiposDeCirurgia->isEmpty() || $tiposDeOrigem->isEmpty()) {
            $this->command->warn('Execute UserSeeder, TipoDeCirurgiaSeeder e TipoDeOrigemSeeder primeiro!');
            return;
        }

        $registos = [
            [
                'data_cirurgia' => Carbon::now()->subMonths(6),
                'tipo_de_abordagem' => TipoAbordagemEnum::LAPAROSCOPICA->value,
                'ambulatorio' => false,
                'observacoes' => 'Cirurgia decorreu sem intercorrências',
            ],
            [
                'data_cirurgia' => Carbon::now()->subMonths(5),
                'tipo_de_abordagem' => TipoAbordagemEnum::CONVENCIONAL->value,
                'ambulatorio' => false,
                'observacoes' => 'Paciente tolerou bem o procedimento',
            ],
            [
                'data_cirurgia' => Carbon::now()->subMonths(4),
                'tipo_de_abordagem' => TipoAbordagemEnum::ROBOTICA->value,
                'ambulatorio' => true,
                'observacoes' => null,
            ],
            [
                'data_cirurgia' => Carbon::now()->subMonths(3),
                'tipo_de_abordagem' => TipoAbordagemEnum::ENDOSCOPICA->value,
                'ambulatorio' => false,
                'observacoes' => 'Necessária conversão para via aberta',
            ],
            [
                'data_cirurgia' => Carbon::now()->subMonths(2),
                'tipo_de_abordagem' => TipoAbordagemEnum::LAPAROSCOPICA->value,
                'ambulatorio' => true,
                'observacoes' => 'Cirurgia realizada com sucesso',
            ],
            [
                'data_cirurgia' => Carbon::now()->subMonth(),
                'tipo_de_abordagem' => TipoAbordagemEnum::CONVENCIONAL->value,
                'ambulatorio' => false,
                'observacoes' => 'Boa evolução pós-operatória',
            ],
            [
                'data_cirurgia' => Carbon::now()->subWeeks(3),
                'tipo_de_abordagem' => TipoAbordagemEnum::LAPAROSCOPICA->value,
                'ambulatorio' => true,
                'observacoes' => null,
            ],
            [
                'data_cirurgia' => Carbon::now()->subWeeks(2),
                'tipo_de_abordagem' => TipoAbordagemEnum::HIBRIDA->value,
                'ambulatorio' => false,
                'observacoes' => 'Procedimento complexo realizado em etapas',
            ],
            [
                'data_cirurgia' => Carbon::now()->subWeek(),
                'tipo_de_abordagem' => TipoAbordagemEnum::CONVENCIONAL->value,
                'ambulatorio' => false,
                'observacoes' => 'Paciente em recuperação',
            ],
            [
                'data_cirurgia' => Carbon::now()->subDays(3),
                'tipo_de_abordagem' => TipoAbordagemEnum::LAPAROSCOPICA->value,
                'ambulatorio' => true,
                'observacoes' => 'Alta prevista para amanhã',
            ],
        ];

        foreach ($registos as $registoData) {
            $user = $users->random();
            
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
                'tipo_de_origem_id' => $tiposDeOrigem->random()->id,
                'hospital' => $hospital ? $hospital->nome : null,
                'especialidade' => $especialidade ? $especialidade->nome : null,
            ]);
        }
    }
}
