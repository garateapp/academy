import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/Admin/PageHeader';
import Alert from '@/components/Admin/Alert';
import { Link, router } from '@inertiajs/react';

interface Template {
  id: number;
  name: string;
  description: string | null;
  orientation: 'landscape' | 'portrait';
  size: 'A4' | 'Letter' | 'Legal';
  is_default: boolean;
  is_active: boolean;
  certificates_count: number;
  created_at: string;
}

interface PaginatedTemplates {
  data: Template[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function Index({ templates }: { templates: PaginatedTemplates }) {
  const handleDelete = (template: Template) => {
    if (template.certificates_count > 0) {
      alert('No se puede eliminar una plantilla que tiene certificados emitidos.');
      return;
    }

    if (confirm(`Seguro de eliminar la plantilla "${template.name}"?`)) {
      router.delete(`/admin/certificate-templates/${template.id}`);
    }
  };

  const handleDuplicate = (template: Template) => {
    if (confirm(`Duplicar la plantilla "${template.name}"?`)) {
      router.post(`/admin/certificate-templates/${template.id}/duplicate`);
    }
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title="Plantillas de Certificados"
          description="Administra los disenos base de los certificados"
          breadcrumbs={[{ label: 'Admin', href: '/dashboard' }, { label: 'Plantillas' }]}
          actions={
            <Link href="/admin/certificate-templates/create" className="btn btn-primary">
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
              Nueva Plantilla
            </Link>
          }
        />
      }
    >
      <Alert />

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Formato</th>
                  <th className="text-center">Estado</th>
                  <th className="text-center">Certificados</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {templates.data.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8">
                      <div className="text-base-content/60">
                        No hay plantillas registradas. Crea la primera plantilla.
                      </div>
                    </td>
                  </tr>
                ) : (
                  templates.data.map((template) => (
                    <tr key={template.id} className="hover">
                      <td>
                        <div className="font-semibold">{template.name}</div>
                        {template.description && (
                          <div className="text-sm text-base-content/60">
                            {template.description}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="text-sm">
                          {template.size} ·{' '}
                          {template.orientation === 'landscape' ? 'Horizontal' : 'Vertical'}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="flex flex-col gap-1 items-center">
                          {template.is_default && (
                            <div className="badge badge-primary badge-outline">Default</div>
                          )}
                          <div
                            className={`badge ${
                              template.is_active ? 'badge-success' : 'badge-ghost'
                            }`}
                          >
                            {template.is_active ? 'Activa' : 'Inactiva'}
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="badge badge-outline">{template.certificates_count}</div>
                      </td>
                      <td className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Link
                            href={`/admin/certificate-templates/${template.id}`}
                            className="btn btn-ghost btn-sm"
                            title="Ver"
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

                          <Link
                            href={`/admin/certificate-templates/${template.id}/edit`}
                            className="btn btn-ghost btn-sm"
                            title="Editar"
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </Link>

                          <button
                            onClick={() => handleDuplicate(template)}
                            className="btn btn-ghost btn-sm"
                            title="Duplicar"
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
                                d="M8 7h8m-8 4h8m-8 4h6M5 21h7a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm11-5h3a2 2 0 002-2V5a2 2 0 00-2-2h-7"
                              />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleDelete(template)}
                            className="btn btn-ghost btn-sm text-error"
                            title="Eliminar"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {templates.last_page > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join">
            {Array.from({ length: templates.last_page }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/admin/certificate-templates?page=${page}`}
                className={`join-item btn ${page === templates.current_page ? 'btn-active' : ''}`}
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
