<?php

namespace App\Modules\Certificate\Domain;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CertificateTemplate extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'content',
        'orientation',
        'size',
        'styles',
        'placeholders',
        'is_default',
        'is_active',
    ];

    protected $casts = [
        'styles' => 'array',
        'placeholders' => 'array',
        'is_default' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class, 'template_id');
    }

    // Helper methods
    public function getAvailablePlaceholders(): array
    {
        return $this->placeholders ?? [
            '{{user_name}}' => 'Nombre del usuario',
            '{{course_title}}' => 'Título del curso',
            '{{completion_date}}' => 'Fecha de completación',
            '{{certificate_number}}' => 'Número de certificado',
            '{{hours}}' => 'Horas de duración',
            '{{score}}' => 'Puntuación obtenida',
            '{{instructor_name}}' => 'Nombre del instructor',
            '{{organization}}' => 'Nombre de la organización',
        ];
    }

    public function replacePlaceholders(array $data): string
    {
        $content = $this->content;

        foreach ($data as $placeholder => $value) {
            $content = str_replace("{{" . $placeholder . "}}", $value, $content);
        }

        return $content;
    }
}
