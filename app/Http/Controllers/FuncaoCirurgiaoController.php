<?php

namespace App\Http\Controllers;

use App\Models\FuncaoCirurgiao;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FuncaoCirurgiaoController extends Controller
{
    public function index()
    {
        $funcoes = FuncaoCirurgiao::orderBy('nome')->paginate(15);
        return Inertia::render('funcoes-cirurgiao/index', [
            'funcoes' => $funcoes,
        ]);
    }

    public function create()
    {
        return Inertia::render('funcoes-cirurgiao/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255|unique:funcao_cirurgiaos,nome',
        ]);

        $funcao = FuncaoCirurgiao::create($validated);

        if ($request->wantsJson() || $request->header('X-Requested-With') === 'XMLHttpRequest') {
            return response()->json($funcao);
        }

        return redirect()->route('funcoes-cirurgiao.index')
            ->with('success', 'Função criada com sucesso.');
    }

    public function show(FuncaoCirurgiao $funcoesCirurgiao)
    {
        $funcoesCirurgiao->loadCount('cirurgias');
        return Inertia::render('funcoes-cirurgiao/show', [
            'funcao' => $funcoesCirurgiao,
        ]);
    }

    public function edit(FuncaoCirurgiao $funcoesCirurgiao)
    {
        return Inertia::render('funcoes-cirurgiao/edit', [
            'funcao' => $funcoesCirurgiao,
        ]);
    }

    public function update(Request $request, FuncaoCirurgiao $funcoesCirurgiao)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255|unique:funcao_cirurgiaos,nome,' . $funcoesCirurgiao->id,
        ]);

        $funcoesCirurgiao->update($validated);

        return redirect()->route('funcoes-cirurgiao.index')
            ->with('success', 'Função atualizada com sucesso.');
    }

    public function destroy(FuncaoCirurgiao $funcoesCirurgiao)
    {
        $funcoesCirurgiao->delete();

        return redirect()->route('funcoes-cirurgiao.index')
            ->with('success', 'Função removida com sucesso.');
    }
}
