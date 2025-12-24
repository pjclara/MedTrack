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
            ['nome' => 'Apendicectomia', 'area' => 'Cirurgia Geral', 'descricao' => 'Remoção cirúrgica do apêndice'],
            ['nome' => 'Colecistectomia', 'area' => 'Cirurgia Geral', 'descricao' => 'Remoção da vesícula biliar'],
            ['nome' => 'Herniorrafia Inguinal', 'area' => 'Cirurgia Geral', 'descricao' => 'Correção de hérnia inguinal'],
            ['nome' => 'Laparotomia Exploradora', 'area' => 'Cirurgia Geral', 'descricao' => 'Abertura cirúrgica do abdómen para exploração'],
            ['nome' => 'Gastrectomia', 'area' => 'Cirurgia Geral', 'descricao' => 'Remoção total ou parcial do estômago'],
            
            // Cirurgia Cardiotorácica
            ['nome' => 'Bypass Coronário', 'area' => 'Cirurgia Cardiotorácica', 'descricao' => 'Revascularização do miocárdio'],
            ['nome' => 'Substituição Valvular', 'area' => 'Cirurgia Cardiotorácica', 'descricao' => 'Troca de válvula cardíaca'],
            ['nome' => 'Correção de Aneurisma', 'area' => 'Cirurgia Cardiotorácica', 'descricao' => 'Correção cirúrgica de aneurisma'],
            
            // Cirurgia Vascular
            ['nome' => 'Safenectomia', 'area' => 'Cirurgia Vascular', 'descricao' => 'Remoção da veia safena'],
            ['nome' => 'Escleroterapia', 'area' => 'Cirurgia Vascular', 'descricao' => 'Tratamento de varizes por injeção'],
            ['nome' => 'Angioplastia', 'area' => 'Cirurgia Vascular', 'descricao' => 'Desobstrução de artérias'],
            
            // Neurocirurgia
            ['nome' => 'Discectomia', 'area' => 'Neurocirurgia', 'descricao' => 'Remoção de disco intervertebral'],
            ['nome' => 'Laminectomia', 'area' => 'Neurocirurgia', 'descricao' => 'Remoção de lâmina vertebral'],
            ['nome' => 'Craniotomia', 'area' => 'Neurocirurgia', 'descricao' => 'Abertura do crânio'],
            
            // Ortopedia
            ['nome' => 'Osteossíntese', 'area' => 'Ortopedia', 'descricao' => 'Fixação cirúrgica de fratura'],
            ['nome' => 'Artroplastia do Joelho', 'area' => 'Ortopedia', 'descricao' => 'Prótese total do joelho'],
            ['nome' => 'Artroplastia da Anca', 'area' => 'Ortopedia', 'descricao' => 'Prótese total da anca'],
            ['nome' => 'Artroscopia', 'area' => 'Ortopedia', 'descricao' => 'Visualização endoscópica de articulação'],
            
            // Urologia
            ['nome' => 'Nefrolitotomia', 'area' => 'Urologia', 'descricao' => 'Remoção de cálculo renal'],
            ['nome' => 'Prostatectomia', 'area' => 'Urologia', 'descricao' => 'Remoção da próstata'],
            ['nome' => 'Cistoscopia', 'area' => 'Urologia', 'descricao' => 'Endoscopia da bexiga'],
            ['nome' => 'RTU Prostática', 'area' => 'Urologia', 'descricao' => 'Ressecção transuretral da próstata'],
            
            // Ginecologia
            ['nome' => 'Histerectomia', 'area' => 'Ginecologia', 'descricao' => 'Remoção do útero'],
            ['nome' => 'Miomectomia', 'area' => 'Ginecologia', 'descricao' => 'Remoção de miomas uterinos'],
            ['nome' => 'Laparoscopia Ginecológica', 'area' => 'Ginecologia', 'descricao' => 'Cirurgia ginecológica por via laparoscópica'],
            
            // Oftalmologia
            ['nome' => 'Facoemulsificação', 'area' => 'Oftalmologia', 'descricao' => 'Cirurgia de catarata'],
            ['nome' => 'Vitrectomia', 'area' => 'Oftalmologia', 'descricao' => 'Remoção do vítreo ocular'],
            
            // Otorrinolaringologia
            ['nome' => 'Amigdalectomia', 'area' => 'Otorrinolaringologia', 'descricao' => 'Remoção das amígdalas'],
            ['nome' => 'Septoplastia', 'area' => 'Otorrinolaringologia', 'descricao' => 'Correção do septo nasal'],
            
            // Cirurgia Plástica
            ['nome' => 'Abdominoplastia', 'area' => 'Cirurgia Plástica', 'descricao' => 'Cirurgia estética do abdómen'],
            ['nome' => 'Mamoplastia', 'area' => 'Cirurgia Plástica', 'descricao' => 'Cirurgia da mama'],
        ];

        foreach ($procedimentos as $procedimento) {
            Procedimento::create($procedimento);
        }
    }
}
