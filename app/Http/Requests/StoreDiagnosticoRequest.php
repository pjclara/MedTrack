<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDiagnosticoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'especialidade' => 'required|string|max:255|exists:especialidades,nome',
            'tipo' => 'nullable|string|max:255',
            'descricao' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome do diagnóstico é obrigatório.',
            'especialidade.required' => 'A especialidade é obrigatória.',
            'especialidade.exists' => 'A especialidade selecionada não existe.',
            'descricao.max' => 'A descrição não pode ter mais de 1000 caracteres.',
        ];
    }
}
