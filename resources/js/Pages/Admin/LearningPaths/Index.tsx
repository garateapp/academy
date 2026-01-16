import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { Link, router } from '@inertiajs/react';

interface LearningPath {
  id: number;
  name: string;
  description: string | null;
  status: string;
  courses_count: number;
  creator?: {
    name: string;
  };
}

interface PaginatedPaths {
  data: LearningPath[];
  current_page: number;
  last_page: number;
}

export default function Index({ paths }: { paths: PaginatedPaths }) {
  const handleDelete = (path: LearningPath) => {
    if (
      confirm(
        `Estas seguro de eliminar la ruta "${path.name}"? Esta accion no se puede deshacer.`,
      )
    ) {
      router.delete(`/admin/learning-paths/${path.id}`);
    }
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Rutas de Aprendizaje"
          description="Configura secuencias de cursos con orden y obligatoriedad"
          breadcrumbs={[{ label: 'Admin', href: '/dashboard' }, { label: 'Rutas' }]}
          actions={
            <Link href="/admin/learning-paths/create" className="btn btn-primary">
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
              Nueva Ruta
            </Link>
          }
        />
      }
    >
      <Alert />

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th className="text-center">Cursos</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paths.data.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">
                      <div className="text-base-content/60">
                        No hay rutas registradas. Crea la primera ruta.
                      </div>
                    </td>
                  </tr>
                ) : (
                  paths.data.map((path) => (
                    <tr key={path.id} className="hover">
                      <td>
                        <div className="font-semibold">{path.name}</div>
                        {path.description && (
                          <div className="text-sm text-base-content/60">{path.description}</div>
                        )}
                        {path.creator && (
                          <div className="text-xs text-base-content/50">
                            Creado por {path.creator.name}
                          </div>
                        )}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            path.status === 'active'
                              ? 'badge-success'
                              : path.status === 'archived'
                                ? 'badge-ghost'
                                : 'badge-warning'
                          }`}
                        >
                          {path.status === 'active'
                            ? 'Activa'
                            : path.status === 'archived'
                              ? 'Archivada'
                              : 'Borrador'}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="badge badge-primary badge-outline">
                          {path.courses_count}
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Link
                            href={`/admin/learning-paths/${path.id}`}
                            className="btn btn-ghost btn-sm"
                            title="Ver"
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
                            href={`/admin/learning-paths/${path.id}/edit`}
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
                            onClick={() => handleDelete(path)}
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
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {paths.last_page > 1 && (
        <div className="join mt-6">
          {Array.from({ length: paths.last_page }, (_, index) => index + 1).map((page) => (
            <Link
              key={page}
              href={`/admin/learning-paths?page=${page}`}
              className={`join-item btn ${page === paths.current_page ? 'btn-active' : ''}`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
