import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Activity, Users, FileText, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardStats {
    totalRegistos: number;
    totalUtentes: number;
    cirurgiasMes: number;
    complicacoes: number;
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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white shadow-lg">
                    <h1 className="mb-2 text-2xl font-bold">Bem-vindo ao Medfolio</h1>
                    <p className="text-blue-100">
                        Sistema de Gestão de Registos Cirúrgicos
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalRegistos}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Registos Cirúrgicos</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUtentes}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Utentes</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                                <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.cirurgiasMes}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Cirurgias Este Mês</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-orange-100 p-3 dark:bg-orange-900/30">
                                <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.complicacoes}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Complicações</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Cirurgias Recentes
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {recentRegistos.length === 0 ? (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Ainda não existem registos cirúrgicos.
                                </p>
                            ) : (
                                recentRegistos.map((registo) => (
                                    <Link
                                        key={registo.id}
                                        href={`/registos-cirurgicos/${registo.id}`}
                                        className="block rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {registo.utente_nome}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {registo.tipo}
                                                </p>
                                            </div>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {registo.data_cirurgia}
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Estatísticas
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Estatísticas serão exibidas aqui quando houver dados suficientes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
