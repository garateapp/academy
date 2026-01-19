import AdminLayout from '@/layouts/AdminLayout';
import DataTable from '@/components/Admin/DataTable';
import PageHeader from '@/components/Admin/PageHeader';
import Alert from '@/components/Admin/Alert';
import { Link, router } from '@inertiajs/react';

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  area: string | null;
  position: string | null;
  status: string;
  role: Role;
  enrollments_count: number;
}

interface PaginatedUsers {
  data: User[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function Index({ users }: { users: PaginatedUsers }) {
  const handleDelete = (user: User) => {
    if (
      confirm(
        `¿Estás seguro de eliminar al usuario "${user.name}"? Esta acción no se puede deshacer.`,
      )
    ) {
      router.delete(`/admin/users/${user.id}`);
    }
  };

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === 'active' ? 'inactivo' : 'activo';
    if (confirm(`¿Deseas cambiar el estado de "${user.name}" a ${newStatus}?`)) {
      router.post(`/admin/users/${user.id}/toggle-status`);
    }
  };

  const columns = [
    {
      header: 'Usuario',
      accessor: (row: User) => (
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-12">
              <span className="text-lg">{row.name.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <div>
            <div className="font-semibold">{row.name}</div>
            <div className="text-sm text-base-content/60">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Área',
      accessor: (row: User) => row.area || '-',
    },
    {
      header: 'Cargo',
      accessor: (row: User) => row.position || '-',
    },
    {
      header: 'Rol',
      accessor: (row: User) => (
        <div className="badge badge-secondary badge-outline">{row.role.name}</div>
      ),
      className: 'text-center',
    },
    {
      header: 'Matrículas',
      accessor: (row: User) => (
        <div className="badge badge-primary badge-outline">{row.enrollments_count}</div>
      ),
      className: 'text-center',
    },
    {
      header: 'Estado',
      accessor: (row: User) => (
        <div
          className={`badge ${row.status === 'active' ? 'badge-success' : 'badge-error'}`}
        >
          {row.status === 'active' ? 'Activo' : 'Inactivo'}
        </div>
      ),
      className: 'text-center',
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Usuarios"
          description="Gestiona los usuarios del sistema"
          breadcrumbs={[{ label: 'Admin', href: '/dashboard' }, { label: 'Usuarios' }]}
          actions={
            <Link href="/admin/users/create" className="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nuevo Usuario
            </Link>
          }
        />
      }
    >
      <Alert />

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <DataTable
            columns={columns}
            data={users.data}
            actions={(row) => (
              <div className="flex gap-2 justify-end">
                <Link
                  href={`/admin/users/${row.id}`}
                  className="btn btn-ghost btn-sm"
                  title="Ver detalles"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </Link>

                <Link
                  href={`/admin/users/${row.id}/edit`}
                  className="btn btn-ghost btn-sm"
                  title="Editar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </Link>

                <button
                  onClick={() => handleToggleStatus(row)}
                  className={`btn btn-ghost btn-sm ${row.status === 'active' ? 'text-warning' : 'text-success'}`}
                  title={row.status === 'active' ? 'Desactivar' : 'Activar'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => handleDelete(row)}
                  className="btn btn-ghost btn-sm text-error"
                  title="Eliminar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}
            emptyMessage="No hay usuarios registrados. Crea el primer usuario."
          />
        </div>
      </div>

      {/* Pagination */}
      {users.last_page > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join">
            {Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/admin/users?page=${page}`}
                className={`join-item btn ${page === users.current_page ? 'btn-active' : ''}`}
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
