import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Edit({ book, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        description: book.description || '',
        stock: book.stock,
        price: book.price,
        category_id: book.category_id,
        cover_image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.books.update', book.id));
    };

    return (
        <AdminLayout header={<h1 className="text-xl font-semibold text-gray-900">Editar Libro</h1>}>
            <Head title="Editar Libro" />

            <div className="max-w-2xl">
                <div className="bg-white shadow-sm rounded-lg">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        {book.cover_image && (
                            <div className="mb-4">
                                <InputLabel value="Portada actual" />
                                <img
                                    src={`/storage/${book.cover_image}`}
                                    alt={book.title}
                                    className="mt-2 w-24 h-32 object-cover rounded"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <InputLabel htmlFor="title" value="Título" />
                                <TextInput
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="author" value="Autor" />
                                <TextInput
                                    id="author"
                                    value={data.author}
                                    onChange={(e) => setData('author', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.author} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="isbn" value="ISBN" />
                                <TextInput
                                    id="isbn"
                                    value={data.isbn}
                                    onChange={(e) => setData('isbn', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.isbn} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="category_id" value="Categoría" />
                                <SelectInput
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                >
                                    <option value="">Seleccionar categoría</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.category_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="price" value="Precio" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="stock" value="Stock" />
                                <TextInput
                                    id="stock"
                                    type="number"
                                    min="0"
                                    value={data.stock}
                                    onChange={(e) => setData('stock', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.stock} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="cover_image" value="Nueva imagen de portada" />
                                <input
                                    id="cover_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('cover_image', e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                                <InputError message={errors.cover_image} className="mt-2" />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel htmlFor="description" value="Descripción" />
                                <TextArea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full"
                                    rows={4}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4 border-t">
                            <Link href={route('admin.books.index')}>
                                <SecondaryButton type="button">Cancelar</SecondaryButton>
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Guardando...' : 'Actualizar libro'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
