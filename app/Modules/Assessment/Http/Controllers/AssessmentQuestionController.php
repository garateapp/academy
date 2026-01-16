<?php

namespace App\Modules\Assessment\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Assessment\Domain\Assessment;
use App\Modules\Assessment\Domain\AssessmentQuestion;
use App\Modules\Assessment\Http\Requests\StoreQuestionRequest;
use App\Modules\Assessment\Http\Requests\UpdateQuestionRequest;
use App\Modules\Audit\Application\AuditService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AssessmentQuestionController extends Controller
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function create(Assessment $assessment): InertiaResponse
    {
        $this->authorize('update', $assessment);

        return Inertia::render('Admin/Assessments/Questions/Create', [
            'assessment' => $assessment,
        ]);
    }

    public function store(StoreQuestionRequest $request, Assessment $assessment): RedirectResponse
    {
        $this->authorize('update', $assessment);

        DB::transaction(function () use ($request, $assessment) {
            $validated = $request->validated();

            // Get the next sort order
            $maxSortOrder = $assessment->questions()->max('sort_order') ?? -1;
            $validated['sort_order'] = $maxSortOrder + 1;

            $question = $assessment->questions()->create($validated);

            // Create options if provided
            if (!empty($validated['options'])) {
                foreach ($validated['options'] as $index => $optionData) {
                    $question->options()->create([
                        'option_text' => $optionData['option_text'],
                        'is_correct' => $optionData['is_correct'] ?? false,
                        'sort_order' => $index,
                    ]);
                }
            }

            $this->auditService->log(
                action: 'assessment.question_created',
                entityType: 'assessment_question',
                entityId: (string) $question->id,
                payload: [
                    'assessment_id' => $assessment->id,
                    'question_id' => $question->id,
                    'type' => $question->type,
                ]
            );
        });

        return redirect()->route('assessments.show', $assessment)
            ->with('success', 'Pregunta agregada exitosamente.');
    }

    public function edit(Assessment $assessment, AssessmentQuestion $question): InertiaResponse
    {
        $this->authorize('update', $assessment);

        $question->load('options');

        return Inertia::render('Admin/Assessments/Questions/Edit', [
            'assessment' => $assessment,
            'question' => $question,
        ]);
    }

    public function update(UpdateQuestionRequest $request, Assessment $assessment, AssessmentQuestion $question): RedirectResponse
    {
        $this->authorize('update', $assessment);

        DB::transaction(function () use ($request, $question) {
            $validated = $request->validated();

            $question->update([
                'type' => $validated['type'],
                'question_text' => $validated['question_text'],
                'explanation' => $validated['explanation'] ?? null,
                'points' => $validated['points'],
                'is_required' => $validated['is_required'] ?? true,
            ]);

            // Update options if provided
            if (isset($validated['options'])) {
                // Delete existing options
                $question->options()->delete();

                // Create new options
                foreach ($validated['options'] as $index => $optionData) {
                    $question->options()->create([
                        'option_text' => $optionData['option_text'],
                        'is_correct' => $optionData['is_correct'] ?? false,
                        'sort_order' => $index,
                    ]);
                }
            }

            $this->auditService->log(
                action: 'assessment.question_updated',
                entityType: 'assessment_question',
                entityId: (string) $question->id,
                payload: [
                    'assessment_id' => $question->assessment_id,
                    'question_id' => $question->id,
                ]
            );
        });

        return redirect()->route('assessments.show', $assessment)
            ->with('success', 'Pregunta actualizada exitosamente.');
    }

    public function destroy(Assessment $assessment, AssessmentQuestion $question): RedirectResponse
    {
        $this->authorize('update', $assessment);

        // Check if there are any responses
        if ($question->responses()->exists()) {
            return back()->with('error', 'No se puede eliminar una pregunta que tiene respuestas registradas.');
        }

        $question->delete();

        $this->auditService->log(
            action: 'assessment.question_deleted',
            entityType: 'assessment_question',
            entityId: (string) $question->id,
            payload: [
                'assessment_id' => $assessment->id,
                'question_id' => $question->id,
            ]
        );

        return back()->with('success', 'Pregunta eliminada exitosamente.');
    }

    public function reorder(Assessment $assessment): RedirectResponse
    {
        $this->authorize('update', $assessment);

        $questions = request()->input('questions', []);

        DB::transaction(function () use ($questions) {
            foreach ($questions as $index => $questionId) {
                AssessmentQuestion::where('id', $questionId)
                    ->update(['sort_order' => $index]);
            }
        });

        return back()->with('success', 'Orden de preguntas actualizado.');
    }

    public function downloadTemplate(Assessment $assessment): StreamedResponse
    {
        $this->authorize('update', $assessment);

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="assessment_questions_template.csv"',
        ];

        $columns = [
            'type',
            'question_text',
            'explanation',
            'points',
            'is_required',
            'option_1',
            'option_2',
            'option_3',
            'option_4',
            'option_5',
            'option_6',
            'correct_options',
        ];

        $sample = [
            'multiple_choice',
            'What is the correct safety step before operating the machine?',
            'Always verify protective equipment.',
            '5',
            '1',
            'Check PPE',
            'Skip inspection',
            'Ignore checklist',
            '',
            '',
            '',
            '1',
        ];

        return Response::streamDownload(function () use ($columns, $sample) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, $columns);
            fputcsv($handle, $sample);
            fclose($handle);
        }, 'assessment_questions_template.csv', $headers);
    }

    public function bulkUpload(Request $request, Assessment $assessment): RedirectResponse
    {
        $this->authorize('update', $assessment);

        $validated = $request->validate([
            'file' => ['required', 'file', 'mimes:csv,txt', 'max:2048'],
        ]);

        $file = $validated['file'];
        $handle = fopen($file->getRealPath(), 'r');
        if (!$handle) {
            return back()->with('error', 'No se pudo leer el archivo.');
        }

        $headerLine = fgets($handle);
        if ($headerLine === false) {
            fclose($handle);
            return back()->with('error', 'El archivo esta vacio.');
        }

        $delimiter = substr_count($headerLine, ';') > substr_count($headerLine, ',') ? ';' : ',';
        $header = str_getcsv($headerLine, $delimiter);
        if (!$header) {
            fclose($handle);
            return back()->with('error', 'El archivo esta vacio.');
        }

        $header[0] = ltrim((string) $header[0], "\xEF\xBB\xBF");
        $headerMap = array_map(fn ($value) => strtolower(trim((string) $value)), $header);
        $index = array_flip($headerMap);

        $requiredColumns = ['type', 'question_text', 'points'];
        foreach ($requiredColumns as $column) {
            if (!array_key_exists($column, $index)) {
                fclose($handle);
                return back()->with('error', "Falta la columna requerida: {$column}.");
            }
        }

        $created = 0;
        $errors = [];

        DB::transaction(function () use (
            $handle,
            $index,
            $assessment,
            $delimiter,
            &$created,
            &$errors
        ) {
            $sortOrder = $assessment->questions()->max('sort_order') ?? -1;
            $rowNumber = 1;

            while (($line = fgets($handle)) !== false) {
                $row = str_getcsv($line, $delimiter);
                $rowNumber++;
                $normalize = static function ($value): string {
                    $text = trim((string) $value);
                    if ($text === '') {
                        return '';
                    }
                    $converted = @iconv('UTF-8', 'UTF-8//IGNORE', $text);
                    if ($converted !== false && $converted !== '') {
                        return $converted;
                    }
                    $fallback = @iconv('ISO-8859-1', 'UTF-8//IGNORE', $text);
                    return $fallback !== false ? $fallback : $text;
                };

                $type = strtolower($normalize($row[$index['type']] ?? ''));
                $questionText = $normalize($row[$index['question_text']] ?? '');
                $points = $normalize($row[$index['points']] ?? '');

                if ($type === '' || $questionText === '' || $points === '') {
                    $errors[] = "Fila {$rowNumber}: faltan campos obligatorios.";
                    continue;
                }

                if (!in_array($type, ['multiple_choice', 'true_false', 'short_answer', 'essay', 'matching'], true)) {
                    $errors[] = "Fila {$rowNumber}: tipo invalido.";
                    continue;
                }

                if (!is_numeric($points)) {
                    $errors[] = "Fila {$rowNumber}: puntos invalidos.";
                    continue;
                }

                $sortOrder++;
                $question = $assessment->questions()->create([
                    'type' => $type,
                    'question_text' => $questionText,
                    'explanation' => ($normalize($row[$index['explanation']] ?? '') ?: null),
                    'points' => (int) $points,
                    'is_required' => $normalize($row[$index['is_required']] ?? '') !== '0',
                    'sort_order' => $sortOrder,
                ]);

                $options = [];
                for ($i = 1; $i <= 6; $i++) {
                    $optionKey = "option_{$i}";
                    if (!array_key_exists($optionKey, $index)) {
                        continue;
                    }
                    $value = $normalize($row[$index[$optionKey]] ?? '');
                    if ($value !== '') {
                        $options[] = $value;
                    }
                }

                $correctOptionsRaw = trim((string) ($row[$index['correct_options']] ?? ''));
                $correctIndices = [];

                if ($correctOptionsRaw !== '') {
                    $parts = preg_split('/[|,;]/', $correctOptionsRaw);
                    foreach ($parts as $part) {
                        $value = strtolower(trim($part));
                        if ($value === 'true') {
                            $correctIndices[] = 1;
                        } elseif ($value === 'false') {
                            $correctIndices[] = 2;
                        } elseif (is_numeric($value)) {
                            $correctIndices[] = (int) $value;
                        }
                    }
                }

                if ($type === 'true_false' && count($options) === 0) {
                    $options = ['True', 'False'];
                }

                if ($type === 'multiple_choice' || $type === 'true_false') {
                    foreach ($options as $indexOption => $optionText) {
                        $question->options()->create([
                            'option_text' => $optionText,
                            'is_correct' => in_array($indexOption + 1, $correctIndices, true),
                            'sort_order' => $indexOption,
                        ]);
                    }
                }

                $created++;
            }
        });

        fclose($handle);

        if (count($errors) > 0) {
            $message = "Se importaron {$created} preguntas. Errores: " . implode(' | ', array_slice($errors, 0, 3));
            return back()->with('warning', $message);
        }

        return back()->with('success', "Se importaron {$created} preguntas exitosamente.");
    }
}
