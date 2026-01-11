<?php

namespace Tests\Feature\Controllers;

use App\Models\Procedimento;
use App\Models\Especialidade;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProcedimentoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_procedimentos_list(): void
    {
        $user = User::factory()->create();
        Procedimento::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('procedimentos.index'));

        $response->assertOk();
    }

    public function test_store_creates_new_procedimento(): void
    {
        $user = User::factory()->create();
        $especialidade = Especialidade::factory()->create(['user_id' => $user->id]);
        
        $data = [
            'nome' => 'Apendicectomia ' . uniqid(),
            'especialidade' => $especialidade->nome,
            'descricao' => 'Descrição do procedimento',
        ];

        $response = $this->actingAs($user)->post(route('procedimentos.store'), $data);

        $response->assertRedirect(route('procedimentos.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('procedimentos', [
            'nome' => $data['nome'],
            'especialidade' => $especialidade->nome,
            'user_id' => $user->id,
        ]);
    }

    public function test_store_redirects_back_with_modal_header(): void
    {
        $user = User::factory()->create();
        $especialidade = Especialidade::factory()->create(['user_id' => $user->id]);
        
        $data = [
            'nome' => 'Modal Procedimento ' . uniqid(),
            'especialidade' => $especialidade->nome,
        ];

        $response = $this->actingAs($user)
            ->from(route('registos-cirurgicos.create'))
            ->post(route('procedimentos.store'), $data, [
                'X-Inertia-Modal-Redirect-Back' => 'true'
            ]);

        $response->assertRedirect(route('registos-cirurgicos.create'));
    }

    public function test_destroy_deletes_procedimento(): void
    {
        $user = User::factory()->create();
        $procedimento = Procedimento::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('procedimentos.destroy', $procedimento));

        $response->assertRedirect(route('procedimentos.index'));
        $this->assertDatabaseMissing('procedimentos', ['id' => $procedimento->id]);
    }
}
