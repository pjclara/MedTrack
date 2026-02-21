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
import { type TipoDeCirurgia, type TipoDeAbordagem, type Diagnostico, type Procedimento, type Especialidade, type Hospital, type ZonaAnatomica } from '@/types/models';
import { useState, FormEventHandler, useEffect } from 'react';
import { QuickAddDiagnostico, QuickAddProcedimento } from '@/components/quick-add/QuickAddDialogs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

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
            hospital: string;
            especialidade: string;
            data_cirurgia: string;
            tipo_de_cirurgia_id: string;
            ambulatorio: boolean;
            tipo_de_abordagem_id: string;
            observacoes: string;
        };
        diagnosticos: DiagnosticoData[];
    };
    tiposDeCirurgia: TipoDeCirurgia[];
    tiposDeAbordagem: TipoDeAbordagem[];
    diagnosticos: Diagnostico[];
    procedimentos: Procedimento[];
    especialidades: Especialidade[];
    hospitals: Hospital[];
    zonaAnatomicas: ZonaAnatomica[];
    enums: {
        sexo: string[];
        funcoes: string[];
        clavien: string[];
        tipo_diagnostico: string[];
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
    hospital: string;
    especialidade: string;
    data_cirurgia: string;
    tipo_de_cirurgia_id: string;
    ambulatorio: boolean;
    observacoes: string;
    tipo_de_abordagem_id: string;
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
    tipo: string;
    procedimentos: ProcedimentoData[];
}

const stepNames = [
    'Utente',
    'Registo Cirúrgico',
    'Diagnósticos',
    'Intervenções',
    'Dados Adicionais',
    'Revisão e Confirmação'
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Registos Cirúrgicos', href: '/registos-cirurgicos' },
    { title: 'Editar', href: '#' },
];

