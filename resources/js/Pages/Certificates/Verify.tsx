interface User {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
}

interface Certificate {
  certificate_number: string;
  user: User;
  course: Course;
  issued_at: string;
  valid_until: string | null;
  completion_date: string;
  is_revoked: boolean;
  revoked_at: string | null;
  revocation_reason: string | null;
}

export default function Verify({
  certificate,
  verified,
}: {
  certificate: Certificate | null;
  verified: boolean;
}) {
  const isValid =
    certificate &&
    !certificate.is_revoked &&
    (!certificate.valid_until || new Date(certificate.valid_until) > new Date());

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Greenex Academy</h1>
          <p className="text-lg text-base-content/70">Verificación de Certificado</p>
        </div>

        {verified && certificate ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-center mb-6">
                {isValid ? (
                  <div className="text-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 w-24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="text-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 w-24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {isValid ? 'Certificado Válido' : 'Certificado No Válido'}
                </h2>
                <p className="text-base-content/70">
                  {isValid
                    ? 'Este certificado ha sido verificado y es auténtico'
                    : certificate.is_revoked
                      ? 'Este certificado ha sido revocado'
                      : 'Este certificado ha expirado'}
                </p>
              </div>

              {certificate.is_revoked && certificate.revocation_reason && (
                <div className="alert alert-error mb-6">
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
                    <h3 className="font-bold">Razón de Revocación</h3>
                    <div className="text-sm">{certificate.revocation_reason}</div>
                    {certificate.revoked_at && (
                      <div className="text-sm mt-1">
                        Revocado el {new Date(certificate.revoked_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="divider"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-base-content/60">Número de Certificado</div>
                  <div className="font-mono font-bold">{certificate.certificate_number}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Estudiante</div>
                  <div className="font-semibold">{certificate.user.name}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Curso</div>
                  <div className="font-semibold">{certificate.course.title}</div>
                </div>

                <div>
                  <div className="text-sm text-base-content/60">Fecha de Completación</div>
                  <div>{new Date(certificate.completion_date).toLocaleDateString()}</div>
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

              <div className="divider"></div>

              <div className="text-center text-sm text-base-content/60">
                <p>
                  Este certificado fue emitido por Greenex Academy y puede ser verificado en
                  cualquier momento usando el código de verificación único.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-center mb-6">
                <div className="text-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Certificado No Encontrado</h2>
                <p className="text-base-content/70 mb-6">
                  El código de verificación proporcionado no corresponde a ningún certificado en
                  nuestro sistema.
                </p>
                <p className="text-sm text-base-content/60">
                  Por favor, verifica que el código sea correcto o contacta con el emisor del
                  certificado.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <a href="/" className="link link-primary">
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
