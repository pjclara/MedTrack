<?php

namespace Database\Factories;

use App\Models\Procedimento;
use App\Models\Especialidade;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Procedimento>
 */
class ProcedimentoFactory extends Factory
{
    protected $model = Procedimento::class;

    public function definition(): array
    {
        return [
            'nome' => fake()->unique()->words(3, true),
            'especialidade' => Especialidade::factory(),
            'descricao' => fake()->sentence(),
            'user_id' => User::factory(),
        ];
    }
}
