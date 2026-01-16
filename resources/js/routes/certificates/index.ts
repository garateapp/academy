import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
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
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
 */
export const download = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/certificates/{certificate}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
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
 * @route '/certificates/{certificate}/download'
 */
download.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
 */
download.head = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
 */
    const downloadForm = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
 */
        downloadForm.get = (args: { certificate: number | { id: number } } | [certificate: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Modules\Certificate\Http\Controllers\CertificateController::download
 * @see app/Modules/Certificate/Http/Controllers/CertificateController.php:113
 * @route '/certificates/{certificate}/download'
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
const certificates = {
    myCertificates: Object.assign(myCertificates, myCertificates),
download: Object.assign(download, download),
verify: Object.assign(verify, verify),
}

export default certificates