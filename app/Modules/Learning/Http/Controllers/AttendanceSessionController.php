<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Identity\Domain\User;
use App\Modules\Learning\Application\Services\AttendanceService;
use App\Modules\Learning\Domain\AttendanceSession;
use App\Modules\Learning\Domain\Course;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceSessionController extends Controller
{
    public function __construct(
        private readonly AttendanceService $attendanceService
    ) {}

    public function index(Request $request): Response
    {
        $sessions = $this->visibleSessionsQuery($request->user());
        $today    = now()->toDateString();

        $upcomingSessions = (clone $sessions)
            ->whereDate('session_date', '>=', $today)
            ->orderBy('session_date')
            ->orderBy('title')
            ->get()
            ->map(fn (AttendanceSession $session): array => $this->sessionData($session));

        $pastSessions = (clone $sessions)
            ->whereDate('session_date', '<', $today)
            ->orderByDesc('session_date')
            ->orderBy('title')
            ->get()
            ->map(fn (AttendanceSession $session): array => $this->sessionData($session));

        return Inertia::render('Admin/AttendanceSessions/Index', [
            'upcomingSessions' => $upcomingSessions,
            'pastSessions'     => $pastSessions,
            'today'            => $today,
        ]);
    }

    public function store(Request $request, Course $course): RedirectResponse
    {
        $this->authorize('update', $course);

        $data = $request->validate([
            'title'        => ['required', 'string', 'max:255'],
            'session_date' => ['required', 'date'],
            'location'     => ['nullable', 'string', 'max:255'],
            'notes'        => ['nullable', 'string'],
        ]);

        AttendanceSession::create([
            ...$data,
            'course_id'  => $course->id,
            'created_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Sesion de asistencia creada.');
    }

    public function uploadRoster(Request $request, Course $course, AttendanceSession $session): RedirectResponse
    {
        $this->authorize('update', $course);

        if ($session->course_id !== $course->id) {
            abort(404);
        }

        $data = $request->validate([
            'roster' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:10240'],
        ]);

        $path = $data['roster']->store('courses/attendance', 'public');
        $hash = hash_file('sha256', $data['roster']->getRealPath());

        if ($session->roster_path) {
            Storage::disk('public')->delete($session->roster_path);
        }

        $session->update([
            'roster_path' => $path,
            'roster_hash' => $hash,
            'updated_by'  => $request->user()->id,
        ]);

        return back()->with('success', 'Planilla cargada correctamente.');
    }

    public function storeRecords(Request $request, Course $course, AttendanceSession $session): RedirectResponse
    {
        $this->authorize('update', $course);

        if ($session->course_id !== $course->id) {
            abort(404);
        }

        $data = $request->validate([
            'present_user_ids'   => ['array'],
            'present_user_ids.*' => ['integer', 'exists:users,id'],
        ]);

        $this->attendanceService->recordSessionAttendance(
            course: $course,
            session: $session,
            presentUserIds: $data['present_user_ids'] ?? [],
            recordedBy: $request->user()->id,
        );

        return back()->with('success', 'Asistencia registrada.');
    }

    private function visibleSessionsQuery(User $user): Builder
    {
        abort_unless(
            $user->can('edit-any-course') || $user->can('edit-own-courses'),
            403
        );

        return AttendanceSession::query()
            ->with([
                'course' => fn ($query) => $query
                    ->select(['id', 'title', 'created_by'])
                    ->withCount('enrollments'),
            ])
            ->withCount([
                'records',
                'records as present_count' => fn ($query) => $query->where('status', 'present'),
            ])
            ->when(
                ! $user->can('edit-any-course'),
                fn (Builder $query) => $query->whereHas(
                    'course',
                    fn (Builder $courseQuery) => $courseQuery->where('created_by', $user->id)
                )
            );
    }

    /**
     * @return array<string, mixed>
     */
    private function sessionData(AttendanceSession $session): array
    {
        return [
            'id'           => $session->id,
            'title'        => $session->title,
            'session_date' => $session->session_date->toDateString(),
            'location'     => $session->location,
            'notes'        => $session->notes,
            'course'       => [
                'id'    => $session->course->id,
                'title' => $session->course->title,
            ],
            'participants_count'  => (int) $session->course->enrollments_count,
            'present_count'       => (int) $session->present_count,
            'attendance_recorded' => (int) $session->records_count > 0,
        ];
    }
}
