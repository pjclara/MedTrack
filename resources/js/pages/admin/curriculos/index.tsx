import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import { 
    Search, 
    Filter, 
    ChevronRight, 
    ClipboardList, 
    Activity, 
    BookOpen,
    Eye,
    Download
} from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import { useState } from 'react';

interface PaginatedData<T> {
    data: T[];
    links: any;
    current_page: number;
    last_page: number;
    total: number;
}

interface Item {
    id: number;
    type: string;
    title: string;
    date: string;
    user_name: string;
    details: string;
}

interface Props {
    items: PaginatedData<Item>;
    filters: {
        search?: string;
        type?: string;
        user_id?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Painel Admin', href: '/admin/dashboard' },
    { title: 'Gestão de Currículos', href: '#' },
];

export default function Index({ items, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/curriculos', { 
            search: searchTerm, 
            type: typeFilter,
            user_id: filters.user_id 
        }, { preserveState: true });
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'cirurgia': return <ClipboardList className="w-4 h-4 text-blue-500" />;
            case 'atividade': return <Activity className="w-4 h-4 text-indigo-500" />;
            case 'formacao': return <BookOpen className="w-4 h-4 text-purple-500" />;
            default: return null;
        }
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestão de Currículos" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Gestão de Currículos</h1>
                        <p className="text-slate-500 text-sm">Visualize e exporte os registos dos utilizadores.</p>
                    </div>
                    
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Exportar Tudo (Excel)
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Pesquisar por título ou médico..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-48">
                            <select
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="">Todos os tipos</option>
                                <option value="cirurgia">Cirurgias</option>
                                <option value="atividade">Atividades Científicas</option>
                                <option value="formacao">Formações</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                        >
                            Filtrar
                        </button>
                    </form>
                </div>

                {/* Items Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tipo</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Médico</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Título / Descrição</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {items.data.map((item) => (
                                    <tr key={`${item.type}-${item.id}`} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getTypeIcon(item.type)}
                                                <span className="text-xs font-medium text-slate-600 capitalize">
                                                    {item.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-900">{item.user_name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-900 line-clamp-1">{item.title}</div>
                                            <div className="text-xs text-slate-500 truncate max-w-xs">{item.details}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-600">
                                                {new Date(item.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                                                title="Ver Detalhes"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {items.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            Nenhum registo encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {items.total > 0 && (
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                            <div className="text-xs text-slate-500">
                                Mostrando <span className="font-medium text-slate-700">{items.data.length}</span> de <span className="font-medium text-slate-700">{items.total}</span> registos
                            </div>
                            <div className="flex gap-2">
                                {/* Simple pagination buttons */}
                                <button 
                                    disabled={!items.links[0].url}
                                    onClick={() => items.links[0].url && router.get(items.links[0].url)}
                                    className="px-3 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Anterior
                                </button>
                                <button 
                                    disabled={!items.links[items.links.length - 1].url}
                                    onClick={() => items.links[items.links.length - 1].url && router.get(items.links[items.links.length - 1].url)}
                                    className="px-3 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Próximo
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
