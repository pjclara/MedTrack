<?php

namespace App\Http\Requests;

use App\Models\ZonaAnatomica;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreDiagnosticoRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        if ($this->filled('zona_anatomica_id')) {
            return;
        }

        $zonaAnatomica = $this->input('zona_anatomica');

        if (blank($zonaAnatomica)) {
            return;
        }

        if (is_numeric($zonaAnatomica)) {
            $this->merge([
                'zona_anatomica_id' => (int) $zonaAnatomica,
            ]);

            return;
        }

        $userId = Auth::id();

        if (!$userId) {
            return;
        }

        $zonaAnatomicaId = ZonaAnatomica::query()
            ->firstOrCreate(
                [
                    'user_id' => $userId,
                    'nome' => $zonaAnatomica,
                ],
            )
            ->id;

        if ($zonaAnatomicaId) {
            $this->merge([
                'zona_anatomica_id' => $zonaAnatomicaId,
            ]);
        }
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'zona_anatomica_id' => 'required|integer|exists:zona_anatomicas,id',
            'tipo' => 'nullable|string|max:255',
            'descricao' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome do diagnóstico é obrigatório.',
            'zona_anatomica_id.required' => 'A zona anatómica é obrigatória.',
            'zona_anatomica_id.exists' => 'A zona anatómica selecionada é inválida.',
            'descricao.max' => 'A descrição não pode ter mais de 1000 caracteres.',
        ];
    }
}
