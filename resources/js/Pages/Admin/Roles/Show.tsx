import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import { Link } from '@inertiajs/react';

interface Permission {
  id: number;
  key: string;
  name: string;
  description: string;
  module: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  area: string | null;
  status: string;
}

interface Role {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_system: boolean;
  permissions: Permission[];
  users: User[];
}

export default function Show({ role }: { role: Role }) {
  const permissionsByModule = role.permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.module]) {
        acc[permission.module] = [];
      }
      acc[permission.module].push(permission);
      return acc;
    },
    {} as { [key: string]: Permission[] },
  );

  const userColumns = [
    {
      header: 'Nombre',
      accessor: 'name' as keyof User,
    },
    {
      header: 'Email',
      accessor: 'email' as keyof User,
    },
    {
      header: 'Área',
      accessor: (row: User) => row.area || '-',
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
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title={role.name}
          description={role.description || undefined}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Roles', href: '/admin/roles' },
            { label: role.name },
          ]}
          actions={
            <Link href={`/admin/roles/${role.id}/edit`} className="btn btn-primary">
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
              Editar
            </Link>
          }
        />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Card */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Información</h2>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-base-content/60">Slug</div>
                  <div className="font-mono text-sm">{role.slug}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Tipo</div>
                  <div>
                    {role.is_system ? (
                      <div className="badge badge-info">Rol del Sistema</div>
                    ) : (
                      <div className="badge badge-ghost">Personalizado</div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Permisos</div>
                  <div className="text-2xl font-bold">{role.permissions.length}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Usuarios</div>
                  <div className="text-2xl font-bold">{role.users.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions Card */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Permisos Asignados</h2>

              {role.permissions.length === 0 ? (
                <div className="text-center py-8 text-base-content/60">
                  Este rol no tiene permisos asignados
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(permissionsByModule).map(([module, permissions]) => (
                    <div key={module}>
                      <h3 className="font-semibold mb-2">{module}</h3>
                      <div className="flex flex-wrap gap-2">
                        {permissions.map((permission) => (
                          <div key={permission.id} className="badge badge-primary badge-lg">
                            {permission.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      {role.users.length > 0 && (
        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <h2 className="card-title">Usuarios con este Rol ({role.users.length})</h2>

            <DataTable
              columns={userColumns}
              data={role.users}
              actions={(user) => (
                <Link href={`/admin/users/${user.id}`} className="btn btn-ghost btn-sm">
                  Ver
                </Link>
              )}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
