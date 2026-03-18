import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::store
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:459
 * @route '/courses/{course}/enrollments'
 */
export const store = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/courses/{course}/enrollments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::store
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:459
 * @route '/courses/{course}/enrollments'
 */
store.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return store.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseController::store
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:459
 * @route '/courses/{course}/enrollments'
 */
store.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::store
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:459
 * @route '/courses/{course}/enrollments'
 */
    const storeForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseController::store
 * @see app/Modules/Learning/Http/Controllers/CourseController.php:459
 * @route '/courses/{course}/enrollments'
 */
        storeForm.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const enrollments = {
    store: Object.assign(store, store),
}

export default enrollments