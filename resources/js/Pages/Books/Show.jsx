import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import BookCard from '@/Components/BookCard';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Show({ book, relatedBooks }) {
    const { auth } = usePage().props;

    return (
        <PublicLayout>
            <Head title={book.title} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <Link href={route('books.index')} className="hover:text-indigo-600">
                                Catálogo
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-gray-900">{book.title}</li>
                    </ol>
                </nav>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="md:flex">
                        {/* Book Cover */}
                        <div className="md:w-1/3 p-6">
                            <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
                                {book.cover_image ? (
                                    <img
                                        src={`/storage/${book.cover_image}`}
                                        alt={book.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200">
                                        <svg className="w-24 h-24 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Book Details */}
                        <div className="md:w-2/3 p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                                    <p className="text-xl text-gray-600 mt-1">por {book.author}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${book.status === 'disponible' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {book.status === 'disponible' ? `${book.stock} disponibles` : 'Agotado'}
                                </span>
                            </div>

                            <div className="mt-6 flex items-center space-x-4">
                                {book.category && (
                                    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                        {book.category.name}
                                    </span>
                                )}
                                {book.isbn && (
                                    <span className="text-gray-500 text-sm">ISBN: {book.isbn}</span>
                                )}
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-900">Descripción</h3>
                                <p className="mt-2 text-gray-600 leading-relaxed">
                                    {book.description || 'No hay descripción disponible para este libro.'}
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-between border-t pt-6">
                                <div>
                                    <span className="text-3xl font-bold text-indigo-600">
                                        ${parseFloat(book.price).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex space-x-4">
                                    <Link href={route('books.index')}>
                                        <SecondaryButton>
                                            Volver al catálogo
                                        </SecondaryButton>
                                    </Link>
                                    {auth?.user && book.status === 'disponible' && (
                                        <Link href={route('reservations.create', { book_id: book.id })}>
                                            <PrimaryButton>
                                                Reservar libro
                                            </PrimaryButton>
                                        </Link>
                                    )}
                                    {!auth?.user && book.status === 'disponible' && (
                                        <Link href={route('login')}>
                                            <PrimaryButton>
                                                Inicia sesión para reservar
                                            </PrimaryButton>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Books */}
                {relatedBooks.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Libros relacionados</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedBooks.map((relatedBook) => (
                                <BookCard key={relatedBook.id} book={relatedBook} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
