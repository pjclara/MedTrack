<?php

namespace App\Http\Controllers;

use App\Models\Procedimento;
use App\Models\Area;
use App\Http\Requests\StoreProcedimentoRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProcedimentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $procedimentos = Procedimento::with('areaRelation:id,nome')
            ->withCount('cirurgias')
            ->orderBy('nome')
            ->paginate(15);
        return Inertia::render('Procedimentos/Index', [
            'procedimentos' => $procedimentos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $areas = Area::orderBy('nome')->get();
        return Inertia::render('Procedimentos/Create', [
            'areas' => $areas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProcedimentoRequest $request)
    {
        $validated = $request->validated();

        Procedimento::create($validated);

        return redirect()->route('procedimentos.index')
            ->with('success', 'Procedimento criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Procedimento $procedimento)
    {
        $procedimento->load('areaRelation', 'cirurgias');
        return Inertia::render('Procedimentos/Show', [
            'procedimento' => $procedimento
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Procedimento $procedimento)
    {
        $areas = Area::orderBy('nome')->get();
        return Inertia::render('Procedimentos/Edit', [
            'procedimento' => $procedimento,
            'areas' => $areas
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreProcedimentoRequest $request, Procedimento $procedimento)
    {
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
        $procedimento->delete();

        return redirect()->route('procedimentos.index')
            ->with('success', 'Procedimento removido com sucesso.');
    }
}
