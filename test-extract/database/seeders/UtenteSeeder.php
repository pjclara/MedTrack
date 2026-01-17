<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Utente;
use App\Models\User;
use App\Enums\SexoEnum;
use Carbon\Carbon;

class UtenteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        if ($users->isEmpty()) {
            $this->command->warn('Crie utilizadores primeiro!');
            return;
        }

        $utentes = [
            [
                'nome' => 'João Pedro Silva',
                'data_nascimento' => Carbon::create(1965, 3, 15),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100001,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Maria Helena Santos',
                'data_nascimento' => Carbon::create(1972, 8, 22),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100002,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'António Manuel Costa',
                'data_nascimento' => Carbon::create(1958, 11, 5),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100003,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Ana Rita Ferreira',
                'data_nascimento' => Carbon::create(1980, 5, 18),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100004,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Carlos Alberto Oliveira',
                'data_nascimento' => Carbon::create(1970, 2, 28),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100005,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Sofia Isabel Rodrigues',
                'data_nascimento' => Carbon::create(1985, 9, 12),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100006,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Manuel José Pereira',
                'data_nascimento' => Carbon::create(1963, 7, 30),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100007,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Teresa Maria Alves',
                'data_nascimento' => Carbon::create(1975, 4, 8),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100008,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Paulo Alexandre Martins',
                'data_nascimento' => Carbon::create(1968, 12, 3),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100009,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Carla Sofia Sousa',
                'data_nascimento' => Carbon::create(1990, 6, 25),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100010,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Ricardo Miguel Lopes',
                'data_nascimento' => Carbon::create(1978, 1, 14),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100011,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Patrícia Alexandra Gomes',
                'data_nascimento' => Carbon::create(1982, 10, 20),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100012,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Luís Fernando Carvalho',
                'data_nascimento' => Carbon::create(1960, 3, 7),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100013,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Sandra Cristina Mendes',
                'data_nascimento' => Carbon::create(1988, 8, 16),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100014,
                'user_id' => $users->random()->id,
            ],
            [
                'nome' => 'Fernando José Ribeiro',
                'data_nascimento' => Carbon::create(1955, 5, 11),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100015,
                'user_id' => $users->random()->id,
            ],
        ];

        foreach ($utentes as $utente) {
            Utente::firstOrCreate(['processo' => $utente['processo']], $utente);
        }
    }
}
