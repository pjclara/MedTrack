import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type RegistoCirurgico, type Diagnostico, type Procedimento } from '@/types/models';
import { FormEventHandler } from 'react';

interface CirurgiaCreateProps {
    registosCirurgicos: RegistoCirurgico[];
    diagnosticos: Diagnostico[];
    procedimentos: Procedimento[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Cirurgias', href: '/cirurgias' },
    { title: 'Criar', href: '/cirurgias/create' },
];

export default function CirurgiaCreate({ registosCirurgicos, diagnosticos, procedimentos }: CirurgiaCreateProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        registo_cirurgico_id: '',
        diagnostico_id: '',
        procedimento_id: '',
        lateralidade: '',
        tipo_de_abordagem: '' as '' | 'Convencional' | 'Laparoscópica' | 'Robótica' | 'Endoscópica' | 'Híbrida',
        funcao: '' as '' | 'Cirurgião Principal' | 'Cirurgião Assistente' | 'Residente' | 'Interno',
        clavien_dindo: '' as '' | 'I' | 'II' | 'IIIa' | 'IIIb' | 'IVa' | 'IVb' | 'V',
        observacoes: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/cirurgias', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar Cirurgia" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Criar Cirurgia</h1>
                        <p className="text-muted-foreground">
                            Adicionar novo procedimento cirúrgico
                        </p>
                    </div>
                    <Link href="/cirurgias">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Dados da Cirurgia</CardTitle>
                        <CardDescription>
                            Preencha as informações do procedimento
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="registo_cirurgico_id">
                                    Registo Cirúrgico <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={data.registo_cirurgico_id}
                                    onValueChange={(value) => setData('registo_cirurgico_id', value)}
                                >
                                    <SelectTrigger className={errors.registo_cirurgico_id ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Selecione o registo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {registosCirurgicos.map((registo) => (
                                            <SelectItem key={registo.id} value={registo.id.toString()}>
                                                {registo.data} - {registo.utente?.nome || 'Sem utente'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.registo_cirurgico_id && (
                                    <p className="text-sm text-destructive">{errors.registo_cirurgico_id}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="diagnostico_id">
                                        Diagnóstico <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={data.diagnostico_id}
                                        onValueChange={(value) => setData('diagnostico_id', value)}
                                    >
                                        <SelectTrigger className={errors.diagnostico_id ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Selecione o diagnóstico" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {diagnosticos.map((diagnostico) => (
                                                <SelectItem key={diagnostico.id} value={diagnostico.id.toString()}>
                                                    {diagnostico.codigo} - {diagnostico.descricao}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.diagnostico_id && (
                                        <p className="text-sm text-destructive">{errors.diagnostico_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="procedimento_id">
                                        Procedimento <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={data.procedimento_id}
                                        onValueChange={(value) => setData('procedimento_id', value)}
                                    >
                                        <SelectTrigger className={errors.procedimento_id ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Selecione o procedimento" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {procedimentos.map((procedimento) => (
                                                <SelectItem key={procedimento.id} value={procedimento.id.toString()}>
                                                    {procedimento.codigo} - {procedimento.descricao}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.procedimento_id && (
                                        <p className="text-sm text-destructive">{errors.procedimento_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="lateralidade">Lateralidade</Label>
                                    <Input
                                        id="lateralidade"
                                        value={data.lateralidade}
                                        onChange={(e) => setData('lateralidade', e.target.value)}
                                        placeholder="Ex: Direita, Esquerda, Bilateral"
                                        className={errors.lateralidade ? 'border-destructive' : ''}
                                    />
                                    {errors.lateralidade && (
                                        <p className="text-sm text-destructive">{errors.lateralidade}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tipo_de_abordagem">Tipo de Abordagem</Label>
                                    <Select
                                        value={data.tipo_de_abordagem}
                                        onValueChange={(value) => setData('tipo_de_abordagem', value as typeof data.tipo_de_abordagem)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a abordagem" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Nenhuma</SelectItem>
                                            <SelectItem value="Convencional">Convencional</SelectItem>
                                            <SelectItem value="Laparoscópica">Laparoscópica</SelectItem>
                                            <SelectItem value="Robótica">Robótica</SelectItem>
                                            <SelectItem value="Endoscópica">Endoscópica</SelectItem>
                                            <SelectItem value="Híbrida">Híbrida</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.tipo_de_abordagem && (
                                        <p className="text-sm text-destructive">{errors.tipo_de_abordagem}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="funcao">Função</Label>
                                    <Select
                                        value={data.funcao}
                                        onValueChange={(value) => setData('funcao', value as typeof data.funcao)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a função" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Nenhuma</SelectItem>
                                            <SelectItem value="Cirurgião Principal">Cirurgião Principal</SelectItem>
                                            <SelectItem value="Cirurgião Assistente">Cirurgião Assistente</SelectItem>
                                            <SelectItem value="Residente">Residente</SelectItem>
                                            <SelectItem value="Interno">Interno</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.funcao && (
                                        <p className="text-sm text-destructive">{errors.funcao}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="clavien_dindo">Clavien-Dindo</Label>
                                    <Select
                                        value={data.clavien_dindo}
                                        onValueChange={(value) => setData('clavien_dindo', value as typeof data.clavien_dindo)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o grau" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Nenhum</SelectItem>
                                            <SelectItem value="I">I</SelectItem>
                                            <SelectItem value="II">II</SelectItem>
                                            <SelectItem value="IIIa">IIIa</SelectItem>
                                            <SelectItem value="IIIb">IIIb</SelectItem>
                                            <SelectItem value="IVa">IVa</SelectItem>
                                            <SelectItem value="IVb">IVb</SelectItem>
                                            <SelectItem value="V">V</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.clavien_dindo && (
                                        <p className="text-sm text-destructive">{errors.clavien_dindo}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="observacoes">Observações</Label>
                                <Textarea
                                    id="observacoes"
                                    value={data.observacoes}
                                    onChange={(e) => setData('observacoes', e.target.value)}
                                    placeholder="Observações adicionais..."
                                    rows={4}
                                    className={errors.observacoes ? 'border-destructive' : ''}
                                />
                                {errors.observacoes && (
                                    <p className="text-sm text-destructive">{errors.observacoes}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link href="/cirurgias">
                                    <Button type="button" variant="outline">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'A guardar...' : 'Guardar'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
