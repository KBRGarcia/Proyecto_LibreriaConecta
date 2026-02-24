export default function StatusBadge({ status }) {
    const styles = {
        // Reservas
        pendiente:  'bg-yellow-100 text-yellow-800',
        confirmada: 'bg-green-100 text-green-800',
        cancelada:  'bg-red-100 text-red-800',
        // Libros
        disponible: 'bg-emerald-100 text-emerald-800',
        agotado:    'bg-orange-100 text-orange-800',
        // Usuarios
        activo:   'bg-green-100 text-green-800',
        inactivo: 'bg-red-100 text-red-800',
    };

    const labels = {
        pendiente:  'Pendiente',
        confirmada: 'Confirmada',
        cancelada:  'Cancelada',
        disponible: 'Disponible',
        agotado:    'Agotado',
        activo:     'Activo',
        inactivo:   'Inactivo',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
            {labels[status] || status}
        </span>
    );
}
