<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Audit\Application\AuditService;
use App\Modules\Learning\Domain\Course;
use App\Modules\Learning\Domain\LearningPath;
use App\Modules\Learning\Http\Requests\StoreLearningPathRequest;
use App\Modules\Learning\Http\Requests\UpdateLearningPathRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class LearningPathController extends Controller
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', LearningPath::class);

        $paths = LearningPath::withCount('courses')
            ->with('creator:id,name')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/LearningPaths/Index', [
            'paths' => $paths,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', LearningPath::class);

        $courses = Course::orderBy('title')->get(['id', 'title']);

        return Inertia::render('Admin/LearningPaths/Create', [
            'courses' => $courses,
        ]);
    }

    public function store(StoreLearningPathRequest $request): RedirectResponse
    {
        $this->authorize('create', LearningPath::class);

        $validated = $request->validated();

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('learning-paths/covers', 'public');
        }

        $validated['created_by'] = $request->user()->id;

        $path = DB::transaction(function () use ($validated) {
            $courses = $validated['courses'] ?? [];
            unset($validated['courses']);

            $path = LearningPath::create($validated);

            if (!empty($courses)) {
                $path->courses()->sync($this->buildCourseSyncData($courses));
            }

            return $path;
        });

        $this->auditService->log(
            action: 'learning_path.created',
            entityType: 'learning_path',
            entityId: (string) $path->id,
            payload: $path->toArray()
        );

        return redirect()
            ->route('admin.learning-paths.show', $path)
            ->with('success', 'Ruta de aprendizaje creada exitosamente.');
    }

    public function show(LearningPath $learningPath): Response
    {
        $this->authorize('view', $learningPath);

        $learningPath->load([
            'creator:id,name',
            'courses' => fn ($query) => $query->orderBy('learning_path_items.sort_order'),
        ]);

        return Inertia::render('Admin/LearningPaths/Show', [
            'path' => $learningPath,
        ]);
    }

    public function edit(LearningPath $learningPath): Response
    {
        $this->authorize('update', $learningPath);

        $learningPath->load([
            'courses' => fn ($query) => $query->orderBy('learning_path_items.sort_order'),
        ]);

        $courses = Course::orderBy('title')->get(['id', 'title']);

        return Inertia::render('Admin/LearningPaths/Edit', [
            'path' => $learningPath,
            'courses' => $courses,
        ]);
    }

    public function update(UpdateLearningPathRequest $request, LearningPath $learningPath): RedirectResponse
    {
        $this->authorize('update', $learningPath);

        $validated = $request->validated();

        if ($request->hasFile('cover_image')) {
            if ($learningPath->cover_image) {
                Storage::disk('public')->delete($learningPath->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('learning-paths/covers', 'public');
        }

        DB::transaction(function () use ($learningPath, $validated) {
            $courses = $validated['courses'] ?? [];
            unset($validated['courses']);

            $learningPath->update($validated);

            $learningPath->courses()->sync($this->buildCourseSyncData($courses));
        });

        $this->auditService->log(
            action: 'learning_path.updated',
            entityType: 'learning_path',
            entityId: (string) $learningPath->id,
            payload: $learningPath->fresh()->toArray()
        );

        return redirect()
            ->route('admin.learning-paths.show', $learningPath)
            ->with('success', 'Ruta de aprendizaje actualizada exitosamente.');
    }

    public function destroy(LearningPath $learningPath): RedirectResponse
    {
        $this->authorize('delete', $learningPath);

        if ($learningPath->enrollments()->exists()) {
            return back()->with('error', 'No se puede eliminar una ruta con inscripciones activas.');
        }

        $pathData = $learningPath->toArray();
        $learningPath->delete();

        $this->auditService->log(
            action: 'learning_path.deleted',
            entityType: 'learning_path',
            entityId: (string) $pathData['id'],
            payload: $pathData
        );

        return redirect()
            ->route('admin.learning-paths.index')
            ->with('success', 'Ruta de aprendizaje eliminada exitosamente.');
    }

    private function buildCourseSyncData(array $courses): array
    {
        $sync = [];

        foreach ($courses as $course) {
            if (!isset($course['id'])) {
                continue;
            }

            $sync[$course['id']] = [
                'sort_order' => $course['sort_order'] ?? 0,
                'is_required' => $course['is_required'] ?? true,
            ];
        }

        return $sync;
    }
}
