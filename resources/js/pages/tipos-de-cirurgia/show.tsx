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
import { type TipoDeCirurgia, type RegistoCirurgico } from '@/types/models';

interface TipoDeCirurgiaShowProps {
    tipo: TipoDeCirurgia & {
        registos_cirurgicos?: RegistoCirurgico[];
    };
}

export default function TipoDeCirurgiaShow({ tipo }: TipoDeCirurgiaShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Administração', href: '#' },
        { title: 'Tipos de Cirurgia', href: '/tipos-de-cirurgia' },
        { title: tipo.nome, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tipo de Cirurgia: ${tipo.nome}`} />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/tipos-de-cirurgia">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{tipo.nome}</h1>
                            <p className="text-muted-foreground">
                                Detalhes do tipo de cirurgia
                            </p>
                        </div>
                    </div>
                    <Link href={`/tipos-de-cirurgia/${tipo.id}/edit`}>
                        <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar Tipo
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
                                <p className="text-lg font-semibold">{tipo.nome}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Registos Associados</h3>
                                <p className="text-lg font-semibold">
                                    {tipo.registos_cirurgicos?.length || 0} registos
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Registos Cirúrgicos</CardTitle>
                                    <CardDescription>
                                        Lista de registos cirúrgicos deste tipo
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
                                            <TableHead>ID</TableHead>
                                            <TableHead>Data</TableHead>
                                            <TableHead>Hospital</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tipo.registos_cirurgicos && tipo.registos_cirurgicos.length > 0 ? (
                                            tipo.registos_cirurgicos.map((registo) => (
                                                <TableRow key={registo.id}>
                                                    <TableCell className="font-medium">#{registo.id}</TableCell>
                                                    <TableCell>{registo.data_cirurgia || '-'}</TableCell>
                                                    <TableCell>{registo.hospital || '-'}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center text-muted-foreground py-10">
                                                    Nenhum registo cirúrgico associado a este tipo.
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
