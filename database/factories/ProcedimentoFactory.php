<?php

namespace Database\Factories;

use App\Models\Procedimento;
use App\Models\Area;
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
            'area' => Area::factory(),
            'descricao' => fake()->sentence(),
        ];
    }
}
