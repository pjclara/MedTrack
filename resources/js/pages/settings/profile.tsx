import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { type Hospital, type Especialidade } from '@/types/models';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Definições de perfil',
        href: edit().url,
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
    hospitals = [],
    especialidades = [],
}: {
    mustVerifyEmail: boolean;
    status?: string;
    hospitals?: Hospital[];
    especialidades?: Especialidade[];
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Definições de perfil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Informações do perfil"
                        description="Atualize o seu nome, email, hospital e especialidade"
                    />

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Nome completo"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="Endereço de email"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="hospital_de_origem">Hospital de Origem</Label>

                                    <Select name="hospital_de_origem" defaultValue={auth.user.hospital_de_origem || ''}>
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="Selecione o hospital" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {hospitals.length > 0 ? (
                                                hospitals.map((h) => (
                                                    <SelectItem key={h.id} value={h.nome}>{h.nome}</SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="none" disabled>Nenhum hospital registado</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>

                                    <InputError
                                        className="mt-2"
                                        message={errors.hospital_de_origem}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="especialidade">Especialidade</Label>

                                    <Select name="especialidade" defaultValue={auth.user.especialidade || ''}>
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="Selecione a especialidade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {especialidades.length > 0 ? (
                                                especialidades.map((e) => (
                                                    <SelectItem key={e.id} value={e.nome}>{e.nome}</SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="none" disabled>Nenhuma especialidade registada</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>

                                    <InputError
                                        className="mt-2"
                                        message={errors.especialidade}
                                    />
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-4 text-sm text-muted-foreground">
                                                O seu endereço de email não está verificado.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                >
                                                    Clique aqui para reenviar o email de verificação.
                                                </Link>
                                            </p>

                                            {status ===
                                                'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">
                                                    Um novo link de verificação foi enviado para o seu email.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-profile-button"
                                        className="bg-emerald-600 hover:bg-emerald-700"
                                    >
                                        Guardar
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            Guardado
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
