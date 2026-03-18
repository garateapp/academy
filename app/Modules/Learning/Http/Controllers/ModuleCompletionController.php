<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Learning\Domain\CourseModule;
use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Learning\Domain\ModuleCompletion;
use App\Modules\Learning\Domain\UserActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ModuleCompletionController extends Controller
{
    public function store(Request $request, CourseModule $module): JsonResponse
    {
        $user = $request->user();

        if ($module->type === 'interactive_document') {
            return response()->json([
                'message' => 'Este módulo debe completarse enviando el documento interactivo.',
            ], 422);
        }

        $enrollment = Enrollment::where('user_id', $user->id)
            ->where('course_id', $module->course_id)
            ->first();

        if (!$enrollment) {
            abort(403);
        }

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

        $completion = ModuleCompletion::firstOrCreate(
            [
                'user_id' => $user->id,
                'enrollment_id' => $enrollment->id,
                'module_id' => $module->id,
            ],
            [
                'completed_at' => now(),
                'time_spent_seconds' => 0,
                'score' => null,
            ]
        );

        if ($completion->wasRecentlyCreated) {
            UserActivityLog::logAction(
                userId: $user->id,
                enrollmentId: $enrollment->id,
                moduleId: $module->id,
                action: 'module.completed',
                metadata: null
            );
        }

        return response()->json([
            'completed' => true,
        ]);
    }
}
