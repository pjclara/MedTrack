import { Head, Link, usePage, router } from '@inertiajs/react';
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
import { PlusCircle, Search, Edit, Eye, User, Calendar, Hash, Stethoscope, Trash2 } from 'lucide-react';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { type Utente, type PaginatedData } from '@/types/models';
import { Input } from '@/components/ui/input';
import { formatDateToPT } from '@/utils/date-formatters';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';

interface UtenteIndexProps {
    utentes: PaginatedData<Utente>;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Utentes', href: '/utentes' },
];

export default function UtenteIndex({ utentes, filters }: UtenteIndexProps) {
    const isMobile = useIsMobile();
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.is_admin;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== (filters.search || '')) {
                router.get(
                    '/utentes',
                    { search: searchTerm },
                    { preserveState: true, preserveScroll: true, replace: true }
                );
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleDelete = (id: number, nome: string) => {
        if (confirm(`Tem a certeza que deseja remover o utente "${nome}"? Esta ação não pode ser revertida.`)) {
            router.delete(`/utentes/${id}`);
        }
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
            <Head title="Utentes" />

            <div className={`flex flex-col gap-4 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                    <div>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>Utentes</h1>
                        <p className="text-muted-foreground">
                            Gerir os utentes do sistema
                        </p>
                    </div>
                    <Link href="/utentes/create" className={isMobile ? 'w-full' : ''}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Novo Utente
                        </Button>
                    </Link>
                </div>

                <div className="mb-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Pesquisar por nome ou processo..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {isMobile ? (
                    <div className="flex flex-col gap-4">
                        {utentes.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center bg-card rounded-lg border border-dashed">
                                <User className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium text-muted-foreground">
                                    Nenhum utente encontrado
                                </p>
                            </div>
                        ) : (
                            utentes.data.map((utente) => (
                                <Card key={utente.id} className="p-4 border-l-4 border-l-emerald-500 shadow-sm">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Badge variant="outline" className="text-xs">
                                                        #{utente.processo}
                                                    </Badge>
                                                    <Badge variant={getSexoBadgeVariant(utente.sexo)} className="text-[10px] px-1.5 py-0 h-4 uppercase">
                                                        {utente.sexo}
                                                    </Badge>
                                                </div>
                                                <h3 className="font-semibold text-lg line-clamp-1 leading-tight">
                                                    {utente.nome || 'Sem Nome'}
                                                </h3>
                                            </div>
                                            <div className="flex gap-1 shrink-0 ml-2">
                                                <Link href={`/utentes/${utente.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/utentes/${utente.id}/edit`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-red-600"
                                                    onClick={() => handleDelete(utente.id, utente.nome)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground border-t pt-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 shrink-0 text-emerald-600" />
                                                <span>{formatDateToPT(utente.data_nascimento)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 justify-end">
                                                <Stethoscope className="h-4 w-4 shrink-0 text-emerald-600" />
                                                <span>{utente.registos_cirurgicos_count || 0} Cirurgias</span>
                                            </div>
                                            {isAdmin && utente.user && (
                                                <div className="flex items-center gap-2 col-span-2">
                                                    <User className="h-4 w-4 shrink-0 text-emerald-600" />
                                                    <span>Registado por: {utente.user.name}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Lista de Utentes</CardTitle>
                            <CardDescription>
                                Total de {utentes.total} utentes registados
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
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
                                                                <Button variant="ghost" size="sm" className="text-blue-600">
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="sm" 
                                                                className="text-red-600"
                                                                onClick={() => handleDelete(utente.id, utente.nome)}
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

                {utentes.last_page > 1 && (
                    <div className={`flex ${isMobile ? 'justify-center' : 'items-center justify-between' } py-4`}>
                        {!isMobile && (
                            <p className="text-sm text-muted-foreground">
                                A mostrar {utentes.from} a {utentes.to} de {utentes.total} resultados
                            </p>
                        )}
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
            </div>
        </AppLayout>
    );
}
