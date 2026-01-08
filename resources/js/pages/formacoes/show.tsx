import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
    BookOpen, 
    Calendar, 
    MapPin, 
    Building2, 
    Clock,
    Award,
    FileText,
    Download,
    Edit,
    Trash2,
    User,
    Presentation
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type Formacao } from '@/types/formacao';
import { toast } from 'react-toastify';

interface ShowFormacaoProps {
    formacao: Formacao;
}

export default function ShowFormacao({ formacao }: ShowFormacaoProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Formações', href: '/formacoes' },
        { title: formacao.titulo, href: '#' },
    ];

    const handleDelete = () => {
        if (confirm('Tem a certeza que deseja eliminar esta formação?')) {
            router.delete(`/formacoes/${formacao.id}`, {
                onSuccess: () => {
                    toast.success('Formação eliminada com sucesso!');
                    router.visit('/formacoes');
                },
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
            <Head title={formacao.titulo} />

            <div className="flex flex-col gap-4 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <Badge className={getTipoBadgeColor(formacao.tipo)}>
                                {formacao.tipo}
                            </Badge>
                            {formacao.categoria && (
                                <Badge variant="outline">{formacao.categoria}</Badge>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">
                            {formacao.titulo}
                        </h1>
                        {formacao.entidade_organizadora && (
                            <p className="text-muted-foreground flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                {formacao.entidade_organizadora}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/formacoes/${formacao.id}/edit`}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700">
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações Gerais</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Período */}
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="font-medium text-sm text-muted-foreground">Período</p>
                                        <p>{formacao.periodo_formatado}</p>
                                    </div>
                                </div>

                                <Separator />

                                {/* Localização */}
                                {formacao.localizacao && (
                                    <>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="font-medium text-sm text-muted-foreground">Localização</p>
                                                <p>{formacao.localizacao}</p>
                                            </div>
                                        </div>
                                        <Separator />
                                    </>
                                )}

                                {/* Duração */}
                                {formacao.duracao_horas && (
                                    <>
                                        <div className="flex items-start gap-3">
                                            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="font-medium text-sm text-muted-foreground">Duração</p>
                                                <p>{formacao.duracao_horas} horas</p>
                                            </div>
                                        </div>
                                        <Separator />
                                    </>
                                )}

                                {/* Créditos */}
                                {formacao.creditos && (
                                    <>
                                        <div className="flex items-start gap-3">
                                            <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="font-medium text-sm text-muted-foreground">Créditos de Formação</p>
                                                <p>{formacao.creditos} créditos</p>
                                            </div>
                                        </div>
                                        <Separator />
                                    </>
                                )}

                                {/* Descrição */}
                                {formacao.descricao && (
                                    <>
                                        <div className="flex items-start gap-3">
                                            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div className="flex-1">
                                                <p className="font-medium text-sm text-muted-foreground mb-1">Descrição</p>
                                                <p className="text-sm whitespace-pre-wrap">{formacao.descricao}</p>
                                            </div>
                                        </div>
                                        <Separator />
                                    </>
                                )}

                                {/* Observações */}
                                {formacao.observacoes && (
                                    <div className="flex items-start gap-3">
                                        <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-muted-foreground mb-1">Observações</p>
                                            <p className="text-sm whitespace-pre-wrap">{formacao.observacoes}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Participação */}
                        {formacao.tipo_participacao && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Participação</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium text-sm text-muted-foreground">Tipo de Participação</p>
                                            <p className="text-sm">{formacao.tipo_participacao}</p>
                                        </div>
                                    </div>

                                    {formacao.tema_apresentacao && (
                                        <>
                                            <Separator />
                                            <div className="flex items-start gap-3">
                                                <Presentation className="h-5 w-5 text-muted-foreground mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-sm text-muted-foreground">Tema da Apresentação</p>
                                                    <p className="text-sm">{formacao.tema_apresentacao}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Certificado */}
                        {formacao.certificado_path && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Certificado</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Ficheiro</p>
                                            <p className="text-sm">{formacao.certificado_original_name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formacao.certificado_size_formatado}
                                            </p>
                                        </div>
                                        <Button
                                            className="w-full bg-emerald-600 hover:bg-emerald-700"
                                            onClick={() => window.open(`/formacoes/${formacao.id}/download`, '_blank')}
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Certificado
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Metadata */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Metadata</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Criado em</p>
                                    <p>{new Date(formacao.created_at).toLocaleDateString('pt-PT')}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Última atualização</p>
                                    <p>{new Date(formacao.updated_at).toLocaleDateString('pt-PT')}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Back Button */}
                <div className="flex justify-start">
                    <Link href="/formacoes">
                        <Button variant="outline">
                            Voltar à lista
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
