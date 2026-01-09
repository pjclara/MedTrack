<?php

use App\Models\User;
use App\Models\RegistoCirurgico;
use App\Models\AtividadeCientifica;
use Tests\TestCase;

test('dashboard stats are calculated correctly', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = User::factory()->create();
    $this->actingAs($user);

    // Create some data for the user
    RegistoCirurgico::factory()->count(3)->create(['user_id' => $user->id]);
    AtividadeCientifica::factory()->count(2)->create(['user_id' => $user->id]);

    // Create data for another user (should not count)
    RegistoCirurgico::factory()->count(1)->create(['user_id' => User::factory()->create()->id]);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard') // Component name based on the actual controller implementation
        ->where('stats.totalRegistos', 3)
        ->where('stats.totalPublicacoes', 2)
    );
});
