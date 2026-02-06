import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/Card';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ auth, stats, recentReservations, lowStockBooks, myReservations, featuredBooks }) {
    const isAdmin = auth.user?.role?.name === 'Administrator';

    if (isAdmin) {
        return <AdminDashboard stats={stats} recentReservations={recentReservations} lowStockBooks={lowStockBooks} />;
    }

    return <ClientDashboard auth={auth} stats={stats} myReservations={myReservations} featuredBooks={featuredBooks} />;
}

function AdminDashboard({ stats, recentReservations, lowStockBooks }) {
    return (
        <AdminLayout header={<h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>}>
            <Head title="Dashboard" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card
                    title="Total Libros"
                    value={stats.totalBooks}
                    color="indigo"
                    icon={<BookIcon />}
                />
                <Card
                    title="Total Usuarios"
                    value={stats.totalUsers}
                    color="green"
                    icon={<UsersIcon />}
                />
                <Card
                    title="Reservas Pendientes"
                    value={stats.pendingReservations}
                    color="yellow"
                    icon={<ClockIcon />}
                />
                <Card
                    title="Total Reservas"
                    value={stats.totalReservations}
                    color="blue"
                    icon={<ClipboardIcon />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Reservations */}
                <div className="bg-white shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900">Reservas Recientes</h2>
                            <Link href={route('admin.reservations.index')} className="text-sm text-indigo-600 hover:text-indigo-900">
                                Ver todas
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {recentReservations?.map((reservation) => (
                            <div key={reservation.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">{reservation.book?.title}</p>
                                    <p className="text-sm text-gray-500">{reservation.user?.name}</p>
                                </div>
                                <StatusBadge status={reservation.status} />
                            </div>
                        ))}
                        {(!recentReservations || recentReservations.length === 0) && (
                            <p className="p-4 text-gray-500 text-center">No hay reservas recientes</p>
                        )}
                    </div>
                </div>

                {/* Low Stock Books */}
                <div className="bg-white shadow-sm rounded-lg">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900">Stock Bajo</h2>
                            <Link href={route('admin.books.index')} className="text-sm text-indigo-600 hover:text-indigo-900">
                                Ver todos
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {lowStockBooks?.map((book) => (
                            <div key={book.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">{book.title}</p>
                                    <p className="text-sm text-gray-500">{book.author}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${book.stock === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {book.stock} unidades
                                </span>
                            </div>
                        ))}
                        {(!lowStockBooks || lowStockBooks.length === 0) && (
                            <p className="p-4 text-gray-500 text-center">No hay libros con stock bajo</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function ClientDashboard({ auth, stats, myReservations, featuredBooks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white">
                        <h1 className="text-2xl font-bold mb-2">
                            Bienvenido, {auth.user.name}
                        </h1>
                        <p className="opacity-90">
                            Explora nuestro catálogo y gestiona tus reservas desde aquí.
                        </p>
                        <div className="mt-4">
                            <Link href={route('books.index')}>
                                <PrimaryButton className="bg-white text-indigo-600 hover:bg-gray-100">
                                    Explorar catálogo
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card
                            title="Mis Reservas"
                            value={stats?.totalReservations || 0}
                            color="indigo"
                            icon={<ClipboardIcon />}
                        />
                        <Card
                            title="Pendientes"
                            value={stats?.pendingReservations || 0}
                            color="yellow"
                            icon={<ClockIcon />}
                        />
                        <Card
                            title="Confirmadas"
                            value={stats?.confirmedReservations || 0}
                            color="green"
                            icon={<CheckIcon />}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* My Recent Reservations */}
                        <div className="bg-white shadow-sm rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold text-gray-900">Mis Reservas Recientes</h2>
                                    <Link href={route('reservations.index')} className="text-sm text-indigo-600 hover:text-indigo-900">
                                        Ver todas
                                    </Link>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {myReservations?.map((reservation) => (
                                    <div key={reservation.id} className="p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">{reservation.book?.title}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(reservation.reservation_date).toLocaleDateString('es-ES')}
                                            </p>
                                        </div>
                                        <StatusBadge status={reservation.status} />
                                    </div>
                                ))}
                                {(!myReservations || myReservations.length === 0) && (
                                    <div className="p-6 text-center">
                                        <p className="text-gray-500 mb-4">No tienes reservas aún</p>
                                        <Link href={route('books.index')}>
                                            <PrimaryButton>Explorar catálogo</PrimaryButton>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Featured Books */}
                        <div className="bg-white shadow-sm rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold text-gray-900">Libros Destacados</h2>
                                    <Link href={route('books.index')} className="text-sm text-indigo-600 hover:text-indigo-900">
                                        Ver todos
                                    </Link>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {featuredBooks?.map((book) => (
                                    <Link key={book.id} href={route('books.show', book.id)} className="block p-4 hover:bg-gray-50">
                                        <div className="flex items-center">
                                            <div className="w-12 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                                                {book.cover_image ? (
                                                    <img src={`/storage/${book.cover_image}`} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-medium text-gray-900">{book.title}</p>
                                                <p className="text-sm text-gray-500">{book.author}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                {(!featuredBooks || featuredBooks.length === 0) && (
                                    <p className="p-4 text-gray-500 text-center">No hay libros disponibles</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Icon Components
function BookIcon() {
    return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    );
}

function UsersIcon() {
    return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function ClipboardIcon() {
    return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
