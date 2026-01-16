<?php

namespace App\Modules\Survey\Application\Policies;

use App\Modules\Identity\Domain\User;
use App\Modules\Survey\Domain\Survey;

class SurveyPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('surveys.view');
    }

    public function view(User $user, Survey $survey): bool
    {
        return $user->hasPermission('surveys.view');
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('surveys.create');
    }

    public function update(User $user, Survey $survey): bool
    {
        return $user->hasPermission('surveys.edit');
    }

    public function delete(User $user, Survey $survey): bool
    {
        return $user->hasPermission('surveys.delete');
    }
}
