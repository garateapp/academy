import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::index
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/my-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::index
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::index
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::index
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::index
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::index
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::index
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
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
const LearningHistoryController = { index }

export default LearningHistoryController