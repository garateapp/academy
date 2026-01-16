import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
  email: string;
  role?: {
    id: number;
    name: string;
  };
}

interface Stats {
  total_users?: number;
  total_courses?: number;
  total_assessments?: number;
  total_certificates?: number;
  active_enrollments?: number;
  my_courses?: number;
  my_certificates?: number;
  pending_assessments?: number;
  completed_courses?: number;
}

interface RecentActivity {
  id: number;
  description: string;
  created_at: string;
}

interface LearnerEnrollment {
  id: number;
  status: string;
  due_at: string | null;
  started_at: string | null;
  completed_at?: string | null;
  progress: number;
  required_modules: number;
  completed_modules: number;
  course: {
    id: number;
    title: string;
    category: string | null;
    cover_image?: string | null;
    duration_minutes: number | null;
    status: string | null;
  };
}

interface LearnerCertificate {
  id: number;
  issued_at: string | null;
  certificate_number: string;
  course: {
    id: number | null;
    title: string | null;
  };
}

interface LearnerLearningPath {
  id: number;
  name: string;
  description: string | null;
  courses_count: number;
  duration_minutes: number;
}

interface LearnerCategory {
  name: string;
  total: number;
}

export default function Dashboard({
  stats,
  recentActivities,
  learner,
}: {
  stats: Stats;
  recentActivities?: RecentActivity[];
  learner?: {
    active_enrollments: LearnerEnrollment[];
    completed_enrollments: LearnerEnrollment[];
    recent_certificates: LearnerCertificate[];
    learning_paths: LearnerLearningPath[];
    top_categories: LearnerCategory[];
    completion_rate: number;
  } | null;
}) {
  const { auth } = usePage().props as { auth: { user: User } };
  const roleName = auth.user.role?.name?.toLowerCase() || '';
  const isAdmin = roleName === 'superadmin' || roleName === 'admin';

  const renderLearnerDashboard = () => {
    if (!learner) {
      return (
        <div className="bg-base-100 shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold">Bienvenido, {auth.user.name}!</h1>
          <p className="text-base-content/70 mt-2">
            Tu panel de aprendizaje en Greenex Academy.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-green-50 via-white to-orange-50 border border-green-100 shadow-sm rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Hola, {auth.user.name}</h1>
              <p className="text-base-content/70 mt-2 max-w-xl">
                Visualiza tu avance, tus proximos cursos y el crecimiento de tu carrera.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="stat bg-base-100 shadow rounded-xl">
                <div className="stat-title">Cursos activos</div>
                <div className="stat-value text-primary">{stats.my_courses || 0}</div>
                <div className="stat-desc">En progreso</div>
              </div>
              <div className="stat bg-base-100 shadow rounded-xl">
                <div className="stat-title">Completados</div>
                <div className="stat-value text-secondary">
                  {stats.completed_courses || 0}
                </div>
                <div className="stat-desc">Tasa: {learner.completion_rate}%</div>
              </div>
              <div className="stat bg-base-100 shadow rounded-xl">
                <div className="stat-title">Certificados</div>
                <div className="stat-value text-success">{stats.my_certificates || 0}</div>
                <div className="stat-desc">Logros obtenidos</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="card-title">Cursos en progreso</h2>
                    <p className="text-sm text-base-content/60">
                      Continua donde lo dejaste y mantente al dia.
                    </p>
                  </div>
                  <Link href="/courses" className="btn btn-outline btn-sm">
                    Explorar cursos
                  </Link>
                </div>

                {learner.active_enrollments.length === 0 ? (
                  <div className="text-sm text-base-content/60 mt-4">
                    No tienes cursos activos por ahora.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {learner.active_enrollments.map((enrollment) => {
                      const coverImage = enrollment.course.cover_image || '';
                      const coverSrc = coverImage
                        ? coverImage.startsWith('http')
                          ? coverImage
                          : coverImage.startsWith('storage/')
                            ? `/${coverImage}`
                            : `/storage/${coverImage}`
                        : null;

                      return (
                        <div
                          key={enrollment.id}
                          className="border border-base-200 rounded-2xl overflow-hidden bg-base-100 shadow-sm"
                        >
                          <div className="relative h-40 bg-base-200">
                            {coverSrc ? (
                              <img
                                src={coverSrc}
                                alt={enrollment.course.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-sm text-base-content/60">
                                Sin portada
                              </div>
                            )}
                            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                              <span className="badge badge-outline bg-base-100/90">
                                {enrollment.course.category ?? 'Sin categoria'}
                              </span>
                              <span className="badge badge-outline bg-base-100/90">
                                {enrollment.progress}%
                              </span>
                            </div>
                          </div>
                          <div className="p-4 space-y-3">
                            <div>
                              <h3 className="font-semibold">{enrollment.course.title}</h3>
                              <div className="text-xs text-base-content/60">
                                {enrollment.completed_modules}/{enrollment.required_modules}{' '}
                                modulos requeridos
                              </div>
                              <div className="text-xs font-semibold text-primary">
                                Avance: {enrollment.progress}%
                              </div>
                            </div>
                            <progress
                              className="progress progress-primary w-full"
                              value={enrollment.progress}
                              max={100}
                            ></progress>
                            <div className="flex items-center justify-between text-xs text-base-content/60">
                              <span>
                                {enrollment.due_at
                                  ? `Vence: ${new Date(enrollment.due_at).toLocaleDateString()}`
                                  : 'Sin fecha limite'}
                              </span>
                              <span>
                                {enrollment.course.duration_minutes
                                  ? `${enrollment.course.duration_minutes} min`
                                  : 'Duracion N/A'}
                              </span>
                            </div>
                            {enrollment.course.id ? (
                              <Link
                                href={`/courses/${enrollment.course.id}`}
                                className="btn btn-primary btn-sm w-full"
                              >
                                Continuar curso
                              </Link>
                            ) : (
                              <button className="btn btn-primary btn-sm w-full" disabled>
                                Continuar curso
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Cursos completados</h2>
                {learner.completed_enrollments.length === 0 ? (
                  <div className="text-sm text-base-content/60 mt-2">
                    Completa un curso para ver tu historial.
                  </div>
                ) : (
                  <div className="divide-y divide-base-200 mt-2">
                    {learner.completed_enrollments.map((enrollment) => (
                      <div key={enrollment.id} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{enrollment.course.title}</div>
                          <div className="text-xs text-base-content/60">
                            Completado el{' '}
                            {enrollment.completed_at
                              ? new Date(enrollment.completed_at).toLocaleDateString()
                              : '-'}
                          </div>
                        </div>
                        <span className="badge badge-success badge-outline">Finalizado</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title">Crecimiento de carrera</h2>
                  <span className="badge badge-outline">Rutas</span>
                </div>
                <div className="space-y-3 mt-2">
                  {learner.learning_paths.length === 0 ? (
                    <div className="text-sm text-base-content/60">
                      No hay rutas activas por ahora.
                    </div>
                  ) : (
                    learner.learning_paths.map((path) => (
                      <div key={path.id} className="border border-base-200 rounded-lg p-3">
                        <div className="font-semibold">{path.name}</div>
                        {path.description && (
                          <div className="text-xs text-base-content/60 mt-1">
                            {path.description}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-xs text-base-content/60 mt-2">
                          <span>{path.courses_count} cursos</span>
                          <span>{path.duration_minutes} min</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title">Categorias donde avanzas</h2>
                  <span className="badge badge-outline">Top</span>
                </div>
                <div className="space-y-3 mt-2">
                  {learner.top_categories.length === 0 ? (
                    <div className="text-sm text-base-content/60">
                      Sin datos de categorias todavia.
                    </div>
                  ) : (
                    learner.top_categories.map((category) => (
                      <div key={category.name} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{category.name}</span>
                          <span className="text-base-content/60">{category.total}</span>
                        </div>
                        <progress
                          className="progress progress-secondary w-full"
                          value={category.total}
                          max={learner.top_categories[0]?.total || category.total}
                        ></progress>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title">Certificados recientes</h2>
                  <Link href="/my-certificates" className="btn btn-ghost btn-xs">
                    Ver todos
                  </Link>
                </div>
                <div className="space-y-3 mt-2">
                  {learner.recent_certificates.length === 0 ? (
                    <div className="text-sm text-base-content/60">
                      Aun no tienes certificados.
                    </div>
                  ) : (
                    learner.recent_certificates.map((certificate) => (
                      <div key={certificate.id} className="border border-base-200 rounded-lg p-3">
                        <div className="font-medium">
                          {certificate.course.title ?? 'Certificado'}
                        </div>
                        <div className="text-xs text-base-content/60">
                          {certificate.issued_at
                            ? new Date(certificate.issued_at).toLocaleDateString()
                            : '-'}{' '}
                          · {certificate.certificate_number}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <Head title="Dashboard" />

      {isAdmin ? (
        <div className="space-y-6">
          <div className="bg-base-100 shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold">Bienvenido, {auth.user.name}!</h1>
            <p className="text-base-content/70 mt-2">
              Panel de administracion de Greenex Academy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stat bg-base-100 shadow rounded-lg">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="stat-title">Usuarios Totales</div>
              <div className="stat-value text-primary">{stats.total_users || 0}</div>
              <div className="stat-desc">Registrados en el sistema</div>
            </div>

            <div className="stat bg-base-100 shadow rounded-lg">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="stat-title">Cursos</div>
              <div className="stat-value text-secondary">{stats.total_courses || 0}</div>
              <div className="stat-desc">
                <Link href="/courses" className="link link-hover">
                  Ver todos
                </Link>
              </div>
            </div>

            <div className="stat bg-base-100 shadow rounded-lg">
              <div className="stat-figure text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div className="stat-title">Evaluaciones</div>
              <div className="stat-value text-accent">{stats.total_assessments || 0}</div>
              <div className="stat-desc">
                <Link href="/admin/assessments" className="link link-hover">
                  Gestionar
                </Link>
              </div>
            </div>

            <div className="stat bg-base-100 shadow rounded-lg">
              <div className="stat-figure text-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div className="stat-title">Certificados</div>
              <div className="stat-value text-success">{stats.total_certificates || 0}</div>
              <div className="stat-desc">Emitidos</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/users"
              className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
            >
              <div className="card-body">
                <h2 className="card-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Gestionar Usuarios
                </h2>
                <p>Administra usuarios, roles y permisos</p>
              </div>
            </Link>

            <Link
              href="/courses"
              className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
            >
              <div className="card-body">
                <h2 className="card-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Gestionar Cursos
                </h2>
                <p>Crea y administra cursos y modulos</p>
              </div>
            </Link>

            <Link
              href="/admin/assessments"
              className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
            >
              <div className="card-body">
                <h2 className="card-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Evaluaciones
                </h2>
                <p>Administra evaluaciones y preguntas</p>
              </div>
            </Link>
          </div>

          {isAdmin && recentActivities && recentActivities.length > 0 && (
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Actividad Reciente</h2>
                <div className="overflow-x-auto">
                  <table className="table">
                    <tbody>
                      {recentActivities.slice(0, 5).map((activity) => (
                        <tr key={activity.id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-8">
                                  <span className="text-xs">AI</span>
                                </div>
                              </div>
                              <div>
                                <div className="font-medium">{activity.description}</div>
                                <div className="text-sm opacity-50">
                                  {new Date(activity.created_at).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        renderLearnerDashboard()
      )}
    </AdminLayout>
  );
}
