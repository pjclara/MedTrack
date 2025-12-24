<?php

namespace App\Http\Controllers;

use App\Models\Cirurgia;
use App\Models\RegistoCirurgico;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use App\Http\Requests\StoreCirurgiaRequest;
use App\Http\Requests\UpdateCirurgiaRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CirurgiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cirurgias = Cirurgia::with([
                'registoCirurgico:id,utente_id,data_cirurgia',
                'registoCirurgico.utente:id,nome,processo',
                'diagnostico:id,nome',
                'procedimento:id,nome'
            ])
            ->orderBy('created_at', 'desc')
            ->paginate(15);
        return Inertia::render('cirurgias/index', [
            'cirurgias' => $cirurgias
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $registosCirurgicos = RegistoCirurgico::with('utente')->get();
        $diagnosticos = Diagnostico::orderBy('nome')->get();
        $procedimentos = Procedimento::orderBy('nome')->get();
        
        return Inertia::render('cirurgias/create', [
            'registosCirurgicos' => $registosCirurgicos,
            'diagnosticos' => $diagnosticos,
            'procedimentos' => $procedimentos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCirurgiaRequest $request)
    {
        $validated = $request->validated();

        Cirurgia::create($validated);

        return redirect()->route('cirurgias.index')
            ->with('success', 'Cirurgia criada com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Cirurgia $cirurgia)
    {
        $cirurgia->load([
            'registoCirurgico.utente',
            'registoCirurgico.tipoDeCirurgia',
            'diagnostico.areaRelation',
            'procedimento.areaRelation'
        ]);
        return Inertia::render('Cirurgias/Show', [
            'cirurgia' => $cirurgia
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cirurgia $cirurgia)
    {
        $registosCirurgicos = RegistoCirurgico::with('utente')->get();
        $diagnosticos = Diagnostico::orderBy('nome')->get();
        $procedimentos = Procedimento::orderBy('nome')->get();
        
        return Inertia::render('Cirurgias/Edit', [
            'cirurgia' => $cirurgia,
            'registosCirurgicos' => $registosCirurgicos,
            'diagnosticos' => $diagnosticos,
            'procedimentos' => $procedimentos
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCirurgiaRequest $request, Cirurgia $cirurgia)
    {
        $validated = $request->validated();

        $cirurgia->update($validated);

        return redirect()->route('cirurgias.index')
            ->with('success', 'Cirurgia atualizada com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cirurgia $cirurgia)
    {
        $cirurgia->delete();

        return redirect()->route('cirurgias.index')
            ->with('success', 'Cirurgia removida com sucesso.');
    }
}
