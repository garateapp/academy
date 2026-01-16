import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Role {
  id: number;
  name: string;
  description: string | null;
}

export default function Create({ roles }: { roles: Role[] }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: '',
    area: '',
    position: '',
    status: 'active',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/admin/users');
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Crear Usuario"
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Usuarios', href: '/admin/users' },
            { label: 'Crear' },
          ]}
        />
      }
    >
      <Alert />

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
                  placeholder="Ej: Juan Pérez García"
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
                  placeholder="usuario@greenex.com"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Contraseña <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  required
                />
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.password}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Confirmar Contraseña <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Repite la contraseña"
                  className={`input input-bordered w-full`}
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  required
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

            <div className="alert alert-info mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <div className="font-semibold">Sobre la creación de usuarios:</div>
                <ul className="list-disc list-inside text-sm mt-1">
                  <li>El usuario recibirá un correo con sus credenciales</li>
                  <li>El rol determina los permisos y accesos del usuario</li>
                  <li>Los usuarios inactivos no pueden acceder al sistema</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Crear Usuario
          </button>
          <a href="/admin/users" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
