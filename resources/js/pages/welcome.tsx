import { dashboard, login} from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Activity, FileText, Users, Calendar, TrendingUp, Shield, GraduationCap, Award, Briefcase } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="MedTrack - Soluções SurgTuga" />
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
                                    by SurgTuga
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard().url}
                                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login().url}
                                        className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                    >
                                        Entrar
                                    </Link>
                                    
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
                                <Briefcase className="h-4 w-4" />
                                Gestão de Currículo Cirúrgico
                            </div>
                            <h2 className="mb-6 text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                                Mantenha o seu
                                <span className="block text-emerald-600">
                                    Currículo Cirúrgico
                                </span>
                                <span className="block">Sempre Atualizado</span>
                            </h2>
                            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                                Plataforma completa para registo de intervenções cirúrgicas, atividades científicas e formações. 
                                Documente toda a sua trajetória profissional e mantenha um currículo detalhado e atualizado automaticamente.
                            </p>

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
                                            <span className="font-semibold text-white">Registos Cirúrgicos</span>
                                        </div>
                                        <p className="text-sm text-blue-100">
                                            Documentação completa de todas as suas intervenções cirúrgicas
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="rounded-lg bg-white/20 p-2">
                                                <GraduationCap className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="font-semibold text-white">Atividades Científicas</span>
                                        </div>
                                        <p className="text-sm text-blue-100">
                                            Registo de publicações, apresentações e produções científicas
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="rounded-lg bg-white/20 p-2">
                                                <Award className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="font-semibold text-white">Formações & Cursos</span>
                                        </div>
                                        <p className="text-sm text-blue-100">
                                            Histórico completo de todas as formações e cursos realizados
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
                                Tudo para o seu Currículo Profissional
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Registe, organize e mantenha atualizado todo o seu percurso cirúrgico e académico
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-4 inline-flex rounded-lg bg-emerald-100 p-3 dark:bg-emerald-900/30">
                                    <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    Intervenções Cirúrgicas
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Registo detalhado de todas as cirurgias realizadas, com procedimentos, diagnósticos e função cirúrgica
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                    <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    Atividades Científicas
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Documente publicações, apresentações em congressos e toda a sua produção científica
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-4 inline-flex rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                                    <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    Formações & Certificações
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Mantenha um registo atualizado de cursos, workshops e certificações obtidas
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
                                    Base de dados de utentes com histórico completo de intervenções realizadas
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-4 inline-flex rounded-lg bg-orange-100 p-3 dark:bg-orange-900/30">
                                    <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    Estatísticas & Relatórios
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Visualize e exporte dados do seu currículo com relatórios detalhados e estatísticas
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                <div className="mb-4 inline-flex rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                                    <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                                </div>
                                <h4 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                    Segurança & Privacidade
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Seus dados protegidos com autenticação segura e conformidade com RGPD
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-20">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h3 className="mb-6 text-4xl font-bold text-white">
                            Mantenha o seu currículo sempre atualizado
                        </h3>
                        <p className="mb-8 text-xl text-emerald-100">
                            Registe todas as suas atividades cirúrgicas, científicas e formações num só lugar
                        </p>
                        
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
                                © {new Date().getFullYear()} MedTrack. Desenvolvido por SurgTuga.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
