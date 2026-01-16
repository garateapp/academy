<?php

namespace App\Modules\Assessment\Application\Policies;

use App\Modules\Assessment\Domain\AssessmentAttempt;
use App\Modules\Identity\Domain\User;

class AssessmentAttemptPolicy
{
    public function view(User $user, AssessmentAttempt $attempt): bool
    {
        // User can view their own attempts
        if ($attempt->user_id === $user->id) {
            return true;
        }

        // Instructors can view all attempts
        return $user->hasPermission('assessments.view');
    }

    public function update(User $user, AssessmentAttempt $attempt): bool
    {
        // Only the user who owns the attempt can update it
        return $attempt->user_id === $user->id && $attempt->isInProgress();
    }

    public function grade(User $user, AssessmentAttempt $attempt): bool
    {
        // Only instructors can grade attempts
        return $user->hasPermission('assessments.grade');
    }
}
