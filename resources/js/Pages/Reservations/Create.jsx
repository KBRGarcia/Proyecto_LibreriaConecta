import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Create({ auth, book }) {
    const { data, setData, post, processing, errors } = useForm({
        book_id: book?.id || '',
        reservation_date: new Date().toISOString().split('T')[0],
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('reservations.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nueva Reserva</h2>}
        >
            <Head title="Nueva Reserva" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {book ? (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Libro seleccionado
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                            {book.cover_image ? (
                                                <img
                                                    src={`/storage/${book.cover_image}`}
                                                    alt={book.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{book.title}</p>
                                            <p className="text-sm text-gray-600">{book.author}</p>
                                            <p className="text-sm text-indigo-600 font-semibold mt-1">
                                                ${parseFloat(book.price).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-yellow-800">
                                        No has seleccionado un libro.{' '}
                                        <Link href={route('books.index')} className="underline">
                                            Ir al catálogo
                                        </Link>
                                    </p>
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <InputLabel htmlFor="reservation_date" value="Fecha de reserva" />
                                    <TextInput
                                        id="reservation_date"
                                        type="date"
                                        name="reservation_date"
                                        value={data.reservation_date}
                                        className="mt-1 block w-full"
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setData('reservation_date', e.target.value)}
                                    />
                                    <InputError message={errors.reservation_date} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="notes" value="Notas (opcional)" />
                                    <TextArea
                                        id="notes"
                                        name="notes"
                                        value={data.notes}
                                        className="mt-1 block w-full"
                                        rows={3}
                                        placeholder="Agrega cualquier comentario adicional..."
                                        onChange={(e) => setData('notes', e.target.value)}
                                    />
                                    <InputError message={errors.notes} className="mt-2" />
                                </div>

                                <InputError message={errors.book_id} className="mb-4" />

                                <div className="flex justify-end space-x-4">
                                    <Link href={route('reservations.index')}>
                                        <SecondaryButton type="button">Cancelar</SecondaryButton>
                                    </Link>
                                    <PrimaryButton disabled={processing || !book}>
                                        {processing ? 'Procesando...' : 'Confirmar reserva'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
