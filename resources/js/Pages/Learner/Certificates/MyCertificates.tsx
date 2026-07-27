import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Award, CalendarDays, Download, ExternalLink, ShieldCheck } from 'lucide-react';

interface Certificate {
    id: number;
    title: string;
    description: string | null;
    certificate_number: string;
    verification_code: string;
    issued_at: string | null;
    expires_at: string | null;
    score: number | null;
    course: {
        id: number;
        title: string;
    } | null;
    download_url: string;
    diploma_url: string;
    verification_url: string;
}

interface MyCertificatesProps {
    certificates: Certificate[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Mis certificados', href: '/my-certificates' },
];

export default function MyCertificates({ certificates }: MyCertificatesProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mis certificados" />

            <div className="space-y-8">
                <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-950 px-6 py-8 text-white shadow-sm md:px-10">
                    <div className="flex max-w-3xl flex-col gap-5">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                            <Award className="size-6 text-amber-300" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-sm font-medium tracking-wide text-emerald-200 uppercase">
                                Logros de aprendizaje
                            </p>
                            <h1 className="mt-2 font-serif text-3xl md:text-4xl">Mis certificados</h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-100/80">
                                Aquí encontrarás los diplomas de los cursos que completaste y aprobaste.
                                Puedes descargarlos o validar públicamente su autenticidad.
                            </p>
                        </div>
                    </div>
                </section>

                {certificates.length === 0 ? (
                    <section className="rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-stone-100 text-stone-500">
                            <Award className="size-7" aria-hidden="true" />
                        </div>
                        <h2 className="mt-5 font-serif text-2xl text-stone-900">Aún no tienes certificados</h2>
                        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-stone-500">
                            Cuando completes un curso y apruebes su evaluación, el diploma aparecerá
                            automáticamente en esta sección.
                        </p>
                    </section>
                ) : (
                    <section className="grid gap-5 lg:grid-cols-2">
                        {certificates.map((certificate) => (
                            <article
                                key={certificate.id}
                                className="flex flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                                        <Award className="size-6" aria-hidden="true" />
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                        <ShieldCheck className="size-3.5" aria-hidden="true" />
                                        Certificado válido
                                    </span>
                                </div>

                                <div className="mt-5 flex-1">
                                    <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
                                        Curso aprobado
                                    </p>
                                    <h2 className="mt-2 font-serif text-2xl leading-tight text-stone-900">
                                        {certificate.course?.title ?? certificate.title}
                                    </h2>
                                    {certificate.score !== null && (
                                        <p className="mt-3 text-sm text-stone-600">
                                            Calificación final:{' '}
                                            <span className="font-semibold text-emerald-700">
                                                {formatScore(certificate.score)}%
                                            </span>
                                        </p>
                                    )}
                                </div>

                                <div className="mt-6 space-y-2 border-t border-stone-100 pt-5 text-sm text-stone-500">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="size-4" aria-hidden="true" />
                                        Emitido {formatDate(certificate.issued_at)}
                                    </div>
                                    <div className="font-mono text-xs text-stone-400">
                                        {certificate.certificate_number}
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                    <a
                                        href={certificate.diploma_url}
                                        className="btn btn-primary flex-1"
                                    >
                                        <Download className="size-4" aria-hidden="true" />
                                        Descargar diploma
                                    </a>
                                    <a
                                        href={certificate.verification_url}
                                        className="btn btn-outline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <ExternalLink className="size-4" aria-hidden="true" />
                                        Verificar
                                    </a>
                                </div>
                            </article>
                        ))}
                    </section>
                )}
            </div>
        </AppLayout>
    );
}

function formatDate(value: string | null): string {
    if (!value) {
        return 'sin fecha registrada';
    }

    return new Intl.DateTimeFormat('es-CL', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(new Date(value));
}

function formatScore(value: number): string {
    return new Intl.NumberFormat('es-CL', {
        maximumFractionDigits: 1,
    }).format(value);
}
