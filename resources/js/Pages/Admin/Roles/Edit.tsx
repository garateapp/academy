import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Permission {
  id: number;
  key: string;
  name: string;
  description: string;
  module: string;
}

interface PermissionsByModule {
  [module: string]: Permission[];
}

interface Role {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_system: boolean;
}

export default function Edit({
  role,
  permissions,
  rolePermissions,
}: {
  role: Role;
  permissions: PermissionsByModule;
  rolePermissions: number[];
}) {
  const { data, setData, put, processing, errors } = useForm({
    name: role.name,
    description: role.description || '',
    is_system: role.is_system,
    permissions: rolePermissions,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(`/admin/roles/${role.id}`);
  };

  const handlePermissionToggle = (permissionId: number) => {
    setData(
      'permissions',
      data.permissions.includes(permissionId)
        ? data.permissions.filter((id) => id !== permissionId)
        : [...data.permissions, permissionId],
    );
  };

  const handleModuleToggle = (module: string) => {
    const modulePermissions = permissions[module].map((p) => p.id);
    const allSelected = modulePermissions.every((id) => data.permissions.includes(id));

    if (allSelected) {
      setData(
        'permissions',
        data.permissions.filter((id) => !modulePermissions.includes(id)),
      );
    } else {
      setData('permissions', [...new Set([...data.permissions, ...modulePermissions])]);
    }
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title={`Editar Rol: ${role.name}`}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Roles', href: '/admin/roles' },
            { label: 'Editar' },
          ]}
        />
      }
    >
      <Alert />

      {role.is_system && (
        <div className="alert alert-warning mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Este es un rol del sistema. Ten cuidado al modificar sus permisos.</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Información del Rol</h2>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Nombre <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Descripción</span>
              </label>
              <textarea
                className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              ></textarea>
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.description}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={data.is_system}
                  onChange={(e) => setData('is_system', e.target.checked)}
                />
                <div>
                  <span className="label-text font-semibold">Rol del Sistema</span>
                  <p className="text-sm text-base-content/60">
                    Los roles del sistema no pueden ser eliminados
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Permissions Section */}
        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <h2 className="card-title">Permisos</h2>
            <p className="text-sm text-base-content/60 mb-4">
              Selecciona los permisos que tendrá este rol ({data.permissions.length}{' '}
              seleccionados)
            </p>

            <div className="space-y-4">
              {Object.entries(permissions).map(([module, modulePermissions]) => {
                const selectedCount = modulePermissions.filter((p) =>
                  data.permissions.includes(p.id),
                ).length;

                return (
                  <div key={module} className="border border-base-300 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{module}</h3>
                        <p className="text-sm text-base-content/60">
                          {selectedCount} de {modulePermissions.length} seleccionados
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost"
                        onClick={() => handleModuleToggle(module)}
                      >
                        {modulePermissions.every((p) => data.permissions.includes(p.id))
                          ? 'Deseleccionar todo'
                          : 'Seleccionar todo'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {modulePermissions.map((permission) => (
                        <div key={permission.id} className="form-control">
                          <label className="label cursor-pointer justify-start gap-3">
                            <input
                              type="checkbox"
                              className="checkbox checkbox-sm"
                              checked={data.permissions.includes(permission.id)}
                              onChange={() => handlePermissionToggle(permission.id)}
                            />
                            <div>
                              <span className="label-text font-medium">{permission.name}</span>
                              <p className="text-xs text-base-content/60">
                                {permission.description}
                              </p>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Guardar Cambios
          </button>
          <a href="/admin/roles" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
