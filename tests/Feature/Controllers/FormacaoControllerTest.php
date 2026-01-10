<?php

namespace Tests\Feature\Controllers;

use App\Models\Formacao;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FormacaoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_formacoes_list(): void
    {
        $user = User::factory()->create();
        Formacao::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('formacoes.index'));

        $response->assertOk();
    }

    public function test_store_creates_new_formacao(): void
    {
        $user = User::factory()->create();
        
        $data = [
            'tipo' => 'Curso',
            'titulo' => 'Curso de Cirurgia Laparoscópica',
            'entidade' => 'Hospital de São João',
            'data_inicio' => '2025-01-10',
            'data_fim' => '2025-01-15',
            'horas' => 40,
        ];

        $response = $this->actingAs($user)->post(route('formacoes.store'), $data);

        $response->assertRedirectToRoute('formacoes.show', ['formacao' => 1])
            ->assertSessionHas('success');

        $this->assertDatabaseHas('formacoes', [
            'titulo' => $data['titulo'],
            'user_id' => $user->id,
        ]);
    }

    public function test_destroy_deletes_formacao(): void
    {
        $user = User::factory()->create();
        $formacao = Formacao::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('formacoes.destroy', $formacao));

        $response->assertRedirect(route('formacoes.index'));
        $this->assertDatabaseMissing('formacoes', ['id' => $formacao->id]);
    }
}
