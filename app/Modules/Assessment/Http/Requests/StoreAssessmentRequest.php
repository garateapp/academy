<?php

namespace App\Modules\Assessment\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAssessmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization handled by controller
    }

    public function rules(): array
    {
        return [
            'module_id' => ['required', 'exists:course_modules,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'type' => ['required', Rule::in(['quiz', 'exam', 'assignment', 'survey'])],
            'time_limit_minutes' => ['nullable', 'integer', 'min:1'],
            'passing_score' => ['required', 'integer', 'min:0', 'max:100'],
            'max_attempts' => ['nullable', 'integer', 'min:1'],
            'randomize_questions' => ['boolean'],
            'shuffle_questions' => ['boolean'],
            'shuffle_options' => ['boolean'],
            'show_results' => ['boolean'],
            'show_correct_answers' => ['boolean'],
            'allow_review' => ['boolean'],
            'available_from' => ['nullable', 'date'],
            'available_until' => ['nullable', 'date', 'after:available_from'],
            'is_required' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'module_id.required' => 'El módulo es obligatorio.',
            'module_id.exists' => 'El módulo seleccionado no existe.',
            'title.required' => 'El título es obligatorio.',
            'title.max' => 'El título no puede exceder 255 caracteres.',
            'type.required' => 'El tipo de evaluación es obligatorio.',
            'type.in' => 'El tipo debe ser: quiz, examen, tarea o encuesta.',
            'time_limit_minutes.integer' => 'El límite de tiempo debe ser un número entero.',
            'time_limit_minutes.min' => 'El límite de tiempo debe ser al menos 1 minuto.',
            'passing_score.required' => 'La puntuación mínima es obligatoria.',
            'passing_score.integer' => 'La puntuación mínima debe ser un número entero.',
            'passing_score.min' => 'La puntuación mínima debe ser al menos 0.',
            'passing_score.max' => 'La puntuación mínima no puede exceder 100.',
            'max_attempts.integer' => 'El máximo de intentos debe ser un número entero.',
            'max_attempts.min' => 'Debe permitir al menos 1 intento.',
            'available_from.date' => 'La fecha de inicio debe ser válida.',
            'available_until.date' => 'La fecha de fin debe ser válida.',
            'available_until.after' => 'La fecha de fin debe ser posterior a la fecha de inicio.',
        ];
    }
}
