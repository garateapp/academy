<?php

namespace App\Providers;

use App\Modules\Identity\Domain\Role;
use App\Modules\Identity\Domain\User;
use App\Modules\Identity\Application\Policies\UserPolicy;
use App\Modules\Identity\Http\Policies\RolePolicy;
use App\Modules\Learning\Domain\Category;
use App\Modules\Learning\Domain\Course;
use App\Modules\Learning\Domain\LearningPath;
use App\Modules\Learning\Http\Policies\CategoryPolicy;
use App\Modules\Learning\Http\Policies\CoursePolicy;
use App\Modules\Learning\Http\Policies\LearningPathPolicy;
use App\Modules\Assessment\Domain\Assessment;
use App\Modules\Assessment\Domain\AssessmentAttempt;
use App\Modules\Assessment\Application\Policies\AssessmentPolicy;
use App\Modules\Assessment\Application\Policies\AssessmentAttemptPolicy;
use App\Modules\Certificate\Domain\Certificate;
use App\Modules\Certificate\Domain\CertificateTemplate;
use App\Modules\Certificate\Application\Policies\CertificatePolicy;
use App\Modules\Certificate\Application\Policies\CertificateTemplatePolicy;
use App\Modules\Survey\Domain\Survey;
use App\Modules\Survey\Application\Policies\SurveyPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::before(function ($user) {
            $roleSlug = $user->role?->slug;
            if (in_array($roleSlug, ['super-admin', 'superadmin'], true)) {
                return true;
            }

            $roleName = $user->role?->name;
            if (in_array($roleName, ['SuperAdmin', 'superadmin'], true)) {
                return true;
            }

            return null;
        });

        // Register Policies
        Gate::policy(User::class, UserPolicy::class);
        Gate::policy(Course::class, CoursePolicy::class);
        Gate::policy(Category::class, CategoryPolicy::class);
        Gate::policy(LearningPath::class, LearningPathPolicy::class);
        Gate::policy(Role::class, RolePolicy::class);
        Gate::policy(Assessment::class, AssessmentPolicy::class);
        Gate::policy(AssessmentAttempt::class, AssessmentAttemptPolicy::class);
        Gate::policy(Certificate::class, CertificatePolicy::class);
        Gate::policy(CertificateTemplate::class, CertificateTemplatePolicy::class);
        Gate::policy(Survey::class, SurveyPolicy::class);

        // Dynamically register permissions as Gates
        try {
            foreach (\App\Modules\Identity\Domain\Permission::pluck('key') as $permission) {
                Gate::define($permission, function ($user) use ($permission) {
                    return $user->role && $user->role->permissions->contains('key', $permission);
                });
            }
        } catch (\Exception $e) {
            // Permissions table might not exist yet (e.g. during migration)
        }
    }
}
