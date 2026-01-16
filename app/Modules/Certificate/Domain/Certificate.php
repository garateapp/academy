<?php

namespace App\Modules\Certificate\Domain;

use App\Modules\Identity\Domain\User;
use App\Modules\Learning\Domain\Course;
use App\Modules\Learning\Domain\LearningPath;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Certificate extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'course_id',
        'learning_path_id',
        'template_id',
        'certificate_number',
        'title',
        'description',
        'issued_at',
        'expires_at',
        'revoked_at',
        'revoked_by',
        'revocation_reason',
        'pdf_path',
        'verification_code',
        'metadata',
    ];

    protected $casts = [
        'issued_at' => 'datetime',
        'expires_at' => 'datetime',
        'revoked_at' => 'datetime',
        'metadata' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($certificate) {
            if (!$certificate->certificate_number) {
                $certificate->certificate_number = self::generateCertificateNumber();
            }

            if (!$certificate->verification_code) {
                $certificate->verification_code = self::generateVerificationCode();
            }

            if (!$certificate->issued_at) {
                $certificate->issued_at = now();
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function learningPath(): BelongsTo
    {
        return $this->belongsTo(LearningPath::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(CertificateTemplate::class, 'template_id');
    }

    public function revoker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'revoked_by');
    }

    // Helper methods
    public function isValid(): bool
    {
        if ($this->revoked_at) {
            return false;
        }

        if ($this->expires_at && now()->gt($this->expires_at)) {
            return false;
        }

        return true;
    }

    public function isExpired(): bool
    {
        return $this->expires_at && now()->gt($this->expires_at);
    }

    public function isRevoked(): bool
    {
        return $this->revoked_at !== null;
    }

    public function revoke(int $revokedBy, string $reason): void
    {
        $this->update([
            'revoked_at' => now(),
            'revoked_by' => $revokedBy,
            'revocation_reason' => $reason,
        ]);
    }

    public function getPublicUrl(): string
    {
        return route('certificates.verify', $this->verification_code);
    }

    public static function generateCertificateNumber(): string
    {
        $prefix = 'CERT';
        $year = now()->year;
        $random = strtoupper(Str::random(8));

        return "{$prefix}-{$year}-{$random}";
    }

    public static function generateVerificationCode(): string
    {
        return strtoupper(Str::random(16));
    }

    public function getPlaceholderData(): array
    {
        $data = [
            'user_name' => $this->user->name,
            'certificate_number' => $this->certificate_number,
            'completion_date' => $this->issued_at->format('d/m/Y'),
            'verification_code' => $this->verification_code,
            'organization' => config('app.name', 'Greenex Academy'),
        ];

        if ($this->course) {
            $data['course_title'] = $this->course->title;
            $data['instructor_name'] = $this->course->creator->name ?? 'N/A';
            $data['hours'] = $this->course->duration_minutes
                ? round($this->course->duration_minutes / 60, 1)
                : 'N/A';
        }

        if ($this->learningPath) {
            $data['course_title'] = $this->learningPath->name;
        }

        // Add metadata if present
        if ($this->metadata) {
            $data = array_merge($data, $this->metadata);
        }

        return $data;
    }
}
