<?php

use App\Models\User;
use App\Models\Utente;
use App\Models\TipoDeCirurgia;
use App\Models\TipoDeOrigem;
use App\Models\TipoDeAbordagem;
use App\Enums\SexoEnum;
use Tests\TestCase;

beforeEach(function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = User::factory()->create();
    $this->user = $user;

    /** @var TipoDeCirurgia $tipoCirurgia */
    $tipoCirurgia = TipoDeCirurgia::factory()->create();
    $this->tipoCirurgia = $tipoCirurgia;

    /** @var TipoDeOrigem $tipoOrigem */
    $tipoOrigem = TipoDeOrigem::factory()->create();
    $this->tipoOrigem = $tipoOrigem;
});

test('guests cannot create a surgical record', function () {
    /** @var TestCase $this */
    $this->post(route('registos-cirurgicos.store'), [])
        ->assertRedirect(route('login'));
});

test('authenticated users can create a surgical record with a new utente', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = $this->user;
    /** @var TipoDeCirurgia $tipoCirurgia */
    $tipoCirurgia = $this->tipoCirurgia;
    /** @var TipoDeOrigem $tipoOrigem */
    $tipoOrigem = $this->tipoOrigem;

    $this->actingAs($user);

    $tipoAbordagem = TipoDeAbordagem::factory()->create(['user_id' => $user->id]);

    $data = [
        'utente' => [
            'nome' => 'Novo Utente Teste',
            'processo' => '123456',
            'data_nascimento' => '1980-01-01',
            'sexo' => SexoEnum::MASCULINO->value,
        ],
        'registo' => [
            'hospital' => 'Hospital Teste',
            'especialidade' => 'Cirurgia Geral',
            'data_cirurgia' => now()->format('Y-m-d'),
            'tipo_de_cirurgia_id' => $tipoCirurgia->id,
            'tipo_de_origem_id' => $tipoOrigem->id,
            'ambulatorio' => true,
            'tipo_de_abordagem_id' => (string) $tipoAbordagem->id,
            'observacoes' => 'Teste de observações',
        ],
        'diagnosticos' => [
            [
                'diagnostico_id' => \App\Models\Diagnostico::factory()->create(['user_id' => $user->id])->id,
                'procedimentos' => [
                    [
                        'procedimento_id' => \App\Models\Procedimento::factory()->create(['user_id' => $user->id])->id,
                        'funcao' => \App\Enums\FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                    ]
                ]
            ]
        ]
    ];

    $response = $this->post(route('registos-cirurgicos.store'), $data);

    $response->assertRedirect(route('registos-cirurgicos.index'));
    
    $this->assertDatabaseHas('utentes', ['nome' => 'Novo Utente Teste']);
    $this->assertDatabaseHas('registo_cirurgicos', [
        'user_id' => $this->user->id,
        'tipo_de_cirurgia_id' => $this->tipoCirurgia->id
    ]);
});

test('validation errors are handled when creating a record', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = $this->user;
    $this->actingAs($user);

    $response = $this->post(route('registos-cirurgicos.store'), [
        'utente' => [],
        'registo' => []
    ]);

    $response->assertSessionHasErrors(['utente.processo', 'registo.data_cirurgia']);
});

test('users can only see their own surgical records', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = $this->user;

    $otherUser = User::factory()->create();
    \App\Models\RegistoCirurgico::factory()->create(['user_id' => $otherUser->id]);
    
    $myRecord = \App\Models\RegistoCirurgico::factory()->create(['user_id' => $user->id]);

    $this->actingAs($user);

    $response = $this->get(route('registos-cirurgicos.index'));

    $response->assertStatus(200);
    
    // Check if my record is visible and other user's record is NOT
    $response->assertInertia(fn ($page) => $page
        ->has('registos.data', 1)
        ->where('registos.data.0.id', $myRecord->id)
    );
});
