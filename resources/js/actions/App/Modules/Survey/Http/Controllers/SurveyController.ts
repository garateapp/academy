import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:25
 * @route '/admin/surveys'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/surveys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:25
 * @route '/admin/surveys'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:25
 * @route '/admin/surveys'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:25
 * @route '/admin/surveys'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:25
 * @route '/admin/surveys'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:25
 * @route '/admin/surveys'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::index
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:25
 * @route '/admin/surveys'
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
* @see \App\Modules\Survey\Http\Controllers\SurveyController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:36
 * @route '/admin/surveys/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/surveys/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:36
 * @route '/admin/surveys/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:36
 * @route '/admin/surveys/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:36
 * @route '/admin/surveys/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:36
 * @route '/admin/surveys/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:36
 * @route '/admin/surveys/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::create
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:36
 * @route '/admin/surveys/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:41
 * @route '/admin/surveys'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/surveys',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:41
 * @route '/admin/surveys'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:41
 * @route '/admin/surveys'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:41
 * @route '/admin/surveys'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:41
 * @route '/admin/surveys'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:59
 * @route '/admin/surveys/{survey}'
 */
export const show = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/surveys/{survey}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:59
 * @route '/admin/surveys/{survey}'
 */
show.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:59
 * @route '/admin/surveys/{survey}'
 */
show.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:59
 * @route '/admin/surveys/{survey}'
 */
show.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:59
 * @route '/admin/surveys/{survey}'
 */
    const showForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:59
 * @route '/admin/surveys/{survey}'
 */
        showForm.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::show
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:59
 * @route '/admin/surveys/{survey}'
 */
        showForm.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Modules\Survey\Http\Controllers\SurveyController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:85
 * @route '/admin/surveys/{survey}/edit'
 */
export const edit = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/surveys/{survey}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:85
 * @route '/admin/surveys/{survey}/edit'
 */
edit.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:85
 * @route '/admin/surveys/{survey}/edit'
 */
edit.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:85
 * @route '/admin/surveys/{survey}/edit'
 */
edit.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:85
 * @route '/admin/surveys/{survey}/edit'
 */
    const editForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:85
 * @route '/admin/surveys/{survey}/edit'
 */
        editForm.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::edit
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:85
 * @route '/admin/surveys/{survey}/edit'
 */
        editForm.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Modules\Survey\Http\Controllers\SurveyController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:92
 * @route '/admin/surveys/{survey}'
 */
export const update = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/surveys/{survey}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:92
 * @route '/admin/surveys/{survey}'
 */
update.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:92
 * @route '/admin/surveys/{survey}'
 */
update.put = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:92
 * @route '/admin/surveys/{survey}'
 */
update.patch = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:92
 * @route '/admin/surveys/{survey}'
 */
    const updateForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:92
 * @route '/admin/surveys/{survey}'
 */
        updateForm.put = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::update
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:92
 * @route '/admin/surveys/{survey}'
 */
        updateForm.patch = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::destroy
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:110
 * @route '/admin/surveys/{survey}'
 */
export const destroy = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/surveys/{survey}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::destroy
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:110
 * @route '/admin/surveys/{survey}'
 */
destroy.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::destroy
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:110
 * @route '/admin/surveys/{survey}'
 */
destroy.delete = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::destroy
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:110
 * @route '/admin/surveys/{survey}'
 */
    const destroyForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::destroy
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:110
 * @route '/admin/surveys/{survey}'
 */
        destroyForm.delete = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::exportMethod
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:118
 * @route '/admin/surveys/{survey}/export'
 */
export const exportMethod = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/surveys/{survey}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::exportMethod
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:118
 * @route '/admin/surveys/{survey}/export'
 */
exportMethod.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return exportMethod.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::exportMethod
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:118
 * @route '/admin/surveys/{survey}/export'
 */
exportMethod.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::exportMethod
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:118
 * @route '/admin/surveys/{survey}/export'
 */
exportMethod.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::exportMethod
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:118
 * @route '/admin/surveys/{survey}/export'
 */
    const exportMethodForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::exportMethod
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:118
 * @route '/admin/surveys/{survey}/export'
 */
        exportMethodForm.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyController::exportMethod
 * @see app/Modules/Survey/Http/Controllers/SurveyController.php:118
 * @route '/admin/surveys/{survey}/export'
 */
        exportMethodForm.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
const SurveyController = { index, create, store, show, edit, update, destroy, exportMethod, export: exportMethod }

export default SurveyController