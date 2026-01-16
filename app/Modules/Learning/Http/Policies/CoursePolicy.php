<?php

namespace App\Modules\Learning\Http\Policies;

use App\Modules\Identity\Domain\User;
use App\Modules\Learning\Domain\Course;
use Illuminate\Auth\Access\HandlesAuthorization;

class CoursePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Course $course): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->can('create-courses');
    }

    public function update(User $user, Course $course): bool
    {
        if ($user->can('edit-any-course')) {
            return true;
        }

        return $user->can('edit-own-courses') && $course->created_by === $user->id;
    }

    public function delete(User $user, Course $course): bool
    {
        if ($user->can('delete-any-course')) {
            return true;
        }

        return $user->can('delete-own-courses') && $course->created_by === $user->id;
    }

    public function publish(User $user, Course $course): bool
    {
        return $user->can('publish-courses');
    }
}
