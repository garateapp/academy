import {
    findInteractiveDocumentOptionByValue,
    getInteractiveDocumentOptionDetailKey,
    normalizeInteractiveDocumentConfig,
    type InteractiveDocumentConfig,
    type InteractiveDocumentField,
    type InteractiveDocumentFieldOption,
} from '@/types/interactive-document';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Dispatch, PointerEvent as ReactPointerEvent, SetStateAction } from 'react';

interface InteractiveDocumentData extends InteractiveDocumentConfig {
    submission_id?: number | null;
    attempt_number?: number | null;
    body: string;
    status: string;
    opened_at: string | null;
    updated_at?: string | null;
    submitted_at: string | null;
    completed_at: string | null;
    responses: Record<string, string | boolean>;
    declaration_accepted: boolean;
    can_start_new_attempt?: boolean;
    submissions?: Array<{
        id: number;
        attempt_number: number;
        status: string;
        submitted_at: string | null;
        completed_at: string | null;
        receipt_url: string | null;
    }>;
}

const getCsrfToken = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
};

export default function InteractiveDocumentModule({
    moduleId,
    document,
    readonly,
    onSubmitted,
}: {
    moduleId: number;
    document: InteractiveDocumentData;
    readonly: boolean;
    onSubmitted: () => void;
}) {
    const documentConfig = useMemo(
        () => normalizeInteractiveDocumentConfig(document, document.title),
        [document],
    );
    const [responses, setResponses] = useState<Record<string, string | boolean>>(document.responses || {});
    const [declarationAccepted, setDeclarationAccepted] = useState(document.declaration_accepted);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(readonly || document.status === 'submitted');
    const [activeSubmissionId, setActiveSubmissionId] = useState<number | null>(document.submission_id ?? null);
    const [activeAttemptNumber, setActiveAttemptNumber] = useState<number | null>(document.attempt_number ?? null);
    const [activeSubmittedAt, setActiveSubmittedAt] = useState<string | null>(document.submitted_at ?? null);
    const [submissionHistory, setSubmissionHistory] = useState(document.submissions ?? []);
    const [draftStatus, setDraftStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>(
        document.status === 'in_progress' ? 'saved' : 'idle',
    );
    const [draftSavedAt, setDraftSavedAt] = useState<string | null>(document.updated_at ?? null);
    const [isClient, setIsClient] = useState(false);
    const draftTimerRef = useRef<number | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setResponses(document.responses || {});
        setDeclarationAccepted(document.declaration_accepted);
        setSubmitted(readonly || document.status === 'submitted');
        setActiveSubmissionId(document.submission_id ?? null);
        setActiveAttemptNumber(document.attempt_number ?? null);
        setActiveSubmittedAt(document.submitted_at ?? null);
        setSubmissionHistory(document.submissions ?? []);
        setDraftSavedAt(document.updated_at ?? null);
    }, [document, readonly]);

    useEffect(() => {
        if (submitted) {
            return;
        }

        void fetch(`/modules/${moduleId}/interactive-document/open`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getCsrfToken(),
            },
            body: JSON.stringify({}),
        });
    }, [moduleId, submitted]);

    useEffect(() => {
        if (readonly || submitted) {
            return;
        }

        if (draftTimerRef.current) {
            window.clearTimeout(draftTimerRef.current);
        }

        setDraftStatus('saving');

        draftTimerRef.current = window.setTimeout(async () => {
            try {
                const response = await fetch(`/modules/${moduleId}/interactive-document/draft`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': getCsrfToken(),
                    },
                    body: JSON.stringify({
                        responses,
                        declaration_accepted: declarationAccepted,
                    }),
                });

                if (!response.ok) {
                    throw new Error('No se pudo guardar el borrador');
                }

                const payload = (await response.json()) as {
                    submission?: {
                        id?: number | null;
                        attempt_number?: number | null;
                        updated_at?: string | null;
                    };
                };

                setDraftStatus('saved');
                setActiveSubmissionId((current) => payload.submission?.id ?? current);
                setActiveAttemptNumber((current) => payload.submission?.attempt_number ?? current);
                setDraftSavedAt(payload.submission?.updated_at ?? new Date().toISOString());
            } catch {
                setDraftStatus('error');
            }
        }, 900);

        return () => {
            if (draftTimerRef.current) {
                window.clearTimeout(draftTimerRef.current);
            }
        };
    }, [moduleId, responses, declarationAccepted, readonly, submitted]);

    useEffect(() => {
        setErrors((current) => {
            let changed = false;
            const next = { ...current };
            const activeDetailKeys = new Set(
                documentConfig.fields
                    .map((field) => {
                        const selectedOption = findInteractiveDocumentOptionByValue(field, responses[field.key]);
                        if (!selectedOption || !selectedOption.detail.enabled) {
                            return null;
                        }

                        return getInteractiveDocumentOptionDetailKey(field.key, selectedOption.id);
                    })
                    .filter((key): key is string => key !== null),
            );

            Object.keys(current).forEach((key) => {
                if (key === 'document') {
                    return;
                }

                if (key === 'declaration') {
                    if (declarationAccepted) {
                        delete next[key];
                        changed = true;
                    }

                    return;
                }

                if (key.includes('__detail__') && !activeDetailKeys.has(key)) {
                    delete next[key];
                    changed = true;
                    return;
                }

                const value = responses[key];
                if ((typeof value === 'string' && value.trim() !== '') || value === true) {
                    delete next[key];
                    changed = true;
                }
            });

            return changed ? next : current;
        });
    }, [declarationAccepted, documentConfig.fields, responses]);

    const { renderedNodes, placedFieldKeys } = useMemo(
        () => renderFormalDocumentBody(document.body, documentConfig.fields, responses, setResponses, errors, submitted || readonly, isClient),
        [document.body, documentConfig.fields, errors, isClient, readonly, responses, submitted],
    );

    const orphanFields = useMemo(
        () => documentConfig.fields.filter((field) => !placedFieldKeys.has(field.id)),
        [documentConfig.fields, placedFieldKeys],
    );

    const handleSubmit = async () => {
        setProcessing(true);
        setErrors({});

        try {
            const response = await fetch(`/modules/${moduleId}/interactive-document/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({
                    responses,
                    declaration_accepted: declarationAccepted,
                }),
            });

            if (response.status === 422) {
                const payload = (await response.json()) as {
                    errors?: Record<string, string | string[]>;
                };
                const nextErrors = Object.fromEntries(
                    Object.entries(payload.errors || {}).map(([key, value]) => [
                        key,
                        Array.isArray(value) ? value[0] : value,
                    ]),
                );
                setErrors(nextErrors);
                return;
            }

            if (!response.ok) {
                throw new Error('No se pudo enviar el documento');
            }

            const payload = (await response.json()) as {
                submission?: {
                    id?: number | null;
                    attempt_number?: number | null;
                    submitted_at?: string | null;
                    completed_at?: string | null;
                };
            };

            setSubmitted(true);
            setDraftStatus('saved');
            setActiveSubmissionId((current) => payload.submission?.id ?? current);
            setActiveAttemptNumber((current) => payload.submission?.attempt_number ?? current);
            setActiveSubmittedAt(payload.submission?.submitted_at ?? new Date().toISOString());
            setSubmissionHistory((current) => {
                const submittedAt = payload.submission?.submitted_at ?? new Date().toISOString();
                const receiptUrl = payload.submission?.id
                    ? `/modules/${moduleId}/interactive-document/receipt?submission=${payload.submission.id}`
                    : `/modules/${moduleId}/interactive-document/receipt`;
                const nextItem = {
                    id: payload.submission?.id ?? Date.now(),
                    attempt_number: payload.submission?.attempt_number ?? current.length + 1,
                    status: 'submitted',
                    submitted_at: submittedAt,
                    completed_at: payload.submission?.completed_at ?? submittedAt,
                    receipt_url: receiptUrl,
                };

                return [nextItem, ...current.filter((item) => item.id !== nextItem.id)];
            });
            onSubmitted();
        } catch {
            setErrors({
                document: 'No se pudo enviar el documento. Intenta nuevamente.',
            });
        } finally {
            setProcessing(false);
        }
    };

    const handleStartNewAttempt = async () => {
        setProcessing(true);
        setErrors({});

        try {
            const response = await fetch(`/modules/${moduleId}/interactive-document/new-attempt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                throw new Error('No se pudo iniciar un nuevo registro');
            }

            const payload = await response.json() as {
                submission?: {
                    id: number;
                    attempt_number: number;
                    updated_at?: string | null;
                    responses?: Record<string, string | boolean>;
                    declaration_accepted?: boolean;
                };
            };

            setSubmitted(false);
            setResponses(payload.submission?.responses ?? {});
            setDeclarationAccepted(Boolean(payload.submission?.declaration_accepted ?? false));
            setActiveSubmissionId(payload.submission?.id ?? null);
            setActiveAttemptNumber(payload.submission?.attempt_number ?? null);
            setActiveSubmittedAt(null);
            setDraftSavedAt(payload.submission?.updated_at ?? null);
            setDraftStatus('idle');
        } catch {
            setErrors({
                document: 'No se pudo iniciar un nuevo registro. Intenta nuevamente.',
            });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-[#f5f1e8] shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="border-b border-stone-200 bg-white/85 px-6 py-4 backdrop-blur">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                            Documento formal
                        </p>
                        <h2 className="mt-2 font-serif text-2xl text-stone-900">{documentConfig.title}</h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-stone-300 px-3 py-1 text-xs uppercase tracking-[0.2em] text-stone-600">
                            {documentConfig.document_code}
                        </span>
                        {activeAttemptNumber && (
                            <span className="rounded-full border border-stone-300 px-3 py-1 text-xs uppercase tracking-[0.2em] text-stone-600">
                                Intento {activeAttemptNumber}
                            </span>
                        )}
                        {submitted ? (
                            <span className="badge badge-success">Enviado</span>
                        ) : (
                            <span className="badge badge-outline">Pendiente</span>
                        )}
                    </div>
                </div>
                {!submitted && (
                    <div className="mt-3 text-xs text-stone-500">
                        {draftStatus === 'saving' && 'Guardando borrador...'}
                        {draftStatus === 'saved' && draftSavedAt && `Borrador guardado: ${new Date(draftSavedAt).toLocaleTimeString()}`}
                        {draftStatus === 'error' && 'No se pudo guardar el borrador automatico.'}
                        {draftStatus === 'idle' && 'Completa el documento para continuar.'}
                    </div>
                )}
            </div>

            <div className="px-4 py-5 md:px-8 md:py-8">
                <div className="mx-auto max-w-4xl rounded-[1.75rem] border border-stone-200 bg-white px-6 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.10)] md:px-12 md:py-12">
                    <div className="border-b border-stone-200 pb-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
                                    {documentConfig.organization_name}
                                </p>
                                <h1 className="mt-4 font-serif text-3xl leading-tight text-stone-950 md:text-4xl">
                                    {documentConfig.title}
                                </h1>
                            </div>
                            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-right">
                                <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500">Codigo</p>
                                <p className="mt-1 text-sm font-semibold text-stone-800">{documentConfig.document_code}</p>
                            </div>
                        </div>

                        {documentConfig.introduction && (
                            <p className="mt-6 max-w-3xl text-[15px] leading-8 text-stone-600">
                                {documentConfig.introduction}
                            </p>
                        )}
                    </div>

                    <div className="prose prose-stone mt-8 max-w-none text-[15px] leading-8 text-stone-700">
                        {renderedNodes}
                    </div>

                    {orphanFields.length > 0 && (
                        <div className="mt-10 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                            <h3 className="font-serif text-xl text-stone-900">Campos complementarios</h3>
                            <div className="mt-5 space-y-5">
                                {orphanFields.map((field) => (
                                    <FieldControl
                                        key={field.key}
                                        field={field}
                                        responses={responses}
                                        errors={errors}
                                        disabled={submitted || readonly}
                                        onChange={setResponses}
                                        standalone
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {documentConfig.declaration_label && (
                        <div className="mt-10 rounded-[1.5rem] border border-amber-200 bg-amber-50/70 p-5">
                            <label className="flex items-start gap-3 text-sm leading-7 text-stone-800">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary mt-1"
                                    disabled={readonly || submitted}
                                    checked={declarationAccepted}
                                    onChange={(event) => setDeclarationAccepted(event.target.checked)}
                                />
                                <span>{documentConfig.declaration_label}</span>
                            </label>
                            {errors.declaration && (
                                <p className="mt-2 text-xs text-rose-500">{errors.declaration}</p>
                            )}
                        </div>
                    )}

                    {errors.document && (
                        <p className="mt-5 text-sm text-rose-600">{errors.document}</p>
                    )}

                    <div className="mt-10 border-t border-stone-200 pt-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <p className="max-w-2xl text-xs uppercase tracking-[0.18em] text-stone-500">
                                {documentConfig.footer_note}
                            </p>

                            <div className="flex flex-wrap items-center gap-3">
                                {!submitted && !readonly && (
                                    <button
                                        className="btn btn-primary min-w-52"
                                        disabled={processing}
                                        onClick={handleSubmit}
                                        type="button"
                                    >
                                        {processing && <span className="loading loading-spinner loading-sm"></span>}
                                        {documentConfig.submit_label}
                                    </button>
                                )}

                                {submitted && (
                                    <>
                                        <a
                                            href={activeSubmissionId
                                                ? `/modules/${moduleId}/interactive-document/receipt?submission=${activeSubmissionId}`
                                                : `/modules/${moduleId}/interactive-document/receipt`}
                                            className="btn btn-outline"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Descargar comprobante
                                        </a>
                                        {document.can_start_new_attempt && (
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                disabled={processing}
                                                onClick={handleStartNewAttempt}
                                            >
                                                Nuevo registro
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {submitted && activeSubmittedAt && (
                            <p className="mt-4 text-xs text-stone-500">
                                Enviado el {new Date(activeSubmittedAt).toLocaleString()}
                            </p>
                        )}
                    </div>

                    {submissionHistory.length > 0 && (
                        <div className="mt-8 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-serif text-xl text-stone-900">Historial del documento</h3>
                                    <p className="text-sm text-stone-500">
                                        Registros anteriores del mismo documento dentro de este curso.
                                    </p>
                                </div>
                                <span className="rounded-full border border-stone-300 px-3 py-1 text-xs uppercase tracking-[0.18em] text-stone-500">
                                    {submissionHistory.length} registros
                                </span>
                            </div>

                            <div className="mt-4 space-y-3">
                                {submissionHistory.map((submission) => (
                                    <div
                                        key={submission.id}
                                        className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between"
                                    >
                                        <div>
                                            <div className="font-medium text-stone-800">
                                                Intento {submission.attempt_number}
                                            </div>
                                            <div className="text-xs text-stone-500">
                                                {submission.submitted_at
                                                    ? `Enviado el ${new Date(submission.submitted_at).toLocaleString()}`
                                                    : 'Borrador en progreso'}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`badge ${submission.status === 'submitted' ? 'badge-success' : 'badge-outline'}`}>
                                                {submission.status === 'submitted' ? 'Enviado' : 'Borrador'}
                                            </span>
                                            {submission.receipt_url && (
                                                <a
                                                    href={submission.receipt_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-ghost btn-sm"
                                                >
                                                    Comprobante
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function renderFormalDocumentBody(
    bodyHtml: string,
    fields: InteractiveDocumentField[],
    responses: Record<string, string | boolean>,
    setResponses: Dispatch<SetStateAction<Record<string, string | boolean>>>,
    errors: Record<string, string>,
    disabled: boolean,
    isClient: boolean,
) {
    if (!isClient) {
        return {
            renderedNodes: (
                <div
                    className="space-y-4"
                    dangerouslySetInnerHTML={{ __html: bodyHtml || '<p></p>' }}
                />
            ),
            placedFieldKeys: new Set<string>(),
        };
    }

    const parser = new DOMParser();
    const parsed = parser.parseFromString(bodyHtml || '<p></p>', 'text/html');
    const fieldMap = new Map<string, InteractiveDocumentField>();
    fields.forEach((field) => {
        fieldMap.set(field.id, field);
        fieldMap.set(field.key, field);
    });
    const placedFieldKeys = new Set<string>();

    const renderNode = (node: ChildNode, key: string): React.ReactNode => {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
        }

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return null;
        }

        const element = node as HTMLElement;
        const fieldId = element.dataset.documentFieldId ?? element.dataset.documentFieldKey;
        if (fieldId) {
            const field = fieldMap.get(fieldId);
            if (!field) {
                return null;
            }

            placedFieldKeys.add(field.id);

            return (
                <FieldControl
                    key={key}
                    field={field}
                    responses={responses}
                    errors={errors}
                    disabled={disabled}
                    onChange={setResponses}
                />
            );
        }

        const children = Array.from(element.childNodes).map((child, index) =>
            renderNode(child, `${key}-${index}`),
        );

        switch (element.tagName.toLowerCase()) {
            case 'h1':
                return <h1 key={key} className="font-serif text-3xl leading-tight text-stone-950">{children}</h1>;
            case 'h2':
                return <h2 key={key} className="mt-8 font-serif text-2xl leading-tight text-stone-900">{children}</h2>;
            case 'h3':
                return <h3 key={key} className="mt-6 font-serif text-xl text-stone-900">{children}</h3>;
            case 'p':
                return <p key={key} className="my-4 text-[15px] leading-8 text-stone-700">{children}</p>;
            case 'ul':
                return <ul key={key} className="my-4 list-disc space-y-2 pl-6">{children}</ul>;
            case 'ol':
                return <ol key={key} className="my-4 list-decimal space-y-2 pl-6">{children}</ol>;
            case 'li':
                return <li key={key}>{children}</li>;
            case 'blockquote':
                return <blockquote key={key} className="my-6 border-l-4 border-stone-300 pl-5 italic text-stone-600">{children}</blockquote>;
            case 'table':
                return (
                    <div key={key} className="my-6 overflow-x-auto">
                        <table className="min-w-full border-collapse overflow-hidden rounded-2xl border border-stone-300">
                            {children}
                        </table>
                    </div>
                );
            case 'thead':
                return <thead key={key} className="bg-stone-100">{children}</thead>;
            case 'tbody':
                return <tbody key={key}>{children}</tbody>;
            case 'tr':
                return <tr key={key} className="border-b border-stone-200 last:border-b-0">{children}</tr>;
            case 'th':
                return <th key={key} className="border border-stone-300 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">{children}</th>;
            case 'td':
                return <td key={key} className="border border-stone-300 px-4 py-3 align-top text-sm text-stone-700">{children}</td>;
            case 'strong':
                return <strong key={key} className="font-semibold text-stone-900">{children}</strong>;
            case 'em':
                return <em key={key} className="italic">{children}</em>;
            case 'u':
                return <u key={key}>{children}</u>;
            case 'br':
                return <br key={key} />;
            case 'div':
                return <div key={key}>{children}</div>;
            case 'span':
                return <span key={key}>{children}</span>;
            default:
                return <span key={key}>{children}</span>;
        }
    };

    return {
        renderedNodes: Array.from(parsed.body.childNodes).map((node, index) =>
            renderNode(node, `node-${index}`),
        ),
        placedFieldKeys,
    };
}

function FieldControl({
    field,
    responses,
    errors,
    disabled,
    onChange,
    standalone = false,
}: {
    field: InteractiveDocumentField;
    responses: Record<string, string | boolean>;
    errors: Record<string, string>;
    disabled: boolean;
    onChange: Dispatch<SetStateAction<Record<string, string | boolean>>>;
    standalone?: boolean;
}) {
    const sharedClass = standalone
        ? 'w-full'
        : 'mx-1 inline-flex min-w-[220px] max-w-full align-middle';
    const value = responses[field.key];
    const error = errors[field.key];
    const selectedOption = findInteractiveDocumentOptionByValue(field, value);

    const updateValue = (nextValue: string | boolean) => {
        onChange((current) => {
            const next = { ...current, [field.key]: nextValue };

            if (field.type === 'radio' || field.type === 'select') {
                field.options.forEach((option) => {
                    const detailKey = getInteractiveDocumentOptionDetailKey(field.key, option.id);
                    if (option.value !== nextValue) {
                        next[detailKey] = '';
                    }
                });
            }

            return next;
        });
    };

    const updateDetail = (option: InteractiveDocumentFieldOption, nextValue: string) => {
        const detailKey = getInteractiveDocumentOptionDetailKey(field.key, option.id);
        onChange((current) => ({
            ...current,
            [detailKey]: nextValue,
        }));
    };

    return (
        <span className={sharedClass}>
            <span className="flex w-full flex-col">
                {field.type !== 'checkbox' && field.type !== 'signature' && (
                    <span className="mb-1 text-[11px] uppercase tracking-[0.18em] text-stone-500">
                        {field.label}
                        {field.required ? ' *' : ''}
                    </span>
                )}

                {field.type === 'textarea' && (
                    <textarea
                        className="textarea textarea-bordered min-h-28 w-full rounded-2xl border-stone-300 bg-stone-50 text-sm"
                        disabled={disabled}
                        placeholder={field.placeholder}
                        value={typeof value === 'string' ? value : ''}
                        onChange={(event) => updateValue(event.target.value)}
                    ></textarea>
                )}

                {['text', 'date', 'email', 'number'].includes(field.type) && (
                    <input
                        type={field.type}
                        className="input input-bordered w-full rounded-2xl border-stone-300 bg-stone-50 text-sm"
                        disabled={disabled}
                        placeholder={field.placeholder}
                        value={typeof value === 'string' ? value : ''}
                        onChange={(event) => updateValue(event.target.value)}
                    />
                )}

                {field.type === 'select' && (
                    <div className="space-y-3">
                        <select
                            className="select select-bordered w-full rounded-2xl border-stone-300 bg-stone-50 text-sm"
                            disabled={disabled}
                            value={typeof value === 'string' ? value : ''}
                            onChange={(event) => updateValue(event.target.value)}
                        >
                            <option value="">Selecciona</option>
                            {field.options.map((option) => (
                                <option key={option.id} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <ConditionalDetailField
                            field={field}
                            option={selectedOption}
                            responses={responses}
                            errors={errors}
                            disabled={disabled}
                            onChange={updateDetail}
                        />
                    </div>
                )}

                {field.type === 'radio' && (
                    <span className="space-y-3">
                        <span className="rounded-2xl">
                            <span className="grid gap-3 md:grid-cols-2">
                                {field.options.map((option) => (
                                    <label
                                        key={option.id}
                                        className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                                            value === option.value
                                                ? 'border-emerald-300 bg-white shadow-sm'
                                                : 'border-stone-200 bg-white/70'
                                        } ${disabled ? 'cursor-not-allowed opacity-70' : 'hover:border-stone-300'}`}
                                    >
                                        <input
                                            type="radio"
                                            className="radio radio-primary radio-sm"
                                            disabled={disabled}
                                            checked={value === option.value}
                                            onChange={() => updateValue(option.value)}
                                        />
                                        <span className="pt-0.5 font-medium text-stone-700">{option.label}</span>
                                    </label>
                                ))}
                            </span>
                        </span>
                        <ConditionalDetailField
                            field={field}
                            option={selectedOption}
                            responses={responses}
                            errors={errors}
                            disabled={disabled}
                            onChange={updateDetail}
                        />
                    </span>
                )}

                {field.type === 'checkbox' && (
                    <label className="inline-flex items-start gap-3 rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary checkbox-sm mt-0.5"
                            disabled={disabled}
                            checked={Boolean(value)}
                            onChange={(event) => updateValue(event.target.checked)}
                        />
                        <span>
                            {field.placeholder || field.label}
                            {field.required ? ' *' : ''}
                        </span>
                    </label>
                )}

                {field.type === 'signature' && (
                    <SignatureCanvasField
                        label={field.label}
                        required={field.required}
                        value={typeof value === 'string' ? value : ''}
                        disabled={disabled}
                        error={error}
                        helpText={field.help_text}
                        onChange={(nextValue) => updateValue(nextValue)}
                    />
                )}

                {field.type !== 'signature' && field.help_text && (
                    <span className="mt-1 text-xs text-stone-500">{field.help_text}</span>
                )}

                {field.type !== 'signature' && error && (
                    <span className="mt-1 text-xs text-rose-500">{error}</span>
                )}
            </span>
        </span>
    );
}

function SignatureCanvasField({
    label,
    required,
    value,
    disabled,
    error,
    helpText,
    onChange,
}: {
    label: string;
    required: boolean;
    value: string;
    disabled: boolean;
    error?: string;
    helpText?: string;
    onChange: (value: string) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const drawingRef = useRef(false);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context) {
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (!value) {
            return;
        }

        const image = new Image();
        image.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        image.src = value;
    }, [value]);

    const withContext = (callback: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context) {
            return;
        }

        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 2.5;
        context.strokeStyle = '#111827';
        context.fillStyle = '#111827';

        callback(canvas, context);
    };

    const getPoint = (event: ReactPointerEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();

        return {
            x: ((event.clientX - rect.left) * canvas.width) / rect.width,
            y: ((event.clientY - rect.top) * canvas.height) / rect.height,
        };
    };

    const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        if (disabled) {
            return;
        }

        withContext((canvas, context) => {
            const point = getPoint(event, canvas);
            drawingRef.current = true;
            lastPointRef.current = point;
            canvas.setPointerCapture(event.pointerId);

            context.beginPath();
            context.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
            context.fill();
        });
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        if (disabled || !drawingRef.current) {
            return;
        }

        withContext((canvas, context) => {
            const nextPoint = getPoint(event, canvas);
            const previousPoint = lastPointRef.current ?? nextPoint;

            context.beginPath();
            context.moveTo(previousPoint.x, previousPoint.y);
            context.lineTo(nextPoint.x, nextPoint.y);
            context.stroke();

            lastPointRef.current = nextPoint;
        });
    };

    const commitSignature = () => {
        withContext((canvas) => {
            onChange(canvas.toDataURL('image/png'));
        });
    };

    const handlePointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        if (disabled || !drawingRef.current) {
            return;
        }

        drawingRef.current = false;
        lastPointRef.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        commitSignature();
    };

    const clearSignature = () => {
        withContext((canvas, context) => {
            drawingRef.current = false;
            lastPointRef.current = null;
            context.clearRect(0, 0, canvas.width, canvas.height);
        });

        onChange('');
    };

    return (
        <div className="rounded-[1.5rem] border border-stone-300 bg-stone-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                        {label}
                        {required ? ' *' : ''}
                    </p>
                    <p className="mt-1 text-sm text-stone-600">
                        Dibuja tu firma dentro del recuadro.
                    </p>
                </div>
                {!disabled && (
                    <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={clearSignature}
                    >
                        Limpiar firma
                    </button>
                )}
            </div>

            <div className="mt-4 rounded-[1.25rem] border border-dashed border-stone-300 bg-white p-3">
                <canvas
                    ref={canvasRef}
                    width={720}
                    height={220}
                    className={`block h-44 w-full rounded-xl bg-white touch-none ${
                        disabled ? 'cursor-default' : 'cursor-crosshair'
                    }`}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                />
            </div>

            {!value && (
                <p className="mt-3 text-xs text-stone-500">
                    Aun no hay una firma registrada.
                </p>
            )}

            {helpText && (
                <span className="mt-2 block text-xs text-stone-500">{helpText}</span>
            )}

            {error && (
                <span className="mt-2 block text-xs text-rose-500">{error}</span>
            )}
        </div>
    );
}

function ConditionalDetailField({
    field,
    option,
    responses,
    errors,
    disabled,
    onChange,
}: {
    field: InteractiveDocumentField;
    option: InteractiveDocumentFieldOption | null;
    responses: Record<string, string | boolean>;
    errors: Record<string, string>;
    disabled: boolean;
    onChange: (option: InteractiveDocumentFieldOption, value: string) => void;
}) {
    if (!option || !option.detail.enabled) {
        return null;
    }

    const detailKey = getInteractiveDocumentOptionDetailKey(field.key, option.id);
    const detailLabel = option.detail.label || `Detalle para ${option.label}`;

    return (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-4">
            <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-emerald-800">
                {detailLabel}
                {option.detail.required ? ' *' : ''}
            </label>
            <input
                type="text"
                className="input input-bordered w-full rounded-2xl border-emerald-200 bg-white text-sm"
                disabled={disabled}
                placeholder={option.detail.placeholder || 'Ingresa el detalle de tu selección'}
                value={typeof responses[detailKey] === 'string' ? (responses[detailKey] as string) : ''}
                onChange={(event) => onChange(option, event.target.value)}
            />
            {option.detail.help_text && (
                <p className="mt-2 text-xs text-emerald-800/80">{option.detail.help_text}</p>
            )}
            {errors[detailKey] && (
                <p className="mt-2 text-xs text-rose-500">{errors[detailKey]}</p>
            )}
        </div>
    );
}
