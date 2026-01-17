import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DiagnosticoController::index
 * @see app/Http/Controllers/DiagnosticoController.php:18
 * @route '/diagnosticos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/diagnosticos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiagnosticoController::index
 * @see app/Http/Controllers/DiagnosticoController.php:18
 * @route '/diagnosticos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiagnosticoController::index
 * @see app/Http/Controllers/DiagnosticoController.php:18
 * @route '/diagnosticos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DiagnosticoController::index
 * @see app/Http/Controllers/DiagnosticoController.php:18
 * @route '/diagnosticos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DiagnosticoController::index
 * @see app/Http/Controllers/DiagnosticoController.php:18
 * @route '/diagnosticos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DiagnosticoController::index
 * @see app/Http/Controllers/DiagnosticoController.php:18
 * @route '/diagnosticos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DiagnosticoController::index
 * @see app/Http/Controllers/DiagnosticoController.php:18
 * @route '/diagnosticos'
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
* @see \App\Http\Controllers\DiagnosticoController::create
 * @see app/Http/Controllers/DiagnosticoController.php:31
 * @route '/diagnosticos/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/diagnosticos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiagnosticoController::create
 * @see app/Http/Controllers/DiagnosticoController.php:31
 * @route '/diagnosticos/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiagnosticoController::create
 * @see app/Http/Controllers/DiagnosticoController.php:31
 * @route '/diagnosticos/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DiagnosticoController::create
 * @see app/Http/Controllers/DiagnosticoController.php:31
 * @route '/diagnosticos/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DiagnosticoController::create
 * @see app/Http/Controllers/DiagnosticoController.php:31
 * @route '/diagnosticos/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DiagnosticoController::create
 * @see app/Http/Controllers/DiagnosticoController.php:31
 * @route '/diagnosticos/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DiagnosticoController::create
 * @see app/Http/Controllers/DiagnosticoController.php:31
 * @route '/diagnosticos/create'
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
* @see \App\Http\Controllers\DiagnosticoController::store
 * @see app/Http/Controllers/DiagnosticoController.php:43
 * @route '/diagnosticos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/diagnosticos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DiagnosticoController::store
 * @see app/Http/Controllers/DiagnosticoController.php:43
 * @route '/diagnosticos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiagnosticoController::store
 * @see app/Http/Controllers/DiagnosticoController.php:43
 * @route '/diagnosticos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DiagnosticoController::store
 * @see app/Http/Controllers/DiagnosticoController.php:43
 * @route '/diagnosticos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DiagnosticoController::store
 * @see app/Http/Controllers/DiagnosticoController.php:43
 * @route '/diagnosticos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DiagnosticoController::show
 * @see app/Http/Controllers/DiagnosticoController.php:62
 * @route '/diagnosticos/{diagnostico}'
 */
export const show = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/diagnosticos/{diagnostico}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiagnosticoController::show
 * @see app/Http/Controllers/DiagnosticoController.php:62
 * @route '/diagnosticos/{diagnostico}'
 */
