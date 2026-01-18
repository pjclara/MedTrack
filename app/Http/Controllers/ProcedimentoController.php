<?php

namespace App\Http\Controllers;

use App\Models\Procedimento;
use App\Models\Especialidade;
use App\Http\Requests\StoreProcedimentoRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ProcedimentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $procedimentos = Procedimento::withCount('cirurgias')
            ->orderBy('nome')
            ->paginate(15);
        return Inertia::render('procedimentos/index', [
            'procedimentos' => $procedimentos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Procedimento::class);
        $especialidades = Especialidade::orderBy('nome')->get();
        return Inertia::render('procedimentos/create', [
            'especialidades' => $especialidades
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProcedimentoRequest $request)
    {
        Gate::authorize('create', Procedimento::class);
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        $procedimento = Procedimento::create($validated);

        if ($request->header('X-Inertia-Modal-Redirect-Back')) {
            return redirect()->back()->with([
                'success' => 'Procedimento criado com sucesso.',
                'new_procedimento_id' => $procedimento->id
            ]);
        }

        return redirect()->route('procedimentos.index')
            ->with('success', 'Procedimento criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Procedimento $procedimento)
    {
        Gate::authorize('view', $procedimento);
        $procedimento->load('especialidadeRelation', 'cirurgias');
        return Inertia::render('procedimentos/show', [
            'procedimento' => $procedimento
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Procedimento $procedimento)
    {
        Gate::authorize('update', $procedimento);
        $especialidades = Especialidade::where('user_id', auth()->id())->orderBy('nome')->get();
        return Inertia::render('procedimentos/edit', [
            'procedimento' => $procedimento,
            'especialidades' => $especialidades
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreProcedimentoRequest $request, Procedimento $procedimento)
    {
        Gate::authorize('update', $procedimento);
        $validated = $request->validated();

        $procedimento->update($validated);

        return redirect()->route('procedimentos.index')
            ->with('success', 'Procedimento atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Procedimento $procedimento)
    {
        Gate::authorize('delete', $procedimento);
        $procedimento->delete();

        return redirect()->route('procedimentos.index')
            ->with('success', 'Procedimento removido com sucesso.');
    }
}
