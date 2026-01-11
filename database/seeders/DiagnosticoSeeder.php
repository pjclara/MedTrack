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
            ['nome' => 'Apendicite Aguda', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Inflamação aguda do apêndice'],
            ['nome' => 'Colecistite', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Inflamação da vesícula biliar'],
            ['nome' => 'Hérnia Inguinal', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Protrusão de conteúdo abdominal pela região inguinal'],
            ['nome' => 'Hérnia Umbilical', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Protrusão pela região umbilical'],
            ['nome' => 'Peritonite', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Inflamação do peritônio'],
            
            // Cirurgia Cardiotorácica
            ['nome' => 'Doença Arterial Coronária', 'especialidade' => 'Cirurgia Cardiotorácica', 'descricao' => 'Obstrução das artérias coronárias'],
            ['nome' => 'Aneurisma da Aorta', 'especialidade' => 'Cirurgia Cardiotorácica', 'descricao' => 'Dilatação anormal da aorta'],
            ['nome' => 'Valvulopatia', 'especialidade' => 'Cirurgia Cardiotorácica', 'descricao' => 'Doença das válvulas cardíacas'],
            
            // Cirurgia Vascular
            ['nome' => 'Varizes', 'especialidade' => 'Cirurgia Vascular', 'descricao' => 'Veias dilatadas e tortuosas'],
            ['nome' => 'Insuficiência Venosa Crónica', 'especialidade' => 'Cirurgia Vascular', 'descricao' => 'Má circulação venosa dos membros'],
            
            // Neurocirurgia
            ['nome' => 'Hérnia Discal', 'especialidade' => 'Neurocirurgia', 'descricao' => 'Protrusão do disco intervertebral'],
            ['nome' => 'Tumor Cerebral', 'especialidade' => 'Neurocirurgia', 'descricao' => 'Neoplasia do sistema nervoso central'],
            
            // Ortopedia
            ['nome' => 'Fratura do Fémur', 'especialidade' => 'Ortopedia', 'descricao' => 'Fratura do osso do fémur'],
            ['nome' => 'Gonartrose', 'especialidade' => 'Ortopedia', 'descricao' => 'Artrose do joelho'],
            ['nome' => 'Coxartrose', 'especialidade' => 'Ortopedia', 'descricao' => 'Artrose da anca'],
            
            // Urologia
            ['nome' => 'Litíase Renal', 'especialidade' => 'Urologia', 'descricao' => 'Cálculos renais'],
            ['nome' => 'Hiperplasia Benigna da Próstata', 'especialidade' => 'Urologia', 'descricao' => 'Aumento benigno do volume prostático'],
            
            // Ginecologia
            ['nome' => 'Mioma Uterino', 'especialidade' => 'Ginecologia', 'descricao' => 'Tumor benigno do útero'],
            ['nome' => 'Endometriose', 'especialidade' => 'Ginecologia', 'descricao' => 'Presença de endométrio fora do útero'],
            
            // Oftalmologia
            ['nome' => 'Catarata', 'especialidade' => 'Oftalmologia', 'descricao' => 'Opacificação do cristalino'],
            
            // Otorrinolaringologia
            ['nome' => 'Amigdalite Crónica', 'especialidade' => 'Otorrinolaringologia', 'descricao' => 'Inflamação crónica das amígdalas'],
        ];

        foreach ($diagnosticos as $diagnostico) {
            Diagnostico::create($diagnostico);
        }
    }
}
