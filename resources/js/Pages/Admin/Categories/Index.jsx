import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';

export default function Index({ categories }) {
    const [deleteModal, setDeleteModal] = useState({ open: false, category: null });

    const handleDelete = () => {
        router.delete(route('admin.categories.destroy', deleteModal.category.id), {
            onSuccess: () => setDeleteModal({ open: false, category: null }),
        });
    };

    return (
        <AdminLayout header={<h1 className="text-xl font-semibold text-gray-900">Gestión de Categorías</h1>}>
            <Head title="Gestión de Categorías" />

            <div className="bg-white shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600">Organiza los libros por categorías</p>
                        <Link href={route('admin.categories.create')}>
                            <PrimaryButton>Agregar categoría</PrimaryButton>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Libros</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.data.map((category) => (
                                <tr key={category.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 max-w-xs truncate">
                                            {category.description || '-'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                            {category.books_count} libros
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={route('admin.categories.edit', category.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => setDeleteModal({ open: true, category })}
                                            className="text-red-600 hover:text-red-900"
                                            disabled={category.books_count > 0}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-gray-200">
                    <Pagination links={categories.links} />
                </div>
            </div>

            <Modal show={deleteModal.open} onClose={() => setDeleteModal({ open: false, category: null })}>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">Eliminar categoría</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        ¿Estás seguro de que deseas eliminar "{deleteModal.category?.name}"?
                    </p>
                    <div className="mt-4 flex justify-end space-x-4">
                        <button onClick={() => setDeleteModal({ open: false, category: null })} className="px-4 py-2 text-sm text-gray-700">
                            Cancelar
                        </button>
                        <DangerButton onClick={handleDelete}>Eliminar</DangerButton>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
