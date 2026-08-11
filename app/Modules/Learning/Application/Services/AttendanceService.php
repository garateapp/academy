<?php

namespace App\Modules\Learning\Application\Services;

use App\Modules\Learning\Domain\AttendanceRecord;
use App\Modules\Learning\Domain\AttendanceSession;
use App\Modules\Learning\Domain\Course;
use App\Modules\Learning\Domain\ModuleCompletion;
use App\Modules\Learning\Domain\UserActivityLog;
use Illuminate\Support\Facades\DB;

class AttendanceService
{
    /**
     * Register attendance and complete the course content for attendees.
     *
     * @param  array<int>  $presentUserIds
     */
    public function recordSessionAttendance(
        Course $course,
        AttendanceSession $session,
        array $presentUserIds,
        int $recordedBy
    ): void {
        DB::transaction(function () use ($course, $session, $presentUserIds, $recordedBy): void {
            $enrollments    = $course->enrollments()->get();
            $presentUserIds = array_values(array_unique(array_map('intval', $presentUserIds)));
            $recordedAt     = now();

            foreach ($enrollments as $enrollment) {
                AttendanceRecord::updateOrCreate(
                    [
                        'session_id' => $session->id,
                        'user_id'    => $enrollment->user_id,
                    ],
                    [
                        'status' => in_array($enrollment->user_id, $presentUserIds, true)
                            ? 'present'
                            : 'absent',
                        'recorded_by' => $recordedBy,
                        'recorded_at' => $recordedAt,
                    ]
                );
            }

            $modules = $course->modules()
                ->get(['id', 'course_id', 'type', 'duration_minutes', 'is_required']);

            foreach ($enrollments->whereIn('user_id', $presentUserIds) as $enrollment) {
                foreach ($modules as $module) {
                    $completion = ModuleCompletion::firstOrCreate(
                        [
                            'user_id'       => $enrollment->user_id,
                            'enrollment_id' => $enrollment->id,
                            'module_id'     => $module->id,
                        ],
                        [
                            'completed_at'       => $recordedAt,
                            'time_spent_seconds' => ($module->duration_minutes ?? 0) * 60,
                            'score'              => null,
                        ]
                    );

                    if ($completion->wasRecentlyCreated) {
                        UserActivityLog::logAction(
                            userId: $enrollment->user_id,
                            enrollmentId: $enrollment->id,
                            moduleId: $module->id,
                            action: 'module.completed',
                            metadata: [
                                'source'                => 'attendance_session',
                                'attendance_session_id' => $session->id,
                                'recorded_by'           => $recordedBy,
                            ]
                        );
                    }
                }

                $enrollment->autoCompleteIfReady();
            }
        });
    }
}
