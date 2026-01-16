<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 - Pagina no encontrada</title>
    <style>
        body {
            margin: 0;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background: #ffffff;
            color: #1f2937;
        }
        .wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px;
        }
        .card {
            max-width: 720px;
            width: 100%;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
            text-align: center;
        }
        .logo {
            width: 180px;
            height: auto;
            margin: 0 auto 24px;
            display: block;
        }
        h1 {
            font-size: 32px;
            margin: 0 0 12px;
        }
        p {
            margin: 0 0 24px;
            color: #6b7280;
        }
        .actions {
            display: flex;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .btn {
            display: inline-block;
            padding: 10px 18px;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 600;
            border: 1px solid #16a34a;
            color: #16a34a;
            background: #ffffff;
        }
        .btn-primary {
            background: #16a34a;
            color: #ffffff;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="card">
            <img class="logo" src="{{ asset('greencito-academy.png') }}" alt="Greenex Academy">
            <h1>Pagina no encontrada (404)</h1>
            <p>La pagina que buscas no existe o fue movida.</p>
            <div class="actions">
                <a class="btn-primary btn" href="{{ url('/dashboard') }}">Ir al dashboard</a>
                <a class="btn" href="{{ url('/') }}">Volver al inicio</a>
            </div>
        </div>
    </div>
</body>
</html>
