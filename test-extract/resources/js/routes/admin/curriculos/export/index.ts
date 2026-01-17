import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CurriculumController::json
 * @see app/Http/Controllers/Admin/CurriculumController.php:77
 * @route '/admin/curriculos/{registo_cirurgico}/export/json'
 */
export const json = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: json.url(args, options),
    method: 'get',
})

json.definition = {
    methods: ["get","head"],
    url: '/admin/curriculos/{registo_cirurgico}/export/json',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::json
 * @see app/Http/Controllers/Admin/CurriculumController.php:77
 * @route '/admin/curriculos/{registo_cirurgico}/export/json'
 */
json.url = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { registo_cirurgico: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    registo_cirurgico: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        registo_cirurgico: args.registo_cirurgico,
                }

    return json.definition.url
            .replace('{registo_cirurgico}', parsedArgs.registo_cirurgico.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::json
 * @see app/Http/Controllers/Admin/CurriculumController.php:77
 * @route '/admin/curriculos/{registo_cirurgico}/export/json'
 */
json.get = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: json.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CurriculumController::json
 * @see app/Http/Controllers/Admin/CurriculumController.php:77
 * @route '/admin/curriculos/{registo_cirurgico}/export/json'
 */
json.head = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: json.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::json
 * @see app/Http/Controllers/Admin/CurriculumController.php:77
 * @route '/admin/curriculos/{registo_cirurgico}/export/json'
 */
    const jsonForm = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: json.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::json
 * @see app/Http/Controllers/Admin/CurriculumController.php:77
 * @route '/admin/curriculos/{registo_cirurgico}/export/json'
 */
        jsonForm.get = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: json.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CurriculumController::json
 * @see app/Http/Controllers/Admin/CurriculumController.php:77
 * @route '/admin/curriculos/{registo_cirurgico}/export/json'
 */
        jsonForm.head = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: json.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    json.form = jsonForm
/**
* @see \App\Http\Controllers\Admin\CurriculumController::pdf
 * @see app/Http/Controllers/Admin/CurriculumController.php:89
 * @route '/admin/curriculos/{registo_cirurgico}/export/pdf'
 */
export const pdf = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/admin/curriculos/{registo_cirurgico}/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::pdf
 * @see app/Http/Controllers/Admin/CurriculumController.php:89
 * @route '/admin/curriculos/{registo_cirurgico}/export/pdf'
 */
pdf.url = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { registo_cirurgico: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    registo_cirurgico: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        registo_cirurgico: args.registo_cirurgico,
                }

    return pdf.definition.url
            .replace('{registo_cirurgico}', parsedArgs.registo_cirurgico.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::pdf
 * @see app/Http/Controllers/Admin/CurriculumController.php:89
 * @route '/admin/curriculos/{registo_cirurgico}/export/pdf'
 */
pdf.get = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CurriculumController::pdf
 * @see app/Http/Controllers/Admin/CurriculumController.php:89
 * @route '/admin/curriculos/{registo_cirurgico}/export/pdf'
 */
pdf.head = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::pdf
 * @see app/Http/Controllers/Admin/CurriculumController.php:89
 * @route '/admin/curriculos/{registo_cirurgico}/export/pdf'
 */
    const pdfForm = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::pdf
 * @see app/Http/Controllers/Admin/CurriculumController.php:89
 * @route '/admin/curriculos/{registo_cirurgico}/export/pdf'
 */
        pdfForm.get = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CurriculumController::pdf
 * @see app/Http/Controllers/Admin/CurriculumController.php:89
 * @route '/admin/curriculos/{registo_cirurgico}/export/pdf'
 */
        pdfForm.head = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pdf.form = pdfForm
const exportMethod = {
    json: Object.assign(json, json),
pdf: Object.assign(pdf, pdf),
}

export default exportMethod