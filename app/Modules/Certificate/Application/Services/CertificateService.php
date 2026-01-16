<?php

namespace App\Modules\Certificate\Application\Services;

use App\Modules\Certificate\Domain\Certificate;
use App\Modules\Certificate\Domain\CertificateTemplate;
use App\Modules\Audit\Application\AuditService;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;

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
            'user_id' => $userId,
            'course_id' => $data['course_id'] ?? null,
            'learning_path_id' => $data['learning_path_id'] ?? null,
            'template_id' => $templateId,
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'expires_at' => $data['expires_at'] ?? null,
            'metadata' => $data['metadata'] ?? null,
        ]);

        // Generate PDF
        $this->generatePdf($certificate);

        $this->auditService->log(
            'certificate.issued',
            'certificate',
            (string) $certificate->id,
            [
                'certificate_id' => $certificate->id,
                'user_id' => $userId,
                'certificate_number' => $certificate->certificate_number,
            ]
        );

        return $certificate;
    }

    public function generatePdf(Certificate $certificate): string
    {
        $certificate->load(['user', 'course', 'learningPath', 'template']);

        $template = $certificate->template;
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
                'certificate_id' => $certificate->id,
                'certificate_number' => $certificate->certificate_number,
                'revoked_by' => $revokedBy,
                'reason' => $reason,
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

    public function getUserCertificates(int $userId): \Illuminate\Database\Eloquent\Collection
    {
        return Certificate::where('user_id', $userId)
            ->with(['course', 'learningPath', 'template'])
            ->whereNull('revoked_at')
            ->orderBy('issued_at', 'desc')
            ->get();
    }

    public function getCourseCertificates(int $courseId): \Illuminate\Database\Eloquent\Collection
    {
        return Certificate::where('course_id', $courseId)
            ->with(['user', 'template'])
            ->whereNull('revoked_at')
            ->orderBy('issued_at', 'desc')
            ->get();
    }
}
