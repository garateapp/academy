<?php

namespace App\Modules\Identity\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Audit\Application\AuditService;
use App\Modules\Identity\Actions\CreateOrUpdateUserFromGoogle;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function __construct(
        protected AuditService $auditService
    ) {}

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(CreateOrUpdateUserFromGoogle $action)
    {
        try {
            $socialUser = Socialite::driver('google')->user();

            $user = $action->handle($socialUser);

            Auth::login($user);

            $this->auditService->log(
                action: 'auth.login',
                entityType: 'User',
                entityId: $user->id,
                payload: ['email' => $user->email, 'provider' => 'google']
            );

            return redirect()->intended(route('dashboard'));

        } catch (\Exception $e) {
            // Log error
            return redirect()->route('login')->withErrors(['email' => 'Authentication failed.']);
        }
    }
}
