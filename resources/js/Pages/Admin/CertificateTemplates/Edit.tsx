import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type Placeholders = Record<string, string>;

interface Template {
  id: number;
  name: string;
  description: string | null;
  content: string;
  orientation: 'landscape' | 'portrait';
  size: 'A4' | 'Letter' | 'Legal';
  is_default: boolean;
  is_active: boolean;
  certificates_count: number;
}

export default function Edit({
  template,
  placeholders = {},
}: {
  template: Template;
  placeholders?: Placeholders;
}) {
  const { data, setData, put, processing, errors } = useForm({
    name: template.name ?? '',
    description: template.description ?? '',
    content: template.content ?? '',
    orientation: template.orientation ?? 'landscape',
    size: template.size ?? 'A4',
    is_default: template.is_default ?? false,
    is_active: template.is_active ?? true,
  });

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    put(`/admin/certificate-templates/${template.id}`);
  };

  const insertPlaceholder = (placeholder: string) => {
    const nextValue = data.content ? `${data.content} ${placeholder}` : placeholder;
    setData('content', nextValue);
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Editar Plantilla"
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Plantillas', href: '/admin/certificate-templates' },
            { label: template.name },
          ]}
        />
      }
    >
      <Alert />

      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="card-title">Datos generales</h2>
              <div className="badge badge-outline">
                {template.certificates_count} certificados
              </div>
            </div>

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
                onChange={(event) => setData('name', event.target.value)}
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
                <span className="label-text">Descripcion</span>
              </label>
              <textarea
                className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
                value={data.description}
                onChange={(event) => setData('description', event.target.value)}
              ></textarea>
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.description}</span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Orientacion</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.orientation ? 'select-error' : ''}`}
                  value={data.orientation}
                  onChange={(event) => setData('orientation', event.target.value)}
                >
                  <option value="landscape">Horizontal</option>
                  <option value="portrait">Vertical</option>
                </select>
                {errors.orientation && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.orientation}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Tamano</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.size ? 'select-error' : ''}`}
                  value={data.size}
                  onChange={(event) => setData('size', event.target.value)}
                >
                  <option value="A4">A4</option>
                  <option value="Letter">Letter</option>
                  <option value="Legal">Legal</option>
                </select>
                {errors.size && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.size}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={data.is_default}
                  onChange={(event) => setData('is_default', event.target.checked)}
                />
                <span className="label-text">Usar como plantilla default</span>
              </label>
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={data.is_active}
                  onChange={(event) => setData('is_active', event.target.checked)}
                />
                <span className="label-text">Plantilla activa</span>
              </label>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="card-title">Contenido HTML</h2>
              <p className="text-sm text-base-content/60">
                Usa placeholders para datos dinamicos del certificado.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.entries(placeholders).map(([placeholder, label]) => (
                <button
                  key={placeholder}
                  type="button"
                  className="btn btn-xs btn-outline"
                  onClick={() => insertPlaceholder(placeholder)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="form-control w-full">
              <textarea
                className={`textarea textarea-bordered min-h-[220px] ${errors.content ? 'textarea-error' : ''}`}
                value={data.content}
                onChange={(event) => setData('content', event.target.value)}
                required
              ></textarea>
              {errors.content && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.content}</span>
                </label>
              )}
            </div>

            <div>
              <div className="text-sm font-semibold mb-2">Vista previa</div>
              <div className="rounded-lg border border-base-200 bg-white p-6 min-h-[220px]">
                {data.content ? (
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                ) : (
                  <div className="text-sm text-base-content/60">
                    No hay contenido para previsualizar.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Guardar Cambios
          </button>
          <a href={`/admin/certificate-templates/${template.id}`} className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
