<?php

namespace App\Modules\Certificate\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Certificate\Domain\CertificateTemplate;
use App\Modules\Certificate\Http\Requests\StoreCertificateTemplateRequest;
use App\Modules\Certificate\Http\Requests\UpdateCertificateTemplateRequest;
use App\Modules\Audit\Application\AuditService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CertificateTemplateController extends Controller
{
    public function __construct(
        private readonly AuditService $auditService
    ) {
        $this->authorizeResource(CertificateTemplate::class, 'certificate_template');
    }

    public function index(): Response
    {
        $templates = CertificateTemplate::withCount('certificates')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/CertificateTemplates/Index', [
            'templates' => $templates,
        ]);
    }

    public function create(): Response
    {
        $placeholders = (new CertificateTemplate())->getAvailablePlaceholders();

        return Inertia::render('Admin/CertificateTemplates/Create', [
            'placeholders' => $placeholders,
        ]);
    }

    public function store(StoreCertificateTemplateRequest $request): RedirectResponse
    {
        $template = CertificateTemplate::create($request->validated());

        // If this is set as default, unset other defaults
        if ($template->is_default) {
            CertificateTemplate::where('id', '!=', $template->id)
                ->update(['is_default' => false]);
        }

        $this->auditService->log(
            'certificate_template.created',
            'certificate_template',
            (string) $template->id,
            [
                'template_id' => $template->id,
                'name' => $template->name,
            ]
        );

        return redirect()->route('admin.certificate-templates.show', $template)
            ->with('success', 'Plantilla creada exitosamente.');
    }

    public function show(CertificateTemplate $certificate_template): Response
    {
        $certificate_template->loadCount('certificates');
        $placeholders = $certificate_template->getAvailablePlaceholders();

        return Inertia::render('Admin/CertificateTemplates/Show', [
            'template' => $certificate_template,
            'placeholders' => $placeholders,
        ]);
    }

    public function edit(CertificateTemplate $certificate_template): Response
    {
        $placeholders = $certificate_template->getAvailablePlaceholders();

        return Inertia::render('Admin/CertificateTemplates/Edit', [
            'template' => $certificate_template,
            'placeholders' => $placeholders,
        ]);
    }

    public function update(UpdateCertificateTemplateRequest $request, CertificateTemplate $certificate_template): RedirectResponse
    {
        $oldData = $certificate_template->toArray();

        $certificate_template->update($request->validated());

        // If this is set as default, unset other defaults
        if ($certificate_template->is_default) {
            CertificateTemplate::where('id', '!=', $certificate_template->id)
                ->update(['is_default' => false]);
        }

        $this->auditService->log(
            'certificate_template.updated',
            'certificate_template',
            (string) $certificate_template->id,
            [
                'template_id' => $certificate_template->id,
                'old_values' => $oldData,
                'new_values' => $certificate_template->fresh()->toArray(),
            ]
        );

        return redirect()->route('admin.certificate-templates.show', $certificate_template)
            ->with('success', 'Plantilla actualizada exitosamente.');
    }

    public function destroy(CertificateTemplate $certificate_template): RedirectResponse
    {
        // Check if template has certificates
        if ($certificate_template->certificates()->exists()) {
            return back()->with('error', 'No se puede eliminar una plantilla que tiene certificados emitidos.');
        }

        $templateData = $certificate_template->toArray();
        $certificate_template->delete();

        $this->auditService->log(
            'certificate_template.deleted',
            'certificate_template',
            (string) $templateData['id'],
            [
                'template_id' => $templateData['id'],
                'name' => $templateData['name'],
            ]
        );

        return redirect()->route('admin.certificate-templates.index')
            ->with('success', 'Plantilla eliminada exitosamente.');
    }

    public function duplicate(CertificateTemplate $template): RedirectResponse
    {
        $this->authorize('create', CertificateTemplate::class);

        $newTemplate = $template->replicate();
        $newTemplate->name = $template->name . ' (Copia)';
        $newTemplate->is_default = false;
        $newTemplate->save();

        $this->auditService->log(
            'certificate_template.duplicated',
            'certificate_template',
            (string) $newTemplate->id,
            [
                'original_id' => $template->id,
                'new_id' => $newTemplate->id,
            ]
        );

        return redirect()->route('admin.certificate-templates.edit', $newTemplate)
            ->with('success', 'Plantilla duplicada exitosamente.');
    }
}
