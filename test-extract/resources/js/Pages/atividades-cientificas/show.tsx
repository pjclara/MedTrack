import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Pencil, Trash2, Download, ExternalLink, Calendar, MapPin, Users, BookOpen, Award } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type AtividadeCientifica } from '@/types/atividade-cientifica';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Atividade Científica', href: '/atividades-cientificas' },
    { title: 'Detalhes', href: '#' },
];

interface ShowAtividadeProps {
    atividade: AtividadeCientifica;
}

export default function ShowAtividade({ atividade }: ShowAtividadeProps) {
    const handleDelete = () => {
        if (confirm('Tem a certeza que deseja eliminar esta atividade científica?')) {
            router.delete(`/atividades-cientificas/${atividade.id}`, {
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
            <Head title={`Atividade: ${atividade.titulo}`} />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{atividade.titulo}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge className={getTipoBadgeColor(atividade.tipo)}>
                                {atividade.tipo}
                            </Badge>
                            {atividade.autor_principal && (
                                <Badge variant="outline">1º Autor</Badge>
                            )}
                            {atividade.categoria && (
                                <Badge variant="secondary">{atividade.categoria}</Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {atividade.ficheiro_path && (
                            <Link href={`/atividades-cientificas/${atividade.id}/download`}>
                                <Button className="bg-green-600 hover:bg-green-700">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Button>
                            </Link>
                        )}
                        <Link href={`/atividades-cientificas/${atividade.id}/edit`}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700">
                                <Pencil className="mr-2 h-4 w-4" />
                                Editar
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Coluna Principal */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações Gerais</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {atividade.descricao && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Descrição</h3>
                                        <p className="text-sm">{atividade.descricao}</p>
                                    </div>
                                )}

                                <Separator />

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                            <Calendar className="h-4 w-4" />
                                            Data
                                        </div>
                                        <p className="text-sm font-medium">{atividade.data_formatada}</p>
                                    </div>

                                    {atividade.localizacao && (
                                        <div>
                                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                                <MapPin className="h-4 w-4" />
                                                Localização
                                            </div>
                                            <p className="text-sm">{atividade.localizacao}</p>
                                        </div>
                                    )}
                                </div>

                                {atividade.revista_conferencia && (
                                    <>
                                        <Separator />
                                        <div>
                                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                                <BookOpen className="h-4 w-4" />
                                                Revista/Conferência/Evento
                                            </div>
                                            <p className="text-sm font-medium">{atividade.revista_conferencia}</p>
                                        </div>
                                    </>
                                )}

                                {atividade.autores && (
                                    <>
                                        <Separator />
                                        <div>
                                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                                                <Users className="h-4 w-4" />
                                                Autores
                                            </div>
                                            <p className="text-sm">{atividade.autores}</p>
                                            {!atividade.autor_principal && atividade.posicao_autor && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Posição: {atividade.posicao_autor}º Autor
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}

                                {atividade.observacoes && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Observações</h3>
                                            <p className="text-sm whitespace-pre-wrap">{atividade.observacoes}</p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Coluna Lateral */}
                    <div className="space-y-4">
                        {/* Dados de Publicação */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Dados de Publicação</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {atividade.doi && (
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground mb-1">DOI</p>
                                        <p className="text-sm font-mono break-all">{atividade.doi}</p>
                                    </div>
                                )}

                                {atividade.isbn && (
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground mb-1">ISBN</p>
                                        <p className="text-sm font-mono">{atividade.isbn}</p>
                                    </div>
                                )}

                                {atividade.fator_impacto && (
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                                            <Award className="h-3 w-3" />
                                            Fator de Impacto
                                        </div>
                                        <p className="text-sm font-semibold">{atividade.fator_impacto}</p>
                                    </div>
                                )}

                                {atividade.link && (
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground mb-1">Link</p>
                                        <a
                                            href={atividade.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                        >
                                            Aceder <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Ficheiro Anexo */}
                        {atividade.ficheiro_path && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Ficheiro Anexo</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                                        <Download className="h-4 w-4 text-muted-foreground" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">
                                                {atividade.ficheiro_original_name}
                                            </p>
                                            {atividade.ficheiro_size_formatado && (
                                                <p className="text-xs text-muted-foreground">
                                                    {atividade.ficheiro_size_formatado}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Link href={`/atividades-cientificas/${atividade.id}/download`}>
                                        <Button variant="outline" className="w-full" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}

                        {/* Metadados */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Metadados</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-xs text-muted-foreground">
                                <div>
                                    <p>Criado: {new Date(atividade.created_at).toLocaleString('pt-PT')}</p>
                                </div>
                                <div>
                                    <p>Atualizado: {new Date(atividade.updated_at).toLocaleString('pt-PT')}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="flex justify-start">
                    <Link href="/atividades-cientificas">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar à Lista
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
