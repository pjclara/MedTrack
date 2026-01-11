import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type ZonaAnatomica } from '@/types/models';
import { toast } from 'react-toastify';
import { FormEventHandler } from 'react';

interface ZonaAnatomicaEditProps {
    zonaAnatomica: ZonaAnatomica;
}

export default function ZonaAnatomicaEdit({ zonaAnatomica }: ZonaAnatomicaEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Administração', href: '#' },
        { title: 'Zonas Anatómicas', href: '/zona-anatomicas' },
        { title: 'Editar', href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        nome: zonaAnatomica.nome,
        descricao: zonaAnatomica.descricao || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/zona-anatomicas/${zonaAnatomica.id}`, {
            onSuccess: () => toast.success('Zona anatómica atualizada com sucesso!'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar: ${zonaAnatomica.nome}`} />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Editar Zona Anatómica</h1>
                        <p className="text-muted-foreground">
                            Atualize os dados da zona anatómica
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dados da Zona Anatómica</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome">Nome</Label>
                                <Input
                                    id="nome"
                                    value={data.nome}
                                    onChange={(e) => setData('nome', e.target.value)}
                                    placeholder="Ex: Abdomen"
                                    className={errors.nome ? 'border-destructive' : ''}
                                />
                                {errors.nome && <p className="text-sm text-destructive">{errors.nome}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="descricao">Descrição</Label>
                                <Textarea
                                    id="descricao"
                                    value={data.descricao}
                                    onChange={(e) => setData('descricao', e.target.value)}
                                    placeholder="Descrição opcional..."
                                    rows={4}
                                />
                                {errors.descricao && <p className="text-sm text-destructive">{errors.descricao}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-4 flex justify-between">
                        <Button type="button" variant="outline" onClick={() => router.visit('/zona-anatomicas')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
                            <Save className="mr-2 h-4 w-4" />
                            Atualizar Zona Anatómica
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
