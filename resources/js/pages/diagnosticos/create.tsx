import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { BreadcrumbItem, Especialidade } from '@/types';
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
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';

interface DiagnosticoCreateProps {
    especialidades: Especialidade[];
    tipos: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administração',
        href: '#',
    },
    {
        title: 'Diagnósticos',
        href: '/diagnosticos',
    },
    {
        title: 'Novo',
        href: '/diagnosticos/create',
    },
];

export default function DiagnosticoCreate({ especialidades, tipos }: DiagnosticoCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        especialidade: '',
        tipo: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/diagnosticos');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Diagnóstico" />
            
            <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
                        <Link href="/diagnosticos">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para a lista
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Novo Diagnóstico</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Adicione um novo diagnóstico ao catálogo.
                        </p>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="especialidade">Especialidade</Label>
                                <Select 
                                    value={data.especialidade} 
                                    onValueChange={(value) => setData('especialidade', value)}
                                >
                                    <SelectTrigger id="especialidade" className={errors.especialidade ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Selecione uma especialidade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(especialidades || []).map((especialidade) => (
                                            <SelectItem key={especialidade.id} value={especialidade.nome}>
                                                {especialidade.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.especialidade && (
                                    <p className="text-sm text-destructive">{errors.especialidade}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tipo">Classificação</Label>
                                <Select 
                                    value={data.tipo} 
                                    onValueChange={(value) => setData('tipo', value)}
                                >
                                    <SelectTrigger id="tipo" className={errors.tipo ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Selecione o tipo (Benigno/Maligno)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(tipos || []).map((tipo) => (
                                            <SelectItem key={tipo} value={tipo}>
                                                {tipo}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.tipo && (
                                    <p className="text-sm text-destructive">{errors.tipo}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nome">Nome do Diagnóstico</Label>
                                <Input
                                    id="nome"
                                    value={data.nome}
                                    onChange={(e) => setData('nome', e.target.value)}
                                    placeholder="Ex: Colecistite Aguda"
                                    className={errors.nome ? 'border-destructive' : ''}
                                />
                                {errors.nome && (
                                    <p className="text-sm text-destructive">{errors.nome}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 border-t pt-6 mt-4">
                            <Button variant="outline" asChild type="button">
                                <Link href="/diagnosticos">Cancelar</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'A guardar...' : 'Guardar Diagnóstico'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
