import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
  Award,
  BookOpen,
  ChevronRight,
  Clock,
  Menu,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Stats {
  students: number;
  courses: number;
  categories: number;
  assessments: number;
}

interface Category {
  id: number;
  name: string;
  courses_count: number;
}

interface FeaturedCourse {
  id: number;
  title: string;
  description: string | null;
  duration_minutes: number | null;
  cover_image: string | null;
  enrollments_count: number;
  creator_name: string;
  category_name?: string | null;
  tag: string;
}

export default function Welcome({
  canRegister = true,
  stats,
  categories = [],
  featuredCourses = [],
}: {
  canRegister?: boolean;
  stats?: Stats;
  categories?: Category[];
  featuredCourses?: FeaturedCourse[];
}) {
  const { auth } = usePage<SharedData>().props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categoryIcons = [Zap, TrendingUp, ShieldCheck, BookOpen];

  const formatDuration = (minutes?: number | null) => {
    if (!minutes || minutes <= 0) return 'Sin duracion';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.round((minutes / 60) * 10) / 10;
    return `${hours} h`;
  };

  const resolveCoverImage = (coverImage: string | null) => {
    if (!coverImage) return null;
    if (coverImage.startsWith('http')) return coverImage;
    if (coverImage.startsWith('storage/')) return `/${coverImage}`;
    return `/storage/${coverImage}`;
  };

  const totalStudents = stats?.students ?? 0;
  const totalCourses = stats?.courses ?? 0;
  const totalCategories = stats?.categories ?? 0;
  const totalAssessments = stats?.assessments ?? 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Head title="Greenex Academy">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=sora:400,500,600,700,800"
          rel="stylesheet"
        />
      </Head>

      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-38 h-auto bg-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <img src="/logo-academy.png" alt="Greenex Academy"  />
            </div>
            <span
              className={`text-xl font-bold tracking-tight ${
                scrolled ? 'text-emerald-700' : 'text-emerald-800'
              }`}
            >

            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar aprendizaje..."
                className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 w-64 border-none"
              />
            </div>
            {auth.user ? (
              <Link
                href={dashboard()}
                className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-md"
              >
                Ir al Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href={login()}
                  className="text-emerald-700 font-semibold hover:text-emerald-600"
                >
                  Ingresar
                </Link>
                {canRegister && (
                  <Link
                    href={register()}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-md"
                  >
                    Registrarme
                  </Link>
                )}
              </div>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 flex flex-col gap-6 md:hidden">
          <a href="#categorias" className="text-xl font-semibold">
            Cursos
          </a>
          <a href="#rutas" className="text-xl font-semibold">
            Rutas
          </a>
          <a href="#mentores" className="text-xl font-semibold">
            Mentores
          </a>
          <hr />
          {auth.user ? (
            <Link
              href={dashboard()}
              className="bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg text-center"
            >
              Ir al Dashboard
            </Link>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href={login()}
                className="bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg text-center"
              >
                Ingresar al Portal
              </Link>
              {canRegister && (
                <Link
                  href={register()}
                  className="border border-emerald-200 text-emerald-700 py-4 rounded-xl font-bold text-lg text-center"
                >
                  Registrarme
                </Link>
              )}
            </div>
          )}
        </div>
      )}

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50 rounded-bl-[100px] -z-10 hidden lg:block" />
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>Plataforma #1 en capacitacion sostenible</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-800">
              Crece profesionalmente con <span className="text-emerald-600">Greeny</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mx-auto lg:mx-0">
              Desarrolla las habilidades del futuro con nuestra metodologia interactiva diseñada
              para lideres que buscan un impacto positivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2">
                Empezar ahora <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-emerald-300 transition-all">
                Ver catalogo
              </button>
            </div>
          </div>
          <div className="flex-1 relative" id="rutas">
            <div className="relative z-10 animate-float">
              <div className="w-full max-w-md mx-auto aspect-square bg-emerald-200/30 rounded-full flex items-center justify-center relative border-8 border-white shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent" />
                <img
                  src="/greeny_diplomado.png"
                  alt="Greeny"
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 animate-bounce-slow">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Logro</p>
                  <p className="text-sm font-bold">Certificacion Activa</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-400/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-600">
                {totalStudents.toLocaleString()}
              </h3>
              <p className="text-slate-500 font-medium">Estudiantes</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-600">
                {totalCourses.toLocaleString()}
              </h3>
              <p className="text-slate-500 font-medium">Cursos</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-600">
                {totalCategories.toLocaleString()}
              </h3>
              <p className="text-slate-500 font-medium">Categorias</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-600">
                {totalAssessments.toLocaleString()}
              </h3>
              <p className="text-slate-500 font-medium">Evaluaciones</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" id="categorias">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Explora por Categoria</h2>
              <p className="text-slate-500">Encuentra el camino perfecto para tu desarrollo.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-emerald-600 font-bold hover:underline">
              Ver todas <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length];
              return (
              <div
                key={category.id}
                className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 cursor-pointer hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-slate-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-1">{category.name}</h4>
                <p className="text-slate-400 text-sm font-medium">
                  {category.courses_count} cursos
                </p>
              </div>
            )})}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-100/50" id="mentores">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Cursos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => {
              const coverImage = resolveCoverImage(course.cover_image);
              return (
              <div
                key={course.id}
                className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-white hover:shadow-2xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Link href={`/courses/${course.id}`} className="block h-full">
                    <img
                      src={coverImage || '/logo-academy.png'}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {course.tag}
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-center text-sm font-medium text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-emerald-500" />{' '}
                      {formatDuration(course.duration_minutes)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-emerald-500" />{' '}
                      {course.enrollments_count}
                    </span>
                  </div>
                  <div>
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-xl font-bold leading-tight hover:text-emerald-600 transition-colors block"
                    >
                      {course.title}
                    </Link>
                    {course.description && (
                      <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                        {course.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs uppercase">
                        {course.creator_name.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-slate-600">
                        {course.creator_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 font-semibold text-sm">
                      {course.category_name || 'General'}
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-emerald-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-400/20 rounded-full blur-[100px]" />

            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
              <div className="lg:w-1/3 flex justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-full border-4 border-emerald-400/30 flex items-center justify-center backdrop-blur-sm animate-float">
                  <img
                    src="/greencito_academy.png"
                    alt="Greencito"
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>
              </div>
              <div className="lg:w-2/3 text-center lg:text-left space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                  Estas listo para empezar tu ruta de aprendizaje?
                </h2>
                <p className="text-emerald-100 text-xl max-w-2xl">
                  Unete a miles de profesionales que ya estan transformando sus carreras. Greeny
                  te acompanara en cada paso hacia el exito.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                  <button className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20">
                    Registrarme Gratis
                  </button>
                  <button className="bg-emerald-800 text-emerald-100 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all border border-emerald-700">
                    Saber mas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white">
                  G
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Greenex <span className="text-orange-500">Academy</span>
                </span>
              </div>
              <p className="text-slate-400">
                Lideres en formacion digital especializada para el sector industrial y sostenible.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer">
                  <span className="font-bold">in</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer">
                  <span className="font-bold">ig</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer">
                  <span className="font-bold">fb</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Plataforma</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Catalogo de Cursos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Certificaciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Para Empresas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Precios
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Soporte</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Preguntas Frecuentes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Comunidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Novedades</h4>
              <p className="text-slate-400 mb-4">
                Suscribete para recibir noticias de Greeny.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="bg-slate-800 border-none rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 w-full"
                />
                <button className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-all">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2024 Greenex Academy. Todos los derechos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-slate-300">
                Terminos
              </a>
              <a href="#" className="hover:text-slate-300">
                Privacidad
              </a>
              <a href="#" className="hover:text-slate-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 4s ease-in-out infinite;
          }
        `,
        }}
      />
    </div>
  );
}
