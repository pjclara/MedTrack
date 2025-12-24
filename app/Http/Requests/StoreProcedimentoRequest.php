<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProcedimentoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'area' => 'required|string|max:255|exists:areas,nome',
            'descricao' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome do procedimento é obrigatório.',
            'area.required' => 'A área é obrigatória.',
            'area.exists' => 'A área selecionada não existe.',
            'descricao.max' => 'A descrição não pode ter mais de 1000 caracteres.',
        ];
    }
}
