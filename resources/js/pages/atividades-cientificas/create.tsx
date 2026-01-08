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

export default function CreateAtividade({ tipos, categorias }: CreateAtividadeProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
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
    });

    const { post, processing } = useForm();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const data = new FormData();
        
        // Add all form fields
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== '' && value !== null) {
                data.append(key, value.toString());
            }
        });

        // Add file if selected
        if (selectedFile) {
            data.append('ficheiro', selectedFile);
        }

        router.post('/atividades-cientificas', data as any, {
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
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                    placeholder="Título da atividade"
                                    required
                                />
                            </div>

                            {/* Tipo e Data */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tipo">
                                        Tipo <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.tipo}
                                        onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                                    >
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
                                    <Label htmlFor="data">
                                        Data <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="data"
                                        type="date"
                                        value={formData.data}
                                        onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Descrição */}
                            <div className="space-y-2">
                                <Label htmlFor="descricao">Descrição</Label>
                                <Textarea
                                    id="descricao"
                                    value={formData.descricao}
                                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                    placeholder="Breve descrição da atividade..."
                                    rows={3}
                                />
                            </div>

                            {/* Revista/Conferência e Localização */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="revista_conferencia">Revista/Conferência/Evento</Label>
                                    <Input
                                        id="revista_conferencia"
                                        value={formData.revista_conferencia}
                                        onChange={(e) => setFormData({ ...formData, revista_conferencia: e.target.value })}
                                        placeholder="Nome da revista ou evento"
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

                            {/* Categoria */}
                            <div className="space-y-2">
                                <Label htmlFor="categoria">Categoria</Label>
                                <Select
                                    value={formData.categoria}
                                    onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                                >
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

                            {/* Autores */}
                            <div className="space-y-2">
                                <Label htmlFor="autores">Autores</Label>
                                <Textarea
                                    id="autores"
                                    value={formData.autores}
                                    onChange={(e) => setFormData({ ...formData, autores: e.target.value })}
                                    placeholder="Lista de autores separados por vírgula"
                                    rows={2}
                                />
                            </div>

                            {/* Autor Principal e Posição */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="autor_principal"
                                        checked={formData.autor_principal}
                                        onCheckedChange={(checked) => 
                                            setFormData({ ...formData, autor_principal: checked as boolean })
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
                                        value={formData.posicao_autor}
                                        onChange={(e) => setFormData({ ...formData, posicao_autor: e.target.value })}
                                        placeholder="Ex: 2, 3, 4..."
                                    />
                                </div>
                            </div>

                            {/* DOI, ISBN, Link */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="doi">DOI</Label>
                                    <Input
                                        id="doi"
                                        value={formData.doi}
                                        onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                                        placeholder="10.1000/xyz123"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="isbn">ISBN</Label>
                                    <Input
                                        id="isbn"
                                        value={formData.isbn}
                                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                                        placeholder="978-3-16-148410-0"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fator_impacto">Fator de Impacto</Label>
                                    <Input
                                        id="fator_impacto"
                                        type="number"
                                        step="0.001"
                                        min="0"
                                        value={formData.fator_impacto}
                                        onChange={(e) => setFormData({ ...formData, fator_impacto: e.target.value })}
                                        placeholder="Ex: 5.234"
                                    />
                                </div>
                            </div>

                            {/* Link */}
                            <div className="space-y-2">
                                <Label htmlFor="link">Link/URL</Label>
                                <Input
                                    id="link"
                                    type="url"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    placeholder="https://..."
                                />
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
                                <p className="text-sm text-muted-foreground">
                                    Formatos aceites: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG (máx. 10MB)
                                </p>
                            </div>

                            {/* Observações */}
                            <div className="space-y-2">
                                <Label htmlFor="observacoes">Observações</Label>
                                <Textarea
                                    id="observacoes"
                                    value={formData.observacoes}
                                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                                    placeholder="Notas adicionais..."
                                    rows={3}
                                />
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
