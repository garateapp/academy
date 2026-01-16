<?php

namespace App\Modules\Identity\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Audit\Application\AuditService;
use App\Modules\Identity\Domain\Permission;
use App\Modules\Identity\Domain\Role;
use App\Modules\Identity\Http\Requests\StoreRoleRequest;
use App\Modules\Identity\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', Role::class);

        $roles = Role::withCount(['users', 'permissions'])
            ->with('permissions:id,key,name,module')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Role::class);

        $permissions = Permission::select('id', 'key', 'name', 'description', 'module')
            ->orderBy('module')
            ->orderBy('name')
            ->get()
            ->groupBy('module');

        return Inertia::render('Admin/Roles/Create', [
            'permissions' => $permissions,
        ]);
    }

    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $this->authorize('create', Role::class);

        $data = $request->validated();
        $data['slug'] = Str::slug($data['name']);

        $role = Role::create($data);

        // Asignar permisos si se proporcionaron
        if ($request->has('permissions')) {
            $role->permissions()->sync($request->input('permissions', []));
        }

        $this->auditService->log(
            action: 'role.created',
            entityType: 'role',
            entityId: $role->id,
            payload: [
                'role' => $role->toArray(),
                'permissions' => $role->permissions->pluck('key')->toArray(),
            ]
        );

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'Rol creado exitosamente.');
    }

    public function show(Role $role): Response
    {
        $this->authorize('view', $role);

        $role->load([
            'permissions:id,key,name,description,module',
            'users:id,name,email,area,status',
        ]);

        return Inertia::render('Admin/Roles/Show', [
            'role' => $role,
        ]);
    }

    public function edit(Role $role): Response
    {
        $this->authorize('update', $role);

        $role->load('permissions:id');

        $permissions = Permission::select('id', 'key', 'name', 'description', 'module')
            ->orderBy('module')
            ->orderBy('name')
            ->get()
            ->groupBy('module');

        return Inertia::render('Admin/Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $role->permissions->pluck('id')->toArray(),
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        $this->authorize('update', $role);

        $oldData = $role->toArray();
        $oldPermissions = $role->permissions->pluck('key')->toArray();

        $data = $request->validated();
        $data['slug'] = Str::slug($data['name']);

        $role->update($data);

        // Actualizar permisos si se proporcionaron
        if ($request->has('permissions')) {
            $role->permissions()->sync($request->input('permissions', []));
        }

        $this->auditService->log(
            action: 'role.updated',
            entityType: 'role',
            entityId: $role->id,
            payload: [
                'old' => [
                    'role' => $oldData,
                    'permissions' => $oldPermissions,
                ],
                'new' => [
                    'role' => $role->fresh()->toArray(),
                    'permissions' => $role->fresh()->permissions->pluck('key')->toArray(),
                ],
            ]
        );

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'Rol actualizado exitosamente.');
    }

    public function destroy(Role $role): RedirectResponse
    {
        $this->authorize('delete', $role);

        // No permitir eliminar roles del sistema
        if ($role->is_system) {
            return redirect()
                ->route('admin.roles.index')
                ->with('error', 'No se pueden eliminar roles del sistema.');
        }

        // Verificar que no tenga usuarios asignados
        if ($role->users()->exists()) {
            return redirect()
                ->route('admin.roles.index')
                ->with('error', 'No se puede eliminar un rol que tiene usuarios asignados.');
        }

        $roleData = [
            'role' => $role->toArray(),
            'permissions' => $role->permissions->pluck('key')->toArray(),
        ];

        $role->delete();

        $this->auditService->log(
            action: 'role.deleted',
            entityType: 'role',
            entityId: $roleData['role']['id'],
            payload: $roleData
        );

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'Rol eliminado exitosamente.');
    }

    public function duplicate(Role $role): RedirectResponse
    {
        $this->authorize('create', Role::class);

        $newRole = $role->replicate();
        $newRole->name = $role->name . ' (Copia)';
        $newRole->slug = Str::slug($newRole->name);
        $newRole->is_system = false;
        $newRole->save();

        // Copiar permisos
        $newRole->permissions()->sync($role->permissions->pluck('id')->toArray());

        $this->auditService->log(
            action: 'role.duplicated',
            entityType: 'role',
            entityId: $newRole->id,
            payload: [
                'original_role_id' => $role->id,
                'new_role' => $newRole->toArray(),
            ]
        );

        return redirect()
            ->route('admin.roles.edit', $newRole)
            ->with('success', 'Rol duplicado exitosamente.');
    }
}
