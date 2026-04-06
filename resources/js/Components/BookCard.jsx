import { Link } from '@inertiajs/react';

export default function BookCard({ book }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow duration-300 border border-transparent dark:border-gray-700">
            <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 relative">
                {book.cover_image ? (
                    <img
                        src={`/storage/${book.cover_image}`}
                        alt={book.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-gray-700 dark:to-gray-800">
                        <svg className="w-16 h-16 text-indigo-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                )}
                {book.status === 'disponible' ? (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Disponible
                    </span>
                ) : (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Agotado
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg line-clamp-2 mb-1">
                    {book.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{book.author}</p>
                {book.category && (
                    <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded mb-2">
                        {book.category.name}
                    </span>
                )}
                <div className="flex items-center justify-between mt-3">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                        ${parseFloat(book.price).toFixed(2)}
                    </span>
                    <Link
                        href={route('books.show', book.id)}
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                    >
                        Ver detalles
                    </Link>
                </div>
            </div>
        </div>
    );
}
