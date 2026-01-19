import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/Admin/PageHeader';
import DataTable from '@/components/Admin/DataTable';
import { Link, useForm } from '@inertiajs/react';

interface Permission {
  id: number;
  key: string;
  name: string;
  module: string;
}

interface Role {
  id: number;
  name: string;
  description: string | null;
  permissions: Permission[];
}

interface Course {
  id: number;
  title: string;
  slug: string;
}

interface Enrollment {
  id: number;
  course: Course;
  status: string;
  progress: number;
  enrolled_at: string;
  completed_at: string | null;
}

interface Module {
  id: number;
  title: string;
}

interface ModuleCompletion {
  id: number;
  module: Module;
  completed_at: string;
  score: number | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  area: string | null;
  position: string | null;
  status: string;
  google_id: string | null;
  avatar: string | null;
  last_login_at: string | null;
  created_at: string;
  role: Role;
  enrollments: Enrollment[];
  enrollments_count: number;
  module_completions: ModuleCompletion[];
  module_completions_count: number;
}

interface CourseOption {
  id: number;
  title: string;
}

export default function Show({ user, availableCourses }: { user: User; availableCourses: CourseOption[] }) {
  const permissionsByModule = user.role.permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.module]) {
        acc[permission.module] = [];
      }
      acc[permission.module].push(permission);
      return acc;
    },
    {} as { [key: string]: Permission[] },
  );

  const { data, setData, post, processing, errors, reset } = useForm({
    course_id: '',
    due_at: '',
    assigned_via: 'manual',
  });

  const handleEnroll = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post(`/admin/users/${user.id}/enrollments`, {
      preserveScroll: true,
      onSuccess: () => reset('course_id', 'due_at'),
    });
  };

  const enrollmentColumns = [
    {
      header: 'Curso',
      accessor: (row: Enrollment) => (
        <div>
          <div className="font-semibold">{row.course.title}</div>
          <div className="text-sm text-base-content/60 font-mono">{row.course.slug}</div>
        </div>
      ),
    },
    {
      header: 'Progreso',
      accessor: (row: Enrollment) => (
        <div className="flex items-center gap-2">
          <progress
            className="progress progress-primary w-20"
            value={row.progress}
            max="100"
          ></progress>
          <span className="text-sm">{row.progress}%</span>
        </div>
      ),
    },
    {
      header: 'Estado',
      accessor: (row: Enrollment) => (
        <div
          className={`badge ${
            row.status === 'completed'
              ? 'badge-success'
              : row.status === 'active'
                ? 'badge-primary'
                : 'badge-ghost'
          }`}
        >
          {row.status === 'completed'
            ? 'Completado'
            : row.status === 'active'
              ? 'En Progreso'
              : 'Abandonado'}
        </div>
      ),
    },
    {
      header: 'Matriculado',
      accessor: (row: Enrollment) => new Date(row.enrolled_at).toLocaleDateString(),
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title={user.name}
          description={user.email}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Usuarios', href: '/admin/users' },
            { label: user.name },
          ]}
          actions={
            <Link href={`/admin/users/${user.id}/edit`} className="btn btn-primary">
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
        {/* User Info Card */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-col items-center">
                <div className="avatar placeholder mb-4">
                  <div className="bg-neutral text-neutral-content rounded-full w-24">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <span className="text-3xl">{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                </div>

                <h2 className="card-title text-center">{user.name}</h2>
                <p className="text-sm text-base-content/60 text-center mb-4">{user.email}</p>

                <div
                  className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'} mb-4`}
                >
                  {user.status === 'active' ? 'Activo' : 'Inactivo'}
                </div>
              </div>

              <div className="divider"></div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-base-content/60">Rol</div>
                  <Link href={`/admin/roles/${user.role.id}`} className="link link-primary">
                    {user.role.name}
                  </Link>
                </div>

                {user.area && (
                  <div>
                    <div className="text-sm text-base-content/60">Área</div>
                    <div>{user.area}</div>
                  </div>
                )}

                {user.position && (
                  <div>
                    <div className="text-sm text-base-content/60">Cargo</div>
                    <div>{user.position}</div>
                  </div>
                )}

                {user.google_id && (
                  <div>
                    <div className="text-sm text-base-content/60">Google ID</div>
                    <div className="font-mono text-xs">{user.google_id}</div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-base-content/60">Último Acceso</div>
                  <div>
                    {user.last_login_at
                      ? new Date(user.last_login_at).toLocaleString()
                      : 'Nunca'}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Registrado</div>
                  <div>{new Date(user.created_at).toLocaleString()}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Matrículas</div>
                  <div className="text-2xl font-bold">{user.enrollments_count}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Módulos Completados</div>
                  <div className="text-2xl font-bold">{user.module_completions_count}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions Card */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Permisos (desde el rol {user.role.name})</h2>

              {user.role.permissions.length === 0 ? (
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

      <div className="card bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title">Asignar curso</h2>
          {availableCourses.length === 0 ? (
            <div className="text-sm text-base-content/60">
              No hay cursos disponibles para asignar.
            </div>
          ) : (
            <form className="grid grid-cols-1 gap-4 md:grid-cols-3" onSubmit={handleEnroll}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Curso</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={data.course_id}
                  onChange={(event) => setData('course_id', event.target.value)}
                >
                  <option value="">Selecciona un curso</option>
                  {availableCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                {errors.course_id && (
                  <span className="mt-2 text-xs text-error">{errors.course_id}</span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Fecha limite</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={data.due_at}
                  onChange={(event) => setData('due_at', event.target.value)}
                />
                {errors.due_at && <span className="mt-2 text-xs text-error">{errors.due_at}</span>}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Tipo de asignacion</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={data.assigned_via}
                  onChange={(event) => setData('assigned_via', event.target.value)}
                >
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatica</option>
                  <option value="self_enrollment">Autoinscripcion</option>
                </select>
                {errors.assigned_via && (
                  <span className="mt-2 text-xs text-error">{errors.assigned_via}</span>
                )}
              </div>

              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={processing || !data.course_id}
                >
                  Asignar curso
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Enrollments Table */}
      {user.enrollments.length > 0 && (
        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <h2 className="card-title">Cursos Matriculados ({user.enrollments.length})</h2>

            <DataTable
              columns={enrollmentColumns}
              data={user.enrollments}
              actions={(enrollment) => (
                <Link
                  href={`/courses/${enrollment.course.id}`}
                  className="btn btn-ghost btn-sm"
                >
                  Ver Curso
                </Link>
              )}
            />
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {user.module_completions.length > 0 && (
        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <h2 className="card-title">Actividad Reciente</h2>

            <div className="space-y-3">
              {user.module_completions.slice(0, 5).map((completion) => (
                <div
                  key={completion.id}
                  className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <div className="font-semibold">{completion.module.title}</div>
                      <div className="text-sm text-base-content/60">
                        Completado el {new Date(completion.completed_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  {completion.score !== null && (
                    <div className="badge badge-primary">{completion.score}%</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
