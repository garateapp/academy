<?php

namespace App\Modules\Assessment\Application\Policies;

use App\Modules\Assessment\Domain\Assessment;
use App\Modules\Identity\Domain\User;

class AssessmentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('assessments.view');
    }

    public function view(User $user, Assessment $assessment): bool
    {
        return $user->hasPermission('assessments.view');
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('assessments.create');
    }

    public function update(User $user, Assessment $assessment): bool
    {
        return $user->hasPermission('assessments.edit');
    }

    public function delete(User $user, Assessment $assessment): bool
    {
        return $user->hasPermission('assessments.delete');
    }
}
