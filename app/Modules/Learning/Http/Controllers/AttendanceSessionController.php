<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Learning\Domain\AttendanceRecord;
use App\Modules\Learning\Domain\AttendanceSession;
use App\Modules\Learning\Domain\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AttendanceSessionController extends Controller
{
    public function store(Request $request, Course $course): RedirectResponse
    {
        $this->authorize('update', $course);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'session_date' => ['required', 'date'],
            'location' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        AttendanceSession::create([
            ...$data,
            'course_id' => $course->id,
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
            'updated_by' => $request->user()->id,
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
            'present_user_ids' => ['array'],
            'present_user_ids.*' => ['integer', 'exists:users,id'],
        ]);

        $presentIds = $data['present_user_ids'] ?? [];
        $enrolledUserIds = $course->enrollments()->pluck('user_id')->all();
        $recordedAt = now();

        foreach ($enrolledUserIds as $userId) {
            AttendanceRecord::updateOrCreate(
                [
                    'session_id' => $session->id,
                    'user_id' => $userId,
                ],
                [
                    'status' => in_array($userId, $presentIds, true) ? 'present' : 'absent',
                    'recorded_by' => $request->user()->id,
                    'recorded_at' => $recordedAt,
                ]
            );
        }

        return back()->with('success', 'Asistencia registrada.');
    }
}
