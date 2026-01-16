<?php

namespace App\Exports;

use App\Models\Formacao;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class FormacoesExport implements FromQuery, WithHeadings, WithMapping
{
    use Exportable;

    protected $userId;

    public function __construct(int $userId)
    {
        $this->userId = $userId;
    }

    public function query()
    {
        return Formacao::query()
            ->where('user_id', $this->userId)
            ->orderBy('data_inicio', 'desc');
    }

    public function headings(): array
    {
        return [
            'Título',
            'Tipo',
            'Data Início',
            'Data Fim',
            'Duração (Horas)',
            'Entidade Organizadora',
            'Localização',
            'Categoria',
            'Participação',
            'Tema Apresentação',
            'Créditos',
            'Observações'
        ];
    }

    public function map($formacao): array
    {
        return [
            $formacao->titulo,
            $formacao->tipo->value ?? $formacao->tipo,
            $formacao->data_inicio->format('d/m/Y'),
            $formacao->data_fim ? $formacao->data_fim->format('d/m/Y') : '',
            $formacao->duracao_horas,
            $formacao->entidade_organizadora,
            $formacao->localizacao,
            $formacao->categoria,
            $formacao->tipo_participacao->value ?? $formacao->tipo_participacao,
            $formacao->tema_apresentacao,
            $formacao->creditos,
            $formacao->observacoes
        ];
    }
}
