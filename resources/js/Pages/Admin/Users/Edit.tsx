import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/Admin/PageHeader';
import Alert from '@/components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Role {
  id: number;
  name: string;
  description: string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  area: string | null;
  position: string | null;
  role_id: number;
  status: string;
  enrollments_count: number;
}

export default function Edit({ user, roles }: { user: User; roles: Role[] }) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
    role_id: user.role_id.toString(),
    area: user.area || '',
    position: user.position || '',
    status: user.status,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(`/admin/users/${user.id}`);
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title={`Editar Usuario: ${user.name}`}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Usuarios', href: '/admin/users' },
            { label: 'Editar' },
          ]}
        />
      }
    >
      <Alert />

      {user.enrollments_count > 0 && (
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
          <span>
            Este usuario tiene {user.enrollments_count} matrícula(s) activa(s). Ten cuidado al
            modificar su información.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Información del Usuario</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Nombre Completo <span className="text-error">*</span>
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
                  <span className="label-text">
                    Correo Electrónico <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  required
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.email}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="divider"></div>

            <h3 className="font-semibold text-lg">Cambiar Contraseña</h3>
            <p className="text-sm text-base-content/60 mb-2">
              Deja en blanco si no deseas cambiar la contraseña
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nueva Contraseña</span>
                  <span className="label-text-alt text-base-content/60">Opcional</span>
                </label>
                <input
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.password}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Confirmar Nueva Contraseña</span>
                </label>
                <input
                  type="password"
                  placeholder="Repite la contraseña"
                  className={`input input-bordered w-full`}
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                />
              </div>
            </div>

            <div className="divider"></div>

            <h3 className="font-semibold text-lg">Información Organizacional</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Área</span>
                  <span className="label-text-alt text-base-content/60">Opcional</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: Recursos Humanos"
                  className={`input input-bordered w-full ${errors.area ? 'input-error' : ''}`}
                  value={data.area}
                  onChange={(e) => setData('area', e.target.value)}
                />
                {errors.area && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.area}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Cargo</span>
                  <span className="label-text-alt text-base-content/60">Opcional</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: Jefe de Área"
                  className={`input input-bordered w-full ${errors.position ? 'input-error' : ''}`}
                  value={data.position}
                  onChange={(e) => setData('position', e.target.value)}
                />
                {errors.position && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.position}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Rol <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.role_id ? 'select-error' : ''}`}
                  value={data.role_id}
                  onChange={(e) => setData('role_id', e.target.value)}
                  required
                >
                  <option value="">Selecciona un rol</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                      {role.description && ` - ${role.description}`}
                    </option>
                  ))}
                </select>
                {errors.role_id && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.role_id}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Estado <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.status ? 'select-error' : ''}`}
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  required
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
                {errors.status && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.status}</span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Guardar Cambios
          </button>
          <a href="/admin/users" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
