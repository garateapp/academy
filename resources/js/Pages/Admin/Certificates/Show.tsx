import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/Admin/PageHeader';
import { Link } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
  email: string;
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
  verification_code: string;
  user: User;
  course: Course;
  template: Template;
  issued_at: string;
  valid_until: string | null;
  completion_date: string;
  is_revoked: boolean;
  revoked_at: string | null;
  revoked_by: string | null;
  revocation_reason: string | null;
  pdf_path: string | null;
  notes: string | null;
}

export default function Show({ certificate }: { certificate: Certificate }) {
  const isValid = !certificate.is_revoked &&
    (!certificate.valid_until || new Date(certificate.valid_until) > new Date());

  return (
    <AdminLayout
      header={
        <PageHeader
          title={`Certificado ${certificate.certificate_number}`}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Certificados', href: '/admin/certificates' },
            { label: certificate.certificate_number },
          ]}
          actions={
            <div className="flex gap-2">
              {certificate.pdf_path && (
                <a
                  href={`/admin/certificates/${certificate.id}/download`}
                  className="btn btn-primary"
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
                  Descargar PDF
                </a>
              )}
            </div>
          }
        />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start mb-4">
                <h2 className="card-title text-2xl">Información del Certificado</h2>
                <div
                  className={`badge badge-lg ${
                    isValid
                      ? 'badge-success'
                      : certificate.is_revoked
                        ? 'badge-error'
                        : 'badge-warning'
                  }`}
                >
                  {isValid ? 'Vigente' : certificate.is_revoked ? 'Revocado' : 'Expirado'}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-base-content/60">Número de Certificado</div>
                  <div className="font-mono text-lg font-bold">
                    {certificate.certificate_number}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Código de Verificación</div>
                  <div className="font-mono text-lg font-bold">
                    {certificate.verification_code}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Estudiante</div>
                  <div className="font-semibold">{certificate.user.name}</div>
                  <div className="text-sm text-base-content/60">{certificate.user.email}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Curso</div>
                  <Link
                    href={`/courses/${certificate.course.id}`}
                    className="link link-primary font-semibold"
                  >
                    {certificate.course.title}
                  </Link>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Plantilla Utilizada</div>
                  <Link
                    href={`/admin/certificate-templates/${certificate.template.id}`}
                    className="link link-primary"
                  >
                    {certificate.template.name}
                  </Link>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Fecha de Completación</div>
                  <div className="font-semibold">
                    {new Date(certificate.completion_date).toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Fecha de Emisión</div>
                  <div>{new Date(certificate.issued_at).toLocaleDateString()}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Vigencia</div>
                  <div>
                    {certificate.valid_until
                      ? new Date(certificate.valid_until).toLocaleDateString()
                      : 'Sin vencimiento'}
                  </div>
                </div>
              </div>

              {certificate.notes && (
                <>
                  <div className="divider"></div>
                  <div>
                    <div className="text-sm text-base-content/60 mb-2">Notas</div>
                    <div className="p-3 bg-base-200 rounded-lg">{certificate.notes}</div>
                  </div>
                </>
              )}

              {certificate.is_revoked && (
                <>
                  <div className="divider"></div>
                  <div className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-bold">Certificado Revocado</h3>
                      <div className="text-sm">
                        Revocado el {new Date(certificate.revoked_at!).toLocaleString()}
                        {certificate.revoked_by && ` por ${certificate.revoked_by}`}
                      </div>
                      {certificate.revocation_reason && (
                        <div className="text-sm mt-2">
                          <strong>Razón:</strong> {certificate.revocation_reason}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Verificación</h2>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-base-content/60 mb-2">URL de Verificación</div>
                  <div className="p-3 bg-base-200 rounded-lg break-all text-sm font-mono">
                    {window.location.origin}/certificates/verify/{certificate.verification_code}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60 mb-2">Código QR</div>
                  <div className="flex justify-center p-4 bg-base-200 rounded-lg">
                    <div className="text-center text-base-content/60">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                      <p className="text-sm">QR disponible en PDF</p>
                    </div>
                  </div>
                </div>

                <a
                  href={`/certificates/verify/${certificate.verification_code}`}
                  target="_blank"
                  className="btn btn-outline btn-block"
                >
                  Verificar Certificado
                </a>
              </div>
            </div>
          </div>

          {certificate.pdf_path && (
            <div className="card bg-base-100 shadow-xl mt-6">
              <div className="card-body">
                <h2 className="card-title">Vista Previa</h2>
                <div className="aspect-[8.5/11] bg-base-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-base-content/60">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <p>Certificado PDF disponible</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
