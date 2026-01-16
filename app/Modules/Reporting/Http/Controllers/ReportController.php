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
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorize('view-reports');

        $filters = [
            'user_id' => $request->input('user_id'),
            'course_id' => $request->input('course_id'),
            'category_id' => $request->input('category_id'),
            'date_from' => $request->input('date_from'),
            'date_to' => $request->input('date_to'),
        ];

        $dateFrom = $filters['date_from']
            ? Carbon::parse($filters['date_from'])->startOfDay()
            : null;
        $dateTo = $filters['date_to']
            ? Carbon::parse($filters['date_to'])->endOfDay()
            : null;

        $applyEnrollmentFilters = function ($query) use ($filters, $dateFrom, $dateTo) {
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
                $query->whereBetween('created_at', [$dateFrom, $dateTo]);
            } elseif ($dateFrom) {
                $query->where('created_at', '>=', $dateFrom);
            } elseif ($dateTo) {
                $query->where('created_at', '<=', $dateTo);
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

        $usersTotal = $filters['user_id'] ? 1 : User::count();
        $coursesTotal = $filters['course_id']
            ? 1
            : Course::when($filters['category_id'], function ($query) use ($filters) {
                $query->where('category_id', $filters['category_id']);
            })->count();

        $totals = [
            'users' => $usersTotal,
            'courses' => $coursesTotal,
            'categories' => Category::count(),
            'learning_paths' => LearningPath::count(),
            'assessments' => Assessment::count(),
            'enrollments' => Enrollment::tap($applyEnrollmentFilters)->count(),
            'certificates' => Certificate::tap($applyCertificateFilters)->count(),
        ];

        $enrollmentStatus = Enrollment::tap($applyEnrollmentFilters)
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->orderByDesc('total')
            ->get()
            ->map(fn ($row) => [
                'status' => $row->status ?? 'unknown',
                'total' => (int) $row->total,
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
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'total' => (int) $user->total,
                'active' => (int) $user->active,
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
                $total = (int) $course->enrollments_count;
                $completed = (int) $course->completed_enrollments_count;
                $rate = $total > 0 ? round(($completed / $total) * 100, 1) : 0;

                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'category' => $course->category?->name,
                    'status' => $course->status,
                    'total' => $total,
                    'completed' => $completed,
                    'completion_rate' => $rate,
                ];
            });

        $fromMonth = Carbon::now()->subMonths(5)->startOfMonth();
        $certificatesByMonth = Certificate::tap($applyCertificateFilters)
            ->selectRaw("DATE_FORMAT(issued_at, '%Y-%m') as month, count(*) as total")
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

        $users = User::select('id', 'name', 'email')
            ->orderBy('name')
            ->get()
            ->map(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]);

        $courses = Course::select('id', 'title', 'category_id')
            ->with('category:id,name')
            ->orderBy('title')
            ->get()
            ->map(fn ($course) => [
                'id' => $course->id,
                'title' => $course->title,
                'category' => $course->category?->name,
            ]);

        $categories = Category::select('id', 'name')
            ->orderBy('name')
            ->get()
            ->map(fn ($category) => [
                'id' => $category->id,
                'name' => $category->name,
            ]);

        return Inertia::render('Admin/Reports/Index', [
            'totals' => $totals,
            'enrollmentStatus' => $enrollmentStatus,
            'coursesByUser' => $coursesByUser,
            'mostEnrolledCourses' => $mostEnrolledCourses,
            'certificatesByMonth' => $certificatesByMonth,
            'activeUsersLast30' => $activeUsersLast30,
            'completionRate' => $completionRate,
            'filters' => $filters,
            'users' => $users,
            'courses' => $courses,
            'categories' => $categories,
        ]);
    }
}
