import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';
import { Separator } from '@/components/ui/separator';
import { formatDateToPT } from '@/utils/date-formatters';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Edit, Trash2, Calendar, User, Activity } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type RegistoCirurgico } from '@/types/models';

interface RegistoCirurgicoShowProps {
    registo: RegistoCirurgico;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Registos Cirúrgicos', href: '/registos-cirurgicos' },
    { title: 'Detalhes', href: '#' },
];

export default function RegistoCirurgicoShow({ registo }: RegistoCirurgicoShowProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleDelete = () => {
        router.delete(`/registos-cirurgicos/${registo.id}`, {
            onSuccess: () => {
                toast.success('Registo cirúrgico removido com sucesso!');
                router.visit('/registos-cirurgicos');
            },
            onError: (errors) => {
                toast.error('Erro ao remover registo cirúrgico.');
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Registo Cirúrgico - ${formatDate(registo.data_cirurgia)}`} />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Registo Cirúrgico</h1>
                        <p className="text-muted-foreground">
                            {formatDate(registo.data_cirurgia)}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/registos-cirurgicos">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Voltar
                            </Button>
                        </Link>
                        <Link href={`/registos-cirurgicos/${registo.id}/edit`}>
                            <Button variant="default">
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                            </Button>
                        </Link>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Eliminar
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Eliminação</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Tem a certeza que pretende eliminar este registo cirúrgico?
                                        Esta ação não pode ser revertida.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        Eliminar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Informações do Utente
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {registo.utente ? (
                                <>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Nome</p>
                                        <Link href={`/utentes/${registo.utente.id}`} className="text-lg hover:underline">
                                            {registo.utente.nome}
                                        </Link>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Processo</p>
                                        <p className="text-lg font-mono">#{registo.utente.processo}</p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Data de Nascimento</p>
                                        <p className="text-lg">{formatDateToPT(registo.utente.data_nascimento)}</p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Sexo</p>
                                        <Badge variant="outline">{registo.utente.sexo}</Badge>
                                    </div>
                                </>
                            ) : (
                                <p className="text-muted-foreground">Informação não disponível</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Detalhes da Cirurgia
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Data</p>
                                <p className="text-lg">{formatDate(registo.data_cirurgia)}</p>
                            </div>

                            {registo.hospital && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Hospital</p>
                                    <p className="text-lg">{registo.hospital}</p>
                                </div>
                            )}

                            {registo.especialidade && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Especialidade</p>
                                    <p className="text-lg">{registo.especialidade}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Informações Clínicas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">ASA Score</p>
                                <div className="mt-2">
                                    {registo.asa_score ? (
                                        <Badge variant="secondary" className="text-lg">
                                            ASA {registo.asa_score}
                                        </Badge>
                                    ) : (
                                        <span className="text-muted-foreground">Não especificado</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Tipo de Cirurgia</p>
                                <div className="mt-2">
                                    {registo.cirurgia_urgente ? (
                                        <Badge variant="destructive" className="text-lg">Urgente</Badge>
                                    ) : (
                                        <Badge variant="default" className="text-lg">Programada</Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {registo.cirurgias && registo.cirurgias.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Cirurgias Realizadas</CardTitle>
                            <CardDescription>
                                Lista de procedimentos realizados neste registo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Diagnóstico</TableHead>
                                            <TableHead>Procedimento</TableHead>
                                            <TableHead>Função</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {registo.cirurgias.map((cirurgia) => (
                                            <TableRow key={cirurgia.id}>
                                                <TableCell className="font-medium">
                                                    {cirurgia.diagnostico?.nome || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {cirurgia.procedimento?.nome || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {cirurgia.funcao ? (
                                                        <Badge variant="secondary">
                                                            {cirurgia.funcao}
                                                        </Badge>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
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
