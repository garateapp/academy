import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/Admin/PageHeader';
import Alert from '@/components/Admin/Alert';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useMemo, useRef, useState } from 'react';

interface Category {
  id: number;
  name: string;
}

interface AvailableCourse {
  id: number;
  title: string;
}

type ModuleType = 'all' | 'text' | 'video' | 'file' | 'link' | 'assessment' | 'scorm';

interface CourseModule {
  id: number;
  course_id: number;
  type: ModuleType;
  title: string;
  description: string | null;
  content: string | null;
  asset_path: string | null;
  asset_type: string | null;
  duration_minutes: number | null;
  is_required: boolean;
  sort_order: number;
  config_json: { [key: string]: unknown } | null;
}

interface Course {
  id: number;
  title: string;
  description: string | null;
  category_id: number;
  cover_image: string | null;
  duration_minutes: number | null;
  difficulty: string | null;
  status: string;
  valid_from: string | null;
  valid_until: string | null;
  allow_self_enrollment?: boolean;
  modules?: CourseModule[];
}

const formatDateInput = (value: string | null) => {
  if (!value) return '';
  const [date] = value.split('T');
  return date;
};

const MODULE_TYPES: { key: ModuleType; label: string; hint: string }[] = [
  { key: 'all', label: 'Todos', hint: 'Ver todos los módulos' },
  { key: 'text', label: 'Texto', hint: 'Contenido escrito' },
  { key: 'video', label: 'Video', hint: 'URL de video' },
  { key: 'file', label: 'Archivo', hint: 'Documento descargable' },
  { key: 'link', label: 'Link', hint: 'Recurso externo' },
  { key: 'assessment', label: 'Evaluación', hint: 'Asociar evaluación' },
  { key: 'scorm', label: 'SCORM', hint: 'Contenido SCORM' },
];

const MODULE_LABELS: Record<string, string> = {
  text: 'Texto',
  video: 'Video',
  file: 'Archivo',
  link: 'Link',
  assessment: 'Evaluación',
  scorm: 'SCORM',
};

const getCookieValue = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
};

