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
import { PlusCircle, Edit, Trash2, Building2 } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData } from '@/types/models';
import { router } from '@inertiajs/react';
import { useIsMobile } from '@/hooks/use-mobile';

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
    const isMobile = useIsMobile();
    const deleteHospital = (id: number) => {
        if (confirm('Tem a certeza que deseja remover este hospital?')) {
            router.delete(`/hospitals/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hospitais de Origem" />

            <div className={`flex flex-col gap-4 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                    <div>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>Hospitais de Origem</h1>
                        <p className="text-muted-foreground">
                            Gestão de hospitais de origem para os registos cirúrgicos
                        </p>
                    </div>
                    <Link href="/hospitals/create" className={isMobile ? 'w-full' : ''}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Novo Hospital
                        </Button>
                    </Link>
                </div>

                {isMobile ? (
                    <div className="flex flex-col gap-4">
                        {hospitals.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center bg-card rounded-lg border border-dashed">
                                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium text-muted-foreground">
                                    Nenhum hospital encontrado
                                </p>
                            </div>
                        ) : (
                            hospitals.data.map((hospital) => (
                                <Card key={hospital.id} className="p-4 border-l-4 border-l-emerald-500 shadow-sm">
                                    <div className="flex justify-between items-center gap-4">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                                                <Building2 className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            <h3 className="font-semibold text-lg truncate leading-tight">
                                                {hospital.nome}
                                            </h3>
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <Link href={`/hospitals/${hospital.id}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive"
                                                onClick={() => deleteHospital(hospital.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                ) : (
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
                )}
            </div>
        </AppLayout>
    );
}
