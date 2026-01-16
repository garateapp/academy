# gemini.md — Greenex Academy (LMS) Coding Agent Guide

## Objetivo
Construir **Greenex Academy**, un LMS interno **mantenible, modular y auditable**, usando:

- Backend: Laravel 12+
- Frontend: React + Inertia.js
- DB: MySQL 8
- UI: Tailwind CSS + daisyUI
- Auth: Google Workspace SSO (OAuth2)

El foco es entregar un MVP usable y seguro, y evolucionar por módulos sin deuda técnica.

---

## Principios no negociables
1. **Monolito modular:** código organizado por módulos en `app/Modules/*`.
2. **Acciones delgadas / lógica en Application:** Controllers solo orquestan.
3. **Auditoría:** registrar acciones críticas con actor, entidad, payload, IP y UA.
4. **Seguridad:** validation + authorization siempre (FormRequest + Policies).
5. **Evolución sin romper:** versionado de cursos y migraciones cuidadas.
6. **Performance:** paginación, evitar N+1, índices, queries explícitas.

---

## Alcance Funcional Completo

### 3.1 Gestión del Aprendizaje (Learner Experience)
- **Portal personalizado por usuario**
  - Dashboard con cursos asignados, recomendados y en progreso
  - Recomendaciones basadas en rol, competencias y progreso
- **Catálogo de cursos**
  - Búsqueda avanzada (filtros por categoría, competencia, duración, tipo)
  - Vista de tarjetas con información clave
- **Consumo multiplataforma**
  - Diseño mobile-first responsive
  - Compatibilidad desktop y dispositivos móviles
- **Microlearning y rutas de aprendizaje**
  - Cursos modulares cortos
  - Rutas configurables por administrador
  - Secuencias de cursos con prerrequisitos
- **Seguimiento de progreso**
  - Barra de progreso por curso y módulo
  - Historial de actividad
  - Certificaciones obtenidas
- **Aprendizaje social**
  - Foros por curso (opcional)
  - Comentarios y discusiones
  - Compartir logros
- **Gamificación**
  - Sistema de puntos por actividad
  - Insignias y logros configurables
  - Tabla de posiciones (opcional)

### 3.2 Gestión Administrativa y Académica
- **Gestión de usuarios**
  - CRUD usuarios con SSO Google
  - Roles y permisos granulares
  - Grupos dinámicos (por área, puesto, competencia)
  - Importación masiva (CSV/Excel)
- **Asignación automática**
  - Reglas de asignación por rol/área/grupo
  - Asignación manual individual o masiva
  - Fechas de vencimiento
  - Recordatorios automáticos
- **Creación y gestión de contenido**
  - Editor de cursos modular
  - Tipos de módulo: texto, video, archivo, SCORM, enlace externo
  - Versionado de cursos (mantener histórico)
  - Clonación de cursos
- **Ciclo de vida del contenido**
  - Estados: draft, active, obsolete, archived
  - Fechas de vigencia y expiración
  - Notificaciones de contenido próximo a expirar
- **Evaluaciones**
  - Teóricas: opción múltiple, verdadero/falso, respuesta corta
  - Prácticas: carga de archivos, evidencias
  - Banco de preguntas reutilizable
  - Configuración: intentos, tiempo, aprobación mínima
- **Certificados**
  - Plantillas configurables
  - Generación automática al aprobar
  - Firma digital / QR de validación
  - Descarga PDF auditada
- **Paneles y reportes**
  - Dashboard ejecutivo
  - Reportes por usuario, curso, área, competencia
  - Exportación Excel/PDF
  - Métricas: tasa de finalización, tiempo promedio, aprobación

### 3.3 Gestión de Competencias
- **Catálogo de competencias**
  - CRUD competencias corporativas
  - Clasificación por tipo (técnica, transversal, liderazgo)
  - Niveles (básico, intermedio, avanzado, experto)
- **Asociación curso → competencia**
  - Vincular múltiples competencias a un curso
  - Definir nivel que otorga cada curso
- **Evaluación de brechas**
  - Evaluación diagnóstica (pre-capacitación)
  - Evaluación final (post-capacitación)
  - Matriz de competencias vs personas
