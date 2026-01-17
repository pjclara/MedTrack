import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ZonaAnatomicaController::index
 * @see app/Http/Controllers/ZonaAnatomicaController.php:17
 * @route '/zona-anatomicas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/zona-anatomicas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::index
 * @see app/Http/Controllers/ZonaAnatomicaController.php:17
 * @route '/zona-anatomicas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::index
 * @see app/Http/Controllers/ZonaAnatomicaController.php:17
 * @route '/zona-anatomicas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ZonaAnatomicaController::index
 * @see app/Http/Controllers/ZonaAnatomicaController.php:17
 * @route '/zona-anatomicas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ZonaAnatomicaController::index
 * @see app/Http/Controllers/ZonaAnatomicaController.php:17
 * @route '/zona-anatomicas'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::index
 * @see app/Http/Controllers/ZonaAnatomicaController.php:17
 * @route '/zona-anatomicas'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::index
 * @see app/Http/Controllers/ZonaAnatomicaController.php:17
 * @route '/zona-anatomicas'
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
* @see \App\Http\Controllers\ZonaAnatomicaController::create
 * @see app/Http/Controllers/ZonaAnatomicaController.php:29
 * @route '/zona-anatomicas/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/zona-anatomicas/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::create
 * @see app/Http/Controllers/ZonaAnatomicaController.php:29
 * @route '/zona-anatomicas/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::create
 * @see app/Http/Controllers/ZonaAnatomicaController.php:29
 * @route '/zona-anatomicas/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ZonaAnatomicaController::create
 * @see app/Http/Controllers/ZonaAnatomicaController.php:29
 * @route '/zona-anatomicas/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ZonaAnatomicaController::create
 * @see app/Http/Controllers/ZonaAnatomicaController.php:29
 * @route '/zona-anatomicas/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::create
 * @see app/Http/Controllers/ZonaAnatomicaController.php:29
 * @route '/zona-anatomicas/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::create
 * @see app/Http/Controllers/ZonaAnatomicaController.php:29
 * @route '/zona-anatomicas/create'
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
* @see \App\Http\Controllers\ZonaAnatomicaController::store
 * @see app/Http/Controllers/ZonaAnatomicaController.php:38
 * @route '/zona-anatomicas'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/zona-anatomicas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::store
 * @see app/Http/Controllers/ZonaAnatomicaController.php:38
 * @route '/zona-anatomicas'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::store
 * @see app/Http/Controllers/ZonaAnatomicaController.php:38
 * @route '/zona-anatomicas'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ZonaAnatomicaController::store
 * @see app/Http/Controllers/ZonaAnatomicaController.php:38
 * @route '/zona-anatomicas'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::store
 * @see app/Http/Controllers/ZonaAnatomicaController.php:38
 * @route '/zona-anatomicas'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ZonaAnatomicaController::show
 * @see app/Http/Controllers/ZonaAnatomicaController.php:57
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
export const show = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/zona-anatomicas/{zona_anatomica}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::show
 * @see app/Http/Controllers/ZonaAnatomicaController.php:57
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
show.url = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { zona_anatomica: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    zona_anatomica: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        zona_anatomica: args.zona_anatomica,
                }

    return show.definition.url
            .replace('{zona_anatomica}', parsedArgs.zona_anatomica.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::show
 * @see app/Http/Controllers/ZonaAnatomicaController.php:57
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
show.get = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ZonaAnatomicaController::show
 * @see app/Http/Controllers/ZonaAnatomicaController.php:57
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
show.head = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ZonaAnatomicaController::show
 * @see app/Http/Controllers/ZonaAnatomicaController.php:57
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
    const showForm = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::show
 * @see app/Http/Controllers/ZonaAnatomicaController.php:57
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
        showForm.get = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::show
 * @see app/Http/Controllers/ZonaAnatomicaController.php:57
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
        showForm.head = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ZonaAnatomicaController::edit
 * @see app/Http/Controllers/ZonaAnatomicaController.php:68
 * @route '/zona-anatomicas/{zona_anatomica}/edit'
 */
export const edit = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/zona-anatomicas/{zona_anatomica}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::edit
 * @see app/Http/Controllers/ZonaAnatomicaController.php:68
 * @route '/zona-anatomicas/{zona_anatomica}/edit'
 */
edit.url = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { zona_anatomica: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    zona_anatomica: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        zona_anatomica: args.zona_anatomica,
                }

    return edit.definition.url
            .replace('{zona_anatomica}', parsedArgs.zona_anatomica.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::edit
 * @see app/Http/Controllers/ZonaAnatomicaController.php:68
 * @route '/zona-anatomicas/{zona_anatomica}/edit'
 */
edit.get = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ZonaAnatomicaController::edit
 * @see app/Http/Controllers/ZonaAnatomicaController.php:68
 * @route '/zona-anatomicas/{zona_anatomica}/edit'
 */
edit.head = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ZonaAnatomicaController::edit
 * @see app/Http/Controllers/ZonaAnatomicaController.php:68
 * @route '/zona-anatomicas/{zona_anatomica}/edit'
 */
    const editForm = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::edit
 * @see app/Http/Controllers/ZonaAnatomicaController.php:68
 * @route '/zona-anatomicas/{zona_anatomica}/edit'
 */
        editForm.get = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::edit
 * @see app/Http/Controllers/ZonaAnatomicaController.php:68
 * @route '/zona-anatomicas/{zona_anatomica}/edit'
 */
        editForm.head = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ZonaAnatomicaController::update
 * @see app/Http/Controllers/ZonaAnatomicaController.php:79
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
export const update = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/zona-anatomicas/{zona_anatomica}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::update
 * @see app/Http/Controllers/ZonaAnatomicaController.php:79
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
update.url = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { zona_anatomica: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    zona_anatomica: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        zona_anatomica: args.zona_anatomica,
                }

    return update.definition.url
            .replace('{zona_anatomica}', parsedArgs.zona_anatomica.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::update
 * @see app/Http/Controllers/ZonaAnatomicaController.php:79
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
update.put = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ZonaAnatomicaController::update
 * @see app/Http/Controllers/ZonaAnatomicaController.php:79
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
update.patch = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ZonaAnatomicaController::update
 * @see app/Http/Controllers/ZonaAnatomicaController.php:79
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
    const updateForm = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::update
 * @see app/Http/Controllers/ZonaAnatomicaController.php:79
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
        updateForm.put = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::update
 * @see app/Http/Controllers/ZonaAnatomicaController.php:79
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
        updateForm.patch = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ZonaAnatomicaController::destroy
 * @see app/Http/Controllers/ZonaAnatomicaController.php:93
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
export const destroy = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/zona-anatomicas/{zona_anatomica}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::destroy
 * @see app/Http/Controllers/ZonaAnatomicaController.php:93
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
destroy.url = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { zona_anatomica: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    zona_anatomica: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        zona_anatomica: args.zona_anatomica,
                }

    return destroy.definition.url
            .replace('{zona_anatomica}', parsedArgs.zona_anatomica.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ZonaAnatomicaController::destroy
 * @see app/Http/Controllers/ZonaAnatomicaController.php:93
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
destroy.delete = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ZonaAnatomicaController::destroy
 * @see app/Http/Controllers/ZonaAnatomicaController.php:93
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
    const destroyForm = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ZonaAnatomicaController::destroy
 * @see app/Http/Controllers/ZonaAnatomicaController.php:93
 * @route '/zona-anatomicas/{zona_anatomica}'
 */
        destroyForm.delete = (args: { zona_anatomica: string | number } | [zona_anatomica: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ZonaAnatomicaController = { index, create, store, show, edit, update, destroy }

export default ZonaAnatomicaController