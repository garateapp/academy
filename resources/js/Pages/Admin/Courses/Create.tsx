import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Category {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
}

export default function Create({
  categories,
  availableCourses,
}: {
  categories: Category[];
  availableCourses: Course[];
}) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    category_id: '',
    cover_image: null as File | null,
    duration_minutes: '',
    difficulty: '',
    status: 'draft',
    valid_from: '',
    valid_until: '',
    allow_self_enrollment: false,
    prerequisites: [] as number[],
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/courses');
  };

  const handlePrerequisiteToggle = (courseId: number) => {
    setData(
      'prerequisites',
      data.prerequisites.includes(courseId)
        ? data.prerequisites.filter((id) => id !== courseId)
        : [...data.prerequisites, courseId],
    );
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Crear Curso"
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Cursos', href: '/courses' },
            { label: 'Crear' },
          ]}
        />
      }
    >
      <Alert />

      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Información del Curso</h2>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Título <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Ej: Introducción a la Seguridad Industrial"
                className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
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
                <span className="label-text">Descripción</span>
              </label>
              <textarea
                className={`textarea textarea-bordered h-32 ${errors.description ? 'textarea-error' : ''}`}
                placeholder="Describe el contenido y objetivos del curso"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
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
                  <span className="label-text">
                    Categoría <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.category_id ? 'select-error' : ''}`}
                  value={data.category_id}
                  onChange={(e) => setData('category_id', e.target.value)}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.category_id}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Imagen de portada</span>
                  <span className="label-text-alt text-base-content/60">Max 2MB</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className={`file-input file-input-bordered w-full ${errors.cover_image ? 'file-input-error' : ''}`}
                  onChange={(e) => setData('cover_image', e.target.files?.[0] || null)}
                />
                {errors.cover_image && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.cover_image}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Duración (minutos)</span>
                </label>
                <input
                  type="number"
                  placeholder="120"
                  className={`input input-bordered w-full ${errors.duration_minutes ? 'input-error' : ''}`}
                  value={data.duration_minutes}
                  onChange={(e) => setData('duration_minutes', e.target.value)}
                  min={0}
                />
                {errors.duration_minutes && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.duration_minutes}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Dificultad</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.difficulty ? 'select-error' : ''}`}
                  value={data.difficulty}
                  onChange={(e) => setData('difficulty', e.target.value)}
                >
                  <option value="">Selecciona</option>
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
                {errors.difficulty && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.difficulty}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Estado <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.status ? 'select-error' : ''}`}
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  required
                >
                  <option value="draft">Borrador</option>
                  <option value="published">Publicado</option>
                  <option value="archived">Archivado</option>
                </select>
                {errors.status && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.status}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="divider"></div>

            <h3 className="font-semibold text-lg">Disponibilidad</h3>
            <div className="form-control w-full">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={data.allow_self_enrollment}
                  onChange={(e) => setData('allow_self_enrollment', e.target.checked)}
                />
                <span className="label-text">Permitir autoinscripcion</span>
              </label>
              <span className="text-xs text-base-content/60">
                Si esta activo, los alumnos podran inscribirse sin ser asignados manualmente.
              </span>
            </div>

            <div className="divider"></div>

            <h3 className="font-semibold text-lg">Vigencia del Curso</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Válido desde</span>
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full ${errors.valid_from ? 'input-error' : ''}`}
                  value={data.valid_from}
                  onChange={(e) => setData('valid_from', e.target.value)}
                />
                {errors.valid_from && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.valid_from}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Válido hasta</span>
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

            <div className="divider"></div>

            <h3 className="font-semibold text-lg">Prerequisitos</h3>
            <p className="text-sm text-base-content/60 mb-2">
              Selecciona los cursos que deben completarse antes de este
            </p>

            {availableCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableCourses.map((course) => (
                  <div key={course.id} className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={data.prerequisites.includes(course.id)}
                        onChange={() => handlePrerequisiteToggle(course.id)}
                      />
                      <span className="label-text">{course.title}</span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info">
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
                <span>No hay cursos publicados disponibles para seleccionar como prerequisitos.</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Crear Curso
          </button>
          <a href="/courses" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
