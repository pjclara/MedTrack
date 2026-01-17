import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::index
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:14
 * @route '/tipos-de-cirurgia'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tipos-de-cirurgia',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::index
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:14
 * @route '/tipos-de-cirurgia'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::index
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:14
 * @route '/tipos-de-cirurgia'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::index
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:14
 * @route '/tipos-de-cirurgia'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::index
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:14
 * @route '/tipos-de-cirurgia'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::index
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:14
 * @route '/tipos-de-cirurgia'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::index
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:14
 * @route '/tipos-de-cirurgia'
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
* @see \App\Http\Controllers\TipoDeCirurgiaController::create
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:25
 * @route '/tipos-de-cirurgia/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tipos-de-cirurgia/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::create
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:25
 * @route '/tipos-de-cirurgia/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::create
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:25
 * @route '/tipos-de-cirurgia/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::create
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:25
 * @route '/tipos-de-cirurgia/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::create
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:25
 * @route '/tipos-de-cirurgia/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::create
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:25
 * @route '/tipos-de-cirurgia/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::create
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:25
 * @route '/tipos-de-cirurgia/create'
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
* @see \App\Http\Controllers\TipoDeCirurgiaController::store
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:33
 * @route '/tipos-de-cirurgia'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tipos-de-cirurgia',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::store
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:33
 * @route '/tipos-de-cirurgia'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::store
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:33
 * @route '/tipos-de-cirurgia'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::store
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:33
 * @route '/tipos-de-cirurgia'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::store
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:33
 * @route '/tipos-de-cirurgia'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::show
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:48
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
export const show = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tipos-de-cirurgia/{tipos_de_cirurgium}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::show
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:48
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
show.url = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_de_cirurgium: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tipos_de_cirurgium: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipos_de_cirurgium: args.tipos_de_cirurgium,
                }

    return show.definition.url
            .replace('{tipos_de_cirurgium}', parsedArgs.tipos_de_cirurgium.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::show
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:48
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
show.get = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::show
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:48
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
show.head = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::show
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:48
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
    const showForm = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::show
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:48
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
        showForm.get = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::show
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:48
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
        showForm.head = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TipoDeCirurgiaController::edit
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:58
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}/edit'
 */
export const edit = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/tipos-de-cirurgia/{tipos_de_cirurgium}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::edit
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:58
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}/edit'
 */
edit.url = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_de_cirurgium: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tipos_de_cirurgium: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipos_de_cirurgium: args.tipos_de_cirurgium,
                }

    return edit.definition.url
            .replace('{tipos_de_cirurgium}', parsedArgs.tipos_de_cirurgium.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::edit
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:58
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}/edit'
 */
edit.get = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::edit
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:58
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}/edit'
 */
edit.head = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::edit
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:58
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}/edit'
 */
    const editForm = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::edit
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:58
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}/edit'
 */
        editForm.get = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::edit
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:58
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}/edit'
 */
        editForm.head = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TipoDeCirurgiaController::update
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:68
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
export const update = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/tipos-de-cirurgia/{tipos_de_cirurgium}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::update
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:68
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
update.url = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_de_cirurgium: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tipos_de_cirurgium: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipos_de_cirurgium: args.tipos_de_cirurgium,
                }

    return update.definition.url
            .replace('{tipos_de_cirurgium}', parsedArgs.tipos_de_cirurgium.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::update
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:68
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
update.put = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::update
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:68
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
update.patch = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::update
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:68
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
    const updateForm = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::update
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:68
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
        updateForm.put = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::update
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:68
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
        updateForm.patch = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TipoDeCirurgiaController::destroy
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:83
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
export const destroy = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tipos-de-cirurgia/{tipos_de_cirurgium}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::destroy
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:83
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
destroy.url = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipos_de_cirurgium: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tipos_de_cirurgium: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipos_de_cirurgium: args.tipos_de_cirurgium,
                }

    return destroy.definition.url
            .replace('{tipos_de_cirurgium}', parsedArgs.tipos_de_cirurgium.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoDeCirurgiaController::destroy
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:83
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
destroy.delete = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::destroy
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:83
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
    const destroyForm = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TipoDeCirurgiaController::destroy
 * @see app/Http/Controllers/TipoDeCirurgiaController.php:83
 * @route '/tipos-de-cirurgia/{tipos_de_cirurgium}'
 */
        destroyForm.delete = (args: { tipos_de_cirurgium: string | number } | [tipos_de_cirurgium: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const tiposDeCirurgia = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default tiposDeCirurgia