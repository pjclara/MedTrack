import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { Activity } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:px-12 xl:px-16">
                <div className="relative">
                    <div className="absolute -left-4 -top-4 h-32 w-32 rounded-full bg-emerald-400 opacity-30 blur-3xl"></div>
                    <div className="absolute -bottom-4 -right-4 h-40 w-40 rounded-full bg-teal-500 opacity-30 blur-3xl"></div>
                    
                    <div className="relative space-y-8">
                        <Link
                            href={home()}
                            className="inline-flex items-center gap-3 font-medium"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 shadow-lg">
                                <Activity className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    MedTrack
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Sistema de Gestão Cirúrgica
                                </p>
                            </div>
                        </Link>

                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white">
                                Gestão Profissional de<br />
                                <span className="text-emerald-600">Registos Cirúrgicos</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Plataforma completa para organização, monitorização e análise de intervenções cirúrgicas.
                            </p>
                        </div>

                        <div className="space-y-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 shadow-2xl">
                            <div className="flex items-start gap-4">
                                <div className="rounded-lg bg-white/20 p-2">
                                    <Activity className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Registo Detalhado</h3>
                                    <p className="text-sm text-blue-100">
                                        Sistema wizard intuitivo em 6 passos para documentação completa
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="rounded-lg bg-white/20 p-2">
                                    <Activity className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Segurança Total</h3>
                                    <p className="text-sm text-blue-100">
                                        Controlo de acesso por utilizador e proteção de dados médicos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="mb-8 flex lg:hidden flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 shadow-lg">
                                <Activity className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                    MedTrack
                                </h1>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Sistema de Gestão Cirúrgica
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-8 space-y-2 text-center">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {title}
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
