import { Link } from '@inertiajs/react';

export default function Pagination({ links, className = '' }) {
    if (!links || links.length <= 3) return null;

    return (
        <nav className={`flex items-center justify-center space-x-1 ${className}`}>
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        link.active
                            ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                            : link.url
                            ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                            : 'bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed border-gray-300 dark:border-gray-700'
                    }`}
                    preserveScroll
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}
