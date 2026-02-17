<?php

namespace Database\Factories;

use App\Models\TipoDeAbordagem;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TipoDeAbordagem>
 */
class TipoDeAbordagemFactory extends Factory
{
    protected $model = TipoDeAbordagem::class;

    public function definition(): array
    {
        return [
            'nome' => fake()->unique()->randomElement(['Convencional', 'Laparoscópica', 'Robótica', 'Endoscópica', 'Híbrida']),
            'user_id' => User::factory(),
        ];
    }
}
