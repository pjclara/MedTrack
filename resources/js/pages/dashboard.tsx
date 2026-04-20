import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    ArrowUpRight,
    Award,
    Calendar,
    FileText,
    GraduationCap,
    TrendingUp,
    Users,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Painel de Controlo',
        href: dashboard().url,
    },
];

interface DashboardStats {
    totalRegistos: number;
    totalUtentes: number;
    cirurgiasMes: number;
    complicacoes: number;
    totalPublicacoes: number;
    formacoes: number;
    horasFormacao: number;
    creditosFormacao: number;
    totalMeusRegistosPrincipais: number;
    totalSemPequenaCirurgia: number;
    totalPrincipalSemPequenaCirurgia: number;
    totalNãoPrincipalSemPequenaCirurgia: number;
}

interface RecentRegisto {
    id: number;
    data_cirurgia: string;
    utente_nome: string;
    processo_numero: string;
    utente_: string;
    tipo: string;
    procedimentos: string[];
}

interface DashboardProps {
    stats: DashboardStats;
    recentRegistos: RecentRegisto[];
}

export default function Dashboard({ stats, recentRegistos }: DashboardProps) {
    const isMobile = useIsMobile();
    // Calcular taxa de complicações
    const complicationRate =
        stats.totalRegistos > 0
            ? (
                  (stats.complicacoes / stats.totalMeusRegistosPrincipais) *
                  100
              ).toFixed(1)
            : 0;

    // Média de horas por formação
    const avgHoursPerTraining =
        stats.formacoes > 0
            ? (stats.horasFormacao / stats.formacoes).toFixed(1)
            : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Painel de Controlo" />
            <div
                className={`flex h-full flex-1 flex-col gap-6 ${isMobile ? 'p-4' : 'p-6'}`}
            >
                {/* Welcome Section */}
                <div
                    className={`rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 ${isMobile ? 'p-6 text-center' : 'p-8'} text-white shadow-lg`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1
                                className={`mb-2 ${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}
                            >
                                Currículo Cirúrgico
                            </h1>
                            <p
                                className={`${isMobile ? 'text-sm text-emerald-100' : 'text-lg text-emerald-100'}`}
                            >
                                Mantenha o seu currículo sempre atualizado - by
                                SurgTuga
                            </p>
                        </div>
                        <div className="hidden text-right md:block">
                            <p className="text-sm text-emerald-100">
                                Total de Atividades
                            </p>
                            <div className="mt-2 flex gap-6">
                                <div>
                                    <p className="text-3xl font-bold">
                                        {stats.totalRegistos +
                                            stats.formacoes +
                                            stats.totalPublicacoes}
                                    </p>
                                    <p className="text-sm text-emerald-200">
                                        Registos no Currículo
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div>
                    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                        Atividade Cirúrgica
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-emerald-600">
                            <div className="mb-3 flex items-start justify-between">
                                <div className="rounded-lg bg-emerald-100 p-3 dark:bg-emerald-900/30">
                                    <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            <h3 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.totalSemPequenaCirurgia}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Total de Cirurgias
                            </p>
                            <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                                excluindo pequena cirurgia
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-3 flex items-start justify-between">
                                <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                            <h3 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.totalPrincipalSemPequenaCirurgia}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Como Principal
                            </p>
                            {stats.totalSemPequenaCirurgia > 0 && (
                                <div className="mt-3">
                                    <Progress
                                        value={
                                            (stats.totalPrincipalSemPequenaCirurgia /
                                                stats.totalSemPequenaCirurgia) *
                                            100
                                        }
                                        className="h-1.5"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        {(
                                            (stats.totalPrincipalSemPequenaCirurgia /
                                                stats.totalSemPequenaCirurgia) *
                                            100
                                        ).toFixed(0)}
                                        % do total
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-3 flex items-start justify-between">
                                <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                            <h3 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.totalNãoPrincipalSemPequenaCirurgia}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Como Ajudante
                            </p>
                            {stats.totalSemPequenaCirurgia > 0 && (
                                <div className="mt-3">
                                    <Progress
                                        value={
                                            (stats.totalNãoPrincipalSemPequenaCirurgia /
                                                stats.totalSemPequenaCirurgia) *
                                            100
                                        }
                                        className="h-1.5"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        {(
                                            ((stats.totalNãoPrincipalSemPequenaCirurgia) /
                                                stats.totalSemPequenaCirurgia) *
                                            100
                                        ).toFixed(0)}
                                        % do total
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Academic & Training Stats */}
                <div>
                    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                        Desenvolvimento Profissional
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Link href="/atividades-cientificas" className="group">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-teal-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-teal-600">
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="rounded-lg bg-teal-100 p-3 dark:bg-teal-900/30">
                                        <GraduationCap className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                                <h3 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.totalPublicacoes}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Publicações Científicas
                                </p>
                            </div>
                        </Link>

                        <Link href="/formacoes" className="group">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600">
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                        <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                                <h3 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.formacoes}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Formações Completadas
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-emerald-600" />
                                        Cirurgias Recentes
                                    </CardTitle>
                                    <Link
                                        href="/registos-cirurgicos"
                                        className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                                    >
                                        Ver todas
                                        <ArrowUpRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentRegistos.length === 0 ? (
                                        <div className="py-8 text-center">
                                            <FileText className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Ainda não existem registos
                                                cirúrgicos.
                                            </p>
                                            <Link
                                                href="/registos-cirurgicos/create"
                                                className="mt-3 inline-block"
                                            >
                                                <button className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
                                                    Criar primeiro registo
                                                </button>
                                            </Link>
                                        </div>
                                    ) : (
                                        recentRegistos.map((registo) => (
                                            <Link
                                                key={registo.id}
                                                href={`/registos-cirurgicos/${registo.id}`}
                                                className="block rounded-lg border border-gray-200 p-4 transition-all hover:border-emerald-300 hover:shadow-sm dark:border-gray-700 dark:hover:border-emerald-600"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/30">
                                                            <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                Processo:{' '}
                                                                {
                                                                    registo.processo_numero
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {registo.tipo}
                                                            </p>
                                                            {registo.procedimentos &&
                                                                registo
                                                                    .procedimentos
                                                                    .length >
                                                                    0 && (
                                                                    <div className="mt-1 flex flex-wrap gap-1">
                                                                        {registo.procedimentos
                                                                            .slice(
                                                                                0,
                                                                                2,
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    proc,
                                                                                    idx,
                                                                                ) => (
                                                                                    <span
                                                                                        key={
                                                                                            idx
                                                                                        }
                                                                                        className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                                                    >
                                                                                        {
                                                                                            proc
                                                                                        }
                                                                                    </span>
                                                                                ),
                                                                            )}
                                                                        {registo
                                                                            .procedimentos
                                                                            .length >
                                                                            2 && (
                                                                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                                                                +
                                                                                {registo
                                                                                    .procedimentos
                                                                                    .length -
                                                                                    2}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {
                                                                registo.data_cirurgia
                                                            }
                                                        </span>
                                                        <ArrowUpRight className="h-4 w-4 text-gray-400" />
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                    Resumo de Desempenho
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Taxa de Sucesso */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Taxa de Sucesso
                                        </span>
                                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                            {stats.totalRegistos > 0
                                                ? (
                                                      100 -
                                                      Number(complicationRate)
                                                  ).toFixed(1)
                                                : 100}
                                            %
                                        </span>
                                    </div>
                                    <Progress
                                        value={
                                            stats.totalRegistos > 0
                                                ? 100 - Number(complicationRate)
                                                : 100
                                        }
                                        className="h-2"
                                    />
                                </div>

                                {/* Atividade Mensal */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Atividade Mensal
                                        </span>
                                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                            {stats.cirurgiasMes}/
                                            {stats.totalRegistos}
                                        </span>
                                    </div>
                                    <Progress
                                        value={
                                            stats.totalRegistos > 0
                                                ? (stats.cirurgiasMes /
                                                      stats.totalRegistos) *
                                                  100
                                                : 0
                                        }
                                        className="h-2"
                                    />
                                </div>

                                {/* Desenvolvimento */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Desenvolvimento
                                        </span>
                                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                            {stats.totalPublicacoes +
                                                stats.formacoes}{' '}
                                            atividades
                                        </span>
                                    </div>
                                    <Progress
                                        value={Math.min(
                                            ((stats.totalPublicacoes +
                                                stats.formacoes) /
                                                50) *
                                                100,
                                            100,
                                        )}
                                        className="h-2"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Meta anual: 50 atividades
                                    </p>
                                </div>

                                <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                                    <div className="grid grid-cols-2 gap-3 text-center">
                                        <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
                                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                                {stats.totalRegistos}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Cirurgias
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                {stats.formacoes}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Formações
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
