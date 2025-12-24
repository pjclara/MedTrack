<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAreaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255|unique:areas',
            'descricao' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome da área é obrigatório.',
            'nome.unique' => 'Esta área já existe.',
            'descricao.max' => 'A descrição não pode ter mais de 500 caracteres.',
        ];
    }
}
