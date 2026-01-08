import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Activity, FileText, Users, Calendar, TrendingUp, Shield } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="MedTrack - Sistema de Gestão de Registos Cirúrgicos" />
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    MedTrack
                                </h1>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Sistema de Gestão Cirúrgica
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                    >
                                        Entrar
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                                        >
                                            Registar
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="mx-auto max-w-7xl px-6 py-20">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        <div className="flex flex-col justify-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                <Activity className="h-4 w-4" />
                                Plataforma Médica Profissional
                            </div>
                            <h2 className="mb-6 text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                                Gestão Inteligente de
                                <span className="block text-blue-600">
                                    Registos Cirúrgicos
                                </span>
                            </h2>
                            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                                Sistema completo para organização, monitorização e análise de intervenções cirúrgicas. 
                                Registe procedimentos, acompanhe utentes e gere relatórios detalhados de forma simples e segura.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
                                    >
                                        Aceder ao Dashboard
                                        <TrendingUp className="h-5 w-5" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={register()}
                                            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
                                        >
                                            Começar Agora
                                            <Activity className="h-5 w-5" />
                                        </Link>
                                        <Link
                                            href={login()}
                                            className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                                        >
                                            Já tenho conta
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 shadow-2xl">
                                <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-emerald-400 opacity-50 blur-2xl"></div>
                                <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-teal-500 opacity-50 blur-2xl"></div>
                                <div className="relative space-y-4">
                                    <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="rounded-lg bg-white/20 p-2">
                                                <FileText className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="font-semibold text-white">Registos Detalhados</span>
                                        </div>
                                        <p className="text-sm text-blue-100">
                                            Documentação completa de procedimentos cirúrgicos com diagnósticos e complicações
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="rounded-lg bg-white/20 p-2">
                                                <Users className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="font-semibold text-white">Gestão de Utentes</span>
                                        </div>
                                        <p className="text-sm text-blue-100">
                                            Histórico completo de cada utente com todos os procedimentos realizados
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="rounded-lg bg-white/20 p-2">
                                                <Calendar className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="font-semibold text-white">Acompanhamento Temporal</span>
                                        </div>
                                        <p className="text-sm text-blue-100">
                                            Visualização cronológica de cirurgias e evolução de casos clínicos
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="border-t border-gray-200 bg-white py-20 dark:border-gray-700 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-16 text-center">
                            <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                                Funcionalidades Principais
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Tudo o que precisa para uma gestão cirúrgica eficiente
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-4 inline-flex rounded-lg bg-emerald-100 p-3 dark:bg-emerald-900/30">
                                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    Wizard de Registo
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Interface intuitiva em 6 passos para registo completo de cirurgias, diagnósticos e procedimentos
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-4 inline-flex rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    Gestão de Utentes
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Cadastro completo de utentes com processo clínico, dados pessoais e histórico médico
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-4 inline-flex rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                                    <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    Classificação Clavien-Dindo
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Registo de complicações cirúrgicas segundo classificação internacional padronizada
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-4 inline-flex rounded-lg bg-orange-100 p-3 dark:bg-orange-900/30">
                                    <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    Relatórios e Análises
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Estatísticas detalhadas e visualização de dados para análise de desempenho cirúrgico
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-4 inline-flex rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                                    <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    Segurança e Privacidade
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Acesso controlado por utilizador com autenticação segura e proteção de dados médicos
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-4 inline-flex rounded-lg bg-indigo-100 p-3 dark:bg-indigo-900/30">
                                    <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    Multi-especialidade
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Suporte para múltiplas áreas cirúrgicas, diagnósticos e tipos de procedimentos
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h3 className="mb-6 text-4xl font-bold text-white">
                            Pronto para começar?
                        </h3>
                        <p className="mb-8 text-xl text-blue-100">
                            Modernize a gestão dos seus registos cirúrgicos hoje mesmo
                        </p>
                        {!auth.user && (
                            <Link
                                href={register()}
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-10 py-4 text-lg font-semibold text-emerald-600 shadow-xl transition-all hover:bg-emerald-50"
                            >
                                Criar Conta Gratuita
                                <Activity className="h-5 w-5" />
                            </Link>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white py-8 dark:border-gray-700 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                                    <Activity className="h-5 w-5 text-white" />
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    MedTrack
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                © {new Date().getFullYear()} MedTrack. Sistema de Gestão de Registos Cirúrgicos.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
