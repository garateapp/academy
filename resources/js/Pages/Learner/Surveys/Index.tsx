import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Survey {
  id: number;
  title: string;
  description: string | null;
  expires_at: string | null;
}

interface Assignment {
  id: number;
  token: string;
  status: string;
  expires_at: string | null;
  survey: Survey;
  completed_at: string | null;
}

export default function Index({ assignments }: { assignments: Assignment[] }) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Encuestas', href: '/my-surveys' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mis encuestas" />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Mis encuestas</h1>
          <p className="text-sm text-muted-foreground">
            Encuestas asignadas para ti. Completa las pendientes antes de la fecha limite.
          </p>
        </div>

        <div className="grid gap-4">
          {assignments.length === 0 ? (
            <div className="card bg-base-100 shadow">
              <div className="card-body text-sm text-base-content/60">
                No tienes encuestas asignadas.
              </div>
            </div>
          ) : (
            assignments.map((assignment) => (
              <div key={assignment.id} className="card bg-base-100 shadow">
                <div className="card-body">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="card-title">{assignment.survey.title}</h2>
                      {assignment.survey.description && (
                        <p className="text-sm text-base-content/60">
                          {assignment.survey.description}
                        </p>
                      )}
                      <div className="mt-2 text-sm text-base-content/60">
                        Expira:{' '}
                        {assignment.expires_at
                          ? new Date(assignment.expires_at).toLocaleString()
                          : 'Sin fecha'}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`badge ${
                          assignment.status === 'completed'
                            ? 'badge-success'
                            : assignment.status === 'expired'
                              ? 'badge-error'
                              : 'badge-warning'
                        }`}
                      >
                        {assignment.status === 'completed'
                          ? 'Completada'
                          : assignment.status === 'expired'
                            ? 'Expirada'
                            : 'Pendiente'}
                      </div>
                      {assignment.status === 'pending' && (
                        <Link
                          href={`/surveys/invite/${assignment.token}`}
                          className="btn btn-primary"
                        >
                          Responder
                        </Link>
                      )}
                      {assignment.status === 'completed' && assignment.completed_at && (
                        <div className="text-xs text-base-content/60">
                          Respondida: {new Date(assignment.completed_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}

