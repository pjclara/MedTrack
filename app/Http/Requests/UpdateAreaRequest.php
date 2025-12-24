<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAreaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $areaId = $this->route('area')->id;
        
        return [
            'nome' => 'required|string|max:255|unique:areas,nome,' . $areaId,
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
