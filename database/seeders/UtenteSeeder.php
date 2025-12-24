<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Utente;
use App\Enums\SexoEnum;
use Carbon\Carbon;

class UtenteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $utentes = [
            [
                'nome' => 'João Pedro Silva',
                'data_nascimento' => Carbon::create(1965, 3, 15),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100001,
            ],
            [
                'nome' => 'Maria Helena Santos',
                'data_nascimento' => Carbon::create(1972, 8, 22),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100002,
            ],
            [
                'nome' => 'António Manuel Costa',
                'data_nascimento' => Carbon::create(1958, 11, 5),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100003,
            ],
            [
                'nome' => 'Ana Rita Ferreira',
                'data_nascimento' => Carbon::create(1980, 5, 18),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100004,
            ],
            [
                'nome' => 'Carlos Alberto Oliveira',
                'data_nascimento' => Carbon::create(1970, 2, 28),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100005,
            ],
            [
                'nome' => 'Sofia Isabel Rodrigues',
                'data_nascimento' => Carbon::create(1985, 9, 12),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100006,
            ],
            [
                'nome' => 'Manuel José Pereira',
                'data_nascimento' => Carbon::create(1963, 7, 30),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100007,
            ],
            [
                'nome' => 'Teresa Maria Alves',
                'data_nascimento' => Carbon::create(1975, 4, 8),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100008,
            ],
            [
                'nome' => 'Paulo Alexandre Martins',
                'data_nascimento' => Carbon::create(1968, 12, 3),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100009,
            ],
            [
                'nome' => 'Carla Sofia Sousa',
                'data_nascimento' => Carbon::create(1990, 6, 25),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100010,
            ],
            [
                'nome' => 'Ricardo Miguel Lopes',
                'data_nascimento' => Carbon::create(1978, 1, 14),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100011,
            ],
            [
                'nome' => 'Patrícia Alexandra Gomes',
                'data_nascimento' => Carbon::create(1982, 10, 20),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100012,
            ],
            [
                'nome' => 'Luís Fernando Carvalho',
                'data_nascimento' => Carbon::create(1960, 3, 7),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100013,
            ],
            [
                'nome' => 'Sandra Cristina Mendes',
                'data_nascimento' => Carbon::create(1988, 8, 16),
                'sexo' => SexoEnum::FEMININO->value,
                'processo' => 100014,
            ],
            [
                'nome' => 'Fernando José Ribeiro',
                'data_nascimento' => Carbon::create(1955, 5, 11),
                'sexo' => SexoEnum::MASCULINO->value,
                'processo' => 100015,
            ],
        ];

        foreach ($utentes as $utente) {
            Utente::create($utente);
        }
    }
}
