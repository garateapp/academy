import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::history
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/my-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::history
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::history
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::history
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::history
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
    const historyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::history
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
        historyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\LearningHistoryController::history
 * @see app/Modules/Learning/Http/Controllers/LearningHistoryController.php:15
 * @route '/my-history'
 */
        historyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
const learning = {
    history: Object.assign(history, history),
}

export default learning