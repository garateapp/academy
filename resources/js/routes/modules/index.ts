import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import progress from './progress'
import complete from './complete'
/**
* @see \App\Modules\Learning\Http\Controllers\ModuleViewController::show
 * @see app/Modules/Learning/Http/Controllers/ModuleViewController.php:15
 * @route '/modules/{module}'
 */
export const show = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/modules/{module}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\ModuleViewController::show
 * @see app/Modules/Learning/Http/Controllers/ModuleViewController.php:15
 * @route '/modules/{module}'
 */
show.url = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\ModuleViewController::show
 * @see app/Modules/Learning/Http/Controllers/ModuleViewController.php:15
 * @route '/modules/{module}'
 */
show.get = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\ModuleViewController::show
 * @see app/Modules/Learning/Http/Controllers/ModuleViewController.php:15
 * @route '/modules/{module}'
 */
show.head = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\ModuleViewController::show
 * @see app/Modules/Learning/Http/Controllers/ModuleViewController.php:15
 * @route '/modules/{module}'
 */
    const showForm = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\ModuleViewController::show
 * @see app/Modules/Learning/Http/Controllers/ModuleViewController.php:15
 * @route '/modules/{module}'
 */
        showForm.get = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\ModuleViewController::show
 * @see app/Modules/Learning/Http/Controllers/ModuleViewController.php:15
 * @route '/modules/{module}'
 */
        showForm.head = (args: { module: number | { id: number } } | [module: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const modules = {
    show: Object.assign(show, show),
progress: Object.assign(progress, progress),
complete: Object.assign(complete, complete),
}

export default modules