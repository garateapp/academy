import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
  Users,
  X,
} from 'lucide-react';

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
    progress?: number;
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

interface CategoryPill {
  name: string;
  count: number;
}

interface Props {
  courses: PaginatedCourses;
  categories: CategoryPill[];
  filters: {
    search: string;
    category: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Cursos', href: '/courses' },
];

function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-base-200 bg-base-100">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    </div>
  );
}

export default function CoursesIndex({ courses, categories, filters }: Props) {
  const { flash } = usePage().props as { flash?: { error?: string } };

  const [search, setSearch] = useState(filters.search);
  const [selectedCategory, setSelectedCategory] = useState(filters.category);
  const [isLoading, setIsLoading] = useState(false);

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filtersRef = useRef({ search: filters.search, category: filters.category });

  useEffect(() => {
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, []);

  const navigate = useCallback(
    (params: { search?: string; category?: string; page?: number }) => {
      const url = new URL('/courses', window.location.origin);
      if (params.search) url.searchParams.set('search', params.search);
      if (params.category) url.searchParams.set('category', params.category);
      if (params.page && params.page > 1) url.searchParams.set('page', String(params.page));

      router.get(url.pathname + url.search, {}, {
        preserveScroll: true,
        onStart: () => setIsLoading(true),
        onFinish: () => setIsLoading(false),
      });
    },
    [],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);
      filtersRef.current.search = value;

      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        navigate({ search: value, category: filtersRef.current.category, page: 1 });
      }, 300);
    },
    [navigate],
  );

  const handleClearSearch = useCallback(() => {
    setSearch('');
    filtersRef.current.search = '';
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    navigate({ search: '', category: filtersRef.current.category, page: 1 });
  }, [navigate]);

  const handleCategoryToggle = useCallback(
    (categoryName: string) => {
      const newCategory = selectedCategory === categoryName ? '' : categoryName;
      setSelectedCategory(newCategory);
      filtersRef.current.category = newCategory;
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      navigate({ search: filtersRef.current.search, category: newCategory, page: 1 });
    },
    [navigate, selectedCategory],
  );

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setSelectedCategory('');
    filtersRef.current = { search: '', category: '' };
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    navigate({ search: '', category: '', page: 1 });
  }, [navigate]);

  const hasActiveFilters = search !== '' || selectedCategory !== '';

  const formatDeadline = (course: CourseCard) => {
    const daysRemaining = course.enrollment?.days_remaining;
    if (daysRemaining === null || daysRemaining === undefined) return null;
    if (daysRemaining < 0) return `Vencido hace ${Math.abs(daysRemaining)} dias`;
    if (daysRemaining === 0) return 'Vence hoy';
    if (daysRemaining <= 3) return `${daysRemaining} dias restantes`;
    return `${daysRemaining} dias`;
  };

  const handleSelfEnroll = (courseId: number) => {
    router.post(`/courses/${courseId}/self-enroll`);
  };

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return null;
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
  };

  const courseLinks = courses.links.filter((link) => link.url !== null);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Cursos" />

      <div className="min-h-screen">
        <section className="border-b border-base-200 bg-base-100 px-4 py-10 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <Badge variant="outline" className="mb-1">
                  <BookOpen className="mr-1 h-3 w-3" />
                  Cursos disponibles
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Explora nuestros cursos
                </h1>
                <p className="max-w-xl text-muted-foreground">
                  Desarrolla nuevas competencias con contenido disenado por expertos.
                </p>
              </div>

              <div className="w-full max-w-sm shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Buscar por titulo o descripcion..."
                    className="h-10 w-full rounded-lg border border-base-300 bg-base-100 pl-10 pr-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {categories.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('');
                    navigate({ search, category: '', page: 1 });
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                    !selectedCategory
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-base-300 bg-base-100 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  Todos
                  <span className="text-xs opacity-70">{courses.total}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => handleCategoryToggle(cat.name)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                      selectedCategory === cat.name
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-base-300 bg-base-100 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    {cat.name}
                    <span className="text-xs opacity-70">{cat.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="px-4 py-8 md:px-8">
          <div className="mx-auto max-w-6xl">
            {flash?.error && (
              <div role="alert" className="mb-6 flex items-center gap-3 rounded-lg border border-error/20 bg-error/5 px-4 py-3 text-sm text-error">
                <X className="h-4 w-4 shrink-0" />
                <span>{flash.error}</span>
              </div>
            )}

            {hasActiveFilters && (
              <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                <span>
                  Mostrando {courses.total} resultado{courses.total !== 1 ? 's' : ''}
                  {search && (
                    <> para "<span className="font-medium text-foreground">{search}</span>"</>
                  )}
                  {selectedCategory && (
                    <> en <span className="font-medium text-foreground">{selectedCategory}</span></>
                  )}
                </span>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="ml-1 font-medium text-primary transition-colors hover:text-primary/80 cursor-pointer"
                >
                  Limpiar filtros
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
              </div>
            ) : courses.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-base-200 bg-base-100 px-6 py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">No se encontraron cursos</h2>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  {hasActiveFilters
                    ? 'Intenta con otros terminos de busqueda o cambia el filtro de categoria.'
                    : 'Pronto tendremos nuevas opciones para ti.'}
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" size="sm" className="mt-6" onClick={handleClearFilters}>
                    Limpiar filtros
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {courses.data.map((course) => {
                  const coverImage = course.cover_image || '';
                  const coverSrc = coverImage
                    ? coverImage.startsWith('http')
                      ? coverImage
                      : coverImage.startsWith('storage/')
                        ? `/${coverImage}`
                        : `/storage/${coverImage}`
                    : null;

                  const deadline = formatDeadline(course);
                  const duration = formatDuration(course.duration_minutes);
                  const isEnrolled = !!course.enrollment;

                  return (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="group block overflow-hidden rounded-xl border border-base-200 bg-base-100 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                        {coverSrc ? (
                          <img
                            src={coverSrc}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <BookOpen className="h-12 w-12 text-primary/20" />
                          </div>
                        )}

                        {deadline && (
                          <div className="absolute bottom-3 right-3">
                            <Badge
                              variant="outline"
                              className={`border-0 backdrop-blur-sm ${
                                (course.enrollment?.days_remaining ?? 999) <= 3
                                  ? 'bg-destructive/90 text-white'
                                  : 'bg-background/80 text-foreground'
                              }`}
                            >
                              <Clock className="mr-1 h-3 w-3" />
                              {deadline}
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 p-5">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          {duration && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {duration}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {course.enrollments_count} inscrito{course.enrollments_count !== 1 ? 's' : ''}
                          </span>
                        </div>

                        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
                          {course.title}
                        </h3>

                        <div className="flex flex-wrap gap-1.5">
                          {course.category && (
                            <Badge variant="secondary" className="text-xs">
                              {course.category.name}
                            </Badge>
                          )}
                          {course.enrollment?.is_required && (
                            <Badge variant="destructive" className="text-xs">
                              Obligatorio
                            </Badge>
                          )}
                        </div>

                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {course.description || 'Sin descripcion.'}
                        </p>

                        {isEnrolled && course.enrollment?.progress !== undefined && (
                          <div className="mt-1">
                            <div className="mb-1 flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Progreso</span>
                              <span className="font-medium text-foreground">
                                {course.enrollment.progress}%
                              </span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
                              <div
                                className="h-full rounded-full bg-primary transition-all duration-500"
                                style={{ width: `${course.enrollment.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="mt-1">
                          {isEnrolled ? (
                            <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                              Ver curso
                              <ChevronRight className="h-4 w-4" />
                            </span>
                          ) : course.allow_self_enrollment ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSelfEnroll(course.id);
                              }}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
                            >
                              Autoinscribirme
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          ) : (
                            <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground">
                              Solicitar acceso
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {courses.last_page > 1 && (
              <div className="mt-10 flex items-center justify-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  disabled={!courses.links[0]?.url}
                  onClick={() => courses.links[0]?.url && router.get(courses.links[0].url)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {courseLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant={link.active ? 'default' : 'outline'}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => link.url && router.get(link.url)}
                  >
                    {link.label}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  disabled={!courses.links[courses.links.length - 1]?.url}
                  onClick={() =>
                    courses.links[courses.links.length - 1]?.url &&
                    router.get(courses.links[courses.links.length - 1].url!)
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
