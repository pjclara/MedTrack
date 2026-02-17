import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { toast } from 'react-toastify';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Administração', href: '#' },
    { title: 'Tipos de Cirurgia', href: '/tipos-de-cirurgia' },
    { title: 'Novo', href: '#' },
];

export default function TipoDeCirurgiaCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/tipos-de-cirurgia', {
            onSuccess: () => toast.success('Tipo de cirurgia criado com sucesso!'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Tipo de Cirurgia" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Novo Tipo de Cirurgia</h1>
                        <p className="text-muted-foreground">
                            Adicione um novo tipo de cirurgia
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dados do Tipo de Cirurgia</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome">Nome</Label>
                                <Input
                                    id="nome"
                                    value={data.nome}
                                    onChange={(e) => setData('nome', e.target.value)}
                                    placeholder="Ex: Eletiva, Urgência, Emergência"
                                    className={errors.nome ? 'border-destructive' : ''}
                                />
                                {errors.nome && <p className="text-sm text-destructive">{errors.nome}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-4 flex justify-between">
                        <Button type="button" variant="outline" onClick={() => router.visit('/tipos-de-cirurgia')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
                            <Save className="mr-2 h-4 w-4" />
                            Guardar Tipo
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
