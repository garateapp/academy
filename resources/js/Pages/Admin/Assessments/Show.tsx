import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import { Link, router } from '@inertiajs/react';

interface Module {
  id: number;
  title: string;
  course: {
    id: number;
    title: string;
  };
}

interface Question {
  id: number;
  question_text: string;
  type: string;
  points: number;
  order: number;
  options_count: number;
}

interface Attempt {
  id: number;
  user: {
    id: number;
    name: string;
  };
  status: string;
  score: number | null;
  started_at: string;
  submitted_at: string | null;
}

interface Assessment {
  id: number;
  title: string;
  description: string | null;
  module: Module;
  type: string;
  passing_score: number;
  time_limit_minutes: number | null;
  max_attempts: number | null;
  shuffle_questions: boolean;
  shuffle_options: boolean;
  show_results: boolean;
  show_correct_answers: boolean;
  allow_review: boolean;
  questions?: Question[];
  attempts?: Attempt[];
  questions_count: number;
  attempts_count: number;
}

export default function Show({ assessment }: { assessment: Assessment }) {
  const handleDeleteQuestion = (questionId: number) => {
    if (confirm('¿Estás seguro de eliminar esta pregunta?')) {
      router.delete(`/admin/assessments/${assessment.id}/questions/${questionId}`);
    }
  };

  const questionColumns = [
    {
      header: 'Orden',
      accessor: (row: Question) => (
        <div className="badge badge-primary badge-outline">{row.order}</div>
      ),
      className: 'text-center',
    },
    {
      header: 'Pregunta',
      accessor: (row: Question) => (
        <div>
          <div className="font-medium">{row.question_text}</div>
          <div className="text-sm text-base-content/60">
            {row.options_count} opciones disponibles
          </div>
        </div>
      ),
    },
    {
      header: 'Tipo',
      accessor: (row: Question) => (
        <div
          className={`badge ${
            row.type === 'multiple_choice'
              ? 'badge-primary'
              : row.type === 'true_false'
                ? 'badge-secondary'
                : row.type === 'short_answer'
                  ? 'badge-info'
                  : 'badge-warning'
          }`}
        >
          {row.type === 'multiple_choice'
            ? 'Opción Múltiple'
            : row.type === 'true_false'
              ? 'Verdadero/Falso'
              : row.type === 'short_answer'
                ? 'Respuesta Corta'
                : 'Ensayo'}
        </div>
      ),
      className: 'text-center',
    },
    {
      header: 'Puntos',
      accessor: (row: Question) => row.points,
      className: 'text-center',
    },
  ];

  const attemptColumns = [
    {
      header: 'Estudiante',
      accessor: (row: Attempt) => row.user.name,
    },
    {
      header: 'Estado',
      accessor: (row: Attempt) => (
        <div
          className={`badge ${
            row.status === 'completed'
              ? 'badge-success'
              : row.status === 'in_progress'
                ? 'badge-warning'
                : 'badge-ghost'
          }`}
        >
          {row.status === 'completed'
            ? 'Completado'
            : row.status === 'in_progress'
              ? 'En Progreso'
              : 'Pendiente'}
        </div>
      ),
      className: 'text-center',
    },
    {
      header: 'Puntaje',
      accessor: (row: Attempt) =>
        row.score !== null ? (
          <div
            className={`badge ${row.score >= assessment.passing_score ? 'badge-success' : 'badge-error'}`}
          >
            {row.score}%
          </div>
        ) : (
          '-'
        ),
      className: 'text-center',
    },
    {
      header: 'Iniciado',
      accessor: (row: Attempt) => new Date(row.started_at).toLocaleString(),
    },
    {
      header: 'Enviado',
      accessor: (row: Attempt) =>
        row.submitted_at ? new Date(row.submitted_at).toLocaleString() : '-',
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title={assessment.title}
          description={assessment.description || undefined}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Evaluaciones', href: '/admin/assessments' },
            { label: assessment.title },
          ]}
          actions={
            <div className="flex gap-2">
              <Link
                href={`/admin/assessments/${assessment.id}/edit`}
                className="btn btn-primary"
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
                Editar
              </Link>
              <Link
                href={`/admin/assessments/${assessment.id}/questions/create`}
                className="btn btn-success"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Agregar Pregunta
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
              <h2 className="card-title">Información</h2>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-base-content/60">Módulo</div>
                  <div className="font-medium">{assessment.module.title}</div>
                  <div className="text-sm text-base-content/60">
                    {assessment.module.course.title}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Tipo</div>
                  <div
                    className={`badge ${
                      assessment.type === 'quiz'
                        ? 'badge-primary'
                        : assessment.type === 'exam'
                          ? 'badge-error'
                          : assessment.type === 'assignment'
                            ? 'badge-warning'
                            : 'badge-info'
                    }`}
                  >
                    {assessment.type === 'quiz'
                      ? 'Quiz'
                      : assessment.type === 'exam'
                        ? 'Examen'
                        : assessment.type === 'assignment'
                          ? 'Tarea'
                          : 'Encuesta'}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Puntaje de Aprobación</div>
                  <div className="text-2xl font-bold">{assessment.passing_score}%</div>
                </div>

                {assessment.time_limit_minutes && (
                  <div>
                    <div className="text-sm text-base-content/60">Tiempo Límite</div>
                    <div>{assessment.time_limit_minutes} minutos</div>
                  </div>
                )}

                {assessment.max_attempts && (
                  <div>
                    <div className="text-sm text-base-content/60">Intentos Máximos</div>
                    <div>{assessment.max_attempts}</div>
                  </div>
                )}

                <div className="divider"></div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={assessment.shuffle_questions}
                      disabled
                    />
                    <span className="text-sm">Mezclar preguntas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={assessment.shuffle_options}
                      disabled
                    />
                    <span className="text-sm">Mezclar opciones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={assessment.show_results}
                      disabled
                    />
                    <span className="text-sm">Mostrar resultados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={assessment.show_correct_answers}
                      disabled
                    />
                    <span className="text-sm">Mostrar respuestas correctas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={assessment.allow_review}
                      disabled
                    />
                    <span className="text-sm">Permitir revisión</span>
                  </div>
                </div>

                <div className="divider"></div>

                <div>
                  <div className="text-sm text-base-content/60">Preguntas</div>
                  <div className="text-2xl font-bold">{assessment.questions_count}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Intentos Totales</div>
                  <div className="text-2xl font-bold">{assessment.attempts_count}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Preguntas ({assessment.questions?.length || 0})</h2>

              {assessment.questions && assessment.questions.length > 0 ? (
                <DataTable
                  columns={questionColumns}
                  data={assessment.questions}
                  actions={(row) => (
                    <div className="flex gap-2 justify-end">
                      <Link
                        href={`/admin/assessments/${assessment.id}/questions/${row.id}/edit`}
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
                        onClick={() => handleDeleteQuestion(row.id)}
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
                    </div>
                  )}
                />
              ) : (
                <div className="text-center py-8 text-base-content/60">
                  No hay preguntas configuradas. Agrega la primera pregunta.
                </div>
              )}
            </div>
          </div>

          {assessment.attempts && assessment.attempts.length > 0 && (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  Intentos Recientes ({assessment.attempts.length})
                </h2>
                <DataTable
                  columns={attemptColumns}
                  data={assessment.attempts}
                  actions={(row) => (
                    <Link
                      href={`/admin/assessments/${assessment.id}/attempts/${row.id}`}
                      className="btn btn-ghost btn-sm"
                      title="Ver detalle"
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
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
