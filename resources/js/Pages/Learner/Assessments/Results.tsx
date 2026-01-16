import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Question {
  id: number;
  question_text: string;
  type: string;
  points: number;
  order: number;
}

interface Response {
  id: number;
  question: Question;
  text_response: string | null;
  selected_option_id: number | null;
  selected_option?: {
    id: number;
    option_text: string;
  } | null;
  is_correct: boolean | null;
  points_earned: number;
  feedback: string | null;
  correct_answer?: string;
}

interface Assessment {
  id: number;
  title: string;
  description: string | null;
  passing_score: number;
  show_correct_answers: boolean;
  allow_review: boolean;
}

interface Attempt {
  id: number;
  status: string;
  score: number;
  started_at: string;
  submitted_at: string;
  responses: Response[];
}

interface Module {
  id: number;
  title: string;
}

export default function Results({
  assessment,
  attempt,
  module,
}: {
  assessment: Assessment;
  attempt: Attempt;
  module?: Module | null;
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Evaluaciones', href: '/my-assessments' },
    { title: assessment.title, href: `/assessments/${assessment.id}/start` },
    { title: 'Resultados', href: `/assessments/${assessment.id}/attempts/${attempt.id}/results` },
  ];
  const totalPoints = attempt.responses.reduce(
    (sum, response) => sum + response.question.points,
    0,
  );
  const earnedPoints = attempt.responses.reduce(
    (sum, response) => sum + response.points_earned,
    0,
  );
  const isPassing = attempt.score >= assessment.passing_score;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Resultados - ${assessment.title}`} />
      <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <span className="text-xl font-semibold">{assessment.title}</span>
        </div>
        <div className="flex-none">
          <Link href="/dashboard" className="btn btn-ghost">
            Volver al Dashboard
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-4xl">
        <div className={`alert ${isPassing ? 'alert-success' : 'alert-error'} mb-6`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            {isPassing ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
          </svg>
          <div>
            <h3 className="font-bold">
              {isPassing ? '¡Felicitaciones! Has aprobado' : 'No has alcanzado el puntaje mínimo'}
            </h3>
            <div className="text-sm">
              Obtuviste {attempt.score}% (mínimo requerido: {assessment.passing_score}%)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Puntaje</div>
            <div className="stat-value text-primary">{attempt.score}%</div>
            <div className="stat-desc">
              {earnedPoints} de {totalPoints} puntos
            </div>
          </div>

          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Tiempo</div>
            <div className="stat-value text-secondary">
              {Math.floor(
                (new Date(attempt.submitted_at).getTime() -
                  new Date(attempt.started_at).getTime()) /
                  60000,
              )}
              <span className="text-2xl">min</span>
            </div>
            <div className="stat-desc">
              {new Date(attempt.submitted_at).toLocaleTimeString()}
            </div>
          </div>

          <div className="stat bg-base-100 shadow rounded-box">
            <div className="stat-title">Preguntas</div>
            <div className="stat-value">
              {attempt.responses.filter((r) => r.is_correct).length}
            </div>
            <div className="stat-desc">de {attempt.responses.length} correctas</div>
          </div>
        </div>

        {assessment.allow_review && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Revisión de Respuestas</h2>

            {attempt.responses.map((response, index) => (
              <div key={response.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h3 className="card-title text-lg">
                      {response.question.order}. {response.question.question_text}
                    </h3>
                    <div className="flex gap-2 items-center">
                      <div className="badge badge-primary">
                        {response.question.points} pts
                      </div>
                      {response.is_correct !== null && (
                        <div
                          className={`badge ${response.is_correct ? 'badge-success' : 'badge-error'}`}
                        >
                          {response.is_correct ? '✓ Correcto' : '✗ Incorrecto'}
                        </div>
                      )}
                      {response.is_correct === null && (
                        <div className="badge badge-warning">Pendiente de calificación</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-semibold text-base-content/70">
                      Tu respuesta:
                    </div>
                    <div className="p-3 bg-base-200 rounded-lg mt-1">
                      {response.text_response ||
                        response.selected_option?.option_text ||
                        '(Sin respuesta)'}
                    </div>
                  </div>

                  {assessment.show_correct_answers && response.correct_answer && (
                    <div className="mt-3">
                      <div className="text-sm font-semibold text-success">
                        Respuesta correcta:
                      </div>
                      <div className="p-3 bg-success/10 border border-success/20 rounded-lg mt-1">
                        {response.correct_answer}
                      </div>
                    </div>
                  )}

                  {response.feedback && (
                    <div className="mt-3">
                      <div className="text-sm font-semibold text-info">Retroalimentación:</div>
                      <div className="p-3 bg-info/10 border border-info/20 rounded-lg mt-1">
                        {response.feedback}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4 text-sm text-base-content/60">
                    <span>
                      Puntos obtenidos: {response.points_earned} / {response.question.points}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!assessment.allow_review && (
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
              />
            </svg>
            <span>
              La revisión detallada de respuestas no está disponible para esta evaluación.
            </span>
          </div>
        )}

        <div className="flex justify-center mt-8">
          {module?.id ? (
            <Link href={`/modules/${module.id}`} className="btn btn-primary">
              Continuar con el Módulo
            </Link>
          ) : (
            <Link href="/courses" className="btn btn-primary">
              Volver a cursos
            </Link>
          )}
        </div>
      </div>
      </div>
    </AppLayout>
  );
}
