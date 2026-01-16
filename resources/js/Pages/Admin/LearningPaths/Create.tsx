import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

interface Course {
  id: number;
  title: string;
}

interface SelectedCourse {
  id: number;
  title: string;
  is_required: boolean;
  sort_order: number;
}

export default function Create({ courses }: { courses: Course[] }) {
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    status: 'draft',
    cover_image: null as File | null,
    courses: [] as { id: number; is_required: boolean; sort_order: number }[],
  });

  useEffect(() => {
    setData(
      'courses',
      selectedCourses.map((course) => ({
        id: course.id,
        is_required: course.is_required,
        sort_order: course.sort_order,
      })),
    );
  }, [selectedCourses, setData]);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    post('/admin/learning-paths', { forceFormData: true });
  };

  const addCourse = (course: Course) => {
    if (selectedCourses.find((item) => item.id === course.id)) {
      return;
    }

    const nextOrder = selectedCourses.length + 1;
    setSelectedCourses([
      ...selectedCourses,
      { id: course.id, title: course.title, is_required: true, sort_order: nextOrder },
    ]);
  };

  const removeCourse = (courseId: number) => {
    const filtered = selectedCourses.filter((course) => course.id !== courseId);
    const reindexed = filtered.map((course, index) => ({
      ...course,
      sort_order: index + 1,
    }));
    setSelectedCourses(reindexed);
  };

  const moveCourse = (courseId: number, direction: 'up' | 'down') => {
    const index = selectedCourses.findIndex((course) => course.id === courseId);
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (index < 0 || targetIndex < 0 || targetIndex >= selectedCourses.length) return;

    const reordered = [...selectedCourses];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    const normalized = reordered.map((course, idx) => ({
      ...course,
      sort_order: idx + 1,
    }));
    setSelectedCourses(normalized);
  };

  const toggleRequired = (courseId: number) => {
    setSelectedCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, is_required: !course.is_required } : course,
      ),
    );
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Crear Ruta de Aprendizaje"
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Rutas', href: '/admin/learning-paths' },
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
                  <option value="active">Activa</option>
                  <option value="archived">Archivada</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Imagen de portada</span>
                  <span className="label-text-alt text-base-content/60">Opcional</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className={`file-input file-input-bordered w-full ${errors.cover_image ? 'file-input-error' : ''}`}
                  onChange={(event) => setData('cover_image', event.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="card-title">Cursos en la ruta</h2>
                <p className="text-sm text-base-content/60">
                  Agrega cursos y define si son obligatorios.
                </p>
              </div>
              <div className="badge badge-outline">{selectedCourses.length} seleccionados</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 mt-4">
              <div className="space-y-3">
                <h3 className="font-semibold">Cursos disponibles</h3>
                {courses.length === 0 ? (
                  <div className="text-sm text-base-content/60">No hay cursos disponibles.</div>
                ) : (
                  <div className="space-y-2">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between rounded-lg border border-base-200 p-3"
                      >
                        <span className="text-sm">{course.title}</span>
                        <button
                          type="button"
                          className="btn btn-xs btn-outline"
                          onClick={() => addCourse(course)}
                        >
                          Agregar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Ruta actual</h3>
                {selectedCourses.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-base-200 p-4 text-sm text-base-content/60">
                    Agrega cursos para definir la ruta.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex flex-col gap-2 rounded-lg border border-base-200 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">
                            {course.sort_order}. {course.title}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="btn btn-xs btn-ghost"
                              onClick={() => moveCourse(course.id, 'up')}
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              className="btn btn-xs btn-ghost"
                              onClick={() => moveCourse(course.id, 'down')}
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              className="btn btn-xs btn-ghost text-error"
                              onClick={() => removeCourse(course.id)}
                            >
                              Quitar
                            </button>
                          </div>
                        </div>
                        <label className="label cursor-pointer justify-start gap-3">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={course.is_required}
                            onChange={() => toggleRequired(course.id)}
                          />
                          <span className="label-text">Obligatorio</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Guardar Ruta
          </button>
          <a href="/admin/learning-paths" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
