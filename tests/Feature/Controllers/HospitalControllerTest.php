<?php

namespace Tests\Feature\Controllers;

use App\Models\Hospital;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HospitalControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_hospitals_list(): void
    {
        $user = User::factory()->create();
        Hospital::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('hospitals.index'));

        $response->assertOk();
    }

    public function test_store_creates_new_hospital(): void
    {
        $user = User::factory()->create();
        
        $data = [
            'nome' => 'Hospital Central de Teste',
        ];

        $response = $this->actingAs($user)->post(route('hospitals.store'), $data);

        $response->assertRedirect(route('hospitals.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('hospitals', [
            'nome' => $data['nome'],
            'user_id' => $user->id,
        ]);
    }

    public function test_update_modifies_existing_hospital(): void
    {
        $user = User::factory()->create();
        $hospital = Hospital::factory()->create(['user_id' => $user->id, 'nome' => 'Nome Antigo']);
        
        $data = [
            'nome' => 'Nome Atualizado',
        ];

        $response = $this->actingAs($user)->patch(route('hospitals.update', $hospital), $data);

        $response->assertRedirect(route('hospitals.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('hospitals', [
            'id' => $hospital->id,
            'nome' => 'Nome Atualizado',
        ]);
    }

    public function test_destroy_deletes_hospital(): void
    {
        $user = User::factory()->create();
        $hospital = Hospital::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('hospitals.destroy', $hospital));

        $response->assertRedirect(route('hospitals.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('hospitals', ['id' => $hospital->id]);
    }

    public function test_user_cannot_update_others_hospital(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $hospital = Hospital::factory()->create(['user_id' => $user1->id]);

        $response = $this->actingAs($user2)->patch(route('hospitals.update', $hospital), [
            'nome' => 'Tentar Mudar',
        ]);

        $response->assertForbidden();
    }
}
