<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Learning\Domain\CourseModule;
use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Learning\Domain\ModuleCompletion;
use App\Modules\Learning\Domain\ModuleProgress;
use App\Modules\Learning\Domain\UserActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ModuleProgressController extends Controller
{
    public function store(Request $request, CourseModule $module): JsonResponse
    {
        $user = $request->user();

        $enrollment = Enrollment::where('user_id', $user->id)
            ->where('course_id', $module->course_id)
            ->first();

        if (!$enrollment) {
            abort(403);
        }

        $data = $request->validate([
            'event' => ['required', 'in:play,pause,seek,ended,heartbeat'],
            'current_time' => ['required', 'numeric', 'min:0'],
            'duration' => ['required', 'numeric', 'min:1'],
            'watched_seconds' => ['nullable', 'numeric', 'min:0'],
        ]);

        $duration = (int) floor($data['duration']);
        $currentTime = (int) floor($data['current_time']);
        $watchedSeconds = isset($data['watched_seconds']) ? (int) floor($data['watched_seconds']) : 0;

        $progress = ModuleProgress::firstOrNew([
            'user_id' => $user->id,
            'enrollment_id' => $enrollment->id,
            'module_id' => $module->id,
        ]);

        if (!$progress->exists) {
            $progress->duration_seconds = $duration;
            $progress->last_position_seconds = 0;
            $progress->total_watched_seconds = 0;
            $progress->percent_complete = 0;
        }

        if ($duration > 0) {
            $progress->duration_seconds = $duration;
        }

        $increment = 0;
        if (in_array($data['event'], ['play', 'heartbeat', 'ended'], true)) {
            $increment = min(max($watchedSeconds, 0), 60);

            if ($increment === 0 && $progress->last_position_seconds > 0) {
                $delta = $currentTime - $progress->last_position_seconds;
                if ($delta > 0 && $delta <= 60) {
                    $increment = $delta;
                }
            }
        }

        if ($increment > 0) {
            $nextTotal = $progress->total_watched_seconds + $increment;
            $progress->total_watched_seconds = min($nextTotal, $duration);
        }

        $progress->last_position_seconds = min($currentTime, $duration);
        $progress->last_heartbeat_at = now();

        $percent = $duration > 0
            ? round(($progress->total_watched_seconds / $duration) * 100, 2)
            : 0;
        $progress->percent_complete = min($percent, 100);

        $progress->save();

        UserActivityLog::logAction(
            userId: $user->id,
            enrollmentId: $enrollment->id,
            moduleId: $module->id,
            action: "video.{$data['event']}",
            metadata: [
                'current_time' => $currentTime,
                'duration' => $duration,
                'watched_seconds' => $watchedSeconds,
                'percent' => $progress->percent_complete,
            ]
        );

        $completed = false;
        if ($progress->percent_complete >= 90) {
            $completion = ModuleCompletion::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'enrollment_id' => $enrollment->id,
                    'module_id' => $module->id,
                ],
                [
                    'completed_at' => now(),
                    'time_spent_seconds' => $progress->total_watched_seconds,
                    'score' => null,
                ]
            );

            if ($completion->wasRecentlyCreated) {
                $completed = true;
            } else {
                $completion->update([
                    'time_spent_seconds' => $progress->total_watched_seconds,
                ]);
            }
        }

        return response()->json([
            'progress' => $progress,
            'completed' => $completed,
        ]);
    }
}
