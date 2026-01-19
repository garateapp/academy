import AdminLayout from '@/layouts/AdminLayout';
import DataTable from '@/components/Admin/DataTable';
import PageHeader from '@/components/Admin/PageHeader';
import Alert from '@/components/Admin/Alert';
import { Link, router } from '@inertiajs/react';

interface Course {
  id: number;
  title: string;
}

interface Module {
  id: number;
  title: string;
  course: Course;
}

interface Assessment {
  id: number;
  title: string;
  type: string;
  module: Module;
  passing_score: number;
  questions_count: number;
  attempts_count: number;
}

interface PaginatedAssessments {
  data: Assessment[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function Index({ assessments }: { assessments: PaginatedAssessments }) {
  const handleDelete = (assessment: Assessment) => {
    if (assessment.attempts_count > 0) {
      alert('No se puede eliminar una evaluación que tiene intentos registrados.');
      return;
    }

    if (
      confirm(
        `¿Estás seguro de eliminar la evaluación "${assessment.title}"? Esta acción no se puede deshacer.`,
      )
    ) {
      router.delete(`/admin/assessments/${assessment.id}`);
    }
  };

  const columns = [
    {
      header: 'Evaluación',
      accessor: (row: Assessment) => (
        <div>
          <div className="font-semibold">{row.title}</div>
          <div className="text-sm text-base-content/60">
            {row.module.course.title} → {row.module.title}
          </div>
        </div>
      ),
    },
    {
      header: 'Tipo',
      accessor: (row: Assessment) => (
        <div
          className={`badge ${
            row.type === 'quiz'
              ? 'badge-primary'
              : row.type === 'exam'
                ? 'badge-error'
                : row.type === 'assignment'
                  ? 'badge-warning'
                  : 'badge-info'
          }`}
        >
          {row.type === 'quiz'
            ? 'Quiz'
            : row.type === 'exam'
              ? 'Examen'
              : row.type === 'assignment'
                ? 'Tarea'
                : 'Encuesta'}
        </div>
      ),
      className: 'text-center',
    },
    {
      header: 'Preguntas',
      accessor: (row: Assessment) => (
        <div className="badge badge-secondary badge-outline">{row.questions_count}</div>
      ),
      className: 'text-center',
    },
    {
      header: 'Aprobación',
      accessor: (row: Assessment) => `${row.passing_score}%`,
      className: 'text-center',
    },
    {
      header: 'Intentos',
      accessor: (row: Assessment) => (
        <div className="badge badge-primary badge-outline">{row.attempts_count}</div>
      ),
      className: 'text-center',
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Evaluaciones"
          description="Gestiona las evaluaciones del sistema"
          breadcrumbs={[{ label: 'Admin', href: '/dashboard' }, { label: 'Evaluaciones' }]}
          actions={
            <Link href="/admin/assessments/create" className="btn btn-primary">
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
              Nueva Evaluación
            </Link>
          }
        />
      }
    >
      <Alert />

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <DataTable
            columns={columns}
            data={assessments.data}
            actions={(row) => (
              <div className="flex gap-2 justify-end">
                <Link
                  href={`/admin/assessments/${row.id}`}
                  className="btn btn-ghost btn-sm"
                  title="Ver detalles"
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

                <Link
                  href={`/admin/assessments/${row.id}/edit`}
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

                <Link
                  href={`/admin/assessments/${row.id}/questions/create`}
                  className="btn btn-ghost btn-sm text-success"
                  title="Agregar pregunta"
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
                </Link>

                <button
                  onClick={() => handleDelete(row)}
                  className="btn btn-ghost btn-sm text-error"
                  title="Eliminar"
                  disabled={row.attempts_count > 0}
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
            emptyMessage="No hay evaluaciones registradas. Crea la primera evaluación."
          />
        </div>
      </div>

      {/* Pagination */}
      {assessments.last_page > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join">
            {Array.from({ length: assessments.last_page }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/admin/assessments?page=${page}`}
                className={`join-item btn ${page === assessments.current_page ? 'btn-active' : ''}`}
              >
                {page}
              </Link>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
