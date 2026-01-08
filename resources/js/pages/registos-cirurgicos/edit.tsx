import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'react-toastify';
import { formatDateToPT, convertISOToPT } from '@/utils/date-formatters';
import { CustomSelect, CustomMultiSelect } from '@/components/ui/react-select';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Save, Plus, Trash2 } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type TipoDeCirurgia, type TipoDeOrigem, type Diagnostico, type Procedimento } from '@/types/models';
import { useState, FormEventHandler } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface RegistoCirurgicoEditProps {
    registo: {
        id: number;
        utente: {
            id: string;
            nome: string;
            processo: string;
            data_nascimento: string;
            sexo: string;
        };
        registo: {
            data_cirurgia: string;
            tipo_de_cirurgia_id: string;
            tipo_de_origem_id: any;
            ambulatorio: boolean;
            tipo_de_abordagem: string;
            observacoes: string;
        };
        diagnosticos: DiagnosticoData[];
    };
    tiposDeCirurgia: TipoDeCirurgia[];
    tiposDeOrigem: TipoDeOrigem[];
    diagnosticos: Diagnostico[];
    procedimentos: Procedimento[];
    enums: {
        sexo: string[];
        funcoes: string[];
        clavien: string[];
        tipo_de_abordagem: string[];
    };
}

interface UtenteData {
    id?: string;
    nome: string;
    processo: string;
    data_nascimento: string;
    sexo: string;
}

interface RegistoData {
    data_cirurgia: string;
    tipo_de_cirurgia_id: string;
    tipo_de_origem_id: string;
    ambulatorio: boolean;
    observacoes: string;
    tipo_de_abordagem: string;
}

interface ProcedimentoData {
    procedimento_id: string;
    funcao: string;
    clavien_dindo: string;
    anatomia_patologica: string;
    observacoes: string;
}

