<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Modules\Assessment\Domain\Assessment;
use App\Modules\Identity\Domain\User;
use App\Modules\Learning\Domain\Category;
use App\Modules\Learning\Domain\Course;

Route::get('/', function () {
    $categories = Category::withCount('courses')
        ->orderBy('name')
        ->limit(8)
        ->get()
        ->map(fn($category) => [
            'id' => $category->id,
            'name' => $category->name,
            'courses_count' => (int) $category->courses_count,
        ]);

    $featuredCourses = Course::with(['creator', 'category'])
        ->withCount('enrollments')
        ->whereIn('status', ['published', 'active'])
        ->orderByDesc('enrollments_count')
        ->orderByDesc('published_at')
        ->limit(3)
        ->get()
        ->values()
        ->map(function ($course, $index) {
            $tags = ['Popular', 'Nuevo', 'Destacado'];

            return [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'duration_minutes' => $course->duration_minutes,
                'cover_image' => $course->cover_image,
                'enrollments_count' => (int) $course->enrollments_count,
                'creator_name' => $course->creator?->name ?? 'Equipo Greenex',
                'category_name' => $course->category?->name,
                'tag' => $tags[$index] ?? 'Destacado',
            ];
        });

    $stats = [
        'students' => User::count(),
        'courses' => Course::whereIn('status', ['published', 'active'])->count(),
        'categories' => Category::count(),
        'assessments' => Assessment::count(),
    ];

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'stats' => $stats,
        'categories' => $categories,
        'featuredCourses' => $featuredCourses,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        $roleName = strtolower($user->role?->name ?? '');
        $roleSlug = strtolower($user->role?->slug ?? '');
        $isAdmin = in_array($roleName, ['superadmin', 'admin'], true)
            || in_array($roleSlug, ['superadmin', 'super-admin', 'admin'], true);

        $stats = [];
        $learnerData = null;

        if ($isAdmin) {
            // Admin stats
            $stats = [
                'total_users' => \App\Modules\Identity\Domain\User::count(),
                'total_courses' => \App\Modules\Learning\Domain\Course::count(),
                'total_assessments' => \App\Modules\Assessment\Domain\Assessment::count(),
                'total_certificates' => \App\Modules\Certificate\Domain\Certificate::count(),
                'active_enrollments' => \App\Modules\Learning\Domain\Enrollment::where('status', 'active')->count(),
            ];

            // Recent activities from audit log
            $recentActivities = \App\Modules\Audit\Domain\AuditLog::with('actor')
                ->latest()
                ->take(10)
                ->get()
                ->map(fn($log) => [
                    'id' => $log->id,
                    'description' => $log->action . ' en ' . ($log->entity_type ?? 'sistema'),
                    'created_at' => $log->created_at,
                ]);
        } else {
            $activeEnrollments = \App\Modules\Learning\Domain\Enrollment::with([
                'course.category',
                'course.modules' => fn($query) => $query->where('is_required', true),
                'moduleCompletions.module' => fn($query) => $query->where('is_required', true),
            ])
                ->where('user_id', $user->id)
                ->where('status', 'active')
                ->orderByDesc('created_at')
                ->get()
                ->map(function ($enrollment) {
                    $requiredModules = $enrollment->course?->modules ?? collect();
                    $requiredCount = $requiredModules->count();
                    $completedModuleIds = $enrollment->moduleCompletions
                        ->filter(fn($completion) => $completion->module && $completion->module->is_required)
                        ->pluck('module_id')
                        ->all();
                    $progressRows = \App\Modules\Learning\Domain\ModuleProgress::where('user_id', $enrollment->user_id)
                        ->where('enrollment_id', $enrollment->id)
                        ->get()
                        ->keyBy('module_id');
                    $progressSum = 0;

                    foreach ($requiredModules as $module) {
                        if (in_array($module->id, $completedModuleIds, true)) {
                            $progressSum += 100;
                            continue;
                        }
                        $moduleProgress = $progressRows->get($module->id);
                        if ($moduleProgress) {
                            $progressSum += min(100, (float) $moduleProgress->percent_complete);
                        }
                    }

                    $completedModules = count($completedModuleIds);
                    $progress = $requiredCount > 0
                        ? round($progressSum / $requiredCount, 1)
                        : 0;

                    return [
                        'id' => $enrollment->id,
                        'status' => $enrollment->status,
                        'due_at' => $enrollment->due_at,
                        'started_at' => $enrollment->started_at,
                        'progress' => $progress,
                        'required_modules' => $requiredCount,
                        'completed_modules' => $completedModules,
                        'course' => [
                            'id' => $enrollment->course?->id ?? 0,
                            'title' => $enrollment->course?->title ?? 'Curso',
                            'category' => $enrollment->course?->category?->name,
                            'cover_image' => $enrollment->course?->cover_image,
                            'duration_minutes' => $enrollment->course?->duration_minutes,
                            'status' => $enrollment->course?->status,
                        ],
                    ];
                });

            $completedEnrollments = \App\Modules\Learning\Domain\Enrollment::with('course')
                ->where('user_id', $user->id)
                ->where('status', 'completed')
                ->orderByDesc('completed_at')
                ->limit(6)
                ->get()
                ->map(fn($enrollment) => [
                    'id' => $enrollment->id,
                    'status' => $enrollment->status,
                    'due_at' => $enrollment->due_at,
                    'started_at' => $enrollment->started_at,
                    'completed_at' => $enrollment->completed_at,
                    'progress' => 100,
                    'required_modules' => 0,
                    'completed_modules' => 0,
                    'course' => [
                        'id' => $enrollment->course?->id ?? 0,
                        'title' => $enrollment->course?->title ?? 'Curso',
                    ],
                ]);

            $recentCertificates = \App\Modules\Certificate\Domain\Certificate::with('course')
                ->where('user_id', $user->id)
                ->orderByDesc('issued_at')
                ->limit(6)
                ->get()
                ->map(fn($certificate) => [
                    'id' => $certificate->id,
                    'issued_at' => $certificate->issued_at,
                    'certificate_number' => $certificate->certificate_number,
                    'course' => [
                        'id' => $certificate->course?->id,
                        'title' => $certificate->course?->title,
                    ],
                ]);

            $learningPaths = \App\Modules\Learning\Domain\LearningPath::where('status', 'active')
                ->withCount('courses')
                ->orderByDesc('created_at')
                ->limit(4)
                ->get()
                ->map(fn($path) => [
                    'id' => $path->id,
                    'name' => $path->name,
                    'description' => $path->description,
                    'courses_count' => (int) $path->courses_count,
                    'duration_minutes' => (int) $path->getTotalDuration(),
                ]);

            $topCategories = \App\Modules\Learning\Domain\Enrollment::join('courses', 'courses.id', '=', 'enrollments.course_id')
                ->join('categories', 'categories.id', '=', 'courses.category_id')
                ->where('enrollments.user_id', $user->id)
                ->select('categories.name', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
                ->groupBy('categories.name')
                ->orderByDesc('total')
                ->limit(6)
                ->get()
                ->map(fn($row) => [
                    'name' => $row->name,
                    'total' => (int) $row->total,
                ]);

            // Learner stats
            $stats = [
                'my_courses' => $user->enrollments()->where('status', 'active')->count(),
                'my_certificates' => \App\Modules\Certificate\Domain\Certificate::where('user_id', $user->id)->count(),
                'pending_assessments' => 0, // TODO: calcular evaluaciones pendientes
                'active_enrollments' => $user->enrollments()->where('status', 'active')->count(),
                'completed_courses' => $user->enrollments()->where('status', 'completed')->count(),
            ];
            $recentActivities = null;

            $totalEnrollments = (int) $user->enrollments()->count();
            $completedEnrollmentsCount = (int) $user->enrollments()->where('status', 'completed')->count();
            $completionRate = $totalEnrollments > 0
                ? round(($completedEnrollmentsCount / $totalEnrollments) * 100, 1)
                : 0;

            $learnerData = [
                'active_enrollments' => $activeEnrollments,
                'completed_enrollments' => $completedEnrollments,
                'recent_certificates' => $recentCertificates,
                'learning_paths' => $learningPaths,
                'top_categories' => $topCategories,
                'completion_rate' => $completionRate,
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentActivities' => $recentActivities ?? null,
            'learner' => $learnerData,
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require app_path('Modules/Identity/Http/routes.php');
require app_path('Modules/Learning/Http/routes.php');
require app_path('Modules/Assessment/Http/routes.php');
require app_path('Modules/Certificate/Http/routes.php');
require app_path('Modules/Audit/Http/routes.php');
require app_path('Modules/Reporting/Http/routes.php');
require app_path('Modules/Survey/Http/routes.php');
