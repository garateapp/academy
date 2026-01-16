<?php

namespace App\Modules\Certificate\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IssueCertificateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization handled by controller
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'course_id' => ['nullable', 'required_without:learning_path_id', 'exists:courses,id'],
            'learning_path_id' => ['nullable', 'required_without:course_id', 'exists:learning_paths,id'],
            'template_id' => ['required', 'exists:certificate_templates,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'expires_at' => ['nullable', 'date', 'after:today'],
            'metadata' => ['nullable', 'array'],
            'metadata.score' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'metadata.hours' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'El usuario es obligatorio.',
            'user_id.exists' => 'El usuario seleccionado no existe.',
            'course_id.required_without' => 'Debe seleccionar un curso o una ruta de aprendizaje.',
            'course_id.exists' => 'El curso seleccionado no existe.',
            'learning_path_id.required_without' => 'Debe seleccionar un curso o una ruta de aprendizaje.',
            'learning_path_id.exists' => 'La ruta de aprendizaje seleccionada no existe.',
            'template_id.required' => 'La plantilla es obligatoria.',
            'template_id.exists' => 'La plantilla seleccionada no existe.',
            'title.required' => 'El título es obligatorio.',
            'title.max' => 'El título no puede exceder 255 caracteres.',
            'expires_at.date' => 'La fecha de expiración debe ser válida.',
            'expires_at.after' => 'La fecha de expiración debe ser posterior a hoy.',
        ];
    }
}
