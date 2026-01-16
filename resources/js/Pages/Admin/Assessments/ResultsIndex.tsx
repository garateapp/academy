import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import DataTable from '@/Components/Admin/DataTable';
import { Link } from '@inertiajs/react';

interface Attempt {
  id: number;
  status: string;
  score: number | null;
  created_at: string;
  assessment: {
    id: number;
    title: string;
    passing_score: number;
    module?: {
      course?: {
        title: string;
      } | null;
    } | null;
  };
  user: {
    id: number;
    name: string;
  };
}

interface PaginatedAttempts {
  data: Attempt[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: { url: string | null; label: string; active: boolean }[];
}

export default function ResultsIndex({ attempts }: { attempts: PaginatedAttempts }) {
  const columns = [
    {
      header: 'Alumno',
      accessor: (row: Attempt) => row.user.name,
    },
    {
      header: 'Evaluación',
      accessor: (row: Attempt) => (
        <div>
          <div className="font-semibold">{row.assessment.title}</div>
          <div className="text-xs text-base-content/60">
            {row.assessment.module?.course?.title || 'Curso'}
          </div>
        </div>
      ),
    },
    {
      header: 'Estado',
      accessor: (row: Attempt) => (
        <span
          className={`badge ${
            row.status === 'graded'
              ? 'badge-success'
              : row.status === 'submitted'
                ? 'badge-warning'
                : 'badge-ghost'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Puntaje',
      accessor: (row: Attempt) =>
        row.score !== null ? `${row.score}%` : 'Pendiente',
    },
    {
      header: 'Fecha',
      accessor: (row: Attempt) => new Date(row.created_at).toLocaleDateString(),
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Resultados de Evaluaciones"
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Resultados', href: '/admin/assessment-results' },
          ]}
        />
      }
    >
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Intentos recientes</h2>
          <DataTable
            columns={columns}
            data={attempts.data}
            actions={(row) => (
              <Link
                href={`/admin/assessments/${row.assessment.id}`}
                className="btn btn-ghost btn-sm"
              >
                Ver evaluación
              </Link>
            )}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
