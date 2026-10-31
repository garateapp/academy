import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::index
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:225
 * @route '/admin/interactive-documents'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/interactive-documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::index
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:225
 * @route '/admin/interactive-documents'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::index
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:225
 * @route '/admin/interactive-documents'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::index
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:225
 * @route '/admin/interactive-documents'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::index
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:225
 * @route '/admin/interactive-documents'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::index
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:225
 * @route '/admin/interactive-documents'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::index
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:225
 * @route '/admin/interactive-documents'
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
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::download
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:271
 * @route '/admin/interactive-documents/{submission}/download'
 */
export const download = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/interactive-documents/{submission}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::download
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:271
 * @route '/admin/interactive-documents/{submission}/download'
 */
download.url = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return download.definition.url
            .replace('{submission}', parsedArgs.submission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::download
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:271
 * @route '/admin/interactive-documents/{submission}/download'
 */
download.get = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::download
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:271
 * @route '/admin/interactive-documents/{submission}/download'
 */
download.head = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::download
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:271
 * @route '/admin/interactive-documents/{submission}/download'
 */
    const downloadForm = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::download
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:271
 * @route '/admin/interactive-documents/{submission}/download'
 */
        downloadForm.get = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\InteractiveDocumentController::download
 * @see app/Modules/Learning/Http/Controllers/InteractiveDocumentController.php:271
 * @route '/admin/interactive-documents/{submission}/download'
 */
        downloadForm.head = (args: { submission: number | { id: number } } | [submission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const interactiveDocuments = {
    index: Object.assign(index, index),
download: Object.assign(download, download),
}

export default interactiveDocuments