<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitacion a encuesta</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7f5;font-family:Arial, sans-serif;color:#1f2933;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f7f5;padding:24px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(20, 83, 45, 0.12);">
                    <tr>
                        <td style="padding:24px 32px;background:linear-gradient(135deg,#0f766e,#22c55e);color:#ffffff;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <img src="{{ asset('logo-academy.png') }}" alt="Greenex Academy" style="height:48px;display:block;">
                                    </td>
                                    <td align="right">
                                        <span style="font-size:16px;font-weight:600;">Encuesta de mercado</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px;">
                            <h1 style="margin:0 0 12px;font-size:24px;color:#0f172a;">Te invitamos a participar</h1>
                            <p style="margin:0 0 16px;color:#475569;line-height:1.6;">
                                Hola, tienes una nueva encuesta asignada en Greenex Academy. Tu opinion nos ayuda a mejorar la experiencia.
                            </p>
                            <div style="background-color:#f1f5f9;border-radius:12px;padding:16px;margin-bottom:20px;">
                                <p style="margin:0 0 6px;font-weight:600;">{{ $survey->title }}</p>
                                @if($survey->description)
                                    <p style="margin:0;color:#64748b;">{{ $survey->description }}</p>
                                @endif
                                @if($survey->expires_at)
                                    <p style="margin:12px 0 0;color:#0f172a;font-weight:600;">
                                        Fecha limite: {{ $survey->expires_at->format('d/m/Y H:i') }}
                                    </p>
                                @endif
                            </div>
                            <table role="presentation" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="border-radius:999px;background-color:#f97316;">
                                        <a href="{{ $url }}" style="display:inline-block;padding:12px 28px;color:#ffffff;text-decoration:none;font-weight:700;">
                                            Responder encuesta
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin:20px 0 0;color:#94a3b8;font-size:13px;">
                                Si el boton no funciona, copia y pega este enlace en tu navegador:<br>
                                <a href="{{ $url }}" style="color:#0f766e;">{{ $url }}</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0 32px 32px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8fafc;border-radius:16px;">
                                <tr>
                                    <td style="padding:20px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td width="72">
                                                    <img src="{{ asset('greeny-encuestador.png') }}" alt="Greeny encuestador" style="width:64px;height:64px;display:block;">
                                                </td>
                                                <td style="padding-left:16px;">
                                                    <p style="margin:0;font-weight:600;color:#0f172a;">Greeny esta listo para escucharte</p>
                                                    <p style="margin:4px 0 0;color:#64748b;font-size:14px;">
                                                        Gracias por tu tiempo. Tu respuesta es valiosa para nuestro equipo.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:20px 32px;background-color:#0f172a;color:#e2e8f0;font-size:12px;">
                            Greenex Academy  Este correo fue enviado automaticamente, por favor no responder.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

