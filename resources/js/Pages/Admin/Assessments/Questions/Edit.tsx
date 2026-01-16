import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Alert from '@/Components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'matching';

interface Assessment {
  id: number;
  title: string;
}

interface Option {
  id?: number;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  type: QuestionType;
  question_text: string;
  explanation: string | null;
  points: number;
  is_required: boolean;
  options: Option[];
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: 'multiple_choice', label: 'Opcion multiple' },
  { value: 'true_false', label: 'Verdadero / Falso' },
  { value: 'short_answer', label: 'Respuesta corta' },
  { value: 'essay', label: 'Ensayo' },
  { value: 'matching', label: 'Emparejamiento' },
];

const defaultOptions = (type: QuestionType): Option[] => {
  if (type === 'true_false') {
    return [
      { option_text: 'Verdadero', is_correct: false },
      { option_text: 'Falso', is_correct: false },
    ];
  }

  if (type === 'multiple_choice' || type === 'matching') {
    return [
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
    ];
  }

  return [];
};

export default function Edit({
  assessment,
  question,
}: {
  assessment: Assessment;
  question: Question;
}) {
  const [options, setOptions] = useState<Option[]>(
    question.options?.length ? question.options : defaultOptions(question.type),
  );

  const { data, setData, put, processing, errors } = useForm({
    type: question.type,
    question_text: question.question_text,
    explanation: question.explanation || '',
    points: question.points,
    is_required: question.is_required,
    options: options as Option[],
  });

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    put(`/admin/assessments/${assessment.id}/questions/${question.id}`);
  };

  const handleTypeChange = (type: QuestionType) => {
    setData('type', type);
    const nextOptions = defaultOptions(type);
    setOptions(nextOptions);
    setData('options', nextOptions);
  };

  const updateOption = (index: number, key: keyof Option, value: string | boolean) => {
    const next = options.map((option, idx) =>
      idx === index ? { ...option, [key]: value } : option,
    );
    setOptions(next);
    setData('options', next);
  };

  const addOption = () => {
    const next = [...options, { option_text: '', is_correct: false }];
    setOptions(next);
    setData('options', next);
  };

  const removeOption = (index: number) => {
    const next = options.filter((_, idx) => idx !== index);
    setOptions(next);
    setData('options', next);
  };

  const showOptions = data.type === 'multiple_choice' || data.type === 'matching' || data.type === 'true_false';

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Editar Pregunta"
          description={assessment.title}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Evaluaciones', href: '/admin/assessments' },
            { label: assessment.title, href: `/admin/assessments/${assessment.id}` },
            { label: 'Editar Pregunta' },
          ]}
        />
      }
    >
      <Alert />

      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-4">
          <h2 className="card-title">Pregunta</h2>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Tipo</span>
            </label>
            <select
              className={`select select-bordered w-full ${errors.type ? 'select-error' : ''}`}
              value={data.type}
              onChange={(event) => handleTypeChange(event.target.value as QuestionType)}
            >
              {QUESTION_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Texto de la pregunta</span>
            </label>
            <textarea
              className={`textarea textarea-bordered h-24 ${errors.question_text ? 'textarea-error' : ''}`}
              value={data.question_text}
              onChange={(event) => setData('question_text', event.target.value)}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Puntos</span>
              </label>
              <input
                type="number"
                className={`input input-bordered w-full ${errors.points ? 'input-error' : ''}`}
                value={data.points}
                onChange={(event) => setData('points', Number(event.target.value))}
                min={1}
              />
            </div>

            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={data.is_required}
                onChange={(event) => setData('is_required', event.target.checked)}
              />
              <span className="label-text">Obligatoria</span>
            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Explicacion (opcional)</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-20"
              value={data.explanation}
              onChange={(event) => setData('explanation', event.target.value)}
            ></textarea>
          </div>

          {showOptions && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Opciones</h3>
                {data.type !== 'true_false' && (
                  <button type="button" className="btn btn-sm btn-outline" onClick={addOption}>
                    + Opcion
                  </button>
                )}
              </div>
              {options.map((option, index) => (
                <div key={`option-${index}`} className="flex flex-col gap-2 rounded-lg border border-base-200 p-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder={`Opcion ${index + 1}`}
                      value={option.option_text}
                      onChange={(event) => updateOption(index, 'option_text', event.target.value)}
                      disabled={data.type === 'true_false'}
                    />
                    {data.type !== 'true_false' && (
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost text-error"
                        onClick={() => removeOption(index)}
                      >
                        Quitar
                      </button>
                    )}
                  </div>
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={option.is_correct}
                      onChange={(event) => updateOption(index, 'is_correct', event.target.checked)}
                    />
                    <span className="label-text">Es correcta</span>
                  </label>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn btn-primary" disabled={processing}>
              {processing && <span className="loading loading-spinner"></span>}
              Guardar cambios
            </button>
            <a href={`/admin/assessments/${assessment.id}`} className="btn btn-ghost">
              Volver
            </a>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
