import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';
import SelectInput from '@/Components/SelectInput';

const actionColors = {
    INSERT: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    UPDATE: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    DELETE: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    SELECT: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

export default function Index({ logs, tables, actions, filters }) {
    const [search, setSearch]         = useState(filters.search || '');
    const [actionFilter, setAction]   = useState(filters.action || '');
    const [tableFilter, setTable]     = useState(filters.table_name || '');

    const applyFilters = (overrides = {}) => {
        router.get(route('admin.action_logs.index'), {
            search:     overrides.search     ?? search,
            action:     overrides.action     ?? actionFilter,
            table_name: overrides.table_name ?? tableFilter,
        }, { preserveState: true, preserveScroll: true });
    };

    const handleSearch = (value) => {
        setSearch(value);
        applyFilters({ search: value });
    };

    const handleAction = (value) => {
        setAction(value);
        applyFilters({ action: value });
    };

    const handleTable = (value) => {
        setTable(value);
        applyFilters({ table_name: value });
    };

    return (
        <AdminLayout header={<h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Bitácora de Acciones</h1>}>
            <Head title="Bitácora de Acciones" />

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <SearchInput
                            value={search}
                            onChange={handleSearch}
                            placeholder="Buscar por descripción o usuario..."
                            className="w-full sm:w-72"
                        />
                        <SelectInput
                            value={actionFilter}
                            onChange={(e) => handleAction(e.target.value)}
                            className="w-full sm:w-40"
                        >
                            <option value="">Todas las acciones</option>
                            {actions.map((a) => (
                                <option key={a} value={a}>{a}</option>
                            ))}
                        </SelectInput>
                        <SelectInput
                            value={tableFilter}
                            onChange={(e) => handleTable(e.target.value)}
                            className="w-full sm:w-40"
                        >
                            <option value="">Todas las tablas</option>
                            {tables.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </SelectInput>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Usuario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tabla</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID Registro</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descripción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">IP</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                            {logs.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No se encontraron registros en la bitácora.
                                    </td>
                                </tr>
                            ) : (
                                logs.data.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                            {new Date(log.created_at).toLocaleString('es-ES', {
                                                year: 'numeric', month: '2-digit', day: '2-digit',
                                                hour: '2-digit', minute: '2-digit',
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {log.user ? `${log.user.first_name} ${log.user.last_name}` : 'Sistema'}
                                            </div>
                                            <div className="text-gray-400 dark:text-gray-500 text-xs">{log.user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-bold rounded ${actionColors[log.action] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-600 dark:text-gray-300">
                                            {log.table_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400 text-center">
                                            #{log.record_id}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 max-w-xs truncate">
                                            {log.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-400 dark:text-gray-500 text-xs">
                                            {log.ip_address}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <Pagination links={logs.links} />
                </div>
            </div>
        </AdminLayout>
    );
}
