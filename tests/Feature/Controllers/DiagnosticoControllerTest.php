<?php

namespace Tests\Feature\Controllers;

use App\Models\Diagnostico;
use App\Models\Area;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DiagnosticoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_diagnosticos_list(): void
    {
        $user = User::factory()->create();
        Diagnostico::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('diagnosticos.index'));

        $response->assertOk();
    }

    public function test_store_creates_new_diagnostico(): void
    {
        $user = User::factory()->create();
        $area = Area::factory()->create(['user_id' => $user->id]);
        
        $data = [
            'nome' => 'Apendicite Aguda ' . uniqid(),
            'area' => $area->nome,
            'descricao' => 'Descrição do diagnóstico',
        ];

        $response = $this->actingAs($user)->post(route('diagnosticos.store'), $data);

        $response->assertRedirect(route('diagnosticos.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('diagnosticos', [
            'nome' => $data['nome'],
            'area' => $area->nome,
            'user_id' => $user->id,
        ]);
    }

    public function test_store_redirects_back_with_modal_header(): void
    {
        $user = User::factory()->create();
        $area = Area::factory()->create(['user_id' => $user->id]);
        
        $data = [
            'nome' => 'Modal Diagnostico ' . uniqid(),
            'area' => $area->nome,
        ];

        $response = $this->actingAs($user)
            ->from(route('registos-cirurgicos.create'))
            ->post(route('diagnosticos.store'), $data, [
                'X-Inertia-Modal-Redirect-Back' => 'true'
            ]);

        $response->assertRedirect(route('registos-cirurgicos.create'));
    }

    public function test_destroy_deletes_diagnostico(): void
    {
        $user = User::factory()->create();
        $diagnostico = Diagnostico::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('diagnosticos.destroy', $diagnostico));

        $response->assertRedirect(route('diagnosticos.index'));
        $this->assertDatabaseMissing('diagnosticos', ['id' => $diagnostico->id]);
    }
}