- **Visualización**
  - Dashboard de brechas por persona
  - Dashboard de brechas por rol/área
  - Recomendaciones de cursos para cerrar brechas

### 3.4 Automatización y Cumplimiento
- **Motor de reglas**
  - Asignación automática por condiciones
  - Notificaciones disparadas por eventos
  - Re-certificaciones periódicas
  - Escalamiento por incumplimiento
- **Notificaciones inteligentes**
  - Email y/o in-app
  - Recordatorios programados
  - Alertas de vencimiento
  - Resumen semanal/mensual
- **Auditoría completa**
  - Log de todas las acciones críticas
  - Trazabilidad de cambios
  - Registro de accesos a certificados
  - Exportación para cumplimiento normativo
- **Evidencias descargables**
  - Reporte de capacitación individual
  - Constancia de finalización
  - Certificados históricos

---

## Principio fundamental: TODO CONFIGURABLE VÍA MANTENEDORES
**El administrador NO debe tocar código para configurar el sistema.**

Cada funcionalidad debe tener su interfaz de administración:
- Roles y permisos
- Competencias y niveles
- Categorías de cursos
- Plantillas de certificados
- Reglas de asignación automática
- Configuración de gamificación (puntos, insignias)
- Plantillas de notificaciones
- Parámetros del sistema (límites, umbrales)

---

## Alcance MVP (prioridad)
### Sprint 1 (Fundación)
- SSO Google
- Mantenedor de roles y permisos
- CRUD cursos + módulos (texto/video/archivo)
- Asignación manual simple
- Progreso + finalización

### Sprint 2 (Validación)
- Evaluaciones básicas
- Certificados PDF con plantilla configurable
- Auditoría base completa
- Mantenedor de competencias

### Sprint 3 (Gobierno y escala)
- Versionado cursos
- Asociación curso->competencia
- Asignación automática por reglas
- Dashboard inicial
- Gamificación básica

### Sprint 4 (Aprendizaje social y avanzado)
- Rutas de aprendizaje
- Foros y comentarios
- Búsqueda avanzada
- Reportes exportables

### Sprint 5 (Automatización)
- Motor de reglas completo
- Notificaciones inteligentes
- Re-certificaciones
- Dashboard de brechas de competencias

---

## Estructura del repositorio
app/
Modules/
Identity/                    # Autenticación, usuarios, roles, permisos
Domain/
Application/
Infrastructure/
Http/
Learning/                    # Cursos, rutas, módulos, inscripciones
Domain/
Application/
Infrastructure/
Http/
Assessment/                  # Evaluaciones, preguntas, intentos
Domain/
Application/
Infrastructure/
Http/
Competency/                  # Competencias, niveles, brechas
Domain/
Application/
Infrastructure/
Http/
Gamification/               # Puntos, insignias, logros
Domain/
Application/
Infrastructure/
Http/
Social/                     # Foros, comentarios, interacción
Domain/
Application/
Infrastructure/
Http/
Automation/                 # Reglas, notificaciones, motor
Domain/
Application/
Infrastructure/
Http/
Certificate/                # Plantillas, emisión, verificación
Domain/
Application/
Infrastructure/
Http/
Reporting/                  # Dashboards, reportes, analytics
Domain/
Application/
Infrastructure/
Http/
Audit/                      # Logs de auditoría
Domain/
Application/
Infrastructure/
Http/
Shared/                     # Código compartido
Domain/
Support/
Http/
database/
migrations/
2024_01_xx_identity/
2024_02_xx_learning/
2024_03_xx_assessments/
2024_04_xx_competencies/
2024_05_xx_gamification/
2024_06_xx_social/
2024_07_xx_automation/
2024_08_xx_certificates/
seeders/
factories/
resources/
js/
Pages/
Admin/              # Vistas de administración (mantenedores)
Learner/            # Vistas del estudiante
Shared/             # Vistas compartidas
Components/
Admin/              # Componentes del admin
Learner/            # Componentes del estudiante
Shared/             # Componentes compartidos
Layouts/
lib/
routes/
web.php
api.php
modules/            # Routes por módulo (opcional)

