<?php

namespace App\Modules\Survey\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Survey\Domain\SurveyAssignment;
use App\Modules\Survey\Domain\SurveyResponse;
use App\Modules\Survey\Domain\SurveyResponseOption;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SurveyResponseController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        $assignments = SurveyAssignment::with('survey')
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($assignment) {
                if ($assignment->status === 'pending' && $assignment->isExpired()) {
                    $assignment->status = 'expired';
                    $assignment->save();
                }

                return $assignment;
            });

        return Inertia::render('Learner/Surveys/Index', [
            'assignments' => $assignments,
        ]);
    }

    public function show(string $token): Response
    {
        $user = auth()->user();

        $assignment = SurveyAssignment::with(['survey.questions.options'])
            ->where('token', $token)
            ->firstOrFail();

        if ($assignment->user_id !== $user->id) {
            abort(403);
        }

        if ($assignment->status === 'completed') {
            return Inertia::render('Learner/Surveys/Take', [
                'assignment' => $assignment,
                'survey' => $assignment->survey,
                'questions' => $assignment->survey->questions,
                'readonly' => true,
                'message' => 'Ya respondiste esta encuesta. Gracias por tu tiempo.',
            ]);
        }

        if ($assignment->survey->status !== 'published') {
            return Inertia::render('Learner/Surveys/Take', [
                'assignment' => $assignment,
                'survey' => $assignment->survey,
                'questions' => $assignment->survey->questions,
                'readonly' => true,
                'message' => 'Esta encuesta no se encuentra disponible actualmente.',
            ]);
        }

        if ($assignment->isExpired()) {
            $assignment->update(['status' => 'expired']);

            return Inertia::render('Learner/Surveys/Take', [
                'assignment' => $assignment,
                'survey' => $assignment->survey,
                'questions' => $assignment->survey->questions,
                'readonly' => true,
                'message' => 'El enlace de la encuesta expiró.',
            ]);
        }

        return Inertia::render('Learner/Surveys/Take', [
            'assignment' => $assignment,
            'survey' => $assignment->survey,
            'questions' => $assignment->survey->questions,
            'readonly' => false,
            'message' => null,
        ]);
    }

    public function submit(Request $request, string $token): RedirectResponse
    {
        $user = auth()->user();

        $assignment = SurveyAssignment::with('survey.questions.options')
            ->where('token', $token)
            ->firstOrFail();

        if ($assignment->user_id !== $user->id) {
            abort(403);
        }

        if ($assignment->status === 'completed') {
            return redirect()->route('surveys.my')
                ->with('info', 'Esta encuesta ya fue respondida.');
        }

        if ($assignment->survey->status !== 'published') {
            return redirect()->route('surveys.my')
                ->with('error', 'Esta encuesta no se encuentra disponible actualmente.');
        }

        if ($assignment->isExpired()) {
            $assignment->update(['status' => 'expired']);
            return redirect()->route('surveys.my')
                ->with('error', 'El enlace de la encuesta expiró.');
        }

        $responses = $request->input('responses', []);
        $errors = [];

        foreach ($assignment->survey->questions as $question) {
            $answer = $responses[$question->id] ?? null;

            if ($question->is_required && ($answer === null || $answer === '' || $answer === [])) {
                $errors[$question->id] = 'Esta pregunta es obligatoria.';
            }
        }

        if (!empty($errors)) {
            return back()->withErrors($errors);
        }

        $assignment->responses()->delete();

        foreach ($assignment->survey->questions as $question) {
            $answer = $responses[$question->id] ?? null;

            if ($answer === null || $answer === '' || $answer === []) {
                continue;
            }

            $response = SurveyResponse::create([
                'assignment_id' => $assignment->id,
                'question_id' => $question->id,
                'user_id' => $assignment->survey->is_anonymous ? null : $user->id,
                'text_response' => $question->type === 'text' ? (string) $answer : null,
            ]);

            if ($question->type === 'single_choice') {
                SurveyResponseOption::create([
                    'response_id' => $response->id,
                    'option_id' => (int) $answer,
                ]);
            }

            if ($question->type === 'multiple_choice') {
                foreach ((array) $answer as $optionId) {
                    SurveyResponseOption::create([
                        'response_id' => $response->id,
                        'option_id' => (int) $optionId,
                    ]);
                }
            }
        }

        $assignment->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        return redirect()->route('surveys.my')
            ->with('success', 'Gracias por responder la encuesta.');
    }
}
