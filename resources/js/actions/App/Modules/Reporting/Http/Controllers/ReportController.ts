import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:139
 * @route '/admin/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:139
 * @route '/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:139
 * @route '/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:139
 * @route '/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:139
 * @route '/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:139
 * @route '/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:139
 * @route '/admin/reports'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:28
 * @route '/admin/reports/courses/{course?}'
 */
export const byCourse = (args?: { course?: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourse.url(args, options),
    method: 'get',
})

byCourse.definition = {
    methods: ["get","head"],
    url: '/admin/reports/courses/{course?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:28
 * @route '/admin/reports/courses/{course?}'
 */
byCourse.url = (args?: { course?: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "course",
        ])

    const parsedArgs = {
                        course: typeof args?.course === 'object'
                ? args.course.id
                : args?.course,
                }

    return byCourse.definition.url
            .replace('{course?}', parsedArgs.course?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:28
 * @route '/admin/reports/courses/{course?}'
 */
byCourse.get = (args?: { course?: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourse.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:28
 * @route '/admin/reports/courses/{course?}'
 */
byCourse.head = (args?: { course?: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byCourse.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:28
 * @route '/admin/reports/courses/{course?}'
 */
    const byCourseForm = (args?: { course?: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: byCourse.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:28
 * @route '/admin/reports/courses/{course?}'
 */
        byCourseForm.get = (args?: { course?: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourse.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:28
 * @route '/admin/reports/courses/{course?}'
 */
        byCourseForm.head = (args?: { course?: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourse.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    byCourse.form = byCourseForm
const ReportController = { index, byCourse }

export default ReportController