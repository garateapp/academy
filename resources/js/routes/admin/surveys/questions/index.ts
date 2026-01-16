import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:16
 * @route '/admin/surveys/{survey}/questions/create'
 */
export const create = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/surveys/{survey}/questions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:16
 * @route '/admin/surveys/{survey}/questions/create'
 */
create.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { survey: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { survey: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    survey: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        survey: typeof args.survey === 'object'
                ? args.survey.id
                : args.survey,
                }

    return create.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:16
 * @route '/admin/surveys/{survey}/questions/create'
 */
create.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:16
 * @route '/admin/surveys/{survey}/questions/create'
 */
create.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:16
 * @route '/admin/surveys/{survey}/questions/create'
 */
    const createForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:16
 * @route '/admin/surveys/{survey}/questions/create'
 */
        createForm.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:16
 * @route '/admin/surveys/{survey}/questions/create'
 */
        createForm.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:25
 * @route '/admin/surveys/{survey}/questions'
 */
export const store = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/surveys/{survey}/questions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:25
 * @route '/admin/surveys/{survey}/questions'
 */
store.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { survey: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { survey: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    survey: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        survey: typeof args.survey === 'object'
                ? args.survey.id
                : args.survey,
                }

    return store.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:25
 * @route '/admin/surveys/{survey}/questions'
 */
store.post = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:25
 * @route '/admin/surveys/{survey}/questions'
 */
    const storeForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:25
 * @route '/admin/surveys/{survey}/questions'
 */
        storeForm.post = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:60
 * @route '/admin/surveys/{survey}/questions/{question}/edit'
 */
export const edit = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/surveys/{survey}/questions/{question}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:60
 * @route '/admin/surveys/{survey}/questions/{question}/edit'
 */
edit.url = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    survey: args[0],
                    question: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        survey: typeof args.survey === 'object'
                ? args.survey.id
                : args.survey,
                                question: typeof args.question === 'object'
                ? args.question.id
                : args.question,
                }

    return edit.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace('{question}', parsedArgs.question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:60
 * @route '/admin/surveys/{survey}/questions/{question}/edit'
 */
edit.get = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:60
 * @route '/admin/surveys/{survey}/questions/{question}/edit'
 */
edit.head = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:60
 * @route '/admin/surveys/{survey}/questions/{question}/edit'
 */
    const editForm = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:60
 * @route '/admin/surveys/{survey}/questions/{question}/edit'
 */
        editForm.get = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:60
 * @route '/admin/surveys/{survey}/questions/{question}/edit'
 */
        editForm.head = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:72
 * @route '/admin/surveys/{survey}/questions/{question}'
 */
export const update = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/surveys/{survey}/questions/{question}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:72
 * @route '/admin/surveys/{survey}/questions/{question}'
 */
update.url = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    survey: args[0],
                    question: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        survey: typeof args.survey === 'object'
                ? args.survey.id
                : args.survey,
                                question: typeof args.question === 'object'
                ? args.question.id
                : args.question,
                }

    return update.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace('{question}', parsedArgs.question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:72
 * @route '/admin/surveys/{survey}/questions/{question}'
 */
update.put = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:72
 * @route '/admin/surveys/{survey}/questions/{question}'
 */
    const updateForm = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:72
 * @route '/admin/surveys/{survey}/questions/{question}'
 */
        updateForm.put = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::destroy
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:107
 * @route '/admin/surveys/{survey}/questions/{question}'
 */
export const destroy = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/surveys/{survey}/questions/{question}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::destroy
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:107
 * @route '/admin/surveys/{survey}/questions/{question}'
 */
destroy.url = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    survey: args[0],
                    question: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        survey: typeof args.survey === 'object'
                ? args.survey.id
                : args.survey,
                                question: typeof args.question === 'object'
                ? args.question.id
                : args.question,
                }

    return destroy.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace('{question}', parsedArgs.question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::destroy
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:107
 * @route '/admin/surveys/{survey}/questions/{question}'
 */
destroy.delete = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::destroy
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:107
 * @route '/admin/surveys/{survey}/questions/{question}'
 */
    const destroyForm = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyQuestionController::destroy
 * @see app/Modules/Survey/Http/Controllers/SurveyQuestionController.php:107
 * @route '/admin/surveys/{survey}/questions/{question}'
 */
        destroyForm.delete = (args: { survey: number | { id: number }, question: number | { id: number } } | [survey: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const questions = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default questions