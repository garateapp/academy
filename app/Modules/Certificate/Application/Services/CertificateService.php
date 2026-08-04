<?php

namespace App\Modules\Certificate\Application\Services;

use App\Modules\Assessment\Domain\AssessmentAttempt;
use App\Modules\Audit\Application\AuditService;
use App\Modules\Certificate\Domain\Certificate;
use App\Modules\Certificate\Domain\CertificateTemplate;
use App\Modules\Learning\Domain\Enrollment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

class CertificateService
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function issueCertificate(
        int $userId,
        int $templateId,
        array $data
    ): Certificate {
        $template = CertificateTemplate::findOrFail($templateId);

        $certificate = Certificate::create([
            'user_id'          => $userId,
            'course_id'        => $data['course_id']        ?? null,
            'learning_path_id' => $data['learning_path_id'] ?? null,
            'template_id'      => $templateId,
            'title'            => $data['title'],
            'description'      => $data['description'] ?? null,
            'expires_at'       => $data['expires_at']  ?? null,
            'metadata'         => $data['metadata']    ?? null,
        ]);

        // Generate PDF
        $this->generatePdf($certificate);

        $this->auditService->log(
            'certificate.issued',
            'certificate',
            (string) $certificate->id,
            [
                'certificate_id'     => $certificate->id,
                'user_id'            => $userId,
                'certificate_number' => $certificate->certificate_number,
            ]
        );

        return $certificate;
    }

    public function generatePdf(Certificate $certificate): string
    {
        $certificate->load(['user', 'course', 'learningPath', 'template']);

        $template        = $certificate->template;
        $placeholderData = $certificate->getPlaceholderData();

        // Replace placeholders in template
        $html = $template->replacePlaceholders($placeholderData);

        // Generate PDF
        $pdf = Pdf::loadHTML($html)
            ->setPaper($template->size, $template->orientation);

        // Save PDF
        $filename = "certificates/{$certificate->certificate_number}.pdf";
        Storage::disk('public')->put($filename, $pdf->output());

        // Update certificate with PDF path
        $certificate->update(['pdf_path' => $filename]);

        return $filename;
    }

    public function revokeCertificate(Certificate $certificate, int $revokedBy, string $reason): void
    {
        $certificate->revoke($revokedBy, $reason);

        $this->auditService->log(
            'certificate.revoked',
            'certificate',
            (string) $certificate->id,
            [
                'certificate_id'     => $certificate->id,
                'certificate_number' => $certificate->certificate_number,
                'revoked_by'         => $revokedBy,
                'reason'             => $reason,
            ]
        );
    }

    public function verifyCertificate(string $verificationCode): ?Certificate
    {
        return Certificate::where('verification_code', $verificationCode)
            ->with(['user', 'course', 'learningPath'])
            ->first();
    }

    public function regeneratePdf(Certificate $certificate): string
    {
        // Delete old PDF if exists
        if ($certificate->pdf_path) {
            Storage::disk('public')->delete($certificate->pdf_path);
        }

        return $this->generatePdf($certificate);
    }

    public function autoIssueOnCompletion(Enrollment $enrollment): ?Certificate
    {
        $enrollment->load(['user', 'course']);

        if (! $enrollment->course || ! $enrollment->isCompleted()) {
            return null;
        }

        $attempt = AssessmentAttempt::where('enrollment_id', $enrollment->id)
            ->with('assessment')
            ->where('passed', true)
            ->whereIn('status', ['submitted', 'graded'])
            ->orderByDesc('submitted_at')
            ->first();

        if (! $attempt) {
            return null;
        }

        $existing = Certificate::where('user_id', $enrollment->user_id)
            ->where('course_id', $enrollment->course_id)
            ->whereNull('revoked_at')
            ->first();

        if ($existing) {
            return $existing;
        }

        $template = $this->resolveActiveTemplate();

        $certificate = Certificate::create([
            'user_id'     => $enrollment->user_id,
            'course_id'   => $enrollment->course_id,
            'template_id' => $template->id,
            'title'       => "Diploma de Aprobación - {$enrollment->course->title}",
            'metadata'    => [
                'score'         => $attempt->score,
                'passing_score' => $attempt->assessment->passing_score ?? null,
                'auto_issued'   => true,
            ],
        ]);

        $this->generateDiplomaPdf($certificate);

        $this->auditService->log(
            'certificate.auto_issued',
            'certificate',
            (string) $certificate->id,
            [
                'certificate_id'     => $certificate->id,
                'user_id'            => $enrollment->user_id,
                'course_id'          => $enrollment->course_id,
                'score'              => $attempt->score,
                'certificate_number' => $certificate->certificate_number,
            ]
        );

        return $certificate;
    }

    public function syncUserCertificates(int $userId): Collection
    {
        $enrollments = Enrollment::query()
            ->where('user_id', $userId)
            ->where('status', 'completed')
            ->whereHas('course')
            ->whereHas('user')
            ->whereHas('assessmentAttempts', function ($query) {
                $query
                    ->where('passed', true)
                    ->whereIn('status', ['submitted', 'graded']);
            })
            ->with(['user', 'course'])
            ->get();

        return $enrollments
            ->map(fn (Enrollment $enrollment) => $this->autoIssueOnCompletion($enrollment))
            ->filter()
            ->values();
    }

    public function generateDiplomaPdf(Certificate $certificate): string
    {
        $certificate->load(['user', 'course']);

        $logoPath    = public_path('logo-garate.png');
        $logoDataUri = is_file($logoPath)
            ? 'data:image/png;base64,' . base64_encode((string) file_get_contents($logoPath))
            : null;
        $sealPath    = public_path('sello-garate-academy.png');
        $sealDataUri = is_file($sealPath)
            ? 'data:image/png;base64,' . base64_encode((string) file_get_contents($sealPath))
            : null;

        $html = view('certificates.diploma', [
            'certificate'       => $certificate,
            'userName'          => $certificate->user->name,
            'courseTitle'       => $certificate->course->title     ?? '',
            'score'             => $certificate->metadata['score'] ?? null,
            'certificateNumber' => $certificate->certificate_number,
            'issuedDate'        => $certificate->issued_at->format('d/m/Y'),
            'organization'      => config('app.name', 'Gárate Hermanos Academy'),
            'logoDataUri'       => $logoDataUri,
            'sealDataUri'       => $sealDataUri,
        ])->render();

        $pdf = Pdf::loadHTML($html)->setPaper('a4', 'landscape');

        $filename = "certificates/{$certificate->certificate_number}.pdf";
        Storage::disk('public')->put($filename, $pdf->output());

        $certificate->update(['pdf_path' => $filename]);

        return $filename;
    }

    public function getUserCertificates(int $userId): Collection
    {
        return Certificate::where('user_id', $userId)
            ->with(['course', 'learningPath', 'template'])
            ->whereNull('revoked_at')
            ->orderBy('issued_at', 'desc')
            ->get();
    }

    public function getCourseCertificates(int $courseId): Collection
    {
        return Certificate::where('course_id', $courseId)
            ->with(['user', 'template'])
            ->whereNull('revoked_at')
            ->orderBy('issued_at', 'desc')
            ->get();
    }

    private function resolveActiveTemplate(): CertificateTemplate
    {
        $template = CertificateTemplate::query()
            ->where('is_default', true)
            ->where('is_active', true)
            ->first()
            ?? CertificateTemplate::query()->where('is_active', true)->first();

        if ($template) {
            return $template;
        }

        return CertificateTemplate::create([
            'name'        => 'Diploma de Aprobación',
            'description' => 'Plantilla predeterminada para cursos aprobados.',
            'content'     => <<<'HTML'
                <!DOCTYPE html>
                <html lang="es">
                <body>
                    <h1>Certificado de aprobación</h1>
                    <p>{{user_name}} aprobó el curso {{course_title}}.</p>
                    <p>{{certificate_number}} · {{completion_date}}</p>
                </body>
                </html>
                HTML,
            'orientation' => 'landscape',
            'size'        => 'A4',
            'is_default'  => true,
            'is_active'   => true,
        ]);
    }
}
