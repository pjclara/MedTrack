import { Head, Link, usePage } from '@inertiajs/react';
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
import { PlusCircle, Search, Edit, Eye } from 'lucide-react';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { type Utente, type PaginatedData } from '@/types/models';
import { Input } from '@/components/ui/input';
import { formatDateToPT } from '@/utils/date-formatters';

interface UtenteIndexProps {
    utentes: PaginatedData<Utente>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Utentes', href: '/utentes' },
];

export default function UtenteIndex({ utentes }: UtenteIndexProps) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.is_admin;

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
            <Head title="Utentes" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Utentes</h1>
                        <p className="text-muted-foreground">
                            Gerir os utentes do sistema
                        </p>
                    </div>
                    <Link href="/utentes/create">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Novo Utente
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Utentes</CardTitle>
                        <CardDescription>
                            Total de {utentes.total} utentes registados
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Pesquisar por nome ou processo..."
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Processo</TableHead>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Sexo</TableHead>
                                        <TableHead>Data Nascimento</TableHead>
                                        {isAdmin && <TableHead>Registado Por</TableHead>}
                                        <TableHead>Cirurgias</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {utentes.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={isAdmin ? 7 : 6} className="text-center text-muted-foreground">
                                                Nenhum utente encontrado
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        utentes.data.map((utente) => (
                                            <TableRow key={utente.id}>
                                                <TableCell className="font-medium">
                                                    #{utente.processo}
                                                </TableCell>
                                                <TableCell>{utente.nome || <span className="text-muted-foreground italic">Sem nome</span>}</TableCell>
                                                <TableCell>
                                                    <Badge variant={getSexoBadgeVariant(utente.sexo)}>
                                                        {utente.sexo}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {formatDateToPT(utente.data_nascimento)}
                                                </TableCell>
                                                {isAdmin && (
                                                    <TableCell>
                                                        {utente.user?.name || '-'}
                                                    </TableCell>
                                                )}
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {utente.registos_cirurgicos_count || 0}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/utentes/${utente.id}`}>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/utentes/${utente.id}/edit`}>
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

                        {utentes.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    A mostrar {utentes.from} a {utentes.to} de {utentes.total} resultados
                                </p>
                                <div className="flex gap-2">
                                    {utentes.links.map((link, index) => (
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
