import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-toastify';

interface Especialidade {
    id: number;
    nome: string;
}

export function QuickAddEspecialidade({ onCreated }: { onCreated?: (especialidade: any) => void }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        nome: '',
        descricao: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/especialidades', {
            preserveState: true,
            preserveScroll: true,
            headers: {
                'X-Inertia-Modal-Redirect-Back': 'true',
            },
            onSuccess: () => {
                toast.success('Especialidade criada com sucesso');
                setOpen(false);
                reset();
                if (onCreated) onCreated({ nome: data.nome });
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" type="button">
                    <Plus className="h-4 w-4 mr-1" /> Especialidade
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar Nova Especialidade</DialogTitle>
                    <DialogDescription>
                        Adicione uma nova especialidade à sua lista.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="especialidade-nome">Nome</Label>
                        <Input
                            id="especialidade-nome"
                            value={data.nome}
                            onChange={(e) => setData('nome', e.target.value)}
                            placeholder="Ex: Cirurgia Geral"
                            required
                        />
                        {errors.nome && <p className="text-xs text-destructive">{errors.nome}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="especialidade-desc">Descrição (Opcional)</Label>
                        <Textarea
                            id="especialidade-desc"
                            value={data.descricao}
                            onChange={(e) => setData('descricao', e.target.value)}
                            placeholder="Breve descrição da especialidade..."
                        />
                        {errors.descricao && <p className="text-xs text-destructive">{errors.descricao}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing || !data.nome}>
                            {processing ? 'A criar...' : 'Criar Especialidade'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function QuickAddDiagnostico({ 
    onCreated,
    zonaAnatomicas = []
}: { 
    onCreated?: (diag: any) => void;
    zonaAnatomicas?: any[];
}) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        nome: '',
        zona_anatomica: '',
        tipo: '',
        descricao: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/diagnosticos', {
            preserveState: true,
            preserveScroll: true,
            headers: {
                'X-Inertia-Modal-Redirect-Back': 'true',
            },
            onSuccess: () => {
                toast.success('Diagnóstico criado com sucesso');
                setOpen(false);
                reset();
                if (onCreated) onCreated({ nome: data.nome });
            },
        });
    };

    return (
        <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" type="button">
                    <Plus className="h-4 w-4 mr-1" /> Diagnóstico
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar Novo Diagnóstico</DialogTitle>
                    <DialogDescription>
                        Adicione um novo diagnóstico à sua lista.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="diag-nome">Nome do Diagnóstico</Label>
                        <Input
                            id="diag-nome"
                            value={data.nome}
                            onChange={(e) => setData('nome', e.target.value)}
                            placeholder="Ex: Apendicite Aguda"
                            required
                        />
                        {errors.nome && <p className="text-xs text-destructive">{errors.nome}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="diag-zona">Zona Anatómica</Label>
                        <Select 
                            value={data.zona_anatomica} 
                            onValueChange={(val) => setData('zona_anatomica', val)}
                        >
                            <SelectTrigger id="diag-zona">
                                <SelectValue placeholder="Selecione a zona" />
                            </SelectTrigger>
                            <SelectContent>
                                {zonaAnatomicas.map((zona: any) => (
                                    <SelectItem key={zona.id || zona} value={zona.nome || zona}>
                                        {zona.nome || zona}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.zona_anatomica && <p className="text-xs text-destructive">{errors.zona_anatomica}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="diag-tipo">Tipo de Diagnóstico (Opcional)</Label>
                        <Select 
                            value={data.tipo} 
                            onValueChange={(val) => setData('tipo', val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Benigno">Benigno</SelectItem>
                                <SelectItem value="Maligno">Maligno</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.tipo && <p className="text-xs text-destructive">{errors.tipo}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="diag-desc">Descrição (Opcional)</Label>
                        <Textarea
                            id="diag-desc"
                            value={data.descricao}
                            onChange={(e) => setData('descricao', e.target.value)}
                            placeholder="Detalhes adicionais..."
                        />
                        {errors.descricao && <p className="text-xs text-destructive">{errors.descricao}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing || !data.nome || !data.zona_anatomica}>
                            {processing ? 'A criar...' : 'Criar Diagnóstico'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        </>
    );
}

export function QuickAddProcedimento({ 
    especialidades = [], 
    onCreated 
}: { 
    especialidades?: Especialidade[], 
    onCreated?: (proc: any) => void 
}) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        nome: '',
        especialidade: '',
        descricao: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/procedimentos', {
            preserveState: true,
            preserveScroll: true,
            headers: {
                'X-Inertia-Modal-Redirect-Back': 'true',
            },
            onSuccess: () => {
                toast.success('Procedimento criado com sucesso');
                setOpen(false);
                reset();
                if (onCreated) onCreated({ nome: data.nome, especialidade: data.especialidade });
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" type="button">
                    <Plus className="h-4 w-4 mr-1" /> Procedimento
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar Novo Procedimento</DialogTitle>
                    <DialogDescription>
                        Adicione um novo procedimento à sua lista.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="proc-nome">Nome do Procedimento</Label>
                        <Input
                            id="proc-nome"
                            value={data.nome}
                            onChange={(e) => setData('nome', e.target.value)}
                            placeholder="Ex: Apendicectomia Laparoscópica"
                            required
                        />
                        {errors.nome && <p className="text-xs text-destructive">{errors.nome}</p>}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="proc-especialidade">Especialidade</Label>
                            <QuickAddEspecialidade onCreated={(newSpec) => setData('especialidade', newSpec.nome)} />
                        </div>
                        <Select 
                            value={data.especialidade} 
                            onValueChange={(val) => setData('especialidade', val)}
                        >
                            <SelectTrigger id="proc-especialidade">
                                <SelectValue placeholder="Selecione a especialidade" />
                            </SelectTrigger>
                            <SelectContent>
                                {especialidades.map((s) => (
                                    <SelectItem key={s.id} value={s.nome}>
                                        {s.nome}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.especialidade && <p className="text-xs text-destructive">{errors.especialidade}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="proc-desc">Descrição (Opcional)</Label>
                        <Textarea
                            id="proc-desc"
                            value={data.descricao}
                            onChange={(e) => setData('descricao', e.target.value)}
                            placeholder="Detalhes adicionais..."
                        />
                        {errors.descricao && <p className="text-xs text-destructive">{errors.descricao}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing || !data.nome || !data.especialidade}>
                            {processing ? 'A criar...' : 'Criar Procedimento'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
