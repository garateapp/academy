import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/Admin/PageHeader';
import Alert from '@/components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Course {
  id: number;
  title: string;
}

interface Template {
  id: number;
  name: string;
}

export default function Create({
  users,
  courses,
  templates,
}: {
  users: User[];
  courses: Course[];
  templates: Template[];
}) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    course_id: '',
    template_id: '',
    valid_until: '',
    completion_date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/admin/certificates');
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Emitir Certificado"
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Certificados', href: '/admin/certificates' },
            { label: 'Emitir' },
          ]}
        />
      }
    >
      <Alert />

      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Información del Certificado</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Estudiante <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.user_id ? 'select-error' : ''}`}
                  value={data.user_id}
                  onChange={(e) => setData('user_id', e.target.value)}
                  required
                >
                  <option value="">Selecciona un estudiante</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
                {errors.user_id && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.user_id}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Curso <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.course_id ? 'select-error' : ''}`}
                  value={data.course_id}
                  onChange={(e) => setData('course_id', e.target.value)}
                  required
                >
                  <option value="">Selecciona un curso</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                {errors.course_id && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.course_id}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Plantilla <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.template_id ? 'select-error' : ''}`}
                  value={data.template_id}
                  onChange={(e) => setData('template_id', e.target.value)}
                  required
                >
                  <option value="">Selecciona una plantilla</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                {errors.template_id && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.template_id}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Fecha de Completación <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full ${errors.completion_date ? 'input-error' : ''}`}
                  value={data.completion_date}
                  onChange={(e) => setData('completion_date', e.target.value)}
                  required
                />
                {errors.completion_date && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.completion_date}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Válido hasta</span>
                  <span className="label-text-alt">Opcional</span>
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full ${errors.valid_until ? 'input-error' : ''}`}
                  value={data.valid_until}
                  onChange={(e) => setData('valid_until', e.target.value)}
                />
                {errors.valid_until && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.valid_until}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Notas</span>
              </label>
              <textarea
                className={`textarea textarea-bordered h-24 ${errors.notes ? 'textarea-error' : ''}`}
                placeholder="Notas adicionales sobre este certificado"
                value={data.notes}
                onChange={(e) => setData('notes', e.target.value)}
              ></textarea>
              {errors.notes && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.notes}</span>
                </label>
              )}
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
                />
              </svg>
              <span>
                El certificado será generado automáticamente con un número único y código de
                verificación. El PDF se generará usando la plantilla seleccionada.
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Emitir Certificado
          </button>
          <a href="/admin/certificates" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
