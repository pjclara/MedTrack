<?php

namespace App\Http\Controllers;

use App\Models\Diagnostico;
use App\Models\Area;
use App\Http\Requests\StoreDiagnosticoRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiagnosticoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $diagnosticos = Diagnostico::with('areaRelation:id,nome')
            ->withCount('cirurgias')
            ->orderBy('nome')
            ->paginate(15);
        return Inertia::render('Diagnosticos/Index', [
            'diagnosticos' => $diagnosticos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $areas = Area::orderBy('nome')->get();
        return Inertia::render('Diagnosticos/Create', [
            'areas' => $areas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDiagnosticoRequest $request)
    {
        $validated = $request->validated();

        Diagnostico::create($validated);

        return redirect()->route('diagnosticos.index')
            ->with('success', 'Diagnóstico criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Diagnostico $diagnostico)
    {
        $diagnostico->load('areaRelation', 'cirurgias');
        return Inertia::render('Diagnosticos/Show', [
            'diagnostico' => $diagnostico
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Diagnostico $diagnostico)
    {
        $areas = Area::orderBy('nome')->get();
        return Inertia::render('Diagnosticos/Edit', [
            'diagnostico' => $diagnostico,
            'areas' => $areas
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreDiagnosticoRequest $request, Diagnostico $diagnostico)
    {
        $validated = $request->validated();

        $diagnostico->update($validated);

        return redirect()->route('diagnosticos.index')
            ->with('success', 'Diagnóstico atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Diagnostico $diagnostico)
    {
        $diagnostico->delete();

        return redirect()->route('diagnosticos.index')
            ->with('success', 'Diagnóstico removido com sucesso.');
    }
}