interface DiagnosticoData {
    diagnostico_id: string;
    procedimentos: ProcedimentoData[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Registos Cirúrgicos', href: '/registos-cirurgicos' },
    { title: 'Editar', href: '#' },
];

export default function RegistoCirurgicoEdit({
    registo,
    tiposDeCirurgia = [],
    tiposDeOrigem = [],
    diagnosticos = [],
    procedimentos = [],
    enums = { sexo: [], funcoes: [], clavien: [], tipo_de_abordagem: [] },
}: RegistoCirurgicoEditProps) {
    const [step, setStep] = useState(1);

    const [utenteData, setUtenteData] = useState<UtenteData>(registo.utente);
    const [registoData, setRegistoData] = useState<RegistoData>(registo.registo);
    const [diagnosticosList, setDiagnosticosList] = useState<DiagnosticoData[]>(registo.diagnosticos);

    const { put, processing, errors } = useForm();

    const handleDiagnosticosChange = (selectedIds: string[]) => {
        const existingIds = diagnosticosList.map(d => d.diagnostico_id);
        const newIds = selectedIds.filter(id => !existingIds.includes(id));
        const removedIds = existingIds.filter(id => !selectedIds.includes(id));
        
        let updated = [...diagnosticosList];
        
        // Remove diagnostics that were deselected
        updated = updated.filter(d => !removedIds.includes(d.diagnostico_id));
        
        // Add new diagnostics with default procedimento
        newIds.forEach(id => {
            updated.push({
                diagnostico_id: id,
                procedimentos: [{ procedimento_id: '', funcao: '', clavien_dindo: '', anatomia_patologica: '', observacoes: '' }]
            });
        });
        
        setDiagnosticosList(updated);
    };

    const addProcedimento = (diagnosticoIndex: number) => {
        const updated = [...diagnosticosList];
        updated[diagnosticoIndex].procedimentos.push({
            procedimento_id: '',
            funcao: '',
            clavien_dindo: '',
            anatomia_patologica: '',
            observacoes: ''
        });
        setDiagnosticosList(updated);
    };

    const removeProcedimento = (diagnosticoIndex: number, procedimentoIndex: number) => {
        const updated = [...diagnosticosList];
        updated[diagnosticoIndex].procedimentos = updated[diagnosticoIndex].procedimentos.filter((_, i) => i !== procedimentoIndex);
        setDiagnosticosList(updated);
    };

    const updateProcedimento = (diagnosticoIndex: number, procedimentoIndex: number, field: string, value: any) => {
        const updated = [...diagnosticosList];
        (updated[diagnosticoIndex].procedimentos[procedimentoIndex] as any)[field] = value;
        setDiagnosticosList(updated);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const payload = {
            utente: utenteData,
            registo: registoData,
            diagnosticos: diagnosticosList,
        };

        router.put(`/registos-cirurgicos/${registo.id}`, payload as any, {
            onSuccess: () => {
                toast.success('Registo cirúrgico atualizado com sucesso!');
            },
            onError: (errors) => {
                toast.error('Erro ao atualizar registo cirúrgico. Verifique os dados.');
                console.error(errors);
            },
        });
    };

    console.log({ registoData });

    const canAdvance = () => {
        switch (step) {
            case 1:
                return utenteData.nome && utenteData.processo && utenteData.data_nascimento && utenteData.sexo;
            case 2:
                return registoData.data_cirurgia && registoData.tipo_de_cirurgia_id && registoData.tipo_de_origem_id && registoData.tipo_de_abordagem;
            case 3:
                return diagnosticosList.length > 0;
            case 4:
                return diagnosticosList.every(d => d.procedimentos.every(p => p.procedimento_id && p.funcao));
            default:
                return true;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Registo Cirúrgico" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Editar Registo Cirúrgico</h1>
                        <p className="text-muted-foreground">
                            Passo {step} de 6
                        </p>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map((s) => (
                        <div key={s} className="flex items-center flex-1">
                            <Badge variant={step >= s ? "default" : "outline"} className="w-full justify-center">
                                {s}
                            </Badge>
                            {s < 6 && <Separator className="flex-1" />}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Utente */}
                    {step === 1 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Dados do Utente</CardTitle>
                                <CardDescription>Informações do utente</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nome">
                                        Nome <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="nome"
                                        value={utenteData.nome}
                                        onChange={(e) => setUtenteData({ ...utenteData, nome: e.target.value })}
                                        placeholder="Nome do utente"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="processo">
                                        Processo <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="processo"
                                        value={utenteData.processo}
                                        onChange={(e) => setUtenteData({ ...utenteData, processo: e.target.value })}
                                        placeholder="Número de processo"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="data_nascimento">
                                        Data de Nascimento <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="data_nascimento"
                                        type="date"
                                        value={utenteData.data_nascimento ? new Date(utenteData.data_nascimento).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setUtenteData({ ...utenteData, data_nascimento: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sexo">
                                        Sexo <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={utenteData.sexo}
                                        onValueChange={(value) => setUtenteData({ ...utenteData, sexo: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o sexo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.sexo.map((sexo) => (
                                                <SelectItem key={sexo} value={sexo}>
                                                    {sexo}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 2: Registo */}
                    {step === 2 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Dados do Registo</CardTitle>
                                <CardDescription>Informações da cirurgia</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="data_cirurgia">
                                        Data da Cirurgia <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="data_cirurgia"
                                        type="date"
                                        value={registoData.data_cirurgia}
                                        onChange={(e) => setRegistoData({ ...registoData, data_cirurgia: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tipo_de_cirurgia_id">
                                        Tipo de Cirurgia <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={registoData.tipo_de_cirurgia_id}
                                        onValueChange={(value) => setRegistoData({ ...registoData, tipo_de_cirurgia_id: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tiposDeCirurgia.map((tipo) => (
                                                <SelectItem key={tipo.id} value={tipo.id.toString()}>
                                                    {tipo.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tipo_de_origem_id">
                                        Tipo de Origem <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={registoData.tipo_de_origem_id}
                                        onValueChange={(value) => setRegistoData({ ...registoData, tipo_de_origem_id: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a origem" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tiposDeOrigem.map((tipo) => (
                                                <SelectItem key={tipo.id} value={tipo.id.toString()}>
                                                    {tipo.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tipo_de_abordagem">
                                        Tipo de Abordagem <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={registoData.tipo_de_abordagem}
                                        onValueChange={(value) => setRegistoData({ ...registoData, tipo_de_abordagem: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a abordagem" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enums.tipo_de_abordagem.map((tipo) => (
                                                <SelectItem key={tipo} value={tipo}>
                                                    {tipo}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="ambulatorio"
                                        checked={registoData.ambulatorio}
                                        onCheckedChange={(checked) => setRegistoData({ ...registoData, ambulatorio: checked as boolean })}
                                    />
                                    <Label htmlFor="ambulatorio" className="cursor-pointer">
                                        Ambulatório
                                    </Label>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="observacoes">Observações</Label>
                                    <Textarea
                                        id="observacoes"
                                        value={registoData.observacoes}
                                        onChange={(e) => setRegistoData({ ...registoData, observacoes: e.target.value })}
                                        placeholder="Observações sobre o registo..."
                                        rows={4}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 3: Diagnósticos */}
                    {step === 3 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Diagnósticos</CardTitle>
                                <CardDescription>Selecione os diagnósticos (pode selecionar múltiplos)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>
                                        Diagnósticos <span className="text-destructive">*</span>
                                    </Label>
                                    <CustomMultiSelect
                                        value={diagnosticosList.map(d => ({ value: d.diagnostico_id, label: diagnosticos.find(diag => diag.id.toString() === d.diagnostico_id)?.nome || '' }))}
                                        onChange={handleDiagnosticosChange}
                                        options={diagnosticos.map(d => ({ value: d.id.toString(), label: d.nome }))}
                                        placeholder="Selecione os diagnósticos"
                                    />
                                </div>
                                {diagnosticosList.length > 0 && (
                                    <div className="mt-4 p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            {diagnosticosList.length} diagnóstico{diagnosticosList.length !== 1 ? 's' : ''} selecionado{diagnosticosList.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 4: Procedimentos */}
                    {step === 4 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Procedimentos</CardTitle>
                                <CardDescription>Adicione procedimentos para cada diagnóstico</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {diagnosticosList.map((diag, diagIndex) => {
                                    const diagnosticoNome = diagnosticos.find(d => d.id.toString() === diag.diagnostico_id)?.nome || 'Diagnóstico';
                                    return (
                                        <Card key={diagIndex}>
                                            <CardHeader>
                                                <CardTitle className="text-base">{diagnosticoNome}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                {diag.procedimentos.map((proc, procIndex) => (
                                                    <Card key={procIndex}>
                                                        <CardHeader>
                                                            <div className="flex items-center justify-between">
                                                                <CardTitle className="text-sm">Procedimento {procIndex + 1}</CardTitle>
                                                                {diag.procedimentos.length > 1 && (
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => removeProcedimento(diagIndex, procIndex)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label>
                                                                        Procedimento <span className="text-destructive">*</span>
                                                                    </Label>
                                                                    <CustomSelect
                                                                        value={procedimentos.filter(p => p.id.toString() === proc.procedimento_id).map(p => ({ value: p.id.toString(), label: p.nome }))[0]}
                                                                        onChange={(value) => updateProcedimento(diagIndex, procIndex, 'procedimento_id', value)}
                                                                        options={procedimentos.map(p => ({ value: p.id.toString(), label: p.nome }))}
                                                                        placeholder="Selecione o procedimento"
                                                                    />
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <Label>
                                                                        Função <span className="text-destructive">*</span>
                                                                    </Label>
                                                                    <Select
                                                                        value={proc.funcao}
                                                                        onValueChange={(value) => updateProcedimento(diagIndex, procIndex, 'funcao', value)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Selecione a função" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {enums.funcoes.map((f) => (
                                                                                <SelectItem key={f} value={f}>
                                                                                    {f}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => addProcedimento(diagIndex)}
                                                    className="w-full"
                                                >
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Adicionar Procedimento
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 5: Dados Adicionais */}
                    {step === 5 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Dados Adicionais</CardTitle>
                                <CardDescription>Informações opcionais sobre cada procedimento</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {diagnosticosList.map((diag, diagIndex) => {
                                    const diagnosticoNome = diagnosticos.find(d => d.id.toString() === diag.diagnostico_id)?.nome || 'Diagnóstico';
                                    return (
                                        <Card key={diagIndex}>
                                            <CardHeader>
                                                <CardTitle className="text-base">{diagnosticoNome}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                {diag.procedimentos.map((proc, procIndex) => {
                                                    const procedimentoNome = procedimentos.find(p => p.id.toString() === proc.procedimento_id)?.nome || `Procedimento ${procIndex + 1}`;
                                                    return (
                                                        <Card key={procIndex}>
                                                            <CardHeader>
                                                                <CardTitle className="text-sm">{procedimentoNome}</CardTitle>
                                                            </CardHeader>
                                                            <CardContent className="space-y-4">
                                                                <div className="space-y-2">
                                                                    <Label>Clavien-Dindo</Label>
                                                                    <Select
                                                                        value={proc.clavien_dindo}
                                                                        onValueChange={(value) => updateProcedimento(diagIndex, procIndex, 'clavien_dindo', value)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Selecione a classificação" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="none">Nenhum</SelectItem>
                                                                            {enums.clavien.map((c) => (
                                                                                <SelectItem key={c} value={c}>
                                                                                    {c}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <Label>Anatomia Patológica</Label>
                                                                    <Textarea
                                                                        value={proc.anatomia_patologica}
                                                                        onChange={(e) => updateProcedimento(diagIndex, procIndex, 'anatomia_patologica', e.target.value)}
                                                                        placeholder="Resultados de anatomia patológica..."
                                                                        rows={3}
                                                                    />
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <Label>Observações</Label>
                                                                    <Textarea
                                                                        value={proc.observacoes}
                                                                        onChange={(e) => updateProcedimento(diagIndex, procIndex, 'observacoes', e.target.value)}
                                                                        placeholder="Observações sobre o procedimento..."
                                                                        rows={3}
                                                                    />
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    );
                                                })}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 6: Review */}
                    {step === 6 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Revisão</CardTitle>
                                <CardDescription>Revise todos os dados antes de guardar</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-2">Utente</h3>
                                    <div className="text-sm space-y-1">
                                        <p><strong>Nome:</strong> {utenteData.nome}</p>
                                        <p><strong>Processo:</strong> {utenteData.processo}</p>
                                        <p><strong>Data de Nascimento:</strong> {convertISOToPT(utenteData.data_nascimento)}</p>
                                        <p><strong>Sexo:</strong> {utenteData.sexo}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="font-semibold mb-2">Registo</h3>
                                    <div className="text-sm space-y-1">
                                        <p><strong>Data da Cirurgia:</strong> {convertISOToPT(registoData.data_cirurgia)}</p>
                                        <p><strong>Tipo de Cirurgia:</strong> {tiposDeCirurgia.find(t => t.id.toString() === registoData.tipo_de_cirurgia_id)?.nome}</p>
                                        <p><strong>Tipo de Origem:</strong> {tiposDeOrigem.find(t => t.id.toString() === registoData.tipo_de_origem_id)?.nome}</p>
                                        <p><strong>Tipo de Abordagem:</strong> {registoData.tipo_de_abordagem}</p>
                                        <p><strong>Ambulatório:</strong> {registoData.ambulatorio ? 'Sim' : 'Não'}</p>
                                        {registoData.observacoes && <p><strong>Observações:</strong> {registoData.observacoes}</p>}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="font-semibold mb-2">Diagnósticos e Procedimentos</h3>
                                    {diagnosticosList.map((diag, diagIndex) => {
                                        const diagnosticoNome = diagnosticos.find(d => d.id.toString() === diag.diagnostico_id)?.nome;
                                        return (
                                            <div key={diagIndex} className="mb-4">
                                                <p className="font-medium text-sm mb-1">{diagnosticoNome}</p>
                                                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                                                    {diag.procedimentos.map((proc, procIndex) => {
                                                        const procedimentoNome = procedimentos.find(p => p.id.toString() === proc.procedimento_id)?.nome;
                                                        return (
                                                            <li key={procIndex}>
                                                                {procedimentoNome} ({proc.funcao})
                                                                {proc.clavien_dindo && proc.clavien_dindo !== 'none' && ` - Clavien-Dindo: ${proc.clavien_dindo}`}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between gap-2 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => step > 1 ? setStep(step - 1) : router.visit('/registos-cirurgicos')}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {step > 1 ? 'Anterior' : 'Cancelar'}
                        </Button>

                        {step < 6 ? (
                            <Button
                                type="button"
                                onClick={() => setStep(step + 1)}
                                disabled={!canAdvance()}
                            >
                                Próximo
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'A guardar...' : 'Guardar Alterações'}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