### Reglas de capas
- **Domain:** entidades, value objects, reglas puras (sin Eloquent).
- **Application:** casos de uso (Actions/Services), DTOs, orquestación.
- **Infrastructure:** repositorios Eloquent, integraciones externas.
- **Http:** Controllers, FormRequests, Policies, routes del módulo.

No mezclar Eloquent/DB dentro de Domain.

---

## Convenciones Backend (Laravel)
- Controllers delgados: `authorize()` + Action.
- Validación: **FormRequest** siempre.
- Autorización: **Policies** por entidad + Gates puntuales.
- Persistencia: Repositorios (interfaces en Domain/App, implementación Eloquent en Infrastructure).
- Eventos: opcional para desacoplar (ej: `CourseCompleted`).

---

## Convenciones Frontend (React + Inertia)
- Páginas en `resources/js/Pages`
- Componentes en `resources/js/Components`
- Errores: usar los errores que retorna Laravel, no duplicar validación compleja.
- UI: daisyUI (componentes) + Tailwind (layout)

---

## Dominio: Modelo de Datos Completo

### Identity (Identidad y Acceso)
- **users** (id, name, email, google_id, avatar, area, position, role_id, status, last_login_at, created_at, updated_at)
- **roles** (id, name, slug, description, is_system, created_at, updated_at)
- **permissions** (id, key, name, description, module, created_at, updated_at)
- **role_permission** (role_id, permission_id)
- **user_groups** (id, name, description, type, rules_json, created_at, updated_at)
- **user_group_members** (user_id, group_id, added_at)

### Learning (Aprendizaje)
- **categories** (id, name, slug, description, parent_id, icon, sort_order, created_at, updated_at)
- **courses** (id, category_id, title, slug, description, cover_image, duration_minutes, difficulty, version, status, valid_from, valid_until, created_by, updated_by, published_at, created_at, updated_at)
- **course_modules** (id, course_id, type, title, description, content, asset_path, asset_type, duration_minutes, is_required, sort_order, config_json, created_at, updated_at)
  - type: text, video, file, scorm, link, assessment
- **course_prerequisites** (course_id, prerequisite_course_id)
- **learning_paths** (id, name, description, cover_image, status, created_by, created_at, updated_at)
- **learning_path_items** (id, learning_path_id, course_id, sort_order, is_required)
- **enrollments** (id, user_id, course_id, learning_path_id, assigned_by, assigned_via, due_at, started_at, completed_at, status, score, attempts, created_at, updated_at)
  - status: pending, in_progress, completed, failed, expired
  - assigned_via: manual, automatic, self_enrollment
- **module_completions** (id, user_id, enrollment_id, module_id, completed_at, time_spent_seconds, score)
- **user_activity_log** (id, user_id, enrollment_id, module_id, action, metadata_json, created_at)
  - action: started, paused, resumed, completed, downloaded

### Assessments (Evaluaciones)
- **question_banks** (id, name, description, created_by, created_at, updated_at)
- **questions** (id, bank_id, type, question_text, options_json, correct_answer_json, points, explanation, created_at, updated_at)
  - type: multiple_choice, true_false, short_answer, file_upload
- **assessments** (id, course_id, module_id, title, description, type, passing_score, max_attempts, time_limit_minutes, randomize_questions, show_correct_answers, config_json, created_at, updated_at)
  - type: diagnostic, formative, summative, practical
- **assessment_questions** (assessment_id, question_id, sort_order, points)
- **assessment_attempts** (id, user_id, assessment_id, enrollment_id, started_at, submitted_at, score, passed, answers_json, graded_by, graded_at, feedback, created_at, updated_at)

### Certificates (Certificados)
- **certificate_templates** (id, name, html_template, variables_json, is_default, created_by, created_at, updated_at)
- **certificates** (id, user_id, course_id, enrollment_id, template_id, certificate_number, issued_at, valid_until, verification_code, file_path, metadata_json, created_at)
- **certificate_downloads** (id, certificate_id, user_id, downloaded_at, ip_address)

