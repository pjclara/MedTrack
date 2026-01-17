<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RegistoCirurgico;
use App\Services\AdminLogService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;

class CurriculumController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->query('user_id');
        $search = $request->query('search');
        $type = $request->query('type');

        $query = RegistoCirurgico::with(['user', 'utente']);

        if ($userId) {
            $query->where('user_id', $userId);
        }

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->whereHas('user', function($qu) use ($search) {
                    $qu->where('name', 'like', "%{$search}%");
                })->orWhere('id', 'like', "%{$search}%");
            });
        }

        // In a real scenario, we would merge collections from AtividadeCientifica and Formacao
        // But for this MVP, we focus on surgeries which is the core
        
        $records = $query->latest()->paginate(15)->withQueryString();

        // Transform collection to match frontend expectations
        $items = $records->getCollection()->map(function($record) {
            return [
                'id' => $record->id,
                'type' => 'cirurgia',
                'title' => "Registo Cirúrgico #" . $record->id,
                'date' => $record->data_cirurgia,
                'user_name' => $record->user->name,
                'details' => $record->utente ? "Utente: " . $record->utente->nome : "Sem utente associado",
            ];
        });

        // Replace the collection in the paginator
        $records->setCollection($items);

        return Inertia::render('admin/curriculos/index', [
            'items' => $records,
            'filters' => $request->only(['search', 'type', 'user_id'])
        ]);
    }

    public function show(RegistoCirurgico $registoCirurgico)
    {
        $registoCirurgico->load(['user', 'utente', 'tipoDeCirurgia', 'cirurgias.diagnostico', 'cirurgias.procedimento', 'hospital', 'especialidade']);
        
        return Inertia::render('admin/curriculos/show', [
            'record' => $registoCirurgico
        ]);
    }

    public function edit(RegistoCirurgico $registoCirurgico)
    {
        $registoCirurgico->load(['user', 'utente']);
        return Inertia::render('admin/curriculos/edit', [
            'record' => $registoCirurgico
        ]);
    }

    public function exportJson(RegistoCirurgico $registoCirurgico)
    {
        $data = $registoCirurgico->load(['utente', 'tipoDeCirurgia', 'cirurgias.diagnostico', 'cirurgias.procedimento'])->toArray();
        
        AdminLogService::log('Export Curriculum JSON', RegistoCirurgico::class, $registoCirurgico->id);

        $filename = "curriculo_" . $registoCirurgico->id . ".json";
        
        return response()->json($data)
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
    }

    public function exportPdf(RegistoCirurgico $registoCirurgico)
    {
        AdminLogService::log('Export Curriculum PDF', RegistoCirurgico::class, $registoCirurgico->id);

        // Note: For real PDF generation, use Barryvdh\DomPDF\Facade\Pdf
        // return Pdf::loadView('pdf.curriculo', compact('registoCirurgico'))->download('curriculo.pdf');
        
        return back()->with('error', 'Funcionalidade PDF requer biblioteca laravel-dompdf.');
    }
}
