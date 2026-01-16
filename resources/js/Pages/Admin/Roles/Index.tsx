import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/Admin/DataTable';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { Link, router } from '@inertiajs/react';

interface Permission {
  id: number;
  key: string;
  name: string;
  module: string;
}

interface Role {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_system: boolean;
  users_count: number;
  permissions_count: number;
  permissions: Permission[];
}

interface PaginatedRoles {
  data: Role[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function Index({ roles }: { roles: PaginatedRoles }) {
  const handleDelete = (role: Role) => {
    if (role.is_system) {
      alert('No se pueden eliminar roles del sistema.');
      return;
    }

    if (
      confirm(
        `¿Estás seguro de eliminar el rol "${role.name}"? Esta acción no se puede deshacer.`,
      )
    ) {
      router.delete(`/admin/roles/${role.id}`);
    }
  };

  const handleDuplicate = (role: Role) => {
    if (confirm(`¿Deseas duplicar el rol "${role.name}"?`)) {
      router.post(`/admin/roles/${role.id}/duplicate`);
    }
  };

  const columns = [
    {
      header: 'Nombre',
      accessor: (row: Role) => (
        <div>
          <div className="font-semibold">{row.name}</div>
          {row.description && (
            <div className="text-sm text-base-content/60">{row.description}</div>
          )}
        </div>
      ),
    },
    {
      header: 'Slug',
      accessor: 'slug' as keyof Role,
      className: 'font-mono text-sm',
    },
    {
      header: 'Usuarios',
      accessor: (row: Role) => (
        <div className="badge badge-primary badge-outline">{row.users_count}</div>
      ),
      className: 'text-center',
    },
    {
      header: 'Permisos',
      accessor: (row: Role) => (
        <div className="badge badge-secondary badge-outline">{row.permissions_count}</div>
      ),
      className: 'text-center',
    },
    {
      header: 'Tipo',
      accessor: (row: Role) =>
        row.is_system ? (
          <div className="badge badge-info">Sistema</div>
        ) : (
          <div className="badge badge-ghost">Personalizado</div>
        ),
      className: 'text-center',
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Roles"
          description="Gestiona los roles y permisos del sistema"
          breadcrumbs={[{ label: 'Admin', href: '/dashboard' }, { label: 'Roles' }]}
          actions={
            <Link href="/admin/roles/create" className="btn btn-primary">
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
              Nuevo Rol
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
            data={roles.data}
            actions={(row) => (
              <div className="flex gap-2 justify-end">
                <Link
                  href={`/admin/roles/${row.id}`}
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
                  href={`/admin/roles/${row.id}/edit`}
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
                  onClick={() => handleDuplicate(row)}
                  className="btn btn-ghost btn-sm"
                  title="Duplicar"
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>

                {!row.is_system && (
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
                )}
              </div>
            )}
            emptyMessage="No hay roles registrados. Crea el primer rol."
          />
        </div>
      </div>

      {/* Pagination */}
      {roles.last_page > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join">
            {Array.from({ length: roles.last_page }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/admin/roles?page=${page}`}
                className={`join-item btn ${page === roles.current_page ? 'btn-active' : ''}`}
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
