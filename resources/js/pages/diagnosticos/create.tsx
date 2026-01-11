import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { BreadcrumbItem, ZonaAnatomica } from '@/types';
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
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { QuickAddZonaAnatomica } from '@/components/quick-add/QuickAddDialogs';

interface DiagnosticoCreateProps {
    zonaAnatomicas: ZonaAnatomica[];
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

export default function DiagnosticoCreate({ tipos, zonaAnatomicas }: DiagnosticoCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        zona_anatomica: '',
        tipo: '',
        descricao: '',
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
                                <Label htmlFor="nome">Nome do Diagnóstico</Label>
                                <Input 
                                    id="nome" 
                                    value={data.nome} 
                                    onChange={(e) => setData('nome', e.target.value)}
                                    placeholder="Ex: Apendicite Aguda"
                                    className={errors.nome ? 'border-destructive' : ''}
                                />
                                {errors.nome && (
                                    <p className="text-sm text-destructive">{errors.nome}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="zona_anatomica">Zona Anatómica</Label>
                                    <QuickAddZonaAnatomica onCreated={(newZona) => setData('zona_anatomica', newZona.nome)} />
                                </div>
                                <Select 
                                    value={data.zona_anatomica} 
                                    onValueChange={(value) => setData('zona_anatomica', value)}
                                >
                                    <SelectTrigger id="zona_anatomica" className={errors.zona_anatomica ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Selecione a zona anatómica" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(zonaAnatomicas || []).map((zona) => (
                                            <SelectItem key={zona.id} value={zona.nome}>
                                                {zona.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.zona_anatomica && (
                                    <p className="text-sm text-destructive">{errors.zona_anatomica}</p>
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
                                <Label htmlFor="descricao">Descrição (Opcional)</Label>
                                <Textarea
                                    id="descricao"
                                    value={data.descricao}
                                    onChange={(e) => setData('descricao', e.target.value)}
                                    rows={4}
                                    placeholder="Detalhes adicionais sobre o diagnóstico..."
                                />
                                {errors.descricao && (
                                    <p className="text-sm text-destructive">{errors.descricao}</p>
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
