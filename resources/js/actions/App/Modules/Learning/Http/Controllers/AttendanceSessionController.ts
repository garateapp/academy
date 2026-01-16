import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::uploadRoster
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:35
 * @route '/courses/{course}/attendance-sessions/{session}/roster'
 */
export const uploadRoster = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadRoster.url(args, options),
    method: 'post',
})

uploadRoster.definition = {
    methods: ["post"],
    url: '/courses/{course}/attendance-sessions/{session}/roster',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::uploadRoster
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:35
 * @route '/courses/{course}/attendance-sessions/{session}/roster'
 */
uploadRoster.url = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return uploadRoster.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::uploadRoster
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:35
 * @route '/courses/{course}/attendance-sessions/{session}/roster'
 */
uploadRoster.post = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadRoster.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::uploadRoster
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:35
 * @route '/courses/{course}/attendance-sessions/{session}/roster'
 */
    const uploadRosterForm = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadRoster.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::uploadRoster
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:35
 * @route '/courses/{course}/attendance-sessions/{session}/roster'
 */
        uploadRosterForm.post = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadRoster.url(args, options),
            method: 'post',
        })
    
    uploadRoster.form = uploadRosterForm
/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::storeRecords
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:63
 * @route '/courses/{course}/attendance-sessions/{session}/records'
 */
export const storeRecords = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRecords.url(args, options),
    method: 'post',
})

storeRecords.definition = {
    methods: ["post"],
    url: '/courses/{course}/attendance-sessions/{session}/records',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::storeRecords
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:63
 * @route '/courses/{course}/attendance-sessions/{session}/records'
 */
storeRecords.url = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return storeRecords.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::storeRecords
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:63
 * @route '/courses/{course}/attendance-sessions/{session}/records'
 */
storeRecords.post = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRecords.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::storeRecords
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:63
 * @route '/courses/{course}/attendance-sessions/{session}/records'
 */
    const storeRecordsForm = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeRecords.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\AttendanceSessionController::storeRecords
 * @see app/Modules/Learning/Http/Controllers/AttendanceSessionController.php:63
 * @route '/courses/{course}/attendance-sessions/{session}/records'
 */
        storeRecordsForm.post = (args: { course: number | { id: number }, session: number | { id: number } } | [course: number | { id: number }, session: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeRecords.url(args, options),
            method: 'post',
        })
    
    storeRecords.form = storeRecordsForm
const AttendanceSessionController = { store, uploadRoster, storeRecords }

export default AttendanceSessionController