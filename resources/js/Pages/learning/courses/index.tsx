import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ChevronRight, Clock, Search, Star, Users } from 'lucide-react';

interface Category {
  id: number;
  name: string;
}

interface CourseCard {
  id: number;
  title: string;
  description: string | null;
  cover_image: string | null;
  duration_minutes: number | null;
  status: string;
  allow_self_enrollment: boolean;
  enrollments_count: number;
  category?: Category | null;
  enrollment?: {
    id: number;
    status: string;
    assigned_via: string;
    due_at: string | null;
    days_remaining: number | null;
    is_required: boolean;
  } | null;
}

interface PaginatedCourses {
  data: CourseCard[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
  courses: PaginatedCourses;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Cursos', href: '/courses' },
];

export default function CoursesIndex({ courses }: Props) {
  const { flash } = usePage().props as { flash?: { error?: string } };
  const categories = Array.from(
    courses.data.reduce((map, course) => {
      if (course.category) {
        const current = map.get(course.category.name) ?? 0;
        map.set(course.category.name, current + 1);
      }
      return map;
    }, new Map<string, number>()),
  ).map(([name, count]) => ({ name, count }));

  const formatDeadline = (course: CourseCard) => {
    const daysRemaining = course.enrollment?.days_remaining;
    if (daysRemaining === null || daysRemaining === undefined) return null;
    if (daysRemaining < 0) return `Vencido hace ${Math.abs(daysRemaining)} días`;
    if (daysRemaining === 0) return 'Vence hoy';
    return `Te quedan ${daysRemaining} días`;
  };

  const handleSelfEnroll = (courseId: number) => {
    router.post(`/courses/${courseId}/self-enroll`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Cursos" />

      <div className="min-h-screen bg-slate-50">
        <section className="relative px-4 py-12 md:px-8">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-emerald-50 rounded-bl-[80px] hidden lg:block" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
                  <Star className="h-4 w-4 fill-current" />
                  <span>Encuentra tu proximo curso</span>
                </div>
                <h1 className="text-3xl font-extrabold text-slate-800 md:text-5xl">
                  Aprende y crece con cada leccion
                </h1>
                <p className="max-w-2xl text-lg text-slate-600">
                  Descubre cursos disenados para impulsar tu carrera y tu impacto profesional.
                </p>
              </div>
              <div className="w-full max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar cursos..."
                    className="w-full rounded-full border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </div>
            </div>

            {categories.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {categories.slice(0, 6).map((category) => (
                  <span
                    key={category.name}
                    className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-semibold text-emerald-700"
                  >
                    {category.name} · {category.count}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="px-4 pb-16 md:px-8">
          <div className="mx-auto max-w-6xl">
            {flash?.error && (
              <div role="alert" className="alert alert-error mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{flash.error}</span>
              </div>
            )}
            {courses.data.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
                <h2 className="text-2xl font-bold text-slate-800">No hay cursos disponibles</h2>
                <p className="mt-2 text-slate-500">Pronto tendremos nuevas opciones para ti.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {courses.data.map((course) => {
                  const coverImage = course.cover_image || '';
                  const coverSrc = coverImage
                    ? coverImage.startsWith('http')
                      ? coverImage
                      : coverImage.startsWith('storage/')
                        ? `/${coverImage}`
                        : `/storage/${coverImage}`
                    : null;

                  return (
                    <div
                      key={course.id}
                      className="group overflow-hidden rounded-[2rem] border border-white bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
                    >
                      <div className="relative h-52 overflow-hidden bg-slate-100">
                        {coverSrc ? (
                          <img
                            src={coverSrc}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                            Sin portada
                          </div>
                        )}
                        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                          {course.category && (
                            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                              {course.category.name}
                            </span>
                          )}
                          {course.enrollment?.is_required && (
                            <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                              Obligatorio
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-4 p-8">
                        <div className="flex items-center justify-between text-sm font-medium text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-emerald-500" />
                            {course.duration_minutes ? `${course.duration_minutes} min` : 'Duracion N/A'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-emerald-500" />
                            {course.enrollments_count}
                          </span>
                        </div>
                        {course.enrollment?.due_at && (
                          <div className="text-xs font-semibold text-rose-500">
                            {formatDeadline(course)}
                          </div>
                        )}
                        <h3 className="text-xl font-bold leading-tight text-slate-800">
                          {course.title}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-3">
                          {course.description || 'Curso sin descripcion.'}
                        </p>
                        <div className="pt-2">
                          {course.enrollment ? (
                            <Link
                              href={`/courses/${course.id}`}
                              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-700"
                            >
                              Ver curso <ChevronRight className="h-4 w-4" />
                            </Link>
                          ) : course.allow_self_enrollment ? (
                            <button
                              type="button"
                              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-700"
                              onClick={() => handleSelfEnroll(course.id)}
                            >
                              Autoinscribirme <ChevronRight className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-200 px-6 py-3 text-sm font-bold text-slate-500"
                              disabled
                            >
                              Solicita acceso
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {courses.last_page > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {courses.links.map((link, index) => (
                  <button
                    key={index}
                    className={`btn ${link.active ? 'btn-primary' : 'btn-outline'} btn-sm`}
                    disabled={!link.url}
                    onClick={() => link.url && router.get(link.url)}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
