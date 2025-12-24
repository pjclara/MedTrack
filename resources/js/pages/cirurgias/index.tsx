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
import { PlusCircle, Edit, Eye } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type Cirurgia, type PaginatedData } from '@/types/models';

interface CirurgiaIndexProps {
    cirurgias: PaginatedData<Cirurgia>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Cirurgias', href: '/cirurgias' },
];

export default function CirurgiaIndex({ cirurgias }: CirurgiaIndexProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('pt-PT');
    };

    const getClavienDindoBadgeVariant = (grau?: string) => {
        if (!grau) return 'outline';
        if (grau === 'I' || grau === 'II') return 'default';
        if (grau === 'IIIa' || grau === 'IIIb') return 'secondary';
        return 'destructive';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cirurgias" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Cirurgias</h1>
                        <p className="text-muted-foreground">
                            Gerir os procedimentos cirúrgicos realizados
                        </p>
                    </div>
                    <Link href="/cirurgias/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Nova Cirurgia
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Cirurgias</CardTitle>
                        <CardDescription>
                            Total de {cirurgias.total} cirurgias registadas
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Data</TableHead>
                                        <TableHead>Diagnóstico</TableHead>
                                        <TableHead>Procedimento</TableHead>
                                        <TableHead>Abordagem</TableHead>
                                        <TableHead>Função</TableHead>
                                        <TableHead>Clavien-Dindo</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cirurgias.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                                Nenhuma cirurgia encontrada
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        cirurgias.data.map((cirurgia) => (
                                            <TableRow key={cirurgia.id}>
                                                <TableCell className="font-medium">
                                                    {cirurgia.created_at ? formatDate(cirurgia.created_at) : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {cirurgia.diagnostico?.descricao || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {cirurgia.procedimento?.descricao || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {cirurgia.tipo_de_abordagem ? (
                                                        <Badge variant="outline">
                                                            {cirurgia.tipo_de_abordagem}
                                                        </Badge>
                                                    ) : (
                                                        '-'
                                                    )}
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
                                                <TableCell>
                                                    {cirurgia.clavien_dindo ? (
                                                        <Badge variant={getClavienDindoBadgeVariant(cirurgia.clavien_dindo)}>
                                                            {cirurgia.clavien_dindo}
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/cirurgias/${cirurgia.id}`}>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/cirurgias/${cirurgia.id}/edit`}>
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

                        {cirurgias.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    A mostrar {cirurgias.from} a {cirurgias.to} de {cirurgias.total} resultados
                                </p>
                                <div className="flex gap-2">
                                    {cirurgias.links.map((link, index) => (
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
