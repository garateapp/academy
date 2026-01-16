import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:25
 * @route '/admin/assessments/{assessment}/questions/create'
 */
export const create = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/assessments/{assessment}/questions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:25
 * @route '/admin/assessments/{assessment}/questions/create'
 */
create.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:25
 * @route '/admin/assessments/{assessment}/questions/create'
 */
create.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:25
 * @route '/admin/assessments/{assessment}/questions/create'
 */
create.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:25
 * @route '/admin/assessments/{assessment}/questions/create'
 */
    const createForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:25
 * @route '/admin/assessments/{assessment}/questions/create'
 */
        createForm.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::create
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:25
 * @route '/admin/assessments/{assessment}/questions/create'
 */
        createForm.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::store
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:34
 * @route '/admin/assessments/{assessment}/questions'
 */
export const store = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/assessments/{assessment}/questions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::store
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:34
 * @route '/admin/assessments/{assessment}/questions'
 */
store.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::store
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:34
 * @route '/admin/assessments/{assessment}/questions'
 */
store.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::store
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:34
 * @route '/admin/assessments/{assessment}/questions'
 */
    const storeForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::store
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:34
 * @route '/admin/assessments/{assessment}/questions'
 */
        storeForm.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::bulkUpload
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:218
 * @route '/admin/assessments/{assessment}/questions/bulk'
 */
export const bulkUpload = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpload.url(args, options),
    method: 'post',
})

bulkUpload.definition = {
    methods: ["post"],
    url: '/admin/assessments/{assessment}/questions/bulk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::bulkUpload
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:218
 * @route '/admin/assessments/{assessment}/questions/bulk'
 */
bulkUpload.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return bulkUpload.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::bulkUpload
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:218
 * @route '/admin/assessments/{assessment}/questions/bulk'
 */
bulkUpload.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpload.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::bulkUpload
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:218
 * @route '/admin/assessments/{assessment}/questions/bulk'
 */
    const bulkUploadForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkUpload.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::bulkUpload
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:218
 * @route '/admin/assessments/{assessment}/questions/bulk'
 */
        bulkUploadForm.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkUpload.url(args, options),
            method: 'post',
        })
    
    bulkUpload.form = bulkUploadForm
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::downloadTemplate
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:171
 * @route '/admin/assessments/{assessment}/questions/template'
 */
export const downloadTemplate = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(args, options),
    method: 'get',
})

downloadTemplate.definition = {
    methods: ["get","head"],
    url: '/admin/assessments/{assessment}/questions/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::downloadTemplate
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:171
 * @route '/admin/assessments/{assessment}/questions/template'
 */
downloadTemplate.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return downloadTemplate.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::downloadTemplate
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:171
 * @route '/admin/assessments/{assessment}/questions/template'
 */
downloadTemplate.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::downloadTemplate
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:171
 * @route '/admin/assessments/{assessment}/questions/template'
 */
downloadTemplate.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadTemplate.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::downloadTemplate
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:171
 * @route '/admin/assessments/{assessment}/questions/template'
 */
    const downloadTemplateForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadTemplate.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::downloadTemplate
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:171
 * @route '/admin/assessments/{assessment}/questions/template'
 */
        downloadTemplateForm.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::downloadTemplate
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:171
 * @route '/admin/assessments/{assessment}/questions/template'
 */
        downloadTemplateForm.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadTemplate.form = downloadTemplateForm
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:74
 * @route '/admin/assessments/{assessment}/questions/{question}/edit'
 */
export const edit = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/assessments/{assessment}/questions/{question}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:74
 * @route '/admin/assessments/{assessment}/questions/{question}/edit'
 */
edit.url = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                    question: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                                question: typeof args.question === 'object'
                ? args.question.id
                : args.question,
                }

    return edit.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace('{question}', parsedArgs.question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:74
 * @route '/admin/assessments/{assessment}/questions/{question}/edit'
 */
edit.get = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:74
 * @route '/admin/assessments/{assessment}/questions/{question}/edit'
 */
edit.head = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:74
 * @route '/admin/assessments/{assessment}/questions/{question}/edit'
 */
    const editForm = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:74
 * @route '/admin/assessments/{assessment}/questions/{question}/edit'
 */
        editForm.get = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::edit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:74
 * @route '/admin/assessments/{assessment}/questions/{question}/edit'
 */
        editForm.head = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:86
 * @route '/admin/assessments/{assessment}/questions/{question}'
 */
export const update = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/assessments/{assessment}/questions/{question}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:86
 * @route '/admin/assessments/{assessment}/questions/{question}'
 */
update.url = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                    question: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                                question: typeof args.question === 'object'
                ? args.question.id
                : args.question,
                }

    return update.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace('{question}', parsedArgs.question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:86
 * @route '/admin/assessments/{assessment}/questions/{question}'
 */
update.put = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:86
 * @route '/admin/assessments/{assessment}/questions/{question}'
 */
    const updateForm = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::update
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:86
 * @route '/admin/assessments/{assessment}/questions/{question}'
 */
        updateForm.put = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::destroy
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:131
 * @route '/admin/assessments/{assessment}/questions/{question}'
 */
export const destroy = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/assessments/{assessment}/questions/{question}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::destroy
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:131
 * @route '/admin/assessments/{assessment}/questions/{question}'
 */
destroy.url = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                    question: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                                question: typeof args.question === 'object'
                ? args.question.id
                : args.question,
                }

    return destroy.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace('{question}', parsedArgs.question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::destroy
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:131
 * @route '/admin/assessments/{assessment}/questions/{question}'
 */
destroy.delete = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::destroy
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:131
 * @route '/admin/assessments/{assessment}/questions/{question}'
 */
    const destroyForm = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::destroy
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:131
 * @route '/admin/assessments/{assessment}/questions/{question}'
 */
        destroyForm.delete = (args: { assessment: number | { id: number }, question: number | { id: number } } | [assessment: number | { id: number }, question: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::reorder
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:155
 * @route '/admin/assessments/{assessment}/questions/reorder'
 */
export const reorder = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(args, options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/admin/assessments/{assessment}/questions/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::reorder
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:155
 * @route '/admin/assessments/{assessment}/questions/reorder'
 */
reorder.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reorder.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::reorder
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:155
 * @route '/admin/assessments/{assessment}/questions/reorder'
 */
reorder.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::reorder
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:155
 * @route '/admin/assessments/{assessment}/questions/reorder'
 */
    const reorderForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentQuestionController::reorder
 * @see app/Modules/Assessment/Http/Controllers/AssessmentQuestionController.php:155
 * @route '/admin/assessments/{assessment}/questions/reorder'
 */
        reorderForm.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(args, options),
            method: 'post',
        })
    
    reorder.form = reorderForm
const AssessmentQuestionController = { create, store, bulkUpload, downloadTemplate, edit, update, destroy, reorder }

export default AssessmentQuestionController