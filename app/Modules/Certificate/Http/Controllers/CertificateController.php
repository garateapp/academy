<?php

namespace App\Modules\Certificate\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Certificate\Application\Services\CertificateService;
use App\Modules\Certificate\Domain\Certificate;
use App\Modules\Certificate\Domain\CertificateTemplate;
use App\Modules\Certificate\Http\Requests\IssueCertificateRequest;
use App\Modules\Audit\Application\AuditService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    public function __construct(
        private readonly CertificateService $certificateService,
        private readonly AuditService $auditService
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', Certificate::class);

        $certificates = Certificate::with(['user', 'course', 'learningPath', 'template'])
            ->orderBy('issued_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => $certificates,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Certificate::class);

        $templates = CertificateTemplate::where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Certificates/Create', [
            'templates' => $templates,
        ]);
    }

    public function store(IssueCertificateRequest $request): RedirectResponse
    {
        $this->authorize('create', Certificate::class);

        $certificate = $this->certificateService->issueCertificate(
            $request->input('user_id'),
            $request->input('template_id'),
            $request->validated()
        );

        return redirect()->route('admin.certificates.show', $certificate)
            ->with('success', 'Certificado emitido exitosamente.');
    }

    public function show(Certificate $certificate): Response
    {
        $this->authorize('view', $certificate);

        $certificate->load(['user', 'course', 'learningPath', 'template', 'revoker']);

        return Inertia::render('Admin/Certificates/Show', [
            'certificate' => $certificate,
        ]);
    }

    public function destroy(Certificate $certificate): RedirectResponse
    {
        $this->authorize('delete', $certificate);

        // Delete PDF if exists
        if ($certificate->pdf_path) {
            Storage::disk('public')->delete($certificate->pdf_path);
        }

        $certificateData = $certificate->toArray();
        $certificate->delete();

        $this->auditService->log('certificate.deleted', [
            'certificate_id' => $certificateData['id'],
            'certificate_number' => $certificateData['certificate_number'],
        ]);

        return redirect()->route('admin.certificates.index')
            ->with('success', 'Certificado eliminado exitosamente.');
    }

    public function revoke(Request $request, Certificate $certificate): RedirectResponse
    {
        $this->authorize('revoke', $certificate);

        $request->validate([
            'reason' => ['required', 'string', 'max:500'],
        ]);

        $this->certificateService->revokeCertificate(
            $certificate,
            auth()->id(),
            $request->input('reason')
        );

        return back()->with('success', 'Certificado revocado exitosamente.');
    }

    public function download(Certificate $certificate)
    {
        $this->authorize('view', $certificate);

        if (!$certificate->pdf_path || !Storage::disk('public')->exists($certificate->pdf_path)) {
            // Regenerate PDF if missing
            $this->certificateService->generatePdf($certificate);
        }

        return Storage::disk('public')->download(
            $certificate->pdf_path,
            $certificate->certificate_number . '.pdf'
        );
    }

    public function regenerate(Certificate $certificate): RedirectResponse
    {
        $this->authorize('update', $certificate);

        $this->certificateService->regeneratePdf($certificate);

        return back()->with('success', 'PDF regenerado exitosamente.');
    }

    public function myCertificates(): Response
    {
        $certificates = $this->certificateService->getUserCertificates(auth()->id());

        return Inertia::render('Learner/Certificates/MyCertificates', [
            'certificates' => $certificates,
        ]);
    }

    public function verify(string $verificationCode): Response
    {
        $certificate = $this->certificateService->verifyCertificate($verificationCode);

        if (!$certificate) {
            return Inertia::render('Public/CertificateVerification', [
                'found' => false,
                'message' => 'Certificado no encontrado.',
            ]);
        }

        return Inertia::render('Public/CertificateVerification', [
            'found' => true,
            'certificate' => $certificate,
            'isValid' => $certificate->isValid(),
        ]);
    }
}
