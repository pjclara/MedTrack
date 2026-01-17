import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UtenteController::index
 * @see app/Http/Controllers/UtenteController.php:17
 * @route '/utentes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/utentes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UtenteController::index
 * @see app/Http/Controllers/UtenteController.php:17
 * @route '/utentes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UtenteController::index
 * @see app/Http/Controllers/UtenteController.php:17
 * @route '/utentes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UtenteController::index
 * @see app/Http/Controllers/UtenteController.php:17
 * @route '/utentes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UtenteController::index
 * @see app/Http/Controllers/UtenteController.php:17
 * @route '/utentes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UtenteController::index
 * @see app/Http/Controllers/UtenteController.php:17
 * @route '/utentes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UtenteController::index
 * @see app/Http/Controllers/UtenteController.php:17
 * @route '/utentes'
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
* @see \App\Http\Controllers\UtenteController::create
 * @see app/Http/Controllers/UtenteController.php:50
 * @route '/utentes/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/utentes/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UtenteController::create
 * @see app/Http/Controllers/UtenteController.php:50
 * @route '/utentes/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UtenteController::create
 * @see app/Http/Controllers/UtenteController.php:50
 * @route '/utentes/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UtenteController::create
 * @see app/Http/Controllers/UtenteController.php:50
 * @route '/utentes/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UtenteController::create
 * @see app/Http/Controllers/UtenteController.php:50
 * @route '/utentes/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UtenteController::create
 * @see app/Http/Controllers/UtenteController.php:50
 * @route '/utentes/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UtenteController::create
 * @see app/Http/Controllers/UtenteController.php:50
 * @route '/utentes/create'
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
* @see \App\Http\Controllers\UtenteController::store
 * @see app/Http/Controllers/UtenteController.php:59
 * @route '/utentes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/utentes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UtenteController::store
 * @see app/Http/Controllers/UtenteController.php:59
 * @route '/utentes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UtenteController::store
 * @see app/Http/Controllers/UtenteController.php:59
 * @route '/utentes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UtenteController::store
 * @see app/Http/Controllers/UtenteController.php:59
 * @route '/utentes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UtenteController::store
 * @see app/Http/Controllers/UtenteController.php:59
 * @route '/utentes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\UtenteController::show
 * @see app/Http/Controllers/UtenteController.php:74
 * @route '/utentes/{utente}'
 */
export const show = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/utentes/{utente}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UtenteController::show
 * @see app/Http/Controllers/UtenteController.php:74
 * @route '/utentes/{utente}'
 */
