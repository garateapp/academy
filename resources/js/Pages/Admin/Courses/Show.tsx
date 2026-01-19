import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/Admin/PageHeader';
import DataTable from '@/components/Admin/DataTable';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Category {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email?: string;
}

interface Module {
  id: number;
  title: string;
  order: number;
}

interface Prerequisite {
  id: number;
  title: string;
}

interface Enrollment {
  id: number;
  user: User;
  status: string;
  progress: number;
  enrolled_at: string;
}

interface AttendanceRecord {
  id: number;
  status: string;
  recorded_at: string | null;
  user: User;
}

interface AttendanceSession {
  id: number;
  title: string;
  session_date: string;
  location: string | null;
  notes: string | null;
  roster_path: string | null;
  roster_hash: string | null;
  records: AttendanceRecord[];
}

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category: Category;
  cover_image: string | null;
  duration_minutes: number | null;
  difficulty: string | null;
  status: string;
  valid_from: string | null;
  valid_until: string | null;
  published_at: string | null;
  allow_self_enrollment?: boolean;
  creator: User;
  updater: User | null;
  prerequisites: Prerequisite[];
  modules: Module[];
  enrollments: Enrollment[];
  modules_count: number;
  enrollments_count: number;
}

interface AvailableUser {
  id: number;
  name: string;
  email: string;
}

