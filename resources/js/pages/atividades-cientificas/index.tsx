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
import { BookOpen, Plus, Eye, Pencil, Trash2, Download, ExternalLink, FileDown, User, Calendar, Tag, Lightbulb } from 'lucide-react';
import { type BreadcrumbItem, type PaginatedData } from '@/types';
import { type AtividadeCientifica } from '@/types/atividades-cientificas/atividade-cientifica';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';
import atividadesCientificas from '@/routes/atividades-cientificas';
import { useIsMobile } from '@/hooks/use-mobile';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Atividade Científica', href: '/atividades-cientificas' },
];

interface AtividadeIndexProps {
    atividades: PaginatedData<AtividadeCientifica>;
}

export default function AtividadeIndex({ atividades }: AtividadeIndexProps) {
    const isMobile = useIsMobile();
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

            <div className={`flex flex-col gap-4 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                    <div>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>Atividade Científica</h1>
                        <p className="text-muted-foreground">
                            Gestão de publicações, apresentações e atividades educacionais
                        </p>
                    </div>
                    <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
                        <a href={atividadesCientificas.export().url} className={isMobile ? 'flex-1' : ''}>
                            <Button variant="outline" className="w-full">
                                <FileDown className="mr-2 h-4 w-4" />
                                {isMobile ? 'Exportar' : 'Exportar Excel'}
                            </Button>
                        </a>
                        <Link href="/atividades-cientificas/create" className={isMobile ? 'flex-1' : ''}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                                <Plus className="mr-2 h-4 w-4" />
                                {isMobile ? 'Nova' : 'Nova Atividade'}
                            </Button>
                        </Link>
                    </div>
                </div>

                {isMobile ? (
                    <div className="flex flex-col gap-4">
                        {atividades.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center bg-card rounded-lg border border-dashed">
                                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium text-muted-foreground">
                                    Não existem atividades registadas
                                </p>
                            </div>
                        ) : (
                            atividades.data.map((atividade) => (
                                <Card key={atividade.id} className="p-4 border-l-4 border-l-emerald-500 shadow-sm">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 min-w-0">
                                                <Badge className={`${getTipoBadgeColor(atividade.tipo)} mb-1`}>
                                                    {atividade.tipo}
                                                </Badge>
                                                <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
                                                    {atividade.titulo}
                                                </h3>
                                            </div>
                                            <div className="flex gap-1 shrink-0 ml-2">
                                                <Link href={`/atividades-cientificas/${atividade.id}/edit`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive"
                                                    onClick={() => handleDelete(atividade.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1.5 text-sm text-muted-foreground border-t pt-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 shrink-0 text-emerald-600" />
                                                <span>{atividade.data_formatada}</span>
                                            </div>
                                            {atividade.revista_conferencia && (
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="h-4 w-4 shrink-0 text-emerald-600" />
                                                    <span className="truncate">{atividade.revista_conferencia}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 shrink-0 text-emerald-600" />
                                                <span>
                                                    {atividade.autor_principal ? '1º Autor' : `${atividade.posicao_autor}º Autor`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                        
                        {atividades.last_page > 1 && (
                            <div className="flex justify-center mt-2 overflow-x-auto pb-2">
                                <div className="flex gap-1">
                                    {atividades.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveScroll
                                            className={`px-2 py-1 text-xs rounded ${
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
                    </div>
                ) : (
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
                                                                    <Button variant="ghost" size="sm" title="Download">
                                                                        <Download className="h-4 w-4" />
                                                                    </Button>
                                                                </Link>
                                                            )}
                                                            <Link href={`/atividades-cientificas/${atividade.id}`}>
                                                                <Button variant="ghost" size="sm" title="Ver Detalhes">
                                                                    <Eye className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            <Link href={`/atividades-cientificas/${atividade.id}/edit`}>
                                                                <Button variant="ghost" size="sm" title="Editar">
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                title="Eliminar"
                                                                onClick={() => handleDelete(atividade.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4 text-destructive" />
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
                )}
            </div>
        </AppLayout>
    );
}
