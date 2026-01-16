import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    status: 'draft',
    is_anonymous: false,
    expires_at: '',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/admin/surveys');
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Crear Encuesta"
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Encuestas', href: '/admin/surveys' },
            { label: 'Crear' },
          ]}
        />
      }
    >
      <Alert />
      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body space-y-4">
            <h2 className="card-title">Informacion general</h2>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Titulo *</span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                value={data.title}
                onChange={(event) => setData('title', event.target.value)}
                required
              />
              {errors.title && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.title}</span>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Estado</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.status ? 'select-error' : ''}`}
                  value={data.status}
                  onChange={(event) => setData('status', event.target.value)}
                >
                  <option value="draft">Borrador</option>
                  <option value="published">Publicada</option>
                  <option value="closed">Cerrada</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Fecha limite</span>
                </label>
                <input
                  type="datetime-local"
                  className={`input input-bordered w-full ${errors.expires_at ? 'input-error' : ''}`}
                  value={data.expires_at}
                  onChange={(event) => setData('expires_at', event.target.value)}
                  required
                />
                {errors.expires_at && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.expires_at}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={data.is_anonymous}
                  onChange={(event) => setData('is_anonymous', event.target.checked)}
                />
                <span className="label-text">Respuestas anonimas</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Crear encuesta
          </button>
          <a href="/admin/surveys" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}

