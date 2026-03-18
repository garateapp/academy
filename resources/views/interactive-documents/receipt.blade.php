<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Comprobante de documento</title>
    <style>
        @page {
            margin: 28px 28px 64px 28px;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            color: #1f2937;
            font-size: 12px;
            line-height: 1.5;
        }

        h1, h2, h3, p {
            margin: 0;
        }

        .page {
            padding: 0;
        }

        .header {
            border-bottom: 2px solid #0f766e;
            padding-bottom: 16px;
            margin-bottom: 20px;
        }

        .muted {
            color: #6b7280;
        }

        .section {
            margin-top: 20px;
        }

        .panel {
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 12px 14px;
        }

        .row {
            margin-bottom: 6px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th, td {
            border: 1px solid #d1d5db;
            padding: 8px;
            vertical-align: top;
            text-align: left;
        }

        th {
            background: #ecfeff;
        }

        .hash {
            word-break: break-all;
            font-size: 10px;
        }

        .signature-preview {
            display: inline-block;
            max-width: 220px;
            max-height: 90px;
            border-bottom: 1px solid #94a3b8;
            padding-bottom: 6px;
        }

        .document-footer {
            position: fixed;
            left: 0;
            right: 0;
            bottom: -42px;
            font-size: 9px;
            color: #64748b;
            border-top: 1px solid #cbd5e1;
            padding-top: 6px;
        }

        .document-footer table {
            width: 100%;
            margin-top: 0;
            border: 0;
        }

        .document-footer td {
            border: 0;
            padding: 0;
            vertical-align: top;
        }

        .document-footer .footer-label {
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
        }
    </style>
</head>
<body>
    @php
        $savedAt = $submission->updated_at ?? $submission->submitted_at ?? $submission->created_at;
    @endphp
    <div class="page">
        <div class="document-footer">
            <table>
                <tr>
                    <td style="width: 13%;">
                        <span class="footer-label">Hash de Contenido:</span>
                    </td>
                    <td style="width: 57%;">{{ $submission->content_hash ?? 'N/D' }}</td>
                    <td style="width: 12%;">
                        <span class="footer-label">Guardado:</span>
                    </td>
                    <td style="width: 18%;">
                        {{ optional($savedAt)->format('d/m/Y H:i:s') ?? 'N/D' }}
                    </td>
                </tr>
            </table>
        </div>

        <div class="header">
            <h1>Comprobante de Firma documento</h1>
            <p class="muted">
                {{ $schema['organization_name'] ?? config('app.name', 'Academy') }}
                @if (!empty($schema['document_code']))
                    | {{ $schema['document_code'] }}
                @endif
            </p>
        </div>

        <div class="section panel">
            <div class="row"><strong>Curso:</strong> {{ $course->title }}</div>
            <div class="row"><strong>Modulo:</strong> {{ $module->title }}</div>
            <div class="row"><strong>Documento:</strong> {{ $schema['title'] ?? $module->title }}</div>
            <div class="row"><strong>Usuario:</strong> {{ $user->name }} ({{ $user->email }})</div>
            <div class="row"><strong>Enviado:</strong> {{ optional($submission->submitted_at)->format('d/m/Y H:i:s') }}</div>
            <div class="row"><strong>IP:</strong> {{ $submission->ip_address ?? 'N/D' }}</div>
        </div>

        @php
            $renderedBody = !empty($schema['body'])
                ? preg_replace_callback(
                    '/<span[^>]*(?:data-document-field-key|data-document-field-id)="([^"]+)"[^>]*>.*?<\/span>/si',
                    function ($matches) use ($responses, $schema) {
                        $fieldIdentifier = $matches[1];
                        $field = collect($schema['fields'] ?? [])->first(function ($item) use ($fieldIdentifier) {
                            return ($item['id'] ?? null) === $fieldIdentifier || ($item['key'] ?? null) === $fieldIdentifier;
                        });

                        $responseKey = $field['key'] ?? $fieldIdentifier;
                        $value = $responses[$responseKey] ?? '';
                        if (is_bool($value)) {
                            $value = $value ? 'Si' : 'No';
                        }

                        if (($field['type'] ?? null) === 'signature') {
                            if (is_string($value) && str_starts_with($value, 'data:image/png;base64,')) {
                                return '<img src="' . e($value) . '" alt="Firma" class="signature-preview">';
                            }

                            return '<strong style="color:#0f766e;">________________</strong>';
                        }

                        $selectedOption = collect($field['options'] ?? [])->first(function ($option) use ($value) {
                            return is_array($option) && ($option['value'] ?? null) === $value;
                        });

                        if (is_array($selectedOption) && (($selectedOption['detail']['enabled'] ?? false) === true)) {
                            $detailKey = ($field['key'] ?? $fieldIdentifier) . '__detail__' . ($selectedOption['id'] ?? '');
                            $detailValue = trim((string) ($responses[$detailKey] ?? ''));

                            if ($detailValue !== '') {
                                $value = trim((string) $value) !== ''
                                    ? $value . ' | ' . $detailValue
                                    : $detailValue;
                            }
                        }

                        $display = trim((string) $value) !== '' ? $value : '________________';

                        return '<strong style="color:#0f766e;">' . e((string) $display) . '</strong>';
                    },
                    (string) $schema['body']
                )
                : null;
        @endphp

        @if (!empty($renderedBody))
            <div class="section">
                <h3>Contenido aceptado</h3>
                <div class="panel">{!! $renderedBody !!}</div>
            </div>
        @endif

        <div class="section">
            <h3>Respuestas registradas</h3>
            <table>
                <thead>
                    <tr>
                        <th style="width: 40%;">Campo</th>
                        <th>Respuesta</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach (($schema['fields'] ?? []) as $field)
                        @php
                            $value = $responses[$field['key']] ?? '';
                            if (is_bool($value)) {
                                $value = $value ? 'Si' : 'No';
                            }

                            $selectedOption = collect($field['options'] ?? [])->first(function ($option) use ($value) {
                                return is_array($option) && ($option['value'] ?? null) === $value;
                            });

                            $detailKey = null;
                            $detailValue = '';
                            if (is_array($selectedOption) && (($selectedOption['detail']['enabled'] ?? false) === true)) {
                                $detailKey = ($field['key'] ?? '') . '__detail__' . ($selectedOption['id'] ?? '');
                                $detailValue = trim((string) ($responses[$detailKey] ?? ''));
                            }
                        @endphp
                        <tr>
                            <td>{{ $field['label'] ?? $field['key'] }}</td>
                            <td>
                                @if (($field['type'] ?? null) === 'signature')
                                    @if (is_string($value) && str_starts_with($value, 'data:image/png;base64,'))
                                        <img src="{{ $value }}" alt="Firma" class="signature-preview">
                                    @else
                                        -
                                    @endif
                                @else
                                    {{ $value !== '' ? $value : '-' }}
                                @endif
                            </td>
                        </tr>
                        @if ($detailKey && $detailValue !== '')
                            <tr>
                                <td>{{ $selectedOption['detail']['label'] ?? 'Detalle' }}</td>
                                <td>{{ $detailValue }}</td>
                            </tr>
                        @endif
                    @endforeach
                    @if (!empty($schema['declaration_label']))
                        <tr>
                            <td>Declaracion obligatoria</td>
                            <td>{{ $submission->declaration_accepted ? 'Aceptada' : 'No aceptada' }}</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>

        <div class="section">
            <h3>Evidencia tecnica</h3>
            <div class="panel">
                <div class="row"><strong>Hash de contenido:</strong></div>
                <div class="hash">{{ $submission->content_hash ?? 'N/D' }}</div>
                <div class="row" style="margin-top: 10px;"><strong>Hash de respuestas:</strong></div>
                <div class="hash">{{ $submission->response_hash ?? 'N/D' }}</div>
                <div class="row" style="margin-top: 10px;"><strong>User Agent:</strong> {{ $submission->user_agent ?? 'N/D' }}</div>
            </div>
        </div>
    </div>
</body>
</html>
