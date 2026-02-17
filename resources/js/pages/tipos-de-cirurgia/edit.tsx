import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle,
    CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/tipos-de-cirurgia/${tipo.id}`, {
            onSuccess: () => toast.success('Tipo de cirurgia atualizado com sucesso!'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Tipo de Cirurgia: ${tipo.nome}`} />
            
            <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
                        <Link href="/tipos-de-cirurgia">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para a lista
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Editar Tipo de Cirurgia</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
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
                                    onChange={(e) => setData('nome', e.target.value)}
                                    placeholder="Ex: Eletiva, Urgência, Emergência"
                                    className={errors.nome ? 'border-destructive' : ''}
                                />
                                {errors.nome && (
                                    <p className="text-sm text-destructive">{errors.nome}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 border-t pt-6 mt-4">
                            <Button variant="outline" asChild type="button">
                                <Link href="/tipos-de-cirurgia">Cancelar</Link>
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'A guardar...' : 'Guardar Alterações'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
