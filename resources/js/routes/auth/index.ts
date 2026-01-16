import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::google
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
export const google = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: google.url(options),
    method: 'get',
})

google.definition = {
    methods: ["get","head"],
    url: '/auth/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::google
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
google.url = (options?: RouteQueryOptions) => {
    return google.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::google
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
google.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: google.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::google
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
google.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: google.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Identity\Http\Controllers\LoginController::google
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
    const googleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: google.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Identity\Http\Controllers\LoginController::google
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
        googleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: google.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Identity\Http\Controllers\LoginController::google
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
        googleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: google.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    google.form = googleForm
const auth = {
    google: Object.assign(google, google),
}

export default auth