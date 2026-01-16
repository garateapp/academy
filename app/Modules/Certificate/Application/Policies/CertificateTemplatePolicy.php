<?php

namespace App\Modules\Certificate\Application\Policies;

use App\Modules\Certificate\Domain\CertificateTemplate;
use App\Modules\Identity\Domain\User;

class CertificateTemplatePolicy
{
    public function viewAny(User $user): bool
    {
        if ($this->isSuperAdmin($user)) {
            return true;
        }

        return $this->hasAnyPermission($user, [
            'manage-certificate-templates',
            'certificate-templates.view',
            'certificate-templates.show',
        ]);
    }

    public function view(User $user, CertificateTemplate $template): bool
    {
        if ($this->isSuperAdmin($user)) {
            return true;
        }

        return $this->hasAnyPermission($user, [
            'manage-certificate-templates',
            'certificate-templates.view',
            'certificate-templates.show',
        ]);
    }

    public function create(User $user): bool
    {
        if ($this->isSuperAdmin($user)) {
            return true;
        }

        return $this->hasAnyPermission($user, [
            'manage-certificate-templates',
            'certificate-templates.create',
        ]);
    }

    public function update(User $user, CertificateTemplate $template): bool
    {
        if ($this->isSuperAdmin($user)) {
            return true;
        }

        return $this->hasAnyPermission($user, [
            'manage-certificate-templates',
            'certificate-templates.edit',
        ]);
    }

    public function delete(User $user, CertificateTemplate $template): bool
    {
        if ($this->isSuperAdmin($user)) {
            return true;
        }

        return $this->hasAnyPermission($user, [
            'manage-certificate-templates',
            'certificate-templates.delete',
        ]);
    }

    private function hasAnyPermission(User $user, array $keys): bool
    {
        foreach ($keys as $key) {
            if ($user->hasPermission($key)) {
                return true;
            }
        }

        return false;
    }

    private function isSuperAdmin(User $user): bool
    {
        return in_array($user->role?->slug, ['super-admin', 'superadmin'], true)
            || in_array($user->role?->name, ['SuperAdmin', 'superadmin'], true);
    }
}
