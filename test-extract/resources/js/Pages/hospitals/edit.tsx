import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { toast } from 'react-toastify';
import { FormEventHandler } from 'react';

interface Hospital {
    id: number;
    nome: string;
}

interface HospitalEditProps {
    hospital: Hospital;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Administração', href: '#' },
    { title: 'Hospitais de Origem', href: '/hospitals' },
    { title: 'Editar', href: '#' },
];

export default function HospitalEdit({ hospital }: HospitalEditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        nome: hospital.nome,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(`/hospitals/${hospital.id}`, {
            onSuccess: () => toast.success('Hospital de origem atualizado com sucesso!'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Hospital de Origem" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Editar Hospital de Origem</h1>
                        <p className="text-muted-foreground">
                            Atualize os dados do hospital de origem
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dados do Hospital</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome">Nome</Label>
                                <Input
                                    id="nome"
                                    value={data.nome}
                                    onChange={(e) => setData('nome', e.target.value)}
                                    placeholder="Ex: Hospital de Santa Maria"
                                    className={errors.nome ? 'border-destructive' : ''}
                                />
                                {errors.nome && <p className="text-sm text-destructive">{errors.nome}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-4 flex justify-between">
                        <Button type="button" variant="outline" onClick={() => router.visit('/hospitals')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
                            <Save className="mr-2 h-4 w-4" />
                            Atualizar Hospital
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
