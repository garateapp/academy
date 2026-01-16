<?php

namespace App\Modules\Learning\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLearningPathRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'status' => ['required', 'in:draft,active,archived'],
            'cover_image' => ['nullable', 'image', 'max:2048'],
            'courses' => ['nullable', 'array'],
            'courses.*.id' => ['required_with:courses', 'exists:courses,id'],
            'courses.*.is_required' => ['boolean'],
            'courses.*.sort_order' => ['integer', 'min:0'],
        ];
    }
}
