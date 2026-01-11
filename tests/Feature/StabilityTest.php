<?php

use App\Models\User;
use App\Models\Especialidade;
use App\Models\TipoDeCirurgia;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

test('home page is accessible', function () {
    /** @var TestCase $this */
    $this->get(route('home'))
        ->assertStatus(200);
});

test('login page is accessible', function () {
    /** @var TestCase $this */
    $this->get(route('login'))
        ->assertStatus(200);
});

test('database connection is working', function () {
    /** @var TestCase $this */
    try {
        DB::connection()->getPdo();
        $this->assertTrue(true);
    } catch (\Exception $e) {
        $this->fail("Database connection failed: " . $e->getMessage());
    }
});

test('authenticated user can access core pages', function () {
    /** @var TestCase $this */
    /** @var \App\Models\User $user */
    $user = User::factory()->create();

    $this->actingAs($user);

    // Dashboard
    $this->get(route('dashboard'))
        ->assertStatus(200)
        ->assertInertia(fn ($page) => $page->component('dashboard'));

    // Registos Cirúrgicos
    $this->get(route('registos-cirurgicos.index'))
        ->assertStatus(200);

    // Utentes
    $this->get(route('utentes.index'))
        ->assertStatus(200);
});

test('essential seeded data can be accessed', function () {
    /** @var TestCase $this */
    // We expect these to be empty normally if using RefreshDatabase WITHOUT seeding,
    // but the test confirms the models and tables are correctly mapped.
    
    // Create one of each to verify model/table integrity
    Especialidade::factory()->create();
    TipoDeCirurgia::factory()->create();

    $this->assertGreaterThan(0, Especialidade::count());
    $this->assertGreaterThan(0, TipoDeCirurgia::count());
});

test('medfolio configuration is loaded safely', function () {
    /** @var TestCase $this */
    $this->assertNotEmpty(config('medfolio.sexo_options'));
    $this->assertNotEmpty(config('medfolio.tipo_abordagem_options'));
    $this->assertNotEmpty(config('medfolio.funcao_options'));
});

test('can create a surgical record through factory', function () {
    /** @var TestCase $this */
    $user = User::factory()->create();
    $record = \App\Models\RegistoCirurgico::factory()->create([
        'user_id' => $user->id
    ]);

    $this->assertDatabaseHas('registo_cirurgicos', [
        'id' => $record->id,
        'user_id' => $user->id
    ]);
});

test('application can handle a sequence of basic operations', function () {
    /** @var TestCase $this */
    /** @var \App\Models\User $user */
    $user = User::factory()->create();
    $this->actingAs($user);

    // 1. Visit Dashboard
    $this->get(route('dashboard'))->assertOk();

    // 2. Visit Registos
    $this->get(route('registos-cirurgicos.index'))->assertOk();

    // 3. Visit Settings
    $this->get(route('profile.edit'))->assertOk();
});
