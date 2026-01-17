import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AtividadeCientificaController::exportMethod
 * @see app/Http/Controllers/AtividadeCientificaController.php:173
 * @route '/atividades-cientificas/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/atividades-cientificas/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AtividadeCientificaController::exportMethod
 * @see app/Http/Controllers/AtividadeCientificaController.php:173
 * @route '/atividades-cientificas/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AtividadeCientificaController::exportMethod
 * @see app/Http/Controllers/AtividadeCientificaController.php:173
 * @route '/atividades-cientificas/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AtividadeCientificaController::exportMethod
 * @see app/Http/Controllers/AtividadeCientificaController.php:173
 * @route '/atividades-cientificas/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AtividadeCientificaController::exportMethod
 * @see app/Http/Controllers/AtividadeCientificaController.php:173
 * @route '/atividades-cientificas/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AtividadeCientificaController::exportMethod
 * @see app/Http/Controllers/AtividadeCientificaController.php:173
 * @route '/atividades-cientificas/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AtividadeCientificaController::exportMethod
 * @see app/Http/Controllers/AtividadeCientificaController.php:173
 * @route '/atividades-cientificas/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
/**
* @see \App\Http\Controllers\AtividadeCientificaController::index
 * @see app/Http/Controllers/AtividadeCientificaController.php:21
 * @route '/atividades-cientificas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/atividades-cientificas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AtividadeCientificaController::index
 * @see app/Http/Controllers/AtividadeCientificaController.php:21
 * @route '/atividades-cientificas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AtividadeCientificaController::index
 * @see app/Http/Controllers/AtividadeCientificaController.php:21
 * @route '/atividades-cientificas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AtividadeCientificaController::index
 * @see app/Http/Controllers/AtividadeCientificaController.php:21
 * @route '/atividades-cientificas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AtividadeCientificaController::index
 * @see app/Http/Controllers/AtividadeCientificaController.php:21
 * @route '/atividades-cientificas'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AtividadeCientificaController::index
 * @see app/Http/Controllers/AtividadeCientificaController.php:21
 * @route '/atividades-cientificas'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AtividadeCientificaController::index
 * @see app/Http/Controllers/AtividadeCientificaController.php:21
 * @route '/atividades-cientificas'
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
* @see \App\Http\Controllers\AtividadeCientificaController::create
 * @see app/Http/Controllers/AtividadeCientificaController.php:36
 * @route '/atividades-cientificas/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/atividades-cientificas/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AtividadeCientificaController::create
 * @see app/Http/Controllers/AtividadeCientificaController.php:36
 * @route '/atividades-cientificas/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AtividadeCientificaController::create
 * @see app/Http/Controllers/AtividadeCientificaController.php:36
 * @route '/atividades-cientificas/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AtividadeCientificaController::create
 * @see app/Http/Controllers/AtividadeCientificaController.php:36
 * @route '/atividades-cientificas/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AtividadeCientificaController::create
 * @see app/Http/Controllers/AtividadeCientificaController.php:36
 * @route '/atividades-cientificas/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AtividadeCientificaController::create
 * @see app/Http/Controllers/AtividadeCientificaController.php:36
 * @route '/atividades-cientificas/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AtividadeCientificaController::create
 * @see app/Http/Controllers/AtividadeCientificaController.php:36
 * @route '/atividades-cientificas/create'
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
* @see \App\Http\Controllers\AtividadeCientificaController::store
 * @see app/Http/Controllers/AtividadeCientificaController.php:49
 * @route '/atividades-cientificas'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/atividades-cientificas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AtividadeCientificaController::store
 * @see app/Http/Controllers/AtividadeCientificaController.php:49
 * @route '/atividades-cientificas'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AtividadeCientificaController::store
 * @see app/Http/Controllers/AtividadeCientificaController.php:49
 * @route '/atividades-cientificas'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AtividadeCientificaController::store
 * @see app/Http/Controllers/AtividadeCientificaController.php:49
 * @route '/atividades-cientificas'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AtividadeCientificaController::store
 * @see app/Http/Controllers/AtividadeCientificaController.php:49
 * @route '/atividades-cientificas'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AtividadeCientificaController::show
 * @see app/Http/Controllers/AtividadeCientificaController.php:74
 * @route '/atividades-cientificas/{atividade}'
 */
