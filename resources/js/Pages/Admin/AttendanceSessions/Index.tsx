import Alert from '@/components/Admin/Alert';
import PageHeader from '@/components/Admin/PageHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import {
    CalendarDays,
    CheckCircle2,
    ClipboardCheck,
    MapPin,
    Users,
} from 'lucide-react';

interface AttendanceSession {
    id: number;
    title: string;
    session_date: string;
    location: string | null;
    notes: string | null;
    course: {
        id: number;
        title: string;
    };
    participants_count: number;
    present_count: number;
    attendance_recorded: boolean;
}

interface AttendanceSessionsPageProps {
    upcomingSessions: AttendanceSession[];
    pastSessions: AttendanceSession[];
    today: string;
}

export default function Index({
    upcomingSessions,
    pastSessions,
    today,
}: AttendanceSessionsPageProps) {
    const totalSessions = upcomingSessions.length + pastSessions.length;

    return (
        <AdminLayout
            header={
                <PageHeader
                    title="Sesiones presenciales"
                    description="Agenda de sesiones programadas y control de asistencia"
                    breadcrumbs={[
                        { label: 'Admin', href: '/dashboard' },
                        { label: 'Sesiones presenciales' },
                    ]}
                />
            }
        >
            <Head title="Sesiones presenciales" />
            <Alert />

            {totalSessions === 0 ? (
                <div className="card border border-base-200 bg-base-100 shadow-sm">
                    <div className="card-body items-center py-16 text-center">
                        <CalendarDays className="h-12 w-12 text-base-content/30" />
                        <h2 className="card-title mt-2">
                            No hay sesiones presenciales programadas
                        </h2>
                        <p className="max-w-lg text-base-content/60">
                            Las sesiones se crean desde la ficha administrativa
                            de cada curso y aparecerán automáticamente en esta
                            agenda.
                        </p>
                        <Link href="/courses" className="btn btn-primary mt-3">
                            Ver cursos
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <SessionSection
                        title="Próximas sesiones"
                        description="Sesiones de hoy y programadas para fechas futuras."
                        sessions={upcomingSessions}
                        today={today}
                        emptyMessage="No hay próximas sesiones programadas."
                    />

                    <SessionSection
                        title="Sesiones realizadas"
                        description="Historial disponible para revisar o regularizar asistencias."
                        sessions={pastSessions}
                        today={today}
                        emptyMessage="Todavía no hay sesiones realizadas."
                        past
                    />
                </div>
            )}
        </AdminLayout>
    );
}

function SessionSection({
    title,
    description,
    sessions,
    today,
    emptyMessage,
    past = false,
}: {
    title: string;
    description: string;
    sessions: AttendanceSession[];
    today: string;
    emptyMessage: string;
    past?: boolean;
}) {
    return (
        <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-sm text-base-content/60">
                        {description}
                    </p>
                </div>
                <span className="badge badge-outline">
                    {sessions.length}{' '}
                    {sessions.length === 1 ? 'sesión' : 'sesiones'}
                </span>
            </div>

            {sessions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-base-300 bg-base-100 px-6 py-10 text-center text-sm text-base-content/60">
                    {emptyMessage}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {sessions.map((session) => (
                        <SessionCard
                            key={session.id}
                            session={session}
                            today={today}
                            past={past}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

function SessionCard({
    session,
    today,
    past,
}: {
    session: AttendanceSession;
    today: string;
    past: boolean;
}) {
    const isToday = session.session_date === today;
    const attendanceUrl = `/courses/${session.course.id}?attendance_session=${session.id}`;

    return (
        <article className="card border border-base-200 bg-base-100 shadow-sm">
            <div className="card-body gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                        <Link
                            href={`/courses/${session.course.id}`}
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            {session.course.title}
                        </Link>
                        <h3 className="mt-1 text-lg font-semibold">
                            {session.title}
                        </h3>
                    </div>

                    <SessionStatus
                        isToday={isToday}
                        past={past}
                        attendanceRecorded={session.attendance_recorded}
                    />
                </div>

                <div className="grid gap-2 text-sm text-base-content/70 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <span>{formatSessionDate(session.session_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{session.location || 'Lugar por confirmar'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>
                            {session.participants_count}{' '}
                            {session.participants_count === 1
                                ? 'participante'
                                : 'participantes'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>
                            {session.attendance_recorded
                                ? `${session.present_count} presentes registrados`
                                : 'Asistencia pendiente'}
                        </span>
                    </div>
                </div>

                {session.notes && (
                    <p className="line-clamp-2 text-sm text-base-content/60">
                        {session.notes}
                    </p>
                )}

                <div className="card-actions justify-end border-t border-base-200 pt-4">
                    <Link
                        href={attendanceUrl}
                        className="btn btn-primary btn-sm"
                    >
                        <ClipboardCheck className="h-4 w-4" />
                        {session.attendance_recorded
                            ? 'Editar asistencia'
                            : 'Tomar asistencia'}
                    </Link>
                </div>
            </div>
        </article>
    );
}

function SessionStatus({
    isToday,
    past,
    attendanceRecorded,
}: {
    isToday: boolean;
    past: boolean;
    attendanceRecorded: boolean;
}) {
    if (isToday) {
        return <span className="badge badge-primary">Hoy</span>;
    }

    if (past) {
        return (
            <span
                className={`badge ${
                    attendanceRecorded ? 'badge-success' : 'badge-warning'
                }`}
            >
                {attendanceRecorded ? 'Asistencia registrada' : 'Pendiente'}
            </span>
        );
    }

    return <span className="badge badge-info badge-outline">Programada</span>;
}

function formatSessionDate(value: string) {
    return new Intl.DateTimeFormat('es-CL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(`${value}T12:00:00`));
}
