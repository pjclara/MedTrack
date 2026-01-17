import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TipoDeOrigemController::index
 * @see app/Http/Controllers/TipoDeOrigemController.php:14
 * @route '/tipos-de-origem'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tipos-de-origem',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoDeOrigemController::index
 * @see app/Http/Controllers/TipoDeOrigemController.php:14
 * @route '/tipos-de-origem'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeOrigemController::index
 * @see app/Http/Controllers/TipoDeOrigemController.php:14
 * @route '/tipos-de-origem'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoDeOrigemController::index
 * @see app/Http/Controllers/TipoDeOrigemController.php:14
 * @route '/tipos-de-origem'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoDeOrigemController::index
 * @see app/Http/Controllers/TipoDeOrigemController.php:14
 * @route '/tipos-de-origem'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoDeOrigemController::index
 * @see app/Http/Controllers/TipoDeOrigemController.php:14
 * @route '/tipos-de-origem'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoDeOrigemController::index
 * @see app/Http/Controllers/TipoDeOrigemController.php:14
 * @route '/tipos-de-origem'
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
* @see \App\Http\Controllers\TipoDeOrigemController::create
 * @see app/Http/Controllers/TipoDeOrigemController.php:25
 * @route '/tipos-de-origem/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tipos-de-origem/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoDeOrigemController::create
 * @see app/Http/Controllers/TipoDeOrigemController.php:25
 * @route '/tipos-de-origem/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeOrigemController::create
 * @see app/Http/Controllers/TipoDeOrigemController.php:25
 * @route '/tipos-de-origem/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoDeOrigemController::create
 * @see app/Http/Controllers/TipoDeOrigemController.php:25
 * @route '/tipos-de-origem/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoDeOrigemController::create
 * @see app/Http/Controllers/TipoDeOrigemController.php:25
 * @route '/tipos-de-origem/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoDeOrigemController::create
 * @see app/Http/Controllers/TipoDeOrigemController.php:25
 * @route '/tipos-de-origem/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoDeOrigemController::create
 * @see app/Http/Controllers/TipoDeOrigemController.php:25
 * @route '/tipos-de-origem/create'
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
* @see \App\Http\Controllers\TipoDeOrigemController::store
 * @see app/Http/Controllers/TipoDeOrigemController.php:33
 * @route '/tipos-de-origem'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tipos-de-origem',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TipoDeOrigemController::store
 * @see app/Http/Controllers/TipoDeOrigemController.php:33
 * @route '/tipos-de-origem'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeOrigemController::store
 * @see app/Http/Controllers/TipoDeOrigemController.php:33
 * @route '/tipos-de-origem'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TipoDeOrigemController::store
 * @see app/Http/Controllers/TipoDeOrigemController.php:33
 * @route '/tipos-de-origem'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TipoDeOrigemController::store
 * @see app/Http/Controllers/TipoDeOrigemController.php:33
 * @route '/tipos-de-origem'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TipoDeOrigemController::show
 * @see app/Http/Controllers/TipoDeOrigemController.php:48
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
export const show = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tipos-de-origem/{tipos_de_origem}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoDeOrigemController::show
 * @see app/Http/Controllers/TipoDeOrigemController.php:48
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
show.url = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_de_origem: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tipos_de_origem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipos_de_origem: args.tipos_de_origem,
                }

    return show.definition.url
            .replace('{tipos_de_origem}', parsedArgs.tipos_de_origem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeOrigemController::show
 * @see app/Http/Controllers/TipoDeOrigemController.php:48
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
show.get = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoDeOrigemController::show
 * @see app/Http/Controllers/TipoDeOrigemController.php:48
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
show.head = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoDeOrigemController::show
 * @see app/Http/Controllers/TipoDeOrigemController.php:48
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
    const showForm = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoDeOrigemController::show
 * @see app/Http/Controllers/TipoDeOrigemController.php:48
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
        showForm.get = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoDeOrigemController::show
 * @see app/Http/Controllers/TipoDeOrigemController.php:48
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
        showForm.head = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TipoDeOrigemController::edit
 * @see app/Http/Controllers/TipoDeOrigemController.php:58
 * @route '/tipos-de-origem/{tipos_de_origem}/edit'
 */
export const edit = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/tipos-de-origem/{tipos_de_origem}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoDeOrigemController::edit
 * @see app/Http/Controllers/TipoDeOrigemController.php:58
 * @route '/tipos-de-origem/{tipos_de_origem}/edit'
 */
edit.url = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_de_origem: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tipos_de_origem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipos_de_origem: args.tipos_de_origem,
                }

    return edit.definition.url
            .replace('{tipos_de_origem}', parsedArgs.tipos_de_origem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeOrigemController::edit
 * @see app/Http/Controllers/TipoDeOrigemController.php:58
 * @route '/tipos-de-origem/{tipos_de_origem}/edit'
 */
edit.get = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoDeOrigemController::edit
 * @see app/Http/Controllers/TipoDeOrigemController.php:58
 * @route '/tipos-de-origem/{tipos_de_origem}/edit'
 */
edit.head = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoDeOrigemController::edit
 * @see app/Http/Controllers/TipoDeOrigemController.php:58
 * @route '/tipos-de-origem/{tipos_de_origem}/edit'
 */
    const editForm = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoDeOrigemController::edit
 * @see app/Http/Controllers/TipoDeOrigemController.php:58
 * @route '/tipos-de-origem/{tipos_de_origem}/edit'
 */
        editForm.get = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoDeOrigemController::edit
 * @see app/Http/Controllers/TipoDeOrigemController.php:58
 * @route '/tipos-de-origem/{tipos_de_origem}/edit'
 */
        editForm.head = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TipoDeOrigemController::update
 * @see app/Http/Controllers/TipoDeOrigemController.php:68
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
export const update = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/tipos-de-origem/{tipos_de_origem}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TipoDeOrigemController::update
 * @see app/Http/Controllers/TipoDeOrigemController.php:68
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
update.url = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_de_origem: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tipos_de_origem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipos_de_origem: args.tipos_de_origem,
                }

    return update.definition.url
            .replace('{tipos_de_origem}', parsedArgs.tipos_de_origem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeOrigemController::update
 * @see app/Http/Controllers/TipoDeOrigemController.php:68
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
update.put = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\TipoDeOrigemController::update
 * @see app/Http/Controllers/TipoDeOrigemController.php:68
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
update.patch = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TipoDeOrigemController::update
 * @see app/Http/Controllers/TipoDeOrigemController.php:68
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
    const updateForm = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TipoDeOrigemController::update
 * @see app/Http/Controllers/TipoDeOrigemController.php:68
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
        updateForm.put = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\TipoDeOrigemController::update
 * @see app/Http/Controllers/TipoDeOrigemController.php:68
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
        updateForm.patch = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TipoDeOrigemController::destroy
 * @see app/Http/Controllers/TipoDeOrigemController.php:83
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
export const destroy = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tipos-de-origem/{tipos_de_origem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TipoDeOrigemController::destroy
 * @see app/Http/Controllers/TipoDeOrigemController.php:83
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
destroy.url = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_de_origem: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tipos_de_origem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipos_de_origem: args.tipos_de_origem,
                }

    return destroy.definition.url
            .replace('{tipos_de_origem}', parsedArgs.tipos_de_origem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeOrigemController::destroy
 * @see app/Http/Controllers/TipoDeOrigemController.php:83
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
destroy.delete = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TipoDeOrigemController::destroy
 * @see app/Http/Controllers/TipoDeOrigemController.php:83
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
    const destroyForm = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TipoDeOrigemController::destroy
 * @see app/Http/Controllers/TipoDeOrigemController.php:83
 * @route '/tipos-de-origem/{tipos_de_origem}'
 */
        destroyForm.delete = (args: { tipos_de_origem: string | number } | [tipos_de_origem: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const tiposDeOrigem = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default tiposDeOrigem