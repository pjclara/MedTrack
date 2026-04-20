import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import { type FuncaoCirurgiao } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'react-toastify';

interface FuncaoCirurgiaoEditProps {
    funcao: FuncaoCirurgiao;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Funções do Cirurgião', href: '/funcoes-cirurgiao' },
    { title: 'Editar', href: '#' },
];

export default function FuncaoCirurgiaoEdit({ funcao }: FuncaoCirurgiaoEditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        nome: funcao?.nome ?? '',
    });

    useEffect(() => {
        setData('nome', funcao?.nome ?? '');
    }, [funcao]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/funcoes-cirurgiao/${funcao.id}`, {
            onSuccess: () => toast.success('Função atualizada com sucesso!'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Função do Cirurgião" />

            <div className="p-4 md:p-6">
                <div className="mb-6">
                    <Link href="/funcoes-cirurgiao">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar
                        </Button>
                    </Link>
                </div>

                <Card className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Editar Função do Cirurgião</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                                <Input
                                    id="nome"
                                    value={data.nome}
                                    onChange={(e) => setData('nome', e.target.value)}
                                    placeholder="Ex: Cirurgião Principal"
                                />
                                {errors.nome && (
                                    <p className="text-sm text-destructive">{errors.nome}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Link href="/funcoes-cirurgiao">
                                <Button variant="outline" type="button">Cancelar</Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-emerald-600 hover:bg-emerald-700"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Guardar
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
