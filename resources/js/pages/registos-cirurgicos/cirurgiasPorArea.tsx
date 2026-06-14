import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Linha {
    patologia: string;
    procedimento: string;
    electivo_cir: number;
    electivo_ajud: number;
    urgente_cir: number;
    urgente_ajud: number;
    formativa_electivo: number;
    formativa_urgente: number;
}

interface Props {
    areas: {
        [zona: string]: {
            [tipo: string]: {
                [key: string]: Linha;
            };
        };
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Registos Cirúrgicos', href: '/registos-cirurgicos' },
    {
        title: 'Cirurgias por Área',
        href: '/registos-cirurgicos/cirurgias-por-area',
    },
];

export default function CirurgiasPorArea({ areas }: Props) {
    const [modo, setModo] = useState<'diag' | 'proc'>('diag');

    // Totais por zona e por tipo
    const totaisZona = useMemo(() => {
        const out: any = {};

        Object.entries(areas).forEach(([zona, tipos]) => {
            out[zona] = {
                total: 0,
                tipos: {},
            };

            Object.entries(tipos).forEach(([tipo, linhas]) => {
                const totalTipo = Object.values(linhas).reduce((acc, l) => {
                    return (
                        acc +
                        l.electivo_cir +
                        l.electivo_ajud +
                        l.urgente_cir +
                        l.urgente_ajud
                    );
                }, 0);

                out[zona].tipos[tipo] = totalTipo;
                out[zona].total += totalTipo;
            });
        });

        return out;
    }, [areas]);

    // COMPONENTE: Diagnóstico → Procedimento
    const TabelaDiagProced = ({ linhasArray, totaisTipo }: any) => (
        <table className="min-w-full rounded border bg-white shadow">
            <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="border p-3">Patologia</th>
                    <th className="border p-3">Procedimento</th>
                    <th className="border p-3 text-center" colSpan={2}>
                        Electivo
                    </th>
                    <th className="border p-3 text-center" colSpan={2}>
                        Urgente
                    </th>
                </tr>
                <tr className="bg-gray-50 text-left">
                    <th className="border p-2"></th>
                    <th className="border p-2"></th>
                    <th className="border p-2 text-center">Cir</th>
                    <th className="border p-2 text-center">Ajud</th>
                    <th className="border p-2 text-center">Cir</th>
                    <th className="border p-2 text-center">Ajud</th>
                </tr>
            </thead>

            <tbody>
                {linhasArray.map((l: any, i: number) => {
                    const prev = linhasArray[i - 1];
                    const showPatologia =
                        !prev || prev.patologia !== l.patologia;

                    return (
                        <tr key={i}>
                            <td className="border p-3 font-semibold">
                                {showPatologia ? l.patologia : ''}
                            </td>
                            <td className="border p-3">{l.procedimento}</td>
                            <td className="border p-3 text-center">
                                {l.electivo_cir}
                            </td>
                            <td className="border p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    {l.electivo_ajud}
                                    {l.formativa_electivo > 0 && (
                                        <Star
                                            size={12}
                                            className="text-yellow-500"
                                        />
                                    )}
                                </div>
                            </td>
                            <td className="border p-3 text-center">
                                {l.urgente_cir}
                            </td>
                            <td className="border p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    {l.urgente_ajud}
                                    {l.formativa_urgente > 0 && (
                                        <Star
                                            size={12}
                                            className="text-yellow-500"
                                        />
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}

                <tr className="bg-gray-100 font-bold">
                    <td className="border p-3">Total</td>
                    <td className="border p-3"></td>
                    <td className="border p-3 text-center">
                        {totaisTipo.electivo_cir}
                    </td>
                    <td className="border p-3 text-center">
                        {totaisTipo.electivo_ajud}
                    </td>
                    <td className="border p-3 text-center">
                        {totaisTipo.urgente_cir}
                    </td>
                    <td className="border p-3 text-center">
                        {totaisTipo.urgente_ajud}
                    </td>
                </tr>
            </tbody>
        </table>
    );

    // COMPONENTE: Procedimento → Diagnóstico
    const TabelaProcedDiag = ({ linhasArray, totaisTipo }: any) => (
        <table className="min-w-full rounded border bg-white shadow">
            <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="border p-3">Procedimento</th>
                    <th className="border p-3">Patologia</th>
                    <th className="border p-3 text-center" colSpan={2}>
                        Electivo
                    </th>
                    <th className="border p-3 text-center" colSpan={2}>
                        Urgente
                    </th>
                </tr>
                <tr className="bg-gray-50 text-left">
                    <th className="border p-2"></th>
                    <th className="border p-2"></th>
                    <th className="border p-2 text-center">Cir</th>
                    <th className="border p-2 text-center">Ajud</th>
                    <th className="border p-2 text-center">Cir</th>
                    <th className="border p-2 text-center">Ajud</th>
                </tr>
            </thead>

            <tbody>
                {linhasArray.map((l: any, i: number) => {
                    const prev = linhasArray[i - 1];
                    const showProcedimento =
                        !prev || prev.procedimento !== l.procedimento;

                    return (
                        <tr key={i}>
                            <td className="border p-3 font-semibold">
                                {showProcedimento ? l.procedimento : ''}
                            </td>
                            <td className="border p-3">{l.patologia}</td>
                            <td className="border p-3 text-center">
                                {l.electivo_cir}
                            </td>
                            <td className="border p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    {l.electivo_ajud}
                                    {l.formativa_electivo > 0 && (
                                        <Star
                                            size={12}
                                            className="text-yellow-500"
                                        />
                                    )}
                                </div>
                            </td>
                            <td className="border p-3 text-center">
                                {l.urgente_cir}
                            </td>
                            <td className="border p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    {l.urgente_ajud}
                                    {l.formativa_urgente > 0 && (
                                        <Star
                                            size={12}
                                            className="text-yellow-500"
                                        />
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}

                <tr className="bg-gray-100 font-bold">
                    <td className="border p-3">Total</td>
                    <td className="border p-3"></td>
                    <td className="border p-3 text-center">
                        {totaisTipo.electivo_cir}
                    </td>
                    <td className="border p-3 text-center">
                        {totaisTipo.electivo_ajud}
                    </td>
                    <td className="border p-3 text-center">
                        {totaisTipo.urgente_cir}
                    </td>
                    <td className="border p-3 text-center">
                        {totaisTipo.urgente_ajud}
                    </td>
                </tr>
            </tbody>
        </table>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cirurgias por Área" />

            <div className="p-8">
                {/* TOGGLE */}
                <div className="mb-6 flex items-center gap-4">
                    <button
                        onClick={() => setModo('diag')}
                        className={`rounded px-4 py-2 ${
                            modo === 'diag'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        Diagnóstico → Procedimento
                    </button>

                    <button
                        onClick={() => setModo('proc')}
                        className={`rounded px-4 py-2 ${
                            modo === 'proc'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        Procedimento → Diagnóstico
                    </button>
                </div>

                <h1 className="mb-8 text-3xl font-bold">
                    Tabela de Patologias e Procedimentos por Zona Anatómica
                </h1>

                {Object.entries(areas)
                    .sort((a, b) => {
                        const zonaA = Object.values(a[1])[0];
                        const zonaB = Object.values(b[1])[0];

                        const ordemA =
                            Object.values(zonaA)[0].ordem_zona ?? 999;
                        const ordemB =
                            Object.values(zonaB)[0].ordem_zona ?? 999;

                        return ordemA - ordemB;
                    })
                    .map(([zona, tipos]) => (
                        <div key={zona} className="mb-12">
                            <h2 className="mb-1 text-2xl font-semibold">
                                {zona}
                            </h2>
                            <div className="mb-4 font-medium text-gray-700">
                                Total da Zona: {totaisZona[zona].total}
                            </div>

                            {Object.entries(tipos).map(([tipo, linhas]) => {
                                const linhasArray = Object.values(linhas).sort(
                                    (a, b) =>
                                        modo === 'diag'
                                            ? a.patologia.localeCompare(
                                                  b.patologia,
                                              )
                                            : a.procedimento.localeCompare(
                                                  b.procedimento,
                                              ),
                                );

                                const totaisTipo = {
                                    electivo_cir: 0,
                                    electivo_ajud: 0,
                                    urgente_cir: 0,
                                    urgente_ajud: 0,
                                    formativa_electivo: 0,
                                    formativa_urgente: 0,
                                };

                                linhasArray.forEach((l) => {
                                    totaisTipo.electivo_cir += l.electivo_cir;
                                    totaisTipo.electivo_ajud += l.electivo_ajud;
                                    totaisTipo.urgente_cir += l.urgente_cir;
                                    totaisTipo.urgente_ajud += l.urgente_ajud;
                                    totaisTipo.formativa_electivo +=
                                        l.formativa_electivo;
                                    totaisTipo.formativa_urgente +=
                                        l.formativa_urgente;
                                });

                                return (
                                    <div key={tipo} className="mb-8 pl-4">
                                        <h3 className="mb-1 text-xl font-semibold">
                                            {tipo}
                                        </h3>
                                        <div className="mb-3 text-gray-600">
                                            Total {tipo}:{' '}
                                            {totaisZona[zona].tipos[tipo]}
                                        </div>
                                        <div className="mb-6 flex items-center gap-2 text-gray-600">
                                            <Star
                                                size={12}
                                                className="text-yellow-500"
                                            />
                                            Ajuda Formativa (Electivo):{' '}
                                            {Object.values(tipos).reduce(
                                                (acc, t) =>
                                                    acc +
                                                    Object.values(t).reduce(
                                                        (a, l) =>
                                                            a +
                                                            l.formativa_electivo,
                                                        0,
                                                    ),
                                                0,
                                            )}
                                        </div>
                                        <div className="mb-6 flex items-center gap-2 text-gray-600">
                                            <Star
                                                size={12}
                                                className="text-yellow-500"
                                            />
                                            <span>
                                                Ajuda Formativa (Urgente):{' '}
                                                {Object.values(tipos).reduce(
                                                    (acc, t) =>
                                                        acc +
                                                        Object.values(t).reduce(
                                                            (a, l) =>
                                                                a +
                                                                l.formativa_urgente,
                                                            0,
                                                        ),
                                                    0,
                                                )}
                                            </span>
                                        </div>

                                        {modo === 'diag' ? (
                                            <TabelaDiagProced
                                                linhasArray={linhasArray}
                                                totaisTipo={totaisTipo}
                                            />
                                        ) : (
                                            <TabelaProcedDiag
                                                linhasArray={linhasArray}
                                                totaisTipo={totaisTipo}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
            </div>
        </AppLayout>
    );
}
