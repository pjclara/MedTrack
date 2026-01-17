import { Head, Link } from '@inertiajs/react';
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
import { ArrowLeft, Edit, Activity } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type Especialidade, type Procedimento } from '@/types/models';

interface EspecialidadeShowProps {
    especialidade: Especialidade & {
        procedimentos: Procedimento[];
    };
}

export default function EspecialidadeShow({ especialidade }: EspecialidadeShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Administração', href: '#' },
        { title: 'Especialidades', href: '/especialidades' },
        { title: especialidade.nome, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Especialidade: ${especialidade.nome}`} />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/especialidades">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{especialidade.nome}</h1>
                            <p className="text-muted-foreground">
                                Detalhes da especialidade e procedimentos associados
                            </p>
                        </div>
                    </div>
                    <Link href={`/especialidades/${especialidade.id}/edit`}>
                        <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar Especialidade
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Informações Gerais</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Nome</h3>
                                <p className="text-lg font-semibold">{especialidade.nome}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Descrição</h3>
                                <p className="text-base">{especialidade.descricao || 'Sem descrição.'}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Procedimentos Associados</CardTitle>
                                    <CardDescription>
                                        Lista de procedimentos que pertencem a esta especialidade
                                    </CardDescription>
                                </div>
                                <Activity className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Tipo</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {especialidade.procedimentos && especialidade.procedimentos.length > 0 ? (
                                            especialidade.procedimentos.map((proc) => (
                                                <TableRow key={proc.id}>
                                                    <TableCell className="font-medium">{proc.nome}</TableCell>
                                                    <TableCell>{proc.tipo || '-'}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={2} className="text-center text-muted-foreground py-10">
                                                    Nenhum procedimento associado a esta especialidade.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
