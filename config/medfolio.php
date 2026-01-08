<?php

use App\Enums\SexoEnum;
use App\Enums\TipoAbordagemEnum;
use App\Enums\FuncaoCirurgiaoEnum;
use App\Enums\ClavienDindoEnum;
use App\Enums\TipoAtividadeEnum;
use App\Enums\TipoFormacaoEnum;
use App\Enums\TipoParticipacaoEnum;

return [
    /*
    |--------------------------------------------------------------------------
    | Sexo Options
    |--------------------------------------------------------------------------
    */
    'sexo_options' => SexoEnum::values(),

    /*
    |--------------------------------------------------------------------------
    | Tipo de Abordagem Options
    |--------------------------------------------------------------------------
    */
    'tipo_abordagem_options' => TipoAbordagemEnum::values(),

    /*
    |--------------------------------------------------------------------------
    | Função Options (Cirurgião)
    |--------------------------------------------------------------------------
    */
    'funcao_options' => FuncaoCirurgiaoEnum::values(),

    /*
    |--------------------------------------------------------------------------
    | Classificação Clavien-Dindo
    |--------------------------------------------------------------------------
    */
    'clavien_dindo_options' => ClavienDindoEnum::values(),

    /*
    |--------------------------------------------------------------------------
    | Tipo de Atividade Científica
    |--------------------------------------------------------------------------
    */
    'tipo_atividade_options' => TipoAtividadeEnum::values(),

    /*
    |--------------------------------------------------------------------------
    | Categorias de Atividade Científica
    |--------------------------------------------------------------------------
    */
    'categoria_atividade_options' => [
        'Nacional',
        'Internacional',
        'Regional',
        'Local',
    ],

    /*
    |--------------------------------------------------------------------------
    | Tipo de Formação
    |--------------------------------------------------------------------------
    */
    'tipo_formacao_options' => TipoFormacaoEnum::values(),

    /*
    |--------------------------------------------------------------------------
    | Tipo de Participação em Formações
    |--------------------------------------------------------------------------
    */
    'tipo_participacao_options' => TipoParticipacaoEnum::values(),

    /*
    |--------------------------------------------------------------------------
    | Categorias de Formação
    |--------------------------------------------------------------------------
    */
    'categoria_formacao_options' => [
        'Nacional',
        'Internacional',
        'Regional',
        'Local',
    ],

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */
    'pagination' => [
        'per_page' => 15,
        'max_per_page' => 100,
    ],
];
