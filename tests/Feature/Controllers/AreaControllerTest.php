<?php

namespace Tests\Feature\Controllers;

use App\Models\Area;
use App\Models\User;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AreaControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_areas_list(): void
    {
        $user = User::factory()->create();
        Area::factory()->count(3)->create();

        $response = $this->actingAs($user)->get(route('areas.index'));

        $response->assertOk();
    }

    public function test_store_creates_new_area(): void
    {
        $user = User::factory()->create();
        
        $data = [
            'nome' => 'Cirurgia Cardíaca',
            'descricao' => 'Procedimentos cardíacos',
        ];

        $response = $this->actingAs($user)->post(route('areas.store'), $data);

        $response->assertRedirect(route('areas.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('areas', [
            'nome' => 'Cirurgia Cardíaca',
        ]);
    }

    public function test_store_validates_unique_nome(): void
    {
        $user = User::factory()->create();
        Area::factory()->create(['nome' => 'Cirurgia Geral']);

        $data = [
            'nome' => 'Cirurgia Geral',
            'descricao' => 'Descrição',
        ];

        $response = $this->actingAs($user)->post(route('areas.store'), $data);

        $response->assertSessionHasErrors(['nome']);
    }

    public function test_area_has_diagnosticos_and_procedimentos(): void
    {
        $area = Area::factory()->create();
        Diagnostico::factory()->count(3)->create(['area' => $area->nome]);
        Procedimento::factory()->count(5)->create(['area' => $area->nome]);

        $area->load('diagnosticos', 'procedimentos');

        expect($area->diagnosticos)->toHaveCount(3)
            ->and($area->procedimentos)->toHaveCount(5);
    }

    public function test_scope_buscar_finds_areas(): void
    {
        Area::factory()->create(['nome' => 'Cirurgia Cardíaca']);
        Area::factory()->create(['nome' => 'Cirurgia Vascular']);
        Area::factory()->create(['nome' => 'Ortopedia']);

        $areas = Area::buscar('Cirurgia')->get();

        expect($areas)->toHaveCount(2);
    }
}
