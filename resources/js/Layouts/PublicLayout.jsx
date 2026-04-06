import { Link, usePage } from '@inertiajs/react';
import useTheme from '@/Hooks/useTheme';

export default function PublicLayout({ children }) {
    const { auth } = usePage().props;
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl font-bold text-indigo-600">LibroConecta</span>
                            </Link>
                            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                                <Link
                                    href={route('books.index')}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-indigo-500"
                                >
                                    Catálogo
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                                    >
                                        Mi cuenta
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                                    >
                                        Salir
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 transition"
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
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
                </div>
            </nav>

            <main>{children}</main>

            <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-12 transition-colors duration-200">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                        <p>&copy; {new Date().getFullYear()} LibroConecta. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
