<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Enums\SexoEnum;
use App\Enums\TipoAbordagemEnum;
use App\Enums\FuncaoCirurgiaoEnum;
use App\Enums\ClavienDindoEnum;

class MedfolioServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Compartilhar opções de configuração com o frontend via Inertia
        Inertia::share([
            'enums' => function () {
                return [
                    'sexo' => [
                        'values' => SexoEnum::values(),
                        'options' => SexoEnum::toArray(),
                    ],
                    'tipoAbordagem' => [
                        'values' => TipoAbordagemEnum::values(),
                        'options' => TipoAbordagemEnum::toArray(),
                    ],
                    'funcaoCirurgiao' => [
                        'values' => FuncaoCirurgiaoEnum::values(),
                        'options' => FuncaoCirurgiaoEnum::toArray(),
                    ],
                    'clavienDindo' => [
                        'values' => ClavienDindoEnum::values(),
                        'options' => ClavienDindoEnum::toArray(),
                    ],
                ];
            },
        ]);
    }
}
