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
import { PlusCircle, Edit, Trash2, Activity } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData, type TipoDeCirurgia } from '@/types/models';
import { toast } from 'react-toastify';
import { useIsMobile } from '@/hooks/use-mobile';

interface TipoDeCirurgiaIndexProps {
    tipos: PaginatedData<TipoDeCirurgia>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Administração', href: '#' },
    { title: 'Tipos de Cirurgia', href: '/tipos-de-cirurgia' },
];

export default function TipoDeCirurgiaIndex({ tipos }: TipoDeCirurgiaIndexProps) {
    const isMobile = useIsMobile();
    const handleDelete = (id: number) => {
        router.delete(`/tipos-de-cirurgia/${id}`, {
            onSuccess: () => toast.success('Tipo de cirurgia removido com sucesso!'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tipos de Cirurgia" />

            <div className={`flex flex-col gap-4 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                    <div>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>Tipos de Cirurgia</h1>
                        <p className="text-muted-foreground">
                            Gestão de tipos de cirurgia
                        </p>
                    </div>
                    <Link href="/tipos-de-cirurgia/create" className={isMobile ? 'w-full' : ''}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Novo Tipo de Cirurgia
                        </Button>
                    </Link>
                </div>

                {isMobile ? (
                    <div className="flex flex-col gap-4">
                        {tipos.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center bg-card rounded-lg border border-dashed">
                                <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium text-muted-foreground">
                                    Nenhum tipo de cirurgia encontrado
                                </p>
                            </div>
                        ) : (
                            tipos.data.map((item) => (
                                <Card key={item.id} className="p-4 border-l-4 border-l-emerald-500 shadow-sm">
                                    <div className="flex justify-between items-center gap-4">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                                                <Activity className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-lg truncate leading-tight">
                                                    {item.nome}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <Link href={`/tipos-de-cirurgia/${item.id}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="w-[90%] rounded-lg">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Eliminar "{item.nome}"? Esta ação não pode ser desfeita.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(item.id)}
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
                            <CardTitle>Lista de Tipos de Cirurgia</CardTitle>
                            <CardDescription>
                                Total de {tipos.total} tipos registados
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nome</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tipos.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={2} className="text-center text-muted-foreground py-10">
                                                    Nenhum tipo de cirurgia encontrado
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            tipos.data.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">{item.nome}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Link href={`/tipos-de-cirurgia/${item.id}/edit`}>
                                                                <Button variant="ghost" size="icon">
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                            </Link>

                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="text-destructive">
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Esta ação não pode ser desfeita. Isto irá eliminar permanentemente o tipo
                                                                            "{item.nome}".
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => handleDelete(item.id)}
                                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
