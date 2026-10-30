import Alert from '@/components/Admin/Alert';
import DataTable from '@/components/Admin/DataTable';
import PageHeader from '@/components/Admin/PageHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { router } from '@inertiajs/react';

interface CourseOption {
    id: number;
    title: string;
    category: string | null;
    status: string;
}

interface CourseInfo {
    id: number;
    title: string;
    status: string;
    category: string | null;
}

interface Summary {
    participants: number;
    completed: number;
    pending: number;
    completion_rate: number;
    evaluated: number;
    passed: number;
    average_score: number | null;
}

interface Participant {
    id: number;
    user_id: number;
    name: string;
    email: string | null;
    status: string;
    completed: boolean;
    started_at: string | null;
    completed_at: string | null;
    evaluation_score: number | null;
    evaluation_attempts: number;
    evaluation_passed: boolean;
}

const statusLabels: Record<string, { label: string; badge: string }> = {
    completed: { label: 'Finalizado', badge: 'badge-success' },
    active: { label: 'En curso', badge: 'badge-info' },
    paused: { label: 'Pausado', badge: 'badge-warning' },
    cancelled: { label: 'Cancelado', badge: 'badge-error' },
};

export default function CourseReport({
    course,
    courses,
    summary,
    participants,
}: {
    course: CourseInfo | null;
    courses: CourseOption[];
    summary: Summary;
    participants: Participant[];
}) {
    const selectCourse = (value: string) => {
        if (!value) return;
        router.get(
            `/admin/reports/courses/${value}`,
            {},
            { preserveState: true, replace: true },
        );
    };

    return (
        <AdminLayout
            header={
                <PageHeader
                    title="Reporte por Curso"
                    description="Participantes del curso, quienes lo finalizaron y quienes no, con el porcentaje obtenido en la evaluacion"
                    breadcrumbs={[
                        { label: 'Admin', href: '/dashboard' },
                        { label: 'Reportes', href: '/admin/reports' },
                        { label: 'Reporte por curso' },
                    ]}
                />
            }
        >
            <Alert />

            <div className="card mb-6 bg-base-100 shadow-xl">
                <div className="card-body space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="card-title">Curso</h2>
                        <a
                            href="/admin/reports"
                            className="btn btn-outline btn-sm"
                        >
                            Volver a reportes
                        </a>
                    </div>
                    <div className="form-control w-full max-w-xl">
                        <label className="label">
                            <span className="label-text">
                                Selecciona un curso
                            </span>
                        </label>
                        <select
                            className="select-bordered select w-full"
                            value={course?.id ?? ''}
                            onChange={(event) =>
                                selectCourse(event.target.value)
                            }
                        >
                            <option value="" disabled>
                                {courses.length > 0
                                    ? 'Selecciona un curso'
                                    : 'No hay cursos disponibles'}
                            </option>
                            {courses.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.title}
                                    {item.category ? ` (${item.category})` : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                    {course && (
                        <div className="text-sm text-base-content/60">
                            Estado del curso:{' '}
                            <span className="capitalize">{course.status}</span>
                        </div>
                    )}
                </div>
            </div>

            {!course ? (
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center text-base-content/60">
                        No hay cursos registrados para generar el reporte.
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
                        <div className="stat rounded-lg bg-base-100 shadow">
                            <div className="stat-title">Participantes</div>
                            <div className="stat-value text-primary">
                                {summary.participants}
                            </div>
                            <div className="stat-desc">
                                Inscritos en el curso
                            </div>
                        </div>
                        <div className="stat rounded-lg bg-base-100 shadow">
                            <div className="stat-title">Finalizaron</div>
                            <div className="stat-value text-success">
                                {summary.completed}
                            </div>
                            <div className="stat-desc">Cursos completados</div>
                        </div>
                        <div className="stat rounded-lg bg-base-100 shadow">
                            <div className="stat-title">No finalizaron</div>
                            <div className="stat-value text-warning">
                                {summary.pending}
                            </div>
                            <div className="stat-desc">
                                Pendientes de completar
                            </div>
                        </div>
                        <div className="stat rounded-lg bg-base-100 shadow">
                            <div className="stat-title">
                                Tasa de finalizacion
                            </div>
                            <div className="stat-value text-secondary">
                                {summary.completion_rate}%
                            </div>
                            <div className="stat-desc">
                                Finalizados sobre total
                            </div>
                        </div>
                        <div className="stat rounded-lg bg-base-100 shadow">
                            <div className="stat-title">
                                Promedio evaluacion
                            </div>
                            <div className="stat-value text-info">
                                {summary.average_score === null
                                    ? '—'
                                    : `${summary.average_score}%`}
                            </div>
                            <div className="stat-desc">
                                Participantes evaluados: {summary.evaluated}
                            </div>
                        </div>
                        <div className="stat rounded-lg bg-base-100 shadow">
                            <div className="stat-title">Aprobados</div>
                            <div className="stat-value text-accent">
                                {summary.passed}
                            </div>
                            <div className="stat-desc">
                                Aprobaron la evaluacion
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Participantes</h2>
                            <p className="text-sm text-base-content/60">
                                Listado completo de participantes del curso{' '}
                                {course.title}.
                            </p>
                            <DataTable
                                columns={[
                                    {
                                        header: 'Participante',
                                        accessor: (row: Participant) =>
                                            row.name,
                                    },
                                    {
                                        header: 'Email',
                                        accessor: (row: Participant) =>
                                            row.email ?? '—',
                                    },
                                    {
                                        header: 'Estado',
                                        accessor: (row: Participant) => (
                                            <span
                                                className={`badge ${
                                                    statusLabels[row.status]
                                                        ?.badge ?? 'badge-ghost'
                                                }`}
                                            >
                                                {statusLabels[row.status]
                                                    ?.label ?? row.status}
                                            </span>
                                        ),
                                    },
                                    {
                                        header: 'Finalizo',
                                        accessor: (row: Participant) => (
                                            <span
                                                className={`badge ${
                                                    row.completed
                                                        ? 'badge-success'
                                                        : 'badge-warning'
                                                }`}
                                            >
                                                {row.completed ? 'Si' : 'No'}
                                            </span>
                                        ),
                                    },
                                    {
                                        header: 'Fecha de finalizacion',
                                        accessor: (row: Participant) =>
                                            row.completed_at ?? '—',
                                    },
                                    {
                                        header: '% Evaluacion',
                                        accessor: (row: Participant) =>
                                            row.evaluation_score === null
                                                ? 'Sin evaluacion'
                                                : `${row.evaluation_score}%`,
                                    },
                                    {
                                        header: 'Resultado',
                                        accessor: (row: Participant) =>
                                            row.evaluation_score === null ? (
                                                '—'
                                            ) : (
                                                <span
                                                    className={`badge ${
                                                        row.evaluation_passed
                                                            ? 'badge-success'
                                                            : 'badge-error'
                                                    }`}
                                                >
                                                    {row.evaluation_passed
                                                        ? 'Aprobado'
                                                        : 'Reprobado'}
                                                </span>
                                            ),
                                    },
                                    {
                                        header: 'Intentos',
                                        accessor: (row: Participant) =>
                                            row.evaluation_attempts,
                                    },
                                ]}
                                data={participants}
                                emptyMessage="Este curso no tiene participantes registrados."
                            />
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
