<?php

namespace App\Modules\Certificate\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCertificateTemplateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization handled by controller
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'orientation' => ['required', Rule::in(['landscape', 'portrait'])],
            'size' => ['required', Rule::in(['A4', 'Letter', 'Legal'])],
            'styles' => ['nullable', 'array'],
            'placeholders' => ['nullable', 'array'],
            'is_default' => ['boolean'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.max' => 'El nombre no puede exceder 255 caracteres.',
            'content.required' => 'El contenido HTML es obligatorio.',
            'orientation.required' => 'La orientación es obligatoria.',
            'orientation.in' => 'La orientación debe ser horizontal o vertical.',
            'size.required' => 'El tamaño es obligatorio.',
            'size.in' => 'El tamaño debe ser A4, Letter o Legal.',
        ];
    }
}
