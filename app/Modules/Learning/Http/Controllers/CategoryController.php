<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Audit\Application\AuditService;
use App\Modules\Learning\Domain\Category;
use App\Modules\Learning\Http\Requests\StoreCategoryRequest;
use App\Modules\Learning\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', Category::class);

        $categories = Category::with(['parent:id,name', 'children'])
            ->withCount('courses')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        // Organizar en árbol
        $tree = $this->buildTree($categories);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'tree' => $tree,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Category::class);

        $parentCategories = Category::whereNull('parent_id')
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Admin/Categories/Create', [
            'parentCategories' => $parentCategories,
        ]);
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $this->authorize('create', Category::class);

        $data = $request->validated();
        $data['slug'] = Str::slug($data['name']);

        $category = Category::create($data);

        $this->auditService->log(
            action: 'category.created',
            entityType: 'category',
            entityId: $category->id,
            payload: $category->toArray()
        );

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Categoría creada exitosamente.');
    }

    public function show(Category $category): Response
    {
        $this->authorize('view', $category);

        $category->load([
            'parent',
            'children' => fn ($q) => $q->withCount('courses'),
            'courses' => fn ($q) => $q->select('id', 'category_id', 'title', 'status')->latest()->limit(10),
        ]);

        return Inertia::render('Admin/Categories/Show', [
            'category' => $category,
        ]);
    }

    public function edit(Category $category): Response
    {
        $this->authorize('update', $category);

        $category->load('parent:id,name');

        // Excluir la categoría actual y sus descendientes para evitar bucles
        $excludeIds = [$category->id];
        $this->getDescendantIds($category, $excludeIds);

        $parentCategories = Category::whereNull('parent_id')
            ->whereNotIn('id', $excludeIds)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'parentCategories' => $parentCategories,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $this->authorize('update', $category);

        $oldData = $category->toArray();

        $data = $request->validated();
        $data['slug'] = Str::slug($data['name']);

        $category->update($data);

        $this->auditService->log(
            action: 'category.updated',
            entityType: 'category',
            entityId: $category->id,
            payload: [
                'old' => $oldData,
                'new' => $category->fresh()->toArray(),
            ]
        );

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Categoría actualizada exitosamente.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $this->authorize('delete', $category);

        // Verificar que no tenga cursos asociados
        if ($category->courses()->exists()) {
            return redirect()
                ->route('admin.categories.index')
                ->with('error', 'No se puede eliminar una categoría que tiene cursos asociados.');
        }

        // Verificar que no tenga subcategorías
        if ($category->children()->exists()) {
            return redirect()
                ->route('admin.categories.index')
                ->with('error', 'No se puede eliminar una categoría que tiene subcategorías.');
        }

        $categoryData = $category->toArray();
        $category->delete();

        $this->auditService->log(
            action: 'category.deleted',
            entityType: 'category',
            entityId: $categoryData['id'],
            payload: $categoryData
        );

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Categoría eliminada exitosamente.');
    }

    public function reorder(\Illuminate\Http\Request $request): RedirectResponse
    {
        $this->authorize('update', Category::class);

        $order = $request->input('order', []);

        foreach ($order as $index => $id) {
            Category::where('id', $id)->update(['sort_order' => $index]);
        }

        $this->auditService->log(
            action: 'category.reordered',
            entityType: 'category',
            entityId: null,
            payload: ['order' => $order]
        );

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Orden actualizado exitosamente.');
    }

    private function buildTree($categories, $parentId = null): array
    {
        $tree = [];

        foreach ($categories as $category) {
            if ($category->parent_id == $parentId) {
                $children = $this->buildTree($categories, $category->id);

                if ($children) {
                    $category->tree_children = $children;
                }

                $tree[] = $category;
            }
        }

        return $tree;
    }

    private function getDescendantIds(Category $category, array &$ids): void
    {
        foreach ($category->children as $child) {
            $ids[] = $child->id;
            $this->getDescendantIds($child, $ids);
        }
    }
}
