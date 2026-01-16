<?php

namespace App\Modules\Identity\Http\Policies;

use App\Modules\Identity\Domain\Role;
use App\Modules\Identity\Domain\User;

class RolePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('manage-roles');
    }

    public function view(User $user, Role $role): bool
    {
        return $user->hasPermission('manage-roles');
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('manage-roles');
    }

    public function update(User $user, Role $role): bool
    {
        return $user->hasPermission('manage-roles');
    }

    public function delete(User $user, Role $role): bool
    {
        // No permitir eliminar roles del sistema
        if ($role->is_system) {
            return false;
        }

        return $user->hasPermission('manage-roles');
    }
}
