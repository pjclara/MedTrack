<?php

namespace Tests\Feature\Controllers;

use App\Enums\FuncaoCirurgiaoEnum;
use App\Enums\ClavienDindoEnum;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use App\Models\RegistoCirurgico;
use App\Models\TipoDeCirurgia;
use App\Models\TipoDeAbordagem;
use App\Models\User;
use App\Models\Utente;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistoCirurgicoWizardTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_creates_new_utente_when_id_not_provided(): void
    {
        $user = User::factory()->create();
        $tipo = TipoDeCirurgia::factory()->create();
        $diagnostico = Diagnostico::factory()->create(['user_id' => $user->id]);
        $procedimento = Procedimento::factory()->create(['user_id' => $user->id]);
        $tipoAbordagem = TipoDeAbordagem::factory()->create(['user_id' => $user->id]);

        $data = [
            'utente' => [
                'nome' => 'João Silva',
                'processo' => '54321',
                'data_nascimento' => '1980-05-15',
                'sexo' => 'Masculino',
            ],
            'registo' => [
                'hospital' => 'Hospital Teste',
                'especialidade' => 'Cirurgia Geral',
                'data_cirurgia' => '2025-12-19',
                'tipo_de_cirurgia_id' => (string) $tipo->id,
                'tipo_de_abordagem_id' => (string) $tipoAbordagem->id,
                'ambulatorio' => true,
                'observacoes' => 'Cirurgia de urgência',
            ],
            'diagnosticos' => [
                [
                    'diagnostico_id' => (string) $diagnostico->id,
                    'procedimentos' => [
                        [
                            'procedimento_id' => (string) $procedimento->id,
                            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->actingAs($user)->post(route('registos-cirurgicos.store'), $data);

        $response->assertRedirect(route('registos-cirurgicos.index'));

        $this->assertDatabaseHas('utentes', [
            'nome' => 'João Silva',
            'processo' => 54321,
            'user_id' => $user->id,
        ]);

        $utente = Utente::where('processo', 54321)->where('user_id', $user->id)->first();
        $this->assertDatabaseHas('registo_cirurgicos', [
            'utente_id' => $utente->id,
            'ambulatorio' => true,
            'user_id' => $user->id,
        ]);
    }

    public function test_store_updates_existing_utente_when_id_provided(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create(['nome' => 'Nome Antigo', 'user_id' => $user->id]);
        $tipo = TipoDeCirurgia::factory()->create();
        $diagnostico = Diagnostico::factory()->create(['user_id' => $user->id]);
        $procedimento = Procedimento::factory()->create(['user_id' => $user->id]);
        $tipoAbordagem = TipoDeAbordagem::factory()->create(['user_id' => $user->id]);

        $data = [
            'utente' => [
                'id' => (string) $utente->id,
                'nome' => 'Nome Atualizado',
                'processo' => (string) $utente->processo,
                'data_nascimento' => $utente->data_nascimento->format('Y-m-d'),
                'sexo' => $utente->sexo->value,
            ],
            'registo' => [
                'hospital' => 'Hospital Teste',
                'especialidade' => 'Cirurgia Geral',
                'data_cirurgia' => '2025-12-19',
                'tipo_de_cirurgia_id' => (string) $tipo->id,
                'tipo_de_abordagem_id' => (string) $tipoAbordagem->id,
                'ambulatorio' => false,
            ],
            'diagnosticos' => [
                [
                    'diagnostico_id' => (string) $diagnostico->id,
                    'procedimentos' => [
                        [
                            'procedimento_id' => (string) $procedimento->id,
                            'funcao' => FuncaoCirurgiaoEnum::RESIDENTE->value,
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->actingAs($user)->post(route('registos-cirurgicos.store'), $data);

        $response->assertRedirect(route('registos-cirurgicos.index'));

        $this->assertDatabaseHas('utentes', [
            'id' => $utente->id,
            'nome' => 'Nome Atualizado',
        ]);
    }

    public function test_store_creates_multiple_diagnosticos_and_procedimentos(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create(['user_id' => $user->id]);
        $tipo = TipoDeCirurgia::factory()->create();
        $diagnostico1 = Diagnostico::factory()->create(['user_id' => $user->id]);
        $diagnostico2 = Diagnostico::factory()->create(['user_id' => $user->id]);
        $procedimento1 = Procedimento::factory()->create(['user_id' => $user->id]);
        $procedimento2 = Procedimento::factory()->create(['user_id' => $user->id]);
        $procedimento3 = Procedimento::factory()->create(['user_id' => $user->id]);
        $tipoAbordagem = TipoDeAbordagem::factory()->create(['user_id' => $user->id]);

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
                'tipo_de_abordagem_id' => (string) $tipoAbordagem->id,
                'ambulatorio' => false,
            ],
            'diagnosticos' => [
                [
                    'diagnostico_id' => (string) $diagnostico1->id,
                    'procedimentos' => [
                        [
                            'procedimento_id' => (string) $procedimento1->id,
                            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                        ],
                        [
                            'procedimento_id' => (string) $procedimento2->id,
                            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_ASSISTENTE->value,
                        ],
                    ],
                ],
                [
                    'diagnostico_id' => (string) $diagnostico2->id,
                    'procedimentos' => [
                        [
                            'procedimento_id' => (string) $procedimento3->id,
                            'funcao' => FuncaoCirurgiaoEnum::RESIDENTE->value,
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->actingAs($user)->post(route('registos-cirurgicos.store'), $data);

        $response->assertRedirect(route('registos-cirurgicos.index'));

        $registo = RegistoCirurgico::where('utente_id', $utente->id)->first();
        $this->assertNotNull($registo);
        $this->assertCount(3, $registo->cirurgias);

        $this->assertDatabaseHas('cirurgias', [
            'registo_cirurgico_id' => $registo->id,
            'diagnostico_id' => $diagnostico1->id,
            'procedimento_id' => $procedimento1->id,
            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
        ]);

        $this->assertDatabaseHas('cirurgias', [
            'registo_cirurgico_id' => $registo->id,
            'diagnostico_id' => $diagnostico2->id,
            'procedimento_id' => $procedimento3->id,
            'funcao' => FuncaoCirurgiaoEnum::RESIDENTE->value,
        ]);
    }

    public function test_store_saves_optional_clavien_dindo_and_anatomia_patologica(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create(['user_id' => $user->id]);
        $tipo = TipoDeCirurgia::factory()->create();
        $diagnostico = Diagnostico::factory()->create(['user_id' => $user->id]);
        $procedimento = Procedimento::factory()->create(['user_id' => $user->id]);
        $tipoAbordagem = TipoDeAbordagem::factory()->create(['user_id' => $user->id]);

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
                'tipo_de_abordagem_id' => (string) $tipoAbordagem->id,
                'ambulatorio' => false,
            ],
            'diagnosticos' => [
                [
                    'diagnostico_id' => (string) $diagnostico->id,
                    'procedimentos' => [
                        [
                            'procedimento_id' => (string) $procedimento->id,
                            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                            'clavien_dindo' => ClavienDindoEnum::GRAU_II->value,
                            'anatomia_patologica' => 'Resultado negativo para malignidade',
                            'observacoes' => 'Evolução favorável',
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->actingAs($user)->post(route('registos-cirurgicos.store'), $data);

        $response->assertRedirect(route('registos-cirurgicos.index'));

        $this->assertDatabaseHas('cirurgias', [
            'procedimento_id' => $procedimento->id,
            'clavien-dindo' => ClavienDindoEnum::GRAU_II->value,
            'anatomia_patologica' => 'Resultado negativo para malignidade',
            'observacoes' => 'Evolução favorável',
        ]);
    }

    public function test_store_validates_required_utente_fields(): void
    {
        $user = User::factory()->create();
        $tipo = TipoDeCirurgia::factory()->create();
        $diagnostico = Diagnostico::factory()->create(['user_id' => $user->id]);
        $procedimento = Procedimento::factory()->create(['user_id' => $user->id]);
        $tipoAbordagem = TipoDeAbordagem::factory()->create(['user_id' => $user->id]);

        $data = [
            'utente' => [
                'nome' => '',
                'processo' => '',
            ],
            'registo' => [
                'data_cirurgia' => '2025-12-19',
                'tipo_de_cirurgia_id' => (string) $tipo->id,
                'tipo_de_abordagem_id' => (string) $tipoAbordagem->id,
                'ambulatorio' => false,
            ],
            'diagnosticos' => [
                [
                    'diagnostico_id' => (string) $diagnostico->id,
                    'procedimentos' => [
                        [
                            'procedimento_id' => (string) $procedimento->id,
                            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->actingAs($user)->post(route('registos-cirurgicos.store'), $data);

        $response->assertSessionHasErrors([
            'utente.processo',
            'utente.data_nascimento',
            'utente.sexo',
            'registo.hospital',
            'registo.especialidade',
        ]);
    }

    public function test_store_validates_at_least_one_diagnostico(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create();
        $tipo = TipoDeCirurgia::factory()->create();
        $tipoAbordagem = TipoDeAbordagem::factory()->create(['user_id' => $user->id]);

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
                'tipo_de_abordagem_id' => (string) $tipoAbordagem->id,
                'ambulatorio' => false,
            ],
            'diagnosticos' => [],
        ];

        $response = $this->actingAs($user)->post(route('registos-cirurgicos.store'), $data);

        $response->assertSessionHasErrors(['diagnosticos']);
    }

    public function test_store_validates_at_least_one_procedimento_per_diagnostico(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create();
        $tipo = TipoDeCirurgia::factory()->create();
        $diagnostico = Diagnostico::factory()->create();
        $tipoAbordagem = TipoDeAbordagem::factory()->create(['user_id' => $user->id]);

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
                'tipo_de_abordagem_id' => (string) $tipoAbordagem->id,
                'ambulatorio' => false,
            ],
            'diagnosticos' => [
                [
                    'diagnostico_id' => (string) $diagnostico->id,
                    'procedimentos' => [],
                ],
            ],
        ];

        $response = $this->actingAs($user)->post(route('registos-cirurgicos.store'), $data);

        $response->assertSessionHasErrors(['diagnosticos.0.procedimentos']);
    }

    public function test_store_saves_diagnostico_tipo(): void
    {
        $user = User::factory()->create();
        $utente = Utente::factory()->create(['user_id' => $user->id]);
        $tipo = TipoDeCirurgia::factory()->create();
        $diagnostico = Diagnostico::factory()->create(['user_id' => $user->id]);
        $procedimento = Procedimento::factory()->create(['user_id' => $user->id]);
        $tipoAbordagem = TipoDeAbordagem::factory()->create(['user_id' => $user->id]);

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
                'tipo_de_abordagem_id' => (string) $tipoAbordagem->id,
                'ambulatorio' => false,
            ],
            'diagnosticos' => [
                [
                    'diagnostico_id' => (string) $diagnostico->id,
                    'tipo' => 'Maligno',
                    'procedimentos' => [
                        [
                            'procedimento_id' => (string) $procedimento->id,
                            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->actingAs($user)->post(route('registos-cirurgicos.store'), $data);

        $response->assertRedirect(route('registos-cirurgicos.index'));

        $this->assertDatabaseHas('cirurgias', [
            'diagnostico_id' => $diagnostico->id,
            'tipo' => 'Maligno',
        ]);
    }
}
