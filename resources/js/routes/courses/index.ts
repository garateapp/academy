import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import modules from './modules'
import enrollments from './enrollments'
import attendanceSessions from './attendance-sessions'
/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::index
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:28
 * @route '/courses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/courses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::index
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:28
 * @route '/courses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::index
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:28
 * @route '/courses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::index
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:28
 * @route '/courses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::index
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:28
 * @route '/courses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::index
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:28
 * @route '/courses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::index
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:28
 * @route '/courses'
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
* @see \App\Modules\Learning\Http\Controllers\CourseController::create
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:99
 * @route '/courses/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/courses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::create
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:99
 * @route '/courses/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::create
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:99
 * @route '/courses/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::create
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:99
 * @route '/courses/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::create
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:99
 * @route '/courses/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::create
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:99
 * @route '/courses/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::create
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:99
 * @route '/courses/create'
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
* @see \App\Modules\Learning\Http\Controllers\CourseController::store
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:114
 * @route '/courses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/courses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::store
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:114
 * @route '/courses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::store
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:114
 * @route '/courses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::store
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:114
 * @route '/courses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::store
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:114
 * @route '/courses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::show
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:149
 * @route '/courses/{course}'
 */
export const show = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/courses/{course}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::show
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:149
 * @route '/courses/{course}'
 */
show.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return show.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::show
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:149
 * @route '/courses/{course}'
 */
show.get = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::show
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:149
 * @route '/courses/{course}'
 */
show.head = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::show
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:149
 * @route '/courses/{course}'
 */
    const showForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::show
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:149
 * @route '/courses/{course}'
 */
        showForm.get = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::show
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:149
 * @route '/courses/{course}'
 */
        showForm.head = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Modules\Learning\Http\Controllers\CourseController::edit
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:251
 * @route '/courses/{course}/edit'
 */
export const edit = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/courses/{course}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::edit
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:251
 * @route '/courses/{course}/edit'
 */
edit.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return edit.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::edit
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:251
 * @route '/courses/{course}/edit'
 */
edit.get = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::edit
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:251
 * @route '/courses/{course}/edit'
 */
edit.head = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::edit
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:251
 * @route '/courses/{course}/edit'
 */
    const editForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::edit
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:251
 * @route '/courses/{course}/edit'
 */
        editForm.get = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::edit
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:251
 * @route '/courses/{course}/edit'
 */
        editForm.head = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Modules\Learning\Http\Controllers\CourseController::update
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:274
 * @route '/courses/{course}'
 */
export const update = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/courses/{course}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::update
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:274
 * @route '/courses/{course}'
 */
update.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return update.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::update
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:274
 * @route '/courses/{course}'
 */
update.put = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::update
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:274
 * @route '/courses/{course}'
 */
update.patch = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::update
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:274
 * @route '/courses/{course}'
 */
    const updateForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::update
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:274
 * @route '/courses/{course}'
 */
        updateForm.put = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::update
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:274
 * @route '/courses/{course}'
 */
        updateForm.patch = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Modules\Learning\Http\Controllers\CourseController::destroy
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:319
 * @route '/courses/{course}'
 */
export const destroy = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/courses/{course}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::destroy
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:319
 * @route '/courses/{course}'
 */
destroy.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return destroy.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::destroy
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:319
 * @route '/courses/{course}'
 */
destroy.delete = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::destroy
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:319
 * @route '/courses/{course}'
 */
    const destroyForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::destroy
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:319
 * @route '/courses/{course}'
 */
        destroyForm.delete = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Modules\Learning\Http\Controllers\CourseController::selfEnroll
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:460
 * @route '/courses/{course}/self-enroll'
 */
export const selfEnroll = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selfEnroll.url(args, options),
    method: 'post',
})

selfEnroll.definition = {
    methods: ["post"],
    url: '/courses/{course}/self-enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::selfEnroll
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:460
 * @route '/courses/{course}/self-enroll'
 */
selfEnroll.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return selfEnroll.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::selfEnroll
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:460
 * @route '/courses/{course}/self-enroll'
 */
selfEnroll.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selfEnroll.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::selfEnroll
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:460
 * @route '/courses/{course}/self-enroll'
 */
    const selfEnrollForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: selfEnroll.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::selfEnroll
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:460
 * @route '/courses/{course}/self-enroll'
 */
        selfEnrollForm.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: selfEnroll.url(args, options),
            method: 'post',
        })
    
    selfEnroll.form = selfEnrollForm
/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::publish
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:338
 * @route '/courses/{course}/publish'
 */
export const publish = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

publish.definition = {
    methods: ["post"],
    url: '/courses/{course}/publish',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::publish
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:338
 * @route '/courses/{course}/publish'
 */
publish.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return publish.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::publish
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:338
 * @route '/courses/{course}/publish'
 */
publish.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::publish
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:338
 * @route '/courses/{course}/publish'
 */
    const publishForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publish.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::publish
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:338
 * @route '/courses/{course}/publish'
 */
        publishForm.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: publish.url(args, options),
            method: 'post',
        })
    
    publish.form = publishForm
/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::unpublish
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:359
 * @route '/courses/{course}/unpublish'
 */
export const unpublish = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unpublish.url(args, options),
    method: 'post',
})

unpublish.definition = {
    methods: ["post"],
    url: '/courses/{course}/unpublish',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::unpublish
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:359
 * @route '/courses/{course}/unpublish'
 */
unpublish.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return unpublish.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::unpublish
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:359
 * @route '/courses/{course}/unpublish'
 */
unpublish.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unpublish.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::unpublish
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:359
 * @route '/courses/{course}/unpublish'
 */
    const unpublishForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: unpublish.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::unpublish
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:359
 * @route '/courses/{course}/unpublish'
 */
        unpublishForm.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: unpublish.url(args, options),
            method: 'post',
        })
    
    unpublish.form = unpublishForm
/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::archive
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:380
 * @route '/courses/{course}/archive'
 */
export const archive = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: archive.url(args, options),
    method: 'post',
})

archive.definition = {
    methods: ["post"],
    url: '/courses/{course}/archive',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::archive
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:380
 * @route '/courses/{course}/archive'
 */
archive.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return archive.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::archive
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:380
 * @route '/courses/{course}/archive'
 */
archive.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: archive.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::archive
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:380
 * @route '/courses/{course}/archive'
 */
    const archiveForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: archive.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::archive
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:380
 * @route '/courses/{course}/archive'
 */
        archiveForm.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: archive.url(args, options),
            method: 'post',
        })
    
    archive.form = archiveForm
const courses = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
modules: Object.assign(modules, modules),
enrollments: Object.assign(enrollments, enrollments),
selfEnroll: Object.assign(selfEnroll, selfEnroll),
attendanceSessions: Object.assign(attendanceSessions, attendanceSessions),
publish: Object.assign(publish, publish),
unpublish: Object.assign(unpublish, unpublish),
archive: Object.assign(archive, archive),
}

export default courses