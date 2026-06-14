import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

import { BreadcrumbItem, Diagnostico } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';



export interface DiagnosticoShowProps {
    diagnostico: Diagnostico;
}

