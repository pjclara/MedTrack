import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { 
    LayoutDashboard, 
    Users, 
    FileText, 
    History, 
    LogOut, 
    ChevronRight,
    Search,
    UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AdminLayout({ children, breadcrumbs }: AdminLayoutProps) {
    const { auth } = usePage().props as any;

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
        { name: 'Utilizadores', icon: Users, href: '/admin/users' },
        { name: 'Currículos', icon: FileText, href: '/admin/curriculos' },
        { name: 'Logs de Atividade', icon: History, href: '/admin/logs' },
    ];

    return (
        <div className="flex h-screen bg-neutral-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-emerald-500">MedTrack Admin</h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">by SurgTuga</p>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = window.location.pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                    isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 mt-auto border-t border-slate-800">
                    <div className="flex items-center gap-3 px-3 py-2 mb-4">
                        <UserCircle className="h-8 w-8 text-neutral-400" />
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium truncate">{auth.user.name}</span>
                            <span className="text-xs text-slate-500 truncate capitalize">{auth.user.role}</span>
                        </div>
                    </div>
                    <Link href="/admin/logout" method="post" as="button" className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <LogOut className="h-5 w-5" />
                        Sair
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8">
                    <div className="flex items-center gap-2">
                        {breadcrumbs?.map((crumb, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Link href={crumb.href} className="text-sm font-medium text-neutral-500 hover:text-emerald-600">
                                    {crumb.title}
                                </Link>
                                {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4 text-neutral-300" />}
                            </div>
                        ))}
                    </div>
                </header>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