### Competencies (Competencias)
- **competencies** (id, name, description, type, status, created_at, updated_at)
  - type: technical, soft_skill, leadership
- **competency_levels** (id, competency_id, level, name, description, sort_order)
  - level: 1=básico, 2=intermedio, 3=avanzado, 4=experto
- **course_competencies** (course_id, competency_id, level_id)
- **user_competencies** (id, user_id, competency_id, current_level_id, target_level_id, assessed_at, assessed_by, notes)
- **competency_assessments** (id, user_id, competency_id, assessment_type, score, level_achieved_id, assessed_at, assessed_by, notes, created_at, updated_at)
  - assessment_type: diagnostic, post_training, manager_evaluation

### Gamification (Gamificación)
- **points_config** (id, action, points, description, is_active, created_at, updated_at)
  - action: complete_module, complete_course, pass_assessment, first_login, streak_7_days, etc.
- **user_points** (id, user_id, points, level, rank, created_at, updated_at)
- **points_history** (id, user_id, action, points_earned, reference_type, reference_id, created_at)
- **badges** (id, name, description, icon, criteria_json, points_reward, is_active, created_at, updated_at)
- **user_badges** (id, user_id, badge_id, earned_at, metadata_json)
- **achievements** (id, name, description, icon, criteria_json, is_active, created_at, updated_at)
- **user_achievements** (user_id, achievement_id, progress, completed_at, metadata_json)

### Social Learning (Aprendizaje Social)
- **forums** (id, course_id, name, description, is_active, created_at, updated_at)
- **forum_threads** (id, forum_id, user_id, title, is_pinned, is_locked, created_at, updated_at)
- **forum_posts** (id, thread_id, user_id, parent_id, content, likes_count, created_at, updated_at)
- **forum_post_likes** (user_id, post_id, created_at)
- **course_comments** (id, course_id, module_id, user_id, parent_id, content, is_approved, created_at, updated_at)

### Automation (Automatización)
- **automation_rules** (id, name, description, event_trigger, conditions_json, actions_json, is_active, priority, created_by, created_at, updated_at)
  - event_trigger: user_enrolled, course_completed, deadline_approaching, user_joined_group, etc.
  - actions_json: [{"type": "send_email", "template_id": 1}, {"type": "assign_course", "course_id": 5}]
- **automation_logs** (id, rule_id, entity_type, entity_id, executed_at, success, result_json)
- **notification_templates** (id, name, type, subject, body_html, body_text, variables_json, is_active, created_at, updated_at)
  - type: email, in_app, both
- **notifications** (id, user_id, type, title, message, action_url, read_at, created_at)
- **notification_preferences** (user_id, channel, event_type, is_enabled)

### System Configuration (Configuración del Sistema)
- **system_settings** (key, value, type, group, description, is_public, updated_at)
  - group: general, learning, gamification, notifications, certificates
  - type: string, integer, boolean, json

### Audit (Auditoría)
- **audit_logs** (id, actor_user_id, action, entity_type, entity_id, old_values_json, new_values_json, ip_address, user_agent, created_at)
  - action: created, updated, deleted, published, assigned, completed, downloaded, etc.

---

## Reglas de negocio mínimas
- `Course.status`: draft | active | obsolete
- Learner ve:
  - cursos activos asignados
  - su progreso
- Progreso:
  - se actualiza por módulo completado
  - al 100% -> completed y evento auditable
- Auditoría obligatoria:
  - login, CRUD curso, publish/unpublish, assign, complete, certificate issued

---

## Seguridad
- CSRF en web
- Rate limiting endpoints sensibles
- Sanitización si se permite HTML (ideal: solo markdown + renderer seguro)
- Uploads: validar MIME/size y almacenar fuera de public

---

## Observabilidad mínima
- Logs estructurados de error
- Auditoría para acciones de negocio críticas

---

## Testing (mínimo)
- Feature tests:
  - permisos admin vs learner
  - crear/publicar curso
  - asignación
  - completar curso
- Unit tests para reglas de dominio

---

