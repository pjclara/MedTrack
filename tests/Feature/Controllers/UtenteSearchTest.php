<?php

namespace Tests\Feature\Controllers;

use App\Models\User;
use App\Models\Utente;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UtenteSearchTest extends TestCase
{
    use RefreshDatabase;

    public function test_find_by_processo_returns_utente_when_exists(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create(['processo' => 12345]);

        $response = $this->actingAs($user)->get('/api/utentes/processo/12345');

        $response->assertOk()
            ->assertJson([
                'utente' => [
                    'id' => (string) $utente->id,
                    'nome' => $utente->nome,
                    'processo' => '12345',
                    'data_nascimento' => $utente->data_nascimento->format('Y-m-d'),
                    'sexo' => $utente->sexo->value,
                ],
            ]);
    }

    public function test_find_by_processo_returns_null_when_not_exists(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/api/utentes/processo/99999');

        $response->assertOk()
            ->assertJson([
                'utente' => null,
            ]);
    }

    public function test_find_by_processo_requires_authentication(): void
    {
        $response = $this->get('/api/utentes/processo/12345');

        $response->assertRedirect(route('login'));
    }
}
