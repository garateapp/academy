<?php

namespace App\Modules\Reporting\Application\Services;

use App\Modules\Assessment\Domain\AssessmentAttempt;
use App\Modules\Learning\Domain\Course;
use App\Modules\Learning\Domain\Enrollment;
use Illuminate\Support\Collection;

class CourseReportService
{
    /**
     * Todos los cursos, sin filtrar por estado (incluye borradores, publicados y archivados).
     *
     * @return Collection<int, array{id: int, title: string, status: string, category: string|null}>
     */
    public function courses(): Collection
    {
        return Course::query()
            ->select('id', 'title', 'status', 'category_id')
            ->with('category:id,name')
            ->orderBy('title')
            ->get()
            ->map(fn (Course $course) => [
                'id'       => $course->id,
                'title'    => $course->title,
                'status'   => $course->status ?? 'unknown',
                'category' => $course->category?->name,
            ]);
    }

    /**
     * Participantes inscritos en los cursos indicados, con el % obtenido en la evaluacion.
     *
     * @param  array<int>|Collection<int, int>  $courseIds
     * @return Collection<int, array<string, mixed>>
     */
    public function participants(array|Collection $courseIds): Collection
    {
        $courseIds = collect($courseIds)->values()->all();

        if ($courseIds === []) {
            return collect();
        }        $courseTitles = Course::query()->whereIn('id', $courseIds)->pluck('title', 'id');
        $evaluations           = $this->evaluationScores($courseIds);

        return Enrollment::query()
            ->whereIn('course_id', $courseIds)
            ->with('user:id,name,email')
            ->get()
            ->map(function (Enrollment $enrollment) use ($courseTitles, $evaluations) {
                $evaluation = $evaluations->get($enrollment->course_id . ':' . $enrollment->user_id);
                $completed  = $enrollment->status === 'completed';

                return [
                    'id'               => $enrollment->id,
                    'user_id'          => $enrollment->user_id,
                    'course_id'        => $enrollment->course_id,
                    'course'           => $courseTitles->get($enrollment->course_id) ?? 'Curso no disponible',
                    'name'             => $enrollment->user?->name                   ?? 'Usuario no disponible',
                    'email'            => $enrollment->user?->email,
                    'status'           => $enrollment->status ?? 'unknown',
                    'completed'        => $completed,
                    'started_at'       => $enrollment->started_at?->toDateString(),
                    'completed_at'     => $enrollment->completed_at?->toDateString(),
                    'evaluation_score' => $evaluation?->best_score !== null
                        ? (int) $evaluation->best_score
                        : null,
                    'evaluation_attempts' => (int) ($evaluation?->attempts ?? 0),
                    'evaluation_passed'   => $evaluation ? (bool) $evaluation->passed : false,
                ];
            })
            ->sortBy([['course', 'asc'], ['name', 'asc']])
            ->values();
    }

    /**
     * Filtra por estado de finalizacion: 'completed' = finalizaron, 'pending' = no finalizaron.
     *
     * @param  Collection<int, array<string, mixed>>  $participants
     * @return Collection<int, array<string, mixed>>
     */
    public function filterByCompletion(Collection $participants, ?string $completion): Collection
    {
        return match ($completion) {
            'completed' => $participants->where('completed', true)->values(),
            'pending'   => $participants->where('completed', false)->values(),
            default     => $participants,
        };
    }

    /**
     * Resumen del conjunto de participantes recibido.
     *
     * @param  Collection<int, array<string, mixed>>  $participants
     * @return array<string, int|float|null>
     */
    public function summary(Collection $participants): array
    {
        $total     = $participants->count();
        $completed = $participants->where('completed', true)->count();
        $scores    = $participants->pluck('evaluation_score')->filter(fn ($score) => $score !== null);

        return [
            'participants'    => $total,
            'completed'       => $completed,
            'pending'         => $total - $completed,
            'completion_rate' => $total > 0 ? round(($completed / $total) * 100, 1) : 0,
            'evaluated'       => $scores->count(),
            'passed'          => $participants->where('evaluation_passed', true)->count(),
            'average_score'   => $scores->count() > 0 ? round($scores->avg(), 1) : null,
        ];
    }

    /**
     * Consolidado por curso: totales y promedio de evaluacion de cada curso.
     *
     * @param  Collection<int, array{id: int, title: string, status: string, category: string|null}>  $courses
     * @return Collection<int, array<string, mixed>>
     */
    public function consolidated(Collection $courses): Collection
    {
        $courseIds = $courses->pluck('id')->values()->all();

        if ($courseIds === []) {
            return collect();
        }

        $enrollmentStats = Enrollment::query()
            ->whereIn('course_id', $courseIds)
            ->groupBy('course_id')
            ->select('course_id')
            ->selectRaw('count(*) as total')
            ->selectRaw("sum(case when status = 'completed' then 1 else 0 end) as completed")
            ->get()
            ->keyBy('course_id');

        $evaluationStats = $this->evaluationScores($courseIds)
            ->groupBy('course_id');

        return $courses
            ->map(function (array $course) use ($enrollmentStats, $evaluationStats) {
                $enrollments = $enrollmentStats->get($course['id']);
                $total       = (int) ($enrollments->total ?? 0);
                $completed   = (int) ($enrollments->completed ?? 0);
                $evaluations = $evaluationStats->get($course['id']) ?? collect();
                $scores      = $evaluations->pluck('best_score')->filter(fn ($score) => $score !== null);

                return [
                    'id'              => $course['id'],
                    'course'          => $course['title'],
                    'category'        => $course['category'],
                    'status'          => $course['status'],
                    'participants'    => $total,
                    'completed'       => $completed,
                    'pending'         => $total - $completed,
                    'completion_rate' => $total > 0 ? round(($completed / $total) * 100, 1) : 0,
                    'evaluated'       => $evaluations->count(),
                    'passed'          => $evaluations->filter(fn ($row) => (bool) $row->passed)->count(),
                    'average_score'   => $scores->count() > 0 ? round($scores->avg(), 1) : null,
                ];
            })
            ->values();
    }

    /**
     * Mejor puntaje, intentos y resultado por usuario dentro de cada curso.
     *
     * @param  array<int>  $courseIds
     * @return Collection<string, object{best_score: int|null, attempts: int, passed: bool}>
     */
    private function evaluationScores(array $courseIds): Collection
    {
        return AssessmentAttempt::query()
            ->join('assessments', 'assessments.id', '=', 'assessment_attempts.assessment_id')
            ->join('course_modules', 'course_modules.id', '=', 'assessments.module_id')
            ->whereIn('course_modules.course_id', $courseIds)
            ->whereNull('assessments.deleted_at')
            ->whereIn('assessment_attempts.status', ['submitted', 'graded'])
            ->groupBy('course_modules.course_id', 'assessment_attempts.user_id')
            ->select([
                'course_modules.course_id as course_id',
                'assessment_attempts.user_id as user_id',
            ])
            ->selectRaw('max(assessment_attempts.score) as best_score')
            ->selectRaw('count(*) as attempts')
            ->selectRaw('max(case when assessment_attempts.passed then 1 else 0 end) as passed')
            ->get()
            ->keyBy(fn ($row) => $row->course_id . ':' . $row->user_id);
    }
}
