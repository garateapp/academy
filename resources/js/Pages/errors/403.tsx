import { Link, usePage } from '@inertiajs/react';

interface MissingPrerequisite {
  id: number;
  title: string;
}

export default function Error403() {
  const { props } = usePage<{
    status?: number;
    message?: string;
    missingPrerequisites?: MissingPrerequisite[];
  }>();
  const status = props.status ?? 403;
  const message =
    props.message ??
    'No tienes permiso para ver esta pagina. Si crees que es un error, contacta al administrador.';
  const missingPrerequisites = props.missingPrerequisites ?? [];

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="w-full max-w-[720px] rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        <img
          className="mx-auto mb-6 block h-auto w-[180px]"
          src="/greencito-academy.png"
          alt="Gárate Hermanos Academy"
        />
        <h1 className="mb-3 text-[32px] font-bold text-slate-800">
          Acceso denegado ({status})
        </h1>
        <p className="mb-6 text-base text-slate-500">{message}</p>

        {missingPrerequisites.length > 0 && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-left">
            <p className="mb-3 text-sm font-semibold text-amber-800">
              Cursos que debes completar primero:
            </p>
            <ul className="space-y-2">
              {missingPrerequisites.map((prerequisite) => (
                <li key={prerequisite.id}>
                  <Link
                    href={`/courses/${prerequisite.id}`}
                    className="flex items-center gap-2 rounded-lg bg-white p-3 text-sm font-medium text-slate-700 no-underline shadow-sm transition-colors hover:bg-amber-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 shrink-0 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    {prerequisite.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-block rounded-full border border-green-600 bg-green-600 px-[18px] py-2.5 text-sm font-semibold text-white no-underline hover:bg-green-700"
          >
            Ir al dashboard
          </Link>
          <Link
            href="/"
            className="inline-block rounded-full border border-green-600 bg-white px-[18px] py-2.5 text-sm font-semibold text-green-600 no-underline hover:bg-green-50"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
