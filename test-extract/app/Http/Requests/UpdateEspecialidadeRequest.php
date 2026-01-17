<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEspecialidadeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $especialidade = $this->route('especialidade');
        $especialidadeId = is_numeric($especialidade) ? $especialidade : $especialidade->id;
        
        return [
            'nome' => [
                'required',
                'string',
                'max:255',
                \Illuminate\Validation\Rule::unique('especialidades')->where(function ($query) {
                    return $query->where('user_id', auth()->id());
                })->ignore($especialidadeId),
            ],
            'descricao' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome da especialidade é obrigatório.',
            'nome.unique' => 'Esta especialidade já existe.',
            'descricao.max' => 'A descrição não pode ter mais de 500 caracteres.',
        ];
    }
}
