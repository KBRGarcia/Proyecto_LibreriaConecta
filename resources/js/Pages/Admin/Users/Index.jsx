import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';

export default function Index({ users, roles, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [deleteModal, setDeleteModal] = useState({ open: false, user: null });

    const handleSearch = (value) => {
        setSearch(value);
        router.get(route('admin.users.index'), { search: value, role: roleFilter }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleRoleFilter = (value) => {
        setRoleFilter(value);
        router.get(route('admin.users.index'), { search, role: value }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        router.delete(route('admin.users.destroy', deleteModal.user.id), {
            onSuccess: () => setDeleteModal({ open: false, user: null }),
        });
    };

    const handleToggleStatus = (user) => {
        router.put(route('admin.users.toggle-status', user.id), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const statusColor = (status) =>
        status === 'activo' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';

    const roleColor = (roleName) => {
        const colors = {
            'Administrador': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
            'Cliente':       'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
            'Empleado':      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
            'Supervisor':    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
            'Invitado':      'bg-gray-100 text-gray-800 dark:bg-gray-800/40 dark:text-gray-300',
        };
        return colors[roleName] || 'bg-gray-100 text-gray-800 dark:bg-gray-800/40 dark:text-gray-300';
    };

    return (
        <AdminLayout header={<h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">Gestión de Usuarios</h1>}>
            <Head title="Gestión de Usuarios" />

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-transparent dark:border-gray-700 transition-colors duration-200">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <SearchInput
                                value={search}
                                onChange={handleSearch}
                                placeholder="Buscar usuarios..."
                                className="w-full sm:w-64"
                            />
                            <SelectInput
                                value={roleFilter}
                                onChange={(e) => handleRoleFilter(e.target.value)}
                                className="w-full sm:w-40"
                            >
                                <option value="">Todos los roles</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </SelectInput>
                        </div>
                        <Link href={route('admin.users.create')}>
                            <PrimaryButton>Agregar usuario</PrimaryButton>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 transition-colors duration-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Usuario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Rol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Registrado</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
                            {users.data.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center transition-colors duration-200">
                                                <span className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                                                    {user.first_name?.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {user.first_name} {user.last_name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleColor(user.role?.name)}`}>
                                            {user.role?.name || 'Sin rol'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor(user.status)}`}>
                                            {user.status === 'activo' ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(user.created_at).toLocaleDateString('es-ES')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {user.role?.name !== 'Administrador' && (
                                            <button 
                                                onClick={() => handleToggleStatus(user)} 
                                                className={`mr-4 ${user.status === 'activo' ? 'bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full' : 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full'}`}
                                            >
                                                {user.status === 'activo' ? 'Bloquear' : 'Desbloquear'}
                                            </button>
                                        )}
                                        <Link href={route('admin.users.edit', user.id)} className="mr-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                                            Editar
                                        </Link>

                                        <button onClick={() => setDeleteModal({ open: true, user })} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
                    <Pagination links={users.links} />
                </div>
            </div>

            <Modal show={deleteModal.open} onClose={() => setDeleteModal({ open: false, user: null })}>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Eliminar usuario</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        ¿Estás seguro de que deseas eliminar a "{deleteModal.user?.first_name} {deleteModal.user?.last_name}"?
                        Esta acción no se puede deshacer.
                    </p>
                    <div className="mt-4 flex justify-end space-x-4">
                        <button onClick={() => setDeleteModal({ open: false, user: null })} className="px-4 py-2 text-sm text-gray-700">
                            Cancelar
                        </button>
                        <DangerButton onClick={handleDelete}>Eliminar</DangerButton>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
