import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Course } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Pencil,
    Trash2,
    Play,
    Pause,
    FileText,
    Video,
    File,
    Calendar,
    User,
} from 'lucide-react';

interface Props {
    course: Course;
    enrollment: {
        id: number;
        status: string;
        due_at: string | null;
    };
    completedModuleIds: number[];
    unlockedModuleIds: number[];
    assessmentAttempts?: Record<string, { used: number; latest_id?: number | null; latest_status?: string | null }>;
}

const statusLabels: Record<Course['status'], string> = {
    draft: 'Borrador',
    active: 'Activo',
    obsolete: 'Obsoleto',
};

const statusVariants: Record<Course['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
    draft: 'secondary',
    active: 'default',
    obsolete: 'destructive',
};

const moduleTypeIcons = {
    text: FileText,
    video: Video,
    file: File,
    interactive_document: FileText,
};

const moduleTypeLabels = {
    text: 'Texto',
    video: 'Video',
    file: 'Archivo',
    interactive_document: 'Documento interactivo',
};

export default function CourseShow({
    course,
    completedModuleIds,
    unlockedModuleIds,
    assessmentAttempts,
}: Props) {
    const { flash } = usePage().props as { flash?: { error?: string } };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Cursos', href: '/courses' },
        { title: course.title, href: `/courses/${course.id}` },
    ];

    const handleDelete = () => {
        if (confirm(`¿Estás seguro de eliminar el curso "${course.title}"?`)) {
            router.delete(`/courses/${course.id}`);
        }
    };

    const handlePublish = () => {
        router.post(`/courses/${course.id}/publish`);
    };

    const handleUnpublish = () => {
        router.post(`/courses/${course.id}/unpublish`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={course.title} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
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
                        <span>{flash.error}</span>
                    </div>
                )}
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/courses">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold tracking-tight">
                                    {course.title}
                                </h1>
                                <Badge variant={statusVariants[course.status]}>
                                    {statusLabels[course.status]}
                                </Badge>
                                {course.allow_self_enrollment && (
                                    <Badge variant="outline">Autoinscripcion</Badge>
                                )}
                            </div>
                            <p className="text-muted-foreground">
                                Versión {course.version}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {course.status === 'draft' && (
                            <Button onClick={handlePublish}>
                                <Play className="mr-2 h-4 w-4" />
                                Publicar
                            </Button>
                        )}
                        {course.status === 'active' && (
                            <Button variant="secondary" onClick={handleUnpublish}>
                                <Pause className="mr-2 h-4 w-4" />
                                Despublicar
                            </Button>
                        )}
                        <Button variant="outline" asChild>
                            <Link href={`/courses/${course.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Editar
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleDelete}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Descripción</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">
                                    {course.description || 'Sin descripción'}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Modules */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Módulos del Curso</CardTitle>
                                <CardDescription>
                                    {course.modules?.length || 0} módulos en este curso
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {course.modules && course.modules.length > 0 ? (
                                    <div className="space-y-3">
                                        {course.modules.map((module, index) => {
                                            const Icon =
                                                moduleTypeIcons[module.type] || FileText;
                                            const isUnlocked = unlockedModuleIds.includes(module.id);
                                            const isCompleted = completedModuleIds.includes(module.id);
                                            const assessmentId = module.assessment_id;
                                            const attemptsUsed = assessmentId
                                                ? assessmentAttempts?.[assessmentId.toString()]?.used ?? 0
                                                : 0;
                                            const latestAttemptId = assessmentId
                                                ? assessmentAttempts?.[assessmentId.toString()]?.latest_id ?? null
                                                : null;
                                            const latestStatus = assessmentId
                                                ? assessmentAttempts?.[assessmentId.toString()]?.latest_status ?? null
                                                : null;
                                            const maxAttempts = module.assessment?.max_attempts ?? null;
                                            const isAttemptsBlocked =
                                                maxAttempts !== null && maxAttempts > 0 && attemptsUsed >= maxAttempts;
                                            return (
                                                <div
                                                    key={module.id}
                                                    className={`flex items-center gap-4 rounded-lg border p-4 ${
                                                        isUnlocked ? 'bg-white' : 'bg-muted/40'
                                                    }`}
                                                >
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium">
                                                            {index + 1}. {module.title}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {moduleTypeLabels[module.type]}
                                                        </p>
                                                        {!isUnlocked && (
                                                            <p className="text-xs text-muted-foreground">
                                                                Completa el módulo anterior para desbloquear.
                                                            </p>
                                                        )}
                                                    </div>
                                                    {isCompleted && (
                                                        <span className="badge badge-success">Completado</span>
                                                    )}
                                                    {assessmentId && isUnlocked && (
                                                        isAttemptsBlocked ? (
                                                            <Button variant="secondary" size="sm" disabled>
                                                                Evaluación
                                                            </Button>
                                                        ) : (
                                                            <Button variant="secondary" size="sm" asChild>
                                                                <Link
                                                                    href={`/assessments/${assessmentId}/start`}
                                                                    method="post"
                                                                    as="button"
                                                                >
                                                                    Evaluación
                                                                </Link>
                                                            </Button>
                                                        )
                                                    )}
                                                    {assessmentId && latestAttemptId && latestStatus && (
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link
                                                                href={`/assessments/${assessmentId}/attempts/${latestAttemptId}/results`}
                                                            >
                                                                Resultados
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    {isUnlocked ? (
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={`/modules/${module.id}`}>Ver</Link>
                                                        </Button>
                                                    ) : (
                                                        <Button variant="outline" size="sm" disabled>
                                                            Bloqueado
                                                        </Button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-center py-8 text-muted-foreground">
                                        No hay módulos en este curso todavía.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Información</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {course.creator && (
                                    <div className="flex items-center gap-3">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Creado por</p>
                                            <p className="font-medium">{course.creator.name}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Fecha de creación</p>
                                        <p className="font-medium">
                                            {new Date(course.created_at).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                                {course.expires_at && (
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Expira</p>
                                            <p className="font-medium">
                                                {new Date(course.expires_at).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
