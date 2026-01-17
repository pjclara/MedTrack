import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type ZonaAnatomica } from '@/types/models';

interface ZonaAnatomicaShowProps {
    zonaAnatomica: ZonaAnatomica;
}

export default function ZonaAnatomicaShow({ zonaAnatomica }: ZonaAnatomicaShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Administração', href: '#' },
        { title: 'Zonas Anatómicas', href: '/zona-anatomicas' },
        { title: zonaAnatomica.nome, href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Zona Anatómica: ${zonaAnatomica.nome}`} />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/zona-anatomicas">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{zonaAnatomica.nome}</h1>
                            <p className="text-muted-foreground">
                                Detalhes da zona anatómica
                            </p>
                        </div>
                    </div>
                    <Link href={`/zona-anatomicas/${zonaAnatomica.id}/edit`}>
                        <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar Zona Anatómica
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Gerais</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Nome</h3>
                                <p className="text-lg font-semibold">{zonaAnatomica.nome}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Descrição</h3>
                                <p className="text-base">{zonaAnatomica.descricao || 'Sem descrição.'}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
