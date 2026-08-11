<?php

namespace App\Modules\Reporting\Application\Services;

use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Reporting\Domain\CompanyMap;
use Illuminate\Support\Facades\DB;

class TrainingHoursService
{
    /**
     * Training hours from completed enrollments, grouped by company
     * derived from the user's email domain.
     *
     * @param  callable|null  $applyFilters  Callable that receives the query builder.
     * @return array<int, array<string, mixed>>
     */
    public function byCompany(?callable $applyFilters = null): array
    {
        $query = Enrollment::query()
            ->where('enrollments.status', 'completed')
            ->join('module_completions', 'module_completions.enrollment_id', '=', 'enrollments.id')
            ->join('users', 'users.id', '=', 'enrollments.user_id');

        if ($applyFilters) {
            $applyFilters($query);
        }

        return $query
            ->select([
                'users.email',
                DB::raw('sum(module_completions.time_spent_seconds) as seconds'),
                DB::raw('count(distinct enrollments.user_id) as user_count'),
            ])
            ->groupBy('users.email')
            ->get()
            ->groupBy(fn ($row): string => CompanyMap::nameForEmail((string) $row->email))
            ->map(fn ($rows, string $company): array => [
                'id'      => $company,
                'company' => $company,
                'users'   => (int) $rows->sum('user_count'),
                'hours'   => round((float) $rows->sum('seconds') / 3600, 1),
            ])
            ->sortByDesc('hours')
            ->values()
            ->all();
    }
}
