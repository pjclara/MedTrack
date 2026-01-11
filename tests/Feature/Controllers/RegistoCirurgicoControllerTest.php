<?php

namespace Tests\Feature\Controllers;

use App\Enums\FuncaoCirurgiaoEnum;
use App\Enums\TipoAbordagemEnum;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use App\Models\RegistoCirurgico;
use App\Models\User;
use App\Models\Utente;
use App\Models\TipoDeCirurgia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistoCirurgicoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_registos_list(): void
    {
        $user = User::factory()->create();
        RegistoCirurgico::factory()->count(4)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('registos-cirurgicos.index'));

        $response->assertOk();
    }

    public function test_create_displays_registo_create_form(): void
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)->get(route('registos-cirurgicos.create'));

        $response->assertOk();
    }

    public function test_store_creates_new_registo(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create(['user_id' => $user->id]);
        $tipo = TipoDeCirurgia::factory()->create();
        $tipoOrigem = \App\Models\TipoDeOrigem::factory()->create();
        $diagnostico = \App\Models\Diagnostico::factory()->create(['user_id' => $user->id]);
        $procedimento = \App\Models\Procedimento::factory()->create(['user_id' => $user->id]);

        $data = [
            'utente' => [
                'id' => (string) $utente->id,
                'nome' => $utente->nome,
                'processo' => (string) $utente->processo,
                'data_nascimento' => $utente->data_nascimento->format('Y-m-d'),
                'sexo' => $utente->sexo->value,
            ],
            'registo' => [
                'hospital' => 'Hospital Teste',
                'especialidade' => 'Cirurgia Geral',
                'data_cirurgia' => '2025-12-19',
                'tipo_de_cirurgia_id' => (string) $tipo->id,
                'tipo_de_origem_id' => (string) $tipoOrigem->id,
                'tipo_de_abordagem' => TipoAbordagemEnum::LAPAROSCOPICA->value,
                'ambulatorio' => false,
                'observacoes' => 'Cirurgia eletiva',
            ],
            'diagnosticos' => [
                [
                    'diagnostico_id' => (string) $diagnostico->id,
                    'tipo' => 'Maligno',
                    'procedimentos' => [
                        [
                            'procedimento_id' => (string) $procedimento->id,
                            'funcao' => \App\Enums\FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                            'clavien_dindo' => null,
                            'anatomia_patologica' => null,
                            'observacoes' => null,
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->actingAs($user)->post(route('registos-cirurgicos.store'), $data);

        $response->assertRedirect(route('registos-cirurgicos.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('registo_cirurgicos', [
            'utente_id' => $utente->id,
            'tipo_de_abordagem' => TipoAbordagemEnum::LAPAROSCOPICA->value,
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('cirurgias', [
            'diagnostico_id' => $diagnostico->id,
            'tipo' => 'Maligno',
        ]);
    }

    public function test_store_validates_tipo_abordagem_enum(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create(['user_id' => $user->id]);
        $tipo = TipoDeCirurgia::factory()->create();
        $tipoOrigem = \App\Models\TipoDeOrigem::factory()->create();
        $diagnostico = \App\Models\Diagnostico::factory()->create(['user_id' => $user->id]);
        $procedimento = \App\Models\Procedimento::factory()->create(['user_id' => $user->id]);

        $data = [
            'utente' => [
                'id' => (string) $utente->id,
                'nome' => $utente->nome,
                'processo' => (string) $utente->processo,
                'data_nascimento' => $utente->data_nascimento->format('Y-m-d'),
                'sexo' => $utente->sexo->value,
            ],
            'registo' => [                'hospital' => 'Hospital Teste',
                'especialidade' => 'Cirurgia Geral',                'data_cirurgia' => '2025-12-19',
                'tipo_de_cirurgia_id' => (string) $tipo->id,
                'tipo_de_origem_id' => (string) $tipoOrigem->id,
                'tipo_de_abordagem' => 'abordagem_invalida',
                'ambulatorio' => false,
            ],
            'diagnosticos' => [
                [
                    'diagnostico_id' => (string) $diagnostico->id,
                    'procedimentos' => [
                        [
                            'procedimento_id' => (string) $procedimento->id,
                            'funcao' => \App\Enums\FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->actingAs($user)->post(route('registos-cirurgicos.store'), $data);

        $response->assertSessionHasErrors(['registo.tipo_de_abordagem']);
    }

    public function test_show_displays_registo_with_cirurgias(): void
    {
        $user = User::factory()->create();
        $registo = RegistoCirurgico::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('registos-cirurgicos.show', $registo));

        $response->assertOk();
    }

    public function test_update_modifies_existing_registo(): void
    {
        $user = User::factory()->create();
        $registo = RegistoCirurgico::factory()->create(['user_id' => $user->id]);

        $data = [
            'utente' => [
                'id' => $registo->utente_id,
                'nome' => $registo->utente->nome,
                'processo' => $registo->utente->processo,
                'data_nascimento' => $registo->utente->data_nascimento->format('Y-m-d'),
                'sexo' => $registo->utente->sexo,
            ],
            'registo' => [
                'hospital' => 'Hospital Atualizado',
                'especialidade' => 'Cirurgia Vascular',
                'data_cirurgia' => '2025-12-20',
                'tipo_de_cirurgia_id' => $registo->tipo_de_cirurgia_id,
                'tipo_de_origem_id' => $registo->tipo_de_origem_id,
                'ambulatorio' => true,
                'tipo_de_abordagem' => TipoAbordagemEnum::ROBOTICA->value,
                'observacoes' => 'Observações atualizadas',
            ],
            'diagnosticos' => [
                [
                    'diagnostico_id' => Diagnostico::factory()->create(['user_id' => $user->id])->id,
                    'procedimentos' => [
                        [
                            'procedimento_id' => Procedimento::factory()->create(['user_id' => $user->id])->id,
                            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                        ]
                    ]
                ]
            ]
        ];

        $response = $this->actingAs($user)->put(route('registos-cirurgicos.update', $registo), $data);

        $response->assertRedirect(route('registos-cirurgicos.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseHas('registo_cirurgicos', [
            'id' => $registo->id,
            'tipo_de_abordagem' => TipoAbordagemEnum::ROBOTICA->value,
        ]);
    }

    public function test_destroy_deletes_registo(): void
    {
        $user = User::factory()->create();
        $registo = RegistoCirurgico::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('registos-cirurgicos.destroy', $registo));

        $response->assertRedirect(route('registos-cirurgicos.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('registo_cirurgicos', [
            'id' => $registo->id,
        ]);
    }

    public function test_scope_entre_datas_filters_correctly(): void
    {
        RegistoCirurgico::factory()->create(['data_cirurgia' => '2025-01-15']);
        RegistoCirurgico::factory()->create(['data_cirurgia' => '2025-06-15']);
        RegistoCirurgico::factory()->create(['data_cirurgia' => '2025-12-15']);

        $registos = RegistoCirurgico::entreDatas('2025-01-01', '2025-06-30')->get();

        expect($registos)->toHaveCount(2);
    }
}
