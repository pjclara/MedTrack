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

interface Area {
    id: number;
    nome: string;
}

export function QuickAddArea({ onCreated }: { onCreated?: (area: any) => void }) {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.post('/areas', { nome, descricao }, {
            preserveState: true,
            preserveScroll: true,
            headers: {
                'X-Inertia-Modal-Redirect-Back': 'true',
            },
            onSuccess: () => {
                toast.success('Área criada com sucesso');
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
                    <Plus className="h-4 w-4 mr-1" /> Especialidade/Área
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar Nova Área / Especialidade</DialogTitle>
                    <DialogDescription>
                        Adicione uma nova área cirúrgica à sua lista.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="area-nome">Nome</Label>
                        <Input
                            id="area-nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Ex: Cirurgia Geral"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="area-desc">Descrição (Opcional)</Label>
                        <Textarea
                            id="area-desc"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Breve descrição da área..."
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading || !nome}>
                            {loading ? 'A criar...' : 'Criar Área'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function QuickAddDiagnostico({ 
    areas, 
    onCreated 
}: { 
    areas: Area[], 
    onCreated?: (diag: any) => void 
}) {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [area, setArea] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.post('/diagnosticos', { nome, area, tipo, descricao }, {
            preserveState: true,
            preserveScroll: true,
            headers: {
                'X-Inertia-Modal-Redirect-Back': 'true',
            },
            onSuccess: () => {
                toast.success('Diagnóstico criado com sucesso');
                setOpen(false);
                setNome('');
                setArea('');
                setTipo('');
                setDescricao('');
                if (onCreated) onCreated({ nome, area, tipo });
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
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
                            <Label htmlFor="diag-area">Área / Especialidade</Label>
                            <QuickAddArea onCreated={(newArea) => setArea(newArea.nome)} />
                        </div>
                        <Select value={area} onValueChange={setArea}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione a área" />
                            </SelectTrigger>
                            <SelectContent>
                                {areas.map((a) => (
                                    <SelectItem key={a.id} value={a.nome}>
                                        {a.nome}
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
                        <Button type="submit" disabled={loading || !nome || !area}>
                            {loading ? 'A criar...' : 'Criar Diagnóstico'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function QuickAddProcedimento({ 
    areas, 
    onCreated 
}: { 
    areas: Area[], 
    onCreated?: (proc: any) => void 
}) {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [area, setArea] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.post('/procedimentos', { nome, area, descricao }, {
            preserveState: true,
            preserveScroll: true,
            headers: {
                'X-Inertia-Modal-Redirect-Back': 'true',
            },
            onSuccess: () => {
                toast.success('Procedimento criado com sucesso');
                setOpen(false);
                setNome('');
                setArea('');
                setDescricao('');
                if (onCreated) onCreated({ nome, area });
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
                            <Label htmlFor="proc-area">Área / Especialidade</Label>
                            <QuickAddArea onCreated={(newArea) => setArea(newArea.nome)} />
                        </div>
                        <Select value={area} onValueChange={setArea}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione a área" />
                            </SelectTrigger>
                            <SelectContent>
                                {areas.map((a) => (
                                    <SelectItem key={a.id} value={a.nome}>
                                        {a.nome}
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
                        <Button type="submit" disabled={loading || !nome || !area}>
                            {loading ? 'A criar...' : 'Criar Procedimento'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
