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
        $utentes = Utente::all();
        $tiposDeCirurgia = TipoDeCirurgia::all();
        $tiposDeOrigem = TipoDeOrigem::all();

        if ($users->isEmpty()) {
            $this->command->warn('Execute a criação de users primeiro!');
            return;
        }

        if ($utentes->isEmpty() || $tiposDeCirurgia->isEmpty() || $tiposDeOrigem->isEmpty()) {
            $this->command->warn('Execute UtenteSeeder, TipoDeCirurgiaSeeder e TipoDeOrigemSeeder primeiro!');
            return;
        }

        $registos = [
            [
                'user_id' => $users->random()->id,
                'utente_id' => $utentes->random()->id,
                'data_cirurgia' => Carbon::now()->subMonths(6),
                'tipo_de_cirurgia_id' => $tiposDeCirurgia->random()->id,
                'tipo_de_origem_id' => $tiposDeOrigem->random()->id,
                'tipo_de_abordagem' => TipoAbordagemEnum::LAPAROSCOPICA->value,
                'ambulatorio' => false,
                'observacoes' => 'Cirurgia decorreu sem intercorrências',
            ],
            [
                'user_id' => $users->random()->id,
                'utente_id' => $utentes->random()->id,
                'data_cirurgia' => Carbon::now()->subMonths(5),
                'tipo_de_cirurgia_id' => $tiposDeCirurgia->random()->id,
                'tipo_de_origem_id' => $tiposDeOrigem->random()->id,
                'tipo_de_abordagem' => TipoAbordagemEnum::CONVENCIONAL->value,
                'ambulatorio' => false,
                'observacoes' => 'Paciente tolerou bem o procedimento',
            ],
            [
                'user_id' => $users->random()->id,
                'utente_id' => $utentes->random()->id,
                'data_cirurgia' => Carbon::now()->subMonths(4),
                'tipo_de_cirurgia_id' => $tiposDeCirurgia->random()->id,
                'tipo_de_origem_id' => $tiposDeOrigem->random()->id,
                'tipo_de_abordagem' => TipoAbordagemEnum::ROBOTICA->value,
                'ambulatorio' => true,
                'observacoes' => null,
            ],
            [
                'user_id' => $users->random()->id,
                'utente_id' => $utentes->random()->id,
                'data_cirurgia' => Carbon::now()->subMonths(3),
                'tipo_de_cirurgia_id' => $tiposDeCirurgia->random()->id,
                'tipo_de_origem_id' => $tiposDeOrigem->random()->id,
                'tipo_de_abordagem' => TipoAbordagemEnum::ENDOSCOPICA->value,
                'ambulatorio' => false,
                'observacoes' => 'Necessária conversão para via aberta',
            ],
            [
                'user_id' => $users->random()->id,
                'utente_id' => $utentes->random()->id,
                'data_cirurgia' => Carbon::now()->subMonths(2),
                'tipo_de_cirurgia_id' => $tiposDeCirurgia->random()->id,
                'tipo_de_origem_id' => $tiposDeOrigem->random()->id,
                'tipo_de_abordagem' => TipoAbordagemEnum::LAPAROSCOPICA->value,
                'ambulatorio' => true,
                'observacoes' => 'Cirurgia realizada com sucesso',
            ],
            [
                'user_id' => $users->random()->id,
                'utente_id' => $utentes->random()->id,
                'data_cirurgia' => Carbon::now()->subMonth(),
                'tipo_de_cirurgia_id' => $tiposDeCirurgia->random()->id,
                'tipo_de_origem_id' => $tiposDeOrigem->random()->id,
                'tipo_de_abordagem' => TipoAbordagemEnum::CONVENCIONAL->value,
                'ambulatorio' => false,
                'observacoes' => 'Boa evolução pós-operatória',
            ],
            [
                'user_id' => $users->random()->id,
                'utente_id' => $utentes->random()->id,
                'data_cirurgia' => Carbon::now()->subWeeks(3),
                'tipo_de_cirurgia_id' => $tiposDeCirurgia->random()->id,
                'tipo_de_origem_id' => $tiposDeOrigem->random()->id,
                'tipo_de_abordagem' => TipoAbordagemEnum::LAPAROSCOPICA->value,
                'ambulatorio' => true,
                'observacoes' => null,
            ],
            [
                'user_id' => $users->random()->id,
                'utente_id' => $utentes->random()->id,
                'data_cirurgia' => Carbon::now()->subWeeks(2),
                'tipo_de_cirurgia_id' => $tiposDeCirurgia->random()->id,
                'tipo_de_origem_id' => $tiposDeOrigem->random()->id,
                'tipo_de_abordagem' => TipoAbordagemEnum::HIBRIDA->value,
                'ambulatorio' => false,
                'observacoes' => 'Procedimento complexo realizado em etapas',
            ],
            [
                'user_id' => $users->random()->id,
                'utente_id' => $utentes->random()->id,
                'data_cirurgia' => Carbon::now()->subWeek(),
                'tipo_de_cirurgia_id' => $tiposDeCirurgia->random()->id,
                'tipo_de_origem_id' => $tiposDeOrigem->random()->id,
                'tipo_de_abordagem' => TipoAbordagemEnum::CONVENCIONAL->value,
                'ambulatorio' => false,
                'observacoes' => 'Paciente em recuperação',
            ],
            [
                'user_id' => $users->random()->id,
                'utente_id' => $utentes->random()->id,
                'data_cirurgia' => Carbon::now()->subDays(3),
                'tipo_de_cirurgia_id' => $tiposDeCirurgia->random()->id,
                'tipo_de_origem_id' => $tiposDeOrigem->random()->id,
                'tipo_de_abordagem' => TipoAbordagemEnum::LAPAROSCOPICA->value,
                'ambulatorio' => true,
                'observacoes' => 'Alta prevista para amanhã',
            ],
        ];

        foreach ($registos as $registo) {
            RegistoCirurgico::create($registo);
        }
    }
}
