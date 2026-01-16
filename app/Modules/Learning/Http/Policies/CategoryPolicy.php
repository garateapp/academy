<?php

namespace App\Modules\Learning\Http\Policies;

use App\Modules\Identity\Domain\User;
use App\Modules\Learning\Domain\Category;

class CategoryPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('manage-categories');
    }

    public function view(User $user, Category $category): bool
    {
        return $user->hasPermission('manage-categories');
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('manage-categories');
    }

    public function update(User $user, Category $category): bool
    {
        return $user->hasPermission('manage-categories');
    }

    public function delete(User $user, Category $category): bool
    {
        return $user->hasPermission('manage-categories');
    }
}
