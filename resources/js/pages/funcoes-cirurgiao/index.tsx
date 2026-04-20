import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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
import { PlusCircle, Edit, Trash2, UserCheck } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData, type FuncaoCirurgiao } from '@/types/models';
import { toast } from 'react-toastify';
import { useIsMobile } from '@/hooks/use-mobile';

interface FuncaoCirurgiaoIndexProps {
    funcoes: PaginatedData<FuncaoCirurgiao>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gestão de Dados', href: '#' },
    { title: 'Funções do Cirurgião', href: '/funcoes-cirurgiao' },
];

export default function FuncaoCirurgiaoIndex({ funcoes }: FuncaoCirurgiaoIndexProps) {
    const isMobile = useIsMobile();

    const handleDelete = (id: number) => {
        router.delete(`/funcoes-cirurgiao/${id}`, {
            onSuccess: () => toast.success('Função removida com sucesso!'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Funções do Cirurgião" />

            <div className={`flex flex-col gap-4 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                    <div>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>Funções do Cirurgião</h1>
                        <p className="text-muted-foreground">
                            Gestão das funções cirúrgicas disponíveis
                        </p>
                    </div>
                    <Link href="/funcoes-cirurgiao/create" className={isMobile ? 'w-full' : ''}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Nova Função
                        </Button>
                    </Link>
                </div>

                {isMobile ? (
                    <div className="flex flex-col gap-4">
                        {funcoes.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center bg-card rounded-lg border border-dashed">
                                <UserCheck className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium text-muted-foreground">
                                    Nenhuma função encontrada
                                </p>
                            </div>
                        ) : (
                            funcoes.data.map((item) => (
                                <Card key={item.id} className="p-4 border-l-4 border-l-emerald-500 shadow-sm">
                                    <div className="flex justify-between items-center gap-4">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                                                <UserCheck className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            <h3 className="font-semibold text-lg truncate leading-tight">
                                                {item.nome}
                                            </h3>
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <Link href={`/funcoes-cirurgiao/${item.id}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Confirmar eliminação</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tem a certeza que deseja eliminar a função "{item.nome}"?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(item.id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Eliminar
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Lista de Funções</CardTitle>
                            <CardDescription>
                                {funcoes.total} função(ões) registada(s)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead className="w-[100px] text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {funcoes.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={2} className="h-24 text-center">
                                                Nenhuma função encontrada.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        funcoes.data.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.nome}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <Link href={`/funcoes-cirurgiao/${item.id}/edit`}>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Confirmar eliminação</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Tem a certeza que deseja eliminar a função "{item.nome}"?
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(item.id)}
                                                                        className="bg-red-600 hover:bg-red-700"
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

                            {funcoes.last_page > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-4">
                                    {funcoes.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
