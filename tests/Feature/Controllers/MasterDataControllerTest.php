<?php

namespace Tests\Feature\Controllers;

use App\Models\TipoDeCirurgia;
use App\Models\TipoDeOrigem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MasterDataControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_tipo_de_cirurgia_index(): void
    {
        $user = User::factory()->create();
        TipoDeCirurgia::factory()->count(3)->create();

        $response = $this->actingAs($user)->get(route('tipos-de-cirurgia.index'));

        $response->assertOk();
    }

    public function test_tipo_de_origem_index(): void
    {
        $user = User::factory()->create();
        TipoDeOrigem::factory()->count(3)->create();

        $response = $this->actingAs($user)->get(route('tipos-de-origem.index'));

        $response->assertOk();
    }
}
