<?php

namespace App\Modules\Learning\Http\Policies;

use App\Modules\Identity\Domain\User;
use App\Modules\Learning\Domain\InteractiveDocumentSubmission;

class InteractiveDocumentSubmissionPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('users.view');
    }

    public function view(User $user, InteractiveDocumentSubmission $submission): bool
    {
        return $user->hasPermission('users.view');
    }
}
