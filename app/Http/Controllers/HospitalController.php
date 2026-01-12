<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use App\Http\Requests\StoreHospitalRequest;
use App\Http\Requests\UpdateHospitalRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HospitalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hospitals = Hospital::orderBy('nome')
            ->paginate(15);

        return Inertia::render('hospitals/index', [
            'hospitals' => $hospitals
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('hospitals/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHospitalRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        Hospital::create($validated);

        return redirect()->route('hospitals.index')
            ->with('success', 'Hospital criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Hospital $hospital)
    {
        if ($hospital->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('hospitals/show', [
            'hospital' => $hospital
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hospital $hospital)
    {
        if ($hospital->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('hospitals/edit', [
            'hospital' => $hospital
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHospitalRequest $request, Hospital $hospital)
    {
        if ($hospital->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validated();
        $hospital->update($validated);

        return redirect()->route('hospitals.index')
            ->with('success', 'Hospital atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hospital $hospital)
    {
        if ($hospital->user_id !== auth()->id()) {
            abort(403);
        }

        $hospital->delete();

        return redirect()->route('hospitals.index')
            ->with('success', 'Hospital removido com sucesso.');
    }
}
