<?php

namespace Database\Factories;

use App\Models\Especialidade;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Especialidade>
 */
class EspecialidadeFactory extends Factory
{
    protected $model = Especialidade::class;

    public function definition(): array
    {
        return [
            'nome' => fake()->unique()->word() . ' ' . fake()->unique()->numberBetween(1, 1000),
            'descricao' => fake()->sentence(),
            'user_id' => User::factory(),
        ];
    }
}
