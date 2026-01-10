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
        Area::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('areas.index'));

        $response->assertOk();
    }

    public function test_store_creates_new_area(): void
    {
        $user = User::factory()->create();
        
        $data = [
            'nome' => 'Cirurgia Cardíaca ' . uniqid(),
            'descricao' => 'Procedimentos cardíacos',
        ];

        $response = $this->actingAs($user)->post(route('areas.store'), $data);

        $response->assertRedirect(route('areas.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('areas', [
            'nome' => $data['nome'],
            'user_id' => $user->id,
        ]);
    }

    public function test_store_redirects_back_with_modal_header(): void
    {
        $user = User::factory()->create();
        
        $data = [
            'nome' => 'Modal Area ' . uniqid(),
            'descricao' => 'Description',
        ];

        // Simulate request from the Main Wizard
        $response = $this->actingAs($user)
            ->from(route('registos-cirurgicos.create'))
            ->post(route('areas.store'), $data, [
                'X-Inertia-Modal-Redirect-Back' => 'true'
            ]);

        $response->assertRedirect(route('registos-cirurgicos.create'));
        
        $this->assertDatabaseHas('areas', [
            'nome' => $data['nome'],
            'user_id' => $user->id,
        ]);
    }

    public function test_store_validates_unique_nome(): void
    {
        $user = User::factory()->create();
        Area::factory()->create(['nome' => 'Cirurgia Geral', 'user_id' => $user->id]);

        $data = [
            'nome' => 'Cirurgia Geral',
            'descricao' => 'Descrição',
        ];

        $response = $this->actingAs($user)->post(route('areas.store'), $data);

        $response->assertSessionHasErrors(['nome']);
    }

    public function test_area_has_diagnosticos_and_procedimentos(): void
    {
        $user = User::factory()->create();
        $area = Area::factory()->create(['user_id' => $user->id]);
        Diagnostico::factory()->count(3)->create(['area' => $area->nome, 'user_id' => $user->id]);
        Procedimento::factory()->count(5)->create(['area' => $area->nome, 'user_id' => $user->id]);

        $area->load('diagnosticos', 'procedimentos');

        $this->assertCount(3, $area->diagnosticos);
        $this->assertCount(5, $area->procedimentos);
    }

    public function test_scope_buscar_finds_areas(): void
    {
        $user = User::factory()->create();
        Area::factory()->create(['nome' => 'Cirurgia Cardíaca', 'user_id' => $user->id]);
        Area::factory()->create(['nome' => 'Cirurgia Vascular', 'user_id' => $user->id]);
        Area::factory()->create(['nome' => 'Ortopedia', 'user_id' => $user->id]);

        $areas = Area::where('user_id', $user->id)->buscar('Cirurgia')->get();

        $this->assertCount(2, $areas);
    }
}
