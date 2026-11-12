<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Acta de Participación - {{ $course->title }}</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 11pt;
            color: #222;
            line-height: 1.4;
            margin: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }
        .org-name {
            font-size: 16pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 0;
        }
        .doc-title {
            font-size: 14pt;
            font-weight: bold;
            margin: 8px 0 2px 0;
            text-transform: uppercase;
        }
        .doc-subtitle {
            font-size: 10pt;
            color: #555;
            margin: 0;
        }
        .course-info {
            margin: 15px 0;
            font-size: 11pt;
        }
        .course-info p {
            margin: 3px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #888;
            padding: 10px 8px;
            text-align: left;
            font-size: 10pt;
        }
        th {
            background: #eef2f7;
            font-weight: bold;
            text-align: center;
        }
        td.sign-cell {
            text-align: center;
            height: 45px;
        }
        .sign-line {
            display: inline-block;
            width: 160px;
            border-bottom: 1px solid #333;
            margin-bottom: 4px;
        }
        .sign-label {
            font-size: 8pt;
            color: #555;
        }
        td.text-center {
            text-align: center;
        }
        .footer {
            margin-top: 40px;
            font-size: 9pt;
            color: #555;
            border-top: 1px solid #ccc;
            padding-top: 15px;
        }
        .footer .signs {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }
        .footer .sign-block {
            width: 45%;
        }
        .page-break {
            page-break-inside: avoid;
        }
        @page {
            margin: 15mm 15mm 20mm 15mm;
        }
    </style>
</head>
<body>
    <div class="header">
        <p class="org-name">{{ $organization }}</p>
        <p class="doc-title">Acta de Participación Presencial</p>
        <p class="doc-subtitle">Lista de asistentes con espacio para firma</p>
    </div>

    <div class="course-info">
        <p><strong>Curso:</strong> {{ $course->title }}</p>
        <p><strong>Fecha del acta:</strong> {{ $date }}</p>
        <p><strong>Total de participantes:</strong> {{ $participants->count() }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 6%; text-align: center;">#</th>
                <th style="width: 30%;">Participante</th>
                <th style="width: 30%;">Correo electrónico</th>
                <th style="width: 18%; text-align: center;">Estado</th>
                <th style="width: 16%;" class="sign-cell">Firma</th>
            </tr>
        </thead>
        <tbody>
            @php $counter = 1; @endphp
            @foreach ($participants as $participant)
                <tr class="page-break">
                    <td class="text-center">{{ $counter++ }}</td>
                    <td>{{ $participant['name'] }}</td>
                    <td>{{ $participant['email'] ?? '—' }}</td>
                    <td class="text-center">
                        @if ($participant['completed'])
                            <span style="font-weight: bold; color: green;">Finalizado</span>
                        @else
                            <span style="color: orange;">Activo</span>
                        @endif
                    </td>
                    <td class="sign-cell">
                        <span class="sign-line"></span><br>
                        <span class="sign-label">Firma del alumno</span>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    @if ($participants->isEmpty())
        <p style="text-align: center; color: #888; margin-top: 40px;">No hay participantes registrados para este curso.</p>
    @endif

    <div class="footer">
        <p><strong>Responsable del acta:</strong> _________________________________</p>
        <p><strong>Cargo:</strong> _________________________________ &nbsp;&nbsp; <strong>Fecha:</strong> {{ $date }}</p>

        <div class="signs">
            <div class="sign-block">
                <span class="sign-line"></span><br>
                <span class="sign-label">Coordinador Académico</span>
            </div>
            <div class="sign-block">
                <span class="sign-line"></span><br>
                <span class="sign-label">Instructor / Responsable del Curso</span>
            </div>
        </div>
    </div>
</body>
</html>
