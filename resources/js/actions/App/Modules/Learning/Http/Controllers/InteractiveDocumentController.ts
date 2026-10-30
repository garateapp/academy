import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::open
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:27
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
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:27
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
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:27
 * @route '/modules/{module}/interactive-document/open'
 */
open.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: open.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::open
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:27
 * @route '/modules/{module}/interactive-document/open'
 */
    const openForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: open.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::open
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:27
 * @route '/modules/{module}/interactive-document/open'
 */
        openForm.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: open.url(args, options),
            method: 'post',
        })
    
    open.form = openForm
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::startNewAttempt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:146
 * @route '/modules/{module}/interactive-document/new-attempt'
 */
export const startNewAttempt = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: startNewAttempt.url(args, options),
    method: 'post',
})

startNewAttempt.definition = {
    methods: ["post"],
    url: '/modules/{module}/interactive-document/new-attempt',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::startNewAttempt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:146
 * @route '/modules/{module}/interactive-document/new-attempt'
 */
startNewAttempt.url = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return startNewAttempt.definition.url
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::startNewAttempt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:146
 * @route '/modules/{module}/interactive-document/new-attempt'
 */
startNewAttempt.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: startNewAttempt.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::startNewAttempt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:146
 * @route '/modules/{module}/interactive-document/new-attempt'
 */
    const startNewAttemptForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: startNewAttempt.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::startNewAttempt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:146
 * @route '/modules/{module}/interactive-document/new-attempt'
 */
        startNewAttemptForm.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: startNewAttempt.url(args, options),
            method: 'post',
        })
    
    startNewAttempt.form = startNewAttemptForm
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::saveDraft
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:110
 * @route '/modules/{module}/interactive-document/draft'
 */
export const saveDraft = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveDraft.url(args, options),
    method: 'post',
})

saveDraft.definition = {
    methods: ["post"],
    url: '/modules/{module}/interactive-document/draft',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::saveDraft
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:110
 * @route '/modules/{module}/interactive-document/draft'
 */
saveDraft.url = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return saveDraft.definition.url
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::saveDraft
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:110
 * @route '/modules/{module}/interactive-document/draft'
 */
saveDraft.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveDraft.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::saveDraft
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:110
 * @route '/modules/{module}/interactive-document/draft'
 */
    const saveDraftForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: saveDraft.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::saveDraft
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:110
 * @route '/modules/{module}/interactive-document/draft'
 */
        saveDraftForm.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: saveDraft.url(args, options),
            method: 'post',
        })
    
    saveDraft.form = saveDraftForm
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::submit
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:46
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
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:46
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
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:46
 * @route '/modules/{module}/interactive-document/submit'
 */
submit.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::submit
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:46
 * @route '/modules/{module}/interactive-document/submit'
 */
    const submitForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::submit
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:46
 * @route '/modules/{module}/interactive-document/submit'
 */
        submitForm.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:170
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
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:170
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
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:170
 * @route '/modules/{module}/interactive-document/receipt'
 */
receipt.get = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:170
 * @route '/modules/{module}/interactive-document/receipt'
 */
receipt.head = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: receipt.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:170
 * @route '/modules/{module}/interactive-document/receipt'
 */
    const receiptForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: receipt.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:170
 * @route '/modules/{module}/interactive-document/receipt'
 */
        receiptForm.get = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::receipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:170
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
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminIndex
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:200
 * @route '/admin/interactive-documents'
 */
export const adminIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})

adminIndex.definition = {
    methods: ["get","head"],
    url: '/admin/interactive-documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminIndex
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:200
 * @route '/admin/interactive-documents'
 */
adminIndex.url = (options?: RouteQueryOptions) => {
    return adminIndex.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminIndex
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:200
 * @route '/admin/interactive-documents'
 */
adminIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminIndex
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:200
 * @route '/admin/interactive-documents'
 */
adminIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminIndex
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:200
 * @route '/admin/interactive-documents'
 */
    const adminIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminIndex
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:200
 * @route '/admin/interactive-documents'
 */
        adminIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminIndex
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:200
 * @route '/admin/interactive-documents'
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
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminReceipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:246
 * @route '/admin/interactive-documents/{submission}/download'
 */
export const adminReceipt = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminReceipt.url(args, options),
    method: 'get',
})

adminReceipt.definition = {
    methods: ["get","head"],
    url: '/admin/interactive-documents/{submission}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminReceipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:246
 * @route '/admin/interactive-documents/{submission}/download'
 */
adminReceipt.url = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { submission: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { submission: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    submission: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        submission: typeof args.submission === 'object'
                ? args.submission.id
                : args.submission,
                }

    return adminReceipt.definition.url
            .replace('{submission}', parsedArgs.submission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminReceipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:246
 * @route '/admin/interactive-documents/{submission}/download'
 */
adminReceipt.get = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminReceipt.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminReceipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:246
 * @route '/admin/interactive-documents/{submission}/download'
 */
adminReceipt.head = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminReceipt.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminReceipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:246
 * @route '/admin/interactive-documents/{submission}/download'
 */
    const adminReceiptForm = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminReceipt.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminReceipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:246
 * @route '/admin/interactive-documents/{submission}/download'
 */
        adminReceiptForm.get = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminReceipt.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::adminReceipt
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:246
 * @route '/admin/interactive-documents/{submission}/download'
 */
        adminReceiptForm.head = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminReceipt.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminReceipt.form = adminReceiptForm
const InteractiveDocumentController = { open, startNewAttempt, saveDraft, submit, receipt, adminIndex, adminReceipt }

export default InteractiveDocumentController