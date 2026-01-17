import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, X, Trash2 } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type Formacao } from '@/types/formacao';
import { toast } from 'react-toastify';
import { useState, FormEventHandler } from 'react';

interface EditFormacaoProps {
    formacao: Formacao;
}

export default function EditFormacao({ formacao }: EditFormacaoProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Formações', href: '/formacoes' },
        { title: 'Editar Formação', href: '#' },
    ];

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [removeCertificado, setRemoveCertificado] = useState(false);
    const [formData, setFormData] = useState({
        titulo: formacao.titulo || '',
        descricao: formacao.descricao || '',
        tipo: formacao.tipo || '',
        data_inicio: formacao.data_inicio || '',
        data_fim: formacao.data_fim || '',
        duracao_horas: formacao.duracao_horas?.toString() || '',
        entidade_organizadora: formacao.entidade_organizadora || '',
        localizacao: formacao.localizacao || '',
        categoria: formacao.categoria || '',
        tipo_participacao: formacao.tipo_participacao || '',
        tema_apresentacao: formacao.tema_apresentacao || '',
        creditos: formacao.creditos?.toString() || '',
        observacoes: formacao.observacoes || '',
    });

    const tipos = ['Congresso', 'Workshop', 'Webinar', 'Curso', 'Conferência', 'Seminário', 'Simpósio', 'Jornadas'];
    const categorias = ['Nacional', 'Internacional', 'Regional', 'Local'];
    const tiposParticipacao = ['Participante', 'Orador', 'Organizador', 'Moderador'];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setRemoveCertificado(false);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('_method', 'PUT');
        
        // Add all form fields
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== '' && value !== null) {
                data.append(key, value.toString());
            }
        });

        // Add file removal flag
        if (removeCertificado) {
            data.append('remover_certificado', '1');
        }

        // Add new file if selected
        if (selectedFile) {
            data.append('certificado', selectedFile);
        }

        router.post(`/formacoes/${formacao.id}`, data as any, {
            onSuccess: () => {
                toast.success('Formação atualizada com sucesso!');
            },
            onError: (errors) => {
                toast.error('Erro ao atualizar formação. Verifique os dados.');
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Formação" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Editar Formação</h1>
                        <p className="text-muted-foreground">
                            Atualize as informações da formação
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Dados da Formação</CardTitle>
                            <CardDescription>Atualize as informações da formação</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Título */}
                            <div className="space-y-2">
                                <Label htmlFor="titulo">
                                    Título <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="titulo"
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                    placeholder="Título da formação"
                                    required
                                />
                            </div>

                            {/* Tipo e Categoria */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tipo">
                                        Tipo <span className="text-destructive">*</span>
                                    </Label>
                                    <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tipos.map((tipo) => (
                                                <SelectItem key={tipo} value={tipo}>
                                                    {tipo}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="categoria">Categoria</Label>
                                    <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categorias.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Datas */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="data_inicio">
                                        Data de Início <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="data_inicio"
                                        type="date"
                                        value={formData.data_inicio}
                                        onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="data_fim">Data de Fim</Label>
                                    <Input
                                        id="data_fim"
                                        type="date"
                                        value={formData.data_fim}
                                        onChange={(e) => setFormData({ ...formData, data_fim: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Duração e Créditos */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="duracao_horas">Duração (horas)</Label>
                                    <Input
                                        id="duracao_horas"
                                        type="number"
                                        min="1"
                                        value={formData.duracao_horas}
                                        onChange={(e) => setFormData({ ...formData, duracao_horas: e.target.value })}
                                        placeholder="Ex: 8"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="creditos">Créditos de Formação</Label>
                                    <Input
                                        id="creditos"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        value={formData.creditos}
                                        onChange={(e) => setFormData({ ...formData, creditos: e.target.value })}
                                        placeholder="Ex: 1.5"
                                    />
                                </div>
                            </div>

                            {/* Entidade e Localização */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="entidade_organizadora">Entidade Organizadora</Label>
                                    <Input
                                        id="entidade_organizadora"
                                        value={formData.entidade_organizadora}
                                        onChange={(e) => setFormData({ ...formData, entidade_organizadora: e.target.value })}
                                        placeholder="Nome da instituição"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="localizacao">Localização</Label>
                                    <Input
                                        id="localizacao"
                                        value={formData.localizacao}
                                        onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                                        placeholder="Cidade, País"
                                    />
                                </div>
                            </div>

                            {/* Tipo de Participação */}
                            <div className="space-y-2">
                                <Label htmlFor="tipo_participacao">Tipo de Participação</Label>
                                <Select value={formData.tipo_participacao} onValueChange={(value) => setFormData({ ...formData, tipo_participacao: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo de participação" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tiposParticipacao.map((tipo) => (
                                            <SelectItem key={tipo} value={tipo}>
                                                {tipo}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Tema da Apresentação */}
                            {(formData.tipo_participacao === 'Orador' || formData.tipo_participacao === 'Moderador') && (
                                <div className="space-y-2">
                                    <Label htmlFor="tema_apresentacao">Tema da Apresentação</Label>
                                    <Input
                                        id="tema_apresentacao"
                                        value={formData.tema_apresentacao}
                                        onChange={(e) => setFormData({ ...formData, tema_apresentacao: e.target.value })}
                                        placeholder="Tema ou título da apresentação"
                                    />
                                </div>
                            )}

                            {/* Descrição */}
                            <div className="space-y-2">
                                <Label htmlFor="descricao">Descrição</Label>
                                <Textarea
                                    id="descricao"
                                    value={formData.descricao}
                                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                    placeholder="Descrição breve da formação"
                                    rows={3}
                                />
                            </div>

                            {/* Certificado Existente */}
                            {formacao.certificado_path && !removeCertificado && (
                                <div className="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950">
                                    <Label>Certificado Atual</Label>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            {formacao.certificado_original_name} ({formacao.certificado_size_formatado})
                                        </span>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => window.open(`/formacoes/${formacao.id}/download`, '_blank')}
                                            >
                                                Ver Certificado
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => setRemoveCertificado(true)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Remover
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Novo Certificado */}
                            {(!formacao.certificado_path || removeCertificado) && (
                                <div className="space-y-2">
                                    <Label htmlFor="certificado">
                                        {removeCertificado ? 'Novo Certificado' : 'Certificado'} (PDF, JPG, PNG - Máx. 10MB)
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id="certificado"
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            className="cursor-pointer"
                                        />
                                        {selectedFile && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSelectedFile(null)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                    {selectedFile && (
                                        <p className="text-sm text-muted-foreground">
                                            Ficheiro: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                        </p>
                                    )}
                                    {removeCertificado && !selectedFile && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setRemoveCertificado(false)}
                                        >
                                            Cancelar remoção
                                        </Button>
                                    )}
                                </div>
                            )}

                            {/* Observações */}
                            <div className="space-y-2">
                                <Label htmlFor="observacoes">Observações</Label>
                                <Textarea
                                    id="observacoes"
                                    value={formData.observacoes}
                                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                                    placeholder="Observações adicionais"
                                    rows={2}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Buttons */}
                    <div className="mt-4 flex items-center justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit(`/formacoes/${formacao.id}`)}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                            <Save className="mr-2 h-4 w-4" />
                            Atualizar Formação
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
