import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';
import SelectInput from '@/Components/SelectInput';
import StatusBadge from '@/Components/StatusBadge';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ reservations, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [editModal, setEditModal] = useState({ open: false, reservation: null, status: '' });

    const handleSearch = (value) => {
        setSearch(value);
        router.get(route('admin.reservations.index'), { search: value, status: statusFilter }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleStatusFilter = (value) => {
        setStatusFilter(value);
        router.get(route('admin.reservations.index'), { search, status: value }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const openEditModal = (reservation) => {
        setEditModal({ open: true, reservation, status: reservation.status });
    };

    const handleUpdateStatus = () => {
        router.put(route('admin.reservations.update', editModal.reservation.id), {
            status: editModal.status,
        }, {
            onSuccess: () => setEditModal({ open: false, reservation: null, status: '' }),
        });
    };

    return (
        <AdminLayout header={<h1 className="text-xl font-semibold text-gray-900">Gestión de Reservas</h1>}>
            <Head title="Gestión de Reservas" />

            <div className="bg-white shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <SearchInput
                            value={search}
                            onChange={handleSearch}
                            placeholder="Buscar por usuario o libro..."
                            className="w-full sm:w-64"
                        />
                        <SelectInput
                            value={statusFilter}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                            className="w-full sm:w-40"
                        >
                            <option value="">Todos los estados</option>
                            <option value="pending">Pendiente</option>
                            <option value="confirmed">Confirmada</option>
                            <option value="cancelled">Cancelada</option>
                            <option value="completed">Completada</option>
                        </SelectInput>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Libro</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha reserva</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reservations.data.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{reservation.user?.name}</div>
                                        <div className="text-sm text-gray-500">{reservation.user?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{reservation.book?.title}</div>
                                        <div className="text-sm text-gray-500">{reservation.book?.author}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(reservation.reservation_date).toLocaleDateString('es-ES')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={reservation.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => openEditModal(reservation)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Cambiar estado
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-gray-200">
                    <Pagination links={reservations.links} />
                </div>
            </div>

            <Modal show={editModal.open} onClose={() => setEditModal({ open: false, reservation: null, status: '' })}>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">Cambiar estado de reserva</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Reserva #{editModal.reservation?.id} - {editModal.reservation?.book?.title}
                    </p>
                    <div className="mt-4">
                        <SelectInput
                            value={editModal.status}
                            onChange={(e) => setEditModal({ ...editModal, status: e.target.value })}
                            className="w-full"
                        >
                            <option value="pending">Pendiente</option>
                            <option value="confirmed">Confirmada</option>
                            <option value="cancelled">Cancelada</option>
                            <option value="completed">Completada</option>
                        </SelectInput>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <SecondaryButton onClick={() => setEditModal({ open: false, reservation: null, status: '' })}>
                            Cancelar
                        </SecondaryButton>
                        <PrimaryButton onClick={handleUpdateStatus}>
                            Actualizar
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
