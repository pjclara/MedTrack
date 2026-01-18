import { Head, useForm, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'react-toastify';
import { convertISOToPT } from '@/utils/date-formatters';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Save, Plus, Trash2, Search } from 'lucide-react';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { type TipoDeCirurgia, type TipoDeOrigem, type Diagnostico, type Procedimento, type Especialidade, type Hospital, type ZonaAnatomica } from '@/types/models';
import { useState, FormEventHandler, useEffect } from 'react';
import { QuickAddDiagnostico, QuickAddProcedimento } from '@/components/quick-add/QuickAddDialogs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CustomMultiSelect } from '@/components/ui/react-select';
import { useIsMobile } from '@/hooks/use-mobile';

interface RegistoCirurgicoCreateProps {
    tiposDeCirurgia: TipoDeCirurgia[];
    tiposDeOrigem: TipoDeOrigem[];
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
    duplicateData?: {
        utente: UtenteData;
        registo: RegistoData;
        diagnosticos: DiagnosticoData[];
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
    { title: 'Criar', href: '#' },
];

export default function RegistoCirurgicoCreate({
    tiposDeCirurgia = [],
    tiposDeOrigem = [],
    diagnosticos = [],
    procedimentos = [],
    especialidades = [],
    hospitals = [],
    zonaAnatomicas = [],
    enums = { sexo: [], funcoes: [], clavien: [], tipo_diagnostico: [] },
    duplicateData,
}: RegistoCirurgicoCreateProps) {
    const isMobile = useIsMobile();
    const { auth } = usePage<SharedData>().props;
    const [step, setStep] = useState(1);
    const [searchProcesso, setSearchProcesso] = useState(duplicateData?.utente?.processo || '');
    const [utenteFound, setUtenteFound] = useState<boolean | null>(null);

    const [utenteData, setUtenteData] = useState<UtenteData>(duplicateData?.utente || {
        nome: '',
        processo: '',
        data_nascimento: '',
        sexo: '',
    });

    const [registoData, setRegistoData] = useState<RegistoData>(duplicateData?.registo || {
        hospital: auth.user.hospital_de_origem || '',
        especialidade: auth.user.especialidade || '',
        data_cirurgia: '',
        tipo_de_cirurgia_id: '',
        tipo_de_origem_id: '',
        ambulatorio: false,
        observacoes: '',
        tipo_de_abordagem: '',
    });

    const [diagnosticosList, setDiagnosticosList] = useState<DiagnosticoData[]>(duplicateData?.diagnosticos || []);

    const { post, processing, errors } = useForm();

    const searchUtente = async () => {
        if (!searchProcesso) return;

        try {
            const response = await fetch(`/api/utentes/processo/${searchProcesso}`);
            const data = await response.json();

            if (data.utente) {
                setUtenteData(data.utente);
                setUtenteFound(true);
            } else {
                setUtenteData({ ...utenteData, processo: searchProcesso });
                setUtenteFound(false);
            }
        } catch (error) {
            console.error('Error searching utente:', error);
        }
    };

    const addDiagnostico = () => {
        setDiagnosticosList([
            ...diagnosticosList,
            { diagnostico_id: '', tipo: '', procedimentos: [{ procedimento_id: '', funcao: '', clavien_dindo: '', anatomia_patologica: '', observacoes: '' }] }
        ]);
    };

    const removeDiagnostico = (index: number) => {
        setDiagnosticosList(diagnosticosList.filter((_, i) => i !== index));
    };

    const diagnosticoOptions = diagnosticos.map(d => ({
        value: d.id.toString(),
        label: d.nome
    }));

    const handleDiagnosticosChange = (selectedIds: string[]) => {
        const newList = selectedIds.map(id => {
            const existing = diagnosticosList.find(d => d.diagnostico_id === id);
            if (existing) return existing;
            
            return {
                diagnostico_id: id,
                tipo: '',
                procedimentos: [{ 
                    procedimento_id: '', 
                    funcao: '', 
                    clavien_dindo: '', 
                    anatomia_patologica: '', 
                    observacoes: '' 
                }]
            };
        });
        setDiagnosticosList(newList);
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

    const updateDiagnostico = (index: number, field: string, value: any) => {
        const updated = [...diagnosticosList];
        (updated[index] as any)[field] = value;
        setDiagnosticosList(updated);
    };

    const updateProcedimento = (diagnosticoIndex: number, procedimentoIndex: number, field: string, value: any) => {
        const updated = [...diagnosticosList];
        (updated[diagnosticoIndex].procedimentos[procedimentoIndex] as any)[field] = value;
        setDiagnosticosList(updated);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        // CRITICAL: Only allow submission on step 6 (Review)
        if (step !== 6) {
            console.warn(`⚠️ Attempted to submit from step ${step}. Submission only allowed from step 6.`);
            toast.warning('Por favor complete todos os passos antes de submeter');
            return;
        }

        // Validate that diagnosticosList is not empty
        if (diagnosticosList.length === 0) {
            console.error('❌ Cannot submit: diagnosticosList is empty');
            toast.error('Adicione pelo menos um diagnóstico antes de submeter');
            setStep(3); // Go back to diagnostics step
            return;
        }

        // Transform diagnosticos to ensure proper types
        const transformedDiagnosticos = diagnosticosList.map(d => ({
            diagnostico_id: parseInt(d.diagnostico_id),
            tipo: d.tipo || null,
            procedimentos: d.procedimentos.map(p => ({
                procedimento_id: parseInt(p.procedimento_id),
                funcao: p.funcao,
                clavien_dindo: p.clavien_dindo || null,
                anatomia_patologica: p.anatomia_patologica || null,
                observacoes: p.observacoes || null
            }))
        }));

        const payload = {
            utente: utenteData,
            registo: registoData,
            diagnosticos: transformedDiagnosticos,
        };



        router.post('/registos-cirurgicos', payload as any, {
            onSuccess: () => {
                toast.success('Registo cirúrgico criado com sucesso!');
            },
            onError: (errors) => {
                toast.error('Erro ao criar registo cirúrgico. Verifique os dados.');
                console.error('=== VALIDATION ERRORS ===', errors);
            },
        });
    };

    const canAdvance = () => {
        switch (step) {
            case 1:
                return utenteData.processo && utenteData.data_nascimento && utenteData.sexo;
            case 2:
                return registoData.hospital && registoData.especialidade && registoData.data_cirurgia && registoData.tipo_de_cirurgia_id && registoData.tipo_de_origem_id && registoData.tipo_de_abordagem;
            case 3:
                return diagnosticosList.length > 0 && diagnosticosList.every(d => d.diagnostico_id);
            case 4:
                return diagnosticosList.every(d => d.procedimentos.every(p => p.procedimento_id && p.funcao));
            default:
                return true;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar Registo Cirúrgico" />

            <div className={`flex flex-col gap-4 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>
                            {duplicateData ? 'Duplicar Registo' : (isMobile ? 'Novo Registo' : 'Criar Registo Cirúrgico')}
                        </h1>
                        {!isMobile && (
                            <p className="text-muted-foreground font-medium">
                                {stepNames[step - 1]}
                            </p>
                        )}
                    </div>
                </div>

                {/* Progress */}
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
                                    <div key={s} className="flex-1 flex flex-col gap-2 items-center">
                                        <div
                                            className={`h-2 w-full rounded transition-colors duration-300 ${s <= step ? 'bg-primary' : 'bg-muted'}`}
                                            title={name}
                                        />
                                        <span 
                                            className={`text-[10px] uppercase tracking-wider font-semibold hidden md:block text-center ${s === step ? 'text-primary' : 'text-muted-foreground/50'}`}
                                        >
                                            {name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Passo 1 - Utente */}
                    {step === 1 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{stepNames[0]}</CardTitle>
                                <CardDescription>
                                    Procure pelo nº de processo ou crie um novo utente
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <Label htmlFor="search_processo">Nº de Processo</Label>
                                        <Input
                                            id="search_processo"
                                            type="number"
                                            value={searchProcesso}
                                            onChange={(e) => {
                                                setSearchProcesso(e.target.value);
                                                setUtenteFound(null);
                                            }}
                                            placeholder="Digite o nº de processo"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={searchUtente}
                                        className="mt-auto"
                                    >
                                        <Search className="mr-2 h-4 w-4" />
                                        Procurar
                                    </Button>
                                </div>

                                {utenteFound !== null && (
                                    <>
                                        <div className="rounded-md border p-4">
                                            {utenteFound ? (
                                                <p className="text-sm text-green-600 font-medium">
                                                    ✓ Utente encontrado
                                                </p>
                                            ) : (
                                                <p className="text-sm text-orange-600 font-medium">
                                                    ⚠ Utente não encontrado. Preencha os dados abaixo para criar.
                                                </p>
                                            )}
                                        </div>

                                        <Separator />

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="nome">
                                                    Nome
                                                </Label>
                                                <Input
                                                    id="nome"
                                                    value={utenteData.nome}
                                                    onChange={(e) => setUtenteData({ ...utenteData, nome: e.target.value })}
                                                    placeholder="Nome completo"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="processo">
                                                    Nº Processo <span className="text-destructive">*</span>
                                                </Label>
                                                <Input
                                                    disabled
                                                    id="processo"
                                                    type="number"
                                                    value={utenteData.processo}
                                                    onChange={(e) => setUtenteData({ ...utenteData, processo: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="data_nascimento">
                                                    Data de Nascimento <span className="text-destructive">*</span>
                                                </Label>
                                                <Input
                                                    id="data_nascimento"
                                                    type="date"
                                                    value={utenteData.data_nascimento}
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
                                                        <SelectValue placeholder="Selecione" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(enums?.sexo || []).map((s) => (
                                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Passo 2 - Registo Cirúrgico */}
                    {step === 2 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{stepNames[1]}</CardTitle>
                                <CardDescription>
                                    Dados da cirurgia
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
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
                                                <SelectValue placeholder="Selecione" />
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
                                            Origem <span className="text-destructive">*</span>
                                        </Label>
                                        <Select
                                            value={registoData.tipo_de_origem_id}
                                            onValueChange={(value) => setRegistoData({ ...registoData, tipo_de_origem_id: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
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
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Convencional">Convencional</SelectItem>
                                                <SelectItem value="Laparoscópica">Laparoscópica</SelectItem>
                                                <SelectItem value="Robótica">Robótica</SelectItem>
                                                <SelectItem value="Endoscópica">Endoscópica</SelectItem>
                                                <SelectItem value="Híbrida">Híbrida</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="ambulatorio"
                                        checked={registoData.ambulatorio}
                                        onCheckedChange={(checked) => setRegistoData({ ...registoData, ambulatorio: !!checked })}
                                    />
                                    <Label htmlFor="ambulatorio" className="cursor-pointer">
                                        Ambulatório
                                    </Label>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="observacoes">Observações Gerais</Label>
                                    <Textarea
                                        id="observacoes"
                                        value={registoData.observacoes}
                                        onChange={(e) => setRegistoData({ ...registoData, observacoes: e.target.value })}
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Passo 3 - Diagnósticos */}
                    {step === 3 && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>{stepNames[2]}</CardTitle>
                                        <CardDescription>
                                            Selecione os diagnósticos da cirurgia
                                        </CardDescription>
                                    </div>
                                    <QuickAddDiagnostico 
                                        onCreated={(newDiag) => {
                                            if (newDiag.id) {
                                                const idStr = newDiag.id.toString();
                                                if (!diagnosticosList.some(d => d.diagnostico_id === idStr)) {
                                                    setDiagnosticosList([
                                                        ...diagnosticosList,
                                                        { 
                                                            diagnostico_id: idStr, 
                                                            tipo: '', 
                                                            procedimentos: [{ procedimento_id: '', funcao: '', clavien_dindo: '', anatomia_patologica: '', observacoes: '' }] 
                                                        }
                                                    ]);
                                                }
                                            }
                                        }}
                                        zonaAnatomicas={zonaAnatomicas}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Diagnósticos <span className="text-destructive">*</span></Label>
                                    <CustomMultiSelect
                                        options={diagnosticoOptions}
                                        value={diagnosticoOptions.filter(opt => diagnosticosList.some(d => d.diagnostico_id === opt.value))}
                                        onChange={handleDiagnosticosChange}
                                        placeholder="Selecione um ou mais diagnósticos..."
                                    />
                                </div>

                                {diagnosticosList.length > 0 && (
                                    <div className="space-y-4 pt-4">
                                        <Separator />
                                        <h3 className="text-sm font-medium">Classificação dos Diagnósticos</h3>
                                        {diagnosticosList.map((d, index) => {
                                            const diagnosisName = diagnosticos.find(diag => diag.id.toString() === d.diagnostico_id)?.nome;
                                            return (
                                                <div key={d.diagnostico_id} className="grid grid-cols-2 gap-4 items-center p-3 border rounded-md">
                                                    <span className="text-sm font-medium">{diagnosisName}</span>
                                                    <div className="space-y-1">
                                                        <Select
                                                            value={d.tipo}
                                                            onValueChange={(value) => updateDiagnostico(index, 'tipo', value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Tipo (Benigno/Maligno)" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {(enums?.tipo_diagnostico || []).map((tipo) => (
                                                                    <SelectItem key={tipo} value={tipo}>
                                                                        {tipo}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Passo 4 - Procedimentos */}
                    {step === 4 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{stepNames[3]}</CardTitle>
                                <CardDescription>
                                    Adicione os procedimentos para cada diagnóstico
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {diagnosticosList.map((diag, diagIndex) => {
                                    const diagNome = diagnosticos.find(d => d.id.toString() === diag.diagnostico_id)?.nome;
                                    return (
                                        <div key={diagIndex} className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary">Diagnóstico {diagIndex + 1}</Badge>
                                                <span className="text-sm font-medium">{diagNome}</span>
                                            </div>

                                            {diag.procedimentos.map((proc, procIndex) => (
                                                <div key={procIndex} className="rounded-md border p-4 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <Label>Intervenção {procIndex + 1}</Label>
                                                        <div className="flex gap-2">
                                                            <QuickAddProcedimento 
                                                                especialidades={especialidades}
                                                                onCreated={(newProc) => {
                                                                    if (newProc.id) {
                                                                        updateProcedimento(diagIndex, procIndex, 'procedimento_id', newProc.id.toString());
                                                                    }
                                                                }}
                                                            />
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
                                                    </div>

                                                    <div className="grid gap-4 md:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <Label>Procedimento <span className="text-destructive">*</span></Label>
                                                            <Select
                                                                value={proc.procedimento_id}
                                                                onValueChange={(value) => updateProcedimento(diagIndex, procIndex, 'procedimento_id', value)}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecione" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {(procedimentos || []).map((p) => (
                                                                        <SelectItem key={p.id} value={p.id.toString()}>
                                                                            {p.nome}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Função <span className="text-destructive">*</span></Label>
                                                            <Select
                                                                value={proc.funcao}
                                                                onValueChange={(value) => updateProcedimento(diagIndex, procIndex, 'funcao', value)}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecione" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {(enums?.funcoes || []).map((f) => (
                                                                        <SelectItem key={f} value={f}>{f}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => addProcedimento(diagIndex)}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Adicionar Intervenção
                                            </Button>

                                            {diagIndex < diagnosticosList.length - 1 && <Separator />}
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    )}

                    {/* Passo 5 - Dados Adicionais */}
                    {step === 5 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{stepNames[4]}</CardTitle>
                                <CardDescription>
                                    Informações complementares (opcional)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {diagnosticosList.map((diag, diagIndex) => {
                                    const diagNome = diagnosticos.find(d => d.id.toString() === diag.diagnostico_id)?.nome;
                                    return (
                                        <div key={diagIndex} className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary">Diagnóstico {diagIndex + 1}</Badge>
                                                <span className="text-sm font-medium">{diagNome}</span>
                                            </div>

                                            {diag.procedimentos.map((proc, procIndex) => {
                                                const procNome = procedimentos.find(p => p.id.toString() === proc.procedimento_id)?.nome;
                                                return (
                                                    <div key={procIndex} className="rounded-md border p-4 space-y-3">
                                                        <Label className="font-medium">Intervenção {procIndex + 1}: {procNome}</Label>

                                                        <div className="grid gap-4 md:grid-cols-2">
                                                            <div className="space-y-2">
                                                                <Label>Clavien-Dindo</Label>
                                                                <Select
                                                                    value={proc.clavien_dindo}
                                                                    onValueChange={(value) => updateProcedimento(diagIndex, procIndex, 'clavien_dindo', value)}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Nenhum" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="none">Nenhum</SelectItem>
                                                                        {(enums?.clavien || []).map((c) => (
                                                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label>Anatomia Patológica</Label>
                                                                <Textarea
                                                                    value={proc.anatomia_patologica}
                                                                    onChange={(e) => updateProcedimento(diagIndex, procIndex, 'anatomia_patologica', e.target.value)}
                                                                    rows={2}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Observações Específicas</Label>
                                                            <Textarea
                                                                value={proc.observacoes}
                                                                onChange={(e) => updateProcedimento(diagIndex, procIndex, 'observacoes', e.target.value)}
                                                                rows={2}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {diagIndex < diagnosticosList.length - 1 && <Separator />}
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    )}

                    {/* Passo 6 - Revisão */}
                    {step === 6 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{stepNames[5]}</CardTitle>
                                <CardDescription>
                                    Revise todos os dados antes de confirmar
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Utente */}
                                    <div>
                                        <h3 className="font-semibold mb-2">Utente</h3>
                                        <div className="rounded-md border p-4 space-y-1 text-sm bg-muted/30">
                                            <p><span className="text-muted-foreground mr-1">Nome:</span> {utenteData.nome}</p>
                                            <p><span className="text-muted-foreground mr-1">Processo:</span> {utenteData.processo}</p>
                                            <p><span className="text-muted-foreground mr-1">Data Nascimento:</span> {convertISOToPT(utenteData.data_nascimento)}</p>
                                            <p><span className="text-muted-foreground mr-1">Sexo:</span> {utenteData.sexo}</p>
                                        </div>
                                    </div>

                                    {/* Registo */}
                                    <div>
                                        <h3 className="font-semibold mb-2">Registo Cirúrgico</h3>
                                        <div className="rounded-md border p-4 space-y-1 text-sm bg-muted/30">
                                            <p><span className="text-muted-foreground mr-1">Data:</span> {convertISOToPT(registoData.data_cirurgia)}</p>
                                            <p><span className="text-muted-foreground mr-1">Tipo:</span> {tiposDeCirurgia.find(t => t.id.toString() === registoData.tipo_de_cirurgia_id)?.nome}</p>
                                            <p><span className="text-muted-foreground mr-1">Origem:</span> {tiposDeOrigem.find(t => t.id.toString() === registoData.tipo_de_origem_id)?.nome}</p>
                                            <p><span className="text-muted-foreground mr-1">Abordagem:</span> {registoData.tipo_de_abordagem}</p>
                                            <p><span className="text-muted-foreground mr-1">Ambulatório:</span> {registoData.ambulatorio ? 'Sim' : 'Não'}</p>
                                            {registoData.observacoes && <p><span className="text-muted-foreground mr-1">Obs:</span> {registoData.observacoes}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Diagnósticos e Intervenções */}
                                <div>
                                    <h3 className="font-semibold mb-2">Diagnósticos e Intervenções</h3>
                                    <div className="space-y-3">
                                        {diagnosticosList.map((diag, diagIndex) => {
                                            const diagNome = diagnosticos.find(d => d.id.toString() === diag.diagnostico_id)?.nome;
                                            return (
                                                <div key={diagIndex} className="rounded-md border p-4 space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium">Diagnóstico {diagIndex + 1}: {diagNome}</p>
                                                        {diag.tipo && (
                                                            <Badge variant={diag.tipo === 'Maligno' ? 'destructive' : 'secondary'} className="text-[10px] h-5">
                                                                {diag.tipo}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="pl-4 space-y-2">
                                                        {diag.procedimentos.map((proc, procIndex) => {
                                                            const procNome = procedimentos.find(p => p.id.toString() === proc.procedimento_id)?.nome;
                                                            return (
                                                                <div key={procIndex} className="text-sm border-l-2 pl-3">
                                                                    <p><strong>Intervenção {procIndex + 1}:</strong> {procNome}</p>
                                                                    <p><strong>Função:</strong> {proc.funcao}</p>
                                                                    {proc.clavien_dindo && proc.clavien_dindo !== 'none' && (
                                                                        <p><strong>Clavien-Dindo:</strong> {proc.clavien_dindo}</p>
                                                                    )}
                                                                    {proc.anatomia_patologica && (
                                                                        <p><strong>Anat. Patológica:</strong> {proc.anatomia_patologica}</p>
                                                                    )}
                                                                    {proc.observacoes && (
                                                                        <p><strong>Obs:</strong> {proc.observacoes}</p>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Navigation */}
                    <div className={`flex items-center justify-between pt-6 ${isMobile ? 'fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t p-4 z-50' : ''}`}>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => step > 1 ? setStep(step - 1) : router.visit('/registos-cirurgicos')}
                            className={isMobile ? 'flex-1 mr-2' : ''}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {step === 1 ? 'Cancelar' : (isMobile ? 'Anterior' : 'Passo Anterior')}
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
                                {processing ? 'A guardar...' : 'Confirmar e Guardar'}
                            </Button>
                        )}
                    </div>
                    {isMobile && <div className="h-20" />} {/* Spacer for sticky footer */}
                </form>
            </div>
        </AppLayout>
    );
}
