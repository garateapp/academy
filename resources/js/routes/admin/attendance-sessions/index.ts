import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::index
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:23
 * @route '/admin/attendance-sessions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/attendance-sessions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::index
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:23
 * @route '/admin/attendance-sessions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::index
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:23
 * @route '/admin/attendance-sessions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::index
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:23
 * @route '/admin/attendance-sessions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::index
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:23
 * @route '/admin/attendance-sessions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::index
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:23
 * @route '/admin/attendance-sessions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::index
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:23
 * @route '/admin/attendance-sessions'
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
const attendanceSessions = {
    index: Object.assign(index, index),
}

export default attendanceSessions