import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { BreadcrumbItem, Procedimento, PaginatedData } from '@/types';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ProcedimentoIndexProps {
    procedimentos: PaginatedData<Procedimento>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administração',
        href: '#',
    },
    {
        title: 'Procedimentos',
        href: '/procedimentos',
    },
];

export default function ProcedimentoIndex({ procedimentos }: ProcedimentoIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Procedimentos" />
            
            <div className="p-4 sm:p-6 lg:p-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                        <div>
                            <CardTitle className="text-2xl font-bold">Procedimentos</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Gerir os procedimentos cirúrgicos disponíveis no sistema.
                            </p>
                        </div>
                        <Button asChild>
                            <Link href="/procedimentos/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Novo Procedimento
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center mb-6">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Procurar procedimentos..."
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Especialidade</TableHead>
                                        <TableHead className="text-center w-[150px]">Cirurgias</TableHead>
                                        <TableHead className="text-right w-[150px]">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {procedimentos.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                Nenhum procedimento encontrado.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        procedimentos.data.map((procedimento) => (
                                            <TableRow key={procedimento.id}>
                                                <TableCell className="font-medium">
                                                    {procedimento.nome}
                                                </TableCell>
                                                <TableCell>
                                                    {procedimento.especialidade || 'N/A'}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {procedimento.cirurgias_count || 0}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" asChild title="Editar">
                                                            <Link href={`/procedimentos/${procedimento.id}/edit`}>
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="text-destructive" title="Apagar">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination placeholder */}
                        {procedimentos.last_page > 1 && (
                            <div className="flex items-center justify-end space-x-2 py-4">
                                <div className="text-sm text-muted-foreground">
                                    Página {procedimentos.current_page} de {procedimentos.last_page}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
