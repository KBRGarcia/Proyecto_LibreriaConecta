import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import EmptyState from '@/Components/EmptyState';

export default function Index({ auth, reservations }) {
    const handleCancel = (reservation) => {
        if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
            router.post(route('reservations.cancel', reservation.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mis Reservas</h2>}
        >
            <Head title="Mis Reservas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Historial de reservas
                                </h3>
                                <Link href={route('books.index')}>
                                    <PrimaryButton>Nueva reserva</PrimaryButton>
                                </Link>
                            </div>

                            {reservations.data.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Libro
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Fecha de reserva
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Estado
                                                    </th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Acciones
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {reservations.data.map((reservation) => (
                                                    <tr key={reservation.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-12 w-10 bg-gray-200 rounded">
                                                                    {reservation.book?.cover_image ? (
                                                                        <img
                                                                            src={`/storage/${reservation.book.cover_image}`}
                                                                            alt=""
                                                                            className="h-12 w-10 object-cover rounded"
                                                                        />
                                                                    ) : (
                                                                        <div className="h-12 w-10 flex items-center justify-center">
                                                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                                            </svg>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {reservation.book?.title}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {reservation.book?.author}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(reservation.reservation_date).toLocaleDateString('es-ES')}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <StatusBadge status={reservation.status} />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex justify-end space-x-2">
                                                                <Link
                                                                    href={route('reservations.show', reservation.id)}
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Ver
                                                                </Link>
                                                                {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                                                                    <button
                                                                        onClick={() => handleCancel(reservation)}
                                                                        className="text-red-600 hover:text-red-900"
                                                                    >
                                                                        Cancelar
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-6">
                                        <Pagination links={reservations.links} />
                                    </div>
                                </>
                            ) : (
                                <EmptyState
                                    title="No tienes reservas"
                                    description="Explora nuestro catálogo y reserva tu primer libro"
                                    icon={
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    }
                                    action={
                                        <Link href={route('books.index')}>
                                            <PrimaryButton>Ver catálogo</PrimaryButton>
                                        </Link>
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
