import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::store
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:15
 * @route '/courses/{course}/attendance-sessions'
 */
export const store = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/courses/{course}/attendance-sessions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::store
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:15
 * @route '/courses/{course}/attendance-sessions'
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
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::store
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:15
 * @route '/courses/{course}/attendance-sessions'
 */
store.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::store
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:15
 * @route '/courses/{course}/attendance-sessions'
 */
    const storeForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::store
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:15
 * @route '/courses/{course}/attendance-sessions'
 */
        storeForm.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::roster
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:35
 * @route '/courses/{course}/attendance-sessions/{session}/roster'
 */
export const roster = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: roster.url(args, options),
    method: 'post',
})

roster.definition = {
    methods: ["post"],
    url: '/courses/{course}/attendance-sessions/{session}/roster',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::roster
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:35
 * @route '/courses/{course}/attendance-sessions/{session}/roster'
 */
roster.url = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                    session: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                                session: typeof args.session === 'object'
                ? args.session.id
                : args.session,
                }

    return roster.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::roster
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:35
 * @route '/courses/{course}/attendance-sessions/{session}/roster'
 */
roster.post = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: roster.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::roster
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:35
 * @route '/courses/{course}/attendance-sessions/{session}/roster'
 */
    const rosterForm = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: roster.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::roster
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:35
 * @route '/courses/{course}/attendance-sessions/{session}/roster'
 */
        rosterForm.post = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: roster.url(args, options),
            method: 'post',
        })
    
    roster.form = rosterForm
/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::records
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:63
 * @route '/courses/{course}/attendance-sessions/{session}/records'
 */
export const records = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: records.url(args, options),
    method: 'post',
})

records.definition = {
    methods: ["post"],
    url: '/courses/{course}/attendance-sessions/{session}/records',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::records
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:63
 * @route '/courses/{course}/attendance-sessions/{session}/records'
 */
records.url = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                    session: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                                session: typeof args.session === 'object'
                ? args.session.id
                : args.session,
                }

    return records.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::records
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:63
 * @route '/courses/{course}/attendance-sessions/{session}/records'
 */
records.post = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: records.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::records
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:63
 * @route '/courses/{course}/attendance-sessions/{session}/records'
 */
    const recordsForm = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: records.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::records
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:63
 * @route '/courses/{course}/attendance-sessions/{session}/records'
 */
        recordsForm.post = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: records.url(args, options),
            method: 'post',
        })
    
    records.form = recordsForm
const attendanceSessions = {
    store: Object.assign(store, store),
roster: Object.assign(roster, roster),
records: Object.assign(records, records),
}

export default attendanceSessions