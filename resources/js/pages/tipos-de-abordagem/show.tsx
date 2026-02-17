import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Edit, Crosshair } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type TipoDeAbordagem, type RegistoCirurgico } from '@/types/models';

interface TipoDeAbordagemShowProps {
    tipo: TipoDeAbordagem & {
        registos_cirurgicos_count?: number;
        registos_cirurgicos?: RegistoCirurgico[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tipos de Abordagem', href: '/tipos-de-abordagem' },
    { title: 'Detalhes', href: '#' },
];

export default function TipoDeAbordagemShow({ tipo }: TipoDeAbordagemShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tipo de Abordagem - ${tipo.nome}`} />

            <div className="p-4 md:p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <Link href="/tipos-de-abordagem">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar
                        </Button>
                    </Link>
                    <Link href={`/tipos-de-abordagem/${tipo.id}/edit`}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </Button>
                    </Link>
                </div>

                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Crosshair className="h-5 w-5 text-emerald-600" />
                            {tipo.nome}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-muted-foreground">Nome</span>
                                <p className="font-medium">{tipo.nome}</p>
                            </div>
                            {tipo.registos_cirurgicos_count !== undefined && (
                                <div>
                                    <span className="text-sm text-muted-foreground">Registos Cirúrgicos</span>
                                    <p className="font-medium">{tipo.registos_cirurgicos_count}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {tipo.registos_cirurgicos && tipo.registos_cirurgicos.length > 0 && (
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader>
                            <CardTitle>Registos Cirúrgicos Associados</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Data</TableHead>
                                        <TableHead>Utente</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tipo.registos_cirurgicos.map((registo) => (
                                        <TableRow key={registo.id}>
                                            <TableCell>{registo.data_cirurgia}</TableCell>
                                            <TableCell>{registo.utente?.nome ?? 'N/A'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
