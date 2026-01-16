import AdminLayout from '@/Layouts/AdminLayout';
import Alert from '@/Components/Admin/Alert';
import DataTable from '@/Components/Admin/DataTable';
import PageHeader from '@/Components/Admin/PageHeader';
import { Link, router } from '@inertiajs/react';

interface Survey {
  id: number;
  title: string;
  status: string;
  is_anonymous: boolean;
  expires_at: string | null;
  questions_count: number;
  assignments_count: number;
  responses_count: number;
}

interface PaginatedSurveys {
  data: Survey[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function Index({ surveys }: { surveys: PaginatedSurveys }) {
  const handleDelete = (survey: Survey) => {
    if (
      confirm(
        `Estas seguro de eliminar la encuesta "${survey.title}"? Esta accion no se puede deshacer.`,
      )
    ) {
      router.delete(`/admin/surveys/${survey.id}`);
    }
  };

  const columns = [
    {
      header: 'Encuesta',
      accessor: (row: Survey) => (
        <div>
          <div className="font-semibold">{row.title}</div>
          <div className="text-sm text-base-content/60">
            {row.is_anonymous ? 'Anonima' : 'Con identidad'}
          </div>
        </div>
      ),
    },
    {
      header: 'Estado',
      accessor: (row: Survey) => (
        <div
          className={`badge ${
            row.status === 'published'
              ? 'badge-success'
              : row.status === 'draft'
                ? 'badge-warning'
                : 'badge-ghost'
          }`}
        >
          {row.status === 'published'
            ? 'Publicada'
            : row.status === 'draft'
              ? 'Borrador'
              : 'Cerrada'}
        </div>
      ),
      className: 'text-center',
    },
    {
      header: 'Expira',
      accessor: (row: Survey) =>
        row.expires_at ? new Date(row.expires_at).toLocaleDateString() : 'Sin fecha',
    },
    {
      header: 'Preguntas',
      accessor: (row: Survey) => (
        <div className="badge badge-primary badge-outline">{row.questions_count}</div>
      ),
      className: 'text-center',
    },
    {
      header: 'Asignaciones',
      accessor: (row: Survey) => (
        <div className="badge badge-info badge-outline">{row.assignments_count}</div>
      ),
      className: 'text-center',
    },
    {
      header: 'Respuestas',
      accessor: (row: Survey) => (
        <div className="badge badge-success badge-outline">{row.responses_count}</div>
      ),
      className: 'text-center',
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Encuestas"
          breadcrumbs={[{ label: 'Admin', href: '/dashboard' }, { label: 'Encuestas' }]}
          actions={
            <Link href="/admin/surveys/create" className="btn btn-primary">
              Nueva encuesta
            </Link>
          }
        />
      }
    >
      <Alert />
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <DataTable
            columns={columns}
            data={surveys.data}
            emptyMessage="No hay encuestas registradas."
            actions={(row) => (
              <div className="flex gap-2 justify-end">
                <Link href={`/admin/surveys/${row.id}`} className="btn btn-ghost btn-sm">
                  Ver
                </Link>
                <Link href={`/admin/surveys/${row.id}/edit`} className="btn btn-ghost btn-sm">
                  Editar
                </Link>
                <button
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => handleDelete(row)}
                >
                  Eliminar
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </AdminLayout>
  );
}

