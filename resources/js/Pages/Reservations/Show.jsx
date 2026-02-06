import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Show({ auth, reservation }) {
    const handleCancel = () => {
        if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
            router.post(route('reservations.cancel', reservation.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detalle de Reserva</h2>}
        >
            <Head title="Detalle de Reserva" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Status Header */}
                            <div className="flex justify-between items-start mb-6 pb-6 border-b">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Reserva #{reservation.id}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Creada el {new Date(reservation.created_at).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <StatusBadge status={reservation.status} />
                            </div>

                            {/* Book Info */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                                    Libro reservado
                                </h4>
                                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-20 h-28 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                        {reservation.book?.cover_image ? (
                                            <img
                                                src={`/storage/${reservation.book.cover_image}`}
                                                alt={reservation.book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Link
                                            href={route('books.show', reservation.book?.id)}
                                            className="font-medium text-gray-900 hover:text-indigo-600"
                                        >
                                            {reservation.book?.title}
                                        </Link>
                                        <p className="text-sm text-gray-600">{reservation.book?.author}</p>
                                        {reservation.book?.category && (
                                            <span className="inline-block mt-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                                {reservation.book.category.name}
                                            </span>
                                        )}
                                        <p className="text-indigo-600 font-semibold mt-2">
                                            ${parseFloat(reservation.book?.price || 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Reservation Details */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                                    Detalles de la reserva
                                </h4>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <dt className="text-sm text-gray-500">Fecha de reserva</dt>
                                        <dd className="mt-1 text-lg font-medium text-gray-900">
                                            {new Date(reservation.reservation_date).toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </dd>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <dt className="text-sm text-gray-500">Estado</dt>
                                        <dd className="mt-1">
                                            <StatusBadge status={reservation.status} />
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Notes */}
                            {reservation.notes && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                                        Notas
                                    </h4>
                                    <p className="p-4 bg-gray-50 rounded-lg text-gray-700">
                                        {reservation.notes}
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex justify-between items-center pt-6 border-t">
                                <Link href={route('reservations.index')}>
                                    <SecondaryButton>Volver a mis reservas</SecondaryButton>
                                </Link>
                                {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                                    <DangerButton onClick={handleCancel}>
                                        Cancelar reserva
                                    </DangerButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
