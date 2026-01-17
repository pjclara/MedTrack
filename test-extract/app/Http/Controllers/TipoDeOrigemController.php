<?php

namespace App\Http\Controllers;

use App\Models\TipoDeOrigem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TipoDeOrigemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipos = TipoDeOrigem::orderBy('nome')->paginate(15);
        return Inertia::render('tipos-de-origem/index', [
            'tipos' => $tipos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('tipos-de-origem/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255|unique:tipo_de_origems',
        ]);

        TipoDeOrigem::create($validated);

        return redirect()->route('tipos-de-origem.index')
            ->with('success', 'Tipo de origem criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(TipoDeOrigem $tipoDeOrigem)
    {
        return Inertia::render('tipos-de-origem/show', [
            'tipo' => $tipoDeOrigem
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TipoDeOrigem $tipoDeOrigem)
    {
        return Inertia::render('tipos-de-origem/edit', [
            'tipo' => $tipoDeOrigem
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoDeOrigem $tipoDeOrigem)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255|unique:tipo_de_origems,nome,' . $tipoDeOrigem->id,
        ]);

        $tipoDeOrigem->update($validated);

        return redirect()->route('tipos-de-origem.index')
            ->with('success', 'Tipo de origem atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoDeOrigem $tipoDeOrigem)
    {
        $tipoDeOrigem->delete();

        return redirect()->route('tipos-de-origem.index')
            ->with('success', 'Tipo de origem removido com sucesso.');
    }
}
