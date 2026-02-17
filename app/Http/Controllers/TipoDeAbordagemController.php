<?php

namespace App\Http\Controllers;

use App\Models\TipoDeAbordagem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TipoDeAbordagemController extends Controller
{
    public function index()
    {
        $tipos = TipoDeAbordagem::orderBy('nome')->paginate(15);
        return Inertia::render('tipos-de-abordagem/index', [
            'tipos' => $tipos
        ]);
    }

    public function create()
    {
        return Inertia::render('tipos-de-abordagem/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        $tipo = TipoDeAbordagem::create($validated);

        // Check if request wants JSON (for QuickAdd)
        if ($request->wantsJson() || $request->header('X-Requested-With') === 'XMLHttpRequest') {
            return response()->json($tipo);
        }

        return redirect()->route('tipos-de-abordagem.index')
            ->with('success', 'Tipo de abordagem criado com sucesso.');
    }

    public function show(TipoDeAbordagem $tipoDeAbordagem)
    {
        $tipoDeAbordagem->loadCount('registosCirurgicos');
        return Inertia::render('tipos-de-abordagem/show', [
            'tipo' => $tipoDeAbordagem
        ]);
    }

    public function edit(TipoDeAbordagem $tipoDeAbordagem)
    {
        return Inertia::render('tipos-de-abordagem/edit', [
            'tipo' => $tipoDeAbordagem
        ]);
    }

    public function update(Request $request, TipoDeAbordagem $tipoDeAbordagem)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        $tipoDeAbordagem->update($validated);

        return redirect()->route('tipos-de-abordagem.index')
            ->with('success', 'Tipo de abordagem atualizado com sucesso.');
    }

    public function destroy(TipoDeAbordagem $tipoDeAbordagem)
    {
        $tipoDeAbordagem->delete();

        return redirect()->route('tipos-de-abordagem.index')
            ->with('success', 'Tipo de abordagem removido com sucesso.');
    }
}
