import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';

export default function Show({ auth, reservation }) {
    const [cancelModal, setCancelModal] = useState(false);

    const confirmCancel = () => {
        router.post(route('reservations.cancel', reservation.id), {}, {
            onSuccess: () => setCancelModal(false)
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight transition-colors duration-200">Detalle de Reserva</h2>}
        >
            <Head title="Detalle de Reserva" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border border-transparent dark:border-gray-700 transition-colors duration-200">
                        <div className="p-6">
                            {/* Status Header */}
                            <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                                        Reserva #{reservation.id}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
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
                                <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-200">
                                    <div className="w-20 h-28 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0 transition-colors duration-200">
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
                                            className="font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                                        >
                                            {reservation.book?.title}
                                        </Link>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">{reservation.book?.author}</p>
                                        {reservation.book?.category && (
                                            <span className="inline-block mt-2 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-1 rounded transition-colors duration-200">
                                                {reservation.book.category.name}
                                            </span>
                                        )}
                                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mt-2 transition-colors duration-200">
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
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-200">
                                        <dt className="text-sm text-gray-500 dark:text-gray-400">Fecha de reserva</dt>
                                        <dd className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
                                            {new Date(reservation.reservation_date).toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </dd>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-200">
                                        <dt className="text-sm text-gray-500 dark:text-gray-400">Estado</dt>
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
                                    <p className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-700 dark:text-gray-300 transition-colors duration-200">
                                        {reservation.notes}
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
                                <Link href={route('reservations.index')}>
                                    <SecondaryButton>Volver a mis reservas</SecondaryButton>
                                </Link>
                                {reservation.status === 'pendiente' && (
                                    <button
                                        onClick={() => setCancelModal(true)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={cancelModal} onClose={() => setCancelModal(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Cancelar reserva</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        ¿Estás seguro de que deseas cancelar esta reserva? Esta acción no se puede deshacer.
                    </p>
                    <div className="mt-4 flex justify-end space-x-4">
                        <button onClick={() => setCancelModal(false)} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
                            Cancelar
                        </button>
                        <DangerButton onClick={confirmCancel}>Confirmar Cancelación</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
