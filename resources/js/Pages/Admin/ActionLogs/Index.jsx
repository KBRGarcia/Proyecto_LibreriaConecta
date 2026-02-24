import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';
import SelectInput from '@/Components/SelectInput';

const actionColors = {
    INSERT: 'bg-green-100 text-green-800',
    UPDATE: 'bg-blue-100 text-blue-800',
    DELETE: 'bg-red-100 text-red-800',
    SELECT: 'bg-gray-100 text-gray-800',
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
        <AdminLayout header={<h1 className="text-xl font-semibold text-gray-900">Bitácora de Acciones</h1>}>
            <Head title="Bitácora de Acciones" />

            <div className="bg-white shadow-sm rounded-lg">
                <div className="p-6 border-b border-gray-200">
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
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tabla</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Registro</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm">
                            {logs.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No se encontraron registros en la bitácora.
                                    </td>
                                </tr>
                            ) : (
                                logs.data.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {new Date(log.created_at).toLocaleString('es-ES', {
                                                year: 'numeric', month: '2-digit', day: '2-digit',
                                                hour: '2-digit', minute: '2-digit',
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">
                                                {log.user ? `${log.user.first_name} ${log.user.last_name}` : 'Sistema'}
                                            </div>
                                            <div className="text-gray-400 text-xs">{log.user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-bold rounded ${actionColors[log.action] || 'bg-gray-100 text-gray-800'}`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-600">
                                            {log.table_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-center">
                                            #{log.record_id}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 max-w-xs truncate">
                                            {log.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-400 text-xs">
                                            {log.ip_address}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-gray-200">
                    <Pagination links={logs.links} />
                </div>
            </div>
        </AdminLayout>
    );
}
