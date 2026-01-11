<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Procedimento;

class ProcedimentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $procedimentos = [
            // Cirurgia Geral
            ['nome' => 'Apendicectomia', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Remoção cirúrgica do apêndice'],
            ['nome' => 'Colecistectomia', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Remoção da vesícula biliar'],
            ['nome' => 'Herniorrafia Inguinal', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Correção de hérnia inguinal'],
            ['nome' => 'Laparotomia Exploradora', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Abertura cirúrgica do abdómen para exploração'],
            ['nome' => 'Gastrectomia', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Remoção total ou parcial do estômago'],
            
            // Cirurgia Cardiotorácica
            ['nome' => 'Bypass Coronário', 'especialidade' => 'Cirurgia Cardiotorácica', 'descricao' => 'Revascularização do miocárdio'],
            ['nome' => 'Substituição Valvular', 'especialidade' => 'Cirurgia Cardiotorácica', 'descricao' => 'Troca de válvula cardíaca'],
            ['nome' => 'Correção de Aneurisma', 'especialidade' => 'Cirurgia Cardiotorácica', 'descricao' => 'Correção cirúrgica de aneurisma'],
            
            // Cirurgia Vascular
            ['nome' => 'Safenectomia', 'especialidade' => 'Cirurgia Vascular', 'descricao' => 'Remoção da veia safena'],
            ['nome' => 'Escleroterapia', 'especialidade' => 'Cirurgia Vascular', 'descricao' => 'Tratamento de varizes por injeção'],
            ['nome' => 'Angioplastia', 'especialidade' => 'Cirurgia Vascular', 'descricao' => 'Desobstrução de artérias'],
            
            // Neurocirurgia
            ['nome' => 'Discectomia', 'especialidade' => 'Neurocirurgia', 'descricao' => 'Remoção de disco intervertebral'],
            ['nome' => 'Laminectomia', 'especialidade' => 'Neurocirurgia', 'descricao' => 'Remoção de lâmina vertebral'],
            ['nome' => 'Craniotomia', 'especialidade' => 'Neurocirurgia', 'descricao' => 'Abertura do crânio'],
            
            // Ortopedia
            ['nome' => 'Osteossíntese', 'especialidade' => 'Ortopedia', 'descricao' => 'Fixação cirúrgica de fratura'],
            ['nome' => 'Artroplastia do Joelho', 'especialidade' => 'Ortopedia', 'descricao' => 'Prótese total do joelho'],
            ['nome' => 'Artroplastia da Anca', 'especialidade' => 'Ortopedia', 'descricao' => 'Prótese total da anca'],
            ['nome' => 'Artroscopia', 'especialidade' => 'Ortopedia', 'descricao' => 'Visualização endoscópica de articulação'],
            
            // Urologia
            ['nome' => 'Nefrolitotomia', 'especialidade' => 'Urologia', 'descricao' => 'Remoção de cálculo renal'],
            ['nome' => 'Prostatectomia', 'especialidade' => 'Urologia', 'descricao' => 'Remoção da próstata'],
            ['nome' => 'Cistoscopia', 'especialidade' => 'Urologia', 'descricao' => 'Endoscopia da bexiga'],
            ['nome' => 'RTU Prostática', 'especialidade' => 'Urologia', 'descricao' => 'Ressecção transuretral da próstata'],
            
            // Ginecologia
            ['nome' => 'Histerectomia', 'especialidade' => 'Ginecologia', 'descricao' => 'Remoção do útero'],
            ['nome' => 'Miomectomia', 'especialidade' => 'Ginecologia', 'descricao' => 'Remoção de miomas uterinos'],
            ['nome' => 'Laparoscopia Ginecológica', 'especialidade' => 'Ginecologia', 'descricao' => 'Cirurgia ginecológica por via laparoscópica'],
            
            // Oftalmologia
            ['nome' => 'Facoemulsificação', 'especialidade' => 'Oftalmologia', 'descricao' => 'Cirurgia de catarata'],
            ['nome' => 'Vitrectomia', 'especialidade' => 'Oftalmologia', 'descricao' => 'Remoção do vítreo ocular'],
            
            // Otorrinolaringologia
            ['nome' => 'Amigdalectomia', 'especialidade' => 'Otorrinolaringologia', 'descricao' => 'Remoção das amígdalas'],
            ['nome' => 'Septoplastia', 'especialidade' => 'Otorrinolaringologia', 'descricao' => 'Correção do septo nasal'],
            
            // Cirurgia Plástica
            ['nome' => 'Abdominoplastia', 'especialidade' => 'Cirurgia Plástica', 'descricao' => 'Cirurgia estética do abdómen'],
            ['nome' => 'Mamoplastia', 'especialidade' => 'Cirurgia Plástica', 'descricao' => 'Cirurgia da mama'],
        ];

        foreach ($procedimentos as $procedimento) {
            Procedimento::create($procedimento);
        }
    }
}
