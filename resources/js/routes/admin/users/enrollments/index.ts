import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Modules\Identity\Http\Controllers\UserController::store
 * @see app/Modules/Identity/Http/Controllers/UserController.php:195
 * @route '/admin/users/{user}/enrollments'
 */
export const store = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/users/{user}/enrollments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Identity\Http\Controllers\UserController::store
 * @see app/Modules/Identity/Http/Controllers/UserController.php:195
 * @route '/admin/users/{user}/enrollments'
 */
store.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return store.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Identity\Http\Controllers\UserController::store
 * @see app/Modules/Identity/Http/Controllers/UserController.php:195
 * @route '/admin/users/{user}/enrollments'
 */
store.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Identity\Http\Controllers\UserController::store
 * @see app/Modules/Identity/Http/Controllers/UserController.php:195
 * @route '/admin/users/{user}/enrollments'
 */
    const storeForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Identity\Http\Controllers\UserController::store
 * @see app/Modules/Identity/Http/Controllers/UserController.php:195
 * @route '/admin/users/{user}/enrollments'
 */
        storeForm.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const enrollments = {
    store: Object.assign(store, store),
}

export default enrollments