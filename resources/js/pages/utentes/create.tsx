import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Utentes', href: '/utentes' },
    { title: 'Criar', href: '/utentes/create' },
];

export default function UtenteCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nome: '',
        processo: '',
        sexo: '' as 'Masculino' | 'Feminino' | 'Outro' | '',
        data_nascimento: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/utentes', {
            onSuccess: () => {
                reset();
                toast.success('Utente criado com sucesso!');
            },
            onError: (errors) => {
                toast.error('Erro ao criar utente. Verifique os dados.');
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar Utente" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Criar Utente</h1>
                        <p className="text-muted-foreground">
                            Adicionar novo utente ao sistema
                        </p>
                    </div>
                    <Link href="/utentes">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Dados do Utente</CardTitle>
                        <CardDescription>
                            Preencha os dados pessoais do utente
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nome">
                                        Nome Completo <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="nome"
                                        value={data.nome}
                                        onChange={(e) => setData('nome', e.target.value)}
                                        placeholder="Ex: João Silva"
                                        className={errors.nome ? 'border-destructive' : ''}
                                    />
                                    {errors.nome && (
                                        <p className="text-sm text-destructive">{errors.nome}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="processo">
                                        Número Processo <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="processo"
                                        type="number"
                                        value={data.processo}
                                        onChange={(e) => setData('processo', e.target.value)}
                                        placeholder="Ex: 123456"
                                        className={errors.processo ? 'border-destructive' : ''}
                                    />
                                    {errors.processo && (
                                        <p className="text-sm text-destructive">{errors.processo}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sexo">
                                        Sexo <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={data.sexo}
                                        onValueChange={(value) => setData('sexo', value as typeof data.sexo)}
                                    >
                                        <SelectTrigger className={errors.sexo ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Selecione o sexo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Masculino">Masculino</SelectItem>
                                            <SelectItem value="Feminino">Feminino</SelectItem>
                                            <SelectItem value="Outro">Outro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.sexo && (
                                        <p className="text-sm text-destructive">{errors.sexo}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="data_nascimento">
                                        Data de Nascimento <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="data_nascimento"
                                        type="date"
                                        value={data.data_nascimento}
                                        onChange={(e) => setData('data_nascimento', e.target.value)}
                                        className={errors.data_nascimento ? 'border-destructive' : ''}
                                    />
                                    {errors.data_nascimento && (
                                        <p className="text-sm text-destructive">{errors.data_nascimento}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link href="/utentes">
                                    <Button type="button" variant="outline">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'A guardar...' : 'Guardar'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
