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
import { PlusCircle, Edit, Eye, Clock, FileDown, Hospital, User, Activity, Copy } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type RegistoCirurgico, type PaginatedData } from '@/types/models';
import registosCirurgicos from '@/routes/registos-cirurgicos';
import { useIsMobile } from '@/hooks/use-mobile';

interface RegistoCirurgicoIndexProps {
    registos: PaginatedData<RegistoCirurgico>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Registos Cirúrgicos', href: '/registos-cirurgicos' },
];

export default function RegistoCirurgicoIndex({ registos }: RegistoCirurgicoIndexProps) {
    const isMobile = useIsMobile();
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('pt-PT');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registos Cirúrgicos" />

            <div className={`flex flex-col gap-4 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                    <div>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>Registos Cirúrgicos</h1>
                        <p className="text-muted-foreground">
                            Gerir os registos de cirurgias realizadas
                        </p>
                    </div>
                    <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
                        <a href={registosCirurgicos.export().url} className={isMobile ? 'flex-1' : ''}>
                            <Button variant="outline" className="w-full">
                                <FileDown className="mr-2 h-4 w-4" />
                                {isMobile ? 'Exportar' : 'Exportar Excel'}
                            </Button>
                        </a>
                        <Link href="/registos-cirurgicos/create" className={isMobile ? 'flex-1' : ''}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                {isMobile ? 'Novo' : 'Novo Registo'}
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader className={isMobile ? 'px-4 py-4' : ''}>
                        <CardTitle>Lista de Registos</CardTitle>
                        <CardDescription>
                            Total de {registos.total} registos cirúrgicos
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={isMobile ? 'px-2 pb-4' : ''}>
                        {!isMobile ? (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Data</TableHead>
                                            <TableHead>Utente</TableHead>
                                            <TableHead>Tipo Cirurgia</TableHead>
                                            <TableHead>Hospital</TableHead>
                                            <TableHead>Abordagem</TableHead>
                                            <TableHead>Registado Por</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {registos.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                                                    Nenhum registo encontrado
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            registos.data.map((registo) => (
                                                <TableRow key={registo.id}>
                                                    <TableCell className="font-medium text-nowrap">
                                                        {formatDate(registo.data_cirurgia)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {registo.utente ? (
                                                            <Link href={`/utentes/${registo.utente.id}`} className="hover:underline font-medium text-emerald-700">
                                                                {registo.utente.processo}
                                                            </Link>
                                                        ) : (
                                                            <span className="text-muted-foreground">-</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {registo.tipo_de_cirurgia?.nome || '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <Hospital className="h-3 w-3 text-muted-foreground" />
                                                            {registo.hospital || '-'}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">
                                                            {registo.tipo_de_abordagem}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {registo.user ? (
                                                            <div className="flex items-center gap-2 text-xs">
                                                                <User className="h-3 w-3" /> {registo.user.name}
                                                            </div>
                                                        ) : (
                                                            <span className="text-muted-foreground">-</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Link href={`/registos-cirurgicos/${registo.id}`}>
                                                                <Button variant="ghost" size="sm">
                                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                                </Button>
                                                            </Link>
                                                            <Link href={`/registos-cirurgicos/${registo.id}/edit`}>
                                                                <Button variant="ghost" size="sm">
                                                                    <Edit className="h-4 w-4 text-emerald-600" />
                                                                </Button>
                                                            </Link>
                                                            <Link href={`/registos-cirurgicos/create?duplicate_from=${registo.id}`}>
                                                                <Button variant="ghost" size="sm" title="Duplicar">
                                                                    <Copy className="h-4 w-4 text-blue-600" />
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
                        ) : (
                            <div className="space-y-3">
                                {registos.data.length === 0 ? (
                                    <div className="text-center py-10 text-muted-foreground border rounded-lg bg-muted/10">
                                        Nenhum registo encontrado
                                    </div>
                                ) : (
                                    registos.data.map((registo) => (
                                        <div key={registo.id} className="rounded-lg border p-4 space-y-3 active:bg-muted/50 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                                        {formatDate(registo.data_cirurgia)}
                                                    </p>
                                                    <h3 className="font-bold text-lg text-emerald-900 leading-tight">
                                                        {registo.utente?.nome || 'Utente s/ Nome'}
                                                    </h3>
                                                </div>
                                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                                    {registo.tipo_de_abordagem}
                                                </Badge>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                                    <span>{registo.tipo_de_cirurgia?.nome || '-'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Hospital className="h-4 w-4 text-muted-foreground" />
                                                    <span>{registo.hospital || '-'}</span>
                                                </div>
                                            </div>

                                            <div className="pt-2 flex justify-between items-center border-t">
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <User className="h-3 w-3" />
                                                    {registo.user?.name}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Link href={`/registos-cirurgicos/${registo.id}`}>
                                                        <Button variant="outline" size="sm" className="h-8">
                                                            <Eye className="mr-2 h-3.5 w-3.5" /> Ver
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/registos-cirurgicos/${registo.id}/edit`}>
                                                        <Button variant="secondary" size="sm" className="h-8 text-emerald-700 bg-emerald-50 hover:bg-emerald-100">
                                                            <Edit className="mr-2 h-3.5 w-3.5" /> Editar
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/registos-cirurgicos/create?duplicate_from=${registo.id}`}>
                                                        <Button variant="outline" size="sm" className="h-8 text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100">
                                                            <Copy className="mr-2 h-3.5 w-3.5" /> Duplicar
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {registos.last_page > 1 && (
                            <div className={`mt-4 flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                                <p className="text-sm text-muted-foreground text-center">
                                    A mostrar {registos.from} a {registos.to} de {registos.total} resultados
                                </p>
                                <div className={`flex gap-2 ${isMobile ? 'justify-center border-t pt-4' : ''}`}>
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
