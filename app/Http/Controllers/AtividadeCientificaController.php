<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAtividadeRequest;
use App\Http\Requests\UpdateAtividadeRequest;
use App\Models\AtividadeCientifica;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AtividadeCientificaController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', AtividadeCientifica::class);

        $atividades = AtividadeCientifica::recentes()
            ->paginate(15);

        return Inertia::render('atividades-cientificas/index', [
            'atividades' => $atividades,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', AtividadeCientifica::class);

        return Inertia::render('atividades-cientificas/create', [
            'tipos' => config('medfolio.tipo_atividade_options'),
            'categorias' => config('medfolio.categoria_atividade_options'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAtividadeRequest $request)
    {
        $this->authorize('create', AtividadeCientifica::class);

        $data = $request->validated();
        $data['user_id'] = auth()->id();

        // Handle file upload
        if ($request->hasFile('ficheiro')) {
            $file = $request->file('ficheiro');
            $data['ficheiro_path'] = $file->store('atividades', 'local');
            $data['ficheiro_original_name'] = $file->getClientOriginalName();
            $data['ficheiro_size'] = $file->getSize();
        }

        AtividadeCientifica::create($data);

        return redirect()
            ->route('atividades-cientificas.index')
            ->with('success', 'Atividade científica criada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(AtividadeCientifica $atividade)
    {
        $this->authorize('view', $atividade);

        return Inertia::render('atividades-cientificas/show', [
            'atividade' => $atividade,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AtividadeCientifica $atividade)
    {
        $this->authorize('update', $atividade);

        return Inertia::render('atividades-cientificas/edit', [
            'atividade' => $atividade,
            'tipos' => config('medfolio.tipo_atividade_options'),
            'categorias' => config('medfolio.categoria_atividade_options'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAtividadeRequest $request, AtividadeCientifica $atividade)
    {
        $this->authorize('update', $atividade);

        $data = $request->validated();

        // Handle file removal
        if ($request->boolean('remover_ficheiro') && $atividade->temFicheiro()) {
            Storage::disk('local')->delete($atividade->ficheiro_path);
            $data['ficheiro_path'] = null;
            $data['ficheiro_original_name'] = null;
            $data['ficheiro_size'] = null;
        }

        // Handle new file upload
        if ($request->hasFile('ficheiro')) {
            // Delete old file if exists
            if ($atividade->temFicheiro()) {
                Storage::disk('local')->delete($atividade->ficheiro_path);
            }

            $file = $request->file('ficheiro');
            $data['ficheiro_path'] = $file->store('atividades', 'local');
            $data['ficheiro_original_name'] = $file->getClientOriginalName();
            $data['ficheiro_size'] = $file->getSize();
        }

        $atividade->update($data);

        return redirect()
            ->route('atividades-cientificas.index')
            ->with('success', 'Atividade científica atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AtividadeCientifica $atividade)
    {
        $this->authorize('delete', $atividade);

        // Delete file if exists
        if ($atividade->temFicheiro()) {
            Storage::disk('local')->delete($atividade->ficheiro_path);
        }

        $atividade->delete();

        return redirect()
            ->route('atividades-cientificas.index')
            ->with('success', 'Atividade científica eliminada com sucesso!');
    }

    /**
     * Download the attached file.
     */
    public function download(AtividadeCientifica $atividade)
    {
        $this->authorize('view', $atividade);

        if (!$atividade->temFicheiro()) {
            abort(404, 'Ficheiro não encontrado.');
        }

        return Storage::disk('local')->download(
            $atividade->ficheiro_path,
            $atividade->ficheiro_original_name
        );
    }
}
