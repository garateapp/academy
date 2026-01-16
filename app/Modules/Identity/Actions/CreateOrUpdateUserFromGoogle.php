<?php

namespace App\Modules\Identity\Actions;

use App\Modules\Identity\Domain\User;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class CreateOrUpdateUserFromGoogle
{
    public function handle(SocialiteUser $socialUser): User
    {
        // Here you can add domain validation if needed
        // if (!str_ends_with($socialUser->getEmail(), '@greenex.cl')) {
        //     abort(403, 'Unauthorized domain.');
        // }

        $user = User::updateOrCreate(
            ['email' => $socialUser->getEmail()],
            [
                'name' => $socialUser->getName(),
                // 'avatar' => $socialUser->getAvatar(), // If we add avatar column later
                'password' => 'google_sso_' . str()->random(16), // Dummy password
                'email_verified_at' => now(),
            ]
        );

        return $user;
    }
}
