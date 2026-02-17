import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tipos de Abordagem', href: '/tipos-de-abordagem' },
    { title: 'Criar', href: '#' },
];

export default function TipoDeAbordagemCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tipos-de-abordagem', {
            onSuccess: () => toast.success('Tipo de abordagem criado com sucesso!'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Tipo de Abordagem" />

            <div className="p-4 md:p-6">
                <div className="mb-6">
                    <Link href="/tipos-de-abordagem">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar
                        </Button>
                    </Link>
                </div>

                <Card className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Novo Tipo de Abordagem</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
                                <Input
                                    id="nome"
                                    value={data.nome}
                                    onChange={(e) => setData('nome', e.target.value)}
                                    placeholder="Ex: Laparoscópica"
                                />
                                {errors.nome && (
                                    <p className="text-sm text-destructive">{errors.nome}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Link href="/tipos-de-abordagem">
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
