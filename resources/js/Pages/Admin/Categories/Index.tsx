import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { Link, router } from '@inertiajs/react';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
  icon: string | null;
  sort_order: number;
  courses_count: number;
  children?: Category[];
  tree_children?: Category[];
}

function CategoryRow({
  category,
  level = 0,
  onDelete,
}: {
  category: Category;
  level?: number;
  onDelete: (category: Category) => void;
}) {
  return (
    <>
      <tr className="hover">
        <td>
          <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 2}rem` }}>
            {level > 0 && <span className="text-base-content/40">└─</span>}
            {category.icon && <span className="text-xl">{category.icon}</span>}
            <div>
              <div className="font-semibold">{category.name}</div>
              {category.description && (
                <div className="text-sm text-base-content/60">{category.description}</div>
              )}
            </div>
          </div>
        </td>
        <td className="font-mono text-sm">{category.slug}</td>
        <td className="text-center">
          <div className="badge badge-primary badge-outline">{category.courses_count}</div>
        </td>
        <td className="text-right">
          <div className="flex gap-2 justify-end">
            <Link
              href={`/admin/categories/${category.id}`}
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
              href={`/admin/categories/${category.id}/edit`}
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
              onClick={() => onDelete(category)}
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

      {/* Render children */}
      {category.tree_children?.map((child) => (
        <CategoryRow key={child.id} category={child} level={level + 1} onDelete={onDelete} />
      ))}
    </>
  );
}

export default function Index({ tree }: { tree: Category[] }) {
  const handleDelete = (category: Category) => {
    if (category.courses_count > 0) {
      alert('No se puede eliminar una categoría que tiene cursos asociados.');
      return;
    }

    if (
      confirm(
        `¿Estás seguro de eliminar la categoría "${category.name}"? Esta acción no se puede deshacer.`,
      )
    ) {
      router.delete(`/admin/categories/${category.id}`);
    }
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Categorías"
          description="Organiza los cursos en categorías jerárquicas"
          breadcrumbs={[{ label: 'Admin', href: '/dashboard' }, { label: 'Categorías' }]}
          actions={
            <Link href="/admin/categories/create" className="btn btn-primary">
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
              Nueva Categoría
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
                  <th>Slug</th>
                  <th className="text-center">Cursos</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tree.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">
                      <div className="text-base-content/60">
                        No hay categorías registradas. Crea la primera categoría.
                      </div>
                    </td>
                  </tr>
                ) : (
                  tree.map((category) => (
                    <CategoryRow
                      key={category.id}
                      category={category}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="alert alert-info mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          Las categorías se muestran en forma de árbol. Las subcategorías aparecen indentadas
          bajo su categoría padre.
        </span>
      </div>
    </AdminLayout>
  );
}
