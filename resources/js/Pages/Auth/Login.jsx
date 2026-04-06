import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Sesión Iniciada!',
                    text: 'Bienvenido de nuevo',
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Autenticación',
                    text: 'Usuario o contraseña incorrectos',
                    timer: 3000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827'
                });
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Bienvenido</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Inicia sesión para acceder a tu cuenta
                </p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center mt-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Recordarme</span>
                    </label>
                </div>

                <div className="mt-6">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        {processing ? 'Ingresando...' : 'Iniciar Sesión'}
                    </PrimaryButton>
                </div>

                <div className="mt-6 text-center">
                    <Link
                        href={route('books.index')}
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                    >
                        Ver catálogo sin iniciar sesión
                    </Link>
                </div>
            </form>

            {/* Test Credentials */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-transparent dark:border-gray-600 transition-colors duration-200">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Credenciales de prueba:</h3>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <p><strong>Admin:</strong> admin@libroconecta.com / 12345678</p>
                    <p><strong>Cliente:</strong> maria@correo.com / 12345678</p>
                </div>
            </div>
        </GuestLayout>
    );
}
