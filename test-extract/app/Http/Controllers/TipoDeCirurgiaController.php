<?php

namespace App\Http\Controllers;

use App\Models\TipoDeCirurgia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TipoDeCirurgiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipos = TipoDeCirurgia::orderBy('nome')->paginate(15);
        return Inertia::render('tipos-de-cirurgia/index', [
            'tipos' => $tipos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('tipos-de-cirurgia/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        TipoDeCirurgia::create($validated);

        return redirect()->route('tipos-de-cirurgia.index')
            ->with('success', 'Tipo de cirurgia criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(TipoDeCirurgia $tipoDeCirurgia)
    {
        return Inertia::render('tipos-de-cirurgia/show', [
            'tipo' => $tipoDeCirurgia
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TipoDeCirurgia $tipoDeCirurgia)
    {
        return Inertia::render('tipos-de-cirurgia/edit', [
            'tipo' => $tipoDeCirurgia
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoDeCirurgia $tipoDeCirurgia)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        $tipoDeCirurgia->update($validated);

        return redirect()->route('tipos-de-cirurgia.index')
            ->with('success', 'Tipo de cirurgia atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoDeCirurgia $tipoDeCirurgia)
    {
        $tipoDeCirurgia->delete();

        return redirect()->route('tipos-de-cirurgia.index')
            ->with('success', 'Tipo de cirurgia removido com sucesso.');
    }
}
