<?php

namespace Database\Seeders;

use App\Modules\Certificate\Domain\CertificateTemplate;
use Illuminate\Database\Seeder;

class CertificateTemplateSeeder extends Seeder
{
    public function run(): void
    {
        CertificateTemplate::updateOrCreate(
            ['name' => 'Diploma de Aprobación - Greenex Academy'],
            [
                'description'  => 'Plantilla por defecto para diplomas de aprobación de cursos.',
                'content'      => $this->getDiplomaHtml(),
                'orientation'  => 'landscape',
                'size'         => 'A4',
                'is_default'   => true,
                'is_active'    => true,
                'placeholders' => [
                    '{{user_name}}'          => 'Nombre del alumno',
                    '{{course_title}}'       => 'Título del curso',
                    '{{completion_date}}'    => 'Fecha de emisión',
                    '{{certificate_number}}' => 'Número de certificado',
                    '{{score}}'              => 'Calificación obtenida (%)',
                    '{{organization}}'       => 'Nombre de la organización',
                ],
                'styles' => [
                    'border_color' => '#B8860B',
                    'title_color'  => '#1A5632',
                    'background'   => '#FFFDF5',
                ],
            ]
        );
    }

    private function getDiplomaHtml(): string
    {
        return <<<'HTML'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        @page { size: A4 landscape; margin: 0; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; width: 297mm; height: 210mm; background: #FFFDF5; color: #2D2D2D; }
        .diploma { width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; }
        .border-outer { position: absolute; top: 12mm; left: 12mm; right: 12mm; bottom: 12mm; border: 3px solid #B8860B; }
        .border-inner { position: absolute; top: 16mm; left: 16mm; right: 16mm; bottom: 16mm; border: 1px solid #B8860B; }
        .content { text-align: center; z-index: 1; padding: 20mm 30mm; width: 100%; }
        .org-name { font-size: 11pt; letter-spacing: 4px; text-transform: uppercase; color: #5A5A5A; margin-bottom: 6mm; }
        .title { font-size: 28pt; font-weight: bold; color: #1A5632; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 3mm; }
        .divider { width: 60mm; height: 1px; background: #B8860B; margin: 4mm auto; }
        .subtitle { font-size: 11pt; color: #5A5A5A; margin-bottom: 5mm; font-style: italic; }
        .student-name { font-size: 22pt; font-weight: bold; color: #1A1A1A; margin-bottom: 2mm; border-bottom: 2px solid #B8860B; display: inline-block; padding-bottom: 2mm; }
        .course-label { font-size: 10pt; color: #5A5A5A; margin-top: 6mm; margin-bottom: 2mm; text-transform: uppercase; letter-spacing: 2px; }
        .course-title { font-size: 16pt; font-weight: bold; color: #1A5632; margin-bottom: 3mm; }
        .score-label { font-size: 10pt; color: #5A5A5A; margin-top: 4mm; }
        .score { font-size: 14pt; font-weight: bold; color: #B8860B; }
        .footer { position: absolute; bottom: 25mm; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 40mm; }
        .footer-col { text-align: center; min-width: 50mm; }
        .footer-line { width: 45mm; height: 1px; background: #2D2D2D; margin: 0 auto 2mm auto; }
        .footer-label { font-size: 8pt; color: #5A5A5A; }
        .footer-value { font-size: 9pt; font-weight: bold; color: #2D2D2D; }
        .seal { position: absolute; bottom: 30mm; left: 50%; transform: translateX(-50%); width: 28mm; height: 28mm; border: 2px solid #B8860B; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .seal-inner { width: 24mm; height: 24mm; border: 1px solid #B8860B; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .seal-text { font-size: 7pt; text-align: center; color: #B8860B; text-transform: uppercase; letter-spacing: 1px; line-height: 1.4; }
    </style>
</head>
<body>
    <div class="diploma">
        <div class="border-outer"></div>
        <div class="border-inner"></div>
        <div class="content">
            <div class="org-name">{{organization}}</div>
            <div class="title">Diploma de Aprobación</div>
            <div class="divider"></div>
            <div class="subtitle">Se certifica que el alumno:</div>
            <div class="student-name">{{user_name}}</div>
            <div class="course-label">Ha completado satisfactoriamente el curso:</div>
            <div class="course-title">{{course_title}}</div>
            <div class="score-label">Con una calificación del</div>
            <div class="score">{{score}}%</div>
        </div>
        <div class="footer">
            <div class="footer-col">
                <div class="footer-line"></div>
                <div class="footer-label">Fecha de Emisión</div>
                <div class="footer-value">{{completion_date}}</div>
            </div>
            <div class="footer-col">
                <div class="seal"><div class="seal-inner"><div class="seal-text">Greenex<br>Academy</div></div></div>
            </div>
            <div class="footer-col">
                <div class="footer-line"></div>
                <div class="footer-label">No. Certificado</div>
                <div class="footer-value">{{certificate_number}}</div>
            </div>
        </div>
    </div>
</body>
</html>
HTML;
    }
}
