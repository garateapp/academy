<?php

namespace App\Modules\Learning\Http\Policies;

use App\Modules\Identity\Domain\User;
use App\Modules\Learning\Domain\LearningPath;

class LearningPathPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('manage-learning-paths');
    }

    public function view(User $user, LearningPath $learningPath): bool
    {
        return $user->hasPermission('manage-learning-paths');
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('manage-learning-paths');
    }

    public function update(User $user, LearningPath $learningPath): bool
    {
        return $user->hasPermission('manage-learning-paths');
    }

    public function delete(User $user, LearningPath $learningPath): bool
    {
        return $user->hasPermission('manage-learning-paths');
    }
}
