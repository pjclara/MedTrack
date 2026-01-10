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
import { ArrowLeft, Edit, Trash2, Calendar, User, FileText } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type Utente } from '@/types/models';

interface UtenteShowProps {
    utente: Utente;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Utentes', href: '/utentes' },
    { title: 'Detalhes', href: '#' },
];

export default function UtenteShow({ utente }: UtenteShowProps) {
    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const handleDelete = () => {
        router.delete(`/utentes/${utente.id}`, {
            onSuccess: () => {
                toast.success('Utente removido com sucesso!');
                router.visit('/utentes');
            },
            onError: (errors) => {
                toast.error('Erro ao remover utente.');
                console.error(errors);
            },
        });
    };

    const getSexoBadgeVariant = (sexo: string) => {
        switch (sexo) {
            case 'Masculino':
                return 'default';
            case 'Feminino':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Utente - ${utente.nome || 'Sem Nome'}`} />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{utente.nome || 'Sem Nome'}</h1>
                        <p className="text-muted-foreground">
                            Processo #{utente.processo}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/utentes">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Voltar
                            </Button>
                        </Link>
                        <Link href={`/utentes/${utente.id}/edit`}>
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
                                        Tem a certeza que pretende eliminar o utente {utente.nome}?
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
                                Informações Pessoais
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Nome Completo</p>
                                <p className="text-lg">{utente.nome}</p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Número Processo</p>
                                <p className="text-lg font-mono">#{utente.processo}</p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Sexo</p>
                                <div className="mt-1">
                                    <Badge variant={getSexoBadgeVariant(utente.sexo)}>
                                        {utente.sexo}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Informações Adicionais
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Data de Nascimento</p>
                                <p className="text-lg">{formatDateToPT(utente.data_nascimento)}</p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Idade</p>
                                <p className="text-lg">{calculateAge(utente.data_nascimento)} anos</p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Registado em</p>
                                <p className="text-lg">{formatDateToPT(utente.created_at)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Registos Cirúrgicos
                        </CardTitle>
                        <CardDescription>
                            Histórico de cirurgias realizadas
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Total de Cirurgias</p>
                                <p className="text-3xl font-bold">{utente.registo_cirurgicos_count || 0}</p>
                            </div>
                            <Link href={`/registos-cirurgicos?utente=${utente.id}`}>
                                <Button variant="outline">
                                    Ver Registos
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
