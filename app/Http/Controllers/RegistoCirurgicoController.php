<?php

namespace App\Http\Controllers;

use App\Models\RegistoCirurgico;
use App\Models\Utente;
use App\Models\TipoDeCirurgia;
use App\Models\TipoDeOrigem;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use App\Http\Requests\StoreRegistoCirurgicoRequest;
use App\Http\Requests\UpdateRegistoCirurgicoRequest;
use Illuminate\Support\Facades\DB;
use App\Enums\TipoAbordagemEnum;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class RegistoCirurgicoController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', RegistoCirurgico::class);

        $registos = RegistoCirurgico::with([
                'utente:id,nome,processo',
                'tipoDeCirurgia:id,nome',
                'tipoDeOrigem:id,nome'
            ])
            ->where('user_id', auth()->id())
            ->withCount('cirurgias')
            ->orderBy('data_cirurgia', 'desc')
            ->paginate(15);
        return Inertia::render('registos-cirurgicos/index', [
            'registos' => $registos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', RegistoCirurgico::class);

        return Inertia::render('registos-cirurgicos/create', [
            'tiposDeCirurgia' => TipoDeCirurgia::orderBy('nome')->get(['id', 'nome']),
            'tiposDeOrigem' => TipoDeOrigem::orderBy('nome')->get(['id', 'nome']),
            'diagnosticos' => Diagnostico::orderBy('nome')->get(['id', 'nome']),
            'procedimentos' => Procedimento::orderBy('nome')->get(['id', 'nome']),
            'enums' => [
                'sexo' => config('medfolio.sexo_options'),
                'funcoes' => config('medfolio.funcao_options'),
                'clavien' => config('medfolio.clavien_dindo_options'),
                'tipo_de_abordagem' => TipoAbordagemEnum::values(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRegistoCirurgicoRequest $request)
    {
        $this->authorize('create', RegistoCirurgico::class);

        $payload = $request->validated();

        DB::transaction(function () use ($payload) {
            $utenteData = $payload['utente'];

            $utenteAttributes = [
                'nome' => $utenteData['nome'],
                'processo' => $utenteData['processo'],
                'data_nascimento' => $utenteData['data_nascimento'],
                'sexo' => $utenteData['sexo'],
            ];

            if (!empty($utenteData['id'])) {
                $utente = Utente::findOrFail($utenteData['id']);
                $utente->update($utenteAttributes);
            } else {
                $utente = Utente::create($utenteAttributes);
            }

            $registoData = $payload['registo'];

            $registo = $utente->registoCirurgicos()->create([
                'user_id' => auth()->id(),
                'data_cirurgia' => $registoData['data_cirurgia'],
                'tipo_de_cirurgia_id' => $registoData['tipo_de_cirurgia_id'],
                'tipo_de_origem_id' => $registoData['tipo_de_origem_id'],
                'ambulatorio' => $registoData['ambulatorio'],
                'observacoes' => $registoData['observacoes'] ?? null,
                'tipo_de_abordagem' => $registoData['tipo_de_abordagem']
                    ?? TipoAbordagemEnum::CONVENCIONAL->value,
            ]);

            foreach ($payload['diagnosticos'] as $diagnostico) {
                foreach ($diagnostico['procedimentos'] as $procedimento) {
                    $registo->cirurgias()->create([
                        'diagnostico_id' => $diagnostico['diagnostico_id'],
                        'procedimento_id' => $procedimento['procedimento_id'],
                        'funcao' => $procedimento['funcao'],
                        'clavien-dindo' => $procedimento['clavien_dindo'] ?? null,
                        'anatomia_patologica' => $procedimento['anatomia_patologica'] ?? null,
                        'observacoes' => $procedimento['observacoes'] ?? null,
                    ]);
                }
            }
        });

        return redirect()->route('registos-cirurgicos.index')
            ->with('success', 'Registo cirúrgico criado com sucesso.');

    }

    /**
     * Display the specified resource.
     */
    public function show(RegistoCirurgico $registo)
    {
        $this->authorize('view', $registo);

        $registo->load([
            'utente',
            'tipoDeCirurgia',
            'tipoDeOrigem',
            'cirurgias.diagnostico',
            'cirurgias.procedimento'
        ]);
        return Inertia::render('registos-cirurgicos/show', [
            'registo' => $registo->toArray() + [
                'data_cirurgia' => $registo->data_cirurgia?->format('Y-m-d'),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RegistoCirurgico $registo)
    {
        $this->authorize('update', $registo);

        $registo->load([
            'utente',
            'tipoDeCirurgia',
            'tipoDeOrigem',
            'cirurgias.diagnostico',
            'cirurgias.procedimento'
        ]);

        // Transform cirurgias into wizard format
        $diagnosticosMap = [];
        foreach ($registo->cirurgias as $cirurgia) {
            $diagId = $cirurgia->diagnostico_id;
            if (!isset($diagnosticosMap[$diagId])) {
                $diagnosticosMap[$diagId] = [
                    'diagnostico_id' => (string) $diagId,
                    'procedimentos' => []
                ];
            }
            $diagnosticosMap[$diagId]['procedimentos'][] = [
                'procedimento_id' => (string) $cirurgia->procedimento_id,
                'funcao' => $cirurgia->funcao,
                'clavien_dindo' => $cirurgia->{'clavien-dindo'} ?? '',
                'anatomia_patologica' => $cirurgia->anatomia_patologica ?? '',
                'observacoes' => $cirurgia->observacoes ?? '',
            ];
        }

        return Inertia::render('registos-cirurgicos/edit', [
            'registo' => [
                'id' => $registo->id,
                'utente' => [
                    'id' => (string) $registo->utente->id,
                    'nome' => $registo->utente->nome,
                    'processo' => $registo->utente->processo,
                    'data_nascimento' => $registo->utente->data_nascimento,
                    'sexo' => $registo->utente->sexo,
                ],
                'registo' => [
                    'data_cirurgia' => $registo->data_cirurgia?->format('Y-m-d'),
                    'tipo_de_cirurgia_id' => (string) $registo->tipo_de_cirurgia_id,
                    'tipo_de_origem_id' => (string) ($registo->tipo_de_origem_id ?? ''),
                    'ambulatorio' => $registo->ambulatorio,
                    'tipo_de_abordagem' => $registo->tipo_de_abordagem?->value ?? '',
                    'observacoes' => $registo->observacoes ?? '',
                ],
                'diagnosticos' => array_values($diagnosticosMap),
            ],
            'tiposDeCirurgia' => TipoDeCirurgia::orderBy('nome')->get(['id', 'nome']),
            'tiposDeOrigem' => TipoDeOrigem::orderBy('nome')->get(['id', 'nome']),
            'diagnosticos' => Diagnostico::orderBy('nome')->get(['id', 'nome']),
            'procedimentos' => Procedimento::orderBy('nome')->get(['id', 'nome']),
            'enums' => [
                'sexo' => config('medfolio.sexo_options'),
                'funcoes' => config('medfolio.funcao_options'),
                'clavien' => config('medfolio.clavien_dindo_options'),
                'tipo_de_abordagem' => TipoAbordagemEnum::values(),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRegistoCirurgicoRequest $request, RegistoCirurgico $registo)
    {
        $this->authorize('update', $registo);

        $payload = $request->validated();

        DB::transaction(function () use ($payload, $registo) {
            $utenteData = $payload['utente'];

            // Update utente
            $utenteAttributes = [
                'nome' => $utenteData['nome'],
                'processo' => $utenteData['processo'],
                'data_nascimento' => $utenteData['data_nascimento'],
                'sexo' => $utenteData['sexo'],
            ];

            $registo->utente->update($utenteAttributes);

            // Update registo
            $registoData = $payload['registo'];
            $registo->update([
                'data_cirurgia' => $registoData['data_cirurgia'],
                'tipo_de_cirurgia_id' => $registoData['tipo_de_cirurgia_id'],
                'tipo_de_origem_id' => $registoData['tipo_de_origem_id'],
                'ambulatorio' => $registoData['ambulatorio'],
                'observacoes' => $registoData['observacoes'] ?? null,
                'tipo_de_abordagem' => $registoData['tipo_de_abordagem'],
            ]);

            // Delete old cirurgias
            $registo->cirurgias()->delete();

            // Create new cirurgias
            foreach ($payload['diagnosticos'] as $diagnostico) {
                foreach ($diagnostico['procedimentos'] as $procedimento) {
                    $registo->cirurgias()->create([
                        'diagnostico_id' => $diagnostico['diagnostico_id'],
                        'procedimento_id' => $procedimento['procedimento_id'],
                        'funcao' => $procedimento['funcao'],
                        'clavien-dindo' => $procedimento['clavien_dindo'] ?? null,
                        'anatomia_patologica' => $procedimento['anatomia_patologica'] ?? null,
                        'observacoes' => $procedimento['observacoes'] ?? null,
                    ]);
                }
            }
        });

        return redirect()->route('registos-cirurgicos.index')
            ->with('success', 'Registo cirúrgico atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RegistoCirurgico $registo)
    {
        $this->authorize('delete', $registo);

        $registo->delete();

        return redirect()->route('registos-cirurgicos.index')
            ->with('success', 'Registo cirúrgico removido com sucesso.');
    }
}
