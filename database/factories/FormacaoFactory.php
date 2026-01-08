<?php

namespace Database\Factories;

use App\Models\Formacao;
use App\Models\User;
use App\Enums\TipoFormacaoEnum;
use App\Enums\TipoParticipacaoEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Formacao>
 */
class FormacaoFactory extends Factory
{
    protected $model = Formacao::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tipos = TipoFormacaoEnum::values();
        $tipo = fake()->randomElement($tipos);
        
        // Títulos contextuais baseados no tipo
        $titulo = match($tipo) {
            'Congresso' => fake()->randomElement([
                'Congresso Nacional de Cirurgia',
                'Congresso Europeu de Cirurgia Geral',
                'Congresso Ibérico de Cirurgia Minimamente Invasiva',
                'Congresso Internacional de Cirurgia Oncológica',
                'Jornadas Nacionais de Cirurgia de Emergência',
            ]),
            'Workshop' => fake()->randomElement([
                'Workshop de Técnicas Laparoscópicas Avançadas',
                'Workshop de Cirurgia Robótica',
                'Workshop de Sutura e Anastomoses',
                'Workshop de Gestão de Complicações Cirúrgicas',
                'Workshop de Simulação em Cirurgia',
            ]),
            'Webinar' => fake()->randomElement([
                'Webinar: Inovações em Cirurgia Minimamente Invasiva',
                'Webinar: Gestão de Complicações Pós-Operatórias',
                'Webinar: Cirurgia de Emergência - Casos Complexos',
                'Webinar: Avanços em Cirurgia Oncológica',
            ]),
            'Curso' => fake()->randomElement([
                'Curso de Cirurgia Laparoscópica Básica',
                'Curso Avançado de Cirurgia Minimamente Invasiva',
                'Curso de Gestão em Saúde para Cirurgiões',
                'Curso de Metodologia de Investigação Científica',
                'Curso de Cirurgia de Emergência',
            ]),
            'Conferência' => fake()->randomElement([
                'Conferência Anual de Cirurgia Geral',
                'Conferência Internacional de Cirurgia Oncológica',
                'Conferência de Inovação em Cirurgia',
            ]),
            'Seminário' => fake()->randomElement([
                'Seminário de Cirurgia Bariátrica',
                'Seminário de Cirurgia Colorrectal',
                'Seminário de Cirurgia Hepatobiliar',
            ]),
            'Simpósio' => fake()->randomElement([
                'Simpósio de Cirurgia Oncológica',
                'Simpósio de Cirurgia de Emergência',
                'Simpósio de Cirurgia Minimamente Invasiva',
            ]),
            'Jornadas' => fake()->randomElement([
                'Jornadas de Cirurgia Geral',
                'Jornadas de Jovens Cirurgiões',
                'Jornadas de Investigação em Cirurgia',
            ]),
            default => 'Formação em ' . fake()->words(3, true),
        };

        // Entidades organizadoras portuguesas
        $entidades = [
            'Associação Portuguesa de Cirurgia',
            'Ordem dos Médicos',
            'Hospital de Santa Maria',
            'Centro Hospitalar Universitário de Lisboa',
            'Sociedade Portuguesa de Cirurgia',
            'European Society of Surgery',
            'American College of Surgeons',
            'Faculdade de Medicina da Universidade de Lisboa',
            'Faculdade de Medicina da Universidade do Porto',
            'Instituto Português de Oncologia',
        ];

        // Durações típicas baseadas no tipo
        $duracaoHoras = match($tipo) {
            'Congresso', 'Jornadas' => fake()->numberBetween(16, 40),
            'Curso' => fake()->numberBetween(20, 120),
            'Workshop' => fake()->numberBetween(4, 16),
            'Webinar' => fake()->numberBetween(1, 3),
            'Conferência', 'Simpósio' => fake()->numberBetween(8, 24),
            'Seminário' => fake()->numberBetween(3, 8),
            default => fake()->numberBetween(2, 8),
        };

        // Créditos de formação (geralmente 1 crédito por cada 7-10 horas)
        $creditos = $duracaoHoras ? fake()->randomFloat(1, $duracaoHoras / 10, $duracaoHoras / 5) : null;

        // Data de início entre 3 anos atrás e 1 ano no futuro
        $dataInicio = fake()->dateTimeBetween('-3 years', '+1 year');
        
        // Eventos longos têm data de fim
        $isEventoLongo = in_array($tipo, ['Congresso', 'Curso', 'Jornadas', 'Conferência']);
        $dataFim = $isEventoLongo && fake()->boolean(80)
            ? fake()->dateTimeBetween($dataInicio, $dataInicio->format('Y-m-d') . ' +7 days')
            : null;

        $categorias = ['Nacional', 'Internacional', 'Regional', 'Local'];
        $categoria = fake()->randomElement($categorias);

        // Tipo de participação (70% participante, 30% papel ativo)
        $tipoParticipacao = fake()->randomElement([
            'Participante',
            'Participante',
            'Participante',
            'Orador',
            'Moderador',
            'Organizador',
        ]);

        // Tema de apresentação apenas se foi orador/moderador
        $temaApresentacao = in_array($tipoParticipacao, ['Orador', 'Moderador']) && fake()->boolean(80)
            ? fake()->randomElement([
                'Complicações em Cirurgia Laparoscópica',
                'Técnicas de Anastomose Intestinal',
                'Gestão de Hemorragias Intraoperatórias',
                'Resultados de Cirurgia Oncológica',
                'Experiência em Cirurgia de Emergência',
            ])
            : null;

        // Localização
        $localizacao = $categoria === 'Internacional'
            ? fake()->city() . ', ' . fake()->country()
            : fake()->randomElement([
                'Lisboa, Portugal',
                'Porto, Portugal',
                'Coimbra, Portugal',
                'Braga, Portugal',
                'Faro, Portugal',
            ]);

        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'titulo' => $titulo,
            'descricao' => fake()->boolean(60) ? fake()->paragraph(2) : null,
            'tipo' => $tipo,
            'data_inicio' => $dataInicio,
            'data_fim' => $dataFim,
            'duracao_horas' => $duracaoHoras,
            'entidade_organizadora' => fake()->randomElement($entidades),
            'localizacao' => $localizacao,
            'categoria' => $categoria,
            'tipo_participacao' => $tipoParticipacao,
            'tema_apresentacao' => $temaApresentacao,
            'certificado_path' => null, // Não geramos certificados fake
            'certificado_original_name' => null,
            'certificado_size' => null,
            'creditos' => $creditos,
            'observacoes' => fake()->boolean(20) ? fake()->sentence() : null,
        ];
    }

    /**
     * Estado: Congresso
     */
    public function congresso(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'Congresso',
            'duracao_horas' => fake()->numberBetween(16, 40),
        ]);
    }

    /**
     * Estado: Workshop
     */
    public function workshop(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'Workshop',
            'duracao_horas' => fake()->numberBetween(4, 16),
        ]);
    }

    /**
     * Estado: Curso
     */
    public function curso(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo' => 'Curso',
            'duracao_horas' => fake()->numberBetween(20, 120),
        ]);
    }

    /**
     * Estado: Internacional
     */
    public function internacional(): static
    {
        return $this->state(fn (array $attributes) => [
            'categoria' => 'Internacional',
            'localizacao' => fake()->city() . ', ' . fake()->country(),
        ]);
    }

    /**
     * Estado: Orador
     */
    public function orador(): static
    {
        return $this->state(fn (array $attributes) => [
            'tipo_participacao' => 'Orador',
            'tema_apresentacao' => fake()->sentence(6),
        ]);
    }
}
