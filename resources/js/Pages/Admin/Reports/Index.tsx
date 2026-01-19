import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/Admin/PageHeader';
import Alert from '@/components/Admin/Alert';
import DataTable from '@/components/Admin/DataTable';
import { router, useForm } from '@inertiajs/react';

interface Totals {
  users: number;
  courses: number;
  categories: number;
  learning_paths: number;
  assessments: number;
  enrollments: number;
  certificates: number;
}

interface EnrollmentStatusItem {
  status: string;
  total: number;
}

interface CourseByUser {
  id: number;
  name: string;
  email: string;
  total: number;
  active: number;
  completed: number;
}

interface CourseStats {
  id: number;
  title: string;
  category: string | null;
  status: string;
  total: number;
  completed: number;
  completion_rate: number;
}

interface CertificatesByMonth {
  month: string;
  total: number;
}

interface FilterOptionsUser {
  id: number;
  name: string;
  email: string;
}

interface FilterOptionsCourse {
  id: number;
  title: string;
  category: string | null;
}

interface FilterOptionsCategory {
  id: number;
  name: string;
}

export default function Index({
  totals,
  enrollmentStatus,
  coursesByUser,
  mostEnrolledCourses,
  certificatesByMonth,
  activeUsersLast30,
  completionRate,
  filters,
  users,
  courses,
  categories,
}: {
  totals: Totals;
  enrollmentStatus: EnrollmentStatusItem[];
  coursesByUser: CourseByUser[];
  mostEnrolledCourses: CourseStats[];
  certificatesByMonth: CertificatesByMonth[];
  activeUsersLast30: number;
  completionRate: number;
  filters: {
    user_id?: string | number | null;
    course_id?: string | number | null;
    category_id?: string | number | null;
    date_from?: string | null;
    date_to?: string | null;
  };
  users: FilterOptionsUser[];
  courses: FilterOptionsCourse[];
  categories: FilterOptionsCategory[];
}) {
  const totalEnrollmentStatus = enrollmentStatus.reduce((sum, item) => sum + item.total, 0);
  const { data, setData, reset } = useForm({
    user_id: filters.user_id ?? '',
    course_id: filters.course_id ?? '',
    category_id: filters.category_id ?? '',
    date_from: filters.date_from ?? '',
    date_to: filters.date_to ?? '',
  });

  const applyFilters = () => {
    router.get('/admin/reports', data, { preserveState: true, replace: true });
  };

  const clearFilters = () => {
    reset();
    router.get('/admin/reports', {}, { preserveState: true, replace: true });
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Reportes"
          description="Metricas generales del sistema y analisis de aprendizaje"
          breadcrumbs={[{ label: 'Admin', href: '/dashboard' }, { label: 'Reportes' }]}
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
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
                <span className="label-text">Curso</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={data.course_id}
                onChange={(event) => setData('course_id', event.target.value)}
              >
                <option value="">Todos</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                    {course.category ? ` (${course.category})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Categoria</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={data.category_id}
                onChange={(event) => setData('category_id', event.target.value)}
              >
                <option value="">Todas</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Usuarios</div>
            <div className="stat-value text-primary">{totals.users}</div>
            <div className="stat-desc">Activos ultimos 30 dias: {activeUsersLast30}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Cursos</div>
            <div className="stat-value text-secondary">{totals.courses}</div>
            <div className="stat-desc">Categorias: {totals.categories}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Inscripciones</div>
            <div className="stat-value text-accent">{totals.enrollments}</div>
            <div className="stat-desc">Tasa completado: {completionRate}%</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Certificados</div>
            <div className="stat-value text-success">{totals.certificates}</div>
            <div className="stat-desc">Evaluaciones: {totals.assessments}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Cursos por usuario</h2>
              <p className="text-sm text-base-content/60">
                Usuarios con mas cursos asignados y progreso.
              </p>
              <DataTable
                columns={[
                  { header: 'Usuario', accessor: (row: CourseByUser) => row.name },
                  { header: 'Email', accessor: (row: CourseByUser) => row.email },
                  { header: 'Total', accessor: (row: CourseByUser) => row.total },
                  { header: 'Activos', accessor: (row: CourseByUser) => row.active },
                  { header: 'Completados', accessor: (row: CourseByUser) => row.completed },
                ]}
                data={coursesByUser}
                emptyMessage="No hay datos de inscripciones."
              />
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Estado de inscripciones</h2>
              <div className="space-y-3 mt-2">
                {enrollmentStatus.map((item) => {
                  const percent =
                    totalEnrollmentStatus > 0
                      ? Math.round((item.total / totalEnrollmentStatus) * 100)
                      : 0;
                  return (
                    <div key={item.status} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize">{item.status}</span>
                        <span>{item.total}</span>
                      </div>
                      <progress
                        className="progress progress-primary w-full"
                        value={percent}
                        max={100}
                      ></progress>
                    </div>
                  );
                })}
                {enrollmentStatus.length === 0 && (
                  <div className="text-sm text-base-content/60">
                    No hay inscripciones registradas.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Cursos mas cursados</h2>
            <p className="text-sm text-base-content/60">
              Ranking de cursos con mas estudiantes y tasa de finalizacion.
            </p>
            <DataTable
              columns={[
                { header: 'Curso', accessor: (row: CourseStats) => row.title },
                { header: 'Categoria', accessor: (row: CourseStats) => row.category ?? 'Sin categoria' },
                { header: 'Estado', accessor: (row: CourseStats) => row.status },
                { header: 'Total', accessor: (row: CourseStats) => row.total },
                { header: 'Completados', accessor: (row: CourseStats) => row.completed },
                {
                  header: 'Tasa',
                  accessor: (row: CourseStats) => `${row.completion_rate}%`,
                },
              ]}
              data={mostEnrolledCourses}
              emptyMessage="No hay cursos con inscripciones."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Certificados por mes</h2>
              <p className="text-sm text-base-content/60">
                Ultimos 6 meses de emision.
              </p>
              <DataTable
                columns={[
                  { header: 'Mes', accessor: (row: CertificatesByMonth) => row.month },
                  { header: 'Total', accessor: (row: CertificatesByMonth) => row.total },
                ]}
                data={certificatesByMonth}
                emptyMessage="No hay certificados emitidos."
              />
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Resumen adicional</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Rutas de aprendizaje</span>
                  <span className="font-semibold">{totals.learning_paths}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Evaluaciones</span>
                  <span className="font-semibold">{totals.assessments}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Categorias</span>
                  <span className="font-semibold">{totals.categories}</span>
                </div>
                <div className="divider"></div>
                <div className="text-sm text-base-content/60">
                  Puedes ampliar estos reportes con filtros por fecha, categoria o instructor.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
