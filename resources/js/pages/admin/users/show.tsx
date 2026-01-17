import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { 
    User as UserIcon, 
    Mail, 
    Calendar, 
    MapPin, 
    Stethoscope, 
    FileText, 
    ArrowLeft,
    Shield,
    CheckCircle,
    XCircle,
    Activity,
    BookOpen,
    ClipboardList
} from 'lucide-react';
import { BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    is_active: boolean;
    created_at: string;
    hospital?: { nome: string };
    especialidade?: { nome: string };
    registos_count: number;
    atividades_count: number;
    formacoes_count: number;
}

interface Props {
    user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Painel Admin', href: '/admin/dashboard' },
    { title: 'Utilizadores', href: '/admin/users' },
    { title: 'Detalhes do Utilizador', href: '#' },
];

export default function Show({ user }: Props) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Perfil: ${user.name}`} />

            <div className="flex flex-col gap-6 p-4">
                {/* Header Actions */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar à lista
                    </Link>
                    
                    <div className="flex gap-3">
                        <Link
                            href={`/admin/curriculos?user_id=${user.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium"
                        >
                            <FileText className="w-4 h-4" />
                            Ver Currículo
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User Info Card */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                    <UserIcon className="w-12 h-12 text-emerald-600" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                                <p className="text-slate-500 text-sm mb-4">{user.email}</p>
                                
                                <div className="flex gap-2 justify-center">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                                        {user.email_verified_at ? (
                                            <><CheckCircle className="w-3 h-3 text-green-500" /> Verificado</>
                                        ) : (
                                            <><XCircle className="w-3 h-3 text-red-500" /> Não Verificado</>
                                        )}
                                    </div>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${user.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                        {user.is_active ? (
                                            <><CheckCircle className="w-3 h-3" /> Ativo</>
                                        ) : (
                                            <><XCircle className="w-3 h-3" /> Inativo</>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <hr className="my-6 border-slate-100" />

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-600">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-600">Membro desde: {new Date(user.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-600">{user.hospital?.nome || 'Não definido'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Stethoscope className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-600">{user.especialidade?.nome || 'Não definida'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Card (Placeholder for more features) */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-600" />
                                Segurança & Acesso
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">ID do Utilizador</span>
                                    <span className="font-mono text-slate-700">#{user.id}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Tipo de Conta</span>
                                    <span className="text-slate-700">Médico</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats & Activity */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <ClipboardList className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Cirurgias</p>
                                        <p className="text-2xl font-bold text-slate-900">{user.registos_count}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-50 rounded-lg">
                                        <Activity className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Atividades</p>
                                        <p className="text-2xl font-bold text-slate-900">{user.atividades_count}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-50 rounded-lg">
                                        <BookOpen className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Formações</p>
                                        <p className="text-2xl font-bold text-slate-900">{user.formacoes_count}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity or detailed info could go here */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1">
                            <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-emerald-600" />
                                Resumo do Currículo
                            </h3>
                            <div className="space-y-6">
                                <p className="text-slate-600 text-sm">
                                    O utilizador <strong>{user.name}</strong> tem um total de <strong>{user.registos_count + user.atividades_count + user.formacoes_count}</strong> registos no seu portfólio digital.
                                </p>

                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <h4 className="text-sm font-medium text-slate-700 mb-2">Próximos Passos</h4>
                                    <ul className="text-sm text-slate-500 list-disc list-inside space-y-1">
                                        <li>Exportar currículo em formato PDF/Excel</li>
                                        <li>Analisar distribuição por zonas anatómicas</li>
                                        <li>Verificar complicações registadas (Clavien-Dindo)</li>
                                    </ul>
                                </div>
                                
                                <div className="flex justify-end pt-4">
                                    <Link
                                        href={`/admin/curriculos?user_id=${user.id}`}
                                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
                                    >
                                        Ver todos os registos detalhados
                                        <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
