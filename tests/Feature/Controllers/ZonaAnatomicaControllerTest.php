<?php

namespace Tests\Feature\Controllers;

use App\Models\ZonaAnatomica;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ZonaAnatomicaControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_zona_anatomicas_list(): void
    {
        $user = User::factory()->create();
        ZonaAnatomica::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('zona-anatomicas.index'));

        $response->assertOk();
    }

    public function test_store_creates_new_zona_anatomica(): void
    {
        $user = User::factory()->create();
        
        $data = [
            'nome' => 'Tórax ' . uniqid(),
            'descricao' => 'Cavidade torácica',
        ];

        $response = $this->actingAs($user)->post(route('zona-anatomicas.store'), $data);

        $response->assertRedirect(route('zona-anatomicas.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('zona_anatomicas', [
            'nome' => $data['nome'],
            'user_id' => $user->id,
        ]);
    }

    public function test_store_redirects_back_with_modal_header(): void
    {
        $user = User::factory()->create();
        
        $data = [
            'nome' => 'Modal Zona ' . uniqid(),
            'descricao' => 'Description',
        ];

        // Simulate request from the Main Wizard or Diagnosis form
        $response = $this->actingAs($user)
            ->from(route('diagnosticos.create'))
            ->post(route('zona-anatomicas.store'), $data, [
                'X-Inertia-Modal-Redirect-Back' => 'true'
            ]);

        $response->assertRedirect(route('diagnosticos.create'));
        
        $this->assertDatabaseHas('zona_anatomicas', [
            'nome' => $data['nome'],
            'user_id' => $user->id,
        ]);
    }

    public function test_update_modifies_zona_anatomica(): void
    {
        $user = User::factory()->create();
        $zona = ZonaAnatomica::factory()->create(['user_id' => $user->id]);
        
        $newData = [
            'nome' => 'Nome Atualizado',
            'descricao' => 'Nova Descrição',
        ];

        $response = $this->actingAs($user)->put(route('zona-anatomicas.update', $zona), $newData);

        $response->assertRedirect(route('zona-anatomicas.index'));
        $this->assertDatabaseHas('zona_anatomicas', [
            'id' => $zona->id,
            'nome' => 'Nome Atualizado',
        ]);
    }

    public function test_destroy_deletes_zona_anatomica(): void
    {
        $user = User::factory()->create();
        $zona = ZonaAnatomica::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('zona-anatomicas.destroy', $zona));

        $response->assertRedirect(route('zona-anatomicas.index'));
        $this->assertDatabaseMissing('zona_anatomicas', ['id' => $zona->id]);
    }
}
