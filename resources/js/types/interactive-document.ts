export type InteractiveDocumentFieldType =
    | 'text'
    | 'textarea'
    | 'checkbox'
    | 'select'
    | 'radio'
    | 'date'
    | 'email'
    | 'number'
    | 'signature';

export interface InteractiveDocumentFieldOptionDetail {
    enabled: boolean;
    label: string;
    placeholder: string;
    help_text: string;
    required: boolean;
}

export interface InteractiveDocumentFieldOption {
    id: string;
    label: string;
    value: string;
    detail: InteractiveDocumentFieldOptionDetail;
}

export interface InteractiveDocumentField {
    id: string;
    key: string;
    label: string;
    type: InteractiveDocumentFieldType;
    required: boolean;
    placeholder: string;
    help_text: string;
    options: InteractiveDocumentFieldOption[];
}

export interface InteractiveDocumentConfig {
    title: string;
    introduction: string;
    submit_label: string;
    declaration_label: string;
    organization_name: string;
    document_code: string;
    footer_note: string;
    fields: InteractiveDocumentField[];
}

const DEFAULT_FIELDS: InteractiveDocumentField[] = [
    {
        id: 'field-full-name',
        key: 'full_name',
        label: 'Nombre completo',
        type: 'text',
        required: true,
        placeholder: 'Ingresa tu nombre completo',
        help_text: '',
        options: [],
    },
];

export function createDefaultInteractiveDocumentConfig(title = 'Nuevo documento interactivo'): InteractiveDocumentConfig {
    return {
        title,
        introduction: 'Completa la información obligatoria antes de enviar este documento.',
        submit_label: 'Enviar documento',
        declaration_label: 'Declaro que he leído y completado este documento.',
        organization_name: 'Academy',
        document_code: 'DOC-001',
        footer_note: 'Documento de uso interno. Conserva este comprobante como respaldo.',
        fields: DEFAULT_FIELDS.map((field) => ({ ...field, options: [...field.options] })),
    };
}

export function normalizeInteractiveDocumentConfig(
    rawConfig: unknown,
    fallbackTitle: string,
): InteractiveDocumentConfig {
    const config = typeof rawConfig === 'object' && rawConfig !== null
        ? (rawConfig as Partial<InteractiveDocumentConfig>)
        : {};

    return {
        title: typeof config.title === 'string' && config.title.trim() !== '' ? config.title : fallbackTitle,
        introduction: typeof config.introduction === 'string' ? config.introduction : '',
        submit_label: typeof config.submit_label === 'string' && config.submit_label.trim() !== '' ? config.submit_label : 'Enviar documento',
        declaration_label: typeof config.declaration_label === 'string' && config.declaration_label.trim() !== ''
            ? config.declaration_label
            : 'Declaro que he leído y completado este documento.',
        organization_name: typeof config.organization_name === 'string' && config.organization_name.trim() !== ''
            ? config.organization_name
            : 'Academy',
        document_code: typeof config.document_code === 'string' ? config.document_code : 'DOC-001',
        footer_note: typeof config.footer_note === 'string'
            ? config.footer_note
            : 'Documento de uso interno. Conserva este comprobante como respaldo.',
        fields: normalizeInteractiveDocumentFields(config.fields),
    };
}

export function normalizeInteractiveDocumentFields(rawFields: unknown): InteractiveDocumentField[] {
    if (!Array.isArray(rawFields) || rawFields.length === 0) {
        return DEFAULT_FIELDS.map((field) => ({ ...field, options: [...field.options] }));
    }

    const seenIds = new Set<string>();
    const seenKeys = new Set<string>();

    return rawFields
        .filter((field): field is Record<string, unknown> => typeof field === 'object' && field !== null)
        .map((field, index) => {
            const rawKey = typeof field.key === 'string' && field.key.trim() !== ''
                ? field.key.trim()
                : `field_${index + 1}`;
            const uniqueKey = ensureUniqueValue(rawKey, seenKeys, '_');
            const rawId = typeof field.id === 'string' && field.id.trim() !== ''
                ? field.id.trim()
                : `field-${uniqueKey}`;
            const uniqueId = ensureUniqueValue(rawId, seenIds, '-');

            return {
                id: uniqueId,
                key: uniqueKey,
                label: typeof field.label === 'string' && field.label.trim() !== '' ? field.label : `Campo ${index + 1}`,
                type: isFieldType(field.type) ? field.type : 'text',
                required: Boolean(field.required),
                placeholder: typeof field.placeholder === 'string' ? field.placeholder : '',
                help_text: typeof field.help_text === 'string' ? field.help_text : '',
                options: normalizeInteractiveDocumentOptions(field.options, uniqueKey),
            };
        });
}

function isFieldType(value: unknown): value is InteractiveDocumentFieldType {
    return ['text', 'textarea', 'checkbox', 'select', 'radio', 'date', 'email', 'number', 'signature'].includes(String(value));
}

