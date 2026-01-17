import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RegistoCirurgicoController::exportMethod
 * @see app/Http/Controllers/RegistoCirurgicoController.php:337
 * @route '/registos-cirurgicos/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/registos-cirurgicos/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::exportMethod
 * @see app/Http/Controllers/RegistoCirurgicoController.php:337
 * @route '/registos-cirurgicos/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::exportMethod
 * @see app/Http/Controllers/RegistoCirurgicoController.php:337
 * @route '/registos-cirurgicos/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RegistoCirurgicoController::exportMethod
 * @see app/Http/Controllers/RegistoCirurgicoController.php:337
 * @route '/registos-cirurgicos/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RegistoCirurgicoController::exportMethod
 * @see app/Http/Controllers/RegistoCirurgicoController.php:337
 * @route '/registos-cirurgicos/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::exportMethod
 * @see app/Http/Controllers/RegistoCirurgicoController.php:337
 * @route '/registos-cirurgicos/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::exportMethod
 * @see app/Http/Controllers/RegistoCirurgicoController.php:337
 * @route '/registos-cirurgicos/export'
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
* @see \App\Http\Controllers\RegistoCirurgicoController::index
 * @see app/Http/Controllers/RegistoCirurgicoController.php:31
 * @route '/registos-cirurgicos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/registos-cirurgicos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::index
 * @see app/Http/Controllers/RegistoCirurgicoController.php:31
 * @route '/registos-cirurgicos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::index
 * @see app/Http/Controllers/RegistoCirurgicoController.php:31
 * @route '/registos-cirurgicos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RegistoCirurgicoController::index
 * @see app/Http/Controllers/RegistoCirurgicoController.php:31
 * @route '/registos-cirurgicos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RegistoCirurgicoController::index
 * @see app/Http/Controllers/RegistoCirurgicoController.php:31
 * @route '/registos-cirurgicos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::index
 * @see app/Http/Controllers/RegistoCirurgicoController.php:31
 * @route '/registos-cirurgicos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::index
 * @see app/Http/Controllers/RegistoCirurgicoController.php:31
 * @route '/registos-cirurgicos'
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
* @see \App\Http\Controllers\RegistoCirurgicoController::create
 * @see app/Http/Controllers/RegistoCirurgicoController.php:54
 * @route '/registos-cirurgicos/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/registos-cirurgicos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::create
 * @see app/Http/Controllers/RegistoCirurgicoController.php:54
 * @route '/registos-cirurgicos/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::create
 * @see app/Http/Controllers/RegistoCirurgicoController.php:54
 * @route '/registos-cirurgicos/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RegistoCirurgicoController::create
 * @see app/Http/Controllers/RegistoCirurgicoController.php:54
 * @route '/registos-cirurgicos/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RegistoCirurgicoController::create
 * @see app/Http/Controllers/RegistoCirurgicoController.php:54
 * @route '/registos-cirurgicos/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::create
 * @see app/Http/Controllers/RegistoCirurgicoController.php:54
 * @route '/registos-cirurgicos/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::create
 * @see app/Http/Controllers/RegistoCirurgicoController.php:54
 * @route '/registos-cirurgicos/create'
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
* @see \App\Http\Controllers\RegistoCirurgicoController::store
 * @see app/Http/Controllers/RegistoCirurgicoController.php:96
 * @route '/registos-cirurgicos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/registos-cirurgicos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::store
 * @see app/Http/Controllers/RegistoCirurgicoController.php:96
 * @route '/registos-cirurgicos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::store
 * @see app/Http/Controllers/RegistoCirurgicoController.php:96
 * @route '/registos-cirurgicos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RegistoCirurgicoController::store
 * @see app/Http/Controllers/RegistoCirurgicoController.php:96
 * @route '/registos-cirurgicos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::store
 * @see app/Http/Controllers/RegistoCirurgicoController.php:96
 * @route '/registos-cirurgicos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RegistoCirurgicoController::show
 * @see app/Http/Controllers/RegistoCirurgicoController.php:160
 * @route '/registos-cirurgicos/{registo}'
 */
