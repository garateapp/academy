import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

interface CourseOption {
    id: number;
    title: string;
    category?: string | null;
    has_assessment: boolean;
    enrollments_count: number;
}

interface EnrollmentUser {
    id: number;
    name: string;
    email: string | null;
}

interface EnrollmentAttempt {
    id: number;
    status: string;
    score: number | null;
    passed: boolean | null;
    graded_at: string | null;
}

interface EnrollmentRow {
    id: number;
    user: EnrollmentUser;
    status: string;
    progress: number;
    enrolled_at: string | null;
    completed_at: string | null;
    has_assessment: boolean;
    attempt: EnrollmentAttempt | null;
}

interface CourseDetail {
    id: number;
    title: string;
    has_assessment: boolean;
}

interface PageProps {
    courses: CourseOption[];
    course: CourseDetail | null;
    enrollments: EnrollmentRow[] | null;
    selected_course_id: number | null;
}

function formatDate(value: string | null, opts?: { dateOnly?: boolean }): string {
    if (!value) return '-';
    const d = new Date(value);
    if (opts?.dateOnly) return d.toLocaleDateString('es-CL', {
        year: 'numeric', month: '2-digit', day: '2-digit',
    });
    return d.toLocaleString('es-CL', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
    });
}

function statusBadge(status: string) {
    const config: Record<string, { label: string; className: string }> = {
        active: { label: 'Activo', className: 'badge-primary' },
        completed: { label: 'Completado', className: 'badge-success' },
        inactive: { label: 'Inactivo', className: 'badge-ghost' },
    };
    const c = config[status] ?? { label: status, className: 'badge-ghost' };
    return (
        <div className={`badge ${c.className}`}>{c.label}</div>
    );
}

