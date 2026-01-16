import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::store
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:20
 * @route '/courses/{course}/modules'
 */
export const store = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/courses/{course}/modules',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::store
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:20
 * @route '/courses/{course}/modules'
 */
store.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::store
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:20
 * @route '/courses/{course}/modules'
 */
store.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::store
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:20
 * @route '/courses/{course}/modules'
 */
    const storeForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::store
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:20
 * @route '/courses/{course}/modules'
 */
        storeForm.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::update
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:40
 * @route '/courses/{course}/modules/{module}'
 */
export const update = (args: { course: number | { id: number }, module: number | { id: number } } | [course: number | { id: number }, module: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/courses/{course}/modules/{module}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::update
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:40
 * @route '/courses/{course}/modules/{module}'
 */
update.url = (args: { course: number | { id: number }, module: number | { id: number } } | [course: number | { id: number }, module: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                    module: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                                module: typeof args.module === 'object'
                ? args.module.id
                : args.module,
                }

    return update.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::update
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:40
 * @route '/courses/{course}/modules/{module}'
 */
update.put = (args: { course: number | { id: number }, module: number | { id: number } } | [course: number | { id: number }, module: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::update
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:40
 * @route '/courses/{course}/modules/{module}'
 */
    const updateForm = (args: { course: number | { id: number }, module: number | { id: number } } | [course: number | { id: number }, module: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::update
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:40
 * @route '/courses/{course}/modules/{module}'
 */
        updateForm.put = (args: { course: number | { id: number }, module: number | { id: number } } | [course: number | { id: number }, module: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::destroy
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:62
 * @route '/courses/{course}/modules/{module}'
 */
export const destroy = (args: { course: number | { id: number }, module: number | { id: number } } | [course: number | { id: number }, module: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/courses/{course}/modules/{module}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::destroy
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:62
 * @route '/courses/{course}/modules/{module}'
 */
destroy.url = (args: { course: number | { id: number }, module: number | { id: number } } | [course: number | { id: number }, module: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                    module: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                                module: typeof args.module === 'object'
                ? args.module.id
                : args.module,
                }

    return destroy.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::destroy
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:62
 * @route '/courses/{course}/modules/{module}'
 */
destroy.delete = (args: { course: number | { id: number }, module: number | { id: number } } | [course: number | { id: number }, module: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::destroy
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:62
 * @route '/courses/{course}/modules/{module}'
 */
    const destroyForm = (args: { course: number | { id: number }, module: number | { id: number } } | [course: number | { id: number }, module: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::destroy
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:62
 * @route '/courses/{course}/modules/{module}'
 */
        destroyForm.delete = (args: { course: number | { id: number }, module: number | { id: number } } | [course: number | { id: number }, module: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::reorder
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:83
 * @route '/courses/{course}/modules/reorder'
 */
export const reorder = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(args, options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/courses/{course}/modules/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::reorder
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:83
 * @route '/courses/{course}/modules/reorder'
 */
reorder.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reorder.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::reorder
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:83
 * @route '/courses/{course}/modules/reorder'
 */
reorder.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::reorder
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:83
 * @route '/courses/{course}/modules/reorder'
 */
    const reorderForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseModuleController::reorder
 * @see app/Modules/Learning/Http/Controllers/CourseModuleController.php:83
 * @route '/courses/{course}/modules/reorder'
 */
        reorderForm.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(args, options),
            method: 'post',
        })
    
    reorder.form = reorderForm
const CourseModuleController = { store, update, destroy, reorder }

export default CourseModuleController