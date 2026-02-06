import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, user }) {
    const profileForm = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.put(route('profile.update'));
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('profile.password'), {
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mi Perfil</h2>}
        >
            <Head title="Mi Perfil" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Profile Information */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                Información del Perfil
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Actualiza tu información personal y datos de contacto.
                            </p>

                            <form onSubmit={submitProfile} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="name" value="Nombre" />
                                        <TextInput
                                            id="name"
                                            value={profileForm.data.name}
                                            onChange={(e) => profileForm.setData('name', e.target.value)}
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError message={profileForm.errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="email" value="Correo electrónico" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            value={profileForm.data.email}
                                            onChange={(e) => profileForm.setData('email', e.target.value)}
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError message={profileForm.errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="phone" value="Teléfono" />
                                        <TextInput
                                            id="phone"
                                            value={profileForm.data.phone}
                                            onChange={(e) => profileForm.setData('phone', e.target.value)}
                                            className="mt-1 block w-full"
                                            placeholder="(opcional)"
                                        />
                                        <InputError message={profileForm.errors.phone} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="address" value="Dirección" />
                                        <TextInput
                                            id="address"
                                            value={profileForm.data.address}
                                            onChange={(e) => profileForm.setData('address', e.target.value)}
                                            className="mt-1 block w-full"
                                            placeholder="(opcional)"
                                        />
                                        <InputError message={profileForm.errors.address} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={profileForm.processing}>
                                        {profileForm.processing ? 'Guardando...' : 'Guardar cambios'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Role Information */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                Información de Cuenta
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Detalles de tu cuenta y rol en el sistema.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Rol</p>
                                    <p className="font-medium text-gray-900">
                                        {user.role?.name === 'Administrator' ? 'Administrador' : 'Cliente'}
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500">Miembro desde</p>
                                    <p className="font-medium text-gray-900">
                                        {new Date(user.created_at).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                Cambiar Contraseña
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Asegúrate de usar una contraseña segura y única.
                            </p>

                            <form onSubmit={submitPassword} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="current_password" value="Contraseña actual" />
                                    <TextInput
                                        id="current_password"
                                        type="password"
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={passwordForm.errors.current_password} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="password" value="Nueva contraseña" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            value={passwordForm.data.password}
                                            onChange={(e) => passwordForm.setData('password', e.target.value)}
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError message={passwordForm.errors.password} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            value={passwordForm.data.password_confirmation}
                                            onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                            className="mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={passwordForm.processing}>
                                        {passwordForm.processing ? 'Actualizando...' : 'Actualizar contraseña'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
