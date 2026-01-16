import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';

interface Question {
  id: number;
  question_text: string;
  type: string;
  points: number;
  order: number;
  options: {
    id: number;
    option_text: string;
  }[];
}

interface Assessment {
  id: number;
  title: string;
  description: string | null;
  type: string;
  time_limit_minutes: number | null;
  shuffle_questions: boolean;
  shuffle_options: boolean;
}

interface Attempt {
  id: number;
  started_at: string;
  attendance_acknowledged?: boolean;
  attendance_rut?: string | null;
}

export default function Take({
  assessment,
  attempt,
  questions,
  requiresAttendanceDisclaimer,
}: {
  assessment: Assessment;
  attempt: Attempt;
  questions: Question[];
  requiresAttendanceDisclaimer: boolean;
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Evaluaciones', href: '/my-assessments' },
    { title: assessment.title, href: `/assessments/${assessment.id}/start` },
  ];
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [acknowledged, setAcknowledged] = useState(!!attempt.attendance_acknowledged);

  const {
    data: attendanceData,
    setData: setAttendanceData,
    post: postAttendance,
    processing: attendanceProcessing,
    errors: attendanceErrors,
  } = useForm({
    attendance_rut: attempt.attendance_rut || '',
    accepted: false,
  });

  const getCookieValue = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const { data, setData, post, processing } = useForm<{
    responses: Record<number, string>;
  }>({
    responses: {},
  });

  useEffect(() => {
    if (assessment.time_limit_minutes) {
      const startTime = new Date(attempt.started_at).getTime();
      const endTime = startTime + assessment.time_limit_minutes * 60 * 1000;

      const interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        setTimeRemaining(Math.floor(remaining / 1000));

        if (remaining === 0) {
          handleSubmit();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [assessment.time_limit_minutes, attempt.started_at]);

  const handleSubmit: FormEventHandler = async (e) => {
    if (e) e.preventDefault();
    if (submitting) return;
    if (confirm('¿Estás seguro de enviar tu evaluación? Esta acción no se puede deshacer.')) {
      setSubmitting(true);
      const token = getCookieValue('XSRF-TOKEN');
      const questionMap = new Map(questions.map((question) => [question.id, question]));

      const responseRequests = Object.entries(data.responses).map(([id, value]) => {
        const questionId = Number(id);
        const question = questionMap.get(questionId);
        if (!question || value === '') return Promise.resolve();

        const payload: { question_id: number; selected_option_id?: number; text_response?: string } = {
          question_id: questionId,
        };

        if (['multiple_choice', 'true_false'].includes(question.type) && /^\d+$/.test(value)) {
          payload.selected_option_id = Number(value);
        } else {
          payload.text_response = value;
        }

        return fetch(`/assessments/${assessment.id}/attempts/${attempt.id}/response`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            ...(token ? { 'X-XSRF-TOKEN': token } : {}),
          },
          body: JSON.stringify(payload),
        });
      });

      await Promise.all(responseRequests);
      post(`/assessments/${assessment.id}/attempts/${attempt.id}/submit`, {
        onFinish: () => setSubmitting(false),
      });
    }
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setData('responses', {
      ...data.responses,
      [questionId]: answer,
    });
  };

  const handleAttendanceSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    postAttendance(`/assessments/${assessment.id}/attempts/${attempt.id}/acknowledge`, {
      onSuccess: () => {
        setAcknowledged(true);
        setAttendanceData('accepted', false);
      },
    });
  };

  const requiresDisclaimer = requiresAttendanceDisclaimer && !acknowledged;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={assessment.title} />
      <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <span className="text-xl font-semibold">{assessment.title}</span>
        </div>
        <div className="flex-none gap-4">
          {timeRemaining !== null && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span
                className={`font-mono text-lg ${timeRemaining < 300 ? 'text-error' : ''}`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
          <div className="text-sm">
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-4xl">
        {requiresDisclaimer && (
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body space-y-4">
              <h2 className="card-title">Declaracion de asistencia</h2>
              <div className="text-sm text-base-content/70 space-y-3">
                <p>
                  Declaro bajo mi responsabilidad que he asistido al curso y que he revisado el
                  contenido completo correspondiente a esta evaluacion obligatoria. Reconozco que
                  la toma de esta evaluacion constituye evidencia formal de mi participacion y
                  asistencia al curso, y que la informacion proporcionada es veraz.
                </p>
                <p>
                  Acepto que mi identificacion (RUT) sera registrada como respaldo de asistencia y
                  que cualquier declaracion falsa puede derivar en la anulacion de la evaluacion y
                  otras medidas administrativas conforme a la normativa interna de la organizacion.
                </p>
              </div>
              <form onSubmit={handleAttendanceSubmit} className="space-y-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">RUT *</span>
                  </label>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      attendanceErrors.attendance_rut ? 'input-error' : ''
                    }`}
                    value={attendanceData.attendance_rut}
                    onChange={(event) =>
                      setAttendanceData('attendance_rut', event.target.value)
                    }
                    placeholder="Ej: 12.345.678-9"
                    required
                  />
                  {attendanceErrors.attendance_rut && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {attendanceErrors.attendance_rut}
                      </span>
                    </label>
                  )}
                </div>
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={attendanceData.accepted}
                    onChange={(event) => setAttendanceData('accepted', event.target.checked)}
                  />
                  <span className="label-text">
                    Acepto la declaracion de asistencia y autorizo el registro de mi RUT.
                  </span>
                </label>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={attendanceProcessing || !attendanceData.accepted}
                >
                  {attendanceProcessing && <span className="loading loading-spinner"></span>}
                  Confirmar declaracion
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="mb-6">
          <progress className="progress progress-primary w-full" value={progress} max="100" />
        </div>

        <div
          className={`card bg-base-100 shadow-xl ${
            requiresDisclaimer ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <div className="card-body">
            <div className="flex justify-between items-start mb-4">
              <h2 className="card-title text-lg">
                {currentQuestion.order}. {currentQuestion.question_text}
              </h2>
              <div className="badge badge-primary">{currentQuestion.points} pts</div>
            </div>

            <div className="space-y-3 mt-4">
              {currentQuestion.type === 'multiple_choice' && (
                <div className="space-y-2">
                  {currentQuestion.options.map((option) => (
                    <div key={option.id} className="form-control">
                      <label className="label cursor-pointer justify-start gap-3 p-4 border rounded-lg hover:bg-base-200">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          className="radio radio-primary"
                          checked={
                            data.responses[currentQuestion.id] === option.id.toString()
                          }
                          onChange={() =>
                            handleAnswer(currentQuestion.id, option.id.toString())
                          }
                        />
                        <span className="label-text text-base">{option.option_text}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'true_false' && currentQuestion.options.length > 0 && (
                <div className="space-y-2">
                  {currentQuestion.options.map((option) => (
                    <div key={option.id} className="form-control">
                      <label className="label cursor-pointer justify-start gap-3 p-4 border rounded-lg hover:bg-base-200">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          className="radio radio-primary"
                          checked={data.responses[currentQuestion.id] === option.id.toString()}
                          onChange={() => handleAnswer(currentQuestion.id, option.id.toString())}
                        />
                        <span className="label-text text-base">{option.option_text}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'short_answer' && (
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Escribe tu respuesta..."
                    className="input input-bordered w-full"
                    value={data.responses[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}

              {currentQuestion.type === 'essay' && (
                <div className="form-control">
                  <textarea
                    placeholder="Escribe tu respuesta..."
                    className="textarea textarea-bordered h-32"
                    value={data.responses[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>

            <div className="divider"></div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Anterior
              </button>

              <div className="flex gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`btn btn-xs ${
                      index === currentQuestionIndex
                        ? 'btn-primary'
                        : data.responses[questions[index].id]
                          ? 'btn-success btn-outline'
                          : 'btn-ghost'
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSubmit}
                  disabled={processing}
                >
                  {processing && <span className="loading loading-spinner"></span>}
                  Enviar Evaluación
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    setCurrentQuestionIndex((prev) =>
                      Math.min(questions.length - 1, prev + 1),
                    )
                  }
                >
                  Siguiente
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {assessment.description && (
          <div className="alert alert-info mt-6">
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
            <span>{assessment.description}</span>
          </div>
        )}
      </div>
      </div>
    </AppLayout>
  );
}
