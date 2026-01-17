<?php

namespace Database\Factories;

use App\Models\AtividadeCientifica;
use App\Models\User;
use App\Enums\TipoAtividadeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AtividadeCientifica>
 */
class AtividadeCientificaFactory extends Factory
{
    protected $model = AtividadeCientifica::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tipos = TipoAtividadeEnum::values();
        $tipo = fake()->randomElement($tipos);
        
        // Diferentes patterns baseados no tipo de atividade
        $titulo = match($tipo) {
            'Artigo Revista' => 'Estudo sobre ' . fake()->randomElement([
                'Complicações Pós-Operatórias em Cirurgia Laparoscópica',
                'Técnicas Minimamente Invasivas na Cirurgia Geral',
                'Outcomes em Cirurgia de Emergência',
                'Fatores de Risco em Cirurgia Bariátrica',
                'Análise de Resultados em Apendicectomia',
            ]),
            'Poster Congresso' => fake()->randomElement([
                'Experiência de 5 Anos em Colecistectomia Laparoscópica',
                'Resultados de Herniorrafias no Serviço de Cirurgia',
                'Série de Casos: Cirurgia Oncológica Digestiva',
                'Protocolo de Fast-Track em Cirurgia Colorrectal',
            ]),
            'Comunicação Oral' => fake()->randomElement([
                'Apresentação de Caso: Complicação Rara em Cirurgia',
                'Série de Casos de Cirurgia de Urgência',
                'Revisão de Protocolos em Cirurgia Geral',
            ]),
            'Sessão Clínica' => fake()->randomElement([
                'Discussão de Caso Clínico Complexo',
                'Revisão de Guidelines em Cirurgia',
                'Apresentação de Caso Oncológico',
            ]),
            'Journal Club' => 'Discussão: ' . fake()->sentence(6),
            'Workshop', 'Conferência' => fake()->randomElement([
                'Workshop de Técnicas Laparoscópicas Avançadas',
                'Curso de Cirurgia Minimamente Invasiva',
                'Conferência sobre Cirurgia de Emergência',
            ]),
            'Capítulo de Livro' => 'Capítulo: ' . fake()->sentence(5),
            default => fake()->sentence(8),
        };

        $categorias = ['Nacional', 'Internacional', 'Regional'];
        $categoria = fake()->randomElement($categorias);

        // DOI apenas para artigos
        $doi = ($tipo === 'Artigo Revista' && fake()->boolean(70)) 
            ? '10.' . fake()->numberBetween(1000, 9999) . '/' . fake()->lexify('??????') . '.' . fake()->year()
            : null;

        // ISBN para capítulos de livro
        $isbn = ($tipo === 'Capítulo de Livro' && fake()->boolean(80))
            ? fake()->isbn13()
            : null;

        // Fator de impacto apenas para artigos em revista
        $fatorImpacto = ($tipo === 'Artigo Revista' && fake()->boolean(60))
            ? fake()->randomFloat(3, 0.5, 15.0)
            : null;

        // Autor principal é menos comum (padrão: falso)
        $autorPrincipal = fake()->boolean(20); // 20% verdadeiro, 80% falso
        $posicaoAutor = $autorPrincipal ? 1 : fake()->numberBetween(2, 8);

        // Nomes de autores
        $numAutores = fake()->numberBetween(1, 6);
        $autores = [];
        for ($i = 0; $i < $numAutores; $i++) {
            $autores[] = fake()->name();
        }
        $autoresString = implode(', ', $autores);

        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'titulo' => $titulo,
            'descricao' => fake()->boolean(70) ? fake()->paragraph(3) : null,
            'tipo' => $tipo,
            'data' => fake()->dateTimeBetween('-3 years', 'now'),
            'revista_conferencia' => fake()->boolean(80) ? fake()->randomElement([
                'Revista Portuguesa de Cirurgia',
                'Acta Médica Portuguesa',
                'European Journal of Surgery',
                'World Journal of Surgery',
                'Congresso Nacional de Cirurgia',
                'Congresso Europeu de Cirurgia',
                'Simpósio Internacional de Cirurgia Minimamente Invasiva',
            ]) : null,
            'localizacao' => fake()->boolean(70) ? fake()->city() . ', ' . fake()->country() : null,
            'categoria' => $categoria,
            'autores' => $autoresString,
            'autor_principal' => $autorPrincipal,
            'posicao_autor' => $posicaoAutor,
            'doi' => $doi,
            'isbn' => $isbn,
            'link' => fake()->boolean(50) ? fake()->url() : null,
            'fator_impacto' => $fatorImpacto,
            'ficheiro_path' => null, // Não geramos ficheiros fake por enquanto
            'ficheiro_original_name' => null,
            'observacoes' => fake()->boolean(30) ? fake()->sentence() : null,
        ];
    }

    /**
     * Indica que a atividade é um artigo em revista científica.
     */
    public function artigo(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'Artigo Revista',
            'doi' => '10.' . fake()->numberBetween(1000, 9999) . '/' . fake()->lexify('??????') . '.' . fake()->year(),
            'fator_impacto' => fake()->randomFloat(3, 0.5, 15.0),
        ]);
    }

    /**
     * Indica que a atividade é um poster em congresso.
     */
    public function poster(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'Poster Congresso',
        ]);
    }

    /**
     * Indica que o utilizador é autor principal.
     */
    public function autorPrincipal(): static
    {
        return $this->state(fn (array $attributes) => [
            'autor_principal' => true,
            'posicao_autor' => 1,
        ]);
    }

    /**
     * Indica que é uma publicação internacional.
     */
    public function internacional(): static
    {
        return $this->state(fn (array $attributes) => [
            'categoria' => 'Internacional',
        ]);
    }
}
