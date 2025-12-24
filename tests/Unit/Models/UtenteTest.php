<?php

namespace Tests\Unit\Models;

use App\Enums\SexoEnum;
use App\Models\Utente;
use App\Models\RegistoCirurgico;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UtenteTest extends TestCase
{
    use RefreshDatabase;

    public function test_utente_has_fillable_attributes(): void
    {
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
    }

    public function test_utente_casts_data_nascimento_to_date(): void
    {
        $utente = Utente::factory()->create([
            'data_nascimento' => '1990-05-15',
        ]);

        expect($utente->data_nascimento)->toBeInstanceOf(\Illuminate\Support\Carbon::class);
    }

    public function test_utente_casts_sexo_to_enum(): void
    {
        $utente = Utente::factory()->create([
            'sexo' => SexoEnum::FEMININO->value,
        ]);

        expect($utente->sexo)
            ->toBeInstanceOf(SexoEnum::class)
            ->and($utente->sexo)->toBe(SexoEnum::FEMININO);
    }

    public function test_utente_has_registos_cirurgicos_relationship(): void
    {
        $utente = Utente::factory()->create();

        expect($utente->registoCirurgicos())->toBeInstanceOf(\Illuminate\Database\Eloquent\Relations\HasMany::class);
    }

    public function test_get_idade_attribute(): void
    {
        $utente = Utente::factory()->create([
            'data_nascimento' => now()->subYears(35),
        ]);

        expect($utente->idade)->toBe(35);
    }

    public function test_get_nome_com_processo_attribute(): void
    {
        $utente = Utente::factory()->create([
            'nome' => 'Maria Santos',
            'processo' => 123,
        ]);

        expect($utente->nome_com_processo)->toBe('Maria Santos (#123)');
    }

    public function test_scope_sexo(): void
    {
        Utente::factory()->create(['sexo' => SexoEnum::MASCULINO->value]);
        Utente::factory()->create(['sexo' => SexoEnum::FEMININO->value]);
        Utente::factory()->create(['sexo' => SexoEnum::MASCULINO->value]);

        $masculinos = Utente::sexo(SexoEnum::MASCULINO)->get();

        expect($masculinos)->toHaveCount(2);
    }
}
