import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';

export default function Index({ books, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleteModal, setDeleteModal] = useState({ open: false, book: null });

    const handleSearch = (value) => {
        setSearch(value);
        router.get(route('admin.books.index'), { search: value }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        router.delete(route('admin.books.destroy', deleteModal.book.id), {
            onSuccess: () => setDeleteModal({ open: false, book: null }),
        });
    };

    return (
        <AdminLayout header={<h1 className="text-xl font-semibold text-gray-900">Gestión de Libros</h1>}>
            <Head title="Gestión de Libros" />

            <div className="bg-white shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <SearchInput
                            value={search}
                            onChange={handleSearch}
                            placeholder="Buscar libros..."
                            className="w-full sm:w-64"
                        />
                        <Link href={route('admin.books.create')}>
                            <PrimaryButton>Agregar libro</PrimaryButton>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Libro</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {books.data.map((book) => (
                                <tr key={book.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-10 bg-gray-200 rounded">
                                                {book.cover_image ? (
                                                    <img src={`/storage/${book.cover_image}`} alt="" className="h-12 w-10 object-cover rounded" />
                                                ) : (
                                                    <div className="h-12 w-10 flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                                <div className="text-sm text-gray-500">{book.author}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {book.category?.name || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${parseFloat(book.price).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${book.stock > 5 ? 'bg-green-100 text-green-800' : book.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                            {book.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={route('admin.books.edit', book.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Editar
                                        </Link>
                                        <button onClick={() => setDeleteModal({ open: true, book })} className="text-red-600 hover:text-red-900">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-gray-200">
                    <Pagination links={books.links} />
                </div>
            </div>

            <Modal show={deleteModal.open} onClose={() => setDeleteModal({ open: false, book: null })}>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">Eliminar libro</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        ¿Estás seguro de que deseas eliminar "{deleteModal.book?.title}"? Esta acción no se puede deshacer.
                    </p>
                    <div className="mt-4 flex justify-end space-x-4">
                        <button onClick={() => setDeleteModal({ open: false, book: null })} className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                            Cancelar
                        </button>
                        <DangerButton onClick={handleDelete}>Eliminar</DangerButton>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
