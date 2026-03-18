import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::open
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:23
 * @route '/modules/{module}/interactive-document/open'
 */
export const open = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: open.url(args, options),
    method: 'post',
})

open.definition = {
    methods: ["post"],
    url: '/modules/{module}/interactive-document/open',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::open
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:23
 * @route '/modules/{module}/interactive-document/open'
 */
open.url = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { module: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { module: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    module: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        module: typeof args.module === 'object'
                ? args.module.id
                : args.module,
                }

    return open.definition.url
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::open
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:23
 * @route '/modules/{module}/interactive-document/open'
 */
open.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: open.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::open
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:23
 * @route '/modules/{module}/interactive-document/open'
 */
    const openForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: open.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::open
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:23
 * @route '/modules/{module}/interactive-document/open'
 */
        openForm.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: open.url(args, options),
            method: 'post',
        })
    
    open.form = openForm
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::newAttempt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:116
 * @route '/modules/{module}/interactive-document/new-attempt'
 */
export const newAttempt = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: newAttempt.url(args, options),
    method: 'post',
})

newAttempt.definition = {
    methods: ["post"],
    url: '/modules/{module}/interactive-document/new-attempt',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::newAttempt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:116
 * @route '/modules/{module}/interactive-document/new-attempt'
 */
newAttempt.url = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { module: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { module: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    module: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        module: typeof args.module === 'object'
                ? args.module.id
                : args.module,
                }

    return newAttempt.definition.url
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::newAttempt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:116
 * @route '/modules/{module}/interactive-document/new-attempt'
 */
newAttempt.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: newAttempt.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::newAttempt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:116
 * @route '/modules/{module}/interactive-document/new-attempt'
 */
    const newAttemptForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: newAttempt.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::newAttempt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:116
 * @route '/modules/{module}/interactive-document/new-attempt'
 */
        newAttemptForm.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: newAttempt.url(args, options),
            method: 'post',
        })
    
    newAttempt.form = newAttemptForm
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::draft
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:80
 * @route '/modules/{module}/interactive-document/draft'
 */
export const draft = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: draft.url(args, options),
    method: 'post',
})

draft.definition = {
    methods: ["post"],
    url: '/modules/{module}/interactive-document/draft',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::draft
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:80
 * @route '/modules/{module}/interactive-document/draft'
 */
draft.url = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { module: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { module: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    module: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        module: typeof args.module === 'object'
                ? args.module.id
                : args.module,
                }

    return draft.definition.url
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::draft
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:80
 * @route '/modules/{module}/interactive-document/draft'
 */
draft.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: draft.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::draft
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:80
 * @route '/modules/{module}/interactive-document/draft'
 */
    const draftForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: draft.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::draft
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:80
 * @route '/modules/{module}/interactive-document/draft'
 */
        draftForm.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: draft.url(args, options),
            method: 'post',
        })
    
    draft.form = draftForm
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::submit
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:42
 * @route '/modules/{module}/interactive-document/submit'
 */
export const submit = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/modules/{module}/interactive-document/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::submit
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:42
 * @route '/modules/{module}/interactive-document/submit'
 */
submit.url = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { module: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { module: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    module: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        module: typeof args.module === 'object'
                ? args.module.id
                : args.module,
                }

    return submit.definition.url
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::submit
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:42
 * @route '/modules/{module}/interactive-document/submit'
 */
submit.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::submit
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:42
 * @route '/modules/{module}/interactive-document/submit'
 */
    const submitForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::submit
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:42
 * @route '/modules/{module}/interactive-document/submit'
 */
        submitForm.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:140
 * @route '/modules/{module}/interactive-document/receipt'
 */
export const receipt = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})

receipt.definition = {
    methods: ["get","head"],
    url: '/modules/{module}/interactive-document/receipt',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:140
 * @route '/modules/{module}/interactive-document/receipt'
 */
receipt.url = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { module: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { module: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    module: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        module: typeof args.module === 'object'
                ? args.module.id
                : args.module,
                }

    return receipt.definition.url
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:140
 * @route '/modules/{module}/interactive-document/receipt'
 */
receipt.get = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:140
 * @route '/modules/{module}/interactive-document/receipt'
 */
receipt.head = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: receipt.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:140
 * @route '/modules/{module}/interactive-document/receipt'
 */
    const receiptForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: receipt.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:140
 * @route '/modules/{module}/interactive-document/receipt'
 */
        receiptForm.get = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:140
 * @route '/modules/{module}/interactive-document/receipt'
 */
        receiptForm.head = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    receipt.form = receiptForm
const interactiveDocument = {
    open: Object.assign(open, open),
newAttempt: Object.assign(newAttempt, newAttempt),
draft: Object.assign(draft, draft),
submit: Object.assign(submit, submit),
receipt: Object.assign(receipt, receipt),
}

export default interactiveDocument