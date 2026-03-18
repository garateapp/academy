<?php

namespace App\Modules\Learning\Application\Services;

use App\Modules\Learning\Domain\CourseModule;
use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Learning\Domain\InteractiveDocumentSubmission;
use App\Modules\Learning\Domain\ModuleCompletion;
use App\Modules\Learning\Domain\UserActivityLog;
use App\Modules\Identity\Domain\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class InteractiveDocumentService
{
    private const SUPPORTED_FIELD_TYPES = [
        'text',
        'textarea',
        'checkbox',
        'select',
        'radio',
        'date',
        'email',
        'number',
    ];

    public function getSchema(CourseModule $module): array
    {
        $config = is_array($module->config_json) ? $module->config_json : [];
        $document = is_array($config['interactive_document'] ?? null)
            ? $config['interactive_document']
            : [];

        $fields = collect($document['fields'] ?? [])
            ->filter(fn ($field) => is_array($field))
            ->map(function (array $field, int $index) {
                $label = trim((string) ($field['label'] ?? 'Campo ' . ($index + 1)));
                $key = trim((string) ($field['key'] ?? ''));
                $key = $key !== '' ? $key : 'field_' . ($index + 1);
                $id = trim((string) ($field['id'] ?? ''));
                $id = $id !== '' ? $id : 'field-' . $key;

                $type = (string) ($field['type'] ?? 'text');
                if (!in_array($type, self::SUPPORTED_FIELD_TYPES, true)) {
                    $type = 'text';
                }

                $options = $this->normalizeFieldOptions($field['options'] ?? [], $key);

                return [
                    'id' => $id,
                    'key' => $key,
                    'label' => $label,
                    'type' => $type,
                    'required' => (bool) ($field['required'] ?? false),
                    'placeholder' => trim((string) ($field['placeholder'] ?? '')),
                    'help_text' => trim((string) ($field['help_text'] ?? '')),
                    'options' => $options,
                ];
            })
            ->values()
            ->all();

        return [
            'title' => trim((string) ($document['title'] ?? $module->title)),
            'introduction' => trim((string) ($document['introduction'] ?? '')),
            'body' => (string) ($module->content ?? ''),
            'submit_label' => trim((string) ($document['submit_label'] ?? 'Enviar documento')),
            'declaration_label' => trim((string) ($document['declaration_label'] ?? 'Declaro que he leído y completado este documento.')),
            'organization_name' => trim((string) ($document['organization_name'] ?? config('app.name', 'Academy'))),
            'document_code' => trim((string) ($document['document_code'] ?? 'DOC-001')),
            'footer_note' => trim((string) ($document['footer_note'] ?? 'Documento de uso interno. Conserva este comprobante como respaldo.')),
            'fields' => $fields,
        ];
    }

    public function markOpened(User $user, CourseModule $module, Enrollment $enrollment): InteractiveDocumentSubmission
    {
        $submission = $this->getEditableSubmission($module, $enrollment, $user)
            ?? $this->getLatestSubmission($module, $enrollment, $user)
            ?? $this->createAttempt($module, $enrollment, $user);

        if ($submission->opened_at === null) {
            $submission->opened_at = now();
            if ($submission->submitted_at === null) {
                UserActivityLog::logAction(
                    userId: $user->id,
                    enrollmentId: $enrollment->id,
                    moduleId: $module->id,
                    action: 'interactive_document.opened',
                    metadata: [
                        'submission_id' => $submission->id,
                        'attempt_number' => $submission->attempt_number,
                    ]
                );
            }
        }

        if ($submission->status === 'not_started' && $submission->submitted_at === null) {
            $submission->status = 'in_progress';
        }

        $submission->save();

        return $submission;
    }

    public function saveDraft(
        Request $request,
        User $user,
        CourseModule $module,
        Enrollment $enrollment,
        array $responses,
        bool $declarationAccepted
    ): InteractiveDocumentSubmission {
        $submission = $this->getEditableSubmission($module, $enrollment, $user)
            ?? $this->createAttempt($module, $enrollment, $user);

        $schema = $this->getSchema($module);
        $normalizedResponses = $this->normalizeDraftResponses($schema, $responses);

        $submission->fill([
            'status' => 'in_progress',
            'schema_json' => $schema,
            'responses_json' => $normalizedResponses,
            'declaration_label' => $schema['declaration_label'],
            'declaration_accepted' => $declarationAccepted,
            'response_hash' => hash('sha256', $this->toStableJson([
                'responses' => $normalizedResponses,
                'declaration_accepted' => $declarationAccepted,
            ])),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'opened_at' => $submission->opened_at ?? now(),
        ]);
        $submission->save();

        UserActivityLog::logAction(
            userId: $user->id,
            enrollmentId: $enrollment->id,
            moduleId: $module->id,
            action: 'interactive_document.draft_saved',
            metadata: [
                'submission_id' => $submission->id,
                'attempt_number' => $submission->attempt_number,
            ]
        );

        return $submission;
    }

    public function startNewAttempt(
        User $user,
        CourseModule $module,
        Enrollment $enrollment
    ): InteractiveDocumentSubmission {
        $submission = $this->getEditableSubmission($module, $enrollment, $user)
            ?? $this->createAttempt($module, $enrollment, $user);

        UserActivityLog::logAction(
            userId: $user->id,
            enrollmentId: $enrollment->id,
            moduleId: $module->id,
            action: 'interactive_document.attempt_started',
            metadata: [
                'submission_id' => $submission->id,
                'attempt_number' => $submission->attempt_number,
            ]
        );

        return $submission;
    }

    public function submit(
        Request $request,
        User $user,
        CourseModule $module,
        Enrollment $enrollment,
        array $responses,
        bool $declarationAccepted
    ): InteractiveDocumentSubmission {
        $existingSubmission = $this->getEditableSubmission($module, $enrollment, $user)
            ?? $this->createAttempt($module, $enrollment, $user);

        $schema = $this->getSchema($module);
        $normalizedResponses = $this->validateResponses($schema, $responses, $declarationAccepted);

        $serializedSchema = $this->toStableJson($schema);
        $serializedResponses = $this->toStableJson([
            'responses' => $normalizedResponses,
            'declaration_accepted' => $declarationAccepted,
        ]);

        $submission = $existingSubmission ?? new InteractiveDocumentSubmission([
            'module_id' => $module->id,
            'enrollment_id' => $enrollment->id,
            'user_id' => $user->id,
        ]);

        $submission->fill([
            'status' => 'submitted',
            'schema_json' => $schema,
            'responses_json' => $normalizedResponses,
            'declaration_label' => $schema['declaration_label'],
            'declaration_accepted' => $declarationAccepted,
            'content_hash' => hash('sha256', $serializedSchema),
            'response_hash' => hash('sha256', $serializedResponses),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'opened_at' => $submission->opened_at ?? now(),
            'submitted_at' => now(),
            'completed_at' => now(),
        ]);
        $submission->save();

        $completion = ModuleCompletion::firstOrCreate(
            [
                'user_id' => $user->id,
                'enrollment_id' => $enrollment->id,
                'module_id' => $module->id,
            ],
            [
                'completed_at' => now(),
                'time_spent_seconds' => 0,
                'score' => null,
            ]
        );

        UserActivityLog::logAction(
            userId: $user->id,
            enrollmentId: $enrollment->id,
            moduleId: $module->id,
            action: 'interactive_document.submitted',
            metadata: [
                'submission_id' => $submission->id,
                'attempt_number' => $submission->attempt_number,
                'content_hash' => $submission->content_hash,
                'response_hash' => $submission->response_hash,
            ]
        );

        if ($completion->wasRecentlyCreated) {
            UserActivityLog::logAction(
                userId: $user->id,
                enrollmentId: $enrollment->id,
                moduleId: $module->id,
                action: 'module.completed',
                metadata: ['source' => 'interactive_document']
            );
        }

        return $submission;
    }

    public function getLatestSubmission(
        CourseModule $module,
        Enrollment $enrollment,
        User $user
    ): ?InteractiveDocumentSubmission {
        return InteractiveDocumentSubmission::forContext($module->id, $enrollment->id, $user->id)
            ->orderByDesc('attempt_number')
            ->orderByDesc('id')
            ->first();
    }

    public function getSubmissionHistory(
        CourseModule $module,
        Enrollment $enrollment,
        User $user
    ) {
        return InteractiveDocumentSubmission::forContext($module->id, $enrollment->id, $user->id)
            ->orderByDesc('attempt_number')
            ->orderByDesc('id')
            ->get();
    }

    public function getSubmissionById(
        CourseModule $module,
        Enrollment $enrollment,
        User $user,
        int $submissionId
    ): ?InteractiveDocumentSubmission {
        return InteractiveDocumentSubmission::forContext($module->id, $enrollment->id, $user->id)
            ->where('id', $submissionId)
            ->first();
    }

    private function validateResponses(array $schema, array $responses, bool $declarationAccepted): array
    {
        $errors = [];
        $normalized = [];

        foreach ($schema['fields'] as $field) {
            $key = $field['key'];
            $value = $responses[$key] ?? null;

            if ($field['type'] === 'checkbox') {
                $normalizedValue = filter_var($value, FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE);
                $normalizedValue = $normalizedValue ?? false;

                if ($field['required'] && $normalizedValue !== true) {
                    $errors[$key] = 'Este campo es obligatorio.';
                }

                $normalized[$key] = $normalizedValue;

                continue;
            }

            $textValue = is_scalar($value) ? trim((string) $value) : '';
            $selectedOption = null;

            if ($field['required'] && $textValue === '') {
                $errors[$key] = 'Este campo es obligatorio.';
                $normalized[$key] = '';
            } else {
                if ($textValue === '') {
                    $normalized[$key] = '';
                } else {
                    if ($field['type'] === 'email' && !filter_var($textValue, FILTER_VALIDATE_EMAIL)) {
                        $errors[$key] = 'Ingresa un correo válido.';
                    }

                    if ($field['type'] === 'number' && !is_numeric($textValue)) {
                        $errors[$key] = 'Ingresa un número válido.';
                    }

                    if (in_array($field['type'], ['select', 'radio'], true)) {
                        $selectedOption = collect($field['options'] ?? [])->first(
                            fn ($option) => is_array($option) && (($option['value'] ?? null) === $textValue)
                        );

                        if ($selectedOption === null) {
                            $errors[$key] = 'Selecciona una opción válida.';
                        }
                    }

                    $normalized[$key] = $textValue;
                }
            }

            foreach ($field['options'] ?? [] as $option) {
                if (!is_array($option) || !is_array($option['detail'] ?? null) || !($option['detail']['enabled'] ?? false)) {
                    continue;
                }

                $detailKey = $this->getOptionDetailResponseKey($key, (string) ($option['id'] ?? ''));
                $detailValue = is_scalar($responses[$detailKey] ?? null) ? trim((string) $responses[$detailKey]) : '';
                $isSelectedOption = is_array($selectedOption) && (($selectedOption['id'] ?? null) === ($option['id'] ?? null));

                if ($isSelectedOption && ($option['detail']['required'] ?? false) && $detailValue === '') {
                    $errors[$detailKey] = 'Debes completar el detalle de la selección.';
                }

                $normalized[$detailKey] = $isSelectedOption ? $detailValue : '';
            }
        }

        if ($schema['declaration_label'] !== '' && !$declarationAccepted) {
            $errors['declaration'] = 'Debes aceptar la declaración para continuar.';
        }

        if ($errors !== []) {
            throw ValidationException::withMessages($errors);
        }

        return $normalized;
    }

    private function normalizeDraftResponses(array $schema, array $responses): array
    {
        $normalized = [];

        foreach ($schema['fields'] as $field) {
            $key = $field['key'];
            $value = $responses[$key] ?? null;

            if ($field['type'] === 'checkbox') {
                $normalized[$key] = filter_var($value, FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE) ?? false;
                continue;
            }

            $normalized[$key] = is_scalar($value) ? trim((string) $value) : '';

            foreach ($field['options'] ?? [] as $option) {
                if (!is_array($option) || !is_array($option['detail'] ?? null) || !($option['detail']['enabled'] ?? false)) {
                    continue;
                }

                $detailKey = $this->getOptionDetailResponseKey($key, (string) ($option['id'] ?? ''));
                $normalized[$detailKey] = is_scalar($responses[$detailKey] ?? null)
                    ? trim((string) $responses[$detailKey])
                    : '';
            }
        }

        return $normalized;
    }

    private function getEditableSubmission(
        CourseModule $module,
        Enrollment $enrollment,
        User $user
    ): ?InteractiveDocumentSubmission {
        return InteractiveDocumentSubmission::forContext($module->id, $enrollment->id, $user->id)
            ->whereNull('submitted_at')
            ->orderByDesc('attempt_number')
            ->orderByDesc('id')
            ->first();
    }

    private function createAttempt(
        CourseModule $module,
        Enrollment $enrollment,
        User $user
    ): InteractiveDocumentSubmission {
        $schema = $this->getSchema($module);
        $nextAttemptNumber = (int) InteractiveDocumentSubmission::forContext($module->id, $enrollment->id, $user->id)
            ->max('attempt_number') + 1;

        $submission = new InteractiveDocumentSubmission([
            'module_id' => $module->id,
            'enrollment_id' => $enrollment->id,
            'user_id' => $user->id,
            'attempt_number' => $nextAttemptNumber,
        ]);

        $submission->fill([
            'status' => 'in_progress',
            'schema_json' => $schema,
            'declaration_label' => $schema['declaration_label'],
            'responses_json' => [],
            'declaration_accepted' => false,
        ]);
        $submission->save();

        return $submission;
    }

    private function normalizeFieldOptions(mixed $rawOptions, string $fieldKey): array
    {
        return collect(is_array($rawOptions) ? $rawOptions : [])
            ->map(function (mixed $option, int $index) use ($fieldKey) {
                if (is_scalar($option)) {
                    $label = trim((string) $option);

                    if ($label === '') {
                        return null;
                    }

                    return [
                        'id' => $fieldKey . '-option-' . ($index + 1),
                        'label' => $label,
                        'value' => $label,
                        'detail' => $this->normalizeOptionDetail([]),
                    ];
                }

                if (!is_array($option)) {
                    return null;
                }

                $label = trim((string) ($option['label'] ?? $option['value'] ?? 'Opción ' . ($index + 1)));
                $value = trim((string) ($option['value'] ?? $label));

                if ($label === '' || $value === '') {
                    return null;
                }

                return [
                    'id' => trim((string) ($option['id'] ?? '')) !== ''
                        ? trim((string) $option['id'])
                        : $fieldKey . '-option-' . ($index + 1),
                    'label' => $label,
                    'value' => $value,
                    'detail' => $this->normalizeOptionDetail($option['detail'] ?? []),
                ];
            })
            ->filter(fn ($option) => is_array($option))
            ->values()
            ->all();
    }

    private function normalizeOptionDetail(mixed $rawDetail): array
    {
        $detail = is_array($rawDetail) ? $rawDetail : [];

        return [
            'enabled' => (bool) ($detail['enabled'] ?? false),
            'label' => trim((string) ($detail['label'] ?? '')),
            'placeholder' => trim((string) ($detail['placeholder'] ?? '')),
            'help_text' => trim((string) ($detail['help_text'] ?? '')),
            'required' => (bool) ($detail['required'] ?? false),
        ];
    }

    private function getOptionDetailResponseKey(string $fieldKey, string $optionId): string
    {
        return $fieldKey . '__detail__' . $optionId;
    }

    private function toStableJson(array $payload): string
    {
        return (string) json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    }
}
