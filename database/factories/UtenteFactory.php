<?php

namespace Database\Factories;

use App\Enums\SexoEnum;
use App\Models\Utente;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Utente>
 */
class UtenteFactory extends Factory
{
    protected $model = Utente::class;

    public function definition(): array
    {
        return [
            'nome' => fake()->name(),
            'data_nascimento' => fake()->dateTimeBetween('-80 years', '-18 years'),
            'sexo' => fake()->randomElement(SexoEnum::cases())->value,
            'processo' => fake()->unique()->numberBetween(1000000, 9999999),
            'user_id' => User::factory(),
        ];
    }
}
