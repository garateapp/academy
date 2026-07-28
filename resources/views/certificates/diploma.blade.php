<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Diploma - {{ $certificate->certificate_number }}</title>
    <style>
        @page {
            size: A4 landscape;
            margin: 0;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            width: 297mm;
            height: 210mm;
            background: #FFFDF5;
            color: #2D2D2D;
        }

        .diploma {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .border-outer {
            position: absolute;
            top: 12mm;
            left: 12mm;
            right: 12mm;
            bottom: 12mm;
            border: 3px solid #B8860B;
            border-radius: 2px;
        }

        .border-inner {
            position: absolute;
            top: 16mm;
            left: 16mm;
            right: 16mm;
            bottom: 16mm;
            border: 1px solid #B8860B;
            border-radius: 2px;
        }

        .corner {
            position: absolute;
            width: 20mm;
            height: 20mm;
            border-color: #B8860B;
            border-style: solid;
        }

        .corner-tl { top: 14mm; left: 14mm; border-width: 2px 0 0 2px; }
        .corner-tr { top: 14mm; right: 14mm; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: 14mm; left: 14mm; border-width: 0 0 2px 2px; }
        .corner-br { bottom: 14mm; right: 14mm; border-width: 0 2px 2px 0; }

        .content {
            position: absolute;
            top: 23mm;
            right: 30mm;
            left: 30mm;
            text-align: center;
            z-index: 1;
        }

        .logo-wrap {
            width: 100%;
            margin-bottom: 3mm;
            text-align: center;
        }

        .logo {
            display: inline-block;
            width: 25mm;
            height: 25mm;
            object-fit: contain;
        }

        .org-name {
            font-size: 9pt;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #5A5A5A;
            margin-bottom: 4mm;
        }

        .title {
            font-size: 26pt;
            font-weight: bold;
            color: #1A5632;
            letter-spacing: 3px;
            text-transform: uppercase;
        }

        .divider {
            width: 60mm;
            height: 1px;
            background: #B8860B;
            margin: 3mm auto;
        }

        .subtitle {
            font-size: 11pt;
            color: #5A5A5A;
            margin-bottom: 4mm;
            font-style: italic;
        }

        .student-name {
            font-size: 21pt;
            font-weight: bold;
            color: #1A1A1A;
            border-bottom: 2px solid #B8860B;
            display: inline-block;
            padding: 0 8mm 2mm;
            min-width: 120mm;
            text-align: center;
        }

        .course-label {
            font-size: 10pt;
            color: #5A5A5A;
            margin-top: 4mm;
            margin-bottom: 2mm;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .course-title {
            font-size: 16pt;
            font-weight: bold;
            color: #1A5632;
            margin-bottom: 3mm;
            max-width: 180mm;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
        }

        .score-label {
            font-size: 10pt;
            color: #5A5A5A;
            margin-top: 4mm;
        }

        .score {
            font-size: 14pt;
            font-weight: bold;
            color: #B8860B;
        }

        .footer {
            position: absolute;
            right: 40mm;
            bottom: 24mm;
            left: 40mm;
            height: 28mm;
        }

        .footer-col {
            position: absolute;
            bottom: 0;
            width: 55mm;
            text-align: center;
        }

        .footer-date {
            left: 0;
        }

        .footer-seal {
            left: 50%;
            width: 28mm;
            margin-left: -14mm;
        }

        .footer-number {
            right: 0;
        }

        .footer-line {
            width: 45mm;
            height: 1px;
            background: #2D2D2D;
            margin: 0 auto 2mm auto;
        }

        .footer-label {
            font-size: 8pt;
            color: #5A5A5A;
        }

        .footer-value {
            font-size: 9pt;
            font-weight: bold;
            color: #2D2D2D;
        }

        .seal {
            display: inline-block;
            width: 28mm;
            height: 28mm;
            object-fit: contain;
        }
    </style>
</head>
<body>
    <div class="diploma">
        <div class="border-outer"></div>
        <div class="border-inner"></div>
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>

        <div class="content">
            @if($logoDataUri)
            <div class="logo-wrap">
                <img class="logo" src="{{ $logoDataUri }}" alt="Gárate">
            </div>
            @endif

            <div class="org-name">{{ $organization }}</div>

            <div class="title">Diploma de Aprobación</div>

            <div class="divider"></div>

            <div class="subtitle">Se certifica que el alumno:</div>

            <div class="student-name">{{ $userName }}</div>

            <div class="course-label">Ha completado satisfactoriamente el curso:</div>

            <div class="course-title">{{ $courseTitle }}</div>

            @if($score !== null)
            <div class="score-label">Con una calificación del</div>
            <div class="score">{{ $score }}%</div>
            @endif
        </div>

        <div class="footer">
            <div class="footer-col footer-date">
                <div class="footer-line"></div>
                <div class="footer-label">Fecha de Emisión</div>
                <div class="footer-value">{{ $issuedDate }}</div>
            </div>

            <div class="footer-col footer-seal">
                @if($sealDataUri)
                <img class="seal" src="{{ $sealDataUri }}" alt="Sello Gárate Academy">
                @endif
            </div>

            <div class="footer-col footer-number">
                <div class="footer-line"></div>
                <div class="footer-label">No. Certificado</div>
                <div class="footer-value">{{ $certificateNumber }}</div>
            </div>
        </div>
    </div>
</body>
</html>
