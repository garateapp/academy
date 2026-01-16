import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\ModuleProgressController::store
 * @see app/Modules/Learning/Http/Controllers/ModuleProgressController.php:16
 * @route '/modules/{module}/progress'
 */
export const store = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/modules/{module}/progress',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\ModuleProgressController::store
 * @see app/Modules/Learning/Http/Controllers/ModuleProgressController.php:16
 * @route '/modules/{module}/progress'
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
* @see \App\Modules\Learning\Http\Controllers\ModuleProgressController::store
 * @see app/Modules/Learning/Http/Controllers/ModuleProgressController.php:16
 * @route '/modules/{module}/progress'
 */
store.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\ModuleProgressController::store
 * @see app/Modules/Learning/Http/Controllers/ModuleProgressController.php:16
 * @route '/modules/{module}/progress'
 */
    const storeForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\ModuleProgressController::store
 * @see app/Modules/Learning/Http/Controllers/ModuleProgressController.php:16
 * @route '/modules/{module}/progress'
 */
        storeForm.post = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const ModuleProgressController = { store }

export default ModuleProgressController