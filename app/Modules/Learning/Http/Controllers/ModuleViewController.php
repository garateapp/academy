<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Learning\Domain\CourseModule;
use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Learning\Domain\ModuleCompletion;
use App\Modules\Learning\Domain\ModuleProgress;
use Inertia\Inertia;
use Inertia\Response;

class ModuleViewController extends Controller
{
    public function show(CourseModule $module): Response
    {
        $user = auth()->user();

        $enrollment = Enrollment::where('user_id', $user->id)
            ->where('course_id', $module->course_id)
            ->first();

        if (!$enrollment) {
            abort(403);
        }

        $module->load(['course', 'assessment']);

        $moduleOrder = $module->course->modules()->orderBy('sort_order')->get(['id']);
        $completedModuleIds = ModuleCompletion::where('user_id', $user->id)
            ->where('enrollment_id', $enrollment->id)
            ->pluck('module_id')
            ->all();

        $unlockedModuleIds = [];
        foreach ($moduleOrder as $orderedModule) {
            $unlockedModuleIds[] = $orderedModule->id;
            if (!in_array($orderedModule->id, $completedModuleIds, true)) {
                break;
            }
        }

        if (!in_array($module->id, $unlockedModuleIds, true)) {
            abort(403);
        }

        $isCompleted = ModuleCompletion::where('user_id', $user->id)
            ->where('enrollment_id', $enrollment->id)
            ->where('module_id', $module->id)
            ->exists();

        $progress = ModuleProgress::where('user_id', $user->id)
            ->where('enrollment_id', $enrollment->id)
            ->where('module_id', $module->id)
            ->first();

        $attemptsUsed = 0;
        $latestAttempt = null;
        if ($module->assessment) {
            $attemptsUsed = \App\Modules\Assessment\Domain\AssessmentAttempt::where('user_id', $user->id)
                ->where('assessment_id', $module->assessment->id)
                ->whereIn('status', ['submitted', 'graded'])
                ->orderByDesc('attempt_number')
                ->get();
            $latestAttempt = $attemptsUsed > 0 ? $attemptsUsed->first() : null;
            $attemptsUsed = $attemptsUsed->count();
        }

        return Inertia::render('learning/modules/show', [
            'course' => $module->course,
            'module' => $module,
            'enrollment' => [
                'id' => $enrollment->id,
                'status' => $enrollment->status,
                'due_at' => $enrollment->due_at?->toDateString(),
            ],
            'progress' => $progress,
            'isCompleted' => $isCompleted,
            'attemptsUsed' => $attemptsUsed,
            'maxAttempts' => $module->assessment?->max_attempts,
            'latestAttempt' => $latestAttempt
                ? [
                    'id' => $latestAttempt->id,
                    'status' => $latestAttempt->status,
                    'assessment_id' => $latestAttempt->assessment_id,
                ]
                : null,
        ]);
    }
}
