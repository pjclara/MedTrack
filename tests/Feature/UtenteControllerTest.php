<?php

use App\Models\User;
use App\Models\Utente;
use App\Enums\SexoEnum;
use Tests\TestCase;

beforeEach(function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = User::factory()->create();
    $this->user = $user;
});

test('utente index displays users utentes', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = $this->user;
    $this->actingAs($user);
    Utente::factory()->count(3)->create(['user_id' => $user->id]);

    $response = $this->get(route('utentes.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('utentes/index')
        ->has('utentes.data', 3)
    );
});

test('utente can be created with valid data', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = $this->user;
    $this->actingAs($user);

    $data = [
        'nome' => 'João Silva',
        'processo' => 12345,
        'data_nascimento' => '1990-01-01',
        'sexo' => SexoEnum::MASCULINO->value,
    ];

    $response = $this->post(route('utentes.store'), $data);

    $response->assertRedirect(route('utentes.index'));
    $this->assertDatabaseHas('utentes', [
        'processo' => 12345,
        'user_id' => $user->id
    ]);
});

test('utente creation fails with duplicate processo for same user', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = $this->user;
    $this->actingAs($user);
    Utente::factory()->create(['processo' => 555, 'user_id' => $user->id]);

    $data = [
        'nome' => 'Outro Nome',
        'processo' => 555, // Duplicate
        'data_nascimento' => '1990-01-01',
        'sexo' => SexoEnum::MASCULINO->value,
    ];

    $response = $this->post(route('utentes.store'), $data);

    $response->assertSessionHasErrors(['processo']);
});

test('utente can be updated', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = $this->user;
    $this->actingAs($user);
    $utente = Utente::factory()->create(['nome' => 'Nome Antigo', 'user_id' => $user->id]);

    $response = $this->put(route('utentes.update', $utente), [
        'nome' => 'Nome Novo',
        'processo' => $utente->processo,
        'data_nascimento' => $utente->data_nascimento->format('Y-m-d'),
        'sexo' => $utente->sexo->value,
    ]);

    $response->assertRedirect(route('utentes.index'));
    $this->assertEquals('Nome Novo', $utente->fresh()->nome);
});

test('utente can be deleted', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = $this->user;
    $this->actingAs($user);
    $utente = Utente::factory()->create(['user_id' => $user->id]);

    $response = $this->delete(route('utentes.destroy', $utente));

    $response->assertRedirect(route('utentes.index'));
    $this->assertDatabaseMissing('utentes', ['id' => $utente->id]);
});
