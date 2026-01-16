import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::invite
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
export const invite = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invite.url(args, options),
    method: 'get',
})

invite.definition = {
    methods: ["get","head"],
    url: '/surveys/invite/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::invite
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
invite.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return invite.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::invite
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
invite.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invite.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::invite
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
invite.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: invite.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::invite
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
    const inviteForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: invite.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::invite
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
        inviteForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: invite.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::invite
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:38
 * @route '/surveys/invite/{token}'
 */
        inviteForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: invite.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    invite.form = inviteForm
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
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::my
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
export const my = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: my.url(options),
    method: 'get',
})

my.definition = {
    methods: ["get","head"],
    url: '/my-surveys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::my
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
my.url = (options?: RouteQueryOptions) => {
    return my.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::my
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
my.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: my.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::my
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
my.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: my.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::my
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
    const myForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: my.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::my
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
        myForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: my.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyResponseController::my
 * @see app/Modules/Survey/Http/Controllers/SurveyResponseController.php:16
 * @route '/my-surveys'
 */
        myForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: my.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    my.form = myForm
const surveys = {
    invite: Object.assign(invite, invite),
submit: Object.assign(submit, submit),
my: Object.assign(my, my),
}

export default surveys