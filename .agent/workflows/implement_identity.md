---
description: Implementación del Módulo de Identidad y Acceso
---

# Workflow: Implement Identity Module (EPIC 1)

Este workflow guía la implementación de la autenticación, roles y permisos.

## 1. Setup Base (Done)
- [x] Modelos: User, Role, Permission en `App\Modules\Identity\Domain`
- [x] Migraciones ejecutadas

## 2. Google SSO (Socialite) (Done)
- [x] Instalar Socialite: `composer require laravel/socialite`
- [x] Configurar `config/services.php` para google.
- [x] Crear `App\Modules\Identity\Http\Controllers\LoginController`
- [x] Crear `App\Modules\Identity\Actions\CreateOrUpdateUserFromGoogle`
- [x] Definir rutas en `App\Modules\Identity\Http\routes.php`.

## 3. Gestión de Roles y Permisos (Done)
- [x] Crear `Database\Seeders\RolesAndPermissionsSeeder`
- [x] Implementar Gates en `App\Providers\AppServiceProvider`

## 4. UI Login (Done)
- [x] Crear `resources/js/Pages/Auth/Login.jsx`: Botón "Sign in with Google".

## 5. Auditoría de Login (Done)
- [x] En `LoginController`, usar `AuditService` para registrar el evento `auth.login`.

## 6. Verificación
// turbo
1. Ejecutar tests o probar flujo manual.
