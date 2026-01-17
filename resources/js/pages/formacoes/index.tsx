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
import { BookOpen, Plus, Eye, Pencil, Trash2, Download, Calendar, FileDown } from 'lucide-react';
import { type BreadcrumbItem, type PaginatedData } from '@/types';
import { type Formacao } from '@/types/formacoes/formacao';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';
import formacoesRoutes from '@/routes/formacoes';
import { useIsMobile } from '@/hooks/use-mobile';
import { Building2, Clock, Award } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Formações', href: '/formacoes' },
];

interface FormacaoIndexProps {
    formacoes: PaginatedData<Formacao>;
}

export default function FormacaoIndex({ formacoes }: FormacaoIndexProps) {
    const isMobile = useIsMobile();
    const handleDelete = (id: number) => {
        if (confirm('Tem a certeza que deseja eliminar esta formação?')) {
            router.delete(`/formacoes/${id}`, {
                onSuccess: () => toast.success('Formação eliminada com sucesso!'),
                onError: () => toast.error('Erro ao eliminar formação.'),
            });
        }
    };

    const getTipoBadgeColor = (tipo: string) => {
        switch (tipo) {
            case 'Congresso':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Workshop':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
            case 'Curso':
                return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'Webinar':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
            case 'Conferência':
                return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400';
            case 'Seminário':
                return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Formações" />

            <div className={`flex flex-col gap-4 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                    <div>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>Formações</h1>
                        <p className="text-muted-foreground">
                            Gestão de congressos, workshops, cursos e certificados
                        </p>
                    </div>
                    <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
                        <a href={formacoesRoutes.export().url} className={isMobile ? 'flex-1' : ''}>
                            <Button variant="outline" className="w-full">
                                <FileDown className="mr-2 h-4 w-4" />
                                {isMobile ? 'Exportar' : 'Exportar Excel'}
                            </Button>
                        </a>
                        <Link href="/formacoes/create" className={isMobile ? 'flex-1' : ''}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                                <Plus className="mr-2 h-4 w-4" />
                                {isMobile ? 'Nova' : 'Nova Formação'}
                            </Button>
                        </Link>
                    </div>
                </div>

                {isMobile ? (
                    <div className="flex flex-col gap-4">
                        {formacoes.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center bg-card rounded-lg border border-dashed">
                                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium text-muted-foreground">
                                    Não existem formações registadas
                                </p>
                            </div>
                        ) : (
                            formacoes.data.map((formacao) => (
                                <Card key={formacao.id} className="p-4 border-l-4 border-l-emerald-500 shadow-sm">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 min-w-0">
                                                <Badge className={`${getTipoBadgeColor(formacao.tipo)} mb-1`}>
                                                    {formacao.tipo}
                                                </Badge>
                                                <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
                                                    {formacao.titulo}
                                                </h3>
                                            </div>
                                            <div className="flex gap-1 shrink-0 ml-2">
                                                <Link href={`/formacoes/${formacao.id}/edit`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive"
                                                    onClick={() => handleDelete(formacao.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1.5 text-sm text-muted-foreground border-t pt-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 shrink-0 text-emerald-600" />
                                                <span>{formacao.periodo_formatado}</span>
                                            </div>
                                            {formacao.entidade_organizadora && (
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="h-4 w-4 shrink-0 text-emerald-600" />
                                                    <span className="truncate">{formacao.entidade_organizadora}</span>
                                                </div>
                                            )}
                                            <div className="flex gap-4">
                                                {formacao.duracao_horas && (
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 shrink-0 text-emerald-600" />
                                                        <span>{formacao.duracao_horas}h</span>
                                                    </div>
                                                )}
                                                {formacao.creditos && (
                                                    <div className="flex items-center gap-2">
                                                        <Award className="h-4 w-4 shrink-0 text-emerald-600" />
                                                        <span>{formacao.creditos} Créditos</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                        
                        {formacoes.last_page > 1 && (
                            <div className="flex justify-center mt-2">
                                <div className="flex gap-2">
                                    {formacoes.current_page > 1 && (
                                        <Link href={`/formacoes?page=${formacoes.current_page - 1}`}>
                                            <Button variant="outline" size="sm">Anterior</Button>
                                        </Link>
                                    )}
                                    {formacoes.current_page < formacoes.last_page && (
                                        <Link href={`/formacoes?page=${formacoes.current_page + 1}`}>
                                            <Button variant="outline" size="sm">Seguinte</Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Lista de Formações</CardTitle>
                            <CardDescription>
                                Total de {formacoes.total} formação{formacoes.total !== 1 ? 'ões' : ''}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {formacoes.data.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-lg font-medium text-muted-foreground">
                                        Ainda não existem formações registadas
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Comece por adicionar a sua primeira formação
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Título</TableHead>
                                                <TableHead>Tipo</TableHead>
                                                <TableHead>Período</TableHead>
                                                <TableHead>Duração</TableHead>
                                                <TableHead>Créditos</TableHead>
                                                <TableHead className="text-right">Ações</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {formacoes.data.map((formacao: Formacao) => (
                                                <TableRow key={formacao.id}>
                                                    <TableCell className="font-medium">
                                                        <div className="flex flex-col">
                                                            <span>{formacao.titulo}</span>
                                                            {formacao.entidade_organizadora && (
                                                                <span className="text-sm text-muted-foreground">
                                                                    {formacao.entidade_organizadora}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={getTipoBadgeColor(formacao.tipo)}>
                                                            {formacao.tipo}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <span>{formacao.periodo_formatado}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {formacao.duracao_horas ? `${formacao.duracao_horas}h` : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formacao.creditos ? `${formacao.creditos}` : '-'}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {formacao.certificado_path && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        window.open(
                                                                            `/formacoes/${formacao.id}/download`,
                                                                            '_blank'
                                                                        )
                                                                    }
                                                                    title="Download Certificado"
                                                                >
                                                                    <Download className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                            <Link href={`/formacoes/${formacao.id}`}>
                                                                <Button variant="ghost" size="sm" title="Ver">
                                                                    <Eye className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            <Link href={`/formacoes/${formacao.id}/edit`}>
                                                                <Button variant="ghost" size="sm" title="Editar">
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDelete(formacao.id)}
                                                                title="Eliminar"
                                                            >
                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                    {formacoes.last_page > 1 && (
                                        <div className="mt-4 flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground">
                                                A mostrar {formacoes.from} a {formacoes.to} de{' '}
                                                {formacoes.total} resultados
                                            </p>
                                            <div className="flex gap-2">
                                                {formacoes.current_page > 1 && (
                                                    <Link href={`/formacoes?page=${formacoes.current_page - 1}`}>
                                                        <Button variant="outline" size="sm">
                                                            Anterior
                                                        </Button>
                                                    </Link>
                                                )}
                                                {formacoes.current_page < formacoes.last_page && (
                                                    <Link href={`/formacoes?page=${formacoes.current_page + 1}`}>
                                                        <Button variant="outline" size="sm">
                                                            Seguinte
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
            </div>
        </AppLayout>
    );
}
