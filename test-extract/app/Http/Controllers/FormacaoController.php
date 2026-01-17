<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFormacaoRequest;
use App\Http\Requests\UpdateFormacaoRequest;
use App\Models\Formacao;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Exports\FormacoesExport;
use Maatwebsite\Excel\Facades\Excel;

class FormacaoController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Formacao::class);

        $query = Formacao::recentes();

        // Filtro por tipo
        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        // Filtro por ano
        if ($request->filled('ano')) {
            $query->whereYear('data_inicio', $request->ano);
        }

        // Filtro por categoria
        if ($request->filled('categoria')) {
            $query->where('categoria', $request->categoria);
        }

        $formacoes = $query->paginate(15)->withQueryString();

        return Inertia::render('formacoes/index', [
            'formacoes' => $formacoes,
            'filters' => $request->only(['tipo', 'ano', 'categoria']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Formacao::class);

        return Inertia::render('formacoes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFormacaoRequest $request)
    {
        $this->authorize('create', Formacao::class);

        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        // Handle file upload
        if ($request->hasFile('certificado')) {
            $file = $request->file('certificado');
            $data['certificado_path'] = $file->store('formacoes', 'local');
            $data['certificado_original_name'] = $file->getClientOriginalName();
            $data['certificado_size'] = $file->getSize();
        }

        $formacao = Formacao::create($data);

        return redirect()
            ->route('formacoes.show', $formacao)
            ->with('success', 'Formação criada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Formacao $formacao)
    {
        $this->authorize('view', $formacao);

        $formacao->load('user');

        return Inertia::render('formacoes/show', [
            'formacao' => $formacao,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Formacao $formacao)
    {
        $this->authorize('update', $formacao);

        return Inertia::render('formacoes/edit', [
            'formacao' => $formacao,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFormacaoRequest $request, Formacao $formacao)
    {
        $this->authorize('update', $formacao);

        $data = $request->validated();

        // Handle certificate removal
        if ($request->boolean('remover_certificado') && $formacao->temCertificado()) {
            Storage::disk('local')->delete($formacao->certificado_path);
            $data['certificado_path'] = null;
            $data['certificado_original_name'] = null;
            $data['certificado_size'] = null;
        }

        // Handle new certificate upload
        if ($request->hasFile('certificado')) {
            // Delete old certificate if exists
            if ($formacao->temCertificado()) {
                Storage::disk('local')->delete($formacao->certificado_path);
            }

            $file = $request->file('certificado');
            $data['certificado_path'] = $file->store('formacoes', 'local');
            $data['certificado_original_name'] = $file->getClientOriginalName();
            $data['certificado_size'] = $file->getSize();
        }

        $formacao->update($data);

        return redirect()
            ->route('formacoes.show', $formacao)
            ->with('success', 'Formação atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Formacao $formacao)
    {
        $this->authorize('delete', $formacao);

        // Delete certificate file if exists
        if ($formacao->temCertificado()) {
            Storage::disk('local')->delete($formacao->certificado_path);
        }

        $formacao->delete();

        return redirect()
            ->route('formacoes.index')
            ->with('success', 'Formação eliminada com sucesso!');
    }

    /**
     * Download the certificate file.
     */
    public function download(Formacao $formacao)
    {
        $this->authorize('view', $formacao);

        if (!$formacao->temCertificado()) {
            abort(404, 'Certificado não encontrado.');
        }

        return Storage::disk('local')->download(
            $formacao->certificado_path,
            $formacao->certificado_original_name
        );
    }

    /**
     * Export records to Excel.
     */
    public function export()
    {
        $this->authorize('viewAny', Formacao::class);

        return Excel::download(new FormacoesExport(auth()->id()), 'formacoes-' . now()->format('Y-m-d') . '.xlsx');
    }
}
