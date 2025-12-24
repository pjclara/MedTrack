<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Diagnostico;

class DiagnosticoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $diagnosticos = [
            // Cirurgia Geral
            ['nome' => 'Apendicite Aguda', 'area' => 'Cirurgia Geral', 'descricao' => 'Inflamação aguda do apêndice'],
            ['nome' => 'Colecistite', 'area' => 'Cirurgia Geral', 'descricao' => 'Inflamação da vesícula biliar'],
            ['nome' => 'Hérnia Inguinal', 'area' => 'Cirurgia Geral', 'descricao' => 'Protrusão de conteúdo abdominal pela região inguinal'],
            ['nome' => 'Hérnia Umbilical', 'area' => 'Cirurgia Geral', 'descricao' => 'Protrusão pela região umbilical'],
            ['nome' => 'Peritonite', 'area' => 'Cirurgia Geral', 'descricao' => 'Inflamação do peritônio'],
            
            // Cirurgia Cardiotorácica
            ['nome' => 'Doença Arterial Coronária', 'area' => 'Cirurgia Cardiotorácica', 'descricao' => 'Obstrução das artérias coronárias'],
            ['nome' => 'Aneurisma da Aorta', 'area' => 'Cirurgia Cardiotorácica', 'descricao' => 'Dilatação anormal da aorta'],
            ['nome' => 'Valvulopatia', 'area' => 'Cirurgia Cardiotorácica', 'descricao' => 'Doença das válvulas cardíacas'],
            
            // Cirurgia Vascular
            ['nome' => 'Varizes', 'area' => 'Cirurgia Vascular', 'descricao' => 'Veias dilatadas e tortuosas'],
            ['nome' => 'Insuficiência Venosa Crónica', 'area' => 'Cirurgia Vascular', 'descricao' => 'Má circulação venosa dos membros'],
            
            // Neurocirurgia
            ['nome' => 'Hérnia Discal', 'area' => 'Neurocirurgia', 'descricao' => 'Protrusão do disco intervertebral'],
            ['nome' => 'Tumor Cerebral', 'area' => 'Neurocirurgia', 'descricao' => 'Neoplasia do sistema nervoso central'],
            
            // Ortopedia
            ['nome' => 'Fratura do Fémur', 'area' => 'Ortopedia', 'descricao' => 'Fratura do osso do fémur'],
            ['nome' => 'Gonartrose', 'area' => 'Ortopedia', 'descricao' => 'Artrose do joelho'],
            ['nome' => 'Coxartrose', 'area' => 'Ortopedia', 'descricao' => 'Artrose da anca'],
            
            // Urologia
            ['nome' => 'Litíase Renal', 'area' => 'Urologia', 'descricao' => 'Cálculos renais'],
            ['nome' => 'Hiperplasia Benigna da Próstata', 'area' => 'Urologia', 'descricao' => 'Aumento benigno do volume prostático'],
            
            // Ginecologia
            ['nome' => 'Mioma Uterino', 'area' => 'Ginecologia', 'descricao' => 'Tumor benigno do útero'],
            ['nome' => 'Endometriose', 'area' => 'Ginecologia', 'descricao' => 'Presença de endométrio fora do útero'],
            
            // Oftalmologia
            ['nome' => 'Catarata', 'area' => 'Oftalmologia', 'descricao' => 'Opacificação do cristalino'],
            
            // Otorrinolaringologia
            ['nome' => 'Amigdalite Crónica', 'area' => 'Otorrinolaringologia', 'descricao' => 'Inflamação crónica das amígdalas'],
        ];

        foreach ($diagnosticos as $diagnostico) {
            Diagnostico::create($diagnostico);
        }
    }
}
