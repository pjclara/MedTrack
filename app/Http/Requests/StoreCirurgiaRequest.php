<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\FuncaoCirurgiaoEnum;
use App\Enums\ClavienDindoEnum;

class StoreCirurgiaRequest extends FormRequest
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
            'registo_cirurgico_id' => 'required|exists:registo_cirurgicos,id',
            'diagnostico_id' => 'required|exists:diagnosticos,id',
            'procedimento_id' => 'required|exists:procedimentos,id',
            'funcao' => ['required', Rule::enum(FuncaoCirurgiaoEnum::class)],
            'clavien-dindo' => ['nullable', Rule::enum(ClavienDindoEnum::class)],
            'observacoes' => 'nullable|string|max:2000',
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
            'registo_cirurgico_id.required' => 'O registo cirúrgico é obrigatório.',
            'registo_cirurgico_id.exists' => 'O registo cirúrgico selecionado não existe.',
            'diagnostico_id.required' => 'O diagnóstico é obrigatório.',
            'diagnostico_id.exists' => 'O diagnóstico selecionado não existe.',
            'procedimento_id.required' => 'O procedimento é obrigatório.',
            'procedimento_id.exists' => 'O procedimento selecionado não existe.',
            'funcao.required' => 'A função é obrigatória.',
            'observacoes.max' => 'As observações não podem ter mais de 2000 caracteres.',
        ];
    }
}