export const show = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/atividades-cientificas/{atividade}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AtividadeCientificaController::show
 * @see app/Http/Controllers/AtividadeCientificaController.php:74
 * @route '/atividades-cientificas/{atividade}'
 */
show.url = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { atividade: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { atividade: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    atividade: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        atividade: typeof args.atividade === 'object'
                ? args.atividade.id
                : args.atividade,
                }

    return show.definition.url
            .replace('{atividade}', parsedArgs.atividade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AtividadeCientificaController::show
 * @see app/Http/Controllers/AtividadeCientificaController.php:74
 * @route '/atividades-cientificas/{atividade}'
 */
show.get = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AtividadeCientificaController::show
 * @see app/Http/Controllers/AtividadeCientificaController.php:74
 * @route '/atividades-cientificas/{atividade}'
 */
show.head = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AtividadeCientificaController::show
 * @see app/Http/Controllers/AtividadeCientificaController.php:74
 * @route '/atividades-cientificas/{atividade}'
 */
    const showForm = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AtividadeCientificaController::show
 * @see app/Http/Controllers/AtividadeCientificaController.php:74
 * @route '/atividades-cientificas/{atividade}'
 */
        showForm.get = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AtividadeCientificaController::show
 * @see app/Http/Controllers/AtividadeCientificaController.php:74
 * @route '/atividades-cientificas/{atividade}'
 */
        showForm.head = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AtividadeCientificaController::edit
 * @see app/Http/Controllers/AtividadeCientificaController.php:86
 * @route '/atividades-cientificas/{atividade}/edit'
 */
export const edit = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/atividades-cientificas/{atividade}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AtividadeCientificaController::edit
 * @see app/Http/Controllers/AtividadeCientificaController.php:86
 * @route '/atividades-cientificas/{atividade}/edit'
 */
edit.url = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { atividade: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { atividade: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    atividade: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        atividade: typeof args.atividade === 'object'
                ? args.atividade.id
                : args.atividade,
                }

    return edit.definition.url
            .replace('{atividade}', parsedArgs.atividade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AtividadeCientificaController::edit
 * @see app/Http/Controllers/AtividadeCientificaController.php:86
 * @route '/atividades-cientificas/{atividade}/edit'
 */
edit.get = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AtividadeCientificaController::edit
 * @see app/Http/Controllers/AtividadeCientificaController.php:86
 * @route '/atividades-cientificas/{atividade}/edit'
 */
edit.head = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AtividadeCientificaController::edit
 * @see app/Http/Controllers/AtividadeCientificaController.php:86
 * @route '/atividades-cientificas/{atividade}/edit'
 */
    const editForm = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AtividadeCientificaController::edit
 * @see app/Http/Controllers/AtividadeCientificaController.php:86
 * @route '/atividades-cientificas/{atividade}/edit'
 */
        editForm.get = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AtividadeCientificaController::edit
 * @see app/Http/Controllers/AtividadeCientificaController.php:86
 * @route '/atividades-cientificas/{atividade}/edit'
 */
        editForm.head = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AtividadeCientificaController::update
 * @see app/Http/Controllers/AtividadeCientificaController.php:100
 * @route '/atividades-cientificas/{atividade}'
 */
export const update = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/atividades-cientificas/{atividade}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\AtividadeCientificaController::update
 * @see app/Http/Controllers/AtividadeCientificaController.php:100
 * @route '/atividades-cientificas/{atividade}'
 */
update.url = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { atividade: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { atividade: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    atividade: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        atividade: typeof args.atividade === 'object'
                ? args.atividade.id
                : args.atividade,
                }

    return update.definition.url
            .replace('{atividade}', parsedArgs.atividade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AtividadeCientificaController::update
 * @see app/Http/Controllers/AtividadeCientificaController.php:100
 * @route '/atividades-cientificas/{atividade}'
 */
update.put = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\AtividadeCientificaController::update
 * @see app/Http/Controllers/AtividadeCientificaController.php:100
 * @route '/atividades-cientificas/{atividade}'
 */
update.patch = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AtividadeCientificaController::update
 * @see app/Http/Controllers/AtividadeCientificaController.php:100
 * @route '/atividades-cientificas/{atividade}'
 */
    const updateForm = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AtividadeCientificaController::update
 * @see app/Http/Controllers/AtividadeCientificaController.php:100
 * @route '/atividades-cientificas/{atividade}'
 */
        updateForm.put = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\AtividadeCientificaController::update
 * @see app/Http/Controllers/AtividadeCientificaController.php:100
 * @route '/atividades-cientificas/{atividade}'
 */
        updateForm.patch = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\AtividadeCientificaController::destroy
 * @see app/Http/Controllers/AtividadeCientificaController.php:137
 * @route '/atividades-cientificas/{atividade}'
 */
export const destroy = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/atividades-cientificas/{atividade}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AtividadeCientificaController::destroy
 * @see app/Http/Controllers/AtividadeCientificaController.php:137
 * @route '/atividades-cientificas/{atividade}'
 */
destroy.url = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { atividade: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { atividade: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    atividade: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        atividade: typeof args.atividade === 'object'
                ? args.atividade.id
                : args.atividade,
                }

    return destroy.definition.url
            .replace('{atividade}', parsedArgs.atividade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AtividadeCientificaController::destroy
 * @see app/Http/Controllers/AtividadeCientificaController.php:137
 * @route '/atividades-cientificas/{atividade}'
 */
destroy.delete = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AtividadeCientificaController::destroy
 * @see app/Http/Controllers/AtividadeCientificaController.php:137
 * @route '/atividades-cientificas/{atividade}'
 */
    const destroyForm = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AtividadeCientificaController::destroy
 * @see app/Http/Controllers/AtividadeCientificaController.php:137
 * @route '/atividades-cientificas/{atividade}'
 */
        destroyForm.delete = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\AtividadeCientificaController::download
 * @see app/Http/Controllers/AtividadeCientificaController.php:156
 * @route '/atividades-cientificas/{atividade}/download'
 */
export const download = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/atividades-cientificas/{atividade}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AtividadeCientificaController::download
 * @see app/Http/Controllers/AtividadeCientificaController.php:156
 * @route '/atividades-cientificas/{atividade}/download'
 */
download.url = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { atividade: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { atividade: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    atividade: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        atividade: typeof args.atividade === 'object'
                ? args.atividade.id
                : args.atividade,
                }

    return download.definition.url
            .replace('{atividade}', parsedArgs.atividade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AtividadeCientificaController::download
 * @see app/Http/Controllers/AtividadeCientificaController.php:156
 * @route '/atividades-cientificas/{atividade}/download'
 */
download.get = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AtividadeCientificaController::download
 * @see app/Http/Controllers/AtividadeCientificaController.php:156
 * @route '/atividades-cientificas/{atividade}/download'
 */
download.head = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AtividadeCientificaController::download
 * @see app/Http/Controllers/AtividadeCientificaController.php:156
 * @route '/atividades-cientificas/{atividade}/download'
 */
    const downloadForm = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AtividadeCientificaController::download
 * @see app/Http/Controllers/AtividadeCientificaController.php:156
 * @route '/atividades-cientificas/{atividade}/download'
 */
        downloadForm.get = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AtividadeCientificaController::download
 * @see app/Http/Controllers/AtividadeCientificaController.php:156
 * @route '/atividades-cientificas/{atividade}/download'
 */
        downloadForm.head = (args: { atividade: number | { id: number } } | [atividade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const atividadesCientificas = {
    export: Object.assign(exportMethod, exportMethod),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
download: Object.assign(download, download),
}

export default atividadesCientificas