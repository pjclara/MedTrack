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
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData } from '@/types/models';

interface Area {
    id: number;
    nome: string;
    descricao?: string;
}

interface AreaIndexProps {
    areas: PaginatedData<Area>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tabelas de Apoio', href: '#' },
    { title: 'Áreas', href: '/areas' },
];

export default function AreaIndex({ areas }: AreaIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Áreas" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Áreas</h1>
                        <p className="text-muted-foreground">
                            Gestão de áreas de especialidade
                        </p>
                    </div>
                    <Link href="/areas/create">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Nova Área
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Áreas</CardTitle>
                        <CardDescription>
                            Total de {areas.total} áreas registadas
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Descrição</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {areas.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center text-muted-foreground py-10">
                                                Nenhuma área encontrada
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        areas.data.map((area) => (
                                            <TableRow key={area.id}>
                                                <TableCell className="font-medium">{area.nome}</TableCell>
                                                <TableCell>{area.descricao || '-'}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/areas/${area.id}/edit`}>
                                                            <Button variant="ghost" size="icon">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button variant="ghost" size="icon" className="text-destructive">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
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
            </div>
        </AppLayout>
    );
}
