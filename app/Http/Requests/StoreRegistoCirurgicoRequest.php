<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\TipoAbordagemEnum;
use App\Enums\SexoEnum;
use App\Enums\FuncaoCirurgiaoEnum;
use App\Enums\ClavienDindoEnum;

class StoreRegistoCirurgicoRequest extends FormRequest
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
            'utente.id' => ['nullable', 'exists:utentes,id'],
            'utente.nome' => 'required|string|max:255',
            'utente.processo' => [
                'required',
                'integer',
                Rule::unique('utentes', 'processo')->ignore($this->input('utente.id')),
            ],
            'utente.data_nascimento' => 'required|date',
            'utente.sexo' => ['required', Rule::enum(SexoEnum::class)],

            'registo.data_cirurgia' => 'required|date',
            'registo.tipo_de_cirurgia_id' => 'required|exists:tipo_de_cirurgias,id',
            'registo.tipo_de_origem_id' => 'required|exists:tipo_de_origems,id',
            'registo.ambulatorio' => 'required|boolean',
            'registo.observacoes' => 'nullable|string|max:2000',
            'registo.tipo_de_abordagem' => ['nullable', Rule::enum(TipoAbordagemEnum::class)],

            'diagnosticos' => 'required|array|min:1',
            'diagnosticos.*.diagnostico_id' => 'required|exists:diagnosticos,id',
            'diagnosticos.*.procedimentos' => 'required|array|min:1',
            'diagnosticos.*.procedimentos.*.procedimento_id' => 'required|exists:procedimentos,id',
            'diagnosticos.*.procedimentos.*.funcao' => ['required', Rule::enum(FuncaoCirurgiaoEnum::class)],
            'diagnosticos.*.procedimentos.*.clavien_dindo' => ['nullable', Rule::enum(ClavienDindoEnum::class)],
            'diagnosticos.*.procedimentos.*.anatomia_patologica' => 'nullable|string|max:2000',
            'diagnosticos.*.procedimentos.*.observacoes' => 'nullable|string|max:2000',
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
            'utente.nome.required' => 'O nome do utente é obrigatório.',
            'utente.processo.required' => 'O nº de processo é obrigatório.',
            'utente.processo.unique' => 'Já existe um utente com este nº de processo.',
            'utente.data_nascimento.required' => 'A data de nascimento é obrigatória.',
            'utente.sexo.required' => 'O sexo é obrigatório.',

            'registo.data_cirurgia.required' => 'A data da cirurgia é obrigatória.',
            'registo.tipo_de_cirurgia_id.required' => 'O tipo de cirurgia é obrigatório.',
            'registo.tipo_de_origem_id.required' => 'A origem é obrigatória.',
            'registo.ambulatorio.required' => 'Indique se é ambulatório.',

            'diagnosticos.required' => 'Adicione pelo menos um diagnóstico.',
            'diagnosticos.*.diagnostico_id.required' => 'Selecione o diagnóstico.',
            'diagnosticos.*.procedimentos.required' => 'Cada diagnóstico precisa de pelo menos uma intervenção.',
            'diagnosticos.*.procedimentos.*.procedimento_id.required' => 'Selecione o procedimento.',
            'diagnosticos.*.procedimentos.*.funcao.required' => 'Indique a função na intervenção.',
        ];
    }
}
