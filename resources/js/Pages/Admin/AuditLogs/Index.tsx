import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import DataTable from '@/Components/Admin/DataTable';
import { Link, router, useForm } from '@inertiajs/react';

interface AuditUser {
  id: number;
  name: string;
  email: string;
}

interface AuditLog {
  id: number;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
  actor?: AuditUser | null;
}

interface PaginatedLogs {
  data: AuditLog[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function Index({
  logs,
  filters,
  users,
}: {
  logs: PaginatedLogs;
  filters: {
    user_id?: string | number | null;
    action?: string | null;
    date_from?: string | null;
    date_to?: string | null;
  };
  users: AuditUser[];
}) {
  const { data, setData, reset } = useForm({
    user_id: filters.user_id ?? '',
    action: filters.action ?? '',
    date_from: filters.date_from ?? '',
    date_to: filters.date_to ?? '',
  });

  const applyFilters = () => {
    router.get('/admin/audit-logs', data, { preserveState: true, replace: true });
  };

  const clearFilters = () => {
    reset();
    router.get('/admin/audit-logs', {}, { preserveState: true, replace: true });
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Logs de Auditoria"
          description="Registro de acciones realizadas en el sistema"
          breadcrumbs={[{ label: 'Admin', href: '/dashboard' }, { label: 'Auditoria' }]}
        />
      }
    >
      <Alert />

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="card-title">Filtros</h2>
            <div className="flex gap-2">
              <button type="button" className="btn btn-outline btn-sm" onClick={clearFilters}>
                Limpiar
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={applyFilters}>
                Aplicar
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Usuario</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={data.user_id}
                onChange={(event) => setData('user_id', event.target.value)}
              >
                <option value="">Todos</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Accion</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={data.action}
                onChange={(event) => setData('action', event.target.value)}
                placeholder="certificate_template.created"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Desde</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={data.date_from}
                onChange={(event) => setData('date_from', event.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Hasta</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={data.date_to}
                onChange={(event) => setData('date_to', event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <DataTable
            columns={[
              {
                header: 'Fecha',
                accessor: (row: AuditLog) => new Date(row.created_at).toLocaleString(),
              },
              {
                header: 'Usuario',
                accessor: (row: AuditLog) => row.actor?.name ?? 'Sistema',
              },
              {
                header: 'Accion',
                accessor: (row: AuditLog) => row.action,
              },
              {
                header: 'Entidad',
                accessor: (row: AuditLog) =>
                  row.entity_type ? `${row.entity_type} #${row.entity_id ?? '-'}` : '-',
              },
              {
                header: 'IP',
                accessor: (row: AuditLog) => row.ip ?? '-',
              },
            ]}
            data={logs.data}
            emptyMessage="No hay registros de auditoria."
          />
        </div>
      </div>

      {logs.last_page > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join">
            {Array.from({ length: logs.last_page }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/admin/audit-logs?page=${page}`}
                className={`join-item btn ${page === logs.current_page ? 'btn-active' : ''}`}
              >
                {page}
              </Link>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