function normalizeInteractiveDocumentOptions(rawOptions: unknown, fieldKey: string): InteractiveDocumentFieldOption[] {
    if (!Array.isArray(rawOptions)) {
        return [];
    }

    const seenIds = new Set<string>();

    return rawOptions
        .map((option, index) => normalizeInteractiveDocumentOption(option, fieldKey, index, seenIds))
        .filter((option): option is InteractiveDocumentFieldOption => option !== null);
}

function normalizeInteractiveDocumentOption(
    rawOption: unknown,
    fieldKey: string,
    index: number,
    seenIds: Set<string>,
): InteractiveDocumentFieldOption | null {
    if (typeof rawOption === 'string') {
        const normalized = rawOption.trim();
        if (normalized === '') {
            return null;
        }

        return {
            id: ensureUniqueValue(`${fieldKey}-option-${index + 1}`, seenIds, '-'),
            label: normalized,
            value: normalized,
            detail: defaultOptionDetail(),
        };
    }

    if (typeof rawOption !== 'object' || rawOption === null) {
        return null;
    }

    const option = rawOption as Partial<InteractiveDocumentFieldOption> & {
        detail?: Partial<InteractiveDocumentFieldOptionDetail>;
    };
    const label = typeof option.label === 'string' && option.label.trim() !== ''
        ? option.label.trim()
        : typeof option.value === 'string' && option.value.trim() !== ''
            ? option.value.trim()
            : `Opcion ${index + 1}`;
    const value = typeof option.value === 'string' && option.value.trim() !== ''
        ? option.value.trim()
        : label;

    return {
        id: ensureUniqueValue(
            typeof option.id === 'string' && option.id.trim() !== '' ? option.id : `${fieldKey}-option-${index + 1}`,
            seenIds,
            '-',
        ),
        label,
        value,
        detail: normalizeOptionDetail(option.detail),
    };
}

function ensureUniqueValue(baseValue: string, seen: Set<string>, separator: '_' | '-'): string {
    const normalized = baseValue.trim() || 'item';
    let candidate = normalized;
    let counter = 2;

    while (seen.has(candidate)) {
        candidate = `${normalized}${separator}${counter}`;
        counter += 1;
    }

    seen.add(candidate);
    return candidate;
}

function normalizeOptionDetail(rawDetail: unknown): InteractiveDocumentFieldOptionDetail {
    if (typeof rawDetail !== 'object' || rawDetail === null) {
        return defaultOptionDetail();
    }

    const detail = rawDetail as Partial<InteractiveDocumentFieldOptionDetail>;

    return {
        enabled: Boolean(detail.enabled),
        label: typeof detail.label === 'string' ? detail.label : '',
        placeholder: typeof detail.placeholder === 'string' ? detail.placeholder : '',
        help_text: typeof detail.help_text === 'string' ? detail.help_text : '',
        required: Boolean(detail.required),
    };
}

function defaultOptionDetail(): InteractiveDocumentFieldOptionDetail {
    return {
        enabled: false,
        label: '',
        placeholder: '',
        help_text: '',
        required: false,
    };
}

export function createInteractiveDocumentOption(fieldKey: string, index: number): InteractiveDocumentFieldOption {
    return {
        id: `${fieldKey || 'field'}-option-${Date.now()}-${index + 1}`,
        label: `Opcion ${index + 1}`,
        value: `opcion_${index + 1}`,
        detail: defaultOptionDetail(),
    };
}

export function getInteractiveDocumentOptionDetailKey(fieldKey: string, optionId: string): string {
    return `${fieldKey}__detail__${optionId}`;
}

export function findInteractiveDocumentOptionByValue(
    field: InteractiveDocumentField,
    value: string | boolean | undefined,
): InteractiveDocumentFieldOption | null {
    if (typeof value !== 'string' || value.trim() === '') {
        return null;
    }

    return field.options.find((option) => option.value === value) ?? null;
}

export function syncInteractiveDocumentTokens(bodyHtml: string, fields: InteractiveDocumentField[]): string {
    if (typeof window === 'undefined' || !bodyHtml) {
        return bodyHtml;
    }

    const parser = new DOMParser();
    const document = parser.parseFromString(bodyHtml, 'text/html');
    const fieldMap = new Map<string, InteractiveDocumentField>();

    fields.forEach((field) => {
        fieldMap.set(field.id, field);
        fieldMap.set(field.key, field);
    });

    document.querySelectorAll<HTMLElement>('[data-document-field-id], [data-document-field-key]').forEach((element) => {
        const id = element.dataset.documentFieldId ?? element.dataset.documentFieldKey;
        if (!id) {
            element.remove();
            return;
        }

        const field = fieldMap.get(id);
        if (!field) {
            element.remove();
            return;
        }

        element.dataset.documentFieldId = field.id;
        element.dataset.documentFieldKey = field.key;
        element.dataset.documentFieldLabel = field.label;
        element.textContent = `{{${field.label}}}`;
    });

    return document.body.innerHTML;
}
