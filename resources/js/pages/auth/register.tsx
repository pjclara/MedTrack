import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
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
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout
            title="Criar conta"
            description="Preencha os dados abaixo para criar a sua conta"
        >
            <Head title="Registar" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Nome completo"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="seu.email@exemplo.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="hospital_de_origem">Hospital de Origem</Label>
                                <Select name="hospital_de_origem">
                                    <SelectTrigger tabIndex={3}>
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
                                <InputError message={errors.hospital_de_origem} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="area_cirurgica">Área Cirúrgica</Label>
                                <Select name="area_cirurgica">
                                    <SelectTrigger tabIndex={4}>
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
                                <InputError message={errors.area_cirurgica} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Palavra-passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Palavra-passe"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirmar palavra-passe
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={6}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirmar palavra-passe"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700"
                                tabIndex={7}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Criar conta
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Já tem conta?{' '}
                            <TextLink href={login()} tabIndex={6} className="text-blue-600 hover:text-blue-700">
                                Entrar
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
