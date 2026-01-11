<?php

namespace App\Http\Controllers;

use App\Models\Diagnostico;
use App\Models\ZonaAnatomica;
use App\Enums\TipoDiagnosticoEnum;
use App\Http\Requests\StoreDiagnosticoRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class DiagnosticoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $diagnosticos = Diagnostico::where('user_id', auth()->id())
            ->withCount('cirurgias')
            ->orderBy('nome')
            ->paginate(15);
        return Inertia::render('diagnosticos/index', [
            'diagnosticos' => $diagnosticos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Diagnostico::class);
        return Inertia::render('diagnosticos/create', [
            'tipos' => TipoDiagnosticoEnum::values(),
            'zonaAnatomicas' => ZonaAnatomica::where('user_id', auth()->id())->orderBy('nome')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDiagnosticoRequest $request)
    {
        Gate::authorize('create', Diagnostico::class);
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        Diagnostico::create($validated);

        if ($request->header('X-Inertia-Modal-Redirect-Back')) {
            return redirect()->back()->with('success', 'Diagnóstico criado com sucesso.');
        }

        return redirect()->route('diagnosticos.index')
            ->with('success', 'Diagnóstico criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Diagnostico $diagnostico)
    {
        Gate::authorize('view', $diagnostico);
        $diagnostico->load('cirurgias');
        return Inertia::render('diagnosticos/show', [
            'diagnostico' => $diagnostico
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Diagnostico $diagnostico)
    {
        Gate::authorize('update', $diagnostico);
        return Inertia::render('diagnosticos/edit', [
            'diagnostico' => $diagnostico,
            'tipos' => TipoDiagnosticoEnum::values(),
            'zonaAnatomicas' => ZonaAnatomica::where('user_id', auth()->id())->orderBy('nome')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreDiagnosticoRequest $request, Diagnostico $diagnostico)
    {
        Gate::authorize('update', $diagnostico);
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
        Gate::authorize('delete', $diagnostico);
        $diagnostico->delete();

        return redirect()->route('diagnosticos.index')
            ->with('success', 'Diagnóstico removido com sucesso.');
    }
}