## Definición de Done
Una historia está lista si:
- End-to-end (UI + backend)
- Validación y autorización
- Auditoría si corresponde
- Tests (feature mínimo)
- Sin N+1 obvio
- Migraciones + seeds coherentes

---

## Mantenedores del Sistema (Interfaces de Administración)

### Módulo Identity
1. **Usuarios**
   - Listado con búsqueda y filtros (rol, área, estado)
   - Crear/editar usuario (si no existe en Google)
   - Asignar rol
   - Activar/desactivar usuario
   - Ver historial de actividad
   - Importación masiva CSV

2. **Roles**
   - CRUD completo
   - Asignación de permisos
   - Marcar como rol del sistema (no editable)
   - Clonar rol

3. **Permisos**
   - Listado por módulo
   - Crear/editar/eliminar
   - Agrupación visual por módulo

4. **Grupos de Usuarios**
   - CRUD grupos
   - Configurar reglas dinámicas (JSON)
   - Asignación manual de miembros
   - Vista de miembros actuales

### Módulo Learning
5. **Categorías de Cursos**
   - CRUD categorías
   - Jerarquía (categorías padre/hijo)
   - Ordenamiento drag & drop
   - Iconos personalizables

6. **Cursos**
   - CRUD completo
   - Editor de módulos (añadir/editar/reordenar)
   - Configurar prerrequisitos
   - Asociar competencias
   - Versionado (crear nueva versión)
   - Clonar curso
   - Publicar/despublicar
   - Previsualización

7. **Rutas de Aprendizaje**
   - CRUD rutas
   - Agregar/reordenar cursos
   - Marcar cursos como obligatorios/opcionales
   - Publicar/despublicar

8. **Asignaciones**
   - Asignación manual individual
   - Asignación masiva (por grupo, rol, área)
   - Configurar fechas de vencimiento
   - Ver estado de asignaciones
   - Remover asignaciones

### Módulo Assessment
9. **Bancos de Preguntas**
   - CRUD bancos
   - Importar/exportar preguntas

10. **Preguntas**
    - CRUD preguntas
    - Editor por tipo (opción múltiple, V/F, etc.)
    - Agregar explicaciones
    - Asignar puntos
    - Categorizar/etiquetar

11. **Evaluaciones**
    - Asociar a curso/módulo
    - Seleccionar preguntas del banco
    - Configurar parámetros (intentos, tiempo, aleatorización)
    - Previsualización

### Módulo Competency
12. **Competencias**
    - CRUD competencias
    - Definir tipo (técnica, transversal, liderazgo)
    - Estados (activa, obsoleta)

13. **Niveles de Competencia**
    - Definir niveles para cada competencia
    - Configurar criterios de evaluación

14. **Evaluación de Competencias**
    - Registrar evaluación diagnóstica
    - Registrar evaluación post-capacitación
    - Asignar nivel actual a usuarios
    - Ver matriz de competencias

### Módulo Gamification
15. **Configuración de Puntos**
    - CRUD acciones que otorgan puntos
    - Definir puntajes por acción
    - Activar/desactivar acciones

16. **Insignias**
    - CRUD insignias
    - Definir criterios (JSON)
    - Subir iconos
    - Asignar puntos de recompensa

17. **Logros**
    - CRUD logros
    - Definir criterios de progreso
    - Activar/desactivar

### Módulo Certificate
18. **Plantillas de Certificados**
    - CRUD plantillas HTML
    - Editor visual (opcional)
    - Variables disponibles {{nombre}}, {{curso}}, {{fecha}}, etc.
    - Previsualización con datos de ejemplo
    - Marcar como predeterminada

19. **Certificados Emitidos**
    - Listado con búsqueda
    - Ver/descargar PDF
    - Re-emitir certificado
    - Verificar código

### Módulo Automation
20. **Reglas de Automatización**
    - CRUD reglas
    - Configurar disparador (evento)
    - Configurar condiciones (JSON o UI)
    - Configurar acciones (JSON o UI)
    - Activar/desactivar
    - Ver log de ejecuciones

21. **Plantillas de Notificaciones**
    - CRUD plantillas
    - Editor HTML/texto
    - Variables dinámicas
    - Previsualización

