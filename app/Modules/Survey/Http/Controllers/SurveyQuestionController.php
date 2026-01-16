<?php

namespace App\Modules\Survey\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Survey\Domain\Survey;
use App\Modules\Survey\Domain\SurveyQuestion;
use App\Modules\Survey\Domain\SurveyQuestionOption;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SurveyQuestionController extends Controller
{
    public function create(Survey $survey): Response
    {
        $this->authorize('update', $survey);

        return Inertia::render('Admin/Surveys/Questions/Create', [
            'survey' => $survey,
        ]);
    }

    public function store(Request $request, Survey $survey): RedirectResponse
    {
        $this->authorize('update', $survey);

        $data = $request->validate([
            'type' => ['required', 'in:single_choice,multiple_choice,text'],
            'prompt' => ['required', 'string'],
            'is_required' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'options' => ['array'],
            'options.*.option_text' => ['required_with:options', 'string'],
        ]);

        $question = SurveyQuestion::create([
            'survey_id' => $survey->id,
            'type' => $data['type'],
            'prompt' => $data['prompt'],
            'is_required' => $data['is_required'] ?? false,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        if (in_array($data['type'], ['single_choice', 'multiple_choice'], true)) {
            foreach (($data['options'] ?? []) as $index => $option) {
                SurveyQuestionOption::create([
                    'question_id' => $question->id,
                    'option_text' => $option['option_text'],
                    'sort_order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.surveys.show', $survey)
            ->with('success', 'Pregunta agregada correctamente.');
    }

    public function edit(Survey $survey, SurveyQuestion $question): Response
    {
        $this->authorize('update', $survey);

        $question->load('options');

        return Inertia::render('Admin/Surveys/Questions/Edit', [
            'survey' => $survey,
            'question' => $question,
        ]);
    }

    public function update(Request $request, Survey $survey, SurveyQuestion $question): RedirectResponse
    {
        $this->authorize('update', $survey);

        $data = $request->validate([
            'type' => ['required', 'in:single_choice,multiple_choice,text'],
            'prompt' => ['required', 'string'],
            'is_required' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'options' => ['array'],
            'options.*.option_text' => ['required_with:options', 'string'],
        ]);

        $question->update([
            'type' => $data['type'],
            'prompt' => $data['prompt'],
            'is_required' => $data['is_required'] ?? false,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        $question->options()->delete();
        if (in_array($data['type'], ['single_choice', 'multiple_choice'], true)) {
            foreach (($data['options'] ?? []) as $index => $option) {
                SurveyQuestionOption::create([
                    'question_id' => $question->id,
                    'option_text' => $option['option_text'],
                    'sort_order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.surveys.show', $survey)
            ->with('success', 'Pregunta actualizada correctamente.');
    }

    public function destroy(Survey $survey, SurveyQuestion $question): RedirectResponse
    {
        $this->authorize('update', $survey);

        $question->delete();

        return back()->with('success', 'Pregunta eliminada.');
    }
}
