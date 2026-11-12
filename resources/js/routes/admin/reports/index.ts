import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:253
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
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:253
 * @route '/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:253
 * @route '/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:253
 * @route '/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:253
 * @route '/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:253
 * @route '/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:253
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
* @see \App\Modules\Reporting\Http\Controllers\ReportController::courses
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:35
 * @route '/admin/reports/courses'
 */
export const courses = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: courses.url(options),
    method: 'get',
})

courses.definition = {
    methods: ["get","head"],
    url: '/admin/reports/courses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::courses
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:35
 * @route '/admin/reports/courses'
 */
courses.url = (options?: RouteQueryOptions) => {
    return courses.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::courses
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:35
 * @route '/admin/reports/courses'
 */
courses.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: courses.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::courses
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:35
 * @route '/admin/reports/courses'
 */
courses.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: courses.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::courses
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:35
 * @route '/admin/reports/courses'
 */
    const coursesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: courses.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::courses
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:35
 * @route '/admin/reports/courses'
 */
        coursesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: courses.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::courses
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:35
 * @route '/admin/reports/courses'
 */
        coursesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: courses.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    courses.form = coursesForm
const reports = {
    index: Object.assign(index, index),
courses: Object.assign(courses, courses),
}

export default reports