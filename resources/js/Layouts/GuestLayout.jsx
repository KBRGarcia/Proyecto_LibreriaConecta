import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Navigation */}
            <nav className="py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-indigo-600">
                        LibroConecta
                    </Link>
                    <Link
                        href={route('books.index')}
                        className="text-sm text-gray-600 hover:text-indigo-600"
                    >
                        Ver Catálogo
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 px-4">
                <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-white shadow-lg overflow-hidden sm:rounded-xl">
                    {children}
                </div>
            </div>

            {/* Footer */}
            <footer className="py-4 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} LibroConecta. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
