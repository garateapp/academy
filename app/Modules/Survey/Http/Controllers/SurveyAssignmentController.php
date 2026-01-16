<?php

namespace App\Modules\Survey\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\SurveyInvitationMail;
use App\Modules\Survey\Domain\Survey;
use App\Modules\Survey\Domain\SurveyAssignment;
use App\Modules\Identity\Domain\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class SurveyAssignmentController extends Controller
{
    public function store(Request $request, Survey $survey): RedirectResponse
    {
        if (!Gate::allows('surveys.assign')) {
            abort(403);
        }

        if ($survey->status !== 'published') {
            return back()->with('error', 'Solo puedes asignar encuestas publicadas.');
        }

        if ($survey->isExpired()) {
            return back()->with('error', 'La encuesta ya expiró y no puede asignarse.');
        }

        $data = $request->validate([
            'user_ids' => ['required', 'array'],
            'user_ids.*' => ['integer', 'exists:users,id'],
        ]);

        $users = User::whereIn('id', $data['user_ids'])->get();
        $assigned = 0;

        foreach ($users as $user) {
            $existing = SurveyAssignment::where('survey_id', $survey->id)
                ->where('user_id', $user->id)
                ->whereIn('status', ['pending', 'completed'])
                ->first();

            if ($existing) {
                continue;
            }

            $assignment = SurveyAssignment::create([
                'survey_id' => $survey->id,
                'user_id' => $user->id,
                'token' => Str::random(40),
                'status' => 'pending',
                'expires_at' => $survey->expires_at,
                'sent_at' => now(),
            ]);

            if ($user->email) {
                Mail::to($user->email)->send(new SurveyInvitationMail($survey, $assignment));
            }
            $assigned++;
        }

        if ($assigned === 0) {
            return back()->with('warning', 'No se asignaron nuevos usuarios.');
        }

        return back()->with('success', "Encuestas asignadas: {$assigned}.");
    }
}
