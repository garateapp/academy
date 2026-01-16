import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:24
 * @route '/admin/certificates'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/certificates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:24
 * @route '/admin/certificates'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:24
 * @route '/admin/certificates'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:24
 * @route '/admin/certificates'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:24
 * @route '/admin/certificates'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:24
 * @route '/admin/certificates'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:24
 * @route '/admin/certificates'
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
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:37
 * @route '/admin/certificates/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/certificates/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:37
 * @route '/admin/certificates/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:37
 * @route '/admin/certificates/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:37
 * @route '/admin/certificates/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:37
 * @route '/admin/certificates/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:37
 * @route '/admin/certificates/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:37
 * @route '/admin/certificates/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::store
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:50
 * @route '/admin/certificates'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/certificates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::store
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:50
 * @route '/admin/certificates'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::store
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:50
 * @route '/admin/certificates'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::store
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:50
 * @route '/admin/certificates'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::store
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:50
 * @route '/admin/certificates'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:64
 * @route '/admin/certificates/{certificate}'
 */
export const show = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/certificates/{certificate}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:64
 * @route '/admin/certificates/{certificate}'
 */
show.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: typeof args.certificate === 'object'
                ? args.certificate.id
                : args.certificate,
                }

    return show.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:64
 * @route '/admin/certificates/{certificate}'
 */
show.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:64
 * @route '/admin/certificates/{certificate}'
 */
show.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:64
 * @route '/admin/certificates/{certificate}'
 */
    const showForm = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:64
 * @route '/admin/certificates/{certificate}'
 */
        showForm.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:64
 * @route '/admin/certificates/{certificate}'
 */
        showForm.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::destroy
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:75
 * @route '/admin/certificates/{certificate}'
 */
export const destroy = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/certificates/{certificate}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::destroy
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:75
 * @route '/admin/certificates/{certificate}'
 */
destroy.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: typeof args.certificate === 'object'
                ? args.certificate.id
                : args.certificate,
                }

    return destroy.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::destroy
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:75
 * @route '/admin/certificates/{certificate}'
 */
destroy.delete = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::destroy
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:75
 * @route '/admin/certificates/{certificate}'
 */
    const destroyForm = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::destroy
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:75
 * @route '/admin/certificates/{certificate}'
 */
        destroyForm.delete = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::revoke
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:96
 * @route '/admin/certificates/{certificate}/revoke'
 */
export const revoke = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

revoke.definition = {
    methods: ["post"],
    url: '/admin/certificates/{certificate}/revoke',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::revoke
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:96
 * @route '/admin/certificates/{certificate}/revoke'
 */
revoke.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: typeof args.certificate === 'object'
                ? args.certificate.id
                : args.certificate,
                }

    return revoke.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::revoke
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:96
 * @route '/admin/certificates/{certificate}/revoke'
 */
revoke.post = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::revoke
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:96
 * @route '/admin/certificates/{certificate}/revoke'
 */
    const revokeForm = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: revoke.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::revoke
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:96
 * @route '/admin/certificates/{certificate}/revoke'
 */
        revokeForm.post = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: revoke.url(args, options),
            method: 'post',
        })
    
    revoke.form = revokeForm
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::regenerate
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:128
 * @route '/admin/certificates/{certificate}/regenerate'
 */
export const regenerate = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerate.url(args, options),
    method: 'post',
})

regenerate.definition = {
    methods: ["post"],
    url: '/admin/certificates/{certificate}/regenerate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::regenerate
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:128
 * @route '/admin/certificates/{certificate}/regenerate'
 */
regenerate.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: typeof args.certificate === 'object'
                ? args.certificate.id
                : args.certificate,
                }

    return regenerate.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::regenerate
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:128
 * @route '/admin/certificates/{certificate}/regenerate'
 */
regenerate.post = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::regenerate
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:128
 * @route '/admin/certificates/{certificate}/regenerate'
 */
    const regenerateForm = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: regenerate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::regenerate
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:128
 * @route '/admin/certificates/{certificate}/regenerate'
 */
        regenerateForm.post = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: regenerate.url(args, options),
            method: 'post',
        })
    
    regenerate.form = regenerateForm
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
const download10cbcd84993fe8f55651c7569406eb7e = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download10cbcd84993fe8f55651c7569406eb7e.url(args, options),
    method: 'get',
})

download10cbcd84993fe8f55651c7569406eb7e.definition = {
    methods: ["get","head"],
    url: '/admin/certificates/{certificate}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
download10cbcd84993fe8f55651c7569406eb7e.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: typeof args.certificate === 'object'
                ? args.certificate.id
                : args.certificate,
                }

    return download10cbcd84993fe8f55651c7569406eb7e.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
