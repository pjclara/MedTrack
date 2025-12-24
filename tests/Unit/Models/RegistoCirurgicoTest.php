<?php

namespace Tests\Unit\Models;

use App\Enums\TipoAbordagemEnum;
use App\Models\RegistoCirurgico;
use App\Models\Utente;
use App\Models\TipoDeCirurgia;
use App\Models\Cirurgia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistoCirurgicoTest extends TestCase
{
    use RefreshDatabase;

    public function test_registo_cirurgico_casts_tipo_de_abordagem_to_enum(): void
    {
        $registo = RegistoCirurgico::factory()->create([
            'tipo_de_abordagem' => TipoAbordagemEnum::LAPAROSCOPICA->value,
        ]);

        expect($registo->tipo_de_abordagem)
            ->toBeInstanceOf(TipoAbordagemEnum::class)
            ->and($registo->tipo_de_abordagem)->toBe(TipoAbordagemEnum::LAPAROSCOPICA);
    }

    public function test_registo_cirurgico_casts_data_cirurgia_to_date(): void
    {
        $registo = RegistoCirurgico::factory()->create([
            'data_cirurgia' => '2025-12-19',
        ]);

        expect($registo->data_cirurgia)->toBeInstanceOf(\Illuminate\Support\Carbon::class);
    }

    public function test_registo_cirurgico_belongs_to_utente(): void
    {
        $registo = RegistoCirurgico::factory()->create();

        expect($registo->utente)->toBeInstanceOf(Utente::class);
    }

    public function test_registo_cirurgico_belongs_to_tipo_de_cirurgia(): void
    {
        $registo = RegistoCirurgico::factory()->create();

        expect($registo->tipoDeCirurgia)->toBeInstanceOf(TipoDeCirurgia::class);
    }

    public function test_registo_cirurgico_has_many_cirurgias(): void
    {
        $registo = RegistoCirurgico::factory()->create();

        expect($registo->cirurgias())->toBeInstanceOf(\Illuminate\Database\Eloquent\Relations\HasMany::class);
    }

    public function test_get_data_cirurgia_formatada_attribute(): void
    {
        $registo = RegistoCirurgico::factory()->create([
            'data_cirurgia' => '2025-12-19',
        ]);

        expect($registo->data_cirurgia_formatada)->toBe('19/12/2025');
    }

    public function test_scope_entre_datas(): void
    {
        RegistoCirurgico::factory()->create(['data_cirurgia' => '2025-01-15']);
        RegistoCirurgico::factory()->create(['data_cirurgia' => '2025-06-15']);
        RegistoCirurgico::factory()->create(['data_cirurgia' => '2025-12-15']);

        $registos = RegistoCirurgico::entreDatas('2025-01-01', '2025-06-30')->get();

        expect($registos)->toHaveCount(2);
    }

    public function test_scope_por_tipo(): void
    {
        $tipo1 = TipoDeCirurgia::factory()->create();
        $tipo2 = TipoDeCirurgia::factory()->create();

        RegistoCirurgico::factory()->create(['tipo_de_cirurgia_id' => $tipo1->id]);
        RegistoCirurgico::factory()->create(['tipo_de_cirurgia_id' => $tipo2->id]);
        RegistoCirurgico::factory()->create(['tipo_de_cirurgia_id' => $tipo1->id]);

        $registos = RegistoCirurgico::porTipo($tipo1->id)->get();

        expect($registos)->toHaveCount(2);
    }
}
