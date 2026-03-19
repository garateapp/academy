import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    createInteractiveDocumentOption,
    normalizeInteractiveDocumentConfig,
    syncInteractiveDocumentTokens,
    type InteractiveDocumentConfig,
    type InteractiveDocumentField,
    type InteractiveDocumentFieldOption,
    type InteractiveDocumentFieldOptionDetail,
    type InteractiveDocumentFieldType,
} from '@/types/interactive-document';
import { Copy, Eye, GripVertical, Minus, Plus, Settings2, Table2, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

const FIELD_TYPES: Array<{ value: InteractiveDocumentFieldType; label: string }> = [
    { value: 'text', label: 'Texto corto' },
    { value: 'textarea', label: 'Texto largo' },
    { value: 'signature', label: 'Firma manuscrita' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'select', label: 'Seleccionable' },
    { value: 'radio', label: 'Opcion unica' },
    { value: 'date', label: 'Fecha' },
    { value: 'email', label: 'Correo' },
    { value: 'number', label: 'Numero' },
];

const AUTOSAVE_DELAY = 1800;
const TABLE_COLUMN_STEP = 8;

interface TableSelectionContext {
    rowIndex: number;
    columnIndex: number;
    rowCount: number;
    columnCount: number;
}

function newField(index: number): InteractiveDocumentField {
    return {
        id: `field-${Date.now()}-${index}`,
        key: `field_${index + 1}`,
        label: `Campo ${index + 1}`,
        type: 'text',
        required: false,
        placeholder: '',
        help_text: '',
        options: [],
    };
}

function cloneConfig(config: InteractiveDocumentConfig): InteractiveDocumentConfig {
    return {
        ...config,
        fields: config.fields.map((field) => ({
            ...field,
            options: field.options.map((option) => ({
                ...option,
                detail: { ...option.detail },
            })),
        })),
    };
}

function buildUniqueFieldKey(baseKey: string, fields: InteractiveDocumentField[]): string {
    const existingKeys = new Set(fields.map((field) => field.key));
    const seed = `${baseKey || 'field'}_copy`;
    let candidate = seed;
    let counter = 2;

    while (existingKeys.has(candidate)) {
        candidate = `${seed}_${counter}`;
        counter += 1;
    }

    return candidate;
}

function buildUniqueFieldLabel(baseLabel: string, fields: InteractiveDocumentField[]): string {
    const existingLabels = new Set(fields.map((field) => field.label));
    const seed = `${baseLabel || 'Campo'} (copia)`;
    let candidate = seed;
    let counter = 2;

    while (existingLabels.has(candidate)) {
        candidate = `${seed} ${counter}`;
        counter += 1;
    }

    return candidate;
}

function duplicateFieldDefinition(
    source: InteractiveDocumentField,
    fields: InteractiveDocumentField[],
): InteractiveDocumentField {
    const nextKey = buildUniqueFieldKey(source.key, fields);
    const timestamp = Date.now();

    return {
        ...source,
        id: `field-${nextKey}-${timestamp}`,
        key: nextKey,
        label: buildUniqueFieldLabel(source.label, fields),
        options: source.options.map((option, index) => ({
            ...option,
            id: `${nextKey}-option-${timestamp}-${index + 1}`,
            detail: { ...option.detail },
        })),
    };
}

function tokenHtml(field: InteractiveDocumentField) {
    return `<span contenteditable="false" data-document-field-id="${field.id}" data-document-field-key="${field.key}" class="interactive-document-token">{{${field.label}}}</span>&nbsp;`;
}

function tableHtml() {
    return `
        <table style="width:100%; border-collapse:collapse; margin: 1.5rem 0; table-layout:fixed;">
            <thead>
                <tr>
                    <th style="width:34%; border:1px solid #d6d3d1; background:#f5f5f4; padding:0.75rem; text-align:left;">Pregunta</th>
                    <th style="width:33%; border:1px solid #d6d3d1; background:#f5f5f4; padding:0.75rem; text-align:left;">Respuesta</th>
                    <th style="width:33%; border:1px solid #d6d3d1; background:#f5f5f4; padding:0.75rem; text-align:left;">Detalle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border:1px solid #e7e5e4; padding:0.75rem;">Escribe aqui la condicion o instruccion</td>
                    <td style="border:1px solid #e7e5e4; padding:0.75rem;">Inserta un campo o deja texto fijo</td>
                    <td style="border:1px solid #e7e5e4; padding:0.75rem;">Usa este espacio para el detalle dependiente</td>
                </tr>
            </tbody>
        </table>
        <p></p>
    `;
}

function getSelectionCell(editor: HTMLDivElement | null): HTMLTableCellElement | null {
    if (!editor) {
        return null;
    }

    const selection = window.getSelection();
    const anchorNode = selection?.anchorNode;
    if (!anchorNode || !editor.contains(anchorNode)) {
        return null;
    }

    const element = anchorNode.nodeType === Node.ELEMENT_NODE
        ? (anchorNode as HTMLElement)
        : anchorNode.parentElement;

    return element?.closest('td, th') ?? null;
}

function getTableContext(editor: HTMLDivElement | null): TableSelectionContext | null {
    const cell = getSelectionCell(editor);
    const row = cell?.parentElement;
    const table = cell?.closest('table');

    if (!cell || !row || !table) {
        return null;
    }

    const rows = Array.from(table.querySelectorAll('tr'));
    const cells = Array.from(row.children).filter((child): child is HTMLTableCellElement =>
        child instanceof HTMLTableCellElement,
    );

    return {
        rowIndex: rows.indexOf(row),
        columnIndex: cells.indexOf(cell),
        rowCount: rows.length,
        columnCount: cells.length,
    };
}

function getColumnWidths(table: HTMLTableElement): number[] {
    const firstRow = table.querySelector('tr');
    const cells = firstRow ? Array.from(firstRow.children).filter((child): child is HTMLTableCellElement =>
        child instanceof HTMLTableCellElement,
    ) : [];

    if (cells.length === 0) {
        return [];
    }

    const widths = cells.map((cell) => {
        const width = Number.parseFloat(cell.style.width);
        return Number.isFinite(width) && width > 0 ? width : 100 / cells.length;
    });

    const total = widths.reduce((sum, width) => sum + width, 0);

    return total > 0
        ? widths.map((width) => (width / total) * 100)
        : widths;
}

function applyColumnWidths(table: HTMLTableElement, widths: number[]) {
    table.style.tableLayout = 'fixed';
    Array.from(table.querySelectorAll('tr')).forEach((row) => {
        const cells = Array.from(row.children).filter((child): child is HTMLTableCellElement =>
            child instanceof HTMLTableCellElement,
        );

        cells.forEach((cell, index) => {
            const width = widths[index];
            if (typeof width === 'number') {
                cell.style.width = `${Math.max(width, 10).toFixed(2)}%`;
            }
        });
    });
}

function createBodyCell(widthPercent: number) {
    const cell = document.createElement('td');
    cell.style.border = '1px solid #e7e5e4';
    cell.style.padding = '0.75rem';
    cell.style.width = `${widthPercent.toFixed(2)}%`;
    cell.textContent = 'Completa este detalle';
    return cell;
}

function createHeaderCell(label: string, widthPercent: number) {
    const cell = document.createElement('th');
    cell.style.border = '1px solid #d6d3d1';
    cell.style.background = '#f5f5f4';
    cell.style.padding = '0.75rem';
    cell.style.textAlign = 'left';
    cell.style.width = `${widthPercent.toFixed(2)}%`;
    cell.textContent = label;
    return cell;
}

export default function InteractiveDocumentEditor({
    bodyHtml,
    config,
    onBodyChange,
    onConfigChange,
}: {
    bodyHtml: string;
    config: InteractiveDocumentConfig;
    onBodyChange: (html: string) => void;
    onConfigChange: (config: InteractiveDocumentConfig) => void;
}) {
    const normalized = useMemo(() => normalizeInteractiveDocumentConfig(config, config.title), [config]);
    const editorRef = useRef<HTMLDivElement | null>(null);
    const timerRef = useRef<number | null>(null);
    const [draftBody, setDraftBody] = useState(bodyHtml || '<p></p>');
    const [draftConfig, setDraftConfig] = useState<InteractiveDocumentConfig>(() => cloneConfig(normalized));
    const [fieldId, setFieldId] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'editing' | 'saved'>('idle');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [tableSelection, setTableSelection] = useState<TableSelectionContext | null>(null);

    useEffect(() => {
        setDraftConfig(cloneConfig(normalized));
    }, [normalized]);

    useEffect(() => {
        const nextBody = bodyHtml || '<p></p>';
        setDraftBody(nextBody);

        if (editorRef.current && editorRef.current.innerHTML !== nextBody) {
            editorRef.current.innerHTML = nextBody;
        }
    }, [bodyHtml]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const refreshSelection = () => {
            setTableSelection(getTableContext(editorRef.current));
        };

        const handleSelectionChange = () => {
            const editor = editorRef.current;
            const selection = window.getSelection();
            if (!editor || !selection?.anchorNode || !editor.contains(selection.anchorNode)) {
                setTableSelection(null);
                return;
            }

            refreshSelection();
        };

        document.addEventListener('selectionchange', handleSelectionChange);

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, []);

    const queueCommit = (nextBody: string, nextConfig: InteractiveDocumentConfig) => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
        }

        setStatus('editing');
        timerRef.current = window.setTimeout(() => {
            onBodyChange(nextBody);
            onConfigChange(nextConfig);
            setStatus('saved');
        }, AUTOSAVE_DELAY);
    };

    const commitConfig = (nextConfig: InteractiveDocumentConfig, nextBody = draftBody) => {
        const syncedBody = syncInteractiveDocumentTokens(nextBody, nextConfig.fields);
        setDraftConfig(nextConfig);
        setDraftBody(syncedBody);

        if (editorRef.current && editorRef.current.innerHTML !== syncedBody) {
            editorRef.current.innerHTML = syncedBody;
        }

        queueCommit(syncedBody, nextConfig);
    };

    const updateMeta = (patch: Partial<InteractiveDocumentConfig>) => {
        commitConfig({ ...draftConfig, ...patch });
    };

    const syncBody = () => {
        if (!editorRef.current) {
            return;
        }

        const nextBody = editorRef.current.innerHTML || '<p></p>';
        setDraftBody(nextBody);
        queueCommit(nextBody, draftConfig);
    };

    const exec = (command: string, value?: string) => {
        editorRef.current?.focus();
        document.execCommand(command, false, value);
        syncBody();
    };

    const insertHtml = (html: string) => {
        editorRef.current?.focus();
        document.execCommand('insertHTML', false, html);
        syncBody();
    };

    const insertField = (field: InteractiveDocumentField) => {
        insertHtml(tokenHtml(field));
    };

    const runTableMutation = (mutation: (cell: HTMLTableCellElement, table: HTMLTableElement) => boolean) => {
        const cell = getSelectionCell(editorRef.current);
        const table = cell?.closest('table');

        if (!cell || !table) {
            return;
        }

        if (mutation(cell, table)) {
            syncBody();
            setTableSelection(getTableContext(editorRef.current));
        }
    };

    const insertRow = () => {
        runTableMutation((cell, table) => {
            const currentRow = cell.parentElement;
            if (!currentRow) {
                return false;
            }

            const widths = getColumnWidths(table);
            const cells = Array.from(currentRow.children).filter((child): child is HTMLTableCellElement =>
                child instanceof HTMLTableCellElement,
            );
            const newRow = document.createElement('tr');

            cells.forEach((_, index) => {
                newRow.appendChild(createBodyCell(widths[index] ?? (100 / Math.max(cells.length, 1))));
            });

            currentRow.insertAdjacentElement('afterend', newRow);
            return true;
        });
    };

    const removeRow = () => {
        runTableMutation((cell, table) => {
            const row = cell.parentElement;
            const bodyRows = Array.from(table.querySelectorAll('tbody tr'));
            if (!row || !(row instanceof HTMLTableRowElement)) {
                return false;
            }

            if (bodyRows.length <= 1 && bodyRows.includes(row)) {
                return false;
            }

            row.remove();
            return true;
        });
    };

    const insertColumn = () => {
        runTableMutation((cell, table) => {
            const context = getTableContext(editorRef.current);
            if (!context) {
                return false;
            }

            const widths = getColumnWidths(table);
            const insertIndex = context.columnIndex + 1;
            const normalizedWidth = 100 / (context.columnCount + 1);
            const rebalanced = Array.from({ length: context.columnCount + 1 }, () => normalizedWidth);

            Array.from(table.querySelectorAll('tr')).forEach((row, rowIndex) => {
                const cells = Array.from(row.children).filter((child): child is HTMLTableCellElement =>
                    child instanceof HTMLTableCellElement,
                );
                const currentCell = cells[context.columnIndex] ?? null;
                const nextSibling = cells[insertIndex] ?? null;
                const nextCell = rowIndex === 0
                    ? createHeaderCell(`Columna ${insertIndex + 1}`, normalizedWidth)
                    : createBodyCell(widths[context.columnIndex] ?? normalizedWidth);

                if (nextSibling) {
                    nextSibling.insertAdjacentElement('beforebegin', nextCell);
                } else if (currentCell) {
                    currentCell.insertAdjacentElement('afterend', nextCell);
                } else {
                    row.appendChild(nextCell);
                }
            });

            applyColumnWidths(table, rebalanced);
            return true;
        });
    };

    const removeColumn = () => {
        runTableMutation((cell, table) => {
            const context = getTableContext(editorRef.current);
            if (!context || context.columnCount <= 1) {
                return false;
            }

            Array.from(table.querySelectorAll('tr')).forEach((row) => {
                const cells = Array.from(row.children).filter((child): child is HTMLTableCellElement =>
                    child instanceof HTMLTableCellElement,
                );
                cells[context.columnIndex]?.remove();
            });

            const rebalanced = Array.from({ length: context.columnCount - 1 }, () => 100 / (context.columnCount - 1));
            applyColumnWidths(table, rebalanced);
            return true;
        });
    };

    const resizeColumn = (delta: number) => {
        runTableMutation((cell, table) => {
            const row = cell.parentElement;
            if (!row) {
                return false;
            }

            const cells = Array.from(row.children).filter((child): child is HTMLTableCellElement =>
                child instanceof HTMLTableCellElement,
            );
            const columnIndex = cells.indexOf(cell);
            if (columnIndex === -1 || cells.length <= 1) {
                return false;
            }

            const widths = getColumnWidths(table);
            const siblingIndex = columnIndex < widths.length - 1 ? columnIndex + 1 : columnIndex - 1;
            const nextCurrent = widths[columnIndex] + delta;
            const nextSibling = widths[siblingIndex] - delta;

            if (nextCurrent < 12 || nextSibling < 12) {
                return false;
            }

            widths[columnIndex] = nextCurrent;
            widths[siblingIndex] = nextSibling;
            applyColumnWidths(table, widths);
            return true;
        });
    };

    const addField = () => {
        const field = newField(draftConfig.fields.length);
        commitConfig({ ...draftConfig, fields: [...draftConfig.fields, field] });
        setFieldId(field.id);
    };

    const duplicateField = (id: string) => {
        const sourceIndex = draftConfig.fields.findIndex((field) => field.id === id);
        if (sourceIndex === -1) {
            return;
        }

        const source = draftConfig.fields[sourceIndex];
        const duplicate = duplicateFieldDefinition(source, draftConfig.fields);
        const nextFields = [...draftConfig.fields];
        nextFields.splice(sourceIndex + 1, 0, duplicate);

        commitConfig({
            ...draftConfig,
            fields: nextFields,
        });
        setFieldId(duplicate.id);
    };

    const removeField = (id: string) => {
        commitConfig({
            ...draftConfig,
            fields: draftConfig.fields.filter((field) => field.id !== id),
        });

        if (fieldId === id) {
            setFieldId(null);
        }
    };

    const updateField = (id: string, nextField: InteractiveDocumentField) => {
        commitConfig({
            ...draftConfig,
            fields: draftConfig.fields.map((field) => (field.id === id ? nextField : field)),
        });
    };

    const activeField = draftConfig.fields.find((field) => field.id === fieldId) ?? null;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <FieldMeta
                    label="Titulo formal"
                    value={draftConfig.title}
                    onChange={(value) => updateMeta({ title: value })}
                    className="md:col-span-2"
                />
                <FieldMeta
                    label="Codigo documental"
                    value={draftConfig.document_code}
                    onChange={(value) => updateMeta({ document_code: value })}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <FieldMeta
                    label="Organizacion"
                    value={draftConfig.organization_name}
                    onChange={(value) => updateMeta({ organization_name: value })}
                />
                <FieldMeta
                    label="Texto del boton"
                    value={draftConfig.submit_label}
                    onChange={(value) => updateMeta({ submit_label: value })}
                />
            </div>

            <TextMeta
                label="Introduccion"
                value={draftConfig.introduction}
                onChange={(value) => updateMeta({ introduction: value })}
            />
            <TextMeta
                label="Declaracion obligatoria"
                value={draftConfig.declaration_label}
                onChange={(value) => updateMeta({ declaration_label: value })}
            />
            <TextMeta
                label="Nota al pie"
                value={draftConfig.footer_note}
                onChange={(value) => updateMeta({ footer_note: value })}
                short
            />

            <div className="rounded-3xl border border-stone-200 bg-stone-50/80 p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-stone-800">Diseñador del documento</p>
                        <p className="text-xs text-stone-500">
                            Hoja formal con inserción de campos y tablas. El guardado quedó desacoplado del tipeo para no interrumpir el diseño.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
                            <Eye className="size-4" />
                            Vista previa Letter
                        </Button>
                        <div className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-500">
                            {status === 'editing' ? 'Preparando guardado...' : status === 'saved' ? 'Cambios listos' : 'Sin cambios pendientes'}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="xl:w-[340px] xl:shrink-0">
                        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-stone-800">Campos</p>
                                    <p className="text-xs text-stone-500">{draftConfig.fields.length} configurados</p>
                                </div>
                                <Button type="button" size="sm" onClick={addField}>
                                    <Plus className="size-4" />
                                    Nuevo
                                </Button>
                            </div>

                            <div className="mt-4 space-y-3">
                                {draftConfig.fields.map((field) => {
                                    const conditionalOptions = field.options.filter((option) => option.detail.enabled).length;

                                    return (
                                        <div
                                            key={field.id}
                                            draggable
                                            onDragStart={(event) => {
                                                event.dataTransfer.setData('application/x-interactive-field-id', field.id);
                                                event.dataTransfer.effectAllowed = 'copy';
                                            }}
                                            className="rounded-2xl border border-stone-200 bg-stone-50 p-3"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-start gap-2">
                                                    <GripVertical className="mt-0.5 size-4 text-stone-400" />
                                                    <div>
                                                        <p className="text-sm font-semibold text-stone-800">{field.label}</p>
                                                        <p className="text-xs text-stone-500">
                                                            {FIELD_TYPES.find((item) => item.value === field.type)?.label}
                                                        </p>
                                                        {field.options.length > 0 && (
                                                            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-stone-400">
                                                                {field.options.length} opciones
                                                                {conditionalOptions > 0 ? ` | ${conditionalOptions} con detalle` : ''}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8 text-sky-700"
                                                        onClick={() => duplicateField(field.id)}
                                                        title="Clonar campo"
                                                    >
                                                        <Copy className="size-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8"
                                                        onClick={() => setFieldId(field.id)}
                                                    >
                                                        <Settings2 className="size-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8 text-rose-600"
                                                        onClick={() => removeField(field.id)}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="mt-3 flex gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => insertField(field)}
                                                >
                                                    Insertar
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => setFieldId(field.id)}
                                                >
                                                    Configurar
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="rounded-[28px] border border-stone-200 bg-white p-4 shadow-sm">
                            <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-4">
                                <ToolbarButton label="P" onMouseDown={() => exec('formatBlock', '<p>')} />
                                <ToolbarButton label="H1" onMouseDown={() => exec('formatBlock', '<h1>')} />
                                <ToolbarButton label="H2" onMouseDown={() => exec('formatBlock', '<h2>')} />
                                <ToolbarButton label="H3" onMouseDown={() => exec('formatBlock', '<h3>')} />
                                <ToolbarButton label="Negrita" onMouseDown={() => exec('bold')} />
                                <ToolbarButton label="Cursiva" onMouseDown={() => exec('italic')} />
                                <ToolbarButton label="Subrayado" onMouseDown={() => exec('underline')} />
                                <ToolbarButton label="Lista" onMouseDown={() => exec('insertUnorderedList')} />
                                <ToolbarButton label="Numerada" onMouseDown={() => exec('insertOrderedList')} />
                                <ToolbarButton
                                    label="Tabla"
                                    icon={<Table2 className="size-4" />}
                                    onMouseDown={() => insertHtml(tableHtml())}
                                />
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 px-3 py-3">
                                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                                    Tabla activa
                                </span>
                                <ToolbarButton label="Fila +" onMouseDown={insertRow} disabled={!tableSelection} />
                                <ToolbarButton label="Fila -" onMouseDown={removeRow} disabled={!tableSelection} />
                                <ToolbarButton label="Columna +" onMouseDown={insertColumn} disabled={!tableSelection} />
                                <ToolbarButton label="Columna -" onMouseDown={removeColumn} disabled={!tableSelection} />
                                <ToolbarButton label="Ens. +" icon={<Plus className="size-4" />} onMouseDown={() => resizeColumn(TABLE_COLUMN_STEP)} disabled={!tableSelection} />
                                <ToolbarButton label="Ens. -" icon={<Minus className="size-4" />} onMouseDown={() => resizeColumn(-TABLE_COLUMN_STEP)} disabled={!tableSelection} />
                                <span className="ml-auto text-xs text-stone-500">
                                    {tableSelection
                                        ? `Fila ${tableSelection.rowIndex + 1} · Columna ${tableSelection.columnIndex + 1} · ${tableSelection.columnCount} columnas`
                                        : 'Selecciona una celda para editar la tabla'}
                                </span>
                            </div>

                            <div className="mt-5 rounded-[32px] bg-[#f3efe6] p-4">
                                <div
                                    className="mx-auto min-h-[860px] max-w-4xl rounded-[24px] border border-stone-200 bg-white px-10 py-12 shadow-[0_24px_70px_rgba(15,23,42,0.10)]"
                                    onDragOver={(event) => {
                                        event.preventDefault();
                                        event.dataTransfer.dropEffect = 'copy';
                                    }}
                                    onDrop={(event) => {
                                        event.preventDefault();
                                        const id = event.dataTransfer.getData('application/x-interactive-field-id');
                                        const field = draftConfig.fields.find((item) => item.id === id);
                                        if (field) {
                                            insertField(field);
                                        }
                                    }}
                                >
                                    <div className="border-b border-stone-200 pb-6">
                                        <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
                                            {draftConfig.organization_name || 'Academy'}
                                        </p>
                                        <div className="mt-3 flex items-start justify-between gap-6">
                                            <h2 className="font-serif text-3xl leading-tight text-stone-900">
                                                {draftConfig.title}
                                            </h2>
                                            <div className="rounded-2xl border border-stone-200 px-4 py-3 text-right">
                                                <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">Codigo</p>
                                                <p className="mt-1 font-semibold text-stone-800">
                                                    {draftConfig.document_code || 'DOC-001'}
                                                </p>
                                            </div>
                                        </div>
                                        {draftConfig.introduction && (
                                            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-stone-600">
                                                {draftConfig.introduction}
                                            </p>
                                        )}
                                    </div>

                                    <div
                                        ref={editorRef}
                                        contentEditable
                                        suppressContentEditableWarning
                                        className="interactive-document-editor prose prose-stone mt-8 min-h-[540px] max-w-none text-[15px] leading-8 text-stone-700 focus:outline-none [&_.interactive-document-token]:rounded-xl [&_.interactive-document-token]:border [&_.interactive-document-token]:border-emerald-200 [&_.interactive-document-token]:bg-emerald-50 [&_.interactive-document-token]:px-2 [&_.interactive-document-token]:py-1 [&_.interactive-document-token]:font-medium [&_.interactive-document-token]:text-emerald-800 [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-stone-300 [&_td]:p-3 [&_th]:border [&_th]:border-stone-300 [&_th]:bg-stone-100 [&_th]:p-3 [&_th]:text-left"
                                        onInput={syncBody}
                                        onBlur={syncBody}
                                    />

                                    {draftConfig.footer_note && (
                                        <div className="mt-8 border-t border-stone-200 pt-5 text-xs uppercase tracking-[0.08em] text-stone-500">
                                            {draftConfig.footer_note}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FieldDialog
                key={activeField?.id ?? 'no-field'}
                field={activeField}
                open={Boolean(activeField)}
                onClose={() => setFieldId(null)}
                onSave={(field) => {
                    updateField(field.id, field);
                    setFieldId(null);
                }}
            />
            <LetterPreviewDialog
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                title={draftConfig.title}
                organization={draftConfig.organization_name}
                code={draftConfig.document_code}
                introduction={draftConfig.introduction}
                footerNote={draftConfig.footer_note}
                bodyHtml={syncInteractiveDocumentTokens(draftBody, draftConfig.fields)}
            />
        </div>
    );
}

function FieldDialog({
    field,
    open,
    onClose,
    onSave,
}: {
    field: InteractiveDocumentField | null;
    open: boolean;
    onClose: () => void;
    onSave: (field: InteractiveDocumentField) => void;
}) {
    const [draft, setDraft] = useState<InteractiveDocumentField | null>(() => field ? {
        ...field,
        options: field.options.map((option) => ({
            ...option,
            detail: { ...option.detail },
        })),
    } : null);
    const [activeOptionId, setActiveOptionId] = useState<string | null>(null);

    if (!draft) {
        return null;
    }

    const usesOptions = ['select', 'radio'].includes(draft.type);

    const updateOption = (
        optionId: string,
        patch: Partial<InteractiveDocumentFieldOption>,
    ) => {
        setDraft({
            ...draft,
            options: draft.options.map((option) => {
                if (option.id !== optionId) {
                    return option;
                }

                return {
                    ...option,
                    ...patch,
                    detail: {
                        ...option.detail,
                        ...(patch.detail ?? {}),
                    },
                };
            }),
        });
    };

    const updateOptionDetail = (
        optionId: string,
        patch: Partial<InteractiveDocumentFieldOptionDetail>,
    ) => {
        setDraft({
            ...draft,
            options: draft.options.map((option) =>
                option.id === optionId
                    ? { ...option, detail: { ...option.detail, ...patch } }
                    : option,
            ),
        });
    };

    const addOption = () => {
        const nextOption = createInteractiveDocumentOption(draft.key || draft.id, draft.options.length);
        setDraft({ ...draft, options: [...draft.options, nextOption] });
        setActiveOptionId(nextOption.id);
    };

    const removeOption = (optionId: string) => {
        setDraft({
            ...draft,
            options: draft.options.filter((option) => option.id !== optionId),
        });

        if (activeOptionId === optionId) {
            setActiveOptionId(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Configurar campo</DialogTitle>
                    <DialogDescription>
                        La referencia del campo queda estable aunque cambie el label. En opciones únicas puedes activar un detalle dependiente por alternativa.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 md:grid-cols-2">
                    <Meta label="Etiqueta" value={draft.label} onChange={(value) => setDraft({ ...draft, label: value })} />
                    <Meta label="Clave" value={draft.key} onChange={(value) => setDraft({ ...draft, key: value })} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tipo</label>
                        <select
                            className="select select-bordered w-full"
                            value={draft.type}
                            onChange={(event) => setDraft({
                                ...draft,
                                type: event.target.value as InteractiveDocumentFieldType,
                            })}
                        >
                            {FIELD_TYPES.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Meta
                        label="Placeholder"
                        value={draft.placeholder}
                        onChange={(value) => setDraft({ ...draft, placeholder: value })}
                    />
                </div>

                <TextMeta
                    label="Texto de ayuda"
                    value={draft.help_text}
                    onChange={(value) => setDraft({ ...draft, help_text: value })}
                    short
                />

                {usesOptions && (
                    <div className="space-y-4 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-stone-800">Opciones de respuesta</p>
                                <p className="text-xs text-stone-500">
                                    Cada opción puede activar un detalle condicional distinto, por ejemplo “Si” o “No”.
                                </p>
                            </div>
                            <Button type="button" onClick={addOption}>
                                <Plus className="size-4" />
                                Agregar opcion
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {draft.options.length === 0 && (
                                <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-6 text-sm text-stone-500">
                                    Agrega alternativas para configurar la respuesta unica y sus detalles condicionales.
                                </div>
                            )}

                            {draft.options.map((option, index) => {
                                const detailOpen = activeOptionId === option.id;

                                return (
                                    <div key={option.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                                        <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_auto]">
                                            <Meta
                                                label={`Texto visible ${index + 1}`}
                                                value={option.label}
                                                onChange={(value) => updateOption(option.id, { label: value })}
                                            />
                                            <Meta
                                                label="Valor"
                                                value={option.value}
                                                onChange={(value) => updateOption(option.id, { value })}
                                            />
                                            <div className="flex items-end gap-2">
                                                <Button
                                                    type="button"
                                                    variant={option.detail.enabled ? 'default' : 'outline'}
                                                    onClick={() => setActiveOptionId(detailOpen ? null : option.id)}
                                                >
                                                    {option.detail.enabled ? 'Editar detalle' : 'Configurar detalle'}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-rose-600"
                                                    onClick={() => removeOption(option.id)}
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                                            <Checkbox
                                                checked={option.detail.enabled}
                                                onCheckedChange={(checked) =>
                                                    updateOptionDetail(option.id, {
                                                        enabled: checked === true,
                                                    })
                                                }
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-stone-700">
                                                    Solicitar detalle al elegir esta opción
                                                </p>
                                                <p className="text-xs text-stone-500">
                                                    Útil para escenarios como “Si, indique cuál” o “No, explique motivo”.
                                                </p>
                                            </div>
                                        </div>

                                        {detailOpen && option.detail.enabled && (
                                            <div className="mt-4 space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <Meta
                                                        label="Etiqueta del detalle"
                                                        value={option.detail.label}
                                                        onChange={(value) => updateOptionDetail(option.id, { label: value })}
                                                    />
                                                    <Meta
                                                        label="Placeholder del detalle"
                                                        value={option.detail.placeholder}
                                                        onChange={(value) => updateOptionDetail(option.id, { placeholder: value })}
                                                    />
                                                </div>
                                                <TextMeta
                                                    label="Ayuda del detalle"
                                                    value={option.detail.help_text}
                                                    onChange={(value) => updateOptionDetail(option.id, { help_text: value })}
                                                    short
                                                />
                                                <label className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-4 py-3">
                                                    <Checkbox
                                                        checked={option.detail.required}
                                                        onCheckedChange={(checked) =>
                                                            updateOptionDetail(option.id, {
                                                                required: checked === true,
                                                            })
                                                        }
                                                    />
                                                    <span className="text-sm text-stone-700">
                                                        Exigir este detalle cuando la opción esté seleccionada
                                                    </span>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <Checkbox
                        checked={draft.required}
                        onCheckedChange={(checked) => setDraft({ ...draft, required: checked === true })}
                    />
                    <span className="text-sm text-stone-700">Campo obligatorio</span>
                </label>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button type="button" onClick={() => onSave(draft)}>
                        Guardar campo
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function LetterPreviewDialog({
    open,
    onClose,
    title,
    organization,
    code,
    introduction,
    footerNote,
    bodyHtml,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    organization: string;
    code: string;
    introduction: string;
    footerNote: string;
    bodyHtml: string;
}) {
    return (
        <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
            <DialogContent className="max-h-[95vh] max-w-6xl overflow-y-auto bg-stone-100">
                <DialogHeader>
                    <DialogTitle>Vista previa PDF Letter</DialogTitle>
                    <DialogDescription>
                        Simulación visual de una hoja tamaño Letter 8.5 x 11 pulgadas.
                    </DialogDescription>
                </DialogHeader>

                <div className="overflow-auto rounded-3xl border border-stone-200 bg-[#d6d3d1] p-6">
                    <div className="mx-auto w-full max-w-[816px] shadow-[0_28px_90px_rgba(15,23,42,0.22)]">
                        <div
                            className="bg-white px-[68px] py-[72px] text-stone-800"
                            style={{ minHeight: '1056px' }}
                        >
                            <div className="border-b border-stone-300 pb-8">
                                <p className="text-[11px] uppercase tracking-[0.35em] text-stone-500">
                                    {organization || 'Academy'}
                                </p>
                                <div className="mt-4 flex items-start justify-between gap-6">
                                    <h2 className="font-serif text-[32px] leading-tight text-stone-900">
                                        {title}
                                    </h2>
                                    <div className="rounded-2xl border border-stone-200 px-4 py-3 text-right">
                                        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">Codigo</p>
                                        <p className="mt-1 text-sm font-semibold text-stone-800">{code || 'DOC-001'}</p>
                                    </div>
                                </div>
                                {introduction && (
                                    <p className="mt-6 max-w-3xl text-[15px] leading-8 text-stone-600">
                                        {introduction}
                                    </p>
                                )}
                            </div>

                            <div
                                className="prose prose-stone mt-8 max-w-none text-[14px] leading-8 text-stone-700 [&_.interactive-document-token]:rounded-lg [&_.interactive-document-token]:border [&_.interactive-document-token]:border-emerald-200 [&_.interactive-document-token]:bg-emerald-50 [&_.interactive-document-token]:px-2 [&_.interactive-document-token]:py-1 [&_.interactive-document-token]:font-medium [&_.interactive-document-token]:text-emerald-800 [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:table-fixed [&_td]:border [&_td]:border-stone-300 [&_td]:p-3 [&_th]:border [&_th]:border-stone-300 [&_th]:bg-stone-100 [&_th]:p-3 [&_th]:text-left"
                                dangerouslySetInnerHTML={{ __html: bodyHtml || '<p></p>' }}
                            />

                            {footerNote && (
                                <div className="mt-10 border-t border-stone-300 pt-5 text-[11px] uppercase tracking-[0.08em] text-stone-500">
                                    {footerNote}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cerrar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function FieldMeta({
    label,
    value,
    onChange,
    className,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}) {
    return (
        <div className={className}>
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <Input value={value} onChange={(event) => onChange(event.target.value)} />
        </div>
    );
}

function Meta({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <Input value={value} onChange={(event) => onChange(event.target.value)} />
        </div>
    );
}

function TextMeta({
    label,
    value,
    onChange,
    short = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    short?: boolean;
}) {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <textarea
                className={`textarea textarea-bordered ${short ? 'h-20' : 'h-24'}`}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            ></textarea>
        </div>
    );
}

function ToolbarButton({
    label,
    onMouseDown,
    icon,
    disabled = false,
}: {
    label: string;
    onMouseDown: () => void;
    icon?: ReactNode;
    disabled?: boolean;
}) {
    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            onMouseDown={(event) => {
                event.preventDefault();
                onMouseDown();
            }}
        >
            {icon}
            {label}
        </Button>
    );
}
