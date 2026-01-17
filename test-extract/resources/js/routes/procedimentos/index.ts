import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ProcedimentoController::index
 * @see app/Http/Controllers/ProcedimentoController.php:17
 * @route '/procedimentos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/procedimentos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProcedimentoController::index
 * @see app/Http/Controllers/ProcedimentoController.php:17
 * @route '/procedimentos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProcedimentoController::index
 * @see app/Http/Controllers/ProcedimentoController.php:17
 * @route '/procedimentos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProcedimentoController::index
 * @see app/Http/Controllers/ProcedimentoController.php:17
 * @route '/procedimentos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProcedimentoController::index
 * @see app/Http/Controllers/ProcedimentoController.php:17
 * @route '/procedimentos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProcedimentoController::index
 * @see app/Http/Controllers/ProcedimentoController.php:17
 * @route '/procedimentos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProcedimentoController::index
 * @see app/Http/Controllers/ProcedimentoController.php:17
 * @route '/procedimentos'
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
* @see \App\Http\Controllers\ProcedimentoController::create
 * @see app/Http/Controllers/ProcedimentoController.php:30
 * @route '/procedimentos/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/procedimentos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProcedimentoController::create
 * @see app/Http/Controllers/ProcedimentoController.php:30
 * @route '/procedimentos/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProcedimentoController::create
 * @see app/Http/Controllers/ProcedimentoController.php:30
 * @route '/procedimentos/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProcedimentoController::create
 * @see app/Http/Controllers/ProcedimentoController.php:30
 * @route '/procedimentos/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProcedimentoController::create
 * @see app/Http/Controllers/ProcedimentoController.php:30
 * @route '/procedimentos/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProcedimentoController::create
 * @see app/Http/Controllers/ProcedimentoController.php:30
 * @route '/procedimentos/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProcedimentoController::create
 * @see app/Http/Controllers/ProcedimentoController.php:30
 * @route '/procedimentos/create'
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
* @see \App\Http\Controllers\ProcedimentoController::store
 * @see app/Http/Controllers/ProcedimentoController.php:42
 * @route '/procedimentos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/procedimentos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProcedimentoController::store
 * @see app/Http/Controllers/ProcedimentoController.php:42
 * @route '/procedimentos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProcedimentoController::store
 * @see app/Http/Controllers/ProcedimentoController.php:42
 * @route '/procedimentos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProcedimentoController::store
 * @see app/Http/Controllers/ProcedimentoController.php:42
 * @route '/procedimentos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProcedimentoController::store
 * @see app/Http/Controllers/ProcedimentoController.php:42
 * @route '/procedimentos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ProcedimentoController::show
 * @see app/Http/Controllers/ProcedimentoController.php:61
 * @route '/procedimentos/{procedimento}'
 */
export const show = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/procedimentos/{procedimento}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProcedimentoController::show
 * @see app/Http/Controllers/ProcedimentoController.php:61
 * @route '/procedimentos/{procedimento}'
 */
