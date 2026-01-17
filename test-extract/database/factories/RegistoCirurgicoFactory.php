<?php

namespace Database\Factories;

use App\Enums\TipoAbordagemEnum;
use App\Models\RegistoCirurgico;
use App\Models\Utente;
use App\Models\TipoDeCirurgia;
use App\Models\TipoDeOrigem;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RegistoCirurgico>
 */
class RegistoCirurgicoFactory extends Factory
{
    protected $model = RegistoCirurgico::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'utente_id' => Utente::factory(),
            'hospital' => fake()->company() . ' Hospital',
            'especialidade' => fake()->randomElement(['Cirurgia Geral', 'Cirurgia Vascular', 'Cirurgia Cardiotorácica', 'Neurocirurgia']),
            'data_cirurgia' => fake()->dateTimeBetween('-2 years', 'now'),
            'tipo_de_cirurgia_id' => TipoDeCirurgia::factory(),
            'tipo_de_origem_id' => TipoDeOrigem::factory(),
            'tipo_de_abordagem' => fake()->randomElement(TipoAbordagemEnum::cases())->value,
            'ambulatorio' => fake()->boolean(),
            'observacoes' => fake()->optional()->sentence(),
        ];
    }
}
