import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::redirectToGoogle
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
export const redirectToGoogle = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirectToGoogle.url(options),
    method: 'get',
})

redirectToGoogle.definition = {
    methods: ["get","head"],
    url: '/auth/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::redirectToGoogle
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
redirectToGoogle.url = (options?: RouteQueryOptions) => {
    return redirectToGoogle.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::redirectToGoogle
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
redirectToGoogle.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirectToGoogle.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::redirectToGoogle
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
redirectToGoogle.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirectToGoogle.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Identity\Http\Controllers\LoginController::redirectToGoogle
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
    const redirectToGoogleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirectToGoogle.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Identity\Http\Controllers\LoginController::redirectToGoogle
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
        redirectToGoogleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirectToGoogle.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Identity\Http\Controllers\LoginController::redirectToGoogle
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:17
 * @route '/auth/redirect'
 */
        redirectToGoogleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirectToGoogle.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirectToGoogle.form = redirectToGoogleForm
/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::handleGoogleCallback
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:22
 * @route '/auth/callback'
 */
export const handleGoogleCallback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: handleGoogleCallback.url(options),
    method: 'get',
})

handleGoogleCallback.definition = {
    methods: ["get","head"],
    url: '/auth/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::handleGoogleCallback
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:22
 * @route '/auth/callback'
 */
handleGoogleCallback.url = (options?: RouteQueryOptions) => {
    return handleGoogleCallback.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::handleGoogleCallback
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:22
 * @route '/auth/callback'
 */
handleGoogleCallback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: handleGoogleCallback.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Identity\Http\Controllers\LoginController::handleGoogleCallback
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:22
 * @route '/auth/callback'
 */
handleGoogleCallback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: handleGoogleCallback.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Identity\Http\Controllers\LoginController::handleGoogleCallback
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:22
 * @route '/auth/callback'
 */
    const handleGoogleCallbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: handleGoogleCallback.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Identity\Http\Controllers\LoginController::handleGoogleCallback
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:22
 * @route '/auth/callback'
 */
        handleGoogleCallbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: handleGoogleCallback.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Identity\Http\Controllers\LoginController::handleGoogleCallback
 * @see app/Modules/Identity/Http/Controllers/LoginController.php:22
 * @route '/auth/callback'
 */
        handleGoogleCallbackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: handleGoogleCallback.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    handleGoogleCallback.form = handleGoogleCallbackForm
const LoginController = { redirectToGoogle, handleGoogleCallback }

export default LoginController