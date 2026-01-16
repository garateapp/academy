import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/assessment-results',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Assessment\Http\Controllers\AssessmentAttemptController::index
 * @see app/Modules/Assessment/Http/Controllers/AssessmentAttemptController.php:196
 * @route '/admin/assessment-results'
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
const results = {
    index: Object.assign(index, index),
}

export default results