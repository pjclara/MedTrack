import { Head, useForm, Link } from '@inertiajs/react';
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
import { type Utente } from '@/types/models';
import { FormEventHandler } from 'react';

interface UtenteEditProps {
    utente: Utente;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Utentes', href: '/utentes' },
    { title: 'Editar', href: '#' },
];

export default function UtenteEdit({ utente }: UtenteEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        nome: utente.nome,
        processo: utente.processo.toString(),
        sexo: utente.sexo,
        data_nascimento: utente.data_nascimento,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/utentes/${utente.id}`, {
            onSuccess: () => {
                toast.success('Utente atualizado com sucesso!');
            },
            onError: (errors) => {
                toast.error('Erro ao atualizar utente. Verifique os dados.');
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Utente - ${utente.nome}`} />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Editar Utente</h1>
                        <p className="text-muted-foreground">
                            Atualizar dados de {utente.nome}
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
                            Atualizar informações pessoais
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
                                            <SelectValue />
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
                                        value={data.data_nascimento ? new Date(data.data_nascimento).toISOString().split('T')[0] : ''}
                                        onChange={(e) => {
                                            const date = new Date(e.target.value);
                                            const formattedDate = date.toLocaleDateString('pt-PT', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            }).split('/').join('-');
                                            setData('data_nascimento', formattedDate);
                                        }}
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
                                <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'A guardar...' : 'Guardar Alterações'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
