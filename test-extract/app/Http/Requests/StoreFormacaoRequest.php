<?php

namespace App\Http\Requests;

use App\Enums\TipoFormacaoEnum;
use App\Enums\TipoParticipacaoEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFormacaoRequest extends FormRequest
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
            'titulo' => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
            'tipo' => ['required', Rule::enum(TipoFormacaoEnum::class)],
            'data_inicio' => ['required', 'date'],
            'data_fim' => ['nullable', 'date', 'after_or_equal:data_inicio'],
            'duracao_horas' => ['nullable', 'integer', 'min:1', 'max:1000'],
            'entidade_organizadora' => ['nullable', 'string', 'max:255'],
            'localizacao' => ['nullable', 'string', 'max:255'],
            'categoria' => ['nullable', 'in:' . implode(',', config('medfolio.categoria_formacao_options'))],
            'tipo_participacao' => ['nullable', Rule::enum(TipoParticipacaoEnum::class)],
            'tema_apresentacao' => ['nullable', 'string', 'max:500'],
            'creditos' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'observacoes' => ['nullable', 'string'],
            'certificado' => ['nullable', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png', 'max:10240'],
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
            'titulo.required' => 'O título é obrigatório.',
            'titulo.max' => 'O título não pode ter mais de 255 caracteres.',
            'tipo.required' => 'O tipo de formação é obrigatório.',
            'tipo.enum' => 'O tipo de formação selecionado é inválido.',
            'data_inicio.required' => 'A data de início é obrigatória.',
            'data_inicio.date' => 'A data de início deve ser uma data válida.',
            'data_fim.date' => 'A data de fim deve ser uma data válida.',
            'data_fim.after_or_equal' => 'A data de fim deve ser posterior ou igual à data de início.',
            'duracao_horas.integer' => 'A duração deve ser um número inteiro.',
            'duracao_horas.min' => 'A duração deve ser pelo menos 1 hora.',
            'duracao_horas.max' => 'A duração não pode exceder 1000 horas.',
            'categoria.in' => 'A categoria selecionada é inválida.',
            'tipo_participacao.enum' => 'O tipo de participação selecionado é inválido.',
            'creditos.numeric' => 'Os créditos devem ser um valor numérico.',
            'creditos.min' => 'Os créditos devem ser no mínimo 0.',
            'creditos.max' => 'Os créditos não podem exceder 100.',
            'certificado.file' => 'O certificado deve ser um ficheiro válido.',
            'certificado.mimes' => 'O certificado deve ser um ficheiro do tipo: pdf, doc, docx, jpg, jpeg, png.',
            'certificado.max' => 'O certificado não pode ter mais de 10MB.',
        ];
    }
}
