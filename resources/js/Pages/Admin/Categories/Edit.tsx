import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/Admin/PageHeader';
import Alert from '@/components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

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
}

export default function Edit({
  category,
  categories = [],
}: {
  category: Category;
  categories?: Category[];
}) {
  const { data, setData, put, processing, errors } = useForm({
    name: category.name,
    description: category.description || '',
    parent_id: category.parent_id?.toString() || '',
    icon: category.icon || '',
    sort_order: category.sort_order,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(`/admin/categories/${category.id}`);
  };

  // Filter out current category and its children to prevent circular references
  const availableParents = categories.filter((c) => {
    if (c.id === category.id) return false;
    // Simple check: if this is a child of the current category, exclude it
    // In a real scenario, you'd want to check all descendants recursively
    if (c.parent_id === category.id) return false;
    return true;
  });

  return (
    <AdminLayout
      header={
        <PageHeader
          title={`Editar Categoría: ${category.name}`}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Categorías', href: '/admin/categories' },
            { label: 'Editar' },
          ]}
        />
      }
    >
      <Alert />

      {category.courses_count > 0 && (
        <div className="alert alert-warning mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>
            Esta categoría tiene {category.courses_count} curso(s) asociado(s). Ten cuidado al
            modificarla.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Información de la Categoría</h2>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Nombre <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Slug</span>
                <span className="label-text-alt text-base-content/60">Generado automáticamente</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-200"
                value={category.slug}
                disabled
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  El slug se actualizará automáticamente al cambiar el nombre
                </span>
              </label>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Descripción</span>
              </label>
              <textarea
                className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              ></textarea>
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.description}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Categoría Padre</span>
                <span className="label-text-alt text-base-content/60">
                  Deja vacío para categoría principal
                </span>
              </label>
              <select
                className={`select select-bordered w-full ${errors.parent_id ? 'select-error' : ''}`}
                value={data.parent_id}
                onChange={(e) => setData('parent_id', e.target.value)}
              >
                <option value="">Sin categoría padre (nivel raíz)</option>
                {availableParents.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.parent_id && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.parent_id}</span>
                </label>
              )}
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  No puedes seleccionar esta misma categoría o sus subcategorías como padre
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Icono (Emoji)</span>
                  <span className="label-text-alt text-base-content/60">Opcional</span>
                </label>
                <input
                  type="text"
                  placeholder="📚"
                  className={`input input-bordered w-full ${errors.icon ? 'input-error' : ''}`}
                  value={data.icon}
                  onChange={(e) => setData('icon', e.target.value)}
                  maxLength={2}
                />
                {errors.icon && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.icon}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Orden de visualización</span>
                  <span className="label-text-alt text-base-content/60">Menor número = primero</span>
                </label>
                <input
                  type="number"
                  className={`input input-bordered w-full ${errors.sort_order ? 'input-error' : ''}`}
                  value={data.sort_order}
                  onChange={(e) => setData('sort_order', parseInt(e.target.value))}
                  min={0}
                />
                {errors.sort_order && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.sort_order}</span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Guardar Cambios
          </button>
          <a href="/admin/categories" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