download10cbcd84993fe8f55651c7569406eb7e.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download10cbcd84993fe8f55651c7569406eb7e.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
download10cbcd84993fe8f55651c7569406eb7e.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download10cbcd84993fe8f55651c7569406eb7e.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
    const download10cbcd84993fe8f55651c7569406eb7eForm = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download10cbcd84993fe8f55651c7569406eb7e.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
        download10cbcd84993fe8f55651c7569406eb7eForm.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download10cbcd84993fe8f55651c7569406eb7e.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
        download10cbcd84993fe8f55651c7569406eb7eForm.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download10cbcd84993fe8f55651c7569406eb7e.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download10cbcd84993fe8f55651c7569406eb7e.form = download10cbcd84993fe8f55651c7569406eb7eForm
    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
 */
const download3beac08dc27fd2392599d181b6c95eb1 = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download3beac08dc27fd2392599d181b6c95eb1.url(args, options),
    method: 'get',
})

download3beac08dc27fd2392599d181b6c95eb1.definition = {
    methods: ["get","head"],
    url: '/certificates/{certificate}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
 */
download3beac08dc27fd2392599d181b6c95eb1.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: typeof args.certificate === 'object'
                ? args.certificate.id
                : args.certificate,
                }

    return download3beac08dc27fd2392599d181b6c95eb1.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
 */
download3beac08dc27fd2392599d181b6c95eb1.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download3beac08dc27fd2392599d181b6c95eb1.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
 */
download3beac08dc27fd2392599d181b6c95eb1.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download3beac08dc27fd2392599d181b6c95eb1.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
 */
    const download3beac08dc27fd2392599d181b6c95eb1Form = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download3beac08dc27fd2392599d181b6c95eb1.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
 */
        download3beac08dc27fd2392599d181b6c95eb1Form.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download3beac08dc27fd2392599d181b6c95eb1.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
 */
        download3beac08dc27fd2392599d181b6c95eb1Form.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download3beac08dc27fd2392599d181b6c95eb1.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download3beac08dc27fd2392599d181b6c95eb1.form = download3beac08dc27fd2392599d181b6c95eb1Form

export const download = {
    '/admin/certificates/{certificate}/download': download10cbcd84993fe8f55651c7569406eb7e,
    '/certificates/{certificate}/download': download3beac08dc27fd2392599d181b6c95eb1,
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::myCertificates
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:137
 * @route '/my-certificates'
 */
export const myCertificates = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myCertificates.url(options),
    method: 'get',
})

myCertificates.definition = {
    methods: ["get","head"],
    url: '/my-certificates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::myCertificates
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:137
 * @route '/my-certificates'
 */
myCertificates.url = (options?: RouteQueryOptions) => {
    return myCertificates.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::myCertificates
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:137
 * @route '/my-certificates'
 */
myCertificates.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myCertificates.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::myCertificates
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:137
 * @route '/my-certificates'
 */
myCertificates.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myCertificates.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::myCertificates
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:137
 * @route '/my-certificates'
 */
    const myCertificatesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: myCertificates.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::myCertificates
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:137
 * @route '/my-certificates'
 */
        myCertificatesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: myCertificates.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::myCertificates
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:137
 * @route '/my-certificates'
 */
        myCertificatesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: myCertificates.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    myCertificates.form = myCertificatesForm
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::verify
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:146
 * @route '/verify-certificate/{verificationCode}'
 */
export const verify = (args: { verificationCode: string | number } | [verificationCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})

verify.definition = {
    methods: ["get","head"],
    url: '/verify-certificate/{verificationCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::verify
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:146
 * @route '/verify-certificate/{verificationCode}'
 */
verify.url = (args: { verificationCode: string | number } | [verificationCode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { verificationCode: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    verificationCode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        verificationCode: args.verificationCode,
                }

    return verify.definition.url
            .replace('{verificationCode}', parsedArgs.verificationCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::verify
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:146
 * @route '/verify-certificate/{verificationCode}'
 */
verify.get = (args: { verificationCode: string | number } | [verificationCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::verify
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:146
 * @route '/verify-certificate/{verificationCode}'
 */
verify.head = (args: { verificationCode: string | number } | [verificationCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::verify
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:146
 * @route '/verify-certificate/{verificationCode}'
 */
    const verifyForm = (args: { verificationCode: string | number } | [verificationCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verify.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::verify
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:146
 * @route '/verify-certificate/{verificationCode}'
 */
        verifyForm.get = (args: { verificationCode: string | number } | [verificationCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::verify
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:146
 * @route '/verify-certificate/{verificationCode}'
 */
        verifyForm.head = (args: { verificationCode: string | number } | [verificationCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    verify.form = verifyForm
const CertificateController = { index, create, store, show, destroy, revoke, regenerate, download, myCertificates, verify }

export default CertificateController