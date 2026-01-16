import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface QuestionOption {
  id: number;
  option_text: string;
}

interface Question {
  id: number;
  type: string;
  prompt: string;
  is_required: boolean;
  options: QuestionOption[];
}

interface Survey {
  id: number;
  title: string;
  description: string | null;
  expires_at: string | null;
}

interface Assignment {
  id: number;
  status: string;
  expires_at: string | null;
  token: string;
}

export default function Take({
  survey,
  assignment,
  questions,
  readonly,
  message,
}: {
  survey: Survey;
  assignment: Assignment;
  questions: Question[];
  readonly: boolean;
  message: string | null;
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Encuestas', href: '/my-surveys' },
    { title: survey.title, href: `/surveys/invite/${assignment.token}` },
  ];

  const { data, setData, post, processing, errors } = useForm<{
    responses: Record<number, string | string[]>;
  }>(
    {
      responses: {},
    },
  );

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    post(`/surveys/invite/${assignment.token}`);
  };

  const handleSingleChoice = (questionId: number, optionId: string) => {
    setData('responses', { ...data.responses, [questionId]: optionId });
  };

  const handleMultipleChoice = (questionId: number, optionId: string, checked: boolean) => {
    const current = (data.responses[questionId] || []) as string[];
    const next = checked
      ? [...current, optionId]
      : current.filter((value) => value !== optionId);
    setData('responses', { ...data.responses, [questionId]: next });
  };

  const handleText = (questionId: number, value: string) => {
    setData('responses', { ...data.responses, [questionId]: value });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={survey.title} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">{survey.title}</h1>
          {survey.description && (
            <p className="text-sm text-muted-foreground">{survey.description}</p>
          )}
          <div className="text-sm text-muted-foreground mt-2">
            Fecha limite:{' '}
            {survey.expires_at ? new Date(survey.expires_at).toLocaleString() : 'Sin fecha'}
          </div>
        </div>

        {message && (
          <div className="alert alert-warning">
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="card bg-base-100 shadow">
              <div className="card-body space-y-3">
                <div className="flex items-start gap-3">
                  <div className="badge badge-primary badge-outline">{index + 1}</div>
                  <div>
                    <div className="font-semibold">{question.prompt}</div>
                    {question.is_required && (
                      <div className="text-xs text-error">Obligatoria</div>
                    )}
                  </div>
                </div>

                {question.type === 'single_choice' && (
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <label key={option.id} className="label cursor-pointer justify-start gap-3">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          className="radio radio-primary"
                          disabled={readonly}
                          checked={data.responses[question.id] === option.id.toString()}
                          onChange={() => handleSingleChoice(question.id, option.id.toString())}
                        />
                        <span className="label-text">{option.option_text}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'multiple_choice' && (
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <label key={option.id} className="label cursor-pointer justify-start gap-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          disabled={readonly}
                          checked={
                            Array.isArray(data.responses[question.id]) &&
                            (data.responses[question.id] as string[]).includes(option.id.toString())
                          }
                          onChange={(event) =>
                            handleMultipleChoice(
                              question.id,
                              option.id.toString(),
                              event.target.checked,
                            )
                          }
                        />
                        <span className="label-text">{option.option_text}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'text' && (
                  <textarea
                    className="textarea textarea-bordered h-24"
                    disabled={readonly}
                    value={(data.responses[question.id] as string) || ''}
                    onChange={(event) => handleText(question.id, event.target.value)}
                  ></textarea>
                )}

                {errors[String(question.id)] && (
                  <span className="text-xs text-error">{errors[String(question.id)]}</span>
                )}
              </div>
            </div>
          ))}

          {!readonly && (
            <button type="submit" className="btn btn-primary" disabled={processing}>
              {processing && <span className="loading loading-spinner"></span>}
              Enviar respuestas
            </button>
          )}
        </form>
      </div>
    </AppLayout>
  );
}

