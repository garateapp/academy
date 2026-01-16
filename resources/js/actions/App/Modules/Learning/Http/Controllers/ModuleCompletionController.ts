import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\ModuleCompletionController::store
 * @see app/Modules/Learning/Http/Controllers/ModuleCompletionController.php:15
 * @route '/modules/{module}/complete'
 */
export const store = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/modules/{module}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\ModuleCompletionController::store
 * @see app/Modules/Learning/Http/Controllers/ModuleCompletionController.php:15
 * @route '/modules/{module}/complete'
 */
store.url = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\ModuleCompletionController::store
 * @see app/Modules/Learning/Http/Controllers/ModuleCompletionController.php:15
 * @route '/modules/{module}/complete'
 */
store.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\ModuleCompletionController::store
 * @see app/Modules/Learning/Http/Controllers/ModuleCompletionController.php:15
 * @route '/modules/{module}/complete'
 */
    const storeForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\ModuleCompletionController::store
 * @see app/Modules/Learning/Http/Controllers/ModuleCompletionController.php:15
 * @route '/modules/{module}/complete'
 */
        storeForm.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const ModuleCompletionController = { store }

export default ModuleCompletionController