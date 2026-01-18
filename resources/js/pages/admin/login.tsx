import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <Head title="Admin Login" />
            
            <div className="w-full max-w-md p-6">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">MedTrack Admin</h1>
                    <p className="text-neutral-500">by SurgTuga</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Introduza as suas credenciais para aceder.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@medtrack.com"
                                        className="pl-10"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Palavra-passe</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        className="pl-10"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                            </div>

                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg" disabled={processing}>
                                {processing ? 'A processar...' : 'Entrar'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
