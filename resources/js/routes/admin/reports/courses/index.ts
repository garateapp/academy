import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/reports/courses/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:67
 * @route '/admin/reports/courses/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
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