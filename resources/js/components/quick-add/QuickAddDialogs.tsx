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
import { router } from '@inertiajs/react';
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
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.post('/especialidades', { nome, descricao }, {
            preserveState: true,
            preserveScroll: true,
            headers: {
                'X-Inertia-Modal-Redirect-Back': 'true',
            },
            onSuccess: () => {
                toast.success('Especialidade criada com sucesso');
                setOpen(false);
                setNome('');
                setDescricao('');
                if (onCreated) onCreated({ nome });
            },
            onFinish: () => setLoading(false),
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
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Ex: Cirurgia Geral"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="especialidade-desc">Descrição (Opcional)</Label>
                        <Textarea
                            id="especialidade-desc"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Breve descrição da especialidade..."
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading || !nome}>
                            {loading ? 'A criar...' : 'Criar Especialidade'}
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
    const [nome, setNome] = useState('');
    const [zonaAnatomica, setZonaAnatomica] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);
    const [showQuickAddZona, setShowQuickAddZona] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.post('/diagnosticos', { 
            nome, 
            zona_anatomica: zonaAnatomica, 
            tipo, 
            descricao 
        }, {
            preserveState: true,
            preserveScroll: true,
            headers: {
                'X-Inertia-Modal-Redirect-Back': 'true',
            },
            onSuccess: () => {
                toast.success('Diagnóstico criado com sucesso');
                setOpen(false);
                setNome('');
                setZonaAnatomica('');
                setTipo('');
                setDescricao('');
                if (onCreated) onCreated({ nome });
            },
            onFinish: () => setLoading(false),
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
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Ex: Apendicite Aguda"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="diag-zona">Zona Anatómica</Label>
                            <Button 
                                type="button" 
                                variant="link" 
                                size="sm" 
                                className="h-auto p-0 text-xs"
                                onClick={() => setShowQuickAddZona(true)}
                            >
                                <Plus className="mr-1 h-3 w-3" />
                                Nova Zona
                            </Button>
                        </div>
                        <Select value={zonaAnatomica} onValueChange={setZonaAnatomica}>
                            <SelectTrigger id="diag-zona">
                                <SelectValue placeholder="Selecione a zona" />
                            </SelectTrigger>
                            <SelectContent>
                                {zonaAnatomicas.map((zona) => (
                                    <SelectItem key={zona.id} value={zona.nome}>
                                        {zona.nome}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="diag-tipo">Tipo de Diagnóstico</Label>
                        <Select value={tipo} onValueChange={setTipo}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Benigno">Benigno</SelectItem>
                                <SelectItem value="Maligno">Maligno</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="diag-desc">Descrição (Opcional)</Label>
                        <Textarea
                            id="diag-desc"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Detalhes adicionais..."
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading || !nome || !zonaAnatomica}>
                            {loading ? 'A criar...' : 'Criar Diagnóstico'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        <QuickAddZonaAnatomica 
            open={showQuickAddZona} 
            onOpenChange={setShowQuickAddZona}
            onCreated={(newZona) => {
                setZonaAnatomica(newZona.nome);
            }}
        />
        </>
    );
}

export function QuickAddProcedimento({ 
    especialidades, 
    onCreated 
}: { 
    especialidades: Especialidade[], 
    onCreated?: (proc: any) => void 
}) {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.post('/procedimentos', { nome, especialidade, descricao }, {
            preserveState: true,
            preserveScroll: true,
            headers: {
                'X-Inertia-Modal-Redirect-Back': 'true',
            },
            onSuccess: () => {
                toast.success('Procedimento criado com sucesso');
                setOpen(false);
                setNome('');
                setEspecialidade('');
                setDescricao('');
                if (onCreated) onCreated({ nome, especialidade });
            },
            onFinish: () => setLoading(false),
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
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Ex: Apendicectomia Laparoscópica"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="proc-especialidade">Especialidade</Label>
                            <QuickAddEspecialidade onCreated={(newSpec) => setEspecialidade(newSpec.nome)} />
                        </div>
                        <Select value={especialidade} onValueChange={setEspecialidade}>
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
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="proc-desc">Descrição (Opcional)</Label>
                        <Textarea
                            id="proc-desc"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Detalhes adicionais..."
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading || !nome || !especialidade}>
                            {loading ? 'A criar...' : 'Criar Procedimento'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function QuickAddZonaAnatomica({ 
    onCreated 
}: { 
    onCreated?: (zona: any) => void 
}) {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.post('/zona-anatomicas', { 
            nome, 
            descricao 
        }, {
            preserveState: true,
            preserveScroll: true,
            headers: {
                'X-Inertia-Modal-Redirect-Back': 'true',
            },
            onSuccess: () => {
                toast.success('Zona anatómica criada com sucesso');
                setOpen(false);
                setNome('');
                setDescricao('');
                if (onCreated) onCreated({ nome });
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" type="button">
                    <Plus className="h-4 w-4 mr-1" /> Zona
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar Nova Zona Anatómica</DialogTitle>
                    <DialogDescription>
                        Adicione uma nova zona anatómica à sua lista.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="zona-nome">Nome</Label>
                        <Input
                            id="zona-nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Ex: Abdomen"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zona-desc">Descrição (Opcional)</Label>
                        <Textarea
                            id="zona-desc"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Detalhes adicionais..."
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading || !nome}>
                            {loading ? 'A criar...' : 'Criar Zona'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
