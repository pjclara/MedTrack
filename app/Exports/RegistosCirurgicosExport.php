<?php

namespace App\Exports;

use App\Models\RegistoCirurgico;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class RegistosCirurgicosExport implements FromQuery, WithHeadings, WithMapping
{
    use Exportable;

    protected $userId;

    public function __construct(int $userId)
    {
        $this->userId = $userId;
    }

    public function query()
    {
        return RegistoCirurgico::query()
            ->where('user_id', $this->userId)
            ->with(['utente', 'tipoDeCirurgia', 'tipoDeAbordagem', 'cirurgias.diagnostico', 'cirurgias.procedimento'])
            ->orderBy('data_cirurgia', 'desc');
    }

    public function headings(): array
    {
        return [
            'Data',
            'Utente',
            'Processo',
            'Hospital',
            'Especialidade',
            'Tipo de Cirurgia',
            'Tipo de Abordagem',
            'Ambulatório',
            'Cirurgias (Diagnósticos / Procedimentos)',
            'Complicações (Clavien-Dindo)',
            'Observações'
        ];
    }

    public function map($registo): array
    {
        $cirurgiasStr = $registo->cirurgias->map(function ($c) {
            $diag = $c->diagnostico ? $c->diagnostico->nome : 'N/A';
            $proc = $c->procedimento ? $c->procedimento->nome : 'N/A';
            return "[$diag / $proc]";
        })->implode(", ");

        $complicacoesStr = $registo->cirurgias->map(function ($c) {
            return $c->{'clavien-dindo'} ? (is_object($c->{'clavien-dindo'}) ? $c->{'clavien-dindo'}->value : $c->{'clavien-dindo'}) : null;
        })->filter()->unique()->implode(", ");

        return [
            $registo->data_cirurgia->format('d/m/Y'),
            $registo->utente->nome,
            $registo->utente->processo,
            $registo->hospital,
            $registo->especialidade,
            $registo->tipoDeCirurgia->nome,
            $registo->tipoDeAbordagem->nome ?? 'N/A',
            $registo->ambulatorio ? 'Sim' : 'Não',
            $cirurgiasStr,
            $complicacoesStr ?: 'Nenhuma',
            $registo->observacoes
        ];
    }
}
