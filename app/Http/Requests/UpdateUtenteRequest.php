<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\SexoEnum;

class UpdateUtenteRequest extends FormRequest
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
        $utenteId = $this->route('utente')->id;
        
        return [
            'nome' => 'nullable|string|max:255',
            'data_nascimento' => 'required|date|before:today',
            'sexo' => ['required', Rule::enum(SexoEnum::class)],
            'processo' => 'required|integer|unique:utentes,processo,' . $utenteId . '|min:1',
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
            'data_nascimento.required' => 'A data de nascimento é obrigatória.',
            'data_nascimento.before' => 'A data de nascimento deve ser anterior a hoje.',
            'sexo.required' => 'O sexo é obrigatório.',
            'sexo.in' => 'O sexo deve ser Masculino, Feminino ou Outro.',
            'processo.required' => 'O número de processo é obrigatório.',
            'processo.unique' => 'Este número de processo já está em uso.',
        ];
    }
}
