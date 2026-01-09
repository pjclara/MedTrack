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
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';

interface Area {
    id: number;
    nome: string;
}

interface Diagnostico {
    id: number;
    nome: string;
    area_id: number;
}

interface DiagnosticoEditProps {
    diagnostico: Diagnostico;
    areas: Area[];
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
        title: 'Editar',
        href: '#',
    },
];

export default function DiagnosticoEdit({ diagnostico, areas }: DiagnosticoEditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        nome: diagnostico.nome,
        area_id: diagnostico.area_id.toString(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/diagnosticos/${diagnostico.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Diagnóstico: ${diagnostico.nome}`} />
            
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
                        <CardTitle className="text-2xl font-bold">Editar Diagnóstico</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Atualize os detalhes do diagnóstico.
                        </p>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="area_id">Área de Especialidade</Label>
                                <Select 
                                    value={data.area_id} 
                                    onValueChange={(value) => setData('area_id', value)}
                                >
                                    <SelectTrigger id="area_id" className={errors.area_id ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Selecione uma área" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {areas.map((area) => (
                                            <SelectItem key={area.id} value={area.id.toString()}>
                                                {area.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.area_id && (
                                    <p className="text-sm text-destructive">{errors.area_id}</p>
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
                                {processing ? 'A guardar...' : 'Guardar Alterações'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
