<?php

use App\Enums\SexoEnum;
use App\Models\Utente;
use App\Models\RegistoCirurgico;

uses(Tests\TestCase::class, \Illuminate\Foundation\Testing\RefreshDatabase::class);

test('utente has fillable attributes', function () {
    $utente = Utente::create([
        'nome' => 'João Silva',
        'data_nascimento' => '1990-05-15',
        'sexo' => SexoEnum::MASCULINO->value,
        'processo' => 20250001,
    ]);

    expect($utente->nome)->toBe('João Silva')
        ->and($utente->sexo)->toBeInstanceOf(SexoEnum::class)
        ->and($utente->sexo)->toBe(SexoEnum::MASCULINO)
        ->and($utente->processo)->toBe(20250001);
});

test('utente casts data_nascimento to date', function () {
    $utente = Utente::factory()->create([
        'data_nascimento' => '1990-05-15',
    ]);

    expect($utente->data_nascimento)->toBeInstanceOf(\Illuminate\Support\Carbon::class);
});

test('utente casts sexo to enum', function () {
    $utente = Utente::factory()->create([
        'sexo' => SexoEnum::FEMININO->value,
    ]);

    expect($utente->sexo)
        ->toBeInstanceOf(SexoEnum::class)
        ->and($utente->sexo)->toBe(SexoEnum::FEMININO);
});

test('utente has registos_cirurgicos relationship', function () {
    $utente = Utente::factory()->create();

    expect($utente->registosCirurgicos())->toBeInstanceOf(\Illuminate\Database\Eloquent\Relations\HasMany::class);
});

test('get idade attribute', function () {
    $utente = Utente::factory()->create([
        'data_nascimento' => now()->subYears(35),
    ]);

    expect($utente->idade)->toBe(35);
});

test('get nome com processo attribute', function () {
    $utente = Utente::factory()->create([
        'nome' => 'Maria Santos',
        'processo' => 123,
    ]);

    expect($utente->nome_com_processo)->toBe('Maria Santos (#123)');
});
