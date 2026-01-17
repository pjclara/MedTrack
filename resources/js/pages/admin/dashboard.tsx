import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Users, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
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

    const breadcrumbs = [{ title: 'Dashboard', href: '/admin/dashboard' }];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard Administrativo</h1>
                    <p className="text-neutral-500">Visão geral do sistema e métricas de utilizadores.</p>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Utilizadores</CardTitle>
                            <Users className="h-4 w-4 text-neutral-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.total_users}</div>
                            <p className="text-xs text-neutral-500">Membros registados na plataforma</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Currículos Completos</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-600">{metrics.complete_curriculums}</div>
                            <p className="text-xs text-neutral-500">Utilizadores com registos clínicos</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Currículos Incompletos</CardTitle>
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-600">{metrics.incomplete_curriculums}</div>
                            <p className="text-xs text-neutral-500">Apenas registo de conta</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Estado dos Currículos</CardTitle>
                            <CardDescription>Distribuição de completude dos perfis</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Recent Users */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Últimos Utilizadores</CardTitle>
                            <CardDescription>Utilizadores registados recentemente</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_users.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{user.name}</span>
                                            <span className="text-sm text-neutral-500">{user.email}</span>
                                        </div>
                                        <div className="text-sm text-neutral-400">
                                            {formatDateToPT(user.created_at)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Surgical Records */}
                <Card>
                    <CardHeader>
                        <CardTitle>Atividade Recente (Registos)</CardTitle>
                        <CardDescription>Últimos registos cirúrgicos introduzidos no sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-neutral-700 uppercase bg-neutral-50">
                                    <tr>
                                        <th className="px-4 py-3">Data</th>
                                        <th className="px-4 py-3">Utilizador</th>
                                        <th className="px-4 py-3">Utente</th>
                                        <th className="px-4 py-3">Tipo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent_records.map((record) => (
                                        <tr key={record.id} className="border-b hover:bg-neutral-50">
                                            <td className="px-4 py-3">{formatDateToPT(record.data_cirurgia)}</td>
                                            <td className="px-4 py-3 font-medium">{record.user?.name}</td>
                                            <td className="px-4 py-3 text-neutral-600">{record.utente?.nome}</td>
                                            <td className="px-4 py-3">{record.tipo_de_cirurgia?.nome || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
