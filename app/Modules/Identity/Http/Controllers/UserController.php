<?php

namespace App\Modules\Identity\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Identity\Domain\User;
use App\Modules\Identity\Domain\Role;
use App\Modules\Learning\Domain\Course;
use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Identity\Http\Requests\StoreUserRequest;
use App\Modules\Identity\Http\Requests\UpdateUserRequest;
use App\Modules\Audit\Application\AuditService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(
        private readonly AuditService $auditService
    ) {
        $this->authorizeResource(User::class, 'user');
    }

    public function index(): Response
    {
        $users = User::with('role')
            ->withCount(['enrollments' => function ($query) {
                $query->where('status', 'active');
            }])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', User::class);

        $roles = Role::orderBy('name')->get();

        return Inertia::render('Admin/Users/Create', [
            'roles' => $roles,
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $this->authorize('create', User::class);

        $validated = $request->validated();

        // Hash password if provided
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user = User::create($validated);

        $this->auditService->log(
            action: 'user.created',
            entityType: 'user',
            entityId: (string) $user->id,
            payload: [
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_id' => $user->role_id,
            ]
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario creado exitosamente.');
    }

    public function show(User $user): Response
    {
        $user->load([
            'role.permissions',
            'enrollments.course',
            'moduleCompletions.module',
        ]);

        $user->loadCount([
            'enrollments',
            'moduleCompletions',
        ]);

        $enrolledCourseIds = $user->enrollments->pluck('course_id')->all();
        $availableCourses = Course::whereIn('status', ['active', 'published'])
            ->whereNotIn('id', $enrolledCourseIds)
            ->orderBy('title')
            ->get(['id', 'title']);

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'availableCourses' => $availableCourses,
        ]);
    }

    public function edit(User $user): Response
    {
        $roles = Role::orderBy('name')->get();

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $validated = $request->validated();

        $oldValues = $user->only(['name', 'email', 'area', 'position', 'role_id', 'status']);

        // Only hash password if a new one is provided
        if (isset($validated['password']) && !empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        $this->auditService->log(
            action: 'user.updated',
            entityType: 'user',
            entityId: (string) $user->id,
            payload: [
                'user_id' => $user->id,
                'old_values' => $oldValues,
                'new_values' => $user->only(['name', 'email', 'area', 'position', 'role_id', 'status']),
            ]
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario actualizado exitosamente.');
    }

    public function destroy(User $user): RedirectResponse
    {
        // Prevent deleting users with active enrollments
        $activeEnrollments = $user->enrollments()->where('status', 'active')->count();

        if ($activeEnrollments > 0) {
            return back()->with('error', 'No se puede eliminar un usuario con matrículas activas.');
        }

        $this->auditService->log(
            action: 'user.deleted',
            entityType: 'user',
            entityId: (string) $user->id,
            payload: [
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]
        );

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario eliminado exitosamente.');
    }

    public function toggleStatus(User $user): RedirectResponse
    {
        $this->authorize('update', $user);

        $oldStatus = $user->status;
        $newStatus = $oldStatus === 'active' ? 'inactive' : 'active';

        $user->update(['status' => $newStatus]);

        $this->auditService->log(
            action: 'user.status_changed',
            entityType: 'user',
            entityId: (string) $user->id,
            payload: [
                'user_id' => $user->id,
                'old_status' => $oldStatus,
                'new_status' => $newStatus,
            ]
        );

        return back()->with('success', 'Estado del usuario actualizado.');
    }

    public function enroll(Request $request, User $user): RedirectResponse
    {
        $this->authorize('update', $user);

        $validated = $request->validate([
            'course_id' => ['required', 'integer', 'exists:courses,id'],
            'due_at' => ['nullable', 'date'],
            'assigned_via' => ['nullable', 'in:manual,automatic,self_enrollment'],
        ]);

        $alreadyEnrolled = Enrollment::where('user_id', $user->id)
            ->where('course_id', $validated['course_id'])
            ->exists();

        if ($alreadyEnrolled) {
            return back()->with('error', 'El usuario ya esta matriculado en este curso.');
        }

        $enrollment = Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $validated['course_id'],
            'assigned_by' => $request->user()->id,
            'assigned_via' => $validated['assigned_via'] ?? 'manual',
            'due_at' => $validated['due_at'] ?? null,
            'status' => 'active',
        ]);

        $this->auditService->log(
            action: 'enrollment.created',
            entityType: 'enrollment',
            entityId: (string) $enrollment->id,
            payload: [
                'user_id' => $user->id,
                'course_id' => $validated['course_id'],
                'assigned_by' => $request->user()->id,
                'assigned_via' => $validated['assigned_via'] ?? 'manual',
                'due_at' => $validated['due_at'] ?? null,
            ]
        );

        return back()->with('success', 'Curso asignado correctamente.');
    }
}
