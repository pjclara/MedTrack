<?php

namespace Database\Factories;

use App\Models\Area;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Area>
 */
class AreaFactory extends Factory
{
    protected $model = Area::class;

    public function definition(): array
    {
        return [
            'nome' => fake()->unique()->randomElement([
                'Cirurgia Geral',
                'Cirurgia Vascular',
                'Cirurgia Cardíaca',
                'Cirurgia Torácica',
                'Neurocirurgia',
                'Ortopedia',
                'Urologia',
                'Ginecologia',
                'Otorrinolaringologia',
                'Oftalmologia',
            ]),
            'descricao' => fake()->sentence(),
        ];
    }
}
