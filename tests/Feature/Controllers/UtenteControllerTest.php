<?php

namespace Tests\Feature\Controllers;

use App\Enums\SexoEnum;
use App\Models\User;
use App\Models\Utente;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UtenteControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_utentes_list(): void
    {
        $user = User::factory()->create();
        Utente::factory()->count(3)->create();

        $response = $this->actingAs($user)->get(route('utentes.index'));

        $response->assertOk();
    }

    public function test_create_displays_utente_create_form(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('utentes.create'));

        $response->assertStatus(200);
    }

    public function test_store_creates_new_utente(): void
    {
        $user = User::factory()->create();
        
        $data = [
            'nome' => 'João Silva',
            'data_nascimento' => '1990-05-15',
            'sexo' => SexoEnum::MASCULINO->value,
            'processo' => 20250001,
        ];

        $response = $this->actingAs($user)->post(route('utentes.store'), $data);

        $response->assertRedirect(route('utentes.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('utentes', [
            'nome' => 'João Silva',
            'processo' => 20250001,
        ]);
    }

    public function test_store_validates_required_fields(): void
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)->post(route('utentes.store'), []);

        $response->assertSessionHasErrors(['nome', 'data_nascimento', 'sexo', 'processo']);
    }

    public function test_store_validates_sexo_enum(): void
    {
        $user = User::factory()->create();
        
        $data = [
            'nome' => 'João Silva',
            'data_nascimento' => '1990-05-15',
            'sexo' => 'invalido',
            'processo' => 20250002,
        ];

        $response = $this->actingAs($user)->post(route('utentes.store'), $data);

        $response->assertSessionHasErrors(['sexo']);
    }

    public function test_show_displays_utente_details(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create();

        $response = $this->actingAs($user)->get(route('utentes.show', $utente));

        $response->assertOk();
    }

    public function test_edit_displays_utente_edit_form(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create();

        $response = $this->actingAs($user)->get(route('utentes.edit', $utente));

        $response->assertOk();
    }

    public function test_update_modifies_existing_utente(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create();

        $data = [
            'nome' => 'Maria Santos Atualizada',
            'data_nascimento' => $utente->data_nascimento->format('Y-m-d'),
            'sexo' => SexoEnum::FEMININO->value,
            'processo' => $utente->processo,
        ];

        $response = $this->actingAs($user)->put(route('utentes.update', $utente), $data);

        $response->assertRedirect(route('utentes.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('utentes', [
            'id' => $utente->id,
            'nome' => 'Maria Santos Atualizada',
        ]);
    }

    public function test_destroy_deletes_utente(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create();

        $response = $this->actingAs($user)->delete(route('utentes.destroy', $utente));

        $response->assertRedirect(route('utentes.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('utentes', [
            'id' => $utente->id,
        ]);
    }
}
