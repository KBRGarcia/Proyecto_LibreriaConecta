import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import BookCard from '@/Components/BookCard';
import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';
import SelectInput from '@/Components/SelectInput';
import EmptyState from '@/Components/EmptyState';

export default function Index({ books, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');

    const handleSearch = (value) => {
        setSearch(value);
        router.get(route('books.index'), { search: value, category }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
        router.get(route('books.index'), { search, category: value }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <PublicLayout>
            <Head title="Catálogo de Libros" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Catálogo de Libros</h1>
                    <p className="mt-2 text-gray-600">
                        Explora nuestra colección y reserva tus libros favoritos
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <SearchInput
                            value={search}
                            onChange={handleSearch}
                            placeholder="Buscar por título, autor o ISBN..."
                            className="flex-1"
                        />
                        <SelectInput
                            value={category}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="sm:w-48"
                        >
                            <option value="">Todas las categorías</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </SelectInput>
                    </div>
                </div>

                {/* Results */}
                {books.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {books.data.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                        <div className="mt-8">
                            <Pagination links={books.links} />
                        </div>
                    </>
                ) : (
                    <EmptyState
                        title="No se encontraron libros"
                        description="Intenta ajustar los filtros de búsqueda"
                        icon={
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        }
                    />
                )}
            </div>
        </PublicLayout>
    );
}
