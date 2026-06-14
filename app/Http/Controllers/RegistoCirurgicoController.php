<?php

namespace App\Http\Controllers;

use App\Models\RegistoCirurgico;
use App\Models\Utente;
use App\Models\TipoDeCirurgia;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use App\Models\Especialidade;
use App\Models\Hospital;
use App\Models\ZonaAnatomica;
use App\Models\TipoDeAbordagem;
use App\Models\FuncaoCirurgiao;
use App\Http\Requests\StoreRegistoCirurgicoRequest;
use App\Http\Requests\UpdateRegistoCirurgicoRequest;
use Illuminate\Support\Facades\DB;
use App\Enums\TipoDiagnosticoEnum;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;
use App\Exports\RegistosCirurgicosExport;
use Maatwebsite\Excel\Facades\Excel;

class RegistoCirurgicoController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(\Illuminate\Http\Request $request)
    {
        $this->authorize('viewAny', RegistoCirurgico::class);

        $filters = $request->only(['search', 'data_inicio', 'data_fim', 'diagnostico_id', 'procedimento_id', 'funcao_cirurgiao_id']);

        $tiposDeCirurgia = TipoDeCirurgia::orderBy('nome')->get(['id', 'nome']);

        if ($request->has('tipo_de_cirurgia_ids')) {
            // Filtro explicitamente enviado pelo utilizador (pode ser array vazio = mostrar todos)
            $filters['tipo_de_cirurgia_ids'] = $request->input('tipo_de_cirurgia_ids', []);
        } else {
            // Por defeito: todos os tipos exceto "Pequena Cirurgia"
            $filters['tipo_de_cirurgia_ids'] = $tiposDeCirurgia
                ->pluck('id')
                ->map(fn($id) => (string) $id)
                ->values()
                ->toArray();
        }

        $query = RegistoCirurgico::with([
            'utente:id,nome,processo',
            'tipoDeCirurgia:id,nome',
            'tipoDeAbordagem:id,nome',
            'hospital:id,nome,user_id',
            'especialidade:id,nome,user_id',
            'user:id,name,email',
            'cirurgias',
            'cirurgias.procedimento:id,nome',
            'cirurgias.funcaoCirurgiao:id,nome',
            'cirurgias.diagnostico:id,nome',
        ])
            ->withCount('cirurgias')
            ->orderBy('data_cirurgia', 'desc');

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->whereHas('utente', function ($q2) use ($search) {
                    $q2->where('nome', 'like', "%{$search}%")
                        ->orWhere('processo', 'like', "%{$search}%");
                })
                    ->orWhereHas('hospital', function ($q2) use ($search) {
                        $q2->where('nome', 'like', "%{$search}%");
                    })
                    ->orWhereHas('especialidade', function ($q2) use ($search) {
                        $q2->where('nome', 'like', "%{$search}%");
                    });
            });
        }

        if (!empty($filters['data_inicio'])) {
            $query->whereDate('data_cirurgia', '>=', $filters['data_inicio']);
        }

        if (!empty($filters['data_fim'])) {
            $query->whereDate('data_cirurgia', '<=', $filters['data_fim']);
        }

        if (!empty($filters['tipo_de_cirurgia_ids'])) {
            $query->whereIn('tipo_de_cirurgia_id', $filters['tipo_de_cirurgia_ids']);
        }

        if (!empty($filters['diagnostico_id'])) {
            $query->whereHas('cirurgias', function ($q) use ($filters) {
                $q->where('diagnostico_id', $filters['diagnostico_id']);
            });
        }

        if (!empty($filters['procedimento_id'])) {
            $query->whereHas('cirurgias', function ($q) use ($filters) {
                $q->where('procedimento_id', $filters['procedimento_id']);
            });
        }

        if (!empty($filters['funcao_cirurgiao_id'])) {
            $query->whereHas('cirurgias', function ($q) use ($filters) {
                $q->where('funcao_cirurgiao_id', $filters['funcao_cirurgiao_id']);
            });
        }

        $registos = $query->paginate(15)->withQueryString();

        return Inertia::render('registos-cirurgicos/index', [
            'registos'           => $registos,
            'filters'            => $filters,
            'diagnosticos'       => \App\Models\Diagnostico::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'procedimentos'      => \App\Models\Procedimento::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'tipos_cirurgia'     => TipoDeCirurgia::orderBy('nome')->get(['id', 'nome']),
            'funcoes_cirurgiao'  => FuncaoCirurgiao::orderBy('nome')->get(['id', 'nome']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(\Illuminate\Http\Request $request)
    {
        $this->authorize('create', RegistoCirurgico::class);

        $duplicateData = null;
        if ($request->has('duplicate_from')) {
            $original = RegistoCirurgico::findOrFail($request->duplicate_from);
            $this->authorize('view', $original);
            $duplicateData = $this->transformForWizard($original);

            // Clear utente and date for duplication
            $duplicateData['utente'] = [
                'nome' => '',
                'processo' => '',
                'idade' => '',
                'sexo' => '',
            ];
            $duplicateData['registo']['data_cirurgia'] = '';
        }

        return Inertia::render('registos-cirurgicos/create', [
            'duplicateData' => $duplicateData,
            'tiposDeCirurgia' => TipoDeCirurgia::orderBy('nome')->get(['id', 'nome']),
            'tiposDeAbordagem' => TipoDeAbordagem::orderBy('nome')->get(['id', 'nome']),
            'diagnosticos' => Diagnostico::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'procedimentos' => Procedimento::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'especialidades' => Especialidade::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'hospitals' => Hospital::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'zonaAnatomicas' => ZonaAnatomica::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'enums' => [
                'sexo' => config('medfolio.sexo_options'),
                'funcoes' => FuncaoCirurgiao::orderBy('nome')->get(['id', 'nome']),
                'clavien' => config('medfolio.clavien_dindo_options'),
                'tipo_diagnostico' => TipoDiagnosticoEnum::values(),
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
                'idade' => $utenteData['idade'],
                'sexo' => $utenteData['sexo'],
            ];

            if (!empty($utenteData['id'])) {
                $utente = Utente::where('id', $utenteData['id'])
                    ->where('user_id', auth()->id())
                    ->firstOrFail();
                $utente->update($utenteAttributes);
            } else {
                $utenteAttributes['user_id'] = auth()->id();
                $utente = Utente::create($utenteAttributes);
            }

            $registoData = $payload['registo'];

            $registo = $utente->registosCirurgicos()->create([
                'user_id' => auth()->id(),
                'hospital_id' => $registoData['hospital'] ?? null,
                'especialidade_id' => $registoData['especialidade'] ?? null,
                'data_cirurgia' => $registoData['data_cirurgia'],
                'tipo_de_cirurgia_id' => $registoData['tipo_de_cirurgia_id'],
                'ambulatorio' => $registoData['ambulatorio'],
                'observacoes' => $registoData['observacoes'] ?? null,
                'tipo_de_abordagem_id' => $registoData['tipo_de_abordagem_id'] ?? null,
            ]);

            foreach ($payload['diagnosticos'] as $diagnostico) {
                foreach ($diagnostico['procedimentos'] as $procedimento) {
                    $registo->cirurgias()->create([
                        'diagnostico_id' => $diagnostico['diagnostico_id'],
                        'tipo' => $diagnostico['tipo'] ?? null,
                        'procedimento_id' => $procedimento['procedimento_id'],
                        'funcao_cirurgiao_id' => $procedimento['funcao'],
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
            'tipoDeAbordagem',
            'hospital',
            'especialidade',
            'cirurgias.diagnostico',
            'cirurgias.procedimento',
            'cirurgias.funcaoCirurgiao',
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

        return Inertia::render('registos-cirurgicos/edit', [
            'registo' => array_merge(
                ['id' => $registo->id],
                $this->transformForWizard($registo)
            ),
            'tiposDeCirurgia' => TipoDeCirurgia::orderBy('nome')->get(['id', 'nome']),
            'tiposDeAbordagem' => TipoDeAbordagem::orderBy('nome')->get(['id', 'nome']),
            'diagnosticos' => Diagnostico::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'procedimentos' => Procedimento::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'especialidades' => Especialidade::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'hospitals' => Hospital::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'zonaAnatomicas' => ZonaAnatomica::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'enums' => [
                'sexo' => config('medfolio.sexo_options'),
                'funcoes' => FuncaoCirurgiao::orderBy('nome')->get(['id', 'nome']),
                'clavien' => config('medfolio.clavien_dindo_options'),
                'tipo_diagnostico' => TipoDiagnosticoEnum::values(),
            ],
        ]);
    }

    /**
     * Helper to transform a record into wizard format for frontend.
     */
    private function transformForWizard(RegistoCirurgico $registo)
    {
        $registo->load([
            'utente',
            'tipoDeCirurgia',
            'tipoDeAbordagem',
            'hospital',
            'especialidade',
            'cirurgias.diagnostico',
            'cirurgias.procedimento',
            'cirurgias.funcaoCirurgiao',
        ]);

        $diagnosticosMap = [];
        foreach ($registo->cirurgias as $cirurgia) {
            $diagId = $cirurgia->diagnostico_id;
            if (!isset($diagnosticosMap[$diagId])) {
                $diagnosticosMap[$diagId] = [
                    'diagnostico_id' => (string) $diagId,
                    'tipo' => $cirurgia->tipo ?? '',
                    'procedimentos' => []
                ];
            }
            $diagnosticosMap[$diagId]['procedimentos'][] = [
                'procedimento_id' => (string) $cirurgia->procedimento_id,
                'funcao' => (string) $cirurgia->funcao_cirurgiao_id,
                'clavien_dindo' => $cirurgia->{'clavien-dindo'} ?? '',
                'anatomia_patologica' => $cirurgia->anatomia_patologica ?? '',
                'observacoes' => $cirurgia->observacoes ?? '',
            ];
        }

        return [
            'utente' => [
                'id' => (string) $registo->utente->id,
                'nome' => $registo->utente->nome,
                'processo' => $registo->utente->processo,
                'idade' => $registo->utente->idade,
                'sexo' => $registo->utente->sexo,
            ],
            'registo' => [
                'hospital' => (string) ($registo->hospital_id ?? ''),
                'especialidade' => (string) ($registo->especialidade_id ?? ''),
                'data_cirurgia' => $registo->data_cirurgia?->format('Y-m-d'),
                'tipo_de_cirurgia_id' => (string) $registo->tipo_de_cirurgia_id,
                'ambulatorio' => $registo->ambulatorio,
                'tipo_de_abordagem_id' => (string) ($registo->tipo_de_abordagem_id ?? ''),
                'observacoes' => $registo->observacoes ?? '',
            ],
            'diagnosticos' => array_values($diagnosticosMap),
        ];
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
            $utente = $registo->utente;
            if ($utente) {
                $utenteAttributes = [
                    'nome' => $utenteData['nome'],
                    'processo' => $utenteData['processo'],
                    'idade' => $utenteData['idade'],
                    'sexo' => $utenteData['sexo'],
                ];
                $utente->update($utenteAttributes);
            }

            // Update registo
            $registoData = $payload['registo'];
            $registo->update([
                'hospital_id' => $registoData['hospital'] ?? null,
                'especialidade_id' => $registoData['especialidade'] ?? null,
                'data_cirurgia' => $registoData['data_cirurgia'],
                'tipo_de_cirurgia_id' => $registoData['tipo_de_cirurgia_id'],
                'ambulatorio' => $registoData['ambulatorio'],
                'observacoes' => $registoData['observacoes'] ?? null,
                'tipo_de_abordagem_id' => $registoData['tipo_de_abordagem_id'] ?? null,
            ]);

            // Delete old cirurgias
            $registo->cirurgias()->delete();

            // Create new cirurgias
            foreach ($payload['diagnosticos'] as $diagnostico) {
                foreach ($diagnostico['procedimentos'] as $procedimento) {
                    $registo->cirurgias()->create([
                        'diagnostico_id' => $diagnostico['diagnostico_id'],
                        'tipo' => $diagnostico['tipo'] ?? null,
                        'procedimento_id' => $procedimento['procedimento_id'],
                        'funcao_cirurgiao_id' => $procedimento['funcao'],
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

    /**
     * Export records to Excel.
     */
    public function export()
    {
        $this->authorize('viewAny', RegistoCirurgico::class);

        return Excel::download(new RegistosCirurgicosExport(auth()->id()), 'registos-cirurgicos-' . now()->format('Y-m-d') . '.xlsx');
    }



    /**
     * criar uma pagina com uma tabela com os registos cirurgicos
     * 
     */

    public function cirurgiasPorArea()
    {
        $this->authorize('viewAny', RegistoCirurgico::class);

        $registos = RegistoCirurgico::with([
            'cirurgias',
            'cirurgias.diagnostico.zonaAnatomica:id,nome',
            'cirurgias.diagnostico:id,nome,tipo,zona_anatomica',
            'cirurgias.procedimento:id,nome',
            'cirurgias.funcaoCirurgiao:id,nome',
            'tipoDeCirurgia:id,nome',
        ])
            ->orderBy('data_cirurgia', 'desc')
            ->get();

        // remover pequena cirurgia
        $registos = $registos->filter(fn($r) => $r->tipoDeCirurgia?->nome !== 'Pequena Cirurgia');

        $resultado = [];

        foreach ($registos as $reg) {

            foreach ($reg->cirurgias as $c) {

                // ZONA ANATÓMICA (via nome)
                $zona = $c->diagnostico->zonaAnatomica->nome
                    ?? $c->diagnostico->zona_anatomica
                    ?? 'Sem área definida';

                // TIPO DA PATOLOGIA (Benigno / Maligno)
                $tipoPatologia = $c->diagnostico->tipo ?? 'Benigno';

                // PATOLOGIA
                $patologia = $c->diagnostico->nome ?? 'Sem diagnóstico';

                // PROCEDIMENTO
                $procedimento = $c->procedimento->nome ?? 'Sem procedimento';

                // TIPO DE CIRURGIA (Electivo / Urgente)
                $tipoCir = strtolower($reg->tipoDeCirurgia->nome) === 'cirurgia de urgência'
                    ? 'Urgente'
                    : 'Electivo';

                // FUNÇÃO (Cir / Ajud)
                $nomeFuncao = strtolower($c->funcaoCirurgiao->nome);

                if ($nomeFuncao === 'principal') {
                    $funcao = 'cir';
                    $isFormativa = false;
                } else {
                    $funcao = 'ajud';
                    $isFormativa = str_contains($nomeFuncao, 'formativa');
                }


                // Inicializar zona
                if (!isset($resultado[$zona])) {
                    $resultado[$zona] = [];
                }

                // Inicializar tipo benigno/maligno
                if (!isset($resultado[$zona][$tipoPatologia])) {
                    $resultado[$zona][$tipoPatologia] = [];
                }

                // Chave única patologia + procedimento
                $key = $patologia . '|' . $procedimento;

                if (!isset($resultado[$zona][$tipoPatologia][$key])) {
                    $resultado[$zona][$tipoPatologia][$key] = [
                        'patologia' => $patologia,
                        'procedimento' => $procedimento,
                        'electivo_cir' => 0,
                        'electivo_ajud' => 0,
                        'urgente_cir' => 0,
                        'urgente_ajud' => 0,
                        'formativa_electivo' => 0,
                        'formativa_urgente' => 0,
                    ];
                }

                // Incrementar contagem
                if ($tipoCir === 'Electivo') {
                    $resultado[$zona][$tipoPatologia][$key]["electivo_{$funcao}"]++;

                    if ($isFormativa) {
                        $resultado[$zona][$tipoPatologia][$key]["formativa_electivo"]++;
                    }
                } else {
                    $resultado[$zona][$tipoPatologia][$key]["urgente_{$funcao}"]++;

                    if ($isFormativa) {
                        $resultado[$zona][$tipoPatologia][$key]["formativa_urgente"]++;
                    }
                }
            }
        }

        return Inertia::render('registos-cirurgicos/cirurgiasPorArea', [
            'areas' => $resultado
        ]);
    }
}
