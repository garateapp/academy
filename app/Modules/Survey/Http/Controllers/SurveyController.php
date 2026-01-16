<?php

namespace App\Modules\Survey\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Survey\Domain\Survey;
use App\Modules\Survey\Domain\SurveyAssignment;
use App\Modules\Identity\Domain\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use ZipArchive;

class SurveyController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Survey::class, 'survey');
    }

    public function index(): Response
    {
        $surveys = Survey::withCount(['questions', 'assignments', 'responses'])
            ->orderByDesc('created_at')
            ->paginate(15);

        return Inertia::render('Admin/Surveys/Index', [
            'surveys' => $surveys,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Surveys/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:draft,published,closed'],
            'is_anonymous' => ['boolean'],
            'expires_at' => ['required', 'date'],
        ]);

        $data['created_by'] = $request->user()?->id;

        $survey = Survey::create($data);

        return redirect()->route('admin.surveys.show', $survey)
            ->with('success', 'Encuesta creada exitosamente.');
    }

    public function show(Survey $survey): Response
    {
        $survey->load(['questions.options']);

        $assignments = SurveyAssignment::with('user')
            ->where('survey_id', $survey->id)
            ->orderByDesc('created_at')
            ->get();

        $availableUsers = User::orderBy('name')
            ->get(['id', 'name', 'email']);

        $stats = [
            'assignments' => $assignments->count(),
            'completed' => $assignments->where('status', 'completed')->count(),
            'responses' => $survey->responses()->count(),
        ];

        return Inertia::render('Admin/Surveys/Show', [
            'survey' => $survey,
            'assignments' => $assignments,
            'availableUsers' => $availableUsers,
            'stats' => $stats,
        ]);
    }

    public function edit(Survey $survey): Response
    {
        return Inertia::render('Admin/Surveys/Edit', [
            'survey' => $survey,
        ]);
    }

    public function update(Request $request, Survey $survey): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:draft,published,closed'],
            'is_anonymous' => ['boolean'],
            'expires_at' => ['required', 'date'],
        ]);

        $data['updated_by'] = $request->user()?->id;

        $survey->update($data);

        return redirect()->route('admin.surveys.show', $survey)
            ->with('success', 'Encuesta actualizada exitosamente.');
    }

    public function destroy(Survey $survey): RedirectResponse
    {
        $survey->delete();

        return redirect()->route('admin.surveys.index')
            ->with('success', 'Encuesta eliminada exitosamente.');
    }

    public function export(Request $request, Survey $survey): StreamedResponse
    {
        if (!Gate::allows('surveys.export')) {
            abort(403);
        }

        $format = strtolower($request->query('format', 'csv'));
        $survey->load(['questions', 'assignments.responses.selectedOptions', 'assignments.responses.question', 'assignments.user']);

        $rows = $this->buildExportRows($survey);
        $filenameBase = Str::slug($survey->title) . '-' . now()->format('Y-m-d');

        if ($format === 'xlsx') {
            $content = $this->buildXlsx($rows);
            $filename = $filenameBase . '.xlsx';

            return response()->streamDownload(function () use ($content) {
                echo $content;
            }, $filename, [
                'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ]);
        }

        $filename = $filenameBase . '.csv';

        return response()->streamDownload(function () use ($rows) {
            $handle = fopen('php://output', 'w');
            foreach ($rows as $row) {
                fputcsv($handle, $row, ';');
            }
            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    private function buildExportRows(Survey $survey): array
    {
        $rows = [
            [
                'Encuesta',
                'Usuario',
                'Email',
                'Pregunta',
                'Tipo',
                'Respuesta',
                'Enviado',
            ],
        ];

        foreach ($survey->assignments as $assignment) {
            foreach ($assignment->responses as $response) {
                $question = $response->question;
                $answer = '';

                if ($question && $question->type !== 'text') {
                    $answer = $response->selectedOptions
                        ->pluck('option_text')
                        ->implode(', ');
                } else {
                    $answer = $response->text_response ?? '';
                }

                $rows[] = [
                    $survey->title,
                    $survey->is_anonymous ? 'Anonimo' : ($assignment->user?->name ?? '-'),
                    $survey->is_anonymous ? '-' : ($assignment->user?->email ?? '-'),
                    $question?->prompt ?? '-',
                    $question?->type ?? '-',
                    $answer,
                    optional($assignment->completed_at)->format('Y-m-d H:i') ?? '-',
                ];
            }
        }

        return $rows;
    }

    private function buildXlsx(array $rows): string
    {
        $sheetXml = $this->buildSheetXml($rows);
        $contentTypes = $this->buildContentTypes();
        $rels = $this->buildRootRels();
        $workbook = $this->buildWorkbook();
        $workbookRels = $this->buildWorkbookRels();

        $tempFile = tempnam(sys_get_temp_dir(), 'xlsx_');
        $zip = new ZipArchive();
        $zip->open($tempFile, ZipArchive::OVERWRITE);
        $zip->addFromString('[Content_Types].xml', $contentTypes);
        $zip->addFromString('_rels/.rels', $rels);
        $zip->addFromString('xl/workbook.xml', $workbook);
        $zip->addFromString('xl/_rels/workbook.xml.rels', $workbookRels);
        $zip->addFromString('xl/worksheets/sheet1.xml', $sheetXml);
        $zip->close();

        $content = file_get_contents($tempFile) ?: '';
        unlink($tempFile);

        return $content;
    }

    private function buildSheetXml(array $rows): string
    {
        $rowXml = '';
        foreach ($rows as $rowIndex => $row) {
            $cells = '';
            foreach ($row as $colIndex => $value) {
                $cellRef = $this->columnLetter($colIndex + 1) . ($rowIndex + 1);
                $escaped = htmlspecialchars((string) $value, ENT_XML1);
                $cells .= "<c r=\"{$cellRef}\" t=\"inlineStr\"><is><t>{$escaped}</t></is></c>";
            }
            $rowXml .= "<row r=\"" . ($rowIndex + 1) . "\">{$cells}</row>";
        }

        return '<?xml version="1.0" encoding="UTF-8"?>'
            . '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
            . '<sheetData>' . $rowXml . '</sheetData>'
            . '</worksheet>';
    }

    private function columnLetter(int $index): string
    {
        $letter = '';
        while ($index > 0) {
            $mod = ($index - 1) % 26;
            $letter = chr(65 + $mod) . $letter;
            $index = intdiv($index - 1, 26);
        }
        return $letter;
    }

    private function buildContentTypes(): string
    {
        return '<?xml version="1.0" encoding="UTF-8"?>'
            . '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            . '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            . '<Default Extension="xml" ContentType="application/xml"/>'
            . '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
            . '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
            . '</Types>';
    }

    private function buildRootRels(): string
    {
        return '<?xml version="1.0" encoding="UTF-8"?>'
            . '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            . '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
            . '</Relationships>';
    }

    private function buildWorkbook(): string
    {
        return '<?xml version="1.0" encoding="UTF-8"?>'
            . '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
            . '<sheets><sheet name="Resultados" sheetId="1" r:id="rId1"/></sheets>'
            . '</workbook>';
    }

    private function buildWorkbookRels(): string
    {
        return '<?xml version="1.0" encoding="UTF-8"?>'
            . '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            . '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'
            . '</Relationships>';
    }
}
