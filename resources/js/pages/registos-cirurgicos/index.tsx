import { Head, Link, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Eye, FileDown, Hospital, User, Activity, Copy, Stethoscope, Scissors, UserCheck, UserCircle, Search, X, ClipboardList } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type RegistoCirurgico, type PaginatedData, type Diagnostico, type Procedimento, type TipoDeCirurgia } from '@/types/models';
import registosCirurgicos from '@/routes/registos-cirurgicos';
import { useIsMobile } from '@/hooks/use-mobile';

interface RegistoCirurgicoIndexProps {
    registos: PaginatedData<RegistoCirurgico>;
    filters: { search?: string; data_inicio?: string; data_fim?: string; diagnostico_id?: string; procedimento_id?: string; tipo_de_cirurgia_ids?: string[] };
    diagnosticos: Diagnostico[];
    procedimentos: Procedimento[];
    tipos_cirurgia: TipoDeCirurgia[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Registos Cirúrgicos', href: '/registos-cirurgicos' },
];

export default function RegistoCirurgicoIndex({ registos, filters, diagnosticos, procedimentos, tipos_cirurgia }: RegistoCirurgicoIndexProps) {
    const isMobile = useIsMobile();

    const [search, setSearch] = useState(filters.search ?? '');
    const [dataInicio, setDataInicio] = useState(filters.data_inicio ?? '');
    const [dataFim, setDataFim] = useState(filters.data_fim ?? '');
    const [diagnosticoId, setDiagnosticoId] = useState(filters.diagnostico_id ?? '');
    const [procedimentoId, setProcedimentoId] = useState(filters.procedimento_id ?? '');
    const [tipoCirurgiaIds, setTipoCirurgiaIds] = useState<string[]>(filters.tipo_de_cirurgia_ids ?? []);
    const [tipoCirurgiaOpen, setTipoCirurgiaOpen] = useState(false);
    const tipoCirurgiaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (tipoCirurgiaRef.current && !tipoCirurgiaRef.current.contains(e.target as Node)) {
                setTipoCirurgiaOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleTipoCirurgia = (id: string) => {
        setTipoCirurgiaIds((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const handleFilter = () => {
        router.get('/registos-cirurgicos', {
            ...(search && { search }),
            ...(dataInicio && { data_inicio: dataInicio }),
            ...(dataFim && { data_fim: dataFim }),
            ...(diagnosticoId && { diagnostico_id: diagnosticoId }),
            ...(procedimentoId && { procedimento_id: procedimentoId }),
            ...(tipoCirurgiaIds.length > 0 && { tipo_de_cirurgia_ids: tipoCirurgiaIds }),
        }, { preserveState: true, replace: true });
    };

    const handleClear = () => {
        setSearch('');
        setDataInicio('');
        setDataFim('');
        setDiagnosticoId('');
        setProcedimentoId('');
        setTipoCirurgiaIds([]);
        router.get('/registos-cirurgicos', {}, { preserveState: true, replace: true });
    };

    const hasFilters = !!(filters.search || filters.data_inicio || filters.data_fim || filters.diagnostico_id || filters.procedimento_id || filters.tipo_de_cirurgia_ids?.length);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('pt-PT');
    };


    const getFuncaoIcon = (funcao?: string) => {
        if (!funcao) return Stethoscope;
        const funcaoLower = funcao.toLowerCase();
        if (funcaoLower.includes('principal')) return UserCircle;
        if (funcaoLower.includes('assistente')) return UserCheck;
        return Stethoscope;
    };

    const getFuncaoText = (cirurgia: any) => {
        return cirurgia.funcao_cirurgiao?.nome || 'N/A';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registos Cirúrgicos" />

            <div className={`flex flex-col gap-4 ${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                    <div>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>Registos Cirúrgicos</h1>
                        <p className="text-muted-foreground">
                            Gerir os registos de cirurgias realizadas
                        </p>
                    </div>
                    <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
                        <a href={registosCirurgicos.export().url} className={isMobile ? 'flex-1' : ''}>
                            <Button variant="outline" className="w-full">
                                <FileDown className="mr-2 h-4 w-4" />
                                {isMobile ? 'Exportar' : 'Exportar Excel'}
                            </Button>
                        </a>
                        <Link href="/registos-cirurgicos/create" className={isMobile ? 'flex-1' : ''}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                {isMobile ? 'Novo' : 'Novo Registo'}
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader className={isMobile ? 'px-4 py-4' : ''}>
                        <CardTitle>Lista de Registos</CardTitle>
                        <CardDescription>
                            Total de {registos.total} registos cirúrgicos
                        </CardDescription>
                        {/* Filtros */}
                        <div className={`flex flex-wrap gap-2 pt-2 ${isMobile ? 'flex-col' : 'items-end'}`}>
                            <div className="relative flex-1 min-w-[180px]">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Pesquisar utente, processo, hospital..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                                    className="pl-8"
                                />
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <Input
                                    type="date"
                                    value={dataInicio}
                                    onChange={(e) => setDataInicio(e.target.value)}
                                    className="w-36"
                                    title="Data início"
                                />
                                <Input
                                    type="date"
                                    value={dataFim}
                                    onChange={(e) => setDataFim(e.target.value)}
                                    className="w-36"
                                    title="Data fim"
                                />
                                <select
                                    value={diagnosticoId}
                                    onChange={(e) => setDiagnosticoId(e.target.value)}
                                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring w-44"
                                >
                                    <option value="">Todos os diagnósticos</option>
                                    {diagnosticos.map((d) => (
                                        <option key={d.id} value={d.id}>{d.nome}</option>
                                    ))}
                                </select>
                                <select
                                    value={procedimentoId}
                                    onChange={(e) => setProcedimentoId(e.target.value)}
                                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring w-44"
                                >
                                    <option value="">Todas as intervenções</option>
                                    {procedimentos.map((p) => (
                                        <option key={p.id} value={p.id}>{p.nome}</option>
                                    ))}
                                </select>
                                {/* Multiselect Tipo Cirurgia */}
                                <div className="relative" ref={tipoCirurgiaRef}>
                                    <button
                                        type="button"
                                        onClick={() => setTipoCirurgiaOpen((v) => !v)}
                                        className="h-9 min-w-[160px] max-w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm text-left flex items-center justify-between gap-2 focus:outline-none focus:ring-1 focus:ring-ring"
                                    >
                                        <span className="truncate">
                                            {tipoCirurgiaIds.length === 0
                                                ? 'Tipo de Cirurgia'
                                                : tipoCirurgiaIds.length === 1
                                                    ? tipos_cirurgia.find((t) => t.id.toString() === tipoCirurgiaIds[0])?.nome ?? '1 tipo'
                                                    : `${tipoCirurgiaIds.length} tipos`}
                                        </span>
                                        <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {tipoCirurgiaOpen && (
                                        <div className="absolute z-50 mt-1 w-52 rounded-md border border-input bg-background shadow-md">
                                            <div className="max-h-56 overflow-y-auto py-1">
                                                {tipos_cirurgia.map((t) => (
                                                    <label
                                                        key={t.id}
                                                        className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={tipoCirurgiaIds.includes(t.id.toString())}
                                                            onChange={() => toggleTipoCirurgia(t.id.toString())}
                                                            className="accent-emerald-600"
                                                        />
                                                        {t.nome}
                                                    </label>
                                                ))}
                                            </div>
                                            {tipoCirurgiaIds.length > 0 && (
                                                <div className="border-t px-3 py-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => setTipoCirurgiaIds([])}
                                                        className="text-xs text-muted-foreground hover:text-foreground"
                                                    >
                                                        Limpar seleção
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleFilter} className="bg-emerald-600 hover:bg-emerald-700">
                                    <Search className="mr-2 h-4 w-4" />
                                    Filtrar
                                </Button>
                                {hasFilters && (
                                    <Button variant="outline" onClick={handleClear}>
                                        <X className="mr-2 h-4 w-4" />
                                        Limpar
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className={isMobile ? 'px-2 pb-4' : ''}>
                        {!isMobile ? (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Data</TableHead>
                                            <TableHead>Utente</TableHead>
                                            <TableHead>Tipo Cirurgia</TableHead>
                                            <TableHead>Diagnósticos</TableHead>
                                            <TableHead>Função</TableHead>
                                            <TableHead>Cirurgias</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {registos.data.length === 0 ? (
                                            <TableRow>
                                        <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                                                    Nenhum registo encontrado
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            registos.data.map((registo) => {
                                                const semClavien = registo.cirurgias?.some(
                                                    (c) => c.funcao_cirurgiao?.nome?.toLowerCase().includes('principal') && !c.clavien_dindo
                                                ) ?? false;
                                                return (
                                                <TableRow key={registo.id} className={semClavien ? 'bg-orange-50 dark:bg-orange-950/20' : ''}>
                                                    <TableCell className="font-medium text-nowrap">
                                                        {formatDate(registo.data_cirurgia)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {registo.utente ? (
                                                            <Link href={`/utentes/${registo.utente.id}`} className="hover:underline font-medium text-emerald-700">
                                                                {registo.utente.processo}
                                                            </Link>
                                                        ) : (
                                                            <span className="text-muted-foreground">-</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {registo.tipo_de_cirurgia?.nome || '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col gap-1">
                                                            {registo.cirurgias && registo.cirurgias.length > 0
                                                                ? [...new Map(registo.cirurgias.filter(c => c.diagnostico).map(c => [c.diagnostico!.id, c.diagnostico!.nome])).values()].map((nome, i) => (
                                                                    <Badge key={i} variant="secondary" className="text-xs font-normal">
                                                                        <ClipboardList className="h-3 w-3 mr-1" />
                                                                        {nome}
                                                                    </Badge>
                                                                ))
                                                                : <span className="text-muted-foreground">-</span>
                                                            }
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col gap-1">
                                                            {registo.cirurgias && registo.cirurgias.length > 0
                                                                ? [...new Map(registo.cirurgias.filter(c => c.funcao_cirurgiao).map(c => [c.funcao_cirurgiao!.id, c.funcao_cirurgiao!.nome])).values()].map((nome, i) => {
                                                                    const FuncaoIcon = getFuncaoIcon(nome);
                                                                    const isPrincipal = nome.toLowerCase().includes('principal');
                                                                    const clavien = isPrincipal
                                                                        ? registo.cirurgias!.find(c => c.funcao_cirurgiao?.nome === nome)?.clavien_dindo
                                                                        : undefined;
                                                                    return (
                                                                        <div key={i} className="flex flex-col gap-0.5">
                                                                            <Badge variant="outline" className="text-xs font-normal">
                                                                                <FuncaoIcon className="h-3 w-3 mr-1" />
                                                                                {nome}
                                                                            </Badge>
                                                                            {isPrincipal && clavien && (
                                                                                <Badge variant={['IIIa','IIIb','IVa','IVb','V'].includes(clavien) ? 'destructive' : 'secondary'} className="text-xs font-normal">
                                                                                    CD: {clavien}
                                                                                </Badge>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })
                                                                : <span className="text-muted-foreground">-</span>
                                                            }
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1">
                                                            <Badge variant="secondary" className="font-mono text-xs">
                                                                {registo.cirurgias_count || 0} cirurgia{registo.cirurgias_count !== 1 ? 's' : ''}
                                                            </Badge>
                                                            {registo.cirurgias && registo.cirurgias.length > 0 && (
                                                                <div className="flex flex-col gap-1 mt-1">
                                                                    {registo.cirurgias.map((cirurgia, idx) => (
                                                                        <div key={idx} className="flex items-center gap-1 text-xs">
                                                                            {cirurgia.procedimento && (
                                                                                <Badge variant="secondary" className="text-xs font-normal">
                                                                                    <Scissors className="h-3 w-3 mr-1" />
                                                                                    {cirurgia.procedimento.nome}
                                                                                </Badge>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>

                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Link href={`/registos-cirurgicos/${registo.id}`}>
                                                                <Button variant="ghost" size="sm">
                                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                                </Button>
                                                            </Link>
                                                            <Link href={`/registos-cirurgicos/${registo.id}/edit`}>
                                                                <Button variant="ghost" size="sm">
                                                                    <Edit className="h-4 w-4 text-emerald-600" />
                                                                </Button>
                                                            </Link>
                                                            <Link href={`/registos-cirurgicos/create?duplicate_from=${registo.id}`}>
                                                                <Button variant="ghost" size="sm" title="Duplicar">
                                                                    <Copy className="h-4 w-4 text-blue-600" />
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                );
                                            })
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {registos.data.length === 0 ? (
                                    <div className="text-center py-10 text-muted-foreground border rounded-lg bg-muted/10">
                                        Nenhum registo encontrado
                                    </div>
                                ) : (
                                    registos.data.map((registo) => (
                                        <div key={registo.id} className="rounded-lg border p-4 space-y-3 active:bg-muted/50 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                                        {formatDate(registo.data_cirurgia)}
                                                    </p>
                                                    <h3 className="font-bold text-lg text-emerald-900 leading-tight">
                                                        {registo.utente?.nome || 'Utente s/ Nome'}
                                                    </h3>
                                                </div>
                                                <div className="flex flex-col gap-1 items-end">
                                                    {registo.cirurgias && registo.cirurgias.length > 0
                                                        ? [...new Map(registo.cirurgias.filter(c => c.diagnostico).map(c => [c.diagnostico!.id, c.diagnostico!.nome])).values()].map((nome, i) => (
                                                            <Badge key={i} variant="secondary" className="text-xs">
                                                                <ClipboardList className="h-3 w-3 mr-1" />
                                                                {nome}
                                                            </Badge>
                                                        ))
                                                        : <Badge variant="outline">Sem diagnósticos</Badge>
                                                    }
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                                    <span>{registo.tipo_de_cirurgia?.nome || '-'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Hospital className="h-4 w-4 text-muted-foreground" />
                                                    <span>{registo.hospital || '-'}</span>
                                                </div>
                                                {registo.cirurgias && registo.cirurgias.length > 0 && (
                                                    <div className="mt-2 pt-2 border-t space-y-1.5">
                                                        <div className="font-semibold text-xs text-emerald-700 flex items-center gap-1">
                                                            <Stethoscope className="h-3 w-3" />
                                                            {registo.cirurgias_count} Cirurgia{registo.cirurgias_count !== 1 ? 's' : ''}
                                                        </div>
                                                        {registo.cirurgias.map((cirurgia, idx) => {
                                                            const FuncaoIcon = getFuncaoIcon(cirurgia.funcao_cirurgiao?.nome);
                                                            return (
                                                            <div key={idx} className="text-xs pl-4 space-y-0.5">
                                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                                    <FuncaoIcon className="h-3 w-3" />
                                                                    <span className="font-medium">{getFuncaoText(cirurgia)}</span>
                                                                    
                                                                </div>
                                                                {cirurgia.procedimento && (
                                                                    <div className="flex items-center gap-1 text-emerald-700 pl-4">
                                                                        <Scissors className="h-3 w-3" />
                                                                        <span className="font-medium">{cirurgia.procedimento.nome}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="pt-2 flex justify-between items-center border-t">
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <User className="h-3 w-3" />
                                                    {registo.user?.name}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Link href={`/registos-cirurgicos/${registo.id}`}>
                                                        <Button variant="outline" size="sm" className="h-8">
                                                            <Eye className="mr-2 h-3.5 w-3.5" /> Ver
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/registos-cirurgicos/${registo.id}/edit`}>
                                                        <Button variant="secondary" size="sm" className="h-8 text-emerald-700 bg-emerald-50 hover:bg-emerald-100">
                                                            <Edit className="mr-2 h-3.5 w-3.5" /> Editar
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/registos-cirurgicos/create?duplicate_from=${registo.id}`}>
                                                        <Button variant="outline" size="sm" className="h-8 text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100">
                                                            <Copy className="mr-2 h-3.5 w-3.5" /> Duplicar
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {registos.last_page > 1 && (
                            <div className={`mt-4 flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                                <p className="text-sm text-muted-foreground text-center">
                                    A mostrar {registos.from} a {registos.to} de {registos.total} resultados
                                </p>
                                <div className={`flex gap-2 ${isMobile ? 'justify-center border-t pt-4' : ''}`}>
                                    {registos.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveScroll
                                        >
                                            <Button
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                disabled={!link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
