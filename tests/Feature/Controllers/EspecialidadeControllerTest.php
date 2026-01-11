<?php

namespace Tests\Feature\Controllers;

use App\Models\Especialidade;
use App\Models\User;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EspecialidadeControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_especialidades_list(): void
    {
        $user = User::factory()->create();
        Especialidade::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('especialidades.index'));

        $response->assertOk();
    }

    public function test_store_creates_new_especialidade(): void
    {
        $user = User::factory()->create();
        
        $data = [
            'nome' => 'Cirurgia Cardíaca ' . uniqid(),
            'descricao' => 'Procedimentos cardíacos',
        ];

        $response = $this->actingAs($user)->post(route('especialidades.store'), $data);

        $response->assertRedirect(route('especialidades.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('especialidades', [
            'nome' => $data['nome'],
            'user_id' => $user->id,
        ]);
    }

    public function test_store_redirects_back_with_modal_header(): void
    {
        $user = User::factory()->create();
        
        $data = [
            'nome' => 'Modal Especialidade ' . uniqid(),
            'descricao' => 'Description',
        ];

        // Simulate request from the Main Wizard
        $response = $this->actingAs($user)
            ->from(route('registos-cirurgicos.create'))
            ->post(route('especialidades.store'), $data, [
                'X-Inertia-Modal-Redirect-Back' => 'true'
            ]);

        $response->assertRedirect(route('registos-cirurgicos.create'));
        
        $this->assertDatabaseHas('especialidades', [
            'nome' => $data['nome'],
            'user_id' => $user->id,
        ]);
    }

    public function test_store_validates_unique_nome(): void
    {
        $user = User::factory()->create();
        Especialidade::factory()->create(['nome' => 'Cirurgia Geral', 'user_id' => $user->id]);

        $data = [
            'nome' => 'Cirurgia Geral',
            'descricao' => 'Descrição',
        ];

        $response = $this->actingAs($user)->post(route('especialidades.store'), $data);

        $response->assertSessionHasErrors(['nome']);
    }

    public function test_especialidade_has_procedimentos(): void
    {
        $user = User::factory()->create();
        $especialidade = Especialidade::factory()->create(['user_id' => $user->id]);
        Procedimento::factory()->count(5)->create(['especialidade' => $especialidade->nome, 'user_id' => $user->id]);

        $especialidade->load('procedimentos');

        $this->assertCount(5, $especialidade->procedimentos);
    }

    public function test_scope_buscar_finds_especialidades(): void
    {
        $user = User::factory()->create();
        Especialidade::factory()->create([
            'nome' => 'Ginecologia',
            'user_id' => $user->id
        ]);
        Especialidade::factory()->create([
            'nome' => 'Ortopedia',
            'user_id' => $user->id
        ]);

        $results = Especialidade::buscar('orto')->get();
        $this->assertCount(1, $results);
        $this->assertEquals('Ortopedia', $results->first()->nome);
    }
}
