<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\SexoEnum;

class StoreUtenteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => 'nullable|string|max:255',
            'idade' => 'required|integer|min:0',
            'sexo' => ['required', Rule::enum(SexoEnum::class)],
            'processo' => 'required|integer|unique:utentes,processo|min:1',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'idade.required' => 'A idade é obrigatória.',
            'idade.integer' => 'A idade deve ser um número inteiro.',
            'idade.min' => 'A idade deve ser um número positivo.',
            'sexo.required' => 'O sexo é obrigatório.',
            'sexo.in' => 'O sexo deve ser Masculino, Feminino ou Outro.',
            'processo.required' => 'O número de processo é obrigatório.',
            'processo.unique' => 'Este número de processo já está em uso.',
        ];
    }
}
