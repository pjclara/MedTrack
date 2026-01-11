import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle,
    CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

interface UserCreateProps {
    hospitals: { nome: string }[];
    especialidades: { nome: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Administração', href: '#' },
    { title: 'Utilizadores', href: '/users' },
    { title: 'Novo', href: '/users/create' },
];

export default function UserCreate({ hospitals, especialidades }: UserCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        hospital_de_origem: '',
        especialidade: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Utilizador" />
            
            <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
                        <Link href="/users">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para a lista
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Novo Utilizador</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Registe um novo utilizador no sistema.
                        </p>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input 
                                    id="name" 
                                    value={data.name} 
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Ex: João Silva"
                                    className={errors.name ? 'border-destructive' : ''}
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email"
                                    value={data.email} 
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="exemplo@medtrack.com"
                                    className={errors.email ? 'border-destructive' : ''}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Palavra-passe</Label>
                                    <Input 
                                        id="password" 
                                        type="password"
                                        value={data.password} 
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={errors.password ? 'border-destructive' : ''}
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-destructive">{errors.password}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Confirmar Palavra-passe</Label>
                                    <Input 
                                        id="password_confirmation" 
                                        type="password"
                                        value={data.password_confirmation} 
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="hospital_de_origem">Hospital de Origem</Label>
                                <Select 
                                    value={data.hospital_de_origem} 
                                    onValueChange={(value) => setData('hospital_de_origem', value)}
                                >
                                    <SelectTrigger id="hospital_de_origem" className={errors.hospital_de_origem ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Selecione um hospital" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {hospitals.map((hospital) => (
                                            <SelectItem key={hospital.nome} value={hospital.nome}>
                                                {hospital.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.hospital_de_origem && (
                                    <p className="text-sm text-destructive">{errors.hospital_de_origem}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="especialidade">Especialidade</Label>
                                <Select 
                                    value={data.especialidade} 
                                    onValueChange={(value) => setData('especialidade', value)}
                                >
                                    <SelectTrigger id="especialidade" className={errors.especialidade ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Selecione uma especialidade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {especialidades.map((especialidade) => (
                                            <SelectItem key={especialidade.nome} value={especialidade.nome}>
                                                {especialidade.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.especialidade && (
                                    <p className="text-sm text-destructive">{errors.especialidade}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 border-t pt-6 mt-4">
                            <Button variant="outline" asChild type="button">
                                <Link href="/users">Cancelar</Link>
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'A guardar...' : 'Guardar Utilizador'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
