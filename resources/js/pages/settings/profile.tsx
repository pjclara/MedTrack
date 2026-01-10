import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
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
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Definições de perfil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Informações do perfil"
                        description="Atualize o seu nome, email, hospital e área cirúrgica"
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
                                            <SelectItem value="Hospital de Santa Maria">Hospital de Santa Maria</SelectItem>
                                            <SelectItem value="Hospital de São João">Hospital de São João</SelectItem>
                                            <SelectItem value="Hospital de Santo António">Hospital de Santo António</SelectItem>
                                            <SelectItem value="Centro Hospitalar e Universitário de Coimbra">CHUC (Coimbra)</SelectItem>
                                            <SelectItem value="Hospital de Braga">Hospital de Braga</SelectItem>
                                            <SelectItem value="Hospital de Vila Real">Hospital de Vila Real</SelectItem>
                                            <SelectItem value="Hospital de Évora">Hospital de Évora</SelectItem>
                                            <SelectItem value="Hospital de Faro">Hospital de Faro</SelectItem>
                                            <SelectItem value="Hospital CUF">Hospital CUF</SelectItem>
                                            <SelectItem value="Hospital da Luz">Hospital da Luz</SelectItem>
                                            <SelectItem value="Outro">Outro</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <InputError
                                        className="mt-2"
                                        message={errors.hospital_de_origem}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="area_cirurgica">Área Cirúrgica</Label>

                                    <Select name="area_cirurgica" defaultValue={auth.user.area_cirurgica || ''}>
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="Selecione a área" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Cirurgia Geral">Cirurgia Geral</SelectItem>
                                            <SelectItem value="Cirurgia Vascular">Cirurgia Vascular</SelectItem>
                                            <SelectItem value="Cirurgia Cardiotorácica">Cirurgia Cardiotorácica</SelectItem>
                                            <SelectItem value="Cirurgia Pediátrica">Cirurgia Pediátrica</SelectItem>
                                            <SelectItem value="Cirurgia Plástica">Cirurgia Plástica</SelectItem>
                                            <SelectItem value="Neurocirurgia">Neurocirurgia</SelectItem>
                                            <SelectItem value="Urologia">Urologia</SelectItem>
                                            <SelectItem value="Ginecologia-Obstetrícia">Ginecologia-Obstetrícia</SelectItem>
                                            <SelectItem value="Ortopedia">Ortopedia</SelectItem>
                                            <SelectItem value="Outra">Outra</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <InputError
                                        className="mt-2"
                                        message={errors.area_cirurgica}
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