show.url = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { procedimento: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { procedimento: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    procedimento: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        procedimento: typeof args.procedimento === 'object'
                ? args.procedimento.id
                : args.procedimento,
                }

    return show.definition.url
            .replace('{procedimento}', parsedArgs.procedimento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProcedimentoController::show
 * @see app/Http/Controllers/ProcedimentoController.php:61
 * @route '/procedimentos/{procedimento}'
 */
show.get = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProcedimentoController::show
 * @see app/Http/Controllers/ProcedimentoController.php:61
 * @route '/procedimentos/{procedimento}'
 */
show.head = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProcedimentoController::show
 * @see app/Http/Controllers/ProcedimentoController.php:61
 * @route '/procedimentos/{procedimento}'
 */
    const showForm = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProcedimentoController::show
 * @see app/Http/Controllers/ProcedimentoController.php:61
 * @route '/procedimentos/{procedimento}'
 */
        showForm.get = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProcedimentoController::show
 * @see app/Http/Controllers/ProcedimentoController.php:61
 * @route '/procedimentos/{procedimento}'
 */
        showForm.head = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ProcedimentoController::edit
 * @see app/Http/Controllers/ProcedimentoController.php:73
 * @route '/procedimentos/{procedimento}/edit'
 */
export const edit = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/procedimentos/{procedimento}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProcedimentoController::edit
 * @see app/Http/Controllers/ProcedimentoController.php:73
 * @route '/procedimentos/{procedimento}/edit'
 */
edit.url = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { procedimento: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { procedimento: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    procedimento: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        procedimento: typeof args.procedimento === 'object'
                ? args.procedimento.id
                : args.procedimento,
                }

    return edit.definition.url
            .replace('{procedimento}', parsedArgs.procedimento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProcedimentoController::edit
 * @see app/Http/Controllers/ProcedimentoController.php:73
 * @route '/procedimentos/{procedimento}/edit'
 */
edit.get = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProcedimentoController::edit
 * @see app/Http/Controllers/ProcedimentoController.php:73
 * @route '/procedimentos/{procedimento}/edit'
 */
edit.head = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProcedimentoController::edit
 * @see app/Http/Controllers/ProcedimentoController.php:73
 * @route '/procedimentos/{procedimento}/edit'
 */
    const editForm = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProcedimentoController::edit
 * @see app/Http/Controllers/ProcedimentoController.php:73
 * @route '/procedimentos/{procedimento}/edit'
 */
        editForm.get = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProcedimentoController::edit
 * @see app/Http/Controllers/ProcedimentoController.php:73
 * @route '/procedimentos/{procedimento}/edit'
 */
        editForm.head = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ProcedimentoController::update
 * @see app/Http/Controllers/ProcedimentoController.php:86
 * @route '/procedimentos/{procedimento}'
 */
export const update = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/procedimentos/{procedimento}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProcedimentoController::update
 * @see app/Http/Controllers/ProcedimentoController.php:86
 * @route '/procedimentos/{procedimento}'
 */
update.url = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { procedimento: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { procedimento: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    procedimento: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        procedimento: typeof args.procedimento === 'object'
                ? args.procedimento.id
                : args.procedimento,
                }

    return update.definition.url
            .replace('{procedimento}', parsedArgs.procedimento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProcedimentoController::update
 * @see app/Http/Controllers/ProcedimentoController.php:86
 * @route '/procedimentos/{procedimento}'
 */
update.put = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ProcedimentoController::update
 * @see app/Http/Controllers/ProcedimentoController.php:86
 * @route '/procedimentos/{procedimento}'
 */
update.patch = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ProcedimentoController::update
 * @see app/Http/Controllers/ProcedimentoController.php:86
 * @route '/procedimentos/{procedimento}'
 */
    const updateForm = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProcedimentoController::update
 * @see app/Http/Controllers/ProcedimentoController.php:86
 * @route '/procedimentos/{procedimento}'
 */
        updateForm.put = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\ProcedimentoController::update
 * @see app/Http/Controllers/ProcedimentoController.php:86
 * @route '/procedimentos/{procedimento}'
 */
        updateForm.patch = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProcedimentoController::destroy
 * @see app/Http/Controllers/ProcedimentoController.php:100
 * @route '/procedimentos/{procedimento}'
 */
export const destroy = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/procedimentos/{procedimento}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProcedimentoController::destroy
 * @see app/Http/Controllers/ProcedimentoController.php:100
 * @route '/procedimentos/{procedimento}'
 */
destroy.url = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { procedimento: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { procedimento: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    procedimento: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        procedimento: typeof args.procedimento === 'object'
                ? args.procedimento.id
                : args.procedimento,
                }

    return destroy.definition.url
            .replace('{procedimento}', parsedArgs.procedimento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProcedimentoController::destroy
 * @see app/Http/Controllers/ProcedimentoController.php:100
 * @route '/procedimentos/{procedimento}'
 */
destroy.delete = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProcedimentoController::destroy
 * @see app/Http/Controllers/ProcedimentoController.php:100
 * @route '/procedimentos/{procedimento}'
 */
    const destroyForm = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProcedimentoController::destroy
 * @see app/Http/Controllers/ProcedimentoController.php:100
 * @route '/procedimentos/{procedimento}'
 */
        destroyForm.delete = (args: { procedimento: number | { id: number } } | [procedimento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const procedimentos = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default procedimentos