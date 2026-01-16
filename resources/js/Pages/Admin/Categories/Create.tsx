import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const EMOJI_OPTIONS = ['🎓', '📘', '📗', '🧪', '🛡️', '🧯', '🌿', '⚡', '🧰', '💡'];

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
  icon: string | null;
  sort_order: number;
}

export default function Create({ categories = [] }: { categories?: Category[] }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    parent_id: '',
    icon: '',
    sort_order: 0,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/admin/categories');
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Crear Categoría"
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Categorías', href: '/admin/categories' },
            { label: 'Crear' },
          ]}
        />
      }
    >
      <Alert />

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
                placeholder="Ej: Seguridad y Salud Ocupacional"
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
                <span className="label-text">Descripción</span>
              </label>
              <textarea
                className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
                placeholder="Describe el contenido y alcance de esta categoría"
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
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.parent_id && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.parent_id}</span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Icono (Emoji)</span>
                  <span className="label-text-alt text-base-content/60">Opcional</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className={`btn btn-sm ${data.icon === emoji ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setData('icon', emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={() => setData('icon', '')}
                  >
                    Limpiar
                  </button>
                </div>
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

            <div className="alert alert-info mt-4">
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
              <div>
                <div className="font-semibold">Sobre las categorías:</div>
                <ul className="list-disc list-inside text-sm mt-1">
                  <li>El slug se generará automáticamente a partir del nombre</li>
                  <li>Puedes crear subcategorías seleccionando una categoría padre</li>
                  <li>El orden determina cómo se muestran en listados</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Crear Categoría
          </button>
          <a href="/admin/categories" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
