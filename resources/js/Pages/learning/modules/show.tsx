import InteractiveDocumentModule from '@/components/learning/interactive-document-module';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Clock, PlayCircle, Video } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

interface CourseSummary {
    id: number;
    title: string;
}

interface ModuleData {
    id: number;
    title: string;
    type: 'text' | 'video' | 'file' | 'link' | 'assessment' | 'scorm' | 'interactive_document';
    content: string | null;
    asset_path: string | null;
    assessment_id?: number | null;
}

interface EnrollmentSummary {
    id: number;
    status: string;
    due_at: string | null;
}

interface ProgressData {
    percent_complete: number;
    last_position_seconds: number;
    total_watched_seconds: number;
    duration_seconds: number;
}

interface Props {
    course: CourseSummary;
    module: ModuleData;
    enrollment: EnrollmentSummary;
    progress: ProgressData | null;
    isCompleted: boolean;
    attemptsUsed?: number;
    maxAttempts?: number | null;
    latestAttempt?: {
        id: number;
        status: string;
        assessment_id: number;
    } | null;
    interactiveDocument?: {
        submission_id?: number | null;
        attempt_number?: number | null;
        title: string;
        introduction: string;
        body: string;
        submit_label: string;
        declaration_label: string;
        organization_name: string;
        document_code: string;
        footer_note: string;
        fields: Array<{
            id: string;
            key: string;
            label: string;
            type: 'text' | 'textarea' | 'checkbox' | 'select' | 'radio' | 'date' | 'email' | 'number' | 'signature';
            required: boolean;
            placeholder: string;
            help_text: string;
            options: Array<{
                id: string;
                label: string;
                value: string;
                detail: {
                    enabled: boolean;
                    label: string;
                    placeholder: string;
                    help_text: string;
                    required: boolean;
                };
            }>;
        }>;
        status: string;
        opened_at: string | null;
        updated_at?: string | null;
        submitted_at: string | null;
        completed_at: string | null;
        responses: Record<string, string | boolean>;
        declaration_accepted: boolean;
        can_start_new_attempt?: boolean;
        submissions?: Array<{
            id: number;
            attempt_number: number;
            status: string;
            submitted_at: string | null;
            completed_at: string | null;
            receipt_url: string | null;
        }>;
    } | null;
}

const COMPLETION_THRESHOLD = 90;

const getCsrfToken = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
};

const buildAssetUrl = (assetPath: string | null) => {
    if (!assetPath) return null;
    if (assetPath.startsWith('http')) return assetPath;
    if (assetPath.startsWith('storage/')) return `/${assetPath}`;
    return `/storage/${assetPath}`;
};

