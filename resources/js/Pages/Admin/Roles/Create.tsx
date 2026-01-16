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

export default function Create({ permissions }: { permissions: PermissionsByModule }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    is_system: false,
    permissions: [] as number[],
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/admin/roles');
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
          title="Crear Rol"
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Roles', href: '/admin/roles' },
            { label: 'Crear' },
          ]}
        />
      }
    >
      <Alert />

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
                placeholder="Ej: Editor de Contenidos"
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
                placeholder="Descripción del rol y sus responsabilidades"
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
              Selecciona los permisos que tendrá este rol
            </p>

            <div className="space-y-4">
              {Object.entries(permissions).map(([module, modulePermissions]) => (
                <div key={module} className="border border-base-300 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{module}</h3>
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
              ))}
            </div>

            {errors.permissions && (
              <div className="alert alert-error mt-4">
                <span>{errors.permissions}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Crear Rol
          </button>
          <a href="/admin/roles" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