export default function RegistoCirurgicoEdit({
    registo,
    tiposDeCirurgia = [],
    tiposDeAbordagem = [],
    diagnosticos = [],
    procedimentos = [],
    especialidades = [],
    hospitals = [],
    zonaAnatomicas = [],
    enums = { sexo: [], funcoes: [], clavien: [], tipo_diagnostico: [] },
}: RegistoCirurgicoEditProps) {
    const isMobile = useIsMobile();
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
                tipo: '',
                procedimentos: [{ procedimento_id: '', funcao: '', clavien_dindo: '', anatomia_patologica: '', observacoes: '' }]
            });
        });
        
        setDiagnosticosList(updated);
    };

    const updateDiagnosticoTipo = (index: number, tipo: string) => {
        const updated = [...diagnosticosList];
        updated[index].tipo = tipo;
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
                return utenteData.processo && utenteData.data_nascimento && utenteData.sexo;
            case 2:
                return registoData.hospital && registoData.especialidade && registoData.data_cirurgia && registoData.tipo_de_cirurgia_id && registoData.tipo_de_abordagem_id;
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

            <div className={`flex flex-col gap-4 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>
                            {isMobile ? 'Editar Registo' : 'Editar Registo Cirúrgico'}
                        </h1>
                        {!isMobile && (
                            <p className="text-muted-foreground font-medium">
                                {stepNames[step - 1]}
                            </p>
                        )}
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex flex-col gap-2">
                    {isMobile ? (
                        <div className="flex flex-col gap-1 px-1">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">Passo {step} de 6</span>
                                <span className="text-xs font-medium text-muted-foreground">{stepNames[step-1]}</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-primary transition-all duration-500 ease-out" 
                                    style={{ width: `${(step / 6) * 100}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            {stepNames.map((name, index) => {
                                const s = index + 1;
                                return (
                                    <button 
                                        key={s} 
                                        type="button"
                                        onClick={() => setStep(s)}
                                        className="flex-1 flex flex-col gap-2 items-center group transition-all"
                                    >
                                        <div
                                            className={`h-2 w-full rounded transition-colors ${s <= step ? 'bg-primary' : 'bg-muted'} group-hover:opacity-80`}
                                            title={name}
                                        />
                                        <span 
                                            className={`text-[10px] uppercase tracking-wider font-semibold hidden md:block text-center transition-colors ${s === step ? 'text-primary' : 'text-muted-foreground/50 group-hover:text-muted-foreground'}`}
                                        >
                                            {name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Utente */}
                    {step === 1 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{stepNames[0]}</CardTitle>
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
                                            {(enums?.sexo || []).map((sexo) => (
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
                                <CardTitle>{stepNames[1]}</CardTitle>
                                <CardDescription>Informações da cirurgia</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hospital">
                                        Hospital de Origem <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={registoData.hospital}
                                        onValueChange={(value) => setRegistoData({ ...registoData, hospital: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o hospital de origem" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {hospitals.length > 0 ? (
                                                hospitals.map((h) => (
                                                    <SelectItem key={h.id} value={h.nome}>{h.nome}</SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="none" disabled>Nenhum hospital registado</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="especialidade">
                                        Especialidade <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={registoData.especialidade}
                                        onValueChange={(value) => setRegistoData({ ...registoData, especialidade: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a especialidade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {especialidades.length > 0 ? (
                                                especialidades.map((a) => (
                                                    <SelectItem key={a.id} value={a.nome}>{a.nome}</SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="none" disabled>Nenhuma especialidade registada</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

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
                                            {(tiposDeCirurgia || []).map((tipo) => (
                                                <SelectItem key={tipo.id} value={tipo.id.toString()}>
                                                    {tipo.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tipo_de_abordagem_id">
                                        Tipo de Abordagem <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={registoData.tipo_de_abordagem_id}
                                        onValueChange={(value) => setRegistoData({ ...registoData, tipo_de_abordagem_id: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a abordagem" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(tiposDeAbordagem || []).map((tipo) => (
                                                <SelectItem key={tipo.id} value={tipo.id.toString()}>
                                                    {tipo.nome}
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
                                <CardTitle>{stepNames[2]}</CardTitle>
                                <CardDescription>Selecione os diagnósticos (pode selecionar múltiplos)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>
                                            Diagnósticos <span className="text-destructive">*</span>
                                        </Label>
                                        <QuickAddDiagnostico zonaAnatomicas={zonaAnatomicas} />
                                    </div>
                                    <CustomMultiSelect
                                        value={diagnosticosList.map(d => ({ value: d.diagnostico_id, label: diagnosticos.find(diag => diag.id.toString() === d.diagnostico_id)?.nome || '' }))}
                                        onChange={handleDiagnosticosChange}
                                        options={diagnosticos.map(d => ({ value: d.id.toString(), label: d.nome }))}
                                        placeholder="Selecione os diagnósticos"
                                    />
                                </div>
                                
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 4: Procedimentos */}
                    {step === 4 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{stepNames[3]}</CardTitle>
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
                                                                    <div className="flex items-center justify-between">
                                                                        <Label>
                                                                            Procedimento <span className="text-destructive">*</span>
                                                                        </Label>
                                                                        <QuickAddProcedimento especialidades={especialidades} />
                                                                    </div>
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
                                                                            {(enums?.funcoes || []).map((f) => (
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
                                <CardTitle>{stepNames[4]}</CardTitle>
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
                                                                            {(enums?.clavien || []).map((c) => (
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
                                <CardTitle>{stepNames[5]}</CardTitle>
                                <CardDescription>Revise todos os dados antes de guardar</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <h3 className="font-semibold mb-2">Utente</h3>
                                        <div className="rounded-md border p-4 space-y-1 text-sm bg-muted/30">
                                            <p><span className="text-muted-foreground mr-1">Nome:</span> {utenteData.nome}</p>
                                            <p><span className="text-muted-foreground mr-1">Processo:</span> {utenteData.processo}</p>
                                            <p><span className="text-muted-foreground mr-1">Data de Nascimento:</span> {convertISOToPT(utenteData.data_nascimento)}</p>
                                            <p><span className="text-muted-foreground mr-1">Sexo:</span> {utenteData.sexo}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">Registo</h3>
                                        <div className="rounded-md border p-4 space-y-1 text-sm bg-muted/30">
                                            <p><span className="text-muted-foreground mr-1">Data da Cirurgia:</span> {convertISOToPT(registoData.data_cirurgia)}</p>
                                            <p><span className="text-muted-foreground mr-1">Tipo de Cirurgia:</span> {tiposDeCirurgia.find(t => t.id.toString() === registoData.tipo_de_cirurgia_id)?.nome}</p>
                                            <p><span className="text-muted-foreground mr-1">Tipo de Abordagem:</span> {tiposDeAbordagem.find(t => t.id.toString() === registoData.tipo_de_abordagem_id)?.nome || 'N/A'}</p>
                                            <p><span className="text-muted-foreground mr-1">Ambulatório:</span> {registoData.ambulatorio ? 'Sim' : 'Não'}</p>
                                            {registoData.observacoes && <p><span className="text-muted-foreground mr-1">Observações:</span> {registoData.observacoes}</p>}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="font-semibold mb-2">Diagnósticos e Procedimentos</h3>
                                    {diagnosticosList.map((diag, diagIndex) => {
                                        const diagnosticoNome = diagnosticos.find(d => d.id.toString() === diag.diagnostico_id)?.nome;
                                        return (
                                            <div key={diagIndex} className="mb-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="font-medium text-sm">{diagnosticoNome}</p>
                                                    {diag.tipo && (
                                                        <Badge variant={diag.tipo === 'Maligno' ? 'destructive' : 'secondary'} className="text-[10px] h-4">
                                                            {diag.tipo}
                                                        </Badge>
                                                    )}
                                                </div>
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
                    <div className={`flex items-center justify-between pt-6 ${isMobile ? 'fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t p-4 z-50' : 'mt-4 gap-2'}`}>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => step > 1 ? setStep(step - 1) : router.visit('/registos-cirurgicos')}
                            className={isMobile ? 'flex-1 mr-2' : ''}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {step > 1 ? (isMobile ? 'Anterior' : 'Passo Anterior') : 'Cancelar'}
                        </Button>

                        {step < 6 ? (
                            <Button
                                type="button"
                                onClick={() => setStep(step + 1)}
                                disabled={!canAdvance()}
                                className={isMobile ? 'flex-1 ml-2' : ''}
                            >
                                {isMobile ? 'Próximo' : 'Próximo Passo'}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                disabled={processing} 
                                className={`bg-emerald-600 hover:bg-emerald-700 ${isMobile ? 'flex-1 ml-2' : ''}`}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'A guardar...' : 'Guardar Alterações'}
                            </Button>
                        )}
                    </div>
                    {isMobile && <div className="h-20" />} {/* Spacer for sticky footer */}
                </form>
            </div>
        </AppLayout>
    );
}
