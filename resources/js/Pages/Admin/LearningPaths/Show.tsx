import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import { Link } from '@inertiajs/react';

interface Course {
  id: number;
  title: string;
  pivot: {
    sort_order: number;
    is_required: boolean;
  };
}

interface LearningPath {
  id: number;
  name: string;
  description: string | null;
  status: string;
  cover_image: string | null;
  courses: Course[];
  creator?: {
    name: string;
  };
}

export default function Show({ path }: { path: LearningPath }) {
  return (
    <AdminLayout
      header={
        <PageHeader
          title={path.name}
          description={path.description || undefined}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Rutas', href: '/admin/learning-paths' },
            { label: path.name },
          ]}
          actions={
            <div className="flex gap-2">
              <Link href={`/admin/learning-paths/${path.id}/edit`} className="btn btn-primary">
                Editar
              </Link>
              <Link href="/admin/learning-paths" className="btn btn-ghost">
                Volver
              </Link>
            </div>
          }
        />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body space-y-3">
            <h2 className="card-title">Detalles</h2>
            <div>
              <div className="text-sm text-base-content/60">Estado</div>
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
            </div>
            {path.creator && (
              <div>
                <div className="text-sm text-base-content/60">Creado por</div>
                <div className="font-semibold">{path.creator.name}</div>
              </div>
            )}
            {path.cover_image && (
              <div>
                <div className="text-sm text-base-content/60">Portada</div>
                <img
                  src={`/storage/${path.cover_image}`}
                  alt={path.name}
                  className="mt-2 w-full rounded-lg object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Cursos en la ruta</h2>
            {path.courses.length === 0 ? (
              <div className="text-base-content/60">No hay cursos asignados.</div>
            ) : (
              <div className="space-y-3 mt-4">
                {path.courses
                  .slice()
                  .sort((a, b) => a.pivot.sort_order - b.pivot.sort_order)
                  .map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between rounded-lg border border-base-200 p-3"
                    >
                      <div>
                        <div className="font-semibold">
                          {course.pivot.sort_order}. {course.title}
                        </div>
                        <div className="text-xs text-base-content/60">
                          {course.pivot.is_required ? 'Obligatorio' : 'Opcional'}
                        </div>
                      </div>
                      <Link
                        href={`/courses/${course.id}`}
                        className="btn btn-xs btn-outline"
                      >
                        Ver curso
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
