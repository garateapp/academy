import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::index
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:23
 * @route '/admin/learning-paths'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/learning-paths',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::index
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:23
 * @route '/admin/learning-paths'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::index
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:23
 * @route '/admin/learning-paths'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::index
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:23
 * @route '/admin/learning-paths'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::index
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:23
 * @route '/admin/learning-paths'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::index
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:23
 * @route '/admin/learning-paths'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::index
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:23
 * @route '/admin/learning-paths'
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
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::create
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:37
 * @route '/admin/learning-paths/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/learning-paths/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::create
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:37
 * @route '/admin/learning-paths/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::create
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:37
 * @route '/admin/learning-paths/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::create
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:37
 * @route '/admin/learning-paths/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::create
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:37
 * @route '/admin/learning-paths/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::create
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:37
 * @route '/admin/learning-paths/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::create
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:37
 * @route '/admin/learning-paths/create'
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
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::store
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:48
 * @route '/admin/learning-paths'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/learning-paths',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::store
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:48
 * @route '/admin/learning-paths'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::store
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:48
 * @route '/admin/learning-paths'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::store
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:48
 * @route '/admin/learning-paths'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::store
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:48
 * @route '/admin/learning-paths'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::show
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:85
 * @route '/admin/learning-paths/{learning_path}'
 */
export const show = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/learning-paths/{learning_path}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::show
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:85
 * @route '/admin/learning-paths/{learning_path}'
 */
show.url = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { learning_path: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    learning_path: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        learning_path: args.learning_path,
                }

    return show.definition.url
            .replace('{learning_path}', parsedArgs.learning_path.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::show
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:85
 * @route '/admin/learning-paths/{learning_path}'
 */
show.get = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::show
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:85
 * @route '/admin/learning-paths/{learning_path}'
 */
show.head = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::show
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:85
 * @route '/admin/learning-paths/{learning_path}'
 */
    const showForm = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::show
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:85
 * @route '/admin/learning-paths/{learning_path}'
 */
        showForm.get = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::show
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:85
 * @route '/admin/learning-paths/{learning_path}'
 */
        showForm.head = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::edit
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:99
 * @route '/admin/learning-paths/{learning_path}/edit'
 */
export const edit = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/learning-paths/{learning_path}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::edit
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:99
 * @route '/admin/learning-paths/{learning_path}/edit'
 */
edit.url = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { learning_path: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    learning_path: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        learning_path: args.learning_path,
                }

    return edit.definition.url
            .replace('{learning_path}', parsedArgs.learning_path.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::edit
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:99
 * @route '/admin/learning-paths/{learning_path}/edit'
 */
edit.get = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::edit
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:99
 * @route '/admin/learning-paths/{learning_path}/edit'
 */
edit.head = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::edit
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:99
 * @route '/admin/learning-paths/{learning_path}/edit'
 */
    const editForm = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::edit
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:99
 * @route '/admin/learning-paths/{learning_path}/edit'
 */
        editForm.get = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::edit
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:99
 * @route '/admin/learning-paths/{learning_path}/edit'
 */
        editForm.head = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::update
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:115
 * @route '/admin/learning-paths/{learning_path}'
 */
export const update = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/learning-paths/{learning_path}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::update
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:115
 * @route '/admin/learning-paths/{learning_path}'
 */
update.url = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { learning_path: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    learning_path: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        learning_path: args.learning_path,
                }

    return update.definition.url
            .replace('{learning_path}', parsedArgs.learning_path.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::update
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:115
 * @route '/admin/learning-paths/{learning_path}'
 */
update.put = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::update
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:115
 * @route '/admin/learning-paths/{learning_path}'
 */
update.patch = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::update
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:115
 * @route '/admin/learning-paths/{learning_path}'
 */
    const updateForm = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::update
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:115
 * @route '/admin/learning-paths/{learning_path}'
 */
        updateForm.put = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::update
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:115
 * @route '/admin/learning-paths/{learning_path}'
 */
        updateForm.patch = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::destroy
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:149
 * @route '/admin/learning-paths/{learning_path}'
 */
export const destroy = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/learning-paths/{learning_path}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::destroy
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:149
 * @route '/admin/learning-paths/{learning_path}'
 */
destroy.url = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { learning_path: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    learning_path: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        learning_path: args.learning_path,
                }

    return destroy.definition.url
            .replace('{learning_path}', parsedArgs.learning_path.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::destroy
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:149
 * @route '/admin/learning-paths/{learning_path}'
 */
destroy.delete = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::destroy
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:149
 * @route '/admin/learning-paths/{learning_path}'
 */
    const destroyForm = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\LearningPathController::destroy
 * @see app/Modules/Learning/Http/Controllers/LearningPathController.php:149
 * @route '/admin/learning-paths/{learning_path}'
 */
        destroyForm.delete = (args: { learning_path: string | number } | [learning_path: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const LearningPathController = { index, create, store, show, edit, update, destroy }

export default LearningPathController