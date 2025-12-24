<?php

namespace Database\Factories;

use App\Models\TipoDeCirurgia;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TipoDeCirurgia>
 */
class TipoDeCirurgiaFactory extends Factory
{
    protected $model = TipoDeCirurgia::class;

    public function definition(): array
    {
        return [
            'nome' => fake()->unique()->randomElement([
                'Eletiva',
                'Urgência',
                'Emergência',
                'Ambulatório',
                'Day Case',
                'Oncológica',
                'Reconstrutiva',
                'Minimamente Invasiva',
            ]),
        ];
    }
}
