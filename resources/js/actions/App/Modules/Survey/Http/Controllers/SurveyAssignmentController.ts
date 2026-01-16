import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Survey\Http\Controllers\SurveyAssignmentController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyAssignmentController.php:18
 * @route '/admin/surveys/{survey}/assignments'
 */
export const store = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/surveys/{survey}/assignments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyAssignmentController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyAssignmentController.php:18
 * @route '/admin/surveys/{survey}/assignments'
 */
store.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { survey: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { survey: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    survey: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        survey: typeof args.survey === 'object'
                ? args.survey.id
                : args.survey,
                }

    return store.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Survey\Http\Controllers\SurveyAssignmentController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyAssignmentController.php:18
 * @route '/admin/surveys/{survey}/assignments'
 */
store.post = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Survey\Http\Controllers\SurveyAssignmentController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyAssignmentController.php:18
 * @route '/admin/surveys/{survey}/assignments'
 */
    const storeForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Survey\Http\Controllers\SurveyAssignmentController::store
 * @see app/Modules/Survey/Http/Controllers/SurveyAssignmentController.php:18
 * @route '/admin/surveys/{survey}/assignments'
 */
        storeForm.post = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const SurveyAssignmentController = { store }

export default SurveyAssignmentController