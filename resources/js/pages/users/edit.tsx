import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { BreadcrumbItem, User } from '@/types';
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
import { ArrowLeft, Save } from 'lucide-react';

interface UserEditProps {
    user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Administração', href: '#' },
    { title: 'Utilizadores', href: '/users' },
    { title: 'Editar', href: '#' },
];

export default function UserEdit({ user }: UserEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        hospital_de_origem: user.hospital_de_origem || '',
        especialidade: user.especialidade || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Utilizador: ${user.name}`} />
            
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
                        <CardTitle className="text-2xl font-bold">Editar Utilizador</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Atualize os dados de {user.name}. Deixe a palavra-passe em branco se não desejar alterá-la.
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
                                    <Label htmlFor="password">Nova Palavra-passe</Label>
                                    <Input 
                                        id="password" 
                                        type="password"
                                        value={data.password} 
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Min. 8 caracteres"
                                        className={errors.password ? 'border-destructive' : ''}
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-destructive">{errors.password}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Confirmar Nova Palavra-passe</Label>
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
                                <Input 
                                    id="hospital_de_origem" 
                                    value={data.hospital_de_origem} 
                                    onChange={(e) => setData('hospital_de_origem', e.target.value)}
                                    placeholder="Ex: Hospital de São João"
                                />
                                {errors.hospital_de_origem && (
                                    <p className="text-sm text-destructive">{errors.hospital_de_origem}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="especialidade">Especialidade</Label>
                                <Input 
                                    id="especialidade" 
                                    value={data.especialidade} 
                                    onChange={(e) => setData('especialidade', e.target.value)}
                                    placeholder="Ex: Cirurgia Geral"
                                />
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
                                {processing ? 'A guardar...' : 'Guardar Alterações'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