export default function Show({
  course,
  availableUsers,
  attendanceSessions,
}: {
  course: Course;
  availableUsers: AvailableUser[];
  attendanceSessions: AttendanceSession[];
}) {
  const coverUrl = course.cover_image
    ? course.cover_image.startsWith('http')
      ? course.cover_image
      : course.cover_image.startsWith('storage/')
        ? `/${course.cover_image}`
        : `/storage/${course.cover_image}`
    : null;
  const { data, setData, post, processing, errors, reset } = useForm({
    user_ids: [] as number[],
    due_at: '',
    assigned_via: 'manual',
  });

  const {
    data: sessionData,
    setData: setSessionData,
    post: postSession,
    processing: sessionProcessing,
    errors: sessionErrors,
    reset: resetSession,
  } = useForm({
    title: '',
    session_date: '',
    location: '',
    notes: '',
  });

  const toggleUser = (userId: number) => {
    setData(
      'user_ids',
      data.user_ids.includes(userId)
        ? data.user_ids.filter((id) => id !== userId)
        : [...data.user_ids, userId],
    );
  };

  const handleEnroll = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post(`/courses/${course.id}/enrollments`, {
      preserveScroll: true,
      onSuccess: () => reset('user_ids', 'due_at'),
    });
  };

  const handleSessionSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    postSession(`/courses/${course.id}/attendance-sessions`, {
      preserveScroll: true,
      onSuccess: () => resetSession('title', 'session_date', 'location', 'notes'),
    });
  };

  const enrollmentColumns = [
    {
      header: 'Estudiante',
      accessor: (row: Enrollment) => row.user.name,
    },
    {
      header: 'Progreso',
      accessor: (row: Enrollment) => (
        <div className="flex items-center gap-2">
          <progress
            className="progress progress-primary w-24"
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
          title={course.title}
          description={course.description || undefined}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Cursos', href: '/courses' },
            { label: course.title },
          ]}
          actions={
            <div className="flex gap-2">
              <Link href={`/courses/${course.id}/edit`} className="btn btn-primary">
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
            </div>
          }
        />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {coverUrl && (
                <figure className="mb-4">
                  <img
                    src={coverUrl}
                    alt={course.title}
                    className="rounded-lg w-full"
                  />
                </figure>
              )}

              <h2 className="card-title">Informacion</h2>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-base-content/60">Slug</div>
                  <div className="font-mono text-sm">{course.slug}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Categoria</div>
                  <Link
                    href={`/admin/categories/${course.category.id}`}
                    className="link link-primary"
                  >
                    {course.category.name}
                  </Link>
                </div>

                {course.difficulty && (
                  <div>
                    <div className="text-sm text-base-content/60">Dificultad</div>
                    <div
                      className={`badge ${
                        course.difficulty === 'beginner'
                          ? 'badge-success'
                          : course.difficulty === 'intermediate'
                            ? 'badge-warning'
                            : 'badge-error'
                      }`}
                    >
                      {course.difficulty === 'beginner'
                        ? 'Principiante'
                        : course.difficulty === 'intermediate'
                          ? 'Intermedio'
                          : 'Avanzado'}
                    </div>
                  </div>
                )}

                {course.duration_minutes && (
                  <div>
                    <div className="text-sm text-base-content/60">Duracion</div>
                    <div>{Math.round(course.duration_minutes / 60)} horas</div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-base-content/60">Estado</div>
                  <div
                    className={`badge ${
                      course.status === 'published'
                        ? 'badge-success'
                        : course.status === 'draft'
                          ? 'badge-warning'
                          : 'badge-ghost'
                    }`}
                  >
                    {course.status === 'published'
                      ? 'Publicado'
                      : course.status === 'draft'
                        ? 'Borrador'
                        : 'Archivado'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-base-content/60">Autoinscripcion</div>
                  <div
                    className={`badge ${course.allow_self_enrollment ? 'badge-success' : 'badge-ghost'}`}
                  >
                    {course.allow_self_enrollment ? 'Permitida' : 'No permitida'}
                  </div>
                </div>

                {course.published_at && (
                  <div>
                    <div className="text-sm text-base-content/60">Publicado</div>
                    <div>{new Date(course.published_at).toLocaleDateString()}</div>
                  </div>
                )}

                {course.valid_from && (
                  <div>
                    <div className="text-sm text-base-content/60">Vigencia</div>
                    <div className="text-sm">
                      {new Date(course.valid_from).toLocaleDateString()}
                      {course.valid_until && (
                        <> - {new Date(course.valid_until).toLocaleDateString()}</>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-base-content/60">Creado por</div>
                  <div>{course.creator.name}</div>
                </div>

                {course.updater && (
                  <div>
                    <div className="text-sm text-base-content/60">Actualizado por</div>
                    <div>{course.updater.name}</div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-base-content/60">Modulos</div>
                  <div className="text-2xl font-bold">{course.modules_count}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Estudiantes</div>
                  <div className="text-2xl font-bold">{course.enrollments_count}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Asignar a alumnos</h2>
              {availableUsers.length === 0 ? (
                <div className="text-sm text-base-content/60">
                  No hay alumnos disponibles para asignar.
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleEnroll}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                      {errors.due_at && (
                        <span className="mt-2 text-xs text-error">{errors.due_at}</span>
                      )}
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
                  </div>

                  <div className="rounded-lg border border-base-300 bg-base-200 p-4">
                    <div className="text-sm font-semibold">Selecciona alumnos</div>
                    <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-2">
                      {availableUsers.map((user) => (
                        <label
                          key={user.id}
                          className="flex cursor-pointer items-start gap-3 rounded-lg bg-base-100 p-3 hover:bg-base-200"
                        >
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary mt-1"
                            checked={data.user_ids.includes(user.id)}
                            onChange={() => toggleUser(user.id)}
                          />
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-base-content/60">{user.email}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.user_ids && (
                      <span className="mt-3 block text-xs text-error">{errors.user_ids}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={processing || data.user_ids.length === 0}
                  >
                    Asignar alumnos
                  </button>
                </form>
              )}
            </div>
          </div>

          {course.prerequisites.length > 0 && (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Prerequisitos</h2>
                <p className="text-sm text-base-content/60">
                  Los siguientes cursos deben completarse antes de este:
                </p>

                <div className="space-y-2">
                  {course.prerequisites.map((prereq) => (
                    <Link
                      key={prereq.id}
                      href={`/courses/${prereq.id}`}
                      className="flex items-center gap-2 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
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
                      <span>{prereq.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Modulos del Curso ({course.modules.length})</h2>

              {course.modules.length > 0 ? (
                <div className="space-y-2">
                  {course.modules.map((module) => (
                    <div
                      key={module.id}
                      className="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
                    >
                      <div className="badge badge-primary badge-outline">{module.order}</div>
                      <span className="font-medium">{module.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-base-content/60">
                  Este curso no tiene modulos configurados aun.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Nueva sesion presencial</h2>
            <form className="space-y-4" onSubmit={handleSessionSubmit}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Titulo *</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${sessionErrors.title ? 'input-error' : ''}`}
                  value={sessionData.title}
                  onChange={(event) => setSessionData('title', event.target.value)}
                  placeholder="Ej: Jornada presencial 1"
                  required
                />
                {sessionErrors.title && (
                  <span className="text-xs text-error">{sessionErrors.title}</span>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Fecha *</span>
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full ${sessionErrors.session_date ? 'input-error' : ''}`}
                  value={sessionData.session_date}
                  onChange={(event) => setSessionData('session_date', event.target.value)}
                  required
                />
                {sessionErrors.session_date && (
                  <span className="text-xs text-error">{sessionErrors.session_date}</span>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Lugar</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={sessionData.location}
                  onChange={(event) => setSessionData('location', event.target.value)}
                  placeholder="Ej: Sala principal"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Notas</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-20"
                  value={sessionData.notes}
                  onChange={(event) => setSessionData('notes', event.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={sessionProcessing}>
                {sessionProcessing && <span className="loading loading-spinner"></span>}
                Crear sesion
              </button>
            </form>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Sesiones registradas</h2>
            {attendanceSessions.length === 0 ? (
              <div className="text-sm text-base-content/60">
                Aun no hay sesiones presenciales registradas.
              </div>
            ) : (
              <div className="space-y-4">
                {attendanceSessions.map((session) => (
                  <AttendanceSessionCard
                    key={session.id}
                    session={session}
                    courseId={course.id}
                    enrollments={course.enrollments}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {course.enrollments.length > 0 && (
        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <h2 className="card-title">
              Estudiantes Matriculados ({course.enrollments.length})
            </h2>

            <DataTable columns={enrollmentColumns} data={course.enrollments} />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function AttendanceSessionCard({
  session,
  courseId,
  enrollments,
}: {
  session: AttendanceSession;
  courseId: number;
  enrollments: Enrollment[];
}) {
  const presentIds = session.records
    .filter((record) => record.status === 'present')
    .map((record) => record.user.id);

  const {
    data,
    setData,
    post,
    processing,
  } = useForm({
    present_user_ids: presentIds as number[],
  });

  const rosterForm = useForm({
    roster: null as File | null,
  });

  const handleRosterSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    rosterForm.post(`/courses/${courseId}/attendance-sessions/${session.id}/roster`, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => rosterForm.reset('roster'),
    });
  };

  const handleRecordsSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    post(`/courses/${courseId}/attendance-sessions/${session.id}/records`, {
      preserveScroll: true,
    });
  };

  const togglePresent = (userId: number) => {
    const current = data.present_user_ids;
    setData(
      'present_user_ids',
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId],
    );
  };

  return (
    <div className="rounded-xl border border-base-200 p-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="font-semibold">{session.title}</div>
          <div className="text-sm text-base-content/60">
            {new Date(session.session_date).toLocaleDateString()}
            {session.location ? ` | ${session.location}` : ''}
          </div>
          {session.notes && (
            <div className="text-xs text-base-content/60 mt-1">{session.notes}</div>
          )}
        </div>
        <div className="text-sm text-base-content/60">
          Presentes: {presentIds.length} / {enrollments.length}
        </div>
      </div>

      <form className="space-y-2" onSubmit={handleRosterSubmit}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Planilla firmada (PDF o imagen)</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept=".pdf,image/*"
            onChange={(event) => rosterForm.setData('roster', event.target.files?.[0] || null)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline"
          disabled={rosterForm.processing || !rosterForm.data.roster}
        >
          {rosterForm.processing && <span className="loading loading-spinner"></span>}
          Subir planilla
        </button>
        {session.roster_path && (
          <div className="text-xs text-base-content/60">
            <a
              href={`/storage/${session.roster_path}`}
              className="link link-primary"
              target="_blank"
              rel="noreferrer"
            >
              Ver planilla cargada
            </a>
            {session.roster_hash && (
              <div>Hash: {session.roster_hash.slice(0, 12)}...</div>
            )}
          </div>
        )}
      </form>

      <form className="space-y-3" onSubmit={handleRecordsSubmit}>
        <div className="text-sm font-semibold">Marcar asistencia</div>
        <div className="max-h-56 overflow-y-auto rounded-lg border border-base-200 p-3 space-y-2">
          {enrollments.map((enrollment) => (
            <label
              key={enrollment.user.id}
              className="flex items-center gap-3 text-sm"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                checked={data.present_user_ids.includes(enrollment.user.id)}
                onChange={() => togglePresent(enrollment.user.id)}
              />
              <span>{enrollment.user.name}</span>
              {enrollment.user.email && (
                <span className="text-xs text-base-content/60">{enrollment.user.email}</span>
              )}
            </label>
          ))}
        </div>
        <button type="submit" className="btn btn-primary" disabled={processing}>
          {processing && <span className="loading loading-spinner"></span>}
          Guardar asistencia
        </button>
      </form>
    </div>
  );
}