22. **Notificaciones Enviadas**
    - Historial de notificaciones
    - Estado (enviado, fallido)
    - Reenviar notificación

### Módulo Reporting
23. **Dashboard Ejecutivo**
    - Métricas clave (usuarios activos, cursos completados, tasa de aprobación)
    - Gráficos de tendencias
    - Filtros por fecha, área, rol

24. **Reportes**
    - Reporte de usuarios
    - Reporte de cursos
    - Reporte de competencias
    - Reporte de certificaciones
    - Exportar a Excel/PDF
    - Programar reportes automáticos

### Módulo Audit
25. **Logs de Auditoría**
    - Listado completo con filtros (fecha, usuario, acción, entidad)
    - Ver detalles de cambios (diff)
    - Exportar logs

### Módulo System
26. **Configuración del Sistema**
    - Parámetros generales (nombre, logo, colores)
    - Límites y umbrales (intentos máximos, tiempo de sesión)
    - Configuración de email
    - Configuración de SSO
    - Políticas de retención de datos

---

## Backlog inmediato (orden de implementación)
1. Identity: SSO Google + mantenedor roles/permisos + usuarios
2. Audit: middleware + mantenedor logs
3. Learning: mantenedor categorías + cursos + módulos + catálogo básico
4. Learning: asignación manual + progreso
5. Assessment: bancos de preguntas + evaluaciones básicas
6. Certificate: plantillas + emisión automática
7. Competency: mantenedor competencias + asociación a cursos
8. Gamification: configuración puntos + insignias básicas
9. Automation: reglas simples + plantillas de notificaciones
10. Reporting: dashboard básico + exportación

---

## Estado Actual de Implementación

### ✅ Completado

#### Módulo Identity
- **Modelos**: User, Role, Permission
- **Migraciones**: roles, permissions, role_permission (pivot), campos adicionales en users (area, role_id, status)
- **Seeders**: RolesAndPermissionsSeeder con 6 roles predefinidos
  - SuperAdmin (todos los permisos)
  - Admin (gestión de usuarios, cursos, reportes)
  - Instructor (crear/editar propios cursos)
  - Manager (ver reportes)
  - Auditor (ver logs)
  - Learner (solo interfaz de aprendizaje)
- **Permisos definidos**: view-admin, manage-users, manage-roles, create-courses, edit-own-courses, edit-any-course, delete-own-courses, delete-any-course, publish-courses, view-audit-logs, issue-certificates, view-reports
- **Autenticación**: Laravel Fortify configurado
- **Frontend**: Páginas de Login, Register, ForgotPassword, ResetPassword, TwoFactorChallenge, VerifyEmail

#### Módulo Learning
- **Modelos**: Course, CourseModule, Enrollment, Progress
- **Migraciones**: courses, course_modules, enrollments, progress
- **Controller**: CourseController completo con CRUD
- **Routes**: Resource routes + publish/unpublish
- **Policies**: CoursePolicy implementado
- **Requests**: StoreCourseRequest, UpdateCourseRequest
- **Frontend**: Páginas index, create, edit, show para cursos
- **Campos en Course**: title, description, version, status, expires_at, created_by
- **Campos en CourseModule**: type (text, video, file), title, content, asset_path, sort_order
- **Campos en Enrollment**: user_id, course_id, assigned_by, due_at, status
- **Campos en Progress**: user_id, course_id, percent, status, last_activity_at

#### Módulo Audit
- **Modelos**: AuditLog
- **Migraciones**: audit_logs
- **Service**: AuditService con método log()
- **Middleware**: AuditLogMiddleware
- **Routes**: routes.php creado
- **Integración**: CourseController usa AuditService para registrar todas las acciones (created, updated, deleted, published, unpublished)

#### Infraestructura
- Laravel 12 instalado
- React + Inertia.js configurado
- Tailwind CSS + daisyUI (components.json presente)
- Laravel Pint (pint.json)
- PHPStan (phpstan.neon + baseline)
- Laravel Fortify
- Laravel Socialite
- TypeScript configurado

### ❌ Pendiente de Implementación

