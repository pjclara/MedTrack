import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { toast } from 'react-toastify';
import { useState, FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Atividade Científica', href: '/atividades-cientificas' },
    { title: 'Nova Atividade', href: '#' },
];

interface CreateAtividadeProps {
    tipos: string[];
    categorias: string[];
}

export default function CreateAtividade({ tipos = [], categorias = [] }: CreateAtividadeProps) {
    const { data, setData, post, processing, errors } = useForm({
        titulo: '',
        descricao: '',
        tipo: '',
        data: '',
        revista_conferencia: '',
        localizacao: '',
        categoria: '',
        autores: '',
        autor_principal: false,
        posicao_autor: '',
        doi: '',
        isbn: '',
        link: '',
        fator_impacto: '',
        observacoes: '',
        ficheiro: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('ficheiro', e.target.files[0]);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/atividades-cientificas', {
            onSuccess: () => {
                toast.success('Atividade científica criada com sucesso!');
            },
            onError: (errors) => {
                toast.error('Erro ao criar atividade. Verifique os dados.');
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova Atividade Científica" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Nova Atividade Científica</h1>
                        <p className="text-muted-foreground">
                            Registe uma nova publicação, apresentação ou atividade educacional
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Dados da Atividade</CardTitle>
                            <CardDescription>Preencha as informações da atividade científica</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Título */}
                            <div className="space-y-2">
                                <Label htmlFor="titulo">
                                    Título <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="titulo"
                                    value={data.titulo}
                                    onChange={(e) => setData('titulo', e.target.value)}
                                    placeholder="Título da atividade"
                                    className={errors.titulo ? 'border-destructive' : ''}
                                />
                                {errors.titulo && <p className="text-sm text-destructive">{errors.titulo}</p>}
                            </div>

                            {/* Tipo e Data */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tipo">
                                        Tipo <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={data.tipo}
                                        onValueChange={(value) => setData('tipo', value)}
                                    >
                                        <SelectTrigger className={errors.tipo ? 'border-destructive' : ''}>
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
                                    {errors.tipo && <p className="text-sm text-destructive">{errors.tipo}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="data">
                                        Data <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="data"
                                        type="date"
                                        value={data.data}
                                        onChange={(e) => setData('data', e.target.value)}
                                        className={errors.data ? 'border-destructive' : ''}
                                    />
                                    {errors.data && <p className="text-sm text-destructive">{errors.data}</p>}
                                </div>
                            </div>

                            {/* Descrição */}
                            <div className="space-y-2">
                                <Label htmlFor="descricao">Descrição</Label>
                                <Textarea
                                    id="descricao"
                                    value={data.descricao}
                                    onChange={(e) => setData('descricao', e.target.value)}
                                    placeholder="Breve descrição da atividade..."
                                    rows={3}
                                    className={errors.descricao ? 'border-destructive' : ''}
                                />
                                {errors.descricao && <p className="text-sm text-destructive">{errors.descricao}</p>}
                            </div>

                            {/* Revista/Conferência e Localização */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="revista_conferencia">Revista/Conferência/Evento</Label>
                                    <Input
                                        id="revista_conferencia"
                                        value={data.revista_conferencia}
                                        onChange={(e) => setData('revista_conferencia', e.target.value)}
                                        placeholder="Nome da revista ou evento"
                                        className={errors.revista_conferencia ? 'border-destructive' : ''}
                                    />
                                    {errors.revista_conferencia && <p className="text-sm text-destructive">{errors.revista_conferencia}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="localizacao">Localização</Label>
                                    <Input
                                        id="localizacao"
                                        value={data.localizacao}
                                        onChange={(e) => setData('localizacao', e.target.value)}
                                        placeholder="Cidade, País"
                                        className={errors.localizacao ? 'border-destructive' : ''}
                                    />
                                    {errors.localizacao && <p className="text-sm text-destructive">{errors.localizacao}</p>}
                                </div>
                            </div>

                            {/* Categoria */}
                            <div className="space-y-2">
                                <Label htmlFor="categoria">Categoria</Label>
                                <Select
                                    value={data.categoria}
                                    onValueChange={(value) => setData('categoria', value)}
                                >
                                    <SelectTrigger className={errors.categoria ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Selecione a categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(categorias || []).map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.categoria && <p className="text-sm text-destructive">{errors.categoria}</p>}
                            </div>

                            {/* Autores */}
                            <div className="space-y-2">
                                <Label htmlFor="autores">Autores</Label>
                                <Textarea
                                    id="autores"
                                    value={data.autores}
                                    onChange={(e) => setData('autores', e.target.value)}
                                    placeholder="Lista de autores separados por vírgula"
                                    rows={2}
                                    className={errors.autores ? 'border-destructive' : ''}
                                />
                                {errors.autores && <p className="text-sm text-destructive">{errors.autores}</p>}
                            </div>

                            {/* Autor Principal e Posição */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="autor_principal"
                                        checked={data.autor_principal}
                                        onCheckedChange={(checked) => 
                                            setData('autor_principal', checked as boolean)
                                        }
                                    />
                                    <Label htmlFor="autor_principal" className="cursor-pointer">
                                        Autor Principal (1º Autor)
                                    </Label>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="posicao_autor">Posição do Autor</Label>
                                    <Input
                                        id="posicao_autor"
                                        type="number"
                                        min="1"
                                        value={data.posicao_autor}
                                        onChange={(e) => setData('posicao_autor', e.target.value)}
                                        placeholder="Ex: 2, 3, 4..."
                                        className={errors.posicao_autor ? 'border-destructive' : ''}
                                    />
                                    {errors.posicao_autor && <p className="text-sm text-destructive">{errors.posicao_autor}</p>}
                                </div>
                            </div>

                            {/* DOI, ISBN, Link */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="doi">DOI</Label>
                                    <Input
                                        id="doi"
                                        value={data.doi}
                                        onChange={(e) => setData('doi', e.target.value)}
                                        placeholder="10.1000/xyz123"
                                        className={errors.doi ? 'border-destructive' : ''}
                                    />
                                    {errors.doi && <p className="text-sm text-destructive">{errors.doi}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="isbn">ISBN</Label>
                                    <Input
                                        id="isbn"
                                        value={data.isbn}
                                        onChange={(e) => setData('isbn', e.target.value)}
                                        placeholder="978-3-16-148410-0"
                                        className={errors.isbn ? 'border-destructive' : ''}
                                    />
                                    {errors.isbn && <p className="text-sm text-destructive">{errors.isbn}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fator_impacto">Fator de Impacto</Label>
                                    <Input
                                        id="fator_impacto"
                                        type="number"
                                        step="0.001"
                                        min="0"
                                        value={data.fator_impacto}
                                        onChange={(e) => setData('fator_impacto', e.target.value)}
                                        placeholder="Ex: 5.234"
                                        className={errors.fator_impacto ? 'border-destructive' : ''}
                                    />
                                    {errors.fator_impacto && <p className="text-sm text-destructive">{errors.fator_impacto}</p>}
                                </div>
                            </div>

                            {/* Link */}
                            <div className="space-y-2">
                                <Label htmlFor="link">Link/URL</Label>
                                <Input
                                    id="link"
                                    type="url"
                                    value={data.link}
                                    onChange={(e) => setData('link', e.target.value)}
                                    placeholder="https://..."
                                    className={errors.link ? 'border-destructive' : ''}
                                />
                                {errors.link && <p className="text-sm text-destructive">{errors.link}</p>}
                            </div>

                            {/* Upload de Ficheiro */}
                            <div className="space-y-2">
                                <Label htmlFor="ficheiro">Ficheiro Anexo</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="ficheiro"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                                        className={`cursor-pointer ${errors.ficheiro ? 'border-destructive' : ''}`}
                                    />
                                    {data.ficheiro && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setData('ficheiro', null)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                {errors.ficheiro && <p className="text-sm text-destructive">{errors.ficheiro}</p>}
                                {data.ficheiro && (
                                    <p className="text-sm text-muted-foreground">
                                        Ficheiro: {data.ficheiro.name} ({(data.ficheiro.size / 1024 / 1024).toFixed(2)} MB)
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    Formatos aceites: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG (máx. 10MB)
                                </p>
                            </div>

                            {/* Observações */}
                            <div className="space-y-2">
                                <Label htmlFor="observacoes">Observações</Label>
                                <Textarea
                                    id="observacoes"
                                    value={data.observacoes}
                                    onChange={(e) => setData('observacoes', e.target.value)}
                                    placeholder="Notas adicionais..."
                                    rows={3}
                                    className={errors.observacoes ? 'border-destructive' : ''}
                                />
                                {errors.observacoes && <p className="text-sm text-destructive">{errors.observacoes}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Botões de Ação */}
                    <div className="flex justify-between gap-2 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit('/atividades-cientificas')}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Cancelar
                        </Button>

                        <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'A guardar...' : 'Guardar Atividade'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
