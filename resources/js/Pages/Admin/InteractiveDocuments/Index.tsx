import Alert from '@/components/Admin/Alert';
import DataTable from '@/components/Admin/DataTable';
import PageHeader from '@/components/Admin/PageHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { Link, router, useForm } from '@inertiajs/react';
import { FileText } from 'lucide-react';

interface InteractiveDocumentUser {
    id: number | null;
    name: string | null;
    email: string | null;
}

interface InteractiveDocumentSubmission {
    id: number;
    attempt_number: number;
    status: string;
    title: string;
    document_code: string | null;
    course_title: string | null;
    module_title: string | null;
    user: InteractiveDocumentUser;
    submitted_at: string | null;
    download_url: string;
}

interface PaginatedSubmissions {
    data: InteractiveDocumentSubmission[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

function formatDate(value: string | null): string {
    if (!value) return '-';
    return new Date(value).toLocaleString('es-MX', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
}

export default function Index({
    submissions,
    filters,
}: {
    submissions: PaginatedSubmissions;
    filters: { search?: string | null };
}) {
    const { data, setData, reset } = useForm({
        search: filters.search ?? '',
    });

    const applyFilters = () => {
        router.get('/admin/interactive-documents', data, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        reset();
        router.get(
            '/admin/interactive-documents',
            {},
            { preserveState: true, replace: true },
        );
    };

    const columns = [
        {
            header: 'Documento',
            accessor: (row: InteractiveDocumentSubmission) => (
                <div>
                    <div className="font-semibold">{row.title}</div>
                    <div className="text-sm text-base-content/60">
                        {row.course_title ?? 'Sin curso'}
                        {row.module_title ? ` · ${row.module_title}` : ''}
                    </div>
                    {(row.document_code || row.attempt_number) && (
                        <div className="text-xs text-base-content/50">
                            {row.document_code ? `${row.document_code} · ` : ''}
                            Intento {row.attempt_number}
                        </div>
                    )}
                </div>
            ),
        },
        {
            header: 'Usuario',
            accessor: (row: InteractiveDocumentSubmission) => (
                <div>
                    <div className="font-medium">
                        {row.user.name ?? 'Sin usuario'}
                    </div>
                    <div className="text-sm text-base-content/60">
                        {row.user.email}
                    </div>
                </div>
            ),
        },
        {
            header: 'Enviado',
            accessor: (row: InteractiveDocumentSubmission) =>
                formatDate(row.submitted_at),
        },
    ];

    return (
        <AdminLayout
            header={
                <PageHeader
                    title="Formularios interactivos"
                    description="Formularios contestados por los usuarios, disponibles para descargar en PDF"
                    breadcrumbs={[
                        { label: 'Admin', href: '/dashboard' },
                        { label: 'Formularios interactivos' },
                    ]}
                />
            }
        >
            <Alert />

            <div className="card mb-6 bg-base-100 shadow-xl">
                <div className="card-body space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="card-title">Búsqueda</h2>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="btn btn-outline btn-sm"
                                onClick={clearFilters}
                            >
                                Limpiar
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={applyFilters}
                            >
                                Aplicar
                            </button>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">
                                Usuario, documento o curso
                            </span>
                        </label>
                        <input
                            type="text"
                            className="input-bordered input w-full"
                            value={data.search}
                            onChange={(event) =>
                                setData('search', event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    applyFilters();
                                }
                            }}
                            placeholder="Buscar por nombre, correo, documento o curso"
                        />
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-0">
                    <DataTable
                        columns={columns}
                        data={submissions.data}
                        actions={(row) => (
                            <div className="flex justify-end">
                                <a
                                    href={row.download_url}
                                    className="btn text-primary btn-ghost btn-sm"
                                    title="Descargar PDF"
                                >
                                    <FileText className="h-4 w-4" />
                                    <span>Descargar PDF</span>
                                </a>
                            </div>
                        )}
                        emptyMessage="No hay formularios interactivos contestados."
                    />
                </div>
            </div>

            {submissions.last_page > 1 && (
                <div className="mt-6 flex justify-center">
                    <div className="join">
                        {Array.from(
                            { length: submissions.last_page },
                            (_, i) => i + 1,
                        ).map((page) => {
                            const params = new URLSearchParams();
                            params.set('page', String(page));
                            if (filters.search) {
                                params.set('search', filters.search);
                            }

                            return (
                                <Link
                                    key={page}
                                    href={`/admin/interactive-documents?${params.toString()}`}
                                    className={`btn join-item ${page === submissions.current_page ? 'btn-active' : ''}`}
                                >
                                    {page}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