show.url = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { utente: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { utente: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    utente: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        utente: typeof args.utente === 'object'
                ? args.utente.id
                : args.utente,
                }

    return show.definition.url
            .replace('{utente}', parsedArgs.utente.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UtenteController::show
 * @see app/Http/Controllers/UtenteController.php:74
 * @route '/utentes/{utente}'
 */
show.get = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UtenteController::show
 * @see app/Http/Controllers/UtenteController.php:74
 * @route '/utentes/{utente}'
 */
show.head = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UtenteController::show
 * @see app/Http/Controllers/UtenteController.php:74
 * @route '/utentes/{utente}'
 */
    const showForm = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UtenteController::show
 * @see app/Http/Controllers/UtenteController.php:74
 * @route '/utentes/{utente}'
 */
        showForm.get = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UtenteController::show
 * @see app/Http/Controllers/UtenteController.php:74
 * @route '/utentes/{utente}'
 */
        showForm.head = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\UtenteController::edit
 * @see app/Http/Controllers/UtenteController.php:105
 * @route '/utentes/{utente}/edit'
 */
export const edit = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/utentes/{utente}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UtenteController::edit
 * @see app/Http/Controllers/UtenteController.php:105
 * @route '/utentes/{utente}/edit'
 */
edit.url = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { utente: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { utente: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    utente: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        utente: typeof args.utente === 'object'
                ? args.utente.id
                : args.utente,
                }

    return edit.definition.url
            .replace('{utente}', parsedArgs.utente.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UtenteController::edit
 * @see app/Http/Controllers/UtenteController.php:105
 * @route '/utentes/{utente}/edit'
 */
edit.get = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UtenteController::edit
 * @see app/Http/Controllers/UtenteController.php:105
 * @route '/utentes/{utente}/edit'
 */
edit.head = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UtenteController::edit
 * @see app/Http/Controllers/UtenteController.php:105
 * @route '/utentes/{utente}/edit'
 */
    const editForm = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UtenteController::edit
 * @see app/Http/Controllers/UtenteController.php:105
 * @route '/utentes/{utente}/edit'
 */
        editForm.get = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UtenteController::edit
 * @see app/Http/Controllers/UtenteController.php:105
 * @route '/utentes/{utente}/edit'
 */
        editForm.head = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\UtenteController::update
 * @see app/Http/Controllers/UtenteController.php:118
 * @route '/utentes/{utente}'
 */
export const update = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/utentes/{utente}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\UtenteController::update
 * @see app/Http/Controllers/UtenteController.php:118
 * @route '/utentes/{utente}'
 */
update.url = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { utente: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { utente: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    utente: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        utente: typeof args.utente === 'object'
                ? args.utente.id
                : args.utente,
                }

    return update.definition.url
            .replace('{utente}', parsedArgs.utente.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UtenteController::update
 * @see app/Http/Controllers/UtenteController.php:118
 * @route '/utentes/{utente}'
 */
update.put = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\UtenteController::update
 * @see app/Http/Controllers/UtenteController.php:118
 * @route '/utentes/{utente}'
 */
update.patch = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\UtenteController::update
 * @see app/Http/Controllers/UtenteController.php:118
 * @route '/utentes/{utente}'
 */
    const updateForm = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UtenteController::update
 * @see app/Http/Controllers/UtenteController.php:118
 * @route '/utentes/{utente}'
 */
        updateForm.put = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\UtenteController::update
 * @see app/Http/Controllers/UtenteController.php:118
 * @route '/utentes/{utente}'
 */
        updateForm.patch = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\UtenteController::destroy
 * @see app/Http/Controllers/UtenteController.php:132
 * @route '/utentes/{utente}'
 */
export const destroy = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/utentes/{utente}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UtenteController::destroy
 * @see app/Http/Controllers/UtenteController.php:132
 * @route '/utentes/{utente}'
 */
destroy.url = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { utente: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { utente: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    utente: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        utente: typeof args.utente === 'object'
                ? args.utente.id
                : args.utente,
                }

    return destroy.definition.url
            .replace('{utente}', parsedArgs.utente.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UtenteController::destroy
 * @see app/Http/Controllers/UtenteController.php:132
 * @route '/utentes/{utente}'
 */
destroy.delete = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\UtenteController::destroy
 * @see app/Http/Controllers/UtenteController.php:132
 * @route '/utentes/{utente}'
 */
    const destroyForm = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UtenteController::destroy
 * @see app/Http/Controllers/UtenteController.php:132
 * @route '/utentes/{utente}'
 */
        destroyForm.delete = (args: { utente: number | { id: number } } | [utente: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\UtenteController::findByProcesso
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
export const findByProcesso = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findByProcesso.url(args, options),
    method: 'get',
})

findByProcesso.definition = {
    methods: ["get","head"],
    url: '/api/utentes/processo/{processo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UtenteController::findByProcesso
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
findByProcesso.url = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return findByProcesso.definition.url
            .replace('{processo}', parsedArgs.processo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UtenteController::findByProcesso
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
findByProcesso.get = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: findByProcesso.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UtenteController::findByProcesso
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
findByProcesso.head = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: findByProcesso.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UtenteController::findByProcesso
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
    const findByProcessoForm = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: findByProcesso.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UtenteController::findByProcesso
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
        findByProcessoForm.get = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: findByProcesso.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UtenteController::findByProcesso
 * @see app/Http/Controllers/UtenteController.php:144
 * @route '/api/utentes/processo/{processo}'
 */
        findByProcessoForm.head = (args: { processo: string | number } | [processo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: findByProcesso.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    findByProcesso.form = findByProcessoForm
const UtenteController = { index, create, store, show, edit, update, destroy, findByProcesso }

export default UtenteController