<?php

namespace App\Modules\Identity\Domain;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'avatar',
        'area',
        'position',
        'role_id',
        'status',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'last_login_at' => 'datetime',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function enrollments()
    {
        return $this->hasMany(\App\Modules\Learning\Domain\Enrollment::class);
    }

    public function certificates()
    {
        return $this->hasMany(\App\Modules\Certificate\Domain\Certificate::class);
    }

    public function assessmentAttempts()
    {
        return $this->hasMany(\App\Modules\Assessment\Domain\AssessmentAttempt::class);
    }

    public function moduleCompletions()
    {
        return $this->hasMany(\App\Modules\Learning\Domain\ModuleCompletion::class);
    }

    public function interactiveDocumentSubmissions()
    {
        return $this->hasMany(\App\Modules\Learning\Domain\InteractiveDocumentSubmission::class);
    }

    public function hasPermission(string $permissionKey): bool
    {
        return $this->role?->permissions()->where('key', $permissionKey)->exists() ?? false;
    }

    public function hasAnyPermission(array $permissionKeys): bool
    {
        return $this->role?->permissions()->whereIn('key', $permissionKeys)->exists() ?? false;
    }

    public function hasAllPermissions(array $permissionKeys): bool
    {
        $userPermissions = $this->role?->permissions()->pluck('key')->toArray() ?? [];

        return count(array_intersect($permissionKeys, $userPermissions)) === count($permissionKeys);
    }
}
