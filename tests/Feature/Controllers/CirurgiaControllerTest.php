<?php

namespace Tests\Feature\Controllers;

use App\Enums\ClavienDindoEnum;
use App\Enums\FuncaoCirurgiaoEnum;
use App\Models\Cirurgia;
use App\Models\User;
use App\Models\RegistoCirurgico;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CirurgiaControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_cirurgias_list(): void
    {
        $user = User::factory()->create();
        Cirurgia::factory()->count(5)->create();

        $response = $this->actingAs($user)->get(route('cirurgias.index'));

        $response->assertOk();
    }

    public function test_create_displays_cirurgia_create_form(): void
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)->get(route('cirurgias.create'));

        $response->assertOk();
    }

    public function test_store_creates_new_cirurgia(): void
    {
        $user = User::factory()->create();
        $registo = RegistoCirurgico::factory()->create();
        $diagnostico = Diagnostico::factory()->create();
        $procedimento = Procedimento::factory()->create();

        $data = [
            'registo_cirurgico_id' => $registo->id,
            'diagnostico_id' => $diagnostico->id,
            'procedimento_id' => $procedimento->id,
            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
            'clavien-dindo' => ClavienDindoEnum::GRAU_II->value,
            'observacoes' => 'Cirurgia sem intercorrências',
        ];

        $response = $this->actingAs($user)->post(route('cirurgias.store'), $data);

        $response->assertRedirect(route('cirurgias.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('cirurgias', [
            'registo_cirurgico_id' => $registo->id,
            'diagnostico_id' => $diagnostico->id,
        ]);
    }

    public function test_store_validates_enum_fields(): void
    {
        $user = User::factory()->create();
        $registo = RegistoCirurgico::factory()->create();
        $diagnostico = Diagnostico::factory()->create();
        $procedimento = Procedimento::factory()->create();

        $data = [
            'registo_cirurgico_id' => $registo->id,
            'diagnostico_id' => $diagnostico->id,
            'procedimento_id' => $procedimento->id,
            'funcao' => 'funcao_invalida',
            'clavien-dindo' => 'grau_invalido',
        ];

        $response = $this->actingAs($user)->post(route('cirurgias.store'), $data);

        $response->assertSessionHasErrors(['funcao', 'clavien-dindo']);
    }

    public function test_show_displays_cirurgia_details(): void
    {
        $user = User::factory()->create();
        $cirurgia = Cirurgia::factory()->create();

        $response = $this->actingAs($user)->get(route('cirurgias.show', $cirurgia));

        $response->assertOk();
    }

    public function test_update_modifies_existing_cirurgia(): void
    {
        $user = User::factory()->create();
        $cirurgia = Cirurgia::factory()->create();

        $data = [
            'registo_cirurgico_id' => $cirurgia->registo_cirurgico_id,
            'diagnostico_id' => $cirurgia->diagnostico_id,
            'procedimento_id' => $cirurgia->procedimento_id,
            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_ASSISTENTE->value,
            'clavien-dindo' => ClavienDindoEnum::GRAU_I->value,
            'observacoes' => 'Observações atualizadas',
        ];

        $response = $this->actingAs($user)->put(route('cirurgias.update', $cirurgia), $data);

        $response->assertRedirect(route('cirurgias.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('cirurgias', [
            'id' => $cirurgia->id,
            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_ASSISTENTE->value,
        ]);
    }

    public function test_destroy_deletes_cirurgia(): void
    {
        $user = User::factory()->create();
        $cirurgia = Cirurgia::factory()->create();

        $response = $this->actingAs($user)->delete(route('cirurgias.destroy', $cirurgia));

        $response->assertRedirect(route('cirurgias.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('cirurgias', [
            'id' => $cirurgia->id,
        ]);
    }

    public function test_cirurgia_with_complications_is_flagged(): void
    {
        $cirurgia = Cirurgia::factory()->create([
            'clavien-dindo' => ClavienDindoEnum::GRAU_IVA->value,
        ]);

        expect($cirurgia->temComplicacoes())->toBeTrue()
            ->and($cirurgia->{'clavien-dindo'}->isGrave())->toBeTrue();
    }
}
