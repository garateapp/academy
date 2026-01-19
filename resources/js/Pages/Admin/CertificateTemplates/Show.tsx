import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/Admin/PageHeader';
import Alert from '@/components/Admin/Alert';
import { Link, router } from '@inertiajs/react';

type Placeholders = Record<string, string>;

interface Template {
  id: number;
  name: string;
  description: string | null;
  content: string;
  orientation: 'landscape' | 'portrait';
  size: 'A4' | 'Letter' | 'Legal';
  is_default: boolean;
  is_active: boolean;
  certificates_count: number;
  created_at: string;
  updated_at: string;
}

export default function Show({
  template,
  placeholders = {},
}: {
  template: Template;
  placeholders?: Placeholders;
}) {
  const handleDuplicate = () => {
    if (confirm(`Duplicar la plantilla "${template.name}"?`)) {
      router.post(`/admin/certificate-templates/${template.id}/duplicate`);
    }
  };

  const handleDelete = () => {
    if (template.certificates_count > 0) {
      alert('No se puede eliminar una plantilla que tiene certificados emitidos.');
      return;
    }

    if (confirm(`Seguro de eliminar la plantilla "${template.name}"?`)) {
      router.delete(`/admin/certificate-templates/${template.id}`);
    }
  };

  return (
    <AdminLayout
      header={
        <PageHeader
          title={template.name}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Plantillas', href: '/admin/certificate-templates' },
            { label: template.name },
          ]}
          actions={
            <div className="flex gap-2">
              <Link
                href={`/admin/certificate-templates/${template.id}/edit`}
                className="btn btn-primary"
              >
                Editar
              </Link>
              <button onClick={handleDuplicate} className="btn btn-outline">
                Duplicar
              </button>
              <button onClick={handleDelete} className="btn btn-ghost text-error">
                Eliminar
              </button>
            </div>
          }
        />
      }
    >
      <Alert />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="card-title">Detalles</h2>
                  {template.description && (
                    <p className="text-sm text-base-content/60">{template.description}</p>
                  )}
                </div>
                <div className="badge badge-outline">
                  {template.certificates_count} certificados
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Formato</span>
                  <span>
                    {template.size} ·{' '}
                    {template.orientation === 'landscape' ? 'Horizontal' : 'Vertical'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Estado</span>
                  <div className="flex gap-2">
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
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base-content/60">Actualizada</span>
                  <span>{new Date(template.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Placeholders</h2>
              <div className="space-y-2 text-sm">
                {Object.entries(placeholders).map(([placeholder, label]) => (
                  <div key={placeholder} className="flex items-center justify-between gap-2">
                    <span className="text-base-content/60">{label}</span>
                    <span className="font-mono text-xs">{placeholder}</span>
                  </div>
                ))}
                {Object.keys(placeholders).length === 0 && (
                  <div className="text-sm text-base-content/60">
                    No hay placeholders configurados.
                  </div>
                )}
              </div>
            </div>
          </div>

          <Link href="/admin/certificate-templates" className="btn btn-ghost w-full">
            Volver a plantillas
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-2">Vista previa</h2>
            <div className="rounded-lg border border-base-200 bg-white p-6 min-h-[300px]">
              {template.content ? (
                <div dangerouslySetInnerHTML={{ __html: template.content }} />
              ) : (
                <div className="text-sm text-base-content/60">
                  La plantilla no tiene contenido HTML.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
