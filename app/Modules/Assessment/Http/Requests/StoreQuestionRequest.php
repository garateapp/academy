<?php

namespace App\Modules\Assessment\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreQuestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization handled by controller
    }

    public function rules(): array
    {
        return [
            'type' => ['required', Rule::in(['multiple_choice', 'true_false', 'short_answer', 'essay', 'matching'])],
            'question_text' => ['required', 'string'],
            'explanation' => ['nullable', 'string'],
            'points' => ['required', 'integer', 'min:1'],
            'is_required' => ['boolean'],
            'options' => ['nullable', 'array'],
            'options.*.option_text' => ['required_with:options', 'string'],
            'options.*.is_correct' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'type.required' => 'El tipo de pregunta es obligatorio.',
            'type.in' => 'El tipo debe ser: opción múltiple, verdadero/falso, respuesta corta, ensayo o emparejamiento.',
            'question_text.required' => 'El texto de la pregunta es obligatorio.',
            'points.required' => 'Los puntos son obligatorios.',
            'points.integer' => 'Los puntos deben ser un número entero.',
            'points.min' => 'Los puntos deben ser al menos 1.',
            'options.array' => 'Las opciones deben ser un listado válido.',
            'options.*.option_text.required_with' => 'El texto de la opción es obligatorio.',
        ];
    }
}