#### Módulo Identity
- **SSO Google OAuth2**: Configuración e integración completa
- **Mantenedores**:
  - CRUD Usuarios (interfaz admin)
  - CRUD Roles (interfaz admin)
  - CRUD Permisos (interfaz admin)
  - CRUD Grupos dinámicos
  - Importación masiva CSV
- **Relaciones faltantes**: User -> Role, Role -> Permissions
- **Campos adicionales en User**: google_id, avatar, position, last_login_at

#### Módulo Learning
- **Mantenedores**:
  - CRUD Categorías de cursos
  - Editor de módulos mejorado (drag & drop, múltiples tipos)
  - Rutas de aprendizaje
  - Asignaciones (manual y automática)
  - Prerrequisitos de cursos
- **Tablas faltantes**: categories, course_prerequisites, learning_paths, learning_path_items, module_completions, user_activity_log
- **Campos adicionales en Course**: category_id, slug, cover_image, duration_minutes, difficulty, valid_from, valid_until, updated_by, published_at
- **Campos adicionales en CourseModule**: description, asset_type, duration_minutes, is_required, config_json
- **Campos adicionales en Enrollment**: learning_path_id, assigned_via, started_at, completed_at, score, attempts
- **Frontend**: Catálogo de cursos, búsqueda avanzada, consumo de contenido, dashboard personalizado

#### Módulo Assessment (Completo)
- Todas las tablas: question_banks, questions, assessments, assessment_questions, assessment_attempts
- Controllers y vistas
- Mantenedores de bancos de preguntas, preguntas y evaluaciones
- Lógica de evaluación y calificación

#### Módulo Certificate (Completo)
- Todas las tablas: certificate_templates, certificates, certificate_downloads
- Generación de PDF
- Mantenedor de plantillas
- Sistema de verificación con código QR

#### Módulo Competency (Completo)
- Todas las tablas: competencies, competency_levels, course_competencies, user_competencies, competency_assessments
- Mantenedores
- Dashboard de brechas
- Asociación curso-competencia

#### Módulo Gamification (Completo)
- Todas las tablas: points_config, user_points, points_history, badges, user_badges, achievements, user_achievements
- Mantenedores de puntos, insignias, logros
- Lógica de otorgamiento automático

#### Módulo Social (Completo)
- Todas las tablas: forums, forum_threads, forum_posts, forum_post_likes, course_comments
- Interfaz de foros
- Sistema de comentarios

#### Módulo Automation (Completo)
- Todas las tablas: automation_rules, automation_logs, notification_templates, notifications, notification_preferences
- Motor de reglas
- Mantenedor de reglas y plantillas
- Sistema de notificaciones (email + in-app)

#### Módulo Reporting (Completo)
- Dashboard ejecutivo
- Reportes exportables (Excel/PDF)
- Métricas y gráficos

#### Módulo System (Completo)
- Tabla system_settings
- Mantenedor de configuración

### 🔄 Próximos Pasos Recomendados

**Sprint Actual (Fundación - completar)**
1. Agregar relaciones faltantes en modelos Identity (User->Role, Role->Permissions)
2. Implementar SSO Google OAuth2
3. Crear mantenedores básicos (Roles, Permisos, Usuarios)
4. Agregar tablas y campos faltantes de Learning (categories, campos adicionales)
5. Implementar mantenedor de categorías y mejorar editor de cursos
6. Implementar asignación manual de cursos

**Sprint 2 (Assessment y Certificates)**
7. Crear módulo Assessment completo
8. Crear módulo Certificate completo

**Sprint 3 (Competencias y Gamificación)**
9. Crear módulo Competency completo
10. Crear módulo Gamification básico

**Sprint 4 (Social y Automation)**
11. Crear módulo Social básico
12. Crear módulo Automation básico

**Sprint 5 (Reporting y Pulido)**
13. Crear módulo Reporting
14. Pulir UX/UI
15. Testing completo

---
2) .editorconfig
ini
Copiar código
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 4

[*.md]
trim_trailing_whitespace = false

[*.{yml,yaml,json}]
indent_size = 2

[*.{js,jsx,ts,tsx}]
indent_size = 2

