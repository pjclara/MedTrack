<?php

namespace App\Http\Controllers;

use App\Models\Especialidade;
use App\Http\Requests\StoreEspecialidadeRequest;
use App\Http\Requests\UpdateEspecialidadeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class EspecialidadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $especialidades = Especialidade::where('user_id', auth()->id())
            ->orderBy('nome')
            ->paginate(15);
        return Inertia::render('especialidades/index', [
            'especialidades' => $especialidades
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Especialidade::class);
        return Inertia::render('especialidades/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEspecialidadeRequest $request)
    {
        Gate::authorize('create', Especialidade::class);
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        Especialidade::create($validated);

        if ($request->header('X-Inertia-Modal-Redirect-Back')) {
            return redirect()->back()->with('success', 'Especialidade criada com sucesso.');
        }

        return redirect()->route('especialidades.index')
            ->with('success', 'Especialidade criada com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Especialidade $especialidade)
    {
        Gate::authorize('view', $especialidade);
        $especialidade->load('diagnosticos', 'procedimentos');
        return Inertia::render('especialidades/show', [
            'especialidade' => $especialidade
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Especialidade $especialidade)
    {
        Gate::authorize('update', $especialidade);
        return Inertia::render('especialidades/edit', [
            'especialidade' => $especialidade
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEspecialidadeRequest $request, Especialidade $especialidade)
    {
        Gate::authorize('update', $especialidade);
        $validated = $request->validated();

        $especialidade->update($validated);

        return redirect()->route('especialidades.index')
            ->with('success', 'Especialidade atualizada com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Especialidade $especialidade)
    {
        Gate::authorize('delete', $especialidade);
        $especialidade->delete();

        return redirect()->route('especialidades.index')
            ->with('success', 'Especialidade removida com sucesso.');
    }
}
