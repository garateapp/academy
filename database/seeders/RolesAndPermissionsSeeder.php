<?php

namespace Database\Seeders;

use App\Modules\Identity\Domain\Permission;
use App\Modules\Identity\Domain\Role;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Permissions
        $permissions = [
            // Identity Module
          ['key' => 'view-admin', 'name' => 'Ver Panel de Administración', 'description' => 'Acceso al panel de administración', 'module' => 'Identity'],
['key' => 'manage-users', 'name' => 'Gestionar Usuarios', 'description' => 'Crear, editar y eliminar usuarios', 'module' => 'Identity'],
['key' => 'manage-roles', 'name' => 'Gestionar Roles', 'description' => 'Gestionar roles y permisos', 'module' => 'Identity'],
['key' => 'users.view', 'name' => 'Ver Usuarios', 'description' => 'Ver lista y detalles de usuarios', 'module' => 'Identity'],
['key' => 'users.create', 'name' => 'Crear Usuarios', 'description' => 'Crear nuevos usuarios', 'module' => 'Identity'],
['key' => 'users.edit', 'name' => 'Editar Usuarios', 'description' => 'Editar usuarios existentes', 'module' => 'Identity'],
['key' => 'users.delete', 'name' => 'Eliminar Usuarios', 'description' => 'Eliminar usuarios', 'module' => 'Identity'],

// Learning Module - Courses
['key' => 'create-courses', 'name' => 'Crear Cursos', 'description' => 'Crear nuevos cursos', 'module' => 'Learning'],
['key' => 'edit-own-courses', 'name' => 'Editar Cursos Propios', 'description' => 'Editar cursos propios', 'module' => 'Learning'],
['key' => 'edit-any-course', 'name' => 'Editar Cualquier Curso', 'description' => 'Editar cualquier curso', 'module' => 'Learning'],
['key' => 'delete-own-courses', 'name' => 'Eliminar Cursos Propios', 'description' => 'Eliminar cursos propios', 'module' => 'Learning'],
['key' => 'delete-any-course', 'name' => 'Eliminar Cualquier Curso', 'description' => 'Eliminar cualquier curso', 'module' => 'Learning'],
['key' => 'publish-courses', 'name' => 'Publicar Cursos', 'description' => 'Publicar y despublicar cursos', 'module' => 'Learning'],

// Learning Module - Categories
['key' => 'manage-categories', 'name' => 'Gestionar Categorías', 'description' => 'Crear, editar y eliminar categorías de cursos', 'module' => 'Learning'],

// Learning Module - Enrollments
['key' => 'assign-courses', 'name' => 'Asignar Cursos', 'description' => 'Asignar cursos a usuarios', 'module' => 'Learning'],
['key' => 'view-all-enrollments', 'name' => 'Ver Todas las Inscripciones', 'description' => 'Ver todas las inscripciones a cursos', 'module' => 'Learning'],

// Learning Module - Learning Paths
['key' => 'manage-learning-paths', 'name' => 'Gestionar Rutas de Aprendizaje', 'description' => 'Crear, editar y eliminar rutas de aprendizaje', 'module' => 'Learning'],

// Assessment Module
['key' => 'assessments.view', 'name' => 'Ver Evaluaciones', 'description' => 'Ver todas las evaluaciones', 'module' => 'Assessment'],
['key' => 'assessments.create', 'name' => 'Crear Evaluaciones', 'description' => 'Crear nuevas evaluaciones', 'module' => 'Assessment'],
['key' => 'assessments.edit', 'name' => 'Editar Evaluaciones', 'description' => 'Editar evaluaciones existentes', 'module' => 'Assessment'],
['key' => 'assessments.delete', 'name' => 'Eliminar Evaluaciones', 'description' => 'Eliminar evaluaciones', 'module' => 'Assessment'],
['key' => 'assessments.grade', 'name' => 'Calificar Evaluaciones', 'description' => 'Calificar intentos de evaluación de estudiantes', 'module' => 'Assessment'],

// Survey Module
['key' => 'surveys.view', 'name' => 'Ver Encuestas', 'description' => 'Ver encuestas de investigaci▋ de mercado', 'module' => 'Survey'],
['key' => 'surveys.create', 'name' => 'Crear Encuestas', 'description' => 'Crear nuevas encuestas', 'module' => 'Survey'],
['key' => 'surveys.edit', 'name' => 'Editar Encuestas', 'description' => 'Editar encuestas existentes', 'module' => 'Survey'],
['key' => 'surveys.delete', 'name' => 'Eliminar Encuestas', 'description' => 'Eliminar encuestas', 'module' => 'Survey'],
['key' => 'surveys.assign', 'name' => 'Asignar Encuestas', 'description' => 'Asignar encuestas a usuarios', 'module' => 'Survey'],
['key' => 'surveys.export', 'name' => 'Exportar Encuestas', 'description' => 'Exportar resultados de encuestas', 'module' => 'Survey'],
// Audit Module
['key' => 'view-audit-logs', 'name' => 'Ver Registros de Auditoría', 'description' => 'Ver registros de auditoría del sistema', 'module' => 'Audit'],
['key' => 'export-audit-logs', 'name' => 'Exportar Registros de Auditoría', 'description' => 'Exportar registros de auditoría', 'module' => 'Audit'],

// Certificate Module
['key' => 'issue-certificates', 'name' => 'Emitir Certificados', 'description' => 'Emitir certificados manualmente', 'module' => 'Certificate'],
['key' => 'manage-certificate-templates', 'name' => 'Gestionar Plantillas de Certificados', 'description' => 'Gestionar plantillas de certificados', 'module' => 'Certificate'],
['key' => 'certificate-templates.view', 'name' => 'Ver Plantillas de Certificados', 'description' => 'Ver plantillas de certificados', 'module' => 'Certificate'],
['key' => 'certificate-templates.show', 'name' => 'Mostrar Plantillas de Certificados', 'description' => 'Ver detalles de la plantilla de certificado', 'module' => 'Certificate'],
['key' => 'certificate-templates.create', 'name' => 'Crear Plantillas de Certificados', 'description' => 'Crear plantillas de certificados', 'module' => 'Certificate'],
['key' => 'certificate-templates.edit', 'name' => 'Editar Plantillas de Certificados', 'description' => 'Editar plantillas de certificados', 'module' => 'Certificate'],
['key' => 'certificate-templates.delete', 'name' => 'Eliminar Plantillas de Certificados', 'description' => 'Eliminar plantillas de certificados', 'module' => 'Certificate'],

// Reporting Module
['key' => 'view-reports', 'name' => 'Ver Reportes', 'description' => 'Ver reportes globales del sistema', 'module' => 'Reporting'],
['key' => 'export-reports', 'name' => 'Exportar Reportes', 'description' => 'Exportar reportes del sistema', 'module' => 'Reporting'],
        ];

        foreach ($permissions as $permData) {
            Permission::updateOrCreate(
                ['key' => $permData['key']],
                $permData
            );
        }

        // 2. Create Roles
        // $roles = [
        //     [
        //         'name' => 'SuperAdmin',
        //         'slug' => 'super-admin',
        //         'description' => 'Super Administrator with full system access',
        //         'is_system' => true,
        //         'permissions' => array_column($permissions, 'key'), // All permissions
        //     ],
        //     [
        //         'name' => 'Admin',
        //         'slug' => 'admin',
        //         'description' => 'Administrator with access to most features',
        //         'is_system' => true,
        //         'permissions' => [
        //             'view-admin',
        //             'manage-users',
        //             'users.view',
        //             'users.create',
        //             'users.edit',
        //             'users.delete',
        //             'create-courses',
        //             'edit-any-course',
        //             'delete-any-course',
        //             'publish-courses',
        //             'manage-categories',
        //             'assign-courses',
        //             'view-all-enrollments',
        //             'manage-learning-paths',
        //             'manage-certificate-templates',
        //             'certificate-templates.view',
        //             'certificate-templates.create',
        //             'certificate-templates.edit',
        //             'certificate-templates.delete',
        //             'view-reports',
        //             'export-reports',
        //         ],
        //     ],
        //     [
        //         'name' => 'Instructor',
        //         'slug' => 'instructor',
        //         'description' => 'Instructor who can create and manage their own courses',
        //         'is_system' => true,
        //         'permissions' => [
        //             'view-admin',
        //             'create-courses',
        //             'edit-own-courses',
        //             'delete-own-courses',
        //             'view-reports',
        //         ],
        //     ],
        //     [
        //         'name' => 'Manager',
        //         'slug' => 'manager',
        //         'description' => 'Manager with access to reports and analytics',
        //         'is_system' => true,
        //         'permissions' => [
        //             'view-admin',
        //             'view-reports',
        //             'export-reports',
        //             'view-all-enrollments',
        //         ],
        //     ],
        //     [
        //         'name' => 'Auditor',
        //         'slug' => 'auditor',
        //         'description' => 'Auditor with read-only access to audit logs',
        //         'is_system' => true,
        //         'permissions' => [
        //             'view-admin',
        //             'view-audit-logs',
        //             'export-audit-logs',
        //         ],
        //     ],
        //     [
        //         'name' => 'Learner',
        //         'slug' => 'learner',
        //         'description' => 'Learner with access to assigned courses only',
        //         'is_system' => true,
        //         'permissions' => [], // No special permissions, just learning interface
        //     ],
        // ];

        // foreach ($roles as $roleData) {
        //     $rolePermissions = $roleData['permissions'];
        //     unset($roleData['permissions']);

        //     $role = Role::updateOrCreate(
        //         ['slug' => $roleData['slug']],
        //         $roleData
        //     );

        //     // Sync permissions
        //     $permissionIds = Permission::whereIn('key', $rolePermissions)->pluck('id');
        //     $role->permissions()->sync($permissionIds);
        // }
    }
}



