import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Activity, Users, FileText, TrendingUp, Calendar, AlertTriangle, GraduationCap, Award, Clock, ArrowUpRight, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
}

interface RecentRegisto {
    id: number;
    data_cirurgia: string;
    utente_nome: string;
    tipo: string;
}

interface DashboardProps {
    stats: DashboardStats;
    recentRegistos: RecentRegisto[];
}

export default function Dashboard({ stats, recentRegistos }: DashboardProps) {
    // Calcular taxa de complicações
    const complicationRate = stats.totalRegistos > 0 
        ? ((stats.complicacoes / stats.totalRegistos) * 100).toFixed(1)
        : 0;

    // Média de horas por formação
    const avgHoursPerTraining = stats.formacoes > 0
        ? (stats.horasFormacao / stats.formacoes).toFixed(1)
        : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Painel de Controlo" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold">Bem-vindo ao MedTrack</h1>
                            <p className="text-emerald-100 text-lg">
                                Sistema de Gestão de Registos Cirúrgicos e Formação Profissional
                            </p>
                        </div>
                        <div className="hidden md:block text-right">
                            <p className="text-emerald-100 text-sm">Resumo Geral</p>
                            <div className="flex gap-6 mt-2">
                                <div>
                                    <p className="text-3xl font-bold">{stats.totalRegistos + stats.formacoes}</p>
                                    <p className="text-emerald-200 text-sm">Total de Registos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div>
                    <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Atividade Cirúrgica</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Link href="/registos-cirurgicos" className="group">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-emerald-600">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="rounded-lg bg-emerald-100 p-3 dark:bg-emerald-900/30">
                                        <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalRegistos}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Registos Cirúrgicos</p>
                            </div>
                        </Link>

                        <Link href="/utentes" className="group">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-green-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-600">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                                        <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalUtentes}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Utentes Registados</p>
                            </div>
                        </Link>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-start justify-between mb-3">
                                <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                                    <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.cirurgiasMes}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Cirurgias Este Mês</p>
                            {stats.totalRegistos > 0 && (
                                <div className="mt-3">
                                    <Progress value={(stats.cirurgiasMes / stats.totalRegistos) * 100} className="h-1.5" />
                                </div>
                            )}
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-start justify-between mb-3">
                                <div className="rounded-lg bg-orange-100 p-3 dark:bg-orange-900/30">
                                    <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.complicacoes}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Complicações ({complicationRate}%)</p>
                            {stats.totalRegistos > 0 && (
                                <div className="mt-3">
                                    <Progress value={Number(complicationRate)} className="h-1.5" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Academic & Training Stats */}
                <div>
                    <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Desenvolvimento Profissional</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Link href="/atividades-cientificas" className="group">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-teal-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-teal-600">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="rounded-lg bg-teal-100 p-3 dark:bg-teal-900/30">
                                        <GraduationCap className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalPublicacoes}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Publicações Científicas</p>
                            </div>
                        </Link>

                        <Link href="/formacoes" className="group">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                        <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.formacoes}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Formações Completadas</p>
                            </div>
                        </Link>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-start justify-between mb-3">
                                <div className="rounded-lg bg-indigo-100 p-3 dark:bg-indigo-900/30">
                                    <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.horasFormacao}<span className="text-lg">h</span></h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Horas de Formação</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Média: {avgHoursPerTraining}h por formação</p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-start justify-between mb-3">
                                <div className="rounded-lg bg-pink-100 p-3 dark:bg-pink-900/30">
                                    <BookOpen className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.creditosFormacao.toFixed(0)}</h3>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400">Créditos de Formação</p>
                            {stats.creditosFormacao >= 50 && (
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">✓ Objetivo anual atingido</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-emerald-600" />
                                        Cirurgias Recentes
                                    </CardTitle>
                                    <Link href="/registos-cirurgicos" className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                        Ver todas
                                        <ArrowUpRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentRegistos.length === 0 ? (
                                        <div className="text-center py-8">
                                            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Ainda não existem registos cirúrgicos.
                                            </p>
                                            <Link href="/registos-cirurgicos/create" className="inline-block mt-3">
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
                                                                {registo.utente_nome}
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {registo.tipo}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {registo.data_cirurgia}
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
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Taxa de Sucesso</span>
                                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                            {stats.totalRegistos > 0 ? (100 - Number(complicationRate)).toFixed(1) : 100}%
                                        </span>
                                    </div>
                                    <Progress value={stats.totalRegistos > 0 ? (100 - Number(complicationRate)) : 100} className="h-2" />
                                </div>

                                {/* Atividade Mensal */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Atividade Mensal</span>
                                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                            {stats.cirurgiasMes}/{stats.totalRegistos}
                                        </span>
                                    </div>
                                    <Progress 
                                        value={stats.totalRegistos > 0 ? (stats.cirurgiasMes / stats.totalRegistos) * 100 : 0} 
                                        className="h-2" 
                                    />
                                </div>

                                {/* Desenvolvimento */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Desenvolvimento</span>
                                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                            {stats.totalPublicacoes + stats.formacoes} atividades
                                        </span>
                                    </div>
                                    <Progress 
                                        value={Math.min(((stats.totalPublicacoes + stats.formacoes) / 50) * 100, 100)} 
                                        className="h-2" 
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Meta anual: 50 atividades</p>
                                </div>

                                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <div className="grid grid-cols-2 gap-3 text-center">
                                        <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
                                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.totalRegistos}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Cirurgias</p>
                                        </div>
                                        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.formacoes}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Formações</p>
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
