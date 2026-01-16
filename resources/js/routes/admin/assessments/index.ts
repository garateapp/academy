import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import results from './results'
import questions from './questions'
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:25
 * @route '/admin/assessments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/assessments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:25
 * @route '/admin/assessments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:25
 * @route '/admin/assessments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:25
 * @route '/admin/assessments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:25
 * @route '/admin/assessments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:25
 * @route '/admin/assessments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:25
 * @route '/admin/assessments'
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
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:37
 * @route '/admin/assessments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/assessments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:37
 * @route '/admin/assessments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:37
 * @route '/admin/assessments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:37
 * @route '/admin/assessments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:37
 * @route '/admin/assessments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:37
 * @route '/admin/assessments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:37
 * @route '/admin/assessments/create'
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
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::store
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:50
 * @route '/admin/assessments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/assessments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::store
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:50
 * @route '/admin/assessments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::store
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:50
 * @route '/admin/assessments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::store
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:50
 * @route '/admin/assessments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::store
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:50
 * @route '/admin/assessments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::show
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:71
 * @route '/admin/assessments/{assessment}'
 */
export const show = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/assessments/{assessment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::show
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:71
 * @route '/admin/assessments/{assessment}'
 */
show.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assessment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return show.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::show
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:71
 * @route '/admin/assessments/{assessment}'
 */
show.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::show
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:71
 * @route '/admin/assessments/{assessment}'
 */
show.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::show
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:71
 * @route '/admin/assessments/{assessment}'
 */
    const showForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::show
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:71
 * @route '/admin/assessments/{assessment}'
 */
        showForm.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::show
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:71
 * @route '/admin/assessments/{assessment}'
 */
        showForm.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:88
 * @route '/admin/assessments/{assessment}/edit'
 */
export const edit = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/assessments/{assessment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:88
 * @route '/admin/assessments/{assessment}/edit'
 */
edit.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assessment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return edit.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:88
 * @route '/admin/assessments/{assessment}/edit'
 */
edit.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:88
 * @route '/admin/assessments/{assessment}/edit'
 */
edit.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:88
 * @route '/admin/assessments/{assessment}/edit'
 */
    const editForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:88
 * @route '/admin/assessments/{assessment}/edit'
 */
        editForm.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:88
 * @route '/admin/assessments/{assessment}/edit'
 */
        editForm.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:100
 * @route '/admin/assessments/{assessment}'
 */
export const update = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/assessments/{assessment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:100
 * @route '/admin/assessments/{assessment}'
 */
update.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assessment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return update.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:100
 * @route '/admin/assessments/{assessment}'
 */
update.put = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:100
 * @route '/admin/assessments/{assessment}'
 */
update.patch = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:100
 * @route '/admin/assessments/{assessment}'
 */
    const updateForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:100
 * @route '/admin/assessments/{assessment}'
 */
        updateForm.put = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:100
 * @route '/admin/assessments/{assessment}'
 */
        updateForm.patch = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::destroy
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:121
 * @route '/admin/assessments/{assessment}'
 */
export const destroy = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/assessments/{assessment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::destroy
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:121
 * @route '/admin/assessments/{assessment}'
 */
destroy.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assessment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return destroy.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::destroy
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:121
 * @route '/admin/assessments/{assessment}'
 */
destroy.delete = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::destroy
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:121
 * @route '/admin/assessments/{assessment}'
 */
    const destroyForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentController::destroy
 * @see app/Modules/Assessment/Http/Controllers/AssessmentController.php:121
 * @route '/admin/assessments/{assessment}'
 */
        destroyForm.delete = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const assessments = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
results: Object.assign(results, results),
questions: Object.assign(questions, questions),
}

export default assessments