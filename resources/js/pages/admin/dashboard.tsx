import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Users, FileText, CheckCircle2, AlertCircle, TrendingUp, Activity, ArrowUpRight, UserCircle2 } from 'lucide-react';
import { formatDateToPT } from '@/utils/date-formatters';

interface AdminDashboardProps {
    metrics: {
        total_users: number;
        complete_curriculums: number;
        incomplete_curriculums: number;
    };
    recent_users: any[];
    recent_records: any[];
}

export default function AdminDashboard({ metrics, recent_users, recent_records }: AdminDashboardProps) {
    const pieData = [
        { name: 'Completos', value: metrics.complete_curriculums, color: '#10b981' },
        { name: 'Incompletos', value: metrics.incomplete_curriculums, color: '#f59e0b' },
    ];

    const completionRate = metrics.total_users > 0 
        ? Math.round((metrics.complete_curriculums / metrics.total_users) * 100) 
        : 0;

    const breadcrumbs = [{ title: 'Dashboard', href: '/admin/dashboard' }];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Dashboard Administrativo
                    </h1>
                    <p className="text-neutral-600">Monitorize métricas e atividade da plataforma em tempo real</p>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Users Card */}
                    <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-neutral-700">Total Utilizadores</CardTitle>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <div className="text-4xl font-bold text-blue-600">{metrics.total_users}</div>
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                            </div>
                            <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
                                <Activity className="h-3 w-3" />
                                Membros registados
                            </p>
                        </CardContent>
                    </Card>

                    {/* Complete Curriculums Card */}
                    <Card className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-emerald-50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-neutral-700">Perfis Completos</CardTitle>
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <div className="text-4xl font-bold text-emerald-600">{metrics.complete_curriculums}</div>
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                    {completionRate}%
                                </Badge>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                Com dados clínicos
                            </p>
                        </CardContent>
                    </Card>

                    {/* Incomplete Curriculums Card */}
                    <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-amber-50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-neutral-700">Perfis Incompletos</CardTitle>
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <AlertCircle className="h-5 w-5 text-amber-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <div className="text-4xl font-bold text-amber-600">{metrics.incomplete_curriculums}</div>
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                    {100 - completionRate}%
                                </Badge>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Apenas conta criada
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chart */}
                    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-emerald-600" />
                                Estado dos Perfis
                            </CardTitle>
                            <CardDescription>Análise de completude dos utilizadores</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                        }} 
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Recent Users */}
                    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <UserCircle2 className="h-5 w-5 text-emerald-600" />
                                        Novos Utilizadores
                                    </CardTitle>
                                    <CardDescription>Últimos registos na plataforma</CardDescription>
                                </div>
                                <Link href="/admin/users" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium">
                                    Ver todos
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_users.length > 0 ? (
                                    recent_users.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors border border-neutral-100">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-neutral-900">{user.name}</span>
                                                    <span className="text-sm text-neutral-500">{user.email}</span>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {formatDateToPT(user.created_at)}
                                            </Badge>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-neutral-400 py-8">
                                        Nenhum utilizador recente
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity Table */}
                <Card className="shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-t-emerald-500">
                    <CardHeader className="bg-white border-b border-neutral-100 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Activity className="h-6 w-6 text-emerald-600" />
                                Monitorização Global de Atividade
                            </CardTitle>
                            <CardDescription>Últimas interações de todos os utilizadores na plataforma</CardDescription>
                        </div>
                        <Button variant="outline" asChild size="sm">
                            <Link href="/admin/curriculos" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                Ver Todo o Histórico
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-neutral-50/50">
                                    <tr className="border-b border-neutral-100">
                                        <th className="px-6 py-4 text-left font-semibold text-neutral-600">Tipo</th>
                                        <th className="px-6 py-4 text-left font-semibold text-neutral-600">Utilizador</th>
                                        <th className="px-6 py-4 text-left font-semibold text-neutral-600">Detalhe</th>
                                        <th className="px-6 py-4 text-left font-semibold text-neutral-600">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent_records.length > 0 ? (
                                        recent_records.map((record, index) => (
                                            <tr key={index} className="border-b border-neutral-100 last:border-0 hover:bg-emerald-50/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <Badge 
                                                        className={`${
                                                            record.type === 'Cirurgia' ? 'bg-emerald-100 text-emerald-700' :
                                                            record.type === 'Atividade' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-purple-100 text-purple-700'
                                                        } border-0 shadow-none px-2 py-0.5`}
                                                    >
                                                        {record.type}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-semibold text-neutral-900">{record.user}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-neutral-800 font-medium">{record.detail}</span>
                                                        <span className="text-xs text-neutral-500">{record.target}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-neutral-500 text-xs font-medium">
                                                        {formatDateToPT(record.date)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-neutral-400 italic">
                                                Nenhuma atividade registada até ao momento
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
