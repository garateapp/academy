import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:66
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
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:66
 * @route '/admin/reports/courses/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:66
 * @route '/admin/reports/courses/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:66
 * @route '/admin/reports/courses/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:66
 * @route '/admin/reports/courses/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:66
 * @route '/admin/reports/courses/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Reporting\Http\Controllers\ReportController::exportMethod
 * @see app/Modules/Reporting/Http/Controllers/ReportController.php:66
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