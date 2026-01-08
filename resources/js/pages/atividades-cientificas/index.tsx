import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { BookOpen, Plus, Eye, Pencil, Trash2, Download, ExternalLink } from 'lucide-react';
import { type BreadcrumbItem, type PaginatedData } from '@/types';
import { type AtividadeCientifica } from '@/types/atividade-cientifica';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Atividade Científica', href: '/atividades-cientificas' },
];

interface AtividadeIndexProps {
    atividades: PaginatedData<AtividadeCientifica>;
}

export default function AtividadeIndex({ atividades }: AtividadeIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Tem a certeza que deseja eliminar esta atividade científica?')) {
            router.delete(`/atividades-cientificas/${id}`, {
                onSuccess: () => toast.success('Atividade eliminada com sucesso!'),
                onError: () => toast.error('Erro ao eliminar atividade.'),
            });
        }
    };

    const getTipoBadgeColor = (tipo: string) => {
        switch (tipo) {
            case 'Artigo Revista':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Poster Congresso':
            case 'Comunicação Oral':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
            case 'Sessão Clínica':
            case 'Journal Club':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Atividade Científica" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Atividade Científica</h1>
                        <p className="text-muted-foreground">
                            Gestão de publicações, apresentações e atividades educacionais
                        </p>
                    </div>
                    <Link href="/atividades-cientificas/create">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Nova Atividade
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Atividades</CardTitle>
                        <CardDescription>
                            Total de {atividades.total} atividade{atividades.total !== 1 ? 's' : ''}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {atividades.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium text-muted-foreground">
                                    Ainda não existem atividades científicas registadas
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Comece por adicionar a sua primeira atividade
                                </p>
                            </div>
                        ) : (
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Título</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Data</TableHead>
                                            <TableHead>Revista/Evento</TableHead>
                                            <TableHead>Autor</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {atividades.data.map((atividade) => (
                                            <TableRow key={atividade.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        {atividade.titulo}
                                                        {atividade.ficheiro_path && (
                                                            <Download className="h-3 w-3 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={getTipoBadgeColor(atividade.tipo)}>
                                                        {atividade.tipo}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{atividade.data_formatada}</TableCell>
                                                <TableCell>{atividade.revista_conferencia || '—'}</TableCell>
                                                <TableCell>
                                                    {atividade.autor_principal && (
                                                        <Badge variant="outline">1º Autor</Badge>
                                                    )}
                                                    {!atividade.autor_principal && atividade.posicao_autor && (
                                                        <span className="text-sm text-muted-foreground">
                                                            {atividade.posicao_autor}º Autor
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {atividade.ficheiro_path && (
                                                            <Link href={`/atividades-cientificas/${atividade.id}/download`}>
                                                                <Button variant="ghost" size="sm">
                                                                    <Download className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                        )}
                                                        <Link href={`/atividades-cientificas/${atividade.id}`}>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/atividades-cientificas/${atividade.id}/edit`}>
                                                            <Button variant="ghost" size="sm">
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(atividade.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {atividades.last_page > 1 && (
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">
                                            A mostrar {atividades.from} a {atividades.to} de {atividades.total} registos
                                        </div>
                                        <div className="flex gap-2">
                                            {atividades.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    preserveScroll
                                                    className={`px-3 py-1 rounded ${
                                                        link.active
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                                                    } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
