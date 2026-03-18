<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Audit\Application\AuditService;
use App\Modules\Learning\Domain\Course;
use App\Modules\Learning\Domain\CourseModule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class CourseModuleController extends Controller
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function store(Request $request, Course $course): JsonResponse
    {
        $this->authorize('update', $course);

        $data = $this->validateModule($request, false);
        $data['sort_order'] = $data['sort_order'] ?? (($course->modules()->max('sort_order') ?? 0) + 1);
        $data = $this->handleAssetUpload($request, $data);

        $module = $course->modules()->create($data);

        $this->auditService->log(
            action: 'course_module.created',
            entityType: 'course_module',
            entityId: $module->id,
            payload: $module->toArray()
        );

        return response()->json(['module' => $module]);
    }

    public function update(Request $request, Course $course, CourseModule $module): JsonResponse
    {
        $this->authorize('update', $course);

        if ($module->course_id !== $course->id) {
            abort(404);
        }

        $data = $this->validateModule($request, true);
        $data = $this->handleAssetUpload($request, $data, $module);
        $module->update($data);

        $this->auditService->log(
            action: 'course_module.updated',
            entityType: 'course_module',
            entityId: $module->id,
            payload: $module->toArray()
        );

        return response()->json(['module' => $module->fresh()]);
    }

    public function destroy(Course $course, CourseModule $module): JsonResponse
    {
        $this->authorize('update', $course);

        if ($module->course_id !== $course->id) {
            abort(404);
        }

        $moduleData = $module->toArray();
        $module->delete();

        $this->auditService->log(
            action: 'course_module.deleted',
            entityType: 'course_module',
            entityId: $moduleData['id'],
            payload: $moduleData
        );

        return response()->json(['deleted' => true]);
    }

    public function reorder(Request $request, Course $course): JsonResponse
    {
        $this->authorize('update', $course);

        $data = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer'],
        ]);

        $order = $data['order'];
        $courseModuleIds = $course->modules()->pluck('id')->toArray();

        foreach ($order as $index => $id) {
            if (in_array($id, $courseModuleIds, true)) {
                CourseModule::where('id', $id)->update(['sort_order' => $index + 1]);
            }
        }

        $this->auditService->log(
            action: 'course_module.reordered',
            entityType: 'course',
            entityId: $course->id,
            payload: ['order' => $order]
        );

        return response()->json(['reordered' => true]);
    }

    private function validateModule(Request $request, bool $isUpdate): array
    {
        $required = $isUpdate ? 'sometimes' : 'required';
        $configJson = $request->input('config_json');

        if (is_string($configJson)) {
            $decoded = json_decode($configJson, true);
            $request->merge([
                'config_json' => is_array($decoded) ? $decoded : null,
            ]);
        }

        $rules = [
            'type' => [$required, 'string', 'in:text,video,file,scorm,link,assessment,interactive_document'],
            'title' => [$required, 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'content' => ['nullable', 'string'],
            'asset_path' => ['nullable', 'string', 'max:2048'],
            'asset_type' => ['nullable', 'string', 'max:100'],
            'asset_file' => ['nullable', 'file', 'max:51200'],
            'duration_minutes' => ['nullable', 'integer', 'min:1'],
            'is_required' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'config_json' => ['nullable', 'array'],
        ];

        if ($request->input('type') === 'video') {
            $rules['asset_file'][] = 'mimetypes:video/mp4,video/webm,video/quicktime';
        }

        return $request->validate($rules);
    }

    private function handleAssetUpload(
        Request $request,
        array $data,
        ?CourseModule $module = null
    ): array {
        if (!$request->hasFile('asset_file')) {
            return $data;
        }

        $file = $request->file('asset_file');

        if ($module && $module->asset_path) {
            Storage::disk('public')->delete($module->asset_path);
        }

        $data['asset_path'] = $file->store('courses/modules', 'public');
        $data['asset_type'] = $data['type'] === 'video' ? 'video' : 'file';

        return $data;
    }
}
