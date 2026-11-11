import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::index
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:24
 * @route '/admin/course-approvals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/course-approvals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::index
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:24
 * @route '/admin/course-approvals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::index
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:24
 * @route '/admin/course-approvals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::index
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:24
 * @route '/admin/course-approvals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::index
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:24
 * @route '/admin/course-approvals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::index
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:24
 * @route '/admin/course-approvals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::index
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:24
 * @route '/admin/course-approvals'
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
/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::grade
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:87
 * @route '/admin/course-approvals/enrollments/{enrollment}/grade'
 */
export const grade = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: grade.url(args, options),
    method: 'post',
})

grade.definition = {
    methods: ["post"],
    url: '/admin/course-approvals/enrollments/{enrollment}/grade',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::grade
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:87
 * @route '/admin/course-approvals/enrollments/{enrollment}/grade'
 */
grade.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return grade.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::grade
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:87
 * @route '/admin/course-approvals/enrollments/{enrollment}/grade'
 */
grade.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: grade.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::grade
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:87
 * @route '/admin/course-approvals/enrollments/{enrollment}/grade'
 */
    const gradeForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: grade.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::grade
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:87
 * @route '/admin/course-approvals/enrollments/{enrollment}/grade'
 */
        gradeForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: grade.url(args, options),
            method: 'post',
        })
    
    grade.form = gradeForm
/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::complete
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:143
 * @route '/admin/course-approvals/enrollments/{enrollment}/complete'
 */
export const complete = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/admin/course-approvals/enrollments/{enrollment}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::complete
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:143
 * @route '/admin/course-approvals/enrollments/{enrollment}/complete'
 */
complete.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return complete.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::complete
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:143
 * @route '/admin/course-approvals/enrollments/{enrollment}/complete'
 */
complete.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::complete
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:143
 * @route '/admin/course-approvals/enrollments/{enrollment}/complete'
 */
    const completeForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::complete
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:143
 * @route '/admin/course-approvals/enrollments/{enrollment}/complete'
 */
        completeForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::rehabilitate
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:174
 * @route '/admin/course-approvals/enrollments/{enrollment}/rehabilitate'
 */
export const rehabilitate = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rehabilitate.url(args, options),
    method: 'post',
})

rehabilitate.definition = {
    methods: ["post"],
    url: '/admin/course-approvals/enrollments/{enrollment}/rehabilitate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::rehabilitate
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:174
 * @route '/admin/course-approvals/enrollments/{enrollment}/rehabilitate'
 */
rehabilitate.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return rehabilitate.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::rehabilitate
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:174
 * @route '/admin/course-approvals/enrollments/{enrollment}/rehabilitate'
 */
rehabilitate.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rehabilitate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::rehabilitate
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:174
 * @route '/admin/course-approvals/enrollments/{enrollment}/rehabilitate'
 */
    const rehabilitateForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rehabilitate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Learning\Http\Controllers\CourseApprovalController::rehabilitate
 * @see app/Modules/Learning/Http/Controllers/CourseApprovalController.php:174
 * @route '/admin/course-approvals/enrollments/{enrollment}/rehabilitate'
 */
        rehabilitateForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rehabilitate.url(args, options),
            method: 'post',
        })
    
    rehabilitate.form = rehabilitateForm
const courseApprovals = {
    index: Object.assign(index, index),
grade: Object.assign(grade, grade),
complete: Object.assign(complete, complete),
rehabilitate: Object.assign(rehabilitate, rehabilitate),
}

export default courseApprovals