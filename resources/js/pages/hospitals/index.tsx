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
import { router } from '@inertiajs/react';

interface Hospital {
    id: number;
    nome: string;
}

interface HospitalIndexProps {
    hospitals: PaginatedData<Hospital>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Administração', href: '#' },
    { title: 'Hospitais de Origem', href: '/hospitals' },
];

export default function HospitalIndex({ hospitals }: HospitalIndexProps) {
    const deleteHospital = (id: number) => {
        if (confirm('Tem a certeza que deseja remover este hospital?')) {
            router.delete(`/hospitals/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hospitais de Origem" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Hospitais de Origem</h1>
                        <p className="text-muted-foreground">
                            Gestão de hospitais de origem para os registos cirúrgicos
                        </p>
                    </div>
                    <Link href="/hospitals/create">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Novo Hospital de Origem
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Hospitais de Origem</CardTitle>
                        <CardDescription>
                            Total de {hospitals.total} instituições registadas
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
                                    {hospitals.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-center text-muted-foreground py-10">
                                                Nenhum hospital encontrado
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        hospitals.data.map((hospital) => (
                                            <TableRow key={hospital.id}>
                                                <TableCell className="font-medium">{hospital.nome}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/hospitals/${hospital.id}/edit`}>
                                                            <Button variant="ghost" size="icon">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="text-destructive"
                                                            onClick={() => deleteHospital(hospital.id)}
                                                        >
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
