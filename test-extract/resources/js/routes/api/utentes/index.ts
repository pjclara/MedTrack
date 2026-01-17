import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\UtenteController::processo
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
export const processo = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: processo.url(args, options),
    method: 'get',
})

processo.definition = {
    methods: ["get","head"],
    url: '/api/utentes/processo/{processo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UtenteController::processo
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
processo.url = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { processo: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    processo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        processo: args.processo,
                }

    return processo.definition.url
            .replace('{processo}', parsedArgs.processo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UtenteController::processo
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
processo.get = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: processo.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UtenteController::processo
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
processo.head = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: processo.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UtenteController::processo
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
    const processoForm = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: processo.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UtenteController::processo
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
        processoForm.get = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: processo.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UtenteController::processo
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
        processoForm.head = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: processo.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    processo.form = processoForm
const utentes = {
    processo: Object.assign(processo, processo),
}

export default utentes