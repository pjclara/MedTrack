import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem, Diagnostico, PaginatedData } from '@/types';
import { useState, useEffect } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'react-toastify';

interface DiagnosticoIndexProps {
    diagnosticos: PaginatedData<Diagnostico>;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administração',
        href: '#',
    },
    {
        title: 'Diagnósticos',
        href: '/diagnosticos',
    },
];

export default function DiagnosticoIndex({ diagnosticos, filters }: DiagnosticoIndexProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleDelete = (id: number) => {
        router.delete(`/diagnosticos/${id}`, {
            onSuccess: () => toast.success('Diagnóstico removido com sucesso!'),
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== (filters.search || '')) {
                router.get(
                    '/diagnosticos',
                    { search: searchTerm },
                    { preserveState: true, preserveScroll: true, replace: true }
                );
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Diagnósticos" />
            
            <div className="p-4 sm:p-6 lg:p-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                        <div>
                            <CardTitle className="text-2xl font-bold">Diagnósticos</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Gerir os diagnósticos disponíveis no sistema.
                            </p>
                        </div>
                        <Button asChild>
                            <Link href="/diagnosticos/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Novo Diagnóstico
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center mb-6">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Procurar diagnósticos..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Zona Anatómica</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead className="text-center w-[150px]">Cirurgias</TableHead>
                                        <TableHead className="text-right w-[150px]">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {diagnosticos.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center">
                                                Nenhum diagnóstico encontrado.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        diagnosticos.data.map((diagnostico) => (
                                            <TableRow key={diagnostico.id}>
                                                <TableCell className="font-medium">
                                                    {diagnostico.nome}
                                                </TableCell>
                                                <TableCell>
                                                    {diagnostico.zona_anatomica?.nome || 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    {diagnostico.tipo ? (
                                                        <span className={diagnostico.tipo === 'Maligno' ? 'text-red-600 font-medium' : 'text-blue-600 font-medium'}>
                                                            {diagnostico.tipo}
                                                        </span>
                                                    ) : '-'}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {diagnostico.registos_cirurgicos_count ?? 0}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" asChild title="Editar">
                                                            <Link href={`/diagnosticos/${diagnostico.id}/edit`}>
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="text-destructive" title="Apagar">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Esta ação não pode ser desfeita. Isto irá eliminar permanentemente o diagnóstico
                                                                        "{diagnostico.nome}".
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(diagnostico.id)}
                                                                        className="bg-destructive text-white hover:bg-destructive/90"
                                                                    >
                                                                        Eliminar
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {diagnosticos.last_page > 1 && (
                            <div className="flex items-center justify-between py-4">
                                <p className="text-sm text-muted-foreground">
                                    A mostrar {diagnosticos.from} a {diagnosticos.to} de {diagnosticos.total} resultados
                                </p>
                                <div className="flex gap-2">
                                    {diagnosticos.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveScroll
                                        >
                                            <Button
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                disabled={!link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
