import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Survey {
  id: number;
  title: string;
}

interface Option {
  id?: number;
  option_text: string;
}

interface Question {
  id: number;
  type: string;
  prompt: string;
  is_required: boolean;
  sort_order: number;
  options: Option[];
}

export default function Edit({ survey, question }: { survey: Survey; question: Question }) {
  const [options, setOptions] = useState<Option[]>(question.options || []);
  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    type: question.type,
    prompt: question.prompt,
    is_required: question.is_required,
    sort_order: question.sort_order,
    options: options as Option[],
  });

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    post(`/admin/surveys/${survey.id}/questions/${question.id}`);
  };

  const handleTypeChange = (type: string) => {
    setData('type', type);
    if (type === 'text') {
      setOptions([]);
      setData('options', []);
    } else if (options.length === 0) {
      const next = [{ option_text: '' }, { option_text: '' }];
      setOptions(next);
      setData('options', next);
    }
  };

  const updateOption = (index: number, value: string) => {
    const next = options.map((option, idx) => (idx === index ? { option_text: value } : option));
    setOptions(next);
    setData('options', next);
  };

  const addOption = () => {
    const next = [...options, { option_text: '' }];
    setOptions(next);
    setData('options', next);
  };

  const removeOption = (index: number) => {
    const next = options.filter((_, idx) => idx !== index);
    setOptions(next);
    setData('options', next);
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Editar Pregunta"
          description={survey.title}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Encuestas', href: '/admin/surveys' },
            { label: survey.title, href: `/admin/surveys/${survey.id}` },
            { label: 'Editar Pregunta' },
          ]}
        />
      }
    >
      <Alert />
      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body space-y-4">
            <h2 className="card-title">Pregunta</h2>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Tipo</span>
              </label>
              <select
                className={`select select-bordered w-full ${errors.type ? 'select-error' : ''}`}
                value={data.type}
                onChange={(event) => handleTypeChange(event.target.value)}
              >
                <option value="single_choice">Seleccion unica</option>
                <option value="multiple_choice">Seleccion multiple</option>
                <option value="text">Respuesta abierta</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Enunciado *</span>
              </label>
              <textarea
                className={`textarea textarea-bordered h-24 ${errors.prompt ? 'textarea-error' : ''}`}
                value={data.prompt}
                onChange={(event) => setData('prompt', event.target.value)}
              ></textarea>
              {errors.prompt && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.prompt}</span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Orden</span>
                </label>
                <input
                  type="number"
                  className={`input input-bordered w-full ${errors.sort_order ? 'input-error' : ''}`}
                  value={data.sort_order}
                  min={0}
                  onChange={(event) => setData('sort_order', Number(event.target.value))}
                />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={data.is_required}
                    onChange={(event) => setData('is_required', event.target.checked)}
                  />
                  <span className="label-text">Pregunta obligatoria</span>
                </label>
              </div>
            </div>

            {data.type !== 'text' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Opciones</h3>
                  <button type="button" className="btn btn-sm btn-outline" onClick={addOption}>
                    + Opcion
                  </button>
                </div>
                {options.map((option, index) => (
                  <div key={`option-${index}`} className="flex items-center gap-3">
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder={`Opcion ${index + 1}`}
                      value={option.option_text}
                      onChange={(event) => updateOption(index, event.target.value)}
                    />
                    {options.length > 2 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost text-error"
                        onClick={() => removeOption(index)}
                      >
                        Quitar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Guardar cambios
          </button>
          <a href={`/admin/surveys/${survey.id}`} className="btn btn-ghost">
            Volver
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}

