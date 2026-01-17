<?php

namespace App\Http\Controllers;

use App\Models\RegistoCirurgico;
use App\Models\Utente;
use App\Models\TipoDeCirurgia;
use App\Models\TipoDeOrigem;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use App\Models\Especialidade;
use App\Models\Hospital;
use App\Models\ZonaAnatomica;
use App\Http\Requests\StoreRegistoCirurgicoRequest;
use App\Http\Requests\UpdateRegistoCirurgicoRequest;
use Illuminate\Support\Facades\DB;
use App\Enums\TipoAbordagemEnum;
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
    public function index()
    {
        $this->authorize('viewAny', RegistoCirurgico::class);

        $registos = RegistoCirurgico::with([
                'utente:id,nome,processo',
                'tipoDeCirurgia:id,nome',
                'tipoDeOrigem:id,nome',
                'user:id,name,email',
                'cirurgias:id,registo_cirurgico_id,funcao,procedimento_id',
                'cirurgias.procedimento:id,nome',
            ])
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
                'data_nascimento' => '',
                'sexo' => '',
            ];
            $duplicateData['registo']['data_cirurgia'] = '';
        }

        return Inertia::render('registos-cirurgicos/create', [
            'duplicateData' => $duplicateData,
            'tiposDeCirurgia' => TipoDeCirurgia::orderBy('nome')->get(['id', 'nome']),
            'tiposDeOrigem' => TipoDeOrigem::orderBy('nome')->get(['id', 'nome']),
            'diagnosticos' => Diagnostico::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'procedimentos' => Procedimento::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'especialidades' => Especialidade::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'hospitals' => Hospital::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'zonaAnatomicas' => ZonaAnatomica::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'enums' => [
                'sexo' => config('medfolio.sexo_options'),
                'funcoes' => config('medfolio.funcao_options'),
                'clavien' => config('medfolio.clavien_dindo_options'),
                'tipo_de_abordagem' => TipoAbordagemEnum::values(),
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
                'data_nascimento' => $utenteData['data_nascimento'],
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
                'hospital' => $registoData['hospital'] ?? null,
                'especialidade' => $registoData['especialidade'] ?? null,
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
                        'tipo' => $diagnostico['tipo'] ?? null,
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

        return Inertia::render('registos-cirurgicos/edit', [
            'registo' => array_merge(
                ['id' => $registo->id],
                $this->transformForWizard($registo)
            ),
            'tiposDeCirurgia' => TipoDeCirurgia::orderBy('nome')->get(['id', 'nome']),
            'tiposDeOrigem' => TipoDeOrigem::orderBy('nome')->get(['id', 'nome']),
            'diagnosticos' => Diagnostico::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'procedimentos' => Procedimento::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'especialidades' => Especialidade::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'hospitals' => Hospital::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'zonaAnatomicas' => ZonaAnatomica::where('user_id', auth()->id())->orderBy('nome')->get(['id', 'nome']),
            'enums' => [
                'sexo' => config('medfolio.sexo_options'),
                'funcoes' => config('medfolio.funcao_options'),
                'clavien' => config('medfolio.clavien_dindo_options'),
                'tipo_de_abordagem' => TipoAbordagemEnum::values(),
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
            'tipoDeOrigem',
            'cirurgias.diagnostico',
            'cirurgias.procedimento'
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
                'funcao' => $cirurgia->funcao,
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
                'data_nascimento' => $registo->utente->data_nascimento,
                'sexo' => $registo->utente->sexo,
            ],
            'registo' => [
                'hospital' => $registo->hospital,
                'especialidade' => $registo->especialidade,
                'data_cirurgia' => $registo->data_cirurgia?->format('Y-m-d'),
                'tipo_de_cirurgia_id' => (string) $registo->tipo_de_cirurgia_id,
                'tipo_de_origem_id' => (string) ($registo->tipo_de_origem_id ?? ''),
                'ambulatorio' => $registo->ambulatorio,
                'tipo_de_abordagem' => $registo->tipo_de_abordagem?->value ?? '',
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
                    'data_nascimento' => $utenteData['data_nascimento'],
                    'sexo' => $utenteData['sexo'],
                ];
                $utente->update($utenteAttributes);
            }

            // Update registo
            $registoData = $payload['registo'];
            $registo->update([
                'hospital' => $registoData['hospital'] ?? null,
                'especialidade' => $registoData['especialidade'] ?? null,
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
                        'tipo' => $diagnostico['tipo'] ?? null,
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

    /**
     * Export records to Excel.
     */
    public function export()
    {
        $this->authorize('viewAny', RegistoCirurgico::class);

        return Excel::download(new RegistosCirurgicosExport(auth()->id()), 'registos-cirurgicos-' . now()->format('Y-m-d') . '.xlsx');
    }
}