export default function Edit({
  course,
  categories,
  availableCourses,
  coursePrerequisites,
}: {
  course: Course;
  categories: Category[];
  availableCourses: AvailableCourse[];
  coursePrerequisites: number[];
}) {
  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    title: course.title,
    description: course.description || '',
    category_id: course.category_id.toString(),
    cover_image: null as File | null,
    duration_minutes: course.duration_minutes?.toString() || '',
    difficulty: course.difficulty || '',
    status: course.status,
    valid_from: formatDateInput(course.valid_from),
    valid_until: formatDateInput(course.valid_until),
    allow_self_enrollment: Boolean(course.allow_self_enrollment),
    prerequisites: coursePrerequisites,
  });

  const [modules, setModules] = useState<CourseModule[]>(course.modules || []);
  const [activeType, setActiveType] = useState<ModuleType>('all');
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(
    (course.modules && course.modules[0]?.id) || null,
  );
  const [moduleFiles, setModuleFiles] = useState<Record<number, File | null>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const saveTimeouts = useRef<Record<number, number>>({});

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(`/courses/${course.id}`);
  };

  const handlePrerequisiteToggle = (courseId: number) => {
    setData(
      'prerequisites',
      data.prerequisites.includes(courseId)
        ? data.prerequisites.filter((id) => id !== courseId)
        : [...data.prerequisites, courseId],
    );
  };

  const orderedModules = useMemo(() => {
    return [...modules].sort((a, b) => a.sort_order - b.sort_order);
  }, [modules]);

  const filteredModules = useMemo(() => {
    if (activeType === 'all') return orderedModules;
    return orderedModules.filter((module) => module.type === activeType);
  }, [orderedModules, activeType]);

  const selectedModule = useMemo(() => {
    return modules.find((module) => module.id === selectedModuleId) || null;
  }, [modules, selectedModuleId]);

  const getPreview = (module: CourseModule) => {
    if (module.type === 'text') {
      return module.content?.slice(0, 140) || 'Sin contenido';
    }

    if (module.type === 'assessment') {
      const assessmentId = module.config_json?.assessment_id as number | undefined;
      return assessmentId ? `Evaluación #${assessmentId}` : 'Sin evaluación asociada';
    }

    if (module.asset_path) {
      return module.asset_path.length > 140
        ? `${module.asset_path.slice(0, 140)}...`
        : module.asset_path;
    }

    return 'Sin recurso asociado';
  };
  const scheduleSave = (moduleId: number, module: CourseModule) => {
    if (saveTimeouts.current[moduleId]) {
      window.clearTimeout(saveTimeouts.current[moduleId]);
    }

    saveTimeouts.current[moduleId] = window.setTimeout(() => {
      void saveModule(moduleId, module);
    }, 700);
  };

  const saveModule = async (moduleId: number, module: CourseModule, file?: File | null) => {
    const token = getCookieValue('XSRF-TOKEN');

    setSaveStatus('saving');
    setSaveMessage('Guardando módulo...');

    try {
      const hasFile = Boolean(file);
      const response = await fetch(`/courses/${course.id}/modules/${moduleId}`, {
        method: hasFile ? 'POST' : 'PUT',
        headers: {
          ...(hasFile ? {} : { 'Content-Type': 'application/json' }),
          'X-Requested-With': 'XMLHttpRequest',
          ...(token ? { 'X-XSRF-TOKEN': token } : {}),
        },
        body: hasFile
          ? (() => {
              const form = new FormData();
              form.append('_method', 'PUT');
              form.append('type', module.type);
              form.append('title', module.title);
              if (module.description) form.append('description', module.description);
              if (module.content) form.append('content', module.content);
              if (module.asset_path) form.append('asset_path', module.asset_path);
              if (module.asset_type) form.append('asset_type', module.asset_type);
              if (module.duration_minutes) {
                form.append('duration_minutes', module.duration_minutes.toString());
              }
              form.append('is_required', module.is_required ? '1' : '0');
              form.append('sort_order', module.sort_order.toString());
              if (module.config_json) {
                form.append('config_json', JSON.stringify(module.config_json));
              }
              if (file) {
                form.append('asset_file', file);
              }
              return form;
            })()
          : JSON.stringify({
              type: module.type,
              title: module.title,
              description: module.description,
              content: module.content,
              asset_path: module.asset_path,
              asset_type: module.asset_type,
              duration_minutes: module.duration_minutes,
              is_required: module.is_required,
              sort_order: module.sort_order,
              config_json: module.config_json,
            }),
      });

      if (!response.ok) {
        throw new Error('No se pudo guardar el módulo');
      }

      const payload = (await response.json()) as { module: CourseModule };
      setModules((prev) =>
        prev.map((item) => (item.id === moduleId ? payload.module : item)),
      );
      if (file) {
        setModuleFiles((prev) => ({ ...prev, [moduleId]: null }));
      }
      setSaveStatus('idle');
      setSaveMessage('Guardado');
      window.setTimeout(() => setSaveMessage(null), 1200);
    } catch (error) {
      setSaveStatus('error');
      setSaveMessage('Error al guardar. Intenta nuevamente.');
    }
  };

  const updateModuleField = <K extends keyof CourseModule>(
    moduleId: number,
    field: K,
    value: CourseModule[K],
  ) => {
    setModules((prev) => {
      const next = prev.map((module) =>
        module.id === moduleId ? { ...module, [field]: value } : module,
      );
      const updated = next.find((module) => module.id === moduleId);
      if (updated) {
        scheduleSave(moduleId, updated);
      }
      return next;
    });
  };

  const updateModuleConfig = (moduleId: number, key: string, value: unknown) => {
    setModules((prev) => {
      const next = prev.map((module) => {
        if (module.id !== moduleId) return module;
        const nextConfig = { ...(module.config_json || {}), [key]: value };
        return { ...module, config_json: nextConfig };
      });
      const updated = next.find((module) => module.id === moduleId);
      if (updated) {
        scheduleSave(moduleId, updated);
      }
      return next;
    });
  };

  const handleFileUpload = (moduleId: number, file: File | null) => {
    if (!file) return;

    setModuleFiles((prev) => ({ ...prev, [moduleId]: file }));

    const module = modules.find((item) => item.id === moduleId);
    if (module) {
      void saveModule(moduleId, module, file);
    }
  };

  const createModule = async (type: ModuleType) => {
    if (type === 'all') return;

    const token = getCookieValue('XSRF-TOKEN');
    const maxOrder =
      orderedModules.length > 0 ? orderedModules[orderedModules.length - 1].sort_order : 0;

    const payload = {
      type,
      title: `Nuevo ${MODULE_LABELS[type] || 'Módulo'}`,
      description: '',
      content: type === 'text' ? '' : null,
      asset_path: type !== 'text' ? '' : null,
      asset_type: type === 'file' ? 'file' : type === 'video' ? 'video' : 'url',
      duration_minutes: null,
      is_required: true,
      sort_order: maxOrder + 1,
      config_json: type === 'assessment' ? { assessment_id: null } : {},
    };

    try {
      const response = await fetch(`/courses/${course.id}/modules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(token ? { 'X-XSRF-TOKEN': token } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('No se pudo crear el módulo');
      }

      const json = (await response.json()) as { module: CourseModule };
      setModules((prev) => [...prev, json.module]);
      setSelectedModuleId(json.module.id);
      setActiveType(json.module.type);
      setModuleFiles((prev) => ({ ...prev, [json.module.id]: null }));
    } catch (error) {
      setSaveStatus('error');
      setSaveMessage('No se pudo crear el módulo.');
    }
  };

  const deleteModule = async (moduleId: number) => {
    const token = getCookieValue('XSRF-TOKEN');

    if (!window.confirm('¿Eliminar este módulo? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const response = await fetch(`/courses/${course.id}/modules/${moduleId}`, {
        method: 'DELETE',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          ...(token ? { 'X-XSRF-TOKEN': token } : {}),
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo eliminar el módulo');
      }

      setModules((prev) => prev.filter((module) => module.id !== moduleId));
      setModuleFiles((prev) => {
        const next = { ...prev };
        delete next[moduleId];
        return next;
      });
      setSelectedModuleId((prev) => {
        if (prev === moduleId) {
          return modules.filter((module) => module.id !== moduleId)[0]?.id || null;
        }
        return prev;
      });
    } catch (error) {
      setSaveStatus('error');
      setSaveMessage('No se pudo eliminar el módulo.');
    }
  };

  const reorderModules = async (nextOrder: CourseModule[]) => {
    const token = getCookieValue('XSRF-TOKEN');
    const orderIds = nextOrder.map((module) => module.id);

    setModules(nextOrder);

    try {
      await fetch(`/courses/${course.id}/modules/reorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(token ? { 'X-XSRF-TOKEN': token } : {}),
        },
        body: JSON.stringify({ order: orderIds }),
      });
    } catch (error) {
      setSaveStatus('error');
      setSaveMessage('No se pudo reordenar.');
    }
  };

  const moveModule = (moduleId: number, direction: 'up' | 'down') => {
    const ordered = [...orderedModules];
    const index = ordered.findIndex((module) => module.id === moduleId);
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (index < 0 || targetIndex < 0 || targetIndex >= ordered.length) {
      return;
    }

    const swap = ordered[targetIndex];
    const current = ordered[index];

    const temp = current.sort_order;
    current.sort_order = swap.sort_order;
    swap.sort_order = temp;

    const next = ordered.map((module) => ({ ...module }));
    void reorderModules(next);
  };
  return (
    <AdminLayout
      header={
        <PageHeader
          title={`Editar Curso: ${course.title}`}
          breadcrumbs={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Cursos', href: '/courses' },
            { label: 'Editar' },
          ]}
        />
      }
    >
      <Alert />

      <form onSubmit={handleSubmit}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Información del Curso</h2>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Título <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                required
              />
              {errors.title && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.title}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Descripción</span>
              </label>
              <textarea
                className={`textarea textarea-bordered h-32 ${errors.description ? 'textarea-error' : ''}`}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              ></textarea>
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.description}</span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Categoría <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.category_id ? 'select-error' : ''}`}
                  value={data.category_id}
                  onChange={(e) => setData('category_id', e.target.value)}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.category_id}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Imagen de portada</span>
                  <span className="label-text-alt text-base-content/60">
                    {course.cover_image ? 'Cambiar imagen' : 'Max 2MB'}
                  </span>
                </label>
                {course.cover_image && !data.cover_image && (
                  <div className="mb-3 flex items-center gap-3 rounded-lg border border-base-200 bg-base-100 p-3">
                    <img
                      src={
                        course.cover_image.startsWith('http')
                          ? course.cover_image
                          : course.cover_image.startsWith('storage/')
                            ? `/${course.cover_image}`
                            : `/storage/${course.cover_image}`
                      }
                      alt={`Portada ${course.title}`}
                      className="h-16 w-24 rounded-md object-cover"
                    />
                    <div className="text-xs text-base-content/60">
                      Portada actual: {course.cover_image.split('/').pop()}
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className={`file-input file-input-bordered w-full ${errors.cover_image ? 'file-input-error' : ''}`}
                  onChange={(e) => setData('cover_image', e.target.files?.[0] || null)}
                />
                {errors.cover_image && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.cover_image}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Duración (minutos)</span>
                </label>
                <input
                  type="number"
                  className={`input input-bordered w-full ${errors.duration_minutes ? 'input-error' : ''}`}
                  value={data.duration_minutes}
                  onChange={(e) => setData('duration_minutes', e.target.value)}
                  min={0}
                />
                {errors.duration_minutes && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.duration_minutes}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Dificultad</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.difficulty ? 'select-error' : ''}`}
                  value={data.difficulty}
                  onChange={(e) => setData('difficulty', e.target.value)}
                >
                  <option value="">Selecciona</option>
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
                {errors.difficulty && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.difficulty}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Estado <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.status ? 'select-error' : ''}`}
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  required
                >
                  <option value="draft">Borrador</option>
                  <option value="published">Publicado</option>
                  <option value="archived">Archivado</option>
                </select>
                {errors.status && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.status}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="divider"></div>

            <h3 className="font-semibold text-lg">Disponibilidad</h3>
            <div className="form-control w-full">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={data.allow_self_enrollment}
                  onChange={(e) => setData('allow_self_enrollment', e.target.checked)}
                />
                <span className="label-text">Permitir autoinscripcion</span>
              </label>
              <span className="text-xs text-base-content/60">
                Si esta activo, los alumnos podran inscribirse sin ser asignados manualmente.
              </span>
            </div>

            <div className="divider"></div>

            <h3 className="font-semibold text-lg">Vigencia del Curso</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Válido desde</span>
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full ${errors.valid_from ? 'input-error' : ''}`}
                  value={data.valid_from}
                  onChange={(e) => setData('valid_from', e.target.value)}
                />
                {errors.valid_from && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.valid_from}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Válido hasta</span>
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full ${errors.valid_until ? 'input-error' : ''}`}
                  value={data.valid_until}
                  onChange={(e) => setData('valid_until', e.target.value)}
                />
                {errors.valid_until && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.valid_until}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="divider"></div>

            <h3 className="font-semibold text-lg">Prerequisitos</h3>
            <p className="text-sm text-base-content/60 mb-2">
              Selecciona los cursos que deben completarse antes de este ({data.prerequisites.length}{' '}
              seleccionados)
            </p>

            {availableCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableCourses.map((availCourse) => (
                  <div key={availCourse.id} className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={data.prerequisites.includes(availCourse.id)}
                        onChange={() => handlePrerequisiteToggle(availCourse.id)}
                      />
                      <span className="label-text">{availCourse.title}</span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>No hay cursos publicados disponibles para seleccionar como prerequisitos.</span>
              </div>
            )}
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="card-title">Módulos del Curso</h2>
                <p className="text-sm text-base-content/60">
                  Crea, ordena y edita los módulos del curso con guardado automático.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {MODULE_TYPES.filter((type) => type.key !== 'all').map((type) => (
                  <button
                    key={type.key}
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => createModule(type.key)}
                  >
                    + {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="tabs tabs-boxed mt-4 flex flex-wrap gap-2">
              {MODULE_TYPES.map((type) => (
                <button
                  key={type.key}
                  type="button"
                  className={`tab ${activeType === type.key ? 'tab-active' : ''}`}
                  onClick={() => setActiveType(type.key)}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
              <div className="space-y-4">
                <div className="rounded-lg border border-base-300 bg-base-200 p-4">
                  <div className="text-sm font-semibold">Resumen</div>
                  <div className="mt-2 text-xs text-base-content/60">
                    {modules.length} módulos totales
                  </div>
                  <div className="mt-1 text-xs text-base-content/60">
                    Estado: {saveMessage || 'Sin cambios pendientes'}
                  </div>
                </div>

                {filteredModules.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-base-300 p-4 text-sm text-base-content/60">
                    No hay módulos para este filtro.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredModules.map((module) => (
                      <div
                        key={module.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setSelectedModuleId(module.id);
                          setActiveType(module.type);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setSelectedModuleId(module.id);
                            setActiveType(module.type);
                          }
                        }}
                        className={`w-full cursor-pointer rounded-lg border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                          selectedModuleId === module.id
                            ? 'border-primary bg-base-100 shadow'
                            : 'border-base-300 bg-base-100/70 hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold">{module.title}</span>
                          <span className="badge badge-outline badge-sm">
                            {MODULE_LABELS[module.type] || module.type}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-base-content/60">{getPreview(module)}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-xs btn-ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveModule(module.id, 'up');
                            }}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            className="btn btn-xs btn-ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveModule(module.id, 'down');
                            }}
                          >
                            ↓
                          </button>
                          <span className="text-xs text-base-content/60">Orden {module.sort_order}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-lg border border-base-300 bg-base-100 p-5">
                {selectedModule ? (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">Editar módulo</h3>
                        <p className="text-xs text-base-content/60">
                          Tipo: {MODULE_LABELS[selectedModule.type] || selectedModule.type}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => deleteModule(selectedModule.id)}
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Título</span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          value={selectedModule.title}
                          onChange={(e) =>
                            updateModuleField(selectedModule.id, 'title', e.target.value)
                          }
                        />
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Duración (minutos)</span>
                        </label>
                        <input
                          type="number"
                          className="input input-bordered w-full"
                          value={selectedModule.duration_minutes || ''}
                          min={0}
                          onChange={(e) =>
                            updateModuleField(
                              selectedModule.id,
                              'duration_minutes',
                              e.target.value ? Number(e.target.value) : null,
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Descripción</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered h-24"
                        value={selectedModule.description || ''}
                        onChange={(e) =>
                          updateModuleField(selectedModule.id, 'description', e.target.value)
                        }
                      ></textarea>
                    </div>

                    {selectedModule.type === 'text' && (
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Contenido</span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered h-32"
                          value={selectedModule.content || ''}
                          onChange={(e) =>
                            updateModuleField(selectedModule.id, 'content', e.target.value)
                          }
                        ></textarea>
                      </div>
                    )}

                    {['video', 'file'].includes(selectedModule.type) && (
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">
                            {selectedModule.type === 'video' ? 'Video del módulo' : 'Archivo del módulo'}
                          </span>
                          <span className="label-text-alt text-base-content/60">Máx 50MB</span>
                        </label>
                        <input
                          type="file"
                          accept={selectedModule.type === 'video' ? 'video/*' : '*'}
                          className="file-input file-input-bordered w-full"
                          onChange={(e) =>
                            handleFileUpload(selectedModule.id, e.target.files?.[0] || null)
                          }
                        />
                        {selectedModule.asset_path && (
                          <label className="label">
                            <span className="label-text-alt text-base-content/60">
                              Archivo actual: {selectedModule.asset_path.split('/').pop()}
                            </span>
                          </label>
                        )}
                      </div>
                    )}

                    {['link', 'scorm'].includes(selectedModule.type) && (
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">URL del recurso</span>
                        </label>
                        <input
                          type="url"
                          className="input input-bordered w-full"
                          value={selectedModule.asset_path || ''}
                          placeholder="https://..."
                          onChange={(e) =>
                            updateModuleField(selectedModule.id, 'asset_path', e.target.value)
                          }
                        />
                      </div>
                    )}

                    {selectedModule.type === 'assessment' && (
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">ID de evaluación</span>
                        </label>
                        <input
                          type="number"
                          className="input input-bordered w-full"
                          value={(selectedModule.config_json?.assessment_id as number | undefined) || ''}
                          onChange={(e) =>
                            updateModuleConfig(
                              selectedModule.id,
                              'assessment_id',
                              e.target.value ? Number(e.target.value) : null,
                            )
                          }
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <label className="label cursor-pointer gap-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={selectedModule.is_required}
                          onChange={(e) =>
                            updateModuleField(selectedModule.id, 'is_required', e.target.checked)
                          }
                        />
                        <span className="label-text">Obligatorio</span>
                      </label>
                      <span className="text-xs text-base-content/60">Guardado automático activo</span>
                    </div>

                    <div className="rounded-lg border border-base-200 bg-base-200/50 p-4">
                      <div className="text-sm font-semibold">Vista previa</div>
                      <div className="mt-2 text-sm text-base-content/80">
                        {getPreview(selectedModule)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-base-content/60">
                    Selecciona un módulo para editarlo.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing && <span className="loading loading-spinner"></span>}
            Guardar Cambios
          </button>
          <a href="/courses" className="btn btn-ghost">
            Cancelar
          </a>
        </div>
      </form>
    </AdminLayout>
  );
}
