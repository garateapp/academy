import { Link, usePage } from '@inertiajs/react';

export default function Error403() {
  const { props } = usePage<{ status?: number; message?: string }>();
  const status = props.status ?? 403;
  const message =
    props.message ??
    'No tienes permiso para ver esta pagina. Si crees que es un error, contacta al administrador.';

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="w-full max-w-[720px] rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        <img
          className="mx-auto mb-6 block h-auto w-[180px]"
          src="/greencito-academy.png"
          alt="Greenex Academy"
        />
        <h1 className="mb-3 text-[32px] font-bold text-slate-800">
          Acceso denegado ({status})
        </h1>
        <p className="mb-6 text-base text-slate-500">{message}</p>
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
