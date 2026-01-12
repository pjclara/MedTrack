<?php

namespace App\Http\Controllers;

use App\Models\Utente;
use App\Http\Requests\StoreUtenteRequest;
use App\Http\Requests\UpdateUtenteRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class UtenteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $utentes = Utente::withCount('registosCirurgicos')
            ->orderBy('nome')
            ->paginate(15);
        return Inertia::render('utentes/index', [
            'utentes' => $utentes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Utente::class);
        return Inertia::render('utentes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUtenteRequest $request)
    {
        Gate::authorize('create', Utente::class);
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        Utente::create($validated);

        return redirect()->route('utentes.index')
            ->with('success', 'Utente criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Utente $utente)
    {
        Gate::authorize('view', $utente);
        $utente->load([
            'registosCirurgicos' => function ($query) {
                $query->where('user_id', auth()->id())
                    ->with(['tipoDeCirurgia', 'cirurgias'])
                    ->orderBy('data_cirurgia', 'desc');
            }
        ]);
        return Inertia::render('utentes/show', [
            'utente' => $utente->toArray() + [
                'data_nascimento' => $utente->data_nascimento?->format('Y-m-d'),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Utente $utente)
    {
        Gate::authorize('update', $utente);
        return Inertia::render('utentes/edit', [
            'utente' => $utente->toArray() + [
                'data_nascimento' => $utente->data_nascimento?->format('Y-m-d'),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUtenteRequest $request, Utente $utente)
    {
        Gate::authorize('update', $utente);
        $validated = $request->validated();

        $utente->update($validated);

        return redirect()->route('utentes.index')
            ->with('success', 'Utente atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Utente $utente)
    {
        Gate::authorize('delete', $utente);
        $utente->delete();

        return redirect()->route('utentes.index')
            ->with('success', 'Utente removido com sucesso.');
    }

    /**
     * Procura um utente pelo nº de processo e devolve resposta JSON
     */
    public function findByProcesso(Request $request, string $processo)
    {
        $utente = Utente::where('processo', $processo)
            ->where('user_id', auth()->id())
            ->first();

        if (!$utente) {
            return response()->json(['utente' => null]);
        }

        return response()->json([
            'utente' => [
                'id' => (string) $utente->id,
                'nome' => $utente->nome,
                'processo' => (string) $utente->processo,
                'data_nascimento' => $utente->data_nascimento?->format('Y-m-d'),
                'sexo' => $utente->sexo?->value ?? $utente->sexo,
            ],
        ]);
    }
}
