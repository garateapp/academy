import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Award, BookOpen, ClipboardCheck, FileText } from 'lucide-react';
import type { ReactNode } from 'react';

interface HistoryPageProps {
    stats: {
        courses: number;
        assessments: number;
        certificates: number;
        documents: number;
    };
    history: {
        courses: Array<{
            id: number;
            status: string;
            started_at: string | null;
            completed_at: string | null;
            due_at: string | null;
            course: {
                id: number | null;
                title: string | null;
                url: string | null;
            };
        }>;
        assessments: Array<{
            id: number;
            attempt_number: number;
            status: string;
            score: number | null;
            started_at: string | null;
            submitted_at: string | null;
            assessment: {
                id: number | null;
                title: string | null;
                course_title: string | null;
                results_url: string | null;
            };
        }>;
        certificates: Array<{
            id: number;
            certificate_number: string;
            issued_at: string | null;
            course_title: string | null;
            download_url: string;
        }>;
        documents: Array<{
            id: number;
            attempt_number: number;
            status: string;
            submitted_at: string | null;
            completed_at: string | null;
            title: string;
            document_code: string | null;
            course_title: string | null;
            module_title: string | null;
            receipt_url: string | null;
        }>;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Mi historial', href: '/my-history' },
];

export default function LearningHistoryIndex({ stats, history }: HistoryPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mi historial" />

            <div className="space-y-8">
                <section className="rounded-3xl border border-stone-200 bg-gradient-to-br from-stone-50 via-white to-emerald-50 px-6 py-7 shadow-sm">
                    <h1 className="font-serif text-3xl text-stone-900">Mi historial</h1>
                    <p className="mt-2 max-w-3xl text-sm text-stone-600">
                        Revisa tus cursos, evaluaciones, certificados y documentos completados. Los documentos conservan cada intento enviado durante tu ciclo dentro de la organización.
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-4">
                        <StatCard icon={<BookOpen className="size-5" />} label="Cursos" value={stats.courses} />
                        <StatCard icon={<ClipboardCheck className="size-5" />} label="Evaluaciones" value={stats.assessments} />
                        <StatCard icon={<Award className="size-5" />} label="Certificados" value={stats.certificates} />
                        <StatCard icon={<FileText className="size-5" />} label="Documentos" value={stats.documents} />
                    </div>
                </section>

                <HistorySection title="Cursos" description="Cursos activos y completados dentro de tu ruta de aprendizaje.">
                    {history.courses.length === 0 ? (
                        <EmptyState message="Aún no tienes cursos registrados." />
                    ) : (
                        history.courses.map((item) => (
                            <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="font-medium text-stone-900">{item.course.title ?? 'Curso'}</div>
                                    <div className="text-xs text-stone-500">
                                        {item.completed_at
                                            ? `Completado el ${formatDate(item.completed_at)}`
                                            : item.started_at
                                                ? `Iniciado el ${formatDate(item.started_at)}`
                                                : 'Sin inicio registrado'}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <StatusBadge status={item.status} />
                                    {item.course.url && <Link href={item.course.url} className="btn btn-ghost btn-sm">Abrir</Link>}
                                </div>
                            </div>
                        ))
                    )}
                </HistorySection>

                <HistorySection title="Evaluaciones" description="Resultados e intentos rendidos por evaluación.">
                    {history.assessments.length === 0 ? (
                        <EmptyState message="No tienes evaluaciones registradas." />
                    ) : (
                        history.assessments.map((item) => (
                            <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="font-medium text-stone-900">{item.assessment.title ?? 'Evaluación'}</div>
                                    <div className="text-xs text-stone-500">
                                        {item.assessment.course_title ?? 'Sin curso'} · Intento {item.attempt_number}
                                    </div>
                                    <div className="text-xs text-stone-500">
                                        {item.submitted_at ? `Enviada el ${formatDate(item.submitted_at)}` : 'Intento en progreso'}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="badge badge-outline">{item.score ?? '-'}%</span>
                                    {item.assessment.results_url && <Link href={item.assessment.results_url} className="btn btn-ghost btn-sm">Resultados</Link>}
                                </div>
                            </div>
                        ))
                    )}
                </HistorySection>

                <HistorySection title="Certificados" description="Certificados emitidos y descargables.">
                    {history.certificates.length === 0 ? (
                        <EmptyState message="Aún no tienes certificados emitidos." />
                    ) : (
                        history.certificates.map((item) => (
                            <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="font-medium text-stone-900">{item.course_title ?? 'Certificado'}</div>
                                    <div className="text-xs text-stone-500">
                                        {item.certificate_number} · {item.issued_at ? formatDate(item.issued_at) : 'Sin fecha'}
                                    </div>
                                </div>
                                <a href={item.download_url} className="btn btn-ghost btn-sm">Descargar</a>
                            </div>
                        ))
                    )}
                </HistorySection>

                <HistorySection title="Documentos interactivos" description="Cada envío queda registrado como un intento independiente con su comprobante.">
                    {history.documents.length === 0 ? (
                        <EmptyState message="Aún no tienes documentos interactivos enviados." />
                    ) : (
                        history.documents.map((item) => (
                            <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="font-medium text-stone-900">{item.title}</div>
                                    <div className="text-xs text-stone-500">
                                        {item.course_title ?? 'Sin curso'} · {item.module_title ?? 'Sin módulo'}
                                    </div>
                                    <div className="text-xs text-stone-500">
                                        Intento {item.attempt_number}
                                        {item.document_code ? ` · ${item.document_code}` : ''}
                                        {item.submitted_at ? ` · ${formatDate(item.submitted_at)}` : ''}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <StatusBadge status={item.status} />
                                    {item.receipt_url && (
                                        <a href={item.receipt_url} className="btn btn-ghost btn-sm" target="_blank" rel="noreferrer">
                                            Comprobante
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </HistorySection>
            </div>
        </AppLayout>
    );
}

function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: number }) {
    return (
        <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm">
            <div className="flex items-center gap-2 text-stone-500">
                {icon}
                <span className="text-sm">{label}</span>
            </div>
            <div className="mt-3 font-serif text-3xl text-stone-900">{value}</div>
        </div>
    );
}

function HistorySection({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <section className="space-y-4 rounded-3xl border border-stone-200 bg-stone-50/70 p-5">
            <div>
                <h2 className="font-serif text-2xl text-stone-900">{title}</h2>
                <p className="text-sm text-stone-500">{description}</p>
            </div>
            <div className="space-y-3">{children}</div>
        </section>
    );
}

function EmptyState({ message }: { message: string }) {
    return <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-6 text-sm text-stone-500">{message}</div>;
}

function StatusBadge({ status }: { status: string }) {
    const className = status === 'completed' || status === 'submitted'
        ? 'badge-success'
        : status === 'active' || status === 'in_progress'
            ? 'badge-warning'
            : 'badge-outline';

    return <span className={`badge ${className}`}>{status.replaceAll('_', ' ')}</span>;
}

function formatDate(value: string) {
    return new Date(value).toLocaleString();
}
