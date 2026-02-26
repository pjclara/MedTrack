import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { TipoDeCirurgia } from '@/types/models';

interface TipoDeCirurgiaEditProps {
    tipo: TipoDeCirurgia;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Administração', href: '#' },
    { title: 'Tipos de Cirurgia', href: '/tipos-de-cirurgia' },
    { title: 'Editar', href: '#' },
];

export default function TipoDeCirurgiaEdit({ tipo }: TipoDeCirurgiaEditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        nome: tipo.nome,
    });

    // If the `tipo` prop is delivered after the component mounts, ensure the form
    // state is synced so the input isn't left empty.
    useEffect(() => {
        setData('nome', tipo?.nome ?? '');
        console.log('Tipo de Cirurgia recebido:', tipo);
    }, [tipo]);
        console.log('Tipo de Cirurgia recebido:', tipo);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/tipos-de-cirurgia/${tipo.id}`, {
            onSuccess: () =>
                toast.success('Tipo de cirurgia atualizado com sucesso!'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Tipo de Cirurgia: ${tipo.nome}`} />

            <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        asChild
                        className="pl-0 hover:bg-transparent"
                    >
                        <Link href="/tipos-de-cirurgia">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para a lista
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Editar Tipo de Cirurgia
                        </CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Atualize os dados do tipo de cirurgia.
                        </p>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome">Nome do Tipo</Label>
                                <Input
                                    id="nome"
                                    value={data.nome}
                                    onChange={(e) =>
                                        setData('nome', e.target.value)
                                    }
                                    placeholder="Ex: Eletiva, Urgência, Emergência"
                                    className={
                                        errors.nome ? 'border-destructive' : ''
                                    }
                                />
                                {errors.nome && (
                                    <p className="text-sm text-destructive">
                                        {errors.nome}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="mt-4 flex justify-end gap-2 border-t pt-6">
                            <Button variant="outline" asChild type="button">
                                <Link href="/tipos-de-cirurgia">Cancelar</Link>
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-emerald-600 hover:bg-emerald-700"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {processing
                                    ? 'A guardar...'
                                    : 'Guardar Alterações'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
