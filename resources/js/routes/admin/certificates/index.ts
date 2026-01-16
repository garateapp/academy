import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
export const download = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/certificates/{certificate}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
download.url = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return download.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
download.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
download.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
    const downloadForm = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
        downloadForm.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/admin/certificates/{certificate}/download'
 */
        downloadForm.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const certificates = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
destroy: Object.assign(destroy, destroy),
revoke: Object.assign(revoke, revoke),
regenerate: Object.assign(regenerate, regenerate),
download: Object.assign(download, download),
}

export default certificates