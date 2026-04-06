export default function StatusBadge({ status }) {
    const styles = {
        // Reservas
        pendiente:  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        confirmada: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        cancelada:  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        // Libros
        disponible: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
        agotado:    'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        // Usuarios
        activo:   'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        inactivo: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
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
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent dark:border-gray-700/50 transition-colors duration-200 ${styles[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
            {labels[status] || status}
        </span>
    );
}
