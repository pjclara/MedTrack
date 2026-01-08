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
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Eye, Clock } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type RegistoCirurgico, type PaginatedData } from '@/types/models';

interface RegistoCirurgicoIndexProps {
    registos: PaginatedData<RegistoCirurgico>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Registos Cirúrgicos', href: '/registos-cirurgicos' },
];

export default function RegistoCirurgicoIndex({ registos }: RegistoCirurgicoIndexProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('pt-PT');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registos Cirúrgicos" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Registos Cirúrgicos</h1>
                        <p className="text-muted-foreground">
                            Gerir os registos de cirurgias realizadas
                        </p>
                    </div>
                    <Link href="/registos-cirurgicos/create">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Novo Registo
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Registos</CardTitle>
                        <CardDescription>
                            Total de {registos.total} registos cirúrgicos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Data</TableHead>
                                        <TableHead>Utente</TableHead>
                                        <TableHead>Tipo Cirurgia</TableHead>
                                        <TableHead>Abordagem</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {registos.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                                                Nenhum registo encontrado
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        registos.data.map((registo) => (
                                            <TableRow key={registo.id}>
                                                <TableCell className="font-medium">
                                                    {formatDate(registo.data_cirurgia)}
                                                </TableCell>
                                                <TableCell>
                                                    {registo.utente ? (
                                                        <Link href={`/utentes/${registo.utente.id}`} className="hover:underline">
                                                            {registo.utente.nome}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {registo.tipo_de_cirurgia?.nome || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {registo.tipo_de_abordagem}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/registos-cirurgicos/${registo.id}`}>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/registos-cirurgicos/${registo.id}/edit`}>
                                                            <Button variant="ghost" size="sm">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {registos.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    A mostrar {registos.from} a {registos.to} de {registos.total} resultados
                                </p>
                                <div className="flex gap-2">
                                    {registos.links.map((link, index) => (
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
