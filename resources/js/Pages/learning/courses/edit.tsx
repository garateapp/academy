import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Course } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Props {
    course: Course;
}

const statusLabels: Record<Course['status'], string> = {
    draft: 'Borrador',
    active: 'Activo',
    obsolete: 'Obsoleto',
};

const statusVariants: Record<Course['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
    draft: 'secondary',
    active: 'default',
    obsolete: 'destructive',
};

interface CourseFormData {
    title: string;
    description: string;
    expires_at: string;
    status: Course['status'];
}

export default function CourseEdit({ course }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Cursos', href: '/courses' },
        { title: course.title, href: `/courses/${course.id}` },
        { title: 'Editar', href: `/courses/${course.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm<CourseFormData>({
        title: course.title,
        description: course.description || '',
        expires_at: course.expires_at ? course.expires_at.split('T')[0] : '',
        status: course.status,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/courses/${course.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar: ${course.title}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/courses/${course.id}`}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight">
                                Editar Curso
                            </h1>
                            <Badge variant={statusVariants[course.status]}>
                                {statusLabels[course.status]}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            Modifica la información del curso
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información del Curso</CardTitle>
                            <CardDescription>
                                Actualiza los datos básicos del curso.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Título *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Ej: Introducción a React"
                                    aria-invalid={!!errors.title}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe el contenido y objetivos del curso..."
                                    rows={5}
                                    className="border-input placeholder:text-muted-foreground flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                                    aria-invalid={!!errors.description}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label htmlFor="status">Estado</Label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as Course['status'])}
                                    className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                >
                                    <option value="draft">Borrador</option>
                                    <option value="active">Activo</option>
                                    <option value="obsolete">Obsoleto</option>
                                </select>
                                {errors.status && (
                                    <p className="text-sm text-destructive">{errors.status}</p>
                                )}
                            </div>

                            {/* Expiration Date */}
                            <div className="space-y-2">
                                <Label htmlFor="expires_at">Fecha de Expiración (opcional)</Label>
                                <Input
                                    id="expires_at"
                                    type="date"
                                    value={data.expires_at}
                                    onChange={(e) => setData('expires_at', e.target.value)}
                                    aria-invalid={!!errors.expires_at}
                                />
                                {errors.expires_at && (
                                    <p className="text-sm text-destructive">{errors.expires_at}</p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    Si se establece, el curso no estará disponible después de esta fecha.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Guardando...' : 'Guardar Cambios'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={`/courses/${course.id}`}>Cancelar</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