export const show = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/registos-cirurgicos/{registo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::show
 * @see app/Http/Controllers/RegistoCirurgicoController.php:160
 * @route '/registos-cirurgicos/{registo}'
 */
show.url = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { registo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { registo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    registo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        registo: typeof args.registo === 'object'
                ? args.registo.id
                : args.registo,
                }

    return show.definition.url
            .replace('{registo}', parsedArgs.registo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::show
 * @see app/Http/Controllers/RegistoCirurgicoController.php:160
 * @route '/registos-cirurgicos/{registo}'
 */
show.get = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RegistoCirurgicoController::show
 * @see app/Http/Controllers/RegistoCirurgicoController.php:160
 * @route '/registos-cirurgicos/{registo}'
 */
show.head = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RegistoCirurgicoController::show
 * @see app/Http/Controllers/RegistoCirurgicoController.php:160
 * @route '/registos-cirurgicos/{registo}'
 */
    const showForm = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::show
 * @see app/Http/Controllers/RegistoCirurgicoController.php:160
 * @route '/registos-cirurgicos/{registo}'
 */
        showForm.get = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::show
 * @see app/Http/Controllers/RegistoCirurgicoController.php:160
 * @route '/registos-cirurgicos/{registo}'
 */
        showForm.head = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RegistoCirurgicoController::edit
 * @see app/Http/Controllers/RegistoCirurgicoController.php:181
 * @route '/registos-cirurgicos/{registo}/edit'
 */
export const edit = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/registos-cirurgicos/{registo}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::edit
 * @see app/Http/Controllers/RegistoCirurgicoController.php:181
 * @route '/registos-cirurgicos/{registo}/edit'
 */
edit.url = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { registo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { registo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    registo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        registo: typeof args.registo === 'object'
                ? args.registo.id
                : args.registo,
                }

    return edit.definition.url
            .replace('{registo}', parsedArgs.registo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::edit
 * @see app/Http/Controllers/RegistoCirurgicoController.php:181
 * @route '/registos-cirurgicos/{registo}/edit'
 */
edit.get = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RegistoCirurgicoController::edit
 * @see app/Http/Controllers/RegistoCirurgicoController.php:181
 * @route '/registos-cirurgicos/{registo}/edit'
 */
edit.head = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RegistoCirurgicoController::edit
 * @see app/Http/Controllers/RegistoCirurgicoController.php:181
 * @route '/registos-cirurgicos/{registo}/edit'
 */
    const editForm = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::edit
 * @see app/Http/Controllers/RegistoCirurgicoController.php:181
 * @route '/registos-cirurgicos/{registo}/edit'
 */
        editForm.get = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::edit
 * @see app/Http/Controllers/RegistoCirurgicoController.php:181
 * @route '/registos-cirurgicos/{registo}/edit'
 */
        editForm.head = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RegistoCirurgicoController::update
 * @see app/Http/Controllers/RegistoCirurgicoController.php:264
 * @route '/registos-cirurgicos/{registo}'
 */
export const update = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/registos-cirurgicos/{registo}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::update
 * @see app/Http/Controllers/RegistoCirurgicoController.php:264
 * @route '/registos-cirurgicos/{registo}'
 */
update.url = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { registo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { registo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    registo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        registo: typeof args.registo === 'object'
                ? args.registo.id
                : args.registo,
                }

    return update.definition.url
            .replace('{registo}', parsedArgs.registo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::update
 * @see app/Http/Controllers/RegistoCirurgicoController.php:264
 * @route '/registos-cirurgicos/{registo}'
 */
update.put = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\RegistoCirurgicoController::update
 * @see app/Http/Controllers/RegistoCirurgicoController.php:264
 * @route '/registos-cirurgicos/{registo}'
 */
update.patch = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\RegistoCirurgicoController::update
 * @see app/Http/Controllers/RegistoCirurgicoController.php:264
 * @route '/registos-cirurgicos/{registo}'
 */
    const updateForm = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::update
 * @see app/Http/Controllers/RegistoCirurgicoController.php:264
 * @route '/registos-cirurgicos/{registo}'
 */
        updateForm.put = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::update
 * @see app/Http/Controllers/RegistoCirurgicoController.php:264
 * @route '/registos-cirurgicos/{registo}'
 */
        updateForm.patch = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\RegistoCirurgicoController::destroy
 * @see app/Http/Controllers/RegistoCirurgicoController.php:324
 * @route '/registos-cirurgicos/{registo}'
 */
export const destroy = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/registos-cirurgicos/{registo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::destroy
 * @see app/Http/Controllers/RegistoCirurgicoController.php:324
 * @route '/registos-cirurgicos/{registo}'
 */
destroy.url = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { registo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { registo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    registo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        registo: typeof args.registo === 'object'
                ? args.registo.id
                : args.registo,
                }

    return destroy.definition.url
            .replace('{registo}', parsedArgs.registo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RegistoCirurgicoController::destroy
 * @see app/Http/Controllers/RegistoCirurgicoController.php:324
 * @route '/registos-cirurgicos/{registo}'
 */
destroy.delete = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RegistoCirurgicoController::destroy
 * @see app/Http/Controllers/RegistoCirurgicoController.php:324
 * @route '/registos-cirurgicos/{registo}'
 */
    const destroyForm = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RegistoCirurgicoController::destroy
 * @see app/Http/Controllers/RegistoCirurgicoController.php:324
 * @route '/registos-cirurgicos/{registo}'
 */
        destroyForm.delete = (args: { registo: number | { id: number } } | [registo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const RegistoCirurgicoController = { exportMethod, index, create, store, show, edit, update, destroy, export: exportMethod }

export default RegistoCirurgicoController