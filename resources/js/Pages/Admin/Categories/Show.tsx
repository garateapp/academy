import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import { Link } from '@inertiajs/react';

interface Course {
  id: number;
  title: string;
  slug: string;
  difficulty: string | null;
  duration_minutes: number | null;
  status: string;
  published_at: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
  icon: string | null;
  sort_order: number;
  courses_count: number;
  parent?: Category;
  children: Category[];
  courses: Course[];
}

function SubcategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/admin/categories/${category.id}`}
      className="card bg-base-100 border border-base-300 hover:border-primary hover:shadow-md transition-all"
    >
      <div className="card-body p-4">
        <div className="flex items-center gap-3">
          {category.icon && <span className="text-2xl">{category.icon}</span>}
          <div className="flex-1">
            <h3 className="font-semibold">{category.name}</h3>
            {category.description && (
              <p className="text-sm text-base-content/60 line-clamp-2">{category.description}</p>
            )}
          </div>
          <div className="badge badge-primary badge-outline">{category.courses_count}</div>
        </div>
      </div>
    </Link>
  );
}

export default function Show({ category }: { category: Category }) {
  const courseColumns = [
    {
      header: 'Título',
      accessor: (row: Course) => (
        <div>
          <div className="font-semibold">{row.title}</div>
          <div className="text-sm text-base-content/60 font-mono">{row.slug}</div>
        </div>
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
    },
    {
      header: 'Duración',
      accessor: (row: Course) =>
        row.duration_minutes ? `${row.duration_minutes} min` : '-',
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
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title={category.name}
          description={category.description || undefined}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Categorías', href: '/admin/categories' },
            { label: category.name },
          ]}
          actions={
            <Link href={`/admin/categories/${category.id}/edit`} className="btn btn-primary">
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
        {/* Info Card */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Información</h2>

              <div className="space-y-3">
                {category.icon && (
                  <div>
                    <div className="text-sm text-base-content/60">Icono</div>
                    <div className="text-4xl">{category.icon}</div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-base-content/60">Slug</div>
                  <div className="font-mono text-sm">{category.slug}</div>
                </div>

                {category.parent && (
                  <div>
                    <div className="text-sm text-base-content/60">Categoría Padre</div>
                    <Link
                      href={`/admin/categories/${category.parent.id}`}
                      className="link link-primary"
                    >
                      {category.parent.name}
                    </Link>
                  </div>
                )}

                <div>
                  <div className="text-sm text-base-content/60">Orden</div>
                  <div>{category.sort_order}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Cursos</div>
                  <div className="text-2xl font-bold">{category.courses_count}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Subcategorías</div>
                  <div className="text-2xl font-bold">{category.children.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories */}
        {category.children.length > 0 && (
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  Subcategorías ({category.children.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.children.map((child) => (
                    <SubcategoryCard key={child.id} category={child} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Courses Table */}
      {category.courses.length > 0 && (
        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <h2 className="card-title">Cursos en esta Categoría ({category.courses.length})</h2>

            <DataTable
              columns={courseColumns}
              data={category.courses}
              actions={(course) => (
                <Link href={`/courses/${course.id}`} className="btn btn-ghost btn-sm">
                  Ver
                </Link>
              )}
            />
          </div>
        </div>
      )}

      {/* Empty State */}
      {category.courses.length === 0 && category.children.length === 0 && (
        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body text-center py-12">
            <div className="text-base-content/60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-lg font-semibold mb-2">Esta categoría está vacía</p>
              <p>No hay cursos ni subcategorías asociadas aún.</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
