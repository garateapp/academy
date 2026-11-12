import Alert from '@/components/Admin/Alert';
import DataTable from '@/components/Admin/DataTable';
import PageHeader from '@/components/Admin/PageHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { router, useForm } from '@inertiajs/react';

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
    course_id: number;
    course: string;
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

const courseStatusLabels: Record<string, string> = {
    draft: 'Borrador',
    published: 'Publicado',
    active: 'Activo',
    inactive: 'Inactivo',
    archived: 'Archivado',
};

export default function CourseReport({
    course,
    courses,
    summary,
    participants,
    filters,
}: {
    course: CourseInfo | null;
    courses: CourseOption[];
    summary: Summary;
    participants: Participant[];
    filters: {
        course_id: number | null;
        completion: string | null;
    };
}) {
    const { data, setData, reset } = useForm({
        course_id: filters.course_id ? String(filters.course_id) : '',
        completion: filters.completion ?? '',
    });

    const applyFilters = () => {
        router.get(
            '/admin/reports/courses',
            {
                course_id: data.course_id,
                completion: data.completion,
            },
            { preserveState: true, replace: true },
        );
    };

    const clearFilters = () => {
        reset();
        router.get('/admin/reports/courses', {}, { preserveState: true, replace: true });
    };

    // La exportacion siempre incluye a todos los alumnos inscritos del curso elegido.
    const exportUrl = (() => {
        const params = new URLSearchParams();
        if (data.course_id) params.set('course_id', data.course_id);

        const query = params.toString();

        return `/admin/reports/courses/export${query ? `?${query}` : ''}`;
    })();

    const actaUrl = (() => {
        const params = new URLSearchParams();
        if (data.course_id) params.set('course_id', data.course_id);

        const query = params.toString();

        return `/admin/reports/courses/acta${query ? `?${query}` : ''}`;
    })();

    const courseLabel = course
        ? course.title
        : courses.length > 0
          ? 'Todos los cursos'
          : 'Sin cursos';

    return (
        <AdminLayout
            header={
                <PageHeader
                    title="Reporte por Curso"
                    description="Participantes de cada curso, quienes lo finalizaron y quienes no, con el porcentaje obtenido en la evaluacion"
                    breadcrumbs={[
                        { label: 'Admin', href: '/dashboard' },
                        { label: 'Reportes', href: '/admin/reports' },
                        { label: 'Reporte por curso' },
                    ]}
                />
            }
        >
            <Alert />

            <div className="card bg-base-100 shadow-xl mb-6">
                <div className="card-body space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="card-title">Filtros</h2>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="btn btn-outline btn-sm"
                                onClick={clearFilters}
                            >
                                Limpiar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={applyFilters}
                            >
                                Aplicar
                            </button>
                            <a
                                href={exportUrl}
                                className="btn btn-secondary btn-sm"
                                title="Hoja 1: consolidado por curso. Hoja 2: detalle de todos los alumnos inscritos."
                            >
                                Exportar a Excel
                            </a>
                            {data.course_id && (
                                <a
                                    href={actaUrl}
                                    className="btn btn-outline btn-sm"
                                    title="Acta de participación con espacio para firmas presenciales"
                                >
                                    Exportar Acta PDF
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Curso</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={data.course_id}
                                onChange={(event) => setData('course_id', event.target.value)}
                            >
                                <option value="">Todos los cursos</option>
                                {courses.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                        {item.category ? ` (${item.category})` : ''} —{' '}
                                        {courseStatusLabels[item.status] ?? item.status}
                                    </option>
                                ))}
                            </select>
                            <label className="label">
                                <span className="label-text-alt text-base-content/60">
                                    Se listan todos los cursos, incluidos borradores y archivados.
                                </span>
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Estado de finalizacion</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={data.completion}
                                onChange={(event) => setData('completion', event.target.value)}
                            >
                                <option value="">Todos</option>
                                <option value="completed">Finalizaron el curso</option>
                                <option value="pending">No finalizaron el curso</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
                    <div className="stat bg-base-100 shadow rounded-lg">
                        <div className="stat-title">Participantes</div>
                        <div className="stat-value text-primary">{summary.participants}</div>
                        <div className="stat-desc">Inscritos: {courseLabel}</div>
                    </div>
                    <div className="stat bg-base-100 shadow rounded-lg">
                        <div className="stat-title">Finalizaron</div>
                        <div className="stat-value text-success">{summary.completed}</div>
                        <div className="stat-desc">Cursos completados</div>
                    </div>
                    <div className="stat bg-base-100 shadow rounded-lg">
                        <div className="stat-title">No finalizaron</div>
                        <div className="stat-value text-warning">{summary.pending}</div>
                        <div className="stat-desc">Pendientes de completar</div>
                    </div>
                    <div className="stat bg-base-100 shadow rounded-lg">
                        <div className="stat-title">Tasa de finalizacion</div>
                        <div className="stat-value text-secondary">{summary.completion_rate}%</div>
                        <div className="stat-desc">Finalizados sobre total</div>
                    </div>
                    <div className="stat bg-base-100 shadow rounded-lg">
                        <div className="stat-title">Promedio evaluacion</div>
                        <div className="stat-value text-info">
                            {summary.average_score === null ? '—' : `${summary.average_score}%`}
                        </div>
                        <div className="stat-desc">
                            Participantes evaluados: {summary.evaluated}
                        </div>
                    </div>
                    <div className="stat bg-base-100 shadow rounded-lg">
                        <div className="stat-title">Aprobados</div>
                        <div className="stat-value text-accent">{summary.passed}</div>
                        <div className="stat-desc">Aprobaron la evaluacion</div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Participantes</h2>
                        <p className="text-sm text-base-content/60">
                            Listado completo de participantes segun los filtros aplicados.
                        </p>
                        <DataTable
                            columns={[
                                {
                                    header: 'Curso',
                                    accessor: (row: Participant) => row.course,
                                },
                                {
                                    header: 'Participante',
                                    accessor: (row: Participant) => row.name,
                                },
                                {
                                    header: 'Email',
                                    accessor: (row: Participant) => row.email ?? '—',
                                },
                                {
                                    header: 'Estado',
                                    accessor: (row: Participant) => (
                                        <span
                                            className={`badge ${
                                                statusLabels[row.status]?.badge ?? 'badge-ghost'
                                            }`}
                                        >
                                            {statusLabels[row.status]?.label ?? row.status}
                                        </span>
                                    ),
                                },
                                {
                                    header: 'Finalizo',
                                    accessor: (row: Participant) => (
                                        <span
                                            className={`badge ${
                                                row.completed ? 'badge-success' : 'badge-warning'
                                            }`}
                                        >
                                            {row.completed ? 'Si' : 'No'}
                                        </span>
                                    ),
                                },
                                {
                                    header: 'Fecha de finalizacion',
                                    accessor: (row: Participant) => row.completed_at ?? '—',
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
                                                {row.evaluation_passed ? 'Aprobado' : 'Reprobado'}
                                            </span>
                                        ),
                                },
                                {
                                    header: 'Intentos',
                                    accessor: (row: Participant) => row.evaluation_attempts,
                                },
                            ]}
                            data={participants}
                            emptyMessage="No hay participantes para los filtros seleccionados."
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
