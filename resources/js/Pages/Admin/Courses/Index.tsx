import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/Admin/DataTable';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { Link, router } from '@inertiajs/react';

interface Category {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
  slug: string;
  category: Category;
  difficulty: string | null;
  status: string;
  published_at: string | null;
  creator: User;
  updater: User | null;
  enrollments_count: number;
}

interface PaginatedCourses {
  data: Course[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function Index({ courses }: { courses: PaginatedCourses }) {
  const handleDelete = (course: Course) => {
    if (
      confirm(
        `¿Estás seguro de eliminar el curso "${course.title}"? Esta acción no se puede deshacer.`,
      )
    ) {
      router.delete(`/courses/${course.id}`);
    }
  };

  const handlePublish = (course: Course) => {
    router.post(`/courses/${course.id}/publish`);
  };

  const handleUnpublish = (course: Course) => {
    router.post(`/courses/${course.id}/unpublish`);
  };

  const handleArchive = (course: Course) => {
    if (confirm(`¿Deseas archivar el curso "${course.title}"?`)) {
      router.post(`/courses/${course.id}/archive`);
    }
  };

  const columns = [
    {
      header: 'Curso',
      accessor: (row: Course) => (
        <div>
          <div className="font-semibold">{row.title}</div>
          <div className="text-sm text-base-content/60 font-mono">{row.slug}</div>
        </div>
      ),
    },
    {
      header: 'Categoría',
      accessor: (row: Course) => (
        <div className="badge badge-secondary badge-outline">{row.category.name}</div>
      ),
    },
    {
      header: 'Dificultad',
      accessor: (row: Course) =>
        row.difficulty ? (
          <div
            className={`badge ${
              row.difficulty === 'beginner'
                ? 'badge-success'
                : row.difficulty === 'intermediate'
                  ? 'badge-warning'
                  : 'badge-error'
            }`}
          >
            {row.difficulty === 'beginner'
              ? 'Principiante'
              : row.difficulty === 'intermediate'
                ? 'Intermedio'
                : 'Avanzado'}
          </div>
        ) : (
          '-'
        ),
      className: 'text-center',
    },
    {
      header: 'Estado',
      accessor: (row: Course) => (
        <div
          className={`badge ${
            row.status === 'published'
              ? 'badge-success'
              : row.status === 'draft'
                ? 'badge-warning'
                : 'badge-ghost'
          }`}
        >
          {row.status === 'published'
            ? 'Publicado'
            : row.status === 'draft'
              ? 'Borrador'
              : 'Archivado'}
        </div>
      ),
      className: 'text-center',
    },
    {
      header: 'Estudiantes',
      accessor: (row: Course) => (
        <div className="badge badge-primary badge-outline">{row.enrollments_count}</div>
      ),
      className: 'text-center',
    },
    {
      header: 'Creado por',
      accessor: (row: Course) => row.creator.name,
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Cursos"
          description="Gestiona los cursos del sistema"
          breadcrumbs={[{ label: 'Admin', href: '/dashboard' }, { label: 'Cursos' }]}
          actions={
            <Link href="/courses/create" className="btn btn-primary">
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
              Nuevo Curso
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
            data={courses.data}
            actions={(row) => (
              <div className="flex gap-2 justify-end">
                <Link
                  href={`/courses/${row.id}`}
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
                  href={`/courses/${row.id}/edit`}
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

                {row.status === 'draft' && (
                  <button
                    onClick={() => handlePublish(row)}
                    className="btn btn-ghost btn-sm text-success"
                    title="Publicar"
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                )}

                {row.status === 'published' && (
                  <button
                    onClick={() => handleUnpublish(row)}
                    className="btn btn-ghost btn-sm text-warning"
                    title="Despublicar"
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
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                )}

                {row.status !== 'archived' && (
                  <button
                    onClick={() => handleArchive(row)}
                    className="btn btn-ghost btn-sm"
                    title="Archivar"
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
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                  </button>
                )}

                <button
                  onClick={() => handleDelete(row)}
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
            emptyMessage="No hay cursos registrados. Crea el primer curso."
          />
        </div>
      </div>

      {/* Pagination */}
      {courses.last_page > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join">
            {Array.from({ length: courses.last_page }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/courses?page=${page}`}
                className={`join-item btn ${page === courses.current_page ? 'btn-active' : ''}`}
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
