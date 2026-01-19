import AdminLayout from '@/layouts/AdminLayout';
import DataTable from '@/components/Admin/DataTable';
import PageHeader from '@/components/Admin/PageHeader';
import Alert from '@/components/Admin/Alert';
import { Link, router } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
}

interface Template {
  id: number;
  name: string;
}

interface Certificate {
  id: number;
  certificate_number: string;
  user: User;
  course: Course;
  template: Template;
  issued_at: string;
  valid_until: string | null;
  is_revoked: boolean;
  revoked_at: string | null;
}

interface PaginatedCertificates {
  data: Certificate[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function Index({ certificates }: { certificates: PaginatedCertificates }) {
  const handleRevoke = (certificate: Certificate) => {
    const reason = prompt(
      `¿Estás seguro de revocar el certificado ${certificate.certificate_number}?\n\nIngresa la razón de revocación:`,
    );
    if (reason) {
      router.post(`/admin/certificates/${certificate.id}/revoke`, { reason });
    }
  };

  const columns = [
    {
      header: 'Número',
      accessor: (row: Certificate) => (
        <div className="font-mono text-sm">{row.certificate_number}</div>
      ),
    },
    {
      header: 'Estudiante',
      accessor: (row: Certificate) => row.user.name,
    },
    {
      header: 'Curso',
      accessor: (row: Certificate) => row.course.title,
    },
    {
      header: 'Plantilla',
      accessor: (row: Certificate) => row.template.name,
    },
    {
      header: 'Emitido',
      accessor: (row: Certificate) => new Date(row.issued_at).toLocaleDateString(),
    },
    {
      header: 'Vigencia',
      accessor: (row: Certificate) =>
        row.valid_until ? new Date(row.valid_until).toLocaleDateString() : 'Sin vencimiento',
    },
    {
      header: 'Estado',
      accessor: (row: Certificate) =>
        row.is_revoked ? (
          <div className="badge badge-error">Revocado</div>
        ) : (
          <div className="badge badge-success">Vigente</div>
        ),
      className: 'text-center',
    },
  ];

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Certificados"
          description="Gestiona los certificados emitidos"
          breadcrumbs={[{ label: 'Admin', href: '/dashboard' }, { label: 'Certificados' }]}
          actions={
            <Link href="/admin/certificates/create" className="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Emitir Certificado
            </Link>
          }
        />
      }
    >
      <Alert />

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <DataTable
            columns={columns}
            data={certificates.data}
            actions={(row) => (
              <div className="flex gap-2 justify-end">
                <Link
                  href={`/admin/certificates/${row.id}`}
                  className="btn btn-ghost btn-sm"
                  title="Ver detalles"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </Link>

                <a
                  href={`/admin/certificates/${row.id}/download`}
                  className="btn btn-ghost btn-sm text-primary"
                  title="Descargar PDF"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </a>

                {!row.is_revoked && (
                  <button
                    onClick={() => handleRevoke(row)}
                    className="btn btn-ghost btn-sm text-error"
                    title="Revocar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
            emptyMessage="No hay certificados emitidos."
          />
        </div>
      </div>

      {certificates.last_page > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join">
            {Array.from({ length: certificates.last_page }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/admin/certificates?page=${page}`}
                className={`join-item btn ${page === certificates.current_page ? 'btn-active' : ''}`}
              >
                {page}
              </Link>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
