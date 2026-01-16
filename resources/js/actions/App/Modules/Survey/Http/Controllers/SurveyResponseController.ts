import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
export const show = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/surveys/invite/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
show.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return show.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
show.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
show.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
    const showForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
        showForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
        showForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::submit
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:91
 * @route '/surveys/invite/{token}'
 */
export const submit = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/surveys/invite/{token}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::submit
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:91
 * @route '/surveys/invite/{token}'
 */
submit.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return submit.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::submit
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:91
 * @route '/surveys/invite/{token}'
 */
submit.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::submit
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:91
 * @route '/surveys/invite/{token}'
 */
    const submitForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::submit
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:91
 * @route '/surveys/invite/{token}'
 */
        submitForm.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/my-surveys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
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
const SurveyResponseController = { show, submit, index }

export default SurveyResponseController