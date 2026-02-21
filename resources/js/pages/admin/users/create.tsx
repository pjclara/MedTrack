import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, Save } from 'lucide-react';

interface Props {
    hospitals: string[];
    especialidades: string[];
}

export default function UserCreate({ hospitals, especialidades }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        hospital_de_origem: '',
        especialidade: '',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/users');
    };

    const breadcrumbs = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Utilizadores', href: '/admin/users' },
        { title: 'Novo Utilizador', href: '/admin/users/create' },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Utilizador" />

            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin/users">
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Voltar
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">Criar Novo Utilizador</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações do Utilizador</CardTitle>
                            <CardDescription>Preencha os dados básicos para criar a conta.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input 
                                    id="name" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                    error={errors.name}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email"
                                    value={data.email} 
                                    onChange={e => setData('email', e.target.value)} 
                                    error={errors.email}
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Palavra-passe</Label>
                                    <Input 
                                        id="password" 
                                        type="password"
                                        value={data.password} 
                                        onChange={e => setData('password', e.target.value)} 
                                        error={errors.password}
                                    />
                                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Confirmar Palavra-passe</Label>
                                    <Input 
                                        id="password_confirmation" 
                                        type="password"
                                        value={data.password_confirmation} 
                                        onChange={e => setData('password_confirmation', e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hospital">Hospital de Origem</Label>
                                    <Select value={data.hospital_de_origem} onValueChange={v => setData('hospital_de_origem', v)}>
                                        <SelectTrigger id="hospital">
                                            <SelectValue placeholder="Selecionar hospital" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {hospitals.map(h => (
                                                <SelectItem key={h} value={h}>{h}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="especialidade">Especialidade</Label>
                                    <Select value={data.especialidade} onValueChange={v => setData('especialidade', v)}>
                                        <SelectTrigger id="especialidade">
                                            <SelectValue placeholder="Selecionar especialidade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {especialidades.map(e => (
                                                <SelectItem key={e} value={e}>{e}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 pt-4">
                                <Checkbox 
                                    id="is_active" 
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', !!checked)}
                                />
                                <Label htmlFor="is_active" className="text-sm font-medium leading-none cursor-pointer">
                                    Utilizador Ativo
                                </Label>
                                <p className="text-xs text-neutral-500 ml-2">(Se desativado, o utilizador não poderá fazer login)</p>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" className="w-full" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Criar Utilizador
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
