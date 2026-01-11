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
import { type TipoDeCirurgia, type TipoDeOrigem, type Diagnostico, type Procedimento, type Especialidade, type Hospital } from '@/types/models';
import { useState, FormEventHandler, useEffect } from 'react';
import { QuickAddDiagnostico, QuickAddProcedimento, QuickAddEspecialidade } from '@/components/quick-add/QuickAddDialogs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface RegistoCirurgicoCreateProps {
    tiposDeCirurgia: TipoDeCirurgia[];
    tiposDeOrigem: TipoDeOrigem[];
    diagnosticos: Diagnostico[];
    procedimentos: Procedimento[];
    especialidades: Especialidade[];
    hospitals: Hospital[];
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
    enums = { sexo: [], funcoes: [], clavien: [], tipo_diagnostico: [] },
}: RegistoCirurgicoCreateProps) {
    const { auth } = usePage<SharedData>().props;
    const [step, setStep] = useState(1);
    const [searchProcesso, setSearchProcesso] = useState('');
    const [utenteFound, setUtenteFound] = useState<boolean | null>(null);

    const [utenteData, setUtenteData] = useState<UtenteData>({
        nome: '',
        processo: '',
        data_nascimento: '',
        sexo: '',
    });

    const [registoData, setRegistoData] = useState<RegistoData>({
        hospital: auth.user.hospital_de_origem || '',
        especialidade: auth.user.especialidade || '',
        data_cirurgia: '',
        tipo_de_cirurgia_id: '',
        tipo_de_origem_id: '',
        ambulatorio: false,
        observacoes: '',
        tipo_de_abordagem: '',
    });

    const [diagnosticosList, setDiagnosticosList] = useState<DiagnosticoData[]>([
        { diagnostico_id: '', tipo: '', procedimentos: [{ procedimento_id: '', funcao: '', clavien_dindo: '', anatomia_patologica: '', observacoes: '' }] }
    ]);

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

        const payload = {
            utente: utenteData,
            registo: registoData,
            diagnosticos: diagnosticosList,
        };

        router.post('/registos-cirurgicos', payload, {
            onSuccess: () => {
                toast.success('Registo cirúrgico criado com sucesso!');
            },
            onError: (errors) => {
                toast.error('Erro ao criar registo cirúrgico. Verifique os dados.');
                console.error(errors);
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
                return diagnosticosList.every(d => d.diagnostico_id);
            case 4:
                return diagnosticosList.every(d => d.procedimentos.every(p => p.procedimento_id && p.funcao));
            default:
                return true;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar Registo Cirúrgico" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Criar Registo Cirúrgico</h1>
                        <p className="text-muted-foreground font-medium">
                            {stepNames[step - 1]}
                        </p>
                    </div>
                </div>

                {/* Progress */}
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        {stepNames.map((name, index) => {
                            const s = index + 1;
                            return (
                                <div key={s} className="flex-1 flex flex-col gap-2 items-center">
                                    <div
                                        className={`h-2 w-full rounded transition-colors ${s <= step ? 'bg-primary' : 'bg-muted'}`}
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
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="especialidade">
                                                Especialidade <span className="text-destructive">*</span>
                                            </Label>
                                            <QuickAddEspecialidade onCreated={(newEspecialidade) => setRegistoData({ ...registoData, especialidade: newEspecialidade.nome })} />
                                        </div>
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
                                <CardTitle>{stepNames[2]}</CardTitle>
                                <CardDescription>
                                    Adicione os diagnósticos da cirurgia
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {diagnosticosList.map((diag, index) => (
                                    <div key={index} className="rounded-md border p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label>Diagnóstico {index + 1}</Label>
                                            <div className="flex gap-2">
                                                <QuickAddDiagnostico 
                                                    especialidades={especialidades} 
                                                    onCreated={(newDiag) => {
                                                        // O Inertia refresca as props automaticamente
                                                        // Mas para selecionar o novo item, podemos ter de procurar na lista atualizada
                                                        // No entanto, as props ainda não mudaram aqui.
                                                    }}
                                                />
                                                {diagnosticosList.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeDiagnostico(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                            </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label>Diagnóstico <span className="text-destructive">*</span></Label>
                                                <Select
                                                    value={diag.diagnostico_id}
                                                    onValueChange={(value) => updateDiagnostico(index, 'diagnostico_id', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o diagnóstico" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {diagnosticos.map((d) => (
                                                            <SelectItem key={d.id} value={d.id.toString()}>
                                                                {d.nome}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Tipo de Diagnóstico</Label>
                                                <Select
                                                    value={diag.tipo}
                                                    onValueChange={(value) => updateDiagnostico(index, 'tipo', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o tipo" />
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
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addDiagnostico}
                                    className="w-full"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Adicionar Diagnóstico
                                </Button>
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
                                {/* Utente */}
                                <div>
                                    <h3 className="font-semibold mb-2">Utente</h3>
                                    <div className="rounded-md border p-4 space-y-1 text-sm">
                                        <p><strong>Nome:</strong> {utenteData.nome}</p>
                                        <p><strong>Processo:</strong> {utenteData.processo}</p>
                                        <p><strong>Data Nascimento:</strong> {convertISOToPT(utenteData.data_nascimento)}</p>
                                        <p><strong>Sexo:</strong> {utenteData.sexo}</p>
                                    </div>
                                </div>

                                {/* Registo */}
                                <div>
                                    <h3 className="font-semibold mb-2">Registo Cirúrgico</h3>
                                    <div className="rounded-md border p-4 space-y-1 text-sm">
                                        <p><strong>Data:</strong> {convertISOToPT(registoData.data_cirurgia)}</p>
                                        <p><strong>Tipo:</strong> {tiposDeCirurgia.find(t => t.id.toString() === registoData.tipo_de_cirurgia_id)?.nome}</p>
                                        <p><strong>Origem:</strong> {tiposDeOrigem.find(t => t.id.toString() === registoData.tipo_de_origem_id)?.nome}</p>
                                        <p><strong>Abordagem:</strong> {registoData.tipo_de_abordagem}</p>
                                        <p><strong>Ambulatório:</strong> {registoData.ambulatorio ? 'Sim' : 'Não'}</p>
                                        {registoData.observacoes && <p><strong>Obs:</strong> {registoData.observacoes}</p>}
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
                    <div className="flex justify-between pt-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => step > 1 ? setStep(step - 1) : router.visit('/registos-cirurgicos')}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {step === 1 ? 'Cancelar' : 'Anterior'}
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
                                {processing ? 'A guardar...' : 'Confirmar e Guardar'}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
