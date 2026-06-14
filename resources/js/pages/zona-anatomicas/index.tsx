import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { PlusCircle, Edit, Trash2, GripVertical } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData, type ZonaAnatomica } from '@/types/models';
import { toast } from 'react-toastify';

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

interface ZonaAnatomicaIndexProps {
    zonaAnatomicas: PaginatedData<ZonaAnatomica>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Administração', href: '#' },
    { title: 'Zonas Anatómicas', href: '/zona-anatomicas' },
];

// COMPONENTE SORTABLE PARA CADA LINHA
function SortableRow({ item, children }: any) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell className="w-4 cursor-grab" {...attributes} {...listeners}>
                <GripVertical className="text-gray-400" />
            </TableCell>
            {children}
        </TableRow>
    );
}

export default function ZonaAnatomicaIndex({ zonaAnatomicas }: ZonaAnatomicaIndexProps) {
    const [items, setItems] = useState(zonaAnatomicas.data);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    const handleDelete = (id: number) => {
        router.delete(`/zona-anatomicas/${id}`, {
            onSuccess: () => toast.success('Zona anatómica removida com sucesso!'),
        });
    };

    // QUANDO O UTILIZADOR SOLTA A LINHA
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);
        setItems(newOrder);

        // Enviar nova ordem para o backend
        router.post('/zona-anatomicas/reorder', {
            ordem: newOrder.map((item, index) => ({
                id: item.id,
                ordem: index + 1,
            })),
        }, {
            preserveScroll: true,
            onSuccess: () => toast.success('Ordem atualizada!'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Zonas Anatómicas" />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Zonas Anatómicas</h1>
                        <p className="text-muted-foreground">
                            Gestão de regiões anatómicas para diagnósticos
                        </p>
                    </div>
                    <Link href="/zona-anatomicas/create">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Nova Zona Anatómica
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Zonas Anatómicas</CardTitle>
                        <CardDescription>
                            Arraste para reordenar (estilo Trello)
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="rounded-md border">
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={items.map((i) => i.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead></TableHead>
                                                <TableHead>Ordem</TableHead>
                                                <TableHead>Nome</TableHead>
                                                <TableHead>Descrição</TableHead>
                                                <TableHead className="text-right">Ações</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {items.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                                        Nenhuma zona anatómica encontrada
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                items.map((item, index) => (
                                                    <SortableRow key={item.id} item={item}>
                                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                                        <TableCell className="font-medium">{item.nome}</TableCell>
                                                        <TableCell>{item.descricao || '-'}</TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <Link href={`/zona-anatomicas/${item.id}/edit`}>
                                                                    <Button variant="ghost" size="icon">
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                </Link>

                                                                <AlertDialog>
                                                                    <AlertDialogTrigger asChild>
                                                                        <Button variant="ghost" size="icon" className="text-destructive">
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                                Esta ação não pode ser desfeita. Isto irá eliminar permanentemente a zona anatómica "{item.nome}".
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                            <AlertDialogAction
                                                                                onClick={() => handleDelete(item.id)}
                                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                            >
                                                                                Eliminar
                                                                            </AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>
                                                            </div>
                                                        </TableCell>
                                                    </SortableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </SortableContext>
                            </DndContext>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
