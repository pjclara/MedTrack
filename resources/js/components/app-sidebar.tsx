import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, FileText, GraduationCap, Award, Settings, Layers, Activity, ClipboardList, Building2, Scissors, Crosshair } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Painel de Controlo',
        href: dashboard().url,
        icon: LayoutGrid,
    },

    {
        title: 'Registos Cirúrgicos',
        href: '/registos-cirurgicos',
        icon: FileText,
    },
    {
        title: 'Atividade Científica',
        href: '/atividades-cientificas',
        icon: GraduationCap,
    },
    {
        title: 'Formações',
        href: '/formacoes',
        icon: Award,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Utentes',
        href: '/utentes',
        icon: Users,
    },
    {
        title: 'Hospitais de Origem',
        href: '/hospitals',
        icon: Building2,
    },
    {
        title: 'Especialidades',
        href: '/especialidades',
        icon: Layers,
    },
    {
        title: 'Zonas Anatómicas',
        href: '/zona-anatomicas',
        icon: LayoutGrid,
    },
    {
        title: 'Diagnósticos',
        href: '/diagnosticos',
        icon: ClipboardList,
    },
    {
        title: 'Procedimentos',
        href: '/procedimentos',
        icon: Activity,
    },
    {
        title: 'Tipos de Cirurgia',
        href: '/tipos-de-cirurgia',
        icon: Scissors,
    },
    {
        title: 'Tipos de Abordagem',
        href: '/tipos-de-abordagem',
        icon: Crosshair,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const isAdmin = auth.is_admin;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} title="Plataforma" />
                <NavMain 
                    items={adminNavItems} 
                    title={isAdmin ? "Gestão do Sistema" : "Gestão de Dados"} 
                />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
