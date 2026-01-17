import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Eye, Edit, Trash2, Search, Plus, CheckCircle2, XCircle } from 'lucide-react';
import { formatDateToPT } from '@/utils/date-formatters';
import { useState } from 'react';

interface PaginatedData<T> {
    data: T[];
    links: any[];
    total: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    created_at: string;
}

interface AdminUserListProps {
    users: PaginatedData<User>;
    filters: { search?: string };
}

export default function AdminUserList({ users, filters }: AdminUserListProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/users', { search }, { preserveState: true });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Remover utilizador ${name}?`)) {
            router.delete(`/admin/users/${id}`);
        }
    };

    const breadcrumbs = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Utilizadores', href: '/admin/users' },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Gerir Utilizadores" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Utilizadores</h1>
                        <p className="text-neutral-500">Gestão global de contas de utilizadores.</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/users/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Novo Utilizador
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    <form onSubmit={handleSearch} className="flex-1 max-w-sm flex gap-2">
                        <Input 
                            placeholder="Procurar por nome ou email..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button type="submit" variant="secondary">
                            <Search className="h-4 w-4" />
                        </Button>
                    </form>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Registado em</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.is_active ? (
                                                <div className="flex items-center text-emerald-600 gap-1 text-sm">
                                                    <CheckCircle2 className="h-4 w-4" /> Ativo
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-red-600 gap-1 text-sm">
                                                    <XCircle className="h-4 w-4" /> Inativo
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>{formatDateToPT(user.created_at)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/admin/users/${user.id}`}><Eye className="h-4 w-4" /></Link>
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-blue-600" asChild>
                                                    <Link href={`/admin/users/${user.id}/edit`}><Edit className="h-4 w-4" /></Link>
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="text-red-600"
                                                    onClick={() => handleDelete(user.id, user.name)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {users.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-neutral-500">
                                            Nenhum utilizador encontrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Simple Pagination */}
                <div className="flex gap-2 justify-center mt-6">
                    {users.links.map((link, i) => (
                        link.url ? (
                            <Link 
                                key={i} 
                                href={link.url} 
                                className={`px-3 py-1 text-sm border rounded transition-colors ${link.active ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span 
                                key={i}
                                className="px-3 py-1 text-sm border rounded bg-slate-50 text-slate-400 opacity-50"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
