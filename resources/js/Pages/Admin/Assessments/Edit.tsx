import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Module {
  id: number;
  title: string;
  course: {
    id: number;
    title: string;
  };
}

interface Assessment {
  id: number;
  title: string;
  description: string | null;
  module_id: number;
  type: string;
  passing_score: number;
  time_limit_minutes: number | null;
  max_attempts: number | null;
  shuffle_questions: boolean;
  shuffle_options: boolean;
  show_results: boolean;
  show_correct_answers: boolean;
  allow_review: boolean;
}

export default function Edit({
  assessment,
  modules,
}: {
  assessment: Assessment;
  modules: Module[];
}) {
  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    title: assessment.title,
    description: assessment.description || '',
    module_id: assessment.module_id.toString(),
    type: assessment.type,
    passing_score: assessment.passing_score.toString(),
    time_limit_minutes: assessment.time_limit_minutes?.toString() || '',
    max_attempts: assessment.max_attempts?.toString() || '',
    shuffle_questions: assessment.shuffle_questions,
    shuffle_options: assessment.shuffle_options,
    show_results: assessment.show_results,
    show_correct_answers: assessment.show_correct_answers,
    allow_review: assessment.allow_review,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(`/admin/assessments/${assessment.id}`);
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title={`Editar Evaluación: ${assessment.title}`}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Evaluaciones', href: '/admin/assessments' },
            { label: 'Editar' },
          ]}
        />
      }
    >
      <Alert />

      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Información de la Evaluación</h2>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Título <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Módulo <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.module_id ? 'select-error' : ''}`}
                  value={data.module_id}
                  onChange={(e) => setData('module_id', e.target.value)}
                  required
                >
                  <option value="">Selecciona un módulo</option>
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.course.title} - {module.title}
                    </option>
                  ))}
                </select>
                {errors.module_id && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.module_id}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Tipo <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.type ? 'select-error' : ''}`}
                  value={data.type}
                  onChange={(e) => setData('type', e.target.value)}
                  required
                >
                  <option value="quiz">Quiz</option>
                  <option value="exam">Examen</option>
                  <option value="assignment">Tarea</option>
                  <option value="survey">Encuesta</option>
                </select>
                {errors.type && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.type}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="divider"></div>

            <h3 className="font-semibold text-lg">Configuración</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Puntaje de aprobación (%) <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  className={`input input-bordered w-full ${errors.passing_score ? 'input-error' : ''}`}
                  value={data.passing_score}
                  onChange={(e) => setData('passing_score', e.target.value)}
                  min={0}
                  max={100}
                  required
                />
                {errors.passing_score && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.passing_score}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Tiempo límite (minutos)</span>
                </label>
                <input
                  type="number"
                  className={`input input-bordered w-full ${errors.time_limit_minutes ? 'input-error' : ''}`}
                  value={data.time_limit_minutes}
                  onChange={(e) => setData('time_limit_minutes', e.target.value)}
                  min={0}
                />
                {errors.time_limit_minutes && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.time_limit_minutes}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Intentos máximos</span>
                </label>
                <input
                  type="number"
                  className={`input input-bordered w-full ${errors.max_attempts ? 'input-error' : ''}`}
                  value={data.max_attempts}
                  onChange={(e) => setData('max_attempts', e.target.value)}
                  min={0}
                />
                {errors.max_attempts && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.max_attempts}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="divider"></div>

            <h3 className="font-semibold text-lg">Opciones</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={data.shuffle_questions}
                    onChange={(e) => setData('shuffle_questions', e.target.checked)}
                  />
                  <span className="label-text">Mezclar preguntas</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={data.shuffle_options}
                    onChange={(e) => setData('shuffle_options', e.target.checked)}
                  />
                  <span className="label-text">Mezclar opciones de respuesta</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={data.show_results}
                    onChange={(e) => setData('show_results', e.target.checked)}
                  />
                  <span className="label-text">Mostrar resultados al finalizar</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={data.show_correct_answers}
                    onChange={(e) => setData('show_correct_answers', e.target.checked)}
                  />
                  <span className="label-text">Mostrar respuestas correctas</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={data.allow_review}
                    onChange={(e) => setData('allow_review', e.target.checked)}
                  />
                  <span className="label-text">Permitir revisión</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Guardar Cambios
          </button>
          <a href="/admin/assessments" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
