import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::adminIndex
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
export const adminIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})

adminIndex.definition = {
    methods: ["get","head"],
    url: '/admin/assessment-results',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::adminIndex
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
adminIndex.url = (options?: RouteQueryOptions) => {
    return adminIndex.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::adminIndex
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
adminIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::adminIndex
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
adminIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::adminIndex
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
    const adminIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::adminIndex
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
        adminIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::adminIndex
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
        adminIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminIndex.form = adminIndexForm
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::start
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:20
 * @route '/assessments/{assessment}/start'
 */
export const start = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

start.definition = {
    methods: ["post"],
    url: '/assessments/{assessment}/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::start
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:20
 * @route '/assessments/{assessment}/start'
 */
start.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return start.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::start
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:20
 * @route '/assessments/{assessment}/start'
 */
start.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::start
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:20
 * @route '/assessments/{assessment}/start'
 */
    const startForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: start.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::start
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:20
 * @route '/assessments/{assessment}/start'
 */
        startForm.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: start.url(args, options),
            method: 'post',
        })
    
    start.form = startForm
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::take
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:48
 * @route '/assessments/{assessment}/attempts/{attempt}'
 */
export const take = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: take.url(args, options),
    method: 'get',
})

take.definition = {
    methods: ["get","head"],
    url: '/assessments/{assessment}/attempts/{attempt}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::take
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:48
 * @route '/assessments/{assessment}/attempts/{attempt}'
 */
take.url = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                    attempt: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                                attempt: typeof args.attempt === 'object'
                ? args.attempt.id
                : args.attempt,
                }

    return take.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace('{attempt}', parsedArgs.attempt.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::take
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:48
 * @route '/assessments/{assessment}/attempts/{attempt}'
 */
take.get = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: take.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::take
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:48
 * @route '/assessments/{assessment}/attempts/{attempt}'
 */
take.head = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: take.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::take
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:48
 * @route '/assessments/{assessment}/attempts/{attempt}'
 */
    const takeForm = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: take.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::take
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:48
 * @route '/assessments/{assessment}/attempts/{attempt}'
 */
        takeForm.get = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: take.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::take
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:48
 * @route '/assessments/{assessment}/attempts/{attempt}'
 */
        takeForm.head = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: take.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    take.form = takeForm
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::submitResponse
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:114
 * @route '/assessments/{assessment}/attempts/{attempt}/response'
 */
export const submitResponse = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitResponse.url(args, options),
    method: 'post',
})

submitResponse.definition = {
    methods: ["post"],
    url: '/assessments/{assessment}/attempts/{attempt}/response',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::submitResponse
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:114
 * @route '/assessments/{assessment}/attempts/{attempt}/response'
 */
submitResponse.url = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                    attempt: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                                attempt: typeof args.attempt === 'object'
                ? args.attempt.id
                : args.attempt,
                }

    return submitResponse.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace('{attempt}', parsedArgs.attempt.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::submitResponse
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:114
 * @route '/assessments/{assessment}/attempts/{attempt}/response'
 */
submitResponse.post = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitResponse.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::submitResponse
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:114
 * @route '/assessments/{assessment}/attempts/{attempt}/response'
 */
    const submitResponseForm = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submitResponse.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::submitResponse
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:114
 * @route '/assessments/{assessment}/attempts/{attempt}/response'
 */
        submitResponseForm.post = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submitResponse.url(args, options),
            method: 'post',
        })
    
    submitResponse.form = submitResponseForm
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::acknowledge
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:85
 * @route '/assessments/{assessment}/attempts/{attempt}/acknowledge'
 */
export const acknowledge = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acknowledge.url(args, options),
    method: 'post',
})

acknowledge.definition = {
    methods: ["post"],
    url: '/assessments/{assessment}/attempts/{attempt}/acknowledge',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::acknowledge
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:85
 * @route '/assessments/{assessment}/attempts/{attempt}/acknowledge'
 */
acknowledge.url = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                    attempt: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                                attempt: typeof args.attempt === 'object'
                ? args.attempt.id
                : args.attempt,
                }

    return acknowledge.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace('{attempt}', parsedArgs.attempt.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::acknowledge
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:85
 * @route '/assessments/{assessment}/attempts/{attempt}/acknowledge'
 */
acknowledge.post = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acknowledge.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::acknowledge
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:85
 * @route '/assessments/{assessment}/attempts/{attempt}/acknowledge'
 */
    const acknowledgeForm = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: acknowledge.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::acknowledge
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:85
 * @route '/assessments/{assessment}/attempts/{attempt}/acknowledge'
 */
        acknowledgeForm.post = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: acknowledge.url(args, options),
            method: 'post',
        })
    
    acknowledge.form = acknowledgeForm
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::submit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:142
 * @route '/assessments/{assessment}/attempts/{attempt}/submit'
 */
export const submit = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/assessments/{assessment}/attempts/{attempt}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::submit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:142
 * @route '/assessments/{assessment}/attempts/{attempt}/submit'
 */
submit.url = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                    attempt: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                                attempt: typeof args.attempt === 'object'
                ? args.attempt.id
                : args.attempt,
                }

    return submit.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace('{attempt}', parsedArgs.attempt.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::submit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:142
 * @route '/assessments/{assessment}/attempts/{attempt}/submit'
 */
submit.post = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::submit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:142
 * @route '/assessments/{assessment}/attempts/{attempt}/submit'
 */
    const submitForm = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::submit
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:142
 * @route '/assessments/{assessment}/attempts/{attempt}/submit'
 */
        submitForm.post = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::results
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:161
 * @route '/assessments/{assessment}/attempts/{attempt}/results'
 */
export const results = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: results.url(args, options),
    method: 'get',
})

results.definition = {
    methods: ["get","head"],
    url: '/assessments/{assessment}/attempts/{attempt}/results',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::results
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:161
 * @route '/assessments/{assessment}/attempts/{attempt}/results'
 */
results.url = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                    attempt: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                                attempt: typeof args.attempt === 'object'
                ? args.attempt.id
                : args.attempt,
                }

    return results.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace('{attempt}', parsedArgs.attempt.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::results
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:161
 * @route '/assessments/{assessment}/attempts/{attempt}/results'
 */
results.get = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: results.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::results
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:161
 * @route '/assessments/{assessment}/attempts/{attempt}/results'
 */
results.head = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: results.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::results
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:161
 * @route '/assessments/{assessment}/attempts/{attempt}/results'
 */
    const resultsForm = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: results.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::results
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:161
 * @route '/assessments/{assessment}/attempts/{attempt}/results'
 */
        resultsForm.get = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: results.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::results
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:161
 * @route '/assessments/{assessment}/attempts/{attempt}/results'
 */
        resultsForm.head = (args: { assessment: number | { id: number }, attempt: number | { id: number } } | [assessment: number | { id: number }, attempt: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: results.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    results.form = resultsForm
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:182
 * @route '/my-assessments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/my-assessments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:182
 * @route '/my-assessments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:182
 * @route '/my-assessments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:182
 * @route '/my-assessments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:182
 * @route '/my-assessments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:182
 * @route '/my-assessments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:182
 * @route '/my-assessments'
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
const AssessmentAttemptController = { adminIndex, start, take, submitResponse, acknowledge, submit, results, index }

export default AssessmentAttemptController