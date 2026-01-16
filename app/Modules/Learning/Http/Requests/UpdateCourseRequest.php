<?php

namespace App\Modules\Learning\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'category_id' => ['required', 'exists:categories,id'],
            'cover_image' => ['nullable', 'image', 'max:2048'], // 2MB max
            'duration_minutes' => ['nullable', 'integer', 'min:1'],
            'difficulty' => ['nullable', 'in:beginner,intermediate,advanced'],
            'status' => ['required', 'in:draft,published,archived'],
            'valid_from' => ['nullable', 'date'],
            'valid_until' => ['nullable', 'date', 'after:valid_from'],
            'allow_self_enrollment' => ['boolean'],
            'prerequisites' => ['nullable', 'array'],
            'prerequisites.*' => ['exists:courses,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título del curso es obligatorio.',
            'title.max' => 'El título no puede exceder 255 caracteres.',
            'description.max' => 'La descripción no puede exceder 5000 caracteres.',
            'category_id.required' => 'La categoría es obligatoria.',
            'category_id.exists' => 'La categoría seleccionada no existe.',
            'cover_image.image' => 'El archivo debe ser una imagen.',
            'cover_image.max' => 'La imagen no puede exceder 2MB.',
            'duration_minutes.integer' => 'La duración debe ser un número entero.',
            'duration_minutes.min' => 'La duración debe ser al menos 1 minuto.',
            'difficulty.in' => 'La dificultad debe ser: principiante, intermedio o avanzado.',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado debe ser: borrador, publicado o archivado.',
            'valid_from.date' => 'La fecha de inicio de vigencia debe ser válida.',
            'valid_until.date' => 'La fecha de fin de vigencia debe ser válida.',
            'valid_until.after' => 'La fecha de fin debe ser posterior a la fecha de inicio.',
            'prerequisites.array' => 'Los prerrequisitos deben ser un listado válido.',
            'prerequisites.*.exists' => 'Uno o más prerrequisitos no existen.',
        ];
    }
}