export default function CourseApprovals({
    courses,
    course,
    enrollments,
    selected_course_id,
}: PageProps) {
    const pageUrl = usePage().url;
    const { data, setData, post, processing, errors, reset } = useForm({
        course_id: selected_course_id ?? '',
    });
    const [gradeModalOpen, setGradeModalOpen] = useState(false);
    const [rehabilitateOpen, setRehabilitateOpen] = useState(false);
    const [completeOpen, setCompleteOpen] = useState(false);

    const [targetEnrollmentId, setTargetEnrollmentId] = useState<number | null>(null);
    const [targetHasAssessment, setTargetHasAssessment] = useState(false);

    const gradeForm = useForm({
        score: '',
        passed: false,
    });

    const enrollment = (id: number) =>
        (enrollments ?? []).find((e) => e.id === id);

    const handleSelectCourse = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const courseId = event.target.value;
        if (courseId) {
            router.visit(`/admin/course-approvals?course_id=${courseId}`, {
                preserveScroll: true,
            });
        } else {
            router.visit(`/admin/course-approvals`, {
                preserveScroll: true,
            });
        }
    };

    const openGrade = (id: number, hasAssessment: boolean) => {
        setTargetEnrollmentId(id);
        setTargetHasAssessment(hasAssessment);
        setGradeModalOpen(true);
    };

    const openRehabilitate = (id: number) => {
        setTargetEnrollmentId(id);
        setRehabilitateOpen(true);
    };

    const openComplete = (id: number) => {
        setTargetEnrollmentId(id);
        setCompleteOpen(true);
    };

    const handleGrade = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!targetEnrollmentId) return;
        gradeForm.post(`/admin/course-approvals/enrollments/${targetEnrollmentId}/grade`, {
            onSuccess: () => {
                setGradeModalOpen(false);
                gradeForm.reset('score', 'passed');
                setTargetEnrollmentId(null);
                setData('course_id', data.course_id);
            },
        });
    };

    const handleRehabilitate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!targetEnrollmentId) return;
        post(`/admin/course-approvals/enrollments/${targetEnrollmentId}/rehabilitate`, {
            onSuccess: () => {
                setRehabilitateOpen(false);
                setTargetEnrollmentId(null);
                setData('course_id', data.course_id);
            },
        });
    };

    const handleComplete = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!targetEnrollmentId) return;
        post(`/admin/course-approvals/enrollments/${targetEnrollmentId}/complete`, {
            onSuccess: () => {
                setCompleteOpen(false);
                setTargetEnrollmentId(null);
                setData('course_id', data.course_id);
            },
        });
    };

    return (
        <AdminLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Aprobaciones de Cursos</h2>
                        <p className="text-sm text-base-content/60">
                            Acceso restringido a carlos.alvarez@garatehermanos.cl. Selecciona un curso
                            para aprobar o rehabilitar a sus usuarios asignados.
                        </p>
                    </div>
                <div className="flex items-center gap-3">
                    <select
                        className="select-bordered select w-full max-w-xs"
                        value={String(data.course_id ?? '')}
                        onChange={handleSelectCourse}
                    >
                        <option value="">Seleccionar curso</option>
                        {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.title}{c.category ? ` (${c.category})` : ''}
                            </option>
                        ))}
                    </select>
                </div>
                </div>
            }
        >
            {course ? (
                <div className="space-y-6">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">
                                Usuarios asignados a «{course.title}»
                            </h2>
                            <div className="text-xs text-base-content/60 mb-3">
                                {course.has_assessment
                                    ? 'Este curso tiene evaluación. Solo se finalizarán usuarios con evaluación aprobada.'
                                    : 'Este curso no tiene evaluación.'}
                            </div>
                            {course && enrollments && enrollments.length > 0 && (
                                <div className="flex gap-2 mb-3">
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    `¿Finalizar todos los usuarios (${enrollments.filter(e => e.status !== 'completed').length} pendientes) del curso "${course.title}"?`
                                                )
                                            ) {
                                                post(`/admin/course-approvals/courses/${course.id}/complete-all`, {
                                                    onSuccess: () => {
                                                        setData('course_id', data.course_id);
                                                    },
                                                });
                                            }
                                        }}
                                    >
                                        Finalizar todos los usuarios
                                    </Button>
                                </div>
                            )}
                            {(enrollments ?? []).length === 0 ? (
                                <div className="text-sm text-base-content/60 text-center py-8">
                                    No hay usuarios asignados a este curso.
                                </div>
                            ) : (
                                <table className="table w-full text-left">
                                    <thead>
                                        <tr>
                                            <th>Usuario</th>
                                            <th>Estado</th>
                                            <th>Progreso</th>
                                            <th>Inscrito</th>
                                            <th>Completado</th>
                                            <th>Última evaluación</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(enrollments ?? []).map((e) => (
                                            <tr key={e.id}>
                                                <td>
                                                    <div className="font-medium">{e.user.name}</div>
                                                    <div className="text-xs text-base-content/60">{e.user.email}</div>
                                                </td>
                                                <td>{statusBadge(e.status)}</td>
                                                <td>
                                                    <progress
                                                        className="progress w-24"
                                                        value={e.progress}
                                                        max="100"
                                                    ></progress>
                                                    <span className="text-xs ml-2">{e.progress.toFixed(0)}%</span>
                                                </td>
                                                <td>{formatDate(e.enrolled_at, { dateOnly: true })}</td>
                                                <td>{formatDate(e.completed_at, { dateOnly: true })}</td>
                                                <td>
                                                    {e.attempt ? (
                                                        <div className="text-xs">
                                                            {e.attempt.status === 'graded'
                                                                ? `Nota: ${e.attempt.score?.toFixed(0)} - ${e.attempt.passed ? 'Aprobado' : 'Reprobado'}`
                                                                : e.attempt.status}
                                                            <br />
                                                            {formatDate(e.attempt.graded_at)}
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-base-content/40">Sin intento</span>
                                                    )}
                                                </td>
                                                <td className="flex gap-2">
                                                    {e.status !== 'completed' && (
                                                        <>
                                                            {course.has_assessment ? (
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => openGrade(e.id, true)}
                                                                >
                                                                    Calificar evaluación
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => openComplete(e.id)}
                                                                >
                                                                    Dar por finalizado
                                                                </Button>
                                                            )}
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => openComplete(e.id)}
                                                            >
                                                                Dar por finalizado
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => openRehabilitate(e.id)}
                                                            >
                                                                Rehabilitar
                                                            </Button>
                                                        </>
                                                    )}
                                                    {e.status === 'completed' && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => openRehabilitate(e.id)}
                                                        >
                                                            Rehabilitar
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-sm text-base-content/60 text-center py-20">
                    Selecciona un curso para ver los usuarios asignados.
                </div>
            )}

            <Dialog open={gradeModalOpen} onOpenChange={setGradeModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Calificar evaluación</DialogTitle>
                        <DialogDescription>
                            Asigna la calificación de la evaluación para este usuario.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleGrade} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nota (0-100)</span>
                            </label>
                            <input
                                type="number"
                                className={`input-bordered input w-full ${gradeForm.errors.score ? 'input-error' : ''}`}
                                min="0"
                                max="100"
                                value={gradeForm.data.score}
                                onChange={(e) => gradeForm.setData('score', e.target.value)}
                                required
                            />
                            {gradeForm.errors.score && (
                                <span className="text-xs text-error">{gradeForm.errors.score}</span>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={gradeForm.data.passed}
                                    onChange={(e) =>
                                        gradeForm.setData('passed', e.target.checked)
                                    }
                                />
                                <span className="label-text">
                                    {gradeForm.data.passed ? 'Aprobado' : 'Reprobado'}
                                </span>
                            </label>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                onClick={() => setGradeModalOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={gradeForm.processing}>
                                Guardar calificación
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={rehabilitateOpen} onOpenChange={setRehabilitateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rehabilitar usuario</DialogTitle>
                        <DialogDescription>
                            ¿Seguro que deseas rehabilitar a este usuario en el curso?
                            Su estado volverá a Activo y se eliminará la fecha de completado.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" onClick={() => setRehabilitateOpen(false)}>
                            Cancelar
                        </Button>
                        <form onSubmit={handleRehabilitate}>
                            <Button type="submit" disabled={processing}>
                                Rehabilitar
                            </Button>
                        </form>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={completeOpen} onOpenChange={setCompleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Dar por finalizado</DialogTitle>
                        <DialogDescription>
                            ¿Seguro que deseas marcar este curso como finalizado para el usuario?
                            {targetHasAssessment && (
                                <span className="block mt-2 text-xs text-error">
                                    Requiere que el usuario tenga la evaluación aprobada.
                                </span>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" onClick={() => setCompleteOpen(false)}>
                            Cancelar
                        </Button>
                        <form onSubmit={handleComplete}>
                            <Button type="submit" disabled={processing}>
                                Finalizar curso
                            </Button>
                        </form>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
