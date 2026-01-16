<?php

namespace App\Modules\Certificate\Application\Policies;

use App\Modules\Certificate\Domain\Certificate;
use App\Modules\Identity\Domain\User;

class CertificatePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('issue-certificates');
    }

    public function view(User $user, Certificate $certificate): bool
    {
        // User can view their own certificates
        if ($certificate->user_id === $user->id) {
            return true;
        }

        // Admins can view all certificates
        return $user->hasPermission('issue-certificates');
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('issue-certificates');
    }

    public function update(User $user, Certificate $certificate): bool
    {
        return $user->hasPermission('issue-certificates');
    }

    public function delete(User $user, Certificate $certificate): bool
    {
        return $user->hasPermission('issue-certificates');
    }

    public function revoke(User $user, Certificate $certificate): bool
    {
        return $user->hasPermission('issue-certificates') && !$certificate->isRevoked();
    }
}
