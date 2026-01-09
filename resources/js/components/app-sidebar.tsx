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
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, FileText, GraduationCap, Award, Settings, Layers, Activity, ClipboardList } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'Utentes',
        href: '/utentes',
        icon: Users,
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
        title: 'Áreas',
        href: '/areas',
        icon: Layers,
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
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
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
                <NavMain items={adminNavItems} title="Administração" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
