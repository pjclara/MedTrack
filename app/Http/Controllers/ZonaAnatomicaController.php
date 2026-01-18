<?php

namespace App\Http\Controllers;

use App\Models\ZonaAnatomica;
use App\Http\Requests\StoreZonaAnatomicaRequest;
use App\Http\Requests\UpdateZonaAnatomicaRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ZonaAnatomicaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $zonaAnatomicas = ZonaAnatomica::orderBy('nome')
            ->paginate(15);
        return Inertia::render('zona-anatomicas/index', [
            'zonaAnatomicas' => $zonaAnatomicas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', ZonaAnatomica::class);
        return Inertia::render('zona-anatomicas/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreZonaAnatomicaRequest $request)
    {
        Gate::authorize('create', ZonaAnatomica::class);
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        $zonaAnatomica = ZonaAnatomica::create($validated);

        if ($request->header('X-Inertia-Modal-Redirect-Back')) {
            return redirect()->back()->with([
                'success' => 'Zona anatómica criada com sucesso.',
                'new_zona_anatomica_id' => $zonaAnatomica->id
            ]);
        }

        return redirect()->route('zona-anatomicas.index')
            ->with('success', 'Zona anatómica criada com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ZonaAnatomica $zonaAnatomica)
    {
        Gate::authorize('view', $zonaAnatomica);
        return Inertia::render('zona-anatomicas/show', [
            'zonaAnatomica' => $zonaAnatomica
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ZonaAnatomica $zonaAnatomica)
    {
        Gate::authorize('update', $zonaAnatomica);
        return Inertia::render('zona-anatomicas/edit', [
            'zonaAnatomica' => $zonaAnatomica
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateZonaAnatomicaRequest $request, ZonaAnatomica $zonaAnatomica)
    {
        Gate::authorize('update', $zonaAnatomica);
        $validated = $request->validated();

        $zonaAnatomica->update($validated);

        return redirect()->route('zona-anatomicas.index')
            ->with('success', 'Zona anatómica atualizada com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ZonaAnatomica $zonaAnatomica)
    {
        Gate::authorize('delete', $zonaAnatomica);
        $zonaAnatomica->delete();

        return redirect()->route('zona-anatomicas.index')
            ->with('success', 'Zona anatómica removida com sucesso.');
    }
}
