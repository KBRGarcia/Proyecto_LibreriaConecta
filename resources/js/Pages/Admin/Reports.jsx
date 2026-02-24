import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/Card';

export default function Reports({ reservationsByStatus, booksByCategory, monthlyReservations, topBooks }) {
    const statusColors = {
        pendiente:  'bg-yellow-100 text-yellow-800',
        confirmada: 'bg-green-100 text-green-800',
        cancelada:  'bg-red-100 text-red-800',
    };

    const statusLabels = {
        pendiente:  'Pendientes',
        confirmada: 'Confirmadas',
        cancelada:  'Canceladas',
    };

    return (
        <AdminLayout header={<h1 className="text-xl font-semibold text-gray-900">Reportes y Estadísticas</h1>}>
            <Head title="Reportes" />

            <div className="space-y-6">
                {/* Reservations by Status */}
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Reservas por Estado</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {reservationsByStatus.map((item) => (
                            <div key={item.status} className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2 ${statusColors[item.status]}`}>
                                    {statusLabels[item.status]}
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{item.count}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Books by Category */}
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Libros por Categoría</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {booksByCategory.map((category) => (
                            <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">{category.name}</span>
                                <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800">
                                    {category.books_count} libros
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Books */}
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Libros Más Reservados</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Libro</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Autor</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Reservas</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {topBooks.map((book, index) => (
                                    <tr key={book.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {book.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {book.author}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-indigo-600">
                                            {book.reservations_count}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Monthly Reservations */}
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Reservas Mensuales</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {monthlyReservations.map((item, index) => {
                            const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                            return (
                                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-500">{monthNames[item.month - 1]} {item.year}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{item.count}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
