import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:252
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
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:252
 * @route '/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:252
 * @route '/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:252
 * @route '/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:252
 * @route '/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:252
 * @route '/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::index
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:252
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
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportByCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
export const exportByCourse = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportByCourse.url(options),
    method: 'get',
})

exportByCourse.definition = {
    methods: ["get","head"],
    url: '/admin/reports/courses/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportByCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
exportByCourse.url = (options?: RouteQueryOptions) => {
    return exportByCourse.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportByCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
exportByCourse.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportByCourse.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportByCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
exportByCourse.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportByCourse.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportByCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
    const exportByCourseForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportByCourse.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportByCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
        exportByCourseForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportByCourse.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportByCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
        exportByCourseForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportByCourse.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportByCourse.form = exportByCourseForm
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::acta
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:103
 * @route '/admin/reports/courses/acta'
 */
export const acta = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: acta.url(options),
    method: 'get',
})

acta.definition = {
    methods: ["get","head"],
    url: '/admin/reports/courses/acta',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::acta
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:103
 * @route '/admin/reports/courses/acta'
 */
acta.url = (options?: RouteQueryOptions) => {
    return acta.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::acta
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:103
 * @route '/admin/reports/courses/acta'
 */
acta.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: acta.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::acta
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:103
 * @route '/admin/reports/courses/acta'
 */
acta.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: acta.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::acta
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:103
 * @route '/admin/reports/courses/acta'
 */
    const actaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: acta.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::acta
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:103
 * @route '/admin/reports/courses/acta'
 */
        actaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: acta.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::acta
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:103
 * @route '/admin/reports/courses/acta'
 */
        actaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: acta.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    acta.form = actaForm
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:34
 * @route '/admin/reports/courses'
 */
export const byCourse = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourse.url(options),
    method: 'get',
})

byCourse.definition = {
    methods: ["get","head"],
    url: '/admin/reports/courses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:34
 * @route '/admin/reports/courses'
 */
byCourse.url = (options?: RouteQueryOptions) => {
    return byCourse.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:34
 * @route '/admin/reports/courses'
 */
byCourse.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourse.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:34
 * @route '/admin/reports/courses'
 */
byCourse.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byCourse.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:34
 * @route '/admin/reports/courses'
 */
    const byCourseForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: byCourse.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:34
 * @route '/admin/reports/courses'
 */
        byCourseForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourse.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::byCourse
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:34
 * @route '/admin/reports/courses'
 */
        byCourseForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourse.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    byCourse.form = byCourseForm
const ReportController = { index, exportByCourse, acta, byCourse }

export default ReportController