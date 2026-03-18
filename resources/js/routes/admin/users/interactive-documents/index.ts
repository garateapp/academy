import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Modules\Identity\Http\Controllers\UserController::receipt
 * @see app/Modules/Identity/Http/Controllers/UserController.php:179
 * @route '/admin/users/{user}/interactive-documents/{submission}/receipt'
 */
export const receipt = (args: { user: number | { id: number }, submission: number | { id: number } } | [user: number | { id: number }, submission: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})

receipt.definition = {
    methods: ["get","head"],
    url: '/admin/users/{user}/interactive-documents/{submission}/receipt',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Identity\Http\Controllers\UserController::receipt
 * @see app/Modules/Identity/Http/Controllers/UserController.php:179
 * @route '/admin/users/{user}/interactive-documents/{submission}/receipt'
 */
receipt.url = (args: { user: number | { id: number }, submission: number | { id: number } } | [user: number | { id: number }, submission: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                    submission: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                                submission: typeof args.submission === 'object'
                ? args.submission.id
                : args.submission,
                }

    return receipt.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace('{submission}', parsedArgs.submission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Identity\Http\Controllers\UserController::receipt
 * @see app/Modules/Identity/Http/Controllers/UserController.php:179
 * @route '/admin/users/{user}/interactive-documents/{submission}/receipt'
 */
receipt.get = (args: { user: number | { id: number }, submission: number | { id: number } } | [user: number | { id: number }, submission: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Identity\Http\Controllers\UserController::receipt
 * @see app/Modules/Identity/Http/Controllers/UserController.php:179
 * @route '/admin/users/{user}/interactive-documents/{submission}/receipt'
 */
receipt.head = (args: { user: number | { id: number }, submission: number | { id: number } } | [user: number | { id: number }, submission: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: receipt.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Identity\Http\Controllers\UserController::receipt
 * @see app/Modules/Identity/Http/Controllers/UserController.php:179
 * @route '/admin/users/{user}/interactive-documents/{submission}/receipt'
 */
    const receiptForm = (args: { user: number | { id: number }, submission: number | { id: number } } | [user: number | { id: number }, submission: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: receipt.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Identity\Http\Controllers\UserController::receipt
 * @see app/Modules/Identity/Http/Controllers/UserController.php:179
 * @route '/admin/users/{user}/interactive-documents/{submission}/receipt'
 */
        receiptForm.get = (args: { user: number | { id: number }, submission: number | { id: number } } | [user: number | { id: number }, submission: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Identity\Http\Controllers\UserController::receipt
 * @see app/Modules/Identity/Http/Controllers/UserController.php:179
 * @route '/admin/users/{user}/interactive-documents/{submission}/receipt'
 */
        receiptForm.head = (args: { user: number | { id: number }, submission: number | { id: number } } | [user: number | { id: number }, submission: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    receipt.form = receiptForm
const interactiveDocuments = {
    receipt: Object.assign(receipt, receipt),
}

export default interactiveDocuments