<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class SeedMedfolioData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'medfolio:seed 
                            {--fresh : Drop all tables and re-run all migrations}
                            {--table= : Seed specific table only}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed MedTrack database with sample data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if ($this->option('fresh')) {
            if (!$this->confirm('⚠️  Isto vai apagar TODOS os dados. Continuar?')) {
                $this->info('Operação cancelada.');
                return 0;
            }

            $this->info('🔄 Resetando base de dados...');
            Artisan::call('migrate:fresh');
            $this->info('✅ Migrations executadas.');
        }

        $table = $this->option('table');

        if ($table) {
            $this->seedSpecificTable($table);
        } else {
            $this->seedAllTables();
        }

        return 0;
    }

    /**
     * Seed specific table
     */
    protected function seedSpecificTable(string $table)
    {
        $seeders = [
            'areas' => 'AreaSeeder',
            'tipos-cirurgia' => 'TipoDeCirurgiaSeeder',
            'tipos-origem' => 'TipoDeOrigemSeeder',
            'diagnosticos' => 'DiagnosticoSeeder',
            'procedimentos' => 'ProcedimentoSeeder',
            'utentes' => 'UtenteSeeder',
            'registos' => 'RegistoCirurgicoSeeder',
            'cirurgias' => 'CirurgiaSeeder',
        ];

        if (!isset($seeders[$table])) {
            $this->error("❌ Tabela '{$table}' não encontrada.");
            $this->info("Tabelas disponíveis: " . implode(', ', array_keys($seeders)));
            return;
        }

        $seeder = $seeders[$table];
        $this->info("📊 Populando {$table}...");
        
        Artisan::call('db:seed', ['--class' => $seeder]);
        
        $this->info("✅ {$table} populado com sucesso!");
    }

    /**
     * Seed all tables
     */
    protected function seedAllTables()
    {
        $this->info('📊 Populando todas as tabelas...');
        
        $progressBar = $this->output->createProgressBar(8);
        $progressBar->start();

        $seeders = [
            'AreaSeeder',
            'TipoDeCirurgiaSeeder',
            'TipoDeOrigemSeeder',
            'DiagnosticoSeeder',
            'ProcedimentoSeeder',
            'UtenteSeeder',
            'RegistoCirurgicoSeeder',
            'CirurgiaSeeder',
        ];

        foreach ($seeders as $seeder) {
            Artisan::call('db:seed', ['--class' => $seeder]);
            $progressBar->advance();
        }

        $progressBar->finish();
        $this->newLine(2);

        $this->info('✅ Base de dados populada com sucesso!');
        $this->newLine();

        // Mostrar estatísticas
        $this->table(
            ['Tabela', 'Registos'],
            [
                ['Áreas', \App\Models\Area::count()],
                ['Tipos de Cirurgia', \App\Models\TipoDeCirurgia::count()],
                ['Tipos de Origem', \App\Models\TipoDeOrigem::count()],
                ['Diagnósticos', \App\Models\Diagnostico::count()],
                ['Procedimentos', \App\Models\Procedimento::count()],
                ['Utentes', \App\Models\Utente::count()],
                ['Registos Cirúrgicos', \App\Models\RegistoCirurgico::count()],
                ['Cirurgias', \App\Models\Cirurgia::count()],
            ]
        );

        $this->newLine();
        $this->info('💡 Credenciais de teste:');
        $this->line('   Email: test@example.com');
        $this->line('   Email: admin@medtrack.com');
        $this->line('   Password: password');
    }
}