show.url = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { diagnostico: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { diagnostico: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    diagnostico: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        diagnostico: typeof args.diagnostico === 'object'
                ? args.diagnostico.id
                : args.diagnostico,
                }

    return show.definition.url
            .replace('{diagnostico}', parsedArgs.diagnostico.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiagnosticoController::show
 * @see app/Http/Controllers/DiagnosticoController.php:62
 * @route '/diagnosticos/{diagnostico}'
 */
show.get = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DiagnosticoController::show
 * @see app/Http/Controllers/DiagnosticoController.php:62
 * @route '/diagnosticos/{diagnostico}'
 */
show.head = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DiagnosticoController::show
 * @see app/Http/Controllers/DiagnosticoController.php:62
 * @route '/diagnosticos/{diagnostico}'
 */
    const showForm = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DiagnosticoController::show
 * @see app/Http/Controllers/DiagnosticoController.php:62
 * @route '/diagnosticos/{diagnostico}'
 */
        showForm.get = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DiagnosticoController::show
 * @see app/Http/Controllers/DiagnosticoController.php:62
 * @route '/diagnosticos/{diagnostico}'
 */
        showForm.head = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DiagnosticoController::edit
 * @see app/Http/Controllers/DiagnosticoController.php:74
 * @route '/diagnosticos/{diagnostico}/edit'
 */
export const edit = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/diagnosticos/{diagnostico}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiagnosticoController::edit
 * @see app/Http/Controllers/DiagnosticoController.php:74
 * @route '/diagnosticos/{diagnostico}/edit'
 */
edit.url = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { diagnostico: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { diagnostico: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    diagnostico: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        diagnostico: typeof args.diagnostico === 'object'
                ? args.diagnostico.id
                : args.diagnostico,
                }

    return edit.definition.url
            .replace('{diagnostico}', parsedArgs.diagnostico.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiagnosticoController::edit
 * @see app/Http/Controllers/DiagnosticoController.php:74
 * @route '/diagnosticos/{diagnostico}/edit'
 */
edit.get = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DiagnosticoController::edit
 * @see app/Http/Controllers/DiagnosticoController.php:74
 * @route '/diagnosticos/{diagnostico}/edit'
 */
edit.head = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DiagnosticoController::edit
 * @see app/Http/Controllers/DiagnosticoController.php:74
 * @route '/diagnosticos/{diagnostico}/edit'
 */
    const editForm = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DiagnosticoController::edit
 * @see app/Http/Controllers/DiagnosticoController.php:74
 * @route '/diagnosticos/{diagnostico}/edit'
 */
        editForm.get = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DiagnosticoController::edit
 * @see app/Http/Controllers/DiagnosticoController.php:74
 * @route '/diagnosticos/{diagnostico}/edit'
 */
        editForm.head = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DiagnosticoController::update
 * @see app/Http/Controllers/DiagnosticoController.php:87
 * @route '/diagnosticos/{diagnostico}'
 */
export const update = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/diagnosticos/{diagnostico}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DiagnosticoController::update
 * @see app/Http/Controllers/DiagnosticoController.php:87
 * @route '/diagnosticos/{diagnostico}'
 */
update.url = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { diagnostico: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { diagnostico: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    diagnostico: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        diagnostico: typeof args.diagnostico === 'object'
                ? args.diagnostico.id
                : args.diagnostico,
                }

    return update.definition.url
            .replace('{diagnostico}', parsedArgs.diagnostico.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiagnosticoController::update
 * @see app/Http/Controllers/DiagnosticoController.php:87
 * @route '/diagnosticos/{diagnostico}'
 */
update.put = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\DiagnosticoController::update
 * @see app/Http/Controllers/DiagnosticoController.php:87
 * @route '/diagnosticos/{diagnostico}'
 */
update.patch = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\DiagnosticoController::update
 * @see app/Http/Controllers/DiagnosticoController.php:87
 * @route '/diagnosticos/{diagnostico}'
 */
    const updateForm = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DiagnosticoController::update
 * @see app/Http/Controllers/DiagnosticoController.php:87
 * @route '/diagnosticos/{diagnostico}'
 */
        updateForm.put = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\DiagnosticoController::update
 * @see app/Http/Controllers/DiagnosticoController.php:87
 * @route '/diagnosticos/{diagnostico}'
 */
        updateForm.patch = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DiagnosticoController::destroy
 * @see app/Http/Controllers/DiagnosticoController.php:101
 * @route '/diagnosticos/{diagnostico}'
 */
export const destroy = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/diagnosticos/{diagnostico}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DiagnosticoController::destroy
 * @see app/Http/Controllers/DiagnosticoController.php:101
 * @route '/diagnosticos/{diagnostico}'
 */
destroy.url = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { diagnostico: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { diagnostico: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    diagnostico: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        diagnostico: typeof args.diagnostico === 'object'
                ? args.diagnostico.id
                : args.diagnostico,
                }

    return destroy.definition.url
            .replace('{diagnostico}', parsedArgs.diagnostico.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiagnosticoController::destroy
 * @see app/Http/Controllers/DiagnosticoController.php:101
 * @route '/diagnosticos/{diagnostico}'
 */
destroy.delete = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DiagnosticoController::destroy
 * @see app/Http/Controllers/DiagnosticoController.php:101
 * @route '/diagnosticos/{diagnostico}'
 */
    const destroyForm = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DiagnosticoController::destroy
 * @see app/Http/Controllers/DiagnosticoController.php:101
 * @route '/diagnosticos/{diagnostico}'
 */
        destroyForm.delete = (args: { diagnostico: number | { id: number } } | [diagnostico: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const DiagnosticoController = { index, create, store, show, edit, update, destroy }

export default DiagnosticoController