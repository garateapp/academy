import AdminLayout from '@/layouts/AdminLayout';
import Alert from '@/components/Admin/Alert';
import DataTable from '@/components/Admin/DataTable';
import PageHeader from '@/components/Admin/PageHeader';
import { Link, useForm } from '@inertiajs/react';

interface Survey {
  id: number;
  title: string;
  description: string | null;
  status: string;
  is_anonymous: boolean;
  expires_at: string | null;
  questions: Question[];
}

interface Question {
  id: number;
  prompt: string;
  type: string;
  is_required: boolean;
  sort_order: number;
}

interface Assignment {
  id: number;
  status: string;
  expires_at: string | null;
  sent_at: string | null;
  completed_at: string | null;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface AvailableUser {
  id: number;
  name: string;
  email: string;
}

export default function Show({
  survey,
  assignments,
  availableUsers,
  stats,
}: {
  survey: Survey;
  assignments: Assignment[];
  availableUsers: AvailableUser[];
  stats: {
    assignments: number;
    completed: number;
    responses: number;
  };
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    user_ids: [] as number[],
  });

  const handleAssign = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post(`/admin/surveys/${survey.id}/assignments`, {
      preserveScroll: true,
      onSuccess: () => reset('user_ids'),
    });
  };

  const toggleUser = (userId: number) => {
    setData(
      'user_ids',
      data.user_ids.includes(userId)
        ? data.user_ids.filter((id) => id !== userId)
        : [...data.user_ids, userId],
    );
  };

  const questionColumns = [
    {
      header: 'Orden',
      accessor: (row: Question) => (
        <div className="badge badge-primary badge-outline">{row.sort_order}</div>
      ),
      className: 'text-center',
    },
    {
      header: 'Pregunta',
      accessor: (row: Question) => (
        <div>
          <div className="font-semibold">{row.prompt}</div>
          <div className="text-sm text-base-content/60">
            {row.type === 'single_choice'
              ? 'Seleccion unica'
              : row.type === 'multiple_choice'
                ? 'Seleccion multiple'
                : 'Respuesta abierta'}
          </div>
        </div>
      ),
    },
    {
      header: 'Requerida',
      accessor: (row: Question) => (
        <div className={`badge ${row.is_required ? 'badge-success' : 'badge-ghost'}`}>
          {row.is_required ? 'Si' : 'No'}
        </div>
      ),
      className: 'text-center',
    },
  ];

  const assignmentColumns = [
    {
      header: 'Usuario',
      accessor: (row: Assignment) => (
        <div>
          <div className="font-semibold">{row.user.name}</div>
          <div className="text-xs text-base-content/60">{row.user.email}</div>
        </div>
      ),
    },
    {
      header: 'Estado',
      accessor: (row: Assignment) => (
        <div
          className={`badge ${
            row.status === 'completed'
              ? 'badge-success'
              : row.status === 'expired'
                ? 'badge-error'
                : 'badge-warning'
          }`}
        >
          {row.status === 'completed'
            ? 'Completada'
            : row.status === 'expired'
              ? 'Expirada'
              : 'Pendiente'}
        </div>
      ),
      className: 'text-center',
    },
    {
      header: 'Expira',
      accessor: (row: Assignment) =>
        row.expires_at ? new Date(row.expires_at).toLocaleDateString() : 'Sin fecha',
    },
    {
      header: 'Enviada',
      accessor: (row: Assignment) =>
        row.sent_at ? new Date(row.sent_at).toLocaleDateString() : '-',
    },
    {
      header: 'Completada',
      accessor: (row: Assignment) =>
        row.completed_at ? new Date(row.completed_at).toLocaleDateString() : '-',
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title={survey.title}
          description={survey.description || undefined}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Encuestas', href: '/admin/surveys' },
            { label: survey.title },
          ]}
          actions={
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/surveys/${survey.id}/edit`} className="btn btn-primary">
                Editar
              </Link>
              <Link
                href={`/admin/surveys/${survey.id}/questions/create`}
                className="btn btn-success"
              >
                Agregar pregunta
              </Link>
              <a
                href={`/admin/surveys/${survey.id}/export?format=csv`}
                className="btn btn-outline"
              >
                Exportar CSV
              </a>
              <a
                href={`/admin/surveys/${survey.id}/export?format=xlsx`}
                className="btn btn-outline"
              >
                Exportar XLSX
              </a>
            </div>
          }
        />
      }
    >
      <Alert />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body space-y-3">
              <h2 className="card-title">Resumen</h2>
              <div>
                <div className="text-sm text-base-content/60">Estado</div>
                <div
                  className={`badge ${
                    survey.status === 'published'
                      ? 'badge-success'
                      : survey.status === 'draft'
                        ? 'badge-warning'
                        : 'badge-ghost'
                  }`}
                >
                  {survey.status === 'published'
                    ? 'Publicada'
                    : survey.status === 'draft'
                      ? 'Borrador'
                      : 'Cerrada'}
                </div>
              </div>
              <div>
                <div className="text-sm text-base-content/60">Anonimato</div>
                <div className={`badge ${survey.is_anonymous ? 'badge-info' : 'badge-ghost'}`}>
                  {survey.is_anonymous ? 'Anonima' : 'Con identidad'}
                </div>
              </div>
              <div>
                <div className="text-sm text-base-content/60">Expira</div>
                <div>{survey.expires_at ? new Date(survey.expires_at).toLocaleString() : 'Sin fecha'}</div>
              </div>
              <div className="divider"></div>
              <div>
                <div className="text-sm text-base-content/60">Asignaciones</div>
                <div className="text-2xl font-bold">{stats.assignments}</div>
              </div>
              <div>
                <div className="text-sm text-base-content/60">Completadas</div>
                <div className="text-2xl font-bold">{stats.completed}</div>
              </div>
              <div>
                <div className="text-sm text-base-content/60">Respuestas</div>
                <div className="text-2xl font-bold">{stats.responses}</div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Asignar usuarios</h2>
              {availableUsers.length === 0 ? (
                <p className="text-sm text-base-content/60">No hay usuarios disponibles.</p>
              ) : (
                <form className="space-y-4" onSubmit={handleAssign}>
                  <div className="rounded-lg border border-base-300 bg-base-200 p-4">
                    <div className="text-sm font-semibold">Selecciona usuarios</div>
                    <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-2">
                      {availableUsers.map((user) => (
                        <label
                          key={user.id}
                          className="flex cursor-pointer items-start gap-3 rounded-lg bg-base-100 p-3 hover:bg-base-200"
                        >
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary mt-1"
                            checked={data.user_ids.includes(user.id)}
                            onChange={() => toggleUser(user.id)}
                          />
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-base-content/60">{user.email}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.user_ids && (
                      <span className="mt-3 block text-xs text-error">{errors.user_ids}</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={processing || data.user_ids.length === 0}
                  >
                    Asignar y enviar correo
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Preguntas ({survey.questions.length})</h2>
              <DataTable
                columns={questionColumns}
                data={survey.questions}
                emptyMessage="No hay preguntas configuradas."
                actions={(row: Question) => (
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/surveys/${survey.id}/questions/${row.id}/edit`}
                      className="btn btn-ghost btn-sm"
                    >
                      Editar
                    </Link>
                    <Link
                      href={`/admin/surveys/${survey.id}/questions/${row.id}`}
                      method="delete"
                      as="button"
                      className="btn btn-ghost btn-sm text-error"
                    >
                      Eliminar
                    </Link>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Asignaciones ({assignments.length})</h2>
              <DataTable
                columns={assignmentColumns}
                data={assignments}
                emptyMessage="No hay asignaciones registradas."
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