[*.blade.php]
indent_size = 4
3) Laravel Pint — pint.json
json
Copiar código
{
  "preset": "laravel",
  "rules": {
    "array_indentation": true,
    "binary_operator_spaces": {
      "default": "align_single_space_minimal"
    },
    "blank_line_after_namespace": true,
    "blank_line_after_opening_tag": true,
    "blank_line_before_statement": {
      "statements": ["return", "throw", "try", "if", "for", "foreach", "while", "switch"]
    },
    "class_attributes_separation": {
      "elements": {
        "method": "one",
        "property": "one",
        "trait_import": "one"
      }
    },
    "concat_space": { "spacing": "one" },
    "declare_strict_types": false,
    "method_argument_space": { "on_multiline": "ensure_fully_multiline" },
    "no_unused_imports": true,
    "ordered_imports": { "sort_algorithm": "alpha" },
    "phpdoc_align": false,
    "phpdoc_no_empty_return": false,
    "phpdoc_trim": true,
    "single_quote": true
  }
}
Nota: dejo declare_strict_types en false para no pelear con el preset Laravel; si quieres estrictos en todo el dominio, lo activamos y lo aplicamos solo en Domain/*.

4) PHPStan — phpstan.neon
neon
Copiar código
parameters:
  level: 6
  paths:
    - app
  tmpDir: storage/phpstan
  checkMissingIterableValueType: false
  checkGenericClassInNonGenericObjectType: false
  reportUnmatchedIgnoredErrors: true

  excludePaths:
    - vendor
    - storage
    - bootstrap/cache

  ignoreErrors:
    # Inertia/Helpers pueden generar falsos positivos al inicio.
    - '#Call to an undefined method Illuminate\\Http\\Request::inertia#'

includes:
  # Si agregas larastan: vendor/nunomaduro/larastan/extension.neon
  - phpstan-baseline.neon
Y crea un baseline vacío para partir:

neon
Copiar código
# phpstan-baseline.neon
parameters:
  ignoreErrors: []
5) ESLint + Prettier (JS/TS) — recomendado
.eslintrc.cjs
js
Copiar código
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks'],
  settings: { react: { version: 'detect' } },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
.prettierrc
json
Copiar código
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all"
}
.prettierignore
txt
Copiar código
vendor
storage
bootstrap/cache
public
6) Scripts útiles (Composer + NPM)
composer.json (agrega estos scripts)
json
Copiar código
{
  "scripts": {
    "lint": [
      "@php artisan test --parallel",
      "vendor/bin/pint --test",
      "vendor/bin/phpstan analyse"
    ],
    "format": [
      "vendor/bin/pint"
    ]
  }
}
package.json (agrega estos scripts)
json
Copiar código
{
  "scripts": {
    "lint": "eslint resources/js --ext .js,.jsx",
    "format": "prettier --write resources/js"
  }
}
7) Esqueleto mínimo de módulos (namespaces)
Crea estas carpetas:

txt
Copiar código
app/Modules/Identity/{Domain,Application,Infrastructure,Http}
app/Modules/Learning/{Domain,Application,Infrastructure,Http}
app/Modules/Audit/{Domain,Application,Infrastructure,Http}
app/Shared/{Domain,Support,Http}
Convención de namespaces
App\Modules\Identity\...

App\Modules\Learning\...

App\Modules\Audit\...

App\Shared\...

Laravel autoload ya cubre app/, así que no necesitas tocar composer autoload (salvo que quieras psr-4 explícito por módulo, no hace falta).

8) Checklist VS Code (rápido)
Instala extensiones:

PHP Intelephense

Laravel Pint

ESLint

Prettier

Tailwind CSS IntelliSense

Y si quieres formato automático al guardar, agrega en .vscode/settings.json:

json
Copiar código
{
  "editor.formatOnSave": true,
  "eslint.validate": ["javascript", "javascriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
Si me dices si el repo ya existe (Laravel instalado) o estás partiendo desde cero, te dejo además:

migraciones iniciales (users/roles/permissions/audit/courses)

policies base

middleware de auditoría

estructura de routes por módulo (sin ensuciar web.php)


