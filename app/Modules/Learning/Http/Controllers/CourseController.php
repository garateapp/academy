<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Audit\Application\AuditService;
use App\Modules\Learning\Domain\Course;
use App\Modules\Learning\Domain\Category;
use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Learning\Domain\ModuleCompletion;
use App\Modules\Learning\Domain\AttendanceSession;
use App\Modules\Identity\Domain\User;
use App\Modules\Learning\Http\Requests\StoreCourseRequest;
use App\Modules\Learning\Http\Requests\UpdateCourseRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function index(): Response
    {
        $user = auth()->user();
        $roleName = strtolower($user->role?->name ?? '');
        $roleSlug = strtolower($user->role?->slug ?? '');
        $isAdmin = in_array($roleName, ['superadmin', 'admin'], true)
            || in_array($roleSlug, ['superadmin', 'super-admin', 'admin'], true);

        if ($isAdmin) {
            $courses = Course::with(['creator', 'category', 'updater'])
                ->withCount('enrollments')
                ->latest()
                ->paginate(15);

            return Inertia::render('Admin/Courses/Index', [
                'courses' => $courses,
            ]);
        }

        $courses = Course::with([
            'category',
            'enrollments' => fn ($query) => $query
                ->where('user_id', $user->id)
                ->select('id', 'course_id', 'user_id', 'assigned_via', 'due_at', 'status', 'created_at')
                ->orderByDesc('created_at'),
        ])
            ->withCount('enrollments')
            ->whereIn('status', ['active', 'published'])
            ->latest()
            ->paginate(12)
            ->through(function (Course $course) {
                $enrollment = $course->enrollments->first();
                $dueAt = $enrollment?->due_at;
                $daysRemaining = $dueAt ? now()->startOfDay()->diffInDays($dueAt->startOfDay(), false) : null;
                $isRequired = $enrollment
                    ? in_array($enrollment->assigned_via, ['manual', 'automatic'], true)
                    : false;

                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'description' => $course->description,
                    'cover_image' => $course->cover_image,
                    'duration_minutes' => $course->duration_minutes,
                    'status' => $course->status,
                    'allow_self_enrollment' => (bool) $course->allow_self_enrollment,
                    'enrollments_count' => $course->enrollments_count,
                    'category' => $course->category
                        ? [
                            'id' => $course->category->id,
                            'name' => $course->category->name,
                        ]
                        : null,
                    'enrollment' => $enrollment
                        ? [
                            'id' => $enrollment->id,
                            'status' => $enrollment->status,
                            'assigned_via' => $enrollment->assigned_via,
                            'due_at' => $dueAt?->toDateString(),
                            'days_remaining' => $daysRemaining,
                            'is_required' => $isRequired,
                        ]
                        : null,
                ];
            });

        return Inertia::render('learning/courses/index', [
            'courses' => $courses,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Course::class);

        $categories = Category::orderBy('name')->get();
        $availableCourses = Course::where('status', 'published')
            ->orderBy('title')
            ->get(['id', 'title']);

        return Inertia::render('Admin/Courses/Create', [
            'categories' => $categories,
            'availableCourses' => $availableCourses,
        ]);
    }

    public function store(StoreCourseRequest $request): RedirectResponse
    {
        $this->authorize('create', Course::class);

        $validated = $request->validated();

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('courses/covers', 'public');
        }

        $validated['slug'] = $this->generateUniqueSlug($validated['title']);

        $course = Course::create([
            ...$validated,
            'created_by' => $request->user()->id,
        ]);

        // Attach prerequisites if provided
        if (!empty($validated['prerequisites'])) {
            $course->prerequisites()->attach($validated['prerequisites']);
        }

        $this->auditService->log(
            action: 'course.created',
            entityType: 'course',
            entityId: $course->id,
            payload: $course->toArray()
        );

        return redirect()
            ->route('courses.show', $course)
            ->with('success', 'Curso creado exitosamente.');
    }

    public function show(Course $course): Response
    {
        $user = auth()->user();
        $roleName = strtolower($user->role?->name ?? '');
        $roleSlug = strtolower($user->role?->slug ?? '');
        $isAdmin = in_array($roleName, ['superadmin', 'admin'], true)
            || in_array($roleSlug, ['superadmin', 'super-admin', 'admin'], true);

        if (!$isAdmin) {
            $course->load('prerequisites');

            $enrollment = Enrollment::where('user_id', $user->id)
                ->where('course_id', $course->id)
                ->first();

            if (!$enrollment) {
                return redirect()
                    ->route('courses.index')
                    ->with('error', 'Debes estar asignado al curso para poder acceder.');
            }

            $prerequisiteIds = $course->prerequisites->pluck('id')->all();
            if (!empty($prerequisiteIds)) {
                $completedPrerequisiteIds = Enrollment::where('user_id', $user->id)
                    ->where('status', 'completed')
                    ->whereIn('course_id', $prerequisiteIds)
                    ->pluck('course_id')
                    ->all();

                $missing = array_diff($prerequisiteIds, $completedPrerequisiteIds);
                if (!empty($missing)) {
                    return redirect()
                        ->route('courses.index')
                        ->with('error', 'Debes completar los prerequisitos antes de ingresar a este curso.');
                }
            }

            $course->load(['modules' => fn ($query) => $query->orderBy('sort_order')->with('assessment')]);
            $assessmentAttempts = \App\Modules\Assessment\Domain\AssessmentAttempt::where('user_id', $user->id)
                ->whereIn('status', ['submitted', 'graded'])
                ->get()
                ->groupBy('assessment_id')
                ->map(fn ($attempts) => [
                    'used' => $attempts->count(),
                    'latest_id' => $attempts->sortByDesc('attempt_number')->first()?->id,
                    'latest_status' => $attempts->sortByDesc('attempt_number')->first()?->status,
                ]);
            $completedModuleIds = ModuleCompletion::where('user_id', $user->id)
                ->where('enrollment_id', $enrollment->id)
                ->pluck('module_id')
                ->all();

            $unlockedModuleIds = [];
            foreach ($course->modules as $module) {
                $unlockedModuleIds[] = $module->id;
                if (!in_array($module->id, $completedModuleIds, true)) {
                    break;
                }
            }

            return Inertia::render('learning/courses/show', [
                'course' => $course,
                'enrollment' => [
                    'id' => $enrollment->id,
                    'status' => $enrollment->status,
                    'due_at' => $enrollment->due_at?->toDateString(),
                ],
                'completedModuleIds' => $completedModuleIds,
                'unlockedModuleIds' => $unlockedModuleIds,
                'assessmentAttempts' => $assessmentAttempts,
            ]);
        }

        $course->load([
            'creator',
            'updater',
            'category',
            'modules',
            'prerequisites',
            'enrollments.user',
        ]);

        $attendanceSessions = AttendanceSession::with(['records.user'])
            ->where('course_id', $course->id)
            ->orderByDesc('session_date')
            ->get();

        $course->loadCount(['enrollments', 'modules']);
        $enrolledUserIds = $course->enrollments->pluck('user_id')->all();
        $availableUsers = User::query()
            ->where('status', 'active')
            ->whereNotIn('id', $enrolledUserIds)
            ->orderBy('name')
            ->get(['id', 'name', 'email']);

        return Inertia::render('Admin/Courses/Show', [
            'course' => $course,
            'availableUsers' => $availableUsers,
            'attendanceSessions' => $attendanceSessions,
        ]);
    }

    public function edit(Course $course): Response
    {
        $this->authorize('update', $course);

        $course->load([
            'prerequisites',
            'modules' => fn ($query) => $query->orderBy('sort_order'),
        ]);

        $categories = Category::orderBy('name')->get();
        $availableCourses = Course::where('status', 'published')
            ->where('id', '!=', $course->id)
            ->orderBy('title')
            ->get(['id', 'title']);

        return Inertia::render('Admin/Courses/Edit', [
            'course' => $course,
            'categories' => $categories,
            'availableCourses' => $availableCourses,
            'coursePrerequisites' => $course->prerequisites->pluck('id')->toArray(),
        ]);
    }

    public function update(UpdateCourseRequest $request, Course $course): RedirectResponse
    {
        $this->authorize('update', $course);

        $oldData = $course->toArray();
        $validated = $request->validated();

        if (!$request->hasFile('cover_image')) {
            unset($validated['cover_image']);
        }

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            // Delete old cover image if exists
            if ($course->cover_image) {
                Storage::disk('public')->delete($course->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('courses/covers', 'public');
        }

        $validated['slug'] = $this->generateUniqueSlug($validated['title'], $course->id);
        $validated['updated_by'] = $request->user()->id;

        $course->update($validated);

        // Sync prerequisites
        if (isset($validated['prerequisites'])) {
            $course->prerequisites()->sync($validated['prerequisites']);
        }

        $this->auditService->log(
            action: 'course.updated',
            entityType: 'course',
            entityId: $course->id,
            payload: [
                'old' => $oldData,
                'new' => $course->fresh()->toArray(),
            ]
        );

        return redirect()
            ->route('courses.show', $course)
            ->with('success', 'Curso actualizado exitosamente.');
    }

    public function destroy(Course $course): RedirectResponse
    {
        $this->authorize('delete', $course);

        $courseData = $course->toArray();
        $course->delete();

        $this->auditService->log(
            action: 'course.deleted',
            entityType: 'course',
            entityId: $courseData['id'],
            payload: $courseData
        );

        return redirect()
            ->route('courses.index')
            ->with('success', 'Curso eliminado exitosamente.');
    }

    public function publish(Course $course): RedirectResponse
    {
        $this->authorize('publish', $course);

        $course->update([
            'status' => 'published',
            'published_at' => now(),
        ]);

        $this->auditService->log(
            action: 'course.published',
            entityType: 'course',
            entityId: $course->id,
            payload: ['status' => 'published', 'published_at' => now()]
        );

        return redirect()
            ->route('courses.show', $course)
            ->with('success', 'Curso publicado exitosamente.');
    }

    public function unpublish(Course $course): RedirectResponse
    {
        $this->authorize('publish', $course);

        $course->update([
            'status' => 'draft',
            'published_at' => null,
        ]);

        $this->auditService->log(
            action: 'course.unpublished',
            entityType: 'course',
            entityId: $course->id,
            payload: ['status' => 'draft']
        );

        return redirect()
            ->route('courses.show', $course)
            ->with('success', 'Curso despublicado exitosamente.');
    }

    public function archive(Course $course): RedirectResponse
    {
        $this->authorize('update', $course);

        $course->update(['status' => 'archived']);

        $this->auditService->log(
            action: 'course.archived',
            entityType: 'course',
            entityId: $course->id,
            payload: ['status' => 'archived']
        );

        return redirect()
            ->route('courses.index')
            ->with('success', 'Curso archivado exitosamente.');
    }

    public function enrollUsers(Request $request, Course $course): RedirectResponse
    {
        $this->authorize('update', $course);

        if (!$request->user()->can('assign-courses')) {
            abort(403);
        }

        $validated = $request->validate([
            'user_ids' => ['required', 'array', 'min:1'],
            'user_ids.*' => ['integer', 'exists:users,id'],
            'due_at' => ['nullable', 'date'],
            'assigned_via' => ['nullable', 'in:manual,automatic,self_enrollment'],
        ]);

        $assignedVia = $validated['assigned_via'] ?? 'manual';
        $dueAt = $validated['due_at'] ?? null;

        $alreadyEnrolled = Enrollment::where('course_id', $course->id)
            ->whereIn('user_id', $validated['user_ids'])
            ->pluck('user_id')
            ->all();

        $createdCount = 0;

        foreach ($validated['user_ids'] as $userId) {
            if (in_array($userId, $alreadyEnrolled, true)) {
                continue;
            }

            $enrollment = Enrollment::create([
                'user_id' => $userId,
                'course_id' => $course->id,
                'assigned_by' => $request->user()->id,
                'assigned_via' => $assignedVia,
                'due_at' => $dueAt,
                'status' => 'active',
            ]);

            $this->auditService->log(
                action: 'enrollment.created',
                entityType: 'enrollment',
                entityId: (string) $enrollment->id,
                payload: [
                    'user_id' => $userId,
                    'course_id' => $course->id,
                    'assigned_by' => $request->user()->id,
                    'assigned_via' => $assignedVia,
                    'due_at' => $dueAt,
                ]
            );

            $createdCount++;
        }

        if ($createdCount === 0) {
            return back()->with('error', 'Todos los usuarios seleccionados ya estaban matriculados.');
        }

        return back()->with('success', "Se asignaron {$createdCount} usuarios al curso.");
    }

    public function selfEnroll(Request $request, Course $course): RedirectResponse
    {
        $user = $request->user();

        if (!$course->allow_self_enrollment) {
            return back()->with('error', 'Este curso no permite autoinscripcion.');
        }

        if (!in_array($course->status, ['active', 'published'], true)) {
            return back()->with('error', 'Este curso no esta disponible para autoinscripcion.');
        }

        $existing = Enrollment::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if ($existing) {
            return back()->with('info', 'Ya estas inscrito en este curso.');
        }

        $course->load('prerequisites');
        $prerequisiteIds = $course->prerequisites->pluck('id')->all();
        if (!empty($prerequisiteIds)) {
            $completedPrerequisiteIds = Enrollment::where('user_id', $user->id)
                ->where('status', 'completed')
                ->whereIn('course_id', $prerequisiteIds)
                ->pluck('course_id')
                ->all();

            $missing = array_diff($prerequisiteIds, $completedPrerequisiteIds);
            if (!empty($missing)) {
                return back()->with('error', 'Debes completar los prerequisitos antes de autoinscribirte.');
            }
        }

        $enrollment = Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'assigned_by' => $user->id,
            'assigned_via' => 'self_enrollment',
            'status' => 'active',
        ]);

        $this->auditService->log(
            action: 'enrollment.self_enrolled',
            entityType: 'enrollment',
            entityId: (string) $enrollment->id,
            payload: [
                'user_id' => $user->id,
                'course_id' => $course->id,
                'assigned_via' => 'self_enrollment',
            ]
        );

        return redirect()->route('courses.show', $course)
            ->with('success', 'Te inscribiste correctamente en el curso.');
    }

    private function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        while (
            Course::where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}
