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

    return (
        <AdminLayout header={<h1 className="text-xl font-semibold text-gray-900">Gestión de Usuarios</h1>}>
            <Head title="Gestión de Usuarios" />

            <div className="bg-white shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-200">
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
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registrado</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.data.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <span className="text-indigo-600 font-medium text-sm">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role?.name === 'Administrator' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.role?.name || 'Sin rol'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.phone || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user.created_at).toLocaleDateString('es-ES')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={route('admin.users.edit', user.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Editar
                                        </Link>
                                        <button onClick={() => setDeleteModal({ open: true, user })} className="text-red-600 hover:text-red-900">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-gray-200">
                    <Pagination links={users.links} />
                </div>
            </div>

            <Modal show={deleteModal.open} onClose={() => setDeleteModal({ open: false, user: null })}>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">Eliminar usuario</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        ¿Estás seguro de que deseas eliminar a "{deleteModal.user?.name}"?
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
