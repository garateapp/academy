<?php

namespace App\Modules\Reporting\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Assessment\Domain\Assessment;
use App\Modules\Certificate\Domain\Certificate;
use App\Modules\Identity\Domain\User;
use App\Modules\Learning\Domain\Category;
use App\Modules\Learning\Domain\Course;
use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Learning\Domain\LearningPath;
use App\Modules\Reporting\Application\Services\CourseReportService;
use App\Modules\Reporting\Application\Services\TrainingHoursService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use OpenSpout\Common\Entity\Row;
use OpenSpout\Common\Entity\Style\Style;
use OpenSpout\Writer\XLSX\Writer;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ReportController extends Controller
{
    /**
     * Reporte por curso: lista los participantes de todos los cursos o de un curso
     * especifico, quienes lo finalizaron y quienes no, junto con el porcentaje
     * obtenido en la evaluacion. Restringido a administradores y superadministradores.
     */
    public function byCourse(Request $request): Response
    {
        $this->authorizeCourseReport($request);

        $service = app(CourseReportService::class);

        $course     = $this->resolveCourse($request);
        $completion = $this->resolveCompletion($request);

        $courses      = $service->courses();
        $participants = $service->participants($course ? [$course->id] : $courses->pluck('id')->all());

        return Inertia::render('Admin/Reports/CourseReport', [
            'course' => $course ? [
                'id'       => $course->id,
                'title'    => $course->title,
                'status'   => $course->status,
                'category' => $course->category?->name,
            ] : null,
            'courses'      => $courses,
            'summary'      => $service->summary($participants),
            'participants' => $service->filterByCompletion($participants, $completion),
            'filters'      => [
                'course_id'  => $course?->id,
                'completion' => $completion,
            ],
        ]);
    }

    /**
     * Exportacion a Excel del reporte por curso:
     * hoja 1 = consolidado por curso, hoja 2 = detalle de los alumnos inscritos.
     */
    public function exportByCourse(Request $request): BinaryFileResponse
    {
        $this->authorizeCourseReport($request);

        $service = app(CourseReportService::class);

        $course = $this->resolveCourse($request);

        $courses = $course
            ? $service->courses()->where('id', $course->id)
            : $service->courses();

        $consolidated = $service->consolidated($courses);
        // La hoja de detalle lista a todos los alumnos inscritos, sin filtrar por finalizacion.
        $detail = $service->participants($courses->pluck('id')->all());

        $path = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'reporte-por-curso-' . uniqid() . '.xlsx';

        try {
            $this->writeReportExcel($path, $consolidated, $detail);
        } catch (\Throwable $exception) {
            @unlink($path);

            throw $exception;
        }

        return response()->download(
            $path,
            'reporte-por-curso-' . now()->format('Ymd-His') . '.xlsx',
            ['Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        )->deleteFileAfterSend(true);
    }

    private function writeReportExcel(string $path, Collection $consolidated, Collection $detail): void
    {
        // El color debe ir en formato aARRGGBB (sin '#'), si no el XLSX queda corrupto.
        $headerStyle = (new Style)->setFontBold()->setBackgroundColor('FFDDEBF7');
        $totalStyle  = (new Style)->setFontBold();

        $writer = new Writer;
        $writer->openToFile($path);

        // Hoja 1: consolidado por curso
        $writer->getCurrentSheet()->setName('Consolidado');
        $writer->addRow(Row::fromValues([
            'Curso',
            'Categoria',
            'Estado',
            'Participantes',
            'Finalizados',
            'No finalizados',
            '% Finalizacion',
            'Evaluados',
            'Aprobados',
            'Promedio % evaluacion',
        ], $headerStyle));

        foreach ($consolidated as $row) {
            $writer->addRow(Row::fromValues([
                $row['course'],
                $row['category'],
                $row['status'],
                $row['participants'],
                $row['completed'],
                $row['pending'],
                $row['completion_rate'],
                $row['evaluated'],
                $row['passed'],
                $row['average_score'],
            ]));
        }

        $totalParticipants = (int) $consolidated->sum('participants');
        $totalCompleted    = (int) $consolidated->sum('completed');
        $totalEvaluated    = (int) $consolidated->sum('evaluated');
        $weightedScore     = (float) $consolidated->sum(
            fn ($row) => (float) ($row['average_score'] ?? 0) * (int) $row['evaluated']
        );

        $writer->addRow(Row::fromValues([
            'TOTAL',
            null,
            null,
            $totalParticipants,
            $totalCompleted,
            $totalParticipants - $totalCompleted,
            $totalParticipants > 0 ? round(($totalCompleted / $totalParticipants) * 100, 1) : 0,
            $totalEvaluated,
            (int) $consolidated->sum('passed'),
            $totalEvaluated > 0 ? round($weightedScore / $totalEvaluated, 1) : null,
        ], $totalStyle));

        // Hoja 2: detalle de los alumnos inscritos
        $writer->addNewSheetAndMakeItCurrent()->setName('Detalle');
        $writer->addRow(Row::fromValues([
            'Curso',
            'Participante',
            'Email',
            'Estado inscripcion',
            'Finalizo',
            'Inicio',
            'Fecha finalizacion',
            '% Evaluacion',
            'Intentos',
            'Resultado',
        ], $headerStyle));

        foreach ($detail as $row) {
            $writer->addRow(Row::fromValues([
                $row['course'],
                $row['name'],
                $row['email'],
                $row['status'],
                $row['completed'] ? 'Si' : 'No',
                $row['started_at'],
                $row['completed_at'],
                $row['evaluation_score'],
                $row['evaluation_attempts'],
                $row['evaluation_score'] === null
                    ? null
                    : ($row['evaluation_passed'] ? 'Aprobado' : 'Reprobado'),
            ]));
        }

        $writer->close();
    }

    private function resolveCourse(Request $request): ?Course
    {
        $courseId = $request->input('course_id');

        return $courseId
            ? Course::query()->findOrFail($courseId)
            : null;
    }

    private function resolveCompletion(Request $request): ?string
    {
        $completion = $request->input('completion');

        return in_array($completion, ['completed', 'pending'], true) ? $completion : null;
    }

    /**
     * Este reporte es exclusivo de administradores y superadministradores.
     */
    private function authorizeCourseReport(Request $request): void
    {
        $user     = $request->user();
        $roleName = strtolower($user?->role?->name ?? '');
        $roleSlug = strtolower($user?->role?->slug ?? '');
        $isAdmin  = in_array($roleName, ['superadmin', 'admin'], true)
            || in_array($roleSlug, ['superadmin', 'super-admin', 'admin'], true);

        abort_unless($isAdmin, 403);
    }

    public function index(Request $request): Response
    {
        $this->authorize('view-reports');

        $filters = [
            'user_id'     => $request->input('user_id'),
            'course_id'   => $request->input('course_id'),
            'category_id' => $request->input('category_id'),
            'date_from'   => $request->input('date_from'),
            'date_to'     => $request->input('date_to'),
        ];

        $dateFrom = $filters['date_from']
            ? Carbon::parse($filters['date_from'])->startOfDay()
            : null;
        $dateTo = $filters['date_to']
            ? Carbon::parse($filters['date_to'])->endOfDay()
            : null;

        $applyEnrollmentFilters = function ($query) use ($filters, $dateFrom, $dateTo) {
            if ($filters['user_id']) {
                $query->where('enrollments.user_id', $filters['user_id']);
            }

            if ($filters['course_id']) {
                $query->where('enrollments.course_id', $filters['course_id']);
            }

            if ($filters['category_id']) {
                $query->whereHas('course', function ($courseQuery) use ($filters) {
                    $courseQuery->where('category_id', $filters['category_id']);
                });
            }

            if ($dateFrom && $dateTo) {
                $query->whereBetween('enrollments.created_at', [$dateFrom, $dateTo]);
            } elseif ($dateFrom) {
                $query->where('enrollments.created_at', '>=', $dateFrom);
            } elseif ($dateTo) {
                $query->where('enrollments.created_at', '<=', $dateTo);
            }
        };

        $applyCertificateFilters = function ($query) use ($filters, $dateFrom, $dateTo) {
            if ($filters['user_id']) {
                $query->where('user_id', $filters['user_id']);
            }

            if ($filters['course_id']) {
                $query->where('course_id', $filters['course_id']);
            }

            if ($filters['category_id']) {
                $query->whereHas('course', function ($courseQuery) use ($filters) {
                    $courseQuery->where('category_id', $filters['category_id']);
                });
            }

            if ($dateFrom && $dateTo) {
                $query->whereBetween('issued_at', [$dateFrom, $dateTo]);
            } elseif ($dateFrom) {
                $query->where('issued_at', '>=', $dateFrom);
            } elseif ($dateTo) {
                $query->where('issued_at', '<=', $dateTo);
            }
        };

        $usersTotal   = $filters['user_id'] ? 1 : User::count();
        $coursesTotal = $filters['course_id']
            ? 1
            : Course::when($filters['category_id'], function ($query) use ($filters) {
                $query->where('category_id', $filters['category_id']);
            })->count();

        $totals = [
            'users'          => $usersTotal,
            'courses'        => $coursesTotal,
            'categories'     => Category::count(),
            'learning_paths' => LearningPath::count(),
            'assessments'    => Assessment::count(),
            'enrollments'    => Enrollment::tap($applyEnrollmentFilters)->count(),
            'certificates'   => Certificate::tap($applyCertificateFilters)->count(),
        ];

        $enrollmentStatus = Enrollment::tap($applyEnrollmentFilters)
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->orderByDesc('total')
            ->get()
            ->map(fn ($row) => [
                'status' => $row->status ?? 'unknown',
                'total'  => (int) $row->total,
            ])
            ->toArray();

        $coursesByUserQuery = Enrollment::query()
            ->join('users', 'users.id', '=', 'enrollments.user_id');

        if ($filters['course_id']) {
            $coursesByUserQuery->where('enrollments.course_id', $filters['course_id']);
        }

        if ($filters['user_id']) {
            $coursesByUserQuery->where('enrollments.user_id', $filters['user_id']);
        }

        if ($filters['category_id']) {
            $coursesByUserQuery
                ->join('courses', 'courses.id', '=', 'enrollments.course_id')
                ->where('courses.category_id', $filters['category_id']);
        }

        if ($dateFrom && $dateTo) {
            $coursesByUserQuery->whereBetween('enrollments.created_at', [$dateFrom, $dateTo]);
        } elseif ($dateFrom) {
            $coursesByUserQuery->where('enrollments.created_at', '>=', $dateFrom);
        } elseif ($dateTo) {
            $coursesByUserQuery->where('enrollments.created_at', '<=', $dateTo);
        }

        $coursesByUser = $coursesByUserQuery
            ->select([
                'users.id',
                'users.name',
                'users.email',
                DB::raw('count(enrollments.id) as total'),
                DB::raw("sum(case when enrollments.status = 'active' then 1 else 0 end) as active"),
                DB::raw("sum(case when enrollments.status = 'completed' then 1 else 0 end) as completed"),
            ])
            ->groupBy('users.id', 'users.name', 'users.email')
            ->orderByDesc('total')
            ->limit(12)
            ->get()
            ->map(fn ($user) => [
                'id'        => $user->id,
                'name'      => $user->name,
                'email'     => $user->email,
                'total'     => (int) $user->total,
                'active'    => (int) $user->active,
                'completed' => (int) $user->completed,
            ]);

        $mostEnrolledCourses = Course::select('id', 'title', 'status', 'category_id')
            ->with('category:id,name')
            ->withCount([
                'enrollments as enrollments_count' => function ($query) use ($applyEnrollmentFilters) {
                    $applyEnrollmentFilters($query);
                },
                'enrollments as completed_enrollments_count' => function ($query) use ($applyEnrollmentFilters) {
                    $applyEnrollmentFilters($query);
                    $query->where('status', 'completed');
                },
            ])
            ->when($filters['course_id'], function ($query) use ($filters) {
                $query->where('id', $filters['course_id']);
            })
            ->when($filters['category_id'], function ($query) use ($filters) {
                $query->where('category_id', $filters['category_id']);
            })
            ->orderByDesc('enrollments_count')
            ->limit(12)
            ->get()
            ->map(function ($course) {
                $total     = (int) $course->enrollments_count;
                $completed = (int) $course->completed_enrollments_count;
                $rate      = $total > 0 ? round(($completed / $total) * 100, 1) : 0;

                return [
                    'id'              => $course->id,
                    'title'           => $course->title,
                    'category'        => $course->category?->name,
                    'status'          => $course->status,
                    'total'           => $total,
                    'completed'       => $completed,
                    'completion_rate' => $rate,
                ];
            });

        $fromMonth       = Carbon::now()->subMonths(5)->startOfMonth();
        $monthExpression = DB::getDriverName() === 'sqlite'
            ? "strftime('%Y-%m', issued_at) as month"
            : "DATE_FORMAT(issued_at, '%Y-%m') as month";
        $certificatesByMonth = Certificate::tap($applyCertificateFilters)
            ->selectRaw("$monthExpression, count(*) as total")
            ->whereNotNull('issued_at')
            ->where('issued_at', '>=', $fromMonth)
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn ($row) => [
                'month' => $row->month,
                'total' => (int) $row->total,
            ])
            ->toArray();

        $activeUsersLast30 = Enrollment::tap($applyEnrollmentFilters)
            ->where('created_at', '>=', now()->subDays(30))
            ->distinct('user_id')
            ->count('user_id');

        $completedEnrollments = Enrollment::tap($applyEnrollmentFilters)
            ->where('status', 'completed')
            ->count();
        $completionRate = $totals['enrollments'] > 0
            ? round(($completedEnrollments / $totals['enrollments']) * 100, 1)
            : 0;

        $totalTrainingQuery = Enrollment::query()
            ->where('status', 'completed')
            ->join('module_completions', 'module_completions.enrollment_id', '=', 'enrollments.id');
        $applyEnrollmentFilters($totalTrainingQuery);
        $totalTrainingSeconds = (int) $totalTrainingQuery
            ->sum('module_completions.time_spent_seconds');

        $uniqueUsersQuery = Enrollment::query()
            ->where('status', 'completed')
            ->join('module_completions', 'module_completions.enrollment_id', '=', 'enrollments.id');
        $applyEnrollmentFilters($uniqueUsersQuery);
        $uniqueUsersWithCompletions = $uniqueUsersQuery
            ->distinct('enrollments.user_id')
            ->count('enrollments.user_id');

        $totalTrainingHours  = round($totalTrainingSeconds / 3600, 1);
        $averageHoursPerUser = $uniqueUsersWithCompletions > 0
            ? round($totalTrainingHours / $uniqueUsersWithCompletions, 1)
            : 0;

        $trainingHoursByCompany = app(TrainingHoursService::class)
            ->byCompany($applyEnrollmentFilters);

        $users = User::select('id', 'name', 'email')
            ->orderBy('name')
            ->get()
            ->map(fn ($user) => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ]);

        $courses = Course::select('id', 'title', 'category_id')
            ->with('category:id,name')
            ->orderBy('title')
            ->get()
            ->map(fn ($course) => [
                'id'       => $course->id,
                'title'    => $course->title,
                'category' => $course->category?->name,
            ]);

        $categories = Category::select('id', 'name')
            ->orderBy('name')
            ->get()
            ->map(fn ($category) => [
                'id'   => $category->id,
                'name' => $category->name,
            ]);

        return Inertia::render('Admin/Reports/Index', [
            'totals'                     => $totals,
            'enrollmentStatus'           => $enrollmentStatus,
            'coursesByUser'              => $coursesByUser,
            'mostEnrolledCourses'        => $mostEnrolledCourses,
            'certificatesByMonth'        => $certificatesByMonth,
            'activeUsersLast30'          => $activeUsersLast30,
            'completionRate'             => $completionRate,
            'totalTrainingHours'         => $totalTrainingHours,
            'averageHoursPerUser'        => $averageHoursPerUser,
            'uniqueUsersWithCompletions' => $uniqueUsersWithCompletions,
            'trainingHoursByCompany'     => $trainingHoursByCompany,
            'filters'                    => $filters,
            'users'                      => $users,
            'courses'                    => $courses,
            'categories'                 => $categories,
        ]);
    }
}
