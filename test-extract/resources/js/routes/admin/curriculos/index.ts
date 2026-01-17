import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import exportMethod from './export'
/**
* @see \App\Http\Controllers\Admin\CurriculumController::index
 * @see app/Http/Controllers/Admin/CurriculumController.php:14
 * @route '/admin/curriculos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/curriculos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::index
 * @see app/Http/Controllers/Admin/CurriculumController.php:14
 * @route '/admin/curriculos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::index
 * @see app/Http/Controllers/Admin/CurriculumController.php:14
 * @route '/admin/curriculos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CurriculumController::index
 * @see app/Http/Controllers/Admin/CurriculumController.php:14
 * @route '/admin/curriculos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::index
 * @see app/Http/Controllers/Admin/CurriculumController.php:14
 * @route '/admin/curriculos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::index
 * @see app/Http/Controllers/Admin/CurriculumController.php:14
 * @route '/admin/curriculos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CurriculumController::index
 * @see app/Http/Controllers/Admin/CurriculumController.php:14
 * @route '/admin/curriculos'
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
* @see \App\Http\Controllers\Admin\CurriculumController::show
 * @see app/Http/Controllers/Admin/CurriculumController.php:60
 * @route '/admin/curriculos/{registo_cirurgico}'
 */
export const show = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/curriculos/{registo_cirurgico}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CurriculumController::show
 * @see app/Http/Controllers/Admin/CurriculumController.php:60
 * @route '/admin/curriculos/{registo_cirurgico}'
 */
show.url = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{registo_cirurgico}', parsedArgs.registo_cirurgico.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CurriculumController::show
 * @see app/Http/Controllers/Admin/CurriculumController.php:60
 * @route '/admin/curriculos/{registo_cirurgico}'
 */
show.get = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CurriculumController::show
 * @see app/Http/Controllers/Admin/CurriculumController.php:60
 * @route '/admin/curriculos/{registo_cirurgico}'
 */
show.head = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CurriculumController::show
 * @see app/Http/Controllers/Admin/CurriculumController.php:60
 * @route '/admin/curriculos/{registo_cirurgico}'
 */
    const showForm = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CurriculumController::show
 * @see app/Http/Controllers/Admin/CurriculumController.php:60
 * @route '/admin/curriculos/{registo_cirurgico}'
 */
        showForm.get = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CurriculumController::show
 * @see app/Http/Controllers/Admin/CurriculumController.php:60
 * @route '/admin/curriculos/{registo_cirurgico}'
 */
        showForm.head = (args: { registo_cirurgico: string | number } | [registo_cirurgico: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const curriculos = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
export: Object.assign(exportMethod, exportMethod),
}

export default curriculos