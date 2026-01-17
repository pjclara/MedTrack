import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDateToPT } from '@/utils/date-formatters';

interface AdminLogListProps {
    logs: {
        data: any[];
        links: any[];
    };
}

export default function AdminLogList({ logs }: AdminLogListProps) {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Logs de Atividade', href: '/admin/logs' },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Logs de Atividade" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Logs de Atividade</h1>
                    <p className="text-neutral-500">Registo de todas as ações efetuadas por administradores.</p>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Data</TableHead>
                                    <TableHead>Admin</TableHead>
                                    <TableHead>Ação</TableHead>
                                    <TableHead>Alvo</TableHead>
                                    <TableHead>IP</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.data.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="text-xs text-neutral-500">
                                            {formatDateToPT(log.created_at)}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {log.admin_user?.name}
                                            <span className="block text-[10px] text-neutral-400 font-normal">
                                                {log.admin_user?.email}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{log.action}</Badge>
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {log.target_type ? `${log.target_type.split('\\').pop()} #${log.target_id}` : '-'}
                                        </TableCell>
                                        <TableCell className="text-xs font-mono">{log.ip_address}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
