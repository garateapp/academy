import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:22
 * @route '/admin/certificate-templates'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/certificate-templates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:22
 * @route '/admin/certificate-templates'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:22
 * @route '/admin/certificate-templates'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:22
 * @route '/admin/certificate-templates'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:22
 * @route '/admin/certificate-templates'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:22
 * @route '/admin/certificate-templates'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::index
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:22
 * @route '/admin/certificate-templates'
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
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:33
 * @route '/admin/certificate-templates/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/certificate-templates/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:33
 * @route '/admin/certificate-templates/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:33
 * @route '/admin/certificate-templates/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:33
 * @route '/admin/certificate-templates/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:33
 * @route '/admin/certificate-templates/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:33
 * @route '/admin/certificate-templates/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::create
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:33
 * @route '/admin/certificate-templates/create'
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
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::store
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:42
 * @route '/admin/certificate-templates'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/certificate-templates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::store
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:42
 * @route '/admin/certificate-templates'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::store
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:42
 * @route '/admin/certificate-templates'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::store
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:42
 * @route '/admin/certificate-templates'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::store
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:42
 * @route '/admin/certificate-templates'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:66
 * @route '/admin/certificate-templates/{certificate_template}'
 */
export const show = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/certificate-templates/{certificate_template}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:66
 * @route '/admin/certificate-templates/{certificate_template}'
 */
show.url = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate_template: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate_template: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate_template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate_template: typeof args.certificate_template === 'object'
                ? args.certificate_template.id
                : args.certificate_template,
                }

    return show.definition.url
            .replace('{certificate_template}', parsedArgs.certificate_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:66
 * @route '/admin/certificate-templates/{certificate_template}'
 */
show.get = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:66
 * @route '/admin/certificate-templates/{certificate_template}'
 */
show.head = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:66
 * @route '/admin/certificate-templates/{certificate_template}'
 */
    const showForm = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:66
 * @route '/admin/certificate-templates/{certificate_template}'
 */
        showForm.get = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::show
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:66
 * @route '/admin/certificate-templates/{certificate_template}'
 */
        showForm.head = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::edit
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:77
 * @route '/admin/certificate-templates/{certificate_template}/edit'
 */
export const edit = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/certificate-templates/{certificate_template}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::edit
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:77
 * @route '/admin/certificate-templates/{certificate_template}/edit'
 */
edit.url = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate_template: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate_template: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate_template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate_template: typeof args.certificate_template === 'object'
                ? args.certificate_template.id
                : args.certificate_template,
                }

    return edit.definition.url
            .replace('{certificate_template}', parsedArgs.certificate_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::edit
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:77
 * @route '/admin/certificate-templates/{certificate_template}/edit'
 */
edit.get = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::edit
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:77
 * @route '/admin/certificate-templates/{certificate_template}/edit'
 */
edit.head = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::edit
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:77
 * @route '/admin/certificate-templates/{certificate_template}/edit'
 */
    const editForm = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::edit
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:77
 * @route '/admin/certificate-templates/{certificate_template}/edit'
 */
        editForm.get = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::edit
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:77
 * @route '/admin/certificate-templates/{certificate_template}/edit'
 */
        editForm.head = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::update
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:87
 * @route '/admin/certificate-templates/{certificate_template}'
 */
export const update = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/certificate-templates/{certificate_template}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::update
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:87
 * @route '/admin/certificate-templates/{certificate_template}'
 */
update.url = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate_template: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate_template: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate_template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate_template: typeof args.certificate_template === 'object'
                ? args.certificate_template.id
                : args.certificate_template,
                }

    return update.definition.url
            .replace('{certificate_template}', parsedArgs.certificate_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::update
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:87
 * @route '/admin/certificate-templates/{certificate_template}'
 */
update.put = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::update
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:87
 * @route '/admin/certificate-templates/{certificate_template}'
 */
update.patch = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::update
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:87
 * @route '/admin/certificate-templates/{certificate_template}'
 */
    const updateForm = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::update
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:87
 * @route '/admin/certificate-templates/{certificate_template}'
 */
        updateForm.put = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::update
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:87
 * @route '/admin/certificate-templates/{certificate_template}'
 */
        updateForm.patch = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::destroy
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:114
 * @route '/admin/certificate-templates/{certificate_template}'
 */
export const destroy = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/certificate-templates/{certificate_template}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::destroy
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:114
 * @route '/admin/certificate-templates/{certificate_template}'
 */
destroy.url = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate_template: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { certificate_template: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    certificate_template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate_template: typeof args.certificate_template === 'object'
                ? args.certificate_template.id
                : args.certificate_template,
                }

    return destroy.definition.url
            .replace('{certificate_template}', parsedArgs.certificate_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::destroy
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:114
 * @route '/admin/certificate-templates/{certificate_template}'
 */
destroy.delete = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::destroy
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:114
 * @route '/admin/certificate-templates/{certificate_template}'
 */
    const destroyForm = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::destroy
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:114
 * @route '/admin/certificate-templates/{certificate_template}'
 */
        destroyForm.delete = (args: { certificate_template: number | { id: number } } | [certificate_template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::duplicate
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:138
 * @route '/admin/certificate-templates/{template}/duplicate'
 */
export const duplicate = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

duplicate.definition = {
    methods: ["post"],
    url: '/admin/certificate-templates/{template}/duplicate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::duplicate
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:138
 * @route '/admin/certificate-templates/{template}/duplicate'
 */
duplicate.url = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { template: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { template: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        template: typeof args.template === 'object'
                ? args.template.id
                : args.template,
                }

    return duplicate.definition.url
            .replace('{template}', parsedArgs.template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::duplicate
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:138
 * @route '/admin/certificate-templates/{template}/duplicate'
 */
duplicate.post = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::duplicate
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:138
 * @route '/admin/certificate-templates/{template}/duplicate'
 */
    const duplicateForm = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: duplicate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateTemplateController::duplicate
 * @see app/Modules/Certificate/Http/Controllers/CertificateTemplateController.php:138
 * @route '/admin/certificate-templates/{template}/duplicate'
 */
        duplicateForm.post = (args: { template: number | { id: number } } | [template: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: duplicate.url(args, options),
            method: 'post',
        })
    
    duplicate.form = duplicateForm
const CertificateTemplateController = { index, create, store, show, edit, update, destroy, duplicate }

export default CertificateTemplateController