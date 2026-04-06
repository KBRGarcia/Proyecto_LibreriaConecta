import { Link } from '@inertiajs/react';
import useTheme from '@/Hooks/useTheme';

export default function Guest({ children }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
            {/* Navigation */}
            <nav className="py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-indigo-600">
                        LibroConecta
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route('books.index')}
                            className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                            Ver Catálogo
                        </Link>
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 px-4">
                <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-white dark:bg-gray-800 shadow-lg overflow-hidden sm:rounded-xl transition-colors duration-200">
                    <div className="text-gray-900 dark:text-gray-100">
                        {children}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-4 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} LibroConecta. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
