<?php

namespace App\Http\Controllers;

use App\Models\TipoDeAbordagem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TipoDeAbordagemController extends Controller
{
    private function ensureAdmin(): void
    {
        abort_unless(auth()->user()?->hasRole('admin'), 403);
    }

    public function index()
    {
        $tipos = TipoDeAbordagem::orderBy('nome')->paginate(15);
        return Inertia::render('tipos-de-abordagem/index', [
            'tipos' => $tipos,
            'canManage' => auth()->user()?->hasRole('admin') ?? false,
        ]);
    }

    public function create()
    {
        $this->ensureAdmin();

        return Inertia::render('tipos-de-abordagem/create');
    }

    public function store(Request $request)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        $validated['user_id'] = auth()->id();

        $tipo = TipoDeAbordagem::create($validated);

        // Check if request wants JSON (for QuickAdd)
        if ($request->wantsJson() || $request->header('X-Requested-With') === 'XMLHttpRequest') {
            return response()->json($tipo);
        }

        return redirect()->route('tipos-de-abordagem.index')
            ->with('success', 'Tipo de abordagem criado com sucesso.');
    }

    public function show(TipoDeAbordagem $tiposDeAbordagem)
    {
        $tiposDeAbordagem->loadCount('registosCirurgicos');
        return Inertia::render('tipos-de-abordagem/show', [
            'tipo' => $tiposDeAbordagem
        ]);
    }

    public function edit(TipoDeAbordagem $tiposDeAbordagem)
    {
        $this->ensureAdmin();

        return Inertia::render('tipos-de-abordagem/edit', [
            'tipo' => $tiposDeAbordagem
        ]);
    }

    public function update(Request $request, TipoDeAbordagem $tiposDeAbordagem)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        $tiposDeAbordagem->update($validated);

        return redirect()->route('tipos-de-abordagem.index')
            ->with('success', 'Tipo de abordagem atualizado com sucesso.');
    }

    public function destroy(TipoDeAbordagem $tiposDeAbordagem)
    {
        $this->ensureAdmin();

        $tiposDeAbordagem->delete();

        return redirect()->route('tipos-de-abordagem.index')
            ->with('success', 'Tipo de abordagem removido com sucesso.');
    }
}