export default function ModuleShow({
    course,
    module,
    enrollment,
    progress,
    isCompleted,
    attemptsUsed = 0,
    maxAttempts = null,
    latestAttempt = null,
    interactiveDocument = null,
}: Props) {
    const { flash } = usePage().props as { flash?: { error?: string } };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Cursos', href: '/courses' },
        { title: course.title, href: `/courses/${course.id}` },
        { title: module.title, href: `/modules/${module.id}` },
    ];

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const lastSentAtRef = useRef<number | null>(null);
    const lastTrackedTimeRef = useRef<number | null>(null);

    const initialPercent = typeof progress?.percent_complete === 'string'
        ? Number(progress.percent_complete)
        : progress?.percent_complete ?? 0;

    const [percentComplete, setPercentComplete] = useState(initialPercent);
    const [completed, setCompleted] = useState(
        isCompleted || (progress?.percent_complete ?? 0) >= COMPLETION_THRESHOLD,
    );
    const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

    const assetUrl = useMemo(() => buildAssetUrl(module.asset_path), [module.asset_path]);
    const assessmentId = module.assessment_id ?? undefined;
    const isAttemptsBlocked =
        maxAttempts !== null && maxAttempts > 0 && attemptsUsed >= maxAttempts;

    const sendProgress = async (event: string, watchedSeconds = 0) => {
        if (!videoRef.current) return;
        const duration = videoRef.current.duration;
        if (!duration || Number.isNaN(duration) || duration <= 0) {
            return;
        }

        const payload = {
            event,
            current_time: videoRef.current.currentTime,
            duration,
            watched_seconds: watchedSeconds,
        };

        try {
            const response = await fetch(`/modules/${module.id}/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) return;
            const json = (await response.json()) as { progress: ProgressData; completed: boolean };
            const nextPercent =
                typeof json.progress.percent_complete === 'string'
                    ? Number(json.progress.percent_complete)
                    : json.progress.percent_complete;
            setPercentComplete(nextPercent);
            setCompleted(nextPercent >= COMPLETION_THRESHOLD);
            if (json.completed) {
                setCompleted(true);
            }
            setLastSavedAt(new Date().toLocaleTimeString());
        } catch {
            // ignore network errors for now
        }
    };

    const markCompleted = async () => {
        try {
            const response = await fetch(`/modules/${module.id}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({}),
            });
            if (!response.ok) return;
            setCompleted(true);
            setPercentComplete(100);
            setLastSavedAt(new Date().toLocaleTimeString());
        } catch {
            // ignore network errors for now
        }
    };

    const handleInteractiveDocumentSubmitted = () => {
        setCompleted(true);
        setPercentComplete(100);
        setLastSavedAt(new Date().toLocaleTimeString());
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoaded = () => {
            if (!progress?.last_position_seconds) return;
            const nextTime = Math.min(progress.last_position_seconds, Math.max(video.duration - 1, 0));
            if (Number.isFinite(nextTime) && nextTime > 0) {
                video.currentTime = nextTime;
            }
            lastTrackedTimeRef.current = video.currentTime;
        };

        const handlePlay = () => {
            lastTrackedTimeRef.current = video.currentTime;
            void sendProgress('play', 0);
        };

        const handlePause = () => {
            void sendProgress('pause', 0);
        };

        const handleSeek = () => {
            lastTrackedTimeRef.current = video.currentTime;
            void sendProgress('seek', 0);
        };

        const handleEnded = () => {
            void sendProgress('ended', 0);
        };

        const handleTimeUpdate = () => {
            const now = Date.now();
            const lastSentAt = lastSentAtRef.current ?? 0;
            if (now - lastSentAt < 5000) return;

            const lastTracked = lastTrackedTimeRef.current ?? video.currentTime;
            const delta = video.currentTime - lastTracked;
            lastTrackedTimeRef.current = video.currentTime;
            lastSentAtRef.current = now;

            if (delta > 0 && delta <= 20) {
                void sendProgress('heartbeat', delta);
            }
        };

        const handleVisibility = () => {
            if (document.visibilityState === 'hidden') {
                void sendProgress('pause', 0);
            }
        };

        video.addEventListener('loadedmetadata', handleLoaded);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('seeked', handleSeek);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('timeupdate', handleTimeUpdate);
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoaded);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('seeked', handleSeek);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={module.title} />

            <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 p-6">
                {flash?.error && (
                    <div role="alert" className="alert alert-error">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Ya superaste la cantidad de intentos permitidos.</span>
                    </div>
                )}
                {maxAttempts !== null && maxAttempts > 0 && attemptsUsed < maxAttempts && (
                    <div role="alert" className="alert alert-warning">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01M5 19h14a2 2 0 001.732-3l-7-12a2 2 0 00-3.464 0l-7 12A2 2 0 005 19z"
                            />
                        </svg>
                        <span>
                            Te quedan {maxAttempts - attemptsUsed} intentos para esta evaluación.
                        </span>
                    </div>
                )}
                <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Link href={`/courses/${course.id}`} className="btn btn-ghost btn-sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <div>
                                <p className="text-sm text-slate-400">Curso</p>
                                <h1 className="text-2xl font-bold text-slate-800">{module.title}</h1>
                                <p className="text-sm text-slate-500">{course.title}</p>
                            </div>
                        </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-400">Progreso</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            {percentComplete.toFixed(0)}%
                        </p>
                        {completed && (
                            <span className="badge badge-success mt-2">Completado</span>
                        )}
                        {assessmentId && (
                            isAttemptsBlocked ? (
                                <button className="btn btn-secondary btn-sm mt-3" disabled>
                                    Iniciar evaluación
                                </button>
                            ) : (
                                <Link
                                    href={`/assessments/${assessmentId}/start`}
                                    method="post"
                                    as="button"
                                    className="btn btn-secondary btn-sm mt-3"
                                >
                                    Iniciar evaluación
                                </Link>
                            )
                        )}
                        {assessmentId && latestAttempt?.id && (
                            <Link
                                href={`/assessments/${assessmentId}/attempts/${latestAttempt.id}/results`}
                                className="btn btn-outline btn-sm mt-2"
                            >
                                Ver resultados
                            </Link>
                        )}
                    </div>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-emerald-500 transition-all"
                            style={{ width: `${Math.min(percentComplete, 100)}%` }}
                        />
                    </div>

                    {lastSavedAt && (
                        <p className="text-xs text-slate-400">Ultimo guardado: {lastSavedAt}</p>
                    )}
                </div>

                {module.type === 'video' && (
                    <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
                        {assetUrl ? (
                            <video
                                ref={videoRef}
                                className="h-full w-full"
                                controls
                                preload="metadata"
                                poster=""
                            >
                                <source src={assetUrl} />
                                Tu navegador no soporta video HTML5.
                            </video>
                        ) : (
                            <div className="flex h-72 items-center justify-center text-slate-200">
                                No hay video disponible.
                            </div>
                        )}
                    </div>
                )}

                {module.type === 'text' && (
                    <div className="rounded-3xl bg-white p-6 shadow-lg">
                        <div className="flex items-center gap-2 text-slate-500">
                            <PlayCircle className="h-4 w-4" />
                            <span className="text-sm">Lectura guiada</span>
                        </div>
                        <div className="prose max-w-none text-slate-700">
                            {module.content || 'Este modulo no tiene contenido.'}
                        </div>
                        {!completed && (
                            <button className="btn btn-primary mt-6" onClick={markCompleted}>
                                Marcar como completado
                            </button>
                        )}
                    </div>
                )}

                {module.type === 'file' && (
                    <div className="rounded-3xl bg-white p-6 shadow-lg">
                        <div className="flex items-center gap-3 text-slate-600">
                            <Video className="h-5 w-5 text-emerald-600" />
                            <div>
                                <p className="font-semibold">Archivo del modulo</p>
                                <p className="text-sm text-slate-400">Descarga el recurso y continua.</p>
                            </div>
                        </div>
                        {assetUrl && (
                            <a
                                href={assetUrl}
                                className="btn btn-primary mt-4"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Descargar archivo
                            </a>
                        )}
                        {!completed && (
                            <button className="btn btn-primary mt-4" onClick={markCompleted}>
                                Marcar como completado
                            </button>
                        )}
                    </div>
                )}

                {module.type === 'interactive_document' && interactiveDocument && (
                    <InteractiveDocumentModule
                        moduleId={module.id}
                        document={interactiveDocument}
                        readonly={false}
                        onSubmitted={handleInteractiveDocumentSubmitted}
                    />
                )}

                <div className="rounded-3xl bg-emerald-50 p-6 text-sm text-emerald-700">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                            {enrollment.due_at
                                ? `Fecha limite: ${enrollment.due_at}`
                                : 'Sin fecha limite asignada.'}
                        </span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
