import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EspecialidadeController::index
 * @see app/Http/Controllers/EspecialidadeController.php:17
 * @route '/especialidades'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/especialidades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EspecialidadeController::index
 * @see app/Http/Controllers/EspecialidadeController.php:17
 * @route '/especialidades'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EspecialidadeController::index
 * @see app/Http/Controllers/EspecialidadeController.php:17
 * @route '/especialidades'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EspecialidadeController::index
 * @see app/Http/Controllers/EspecialidadeController.php:17
 * @route '/especialidades'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EspecialidadeController::index
 * @see app/Http/Controllers/EspecialidadeController.php:17
 * @route '/especialidades'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EspecialidadeController::index
 * @see app/Http/Controllers/EspecialidadeController.php:17
 * @route '/especialidades'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EspecialidadeController::index
 * @see app/Http/Controllers/EspecialidadeController.php:17
 * @route '/especialidades'
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
* @see \App\Http\Controllers\EspecialidadeController::create
 * @see app/Http/Controllers/EspecialidadeController.php:29
 * @route '/especialidades/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/especialidades/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EspecialidadeController::create
 * @see app/Http/Controllers/EspecialidadeController.php:29
 * @route '/especialidades/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EspecialidadeController::create
 * @see app/Http/Controllers/EspecialidadeController.php:29
 * @route '/especialidades/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EspecialidadeController::create
 * @see app/Http/Controllers/EspecialidadeController.php:29
 * @route '/especialidades/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EspecialidadeController::create
 * @see app/Http/Controllers/EspecialidadeController.php:29
 * @route '/especialidades/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EspecialidadeController::create
 * @see app/Http/Controllers/EspecialidadeController.php:29
 * @route '/especialidades/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EspecialidadeController::create
 * @see app/Http/Controllers/EspecialidadeController.php:29
 * @route '/especialidades/create'
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
* @see \App\Http\Controllers\EspecialidadeController::store
 * @see app/Http/Controllers/EspecialidadeController.php:38
 * @route '/especialidades'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/especialidades',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EspecialidadeController::store
 * @see app/Http/Controllers/EspecialidadeController.php:38
 * @route '/especialidades'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EspecialidadeController::store
 * @see app/Http/Controllers/EspecialidadeController.php:38
 * @route '/especialidades'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EspecialidadeController::store
 * @see app/Http/Controllers/EspecialidadeController.php:38
 * @route '/especialidades'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EspecialidadeController::store
 * @see app/Http/Controllers/EspecialidadeController.php:38
 * @route '/especialidades'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\EspecialidadeController::show
 * @see app/Http/Controllers/EspecialidadeController.php:57
 * @route '/especialidades/{especialidade}'
 */
export const show = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/especialidades/{especialidade}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EspecialidadeController::show
 * @see app/Http/Controllers/EspecialidadeController.php:57
 * @route '/especialidades/{especialidade}'
 */
show.url = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { especialidade: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { especialidade: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    especialidade: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        especialidade: typeof args.especialidade === 'object'
                ? args.especialidade.id
                : args.especialidade,
                }

    return show.definition.url
            .replace('{especialidade}', parsedArgs.especialidade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EspecialidadeController::show
 * @see app/Http/Controllers/EspecialidadeController.php:57
 * @route '/especialidades/{especialidade}'
 */
show.get = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EspecialidadeController::show
 * @see app/Http/Controllers/EspecialidadeController.php:57
 * @route '/especialidades/{especialidade}'
 */
show.head = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EspecialidadeController::show
 * @see app/Http/Controllers/EspecialidadeController.php:57
 * @route '/especialidades/{especialidade}'
 */
    const showForm = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EspecialidadeController::show
 * @see app/Http/Controllers/EspecialidadeController.php:57
 * @route '/especialidades/{especialidade}'
 */
        showForm.get = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EspecialidadeController::show
 * @see app/Http/Controllers/EspecialidadeController.php:57
 * @route '/especialidades/{especialidade}'
 */
        showForm.head = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\EspecialidadeController::edit
 * @see app/Http/Controllers/EspecialidadeController.php:69
 * @route '/especialidades/{especialidade}/edit'
 */
export const edit = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/especialidades/{especialidade}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EspecialidadeController::edit
 * @see app/Http/Controllers/EspecialidadeController.php:69
 * @route '/especialidades/{especialidade}/edit'
 */
edit.url = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { especialidade: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { especialidade: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    especialidade: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        especialidade: typeof args.especialidade === 'object'
                ? args.especialidade.id
                : args.especialidade,
                }

    return edit.definition.url
            .replace('{especialidade}', parsedArgs.especialidade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EspecialidadeController::edit
 * @see app/Http/Controllers/EspecialidadeController.php:69
 * @route '/especialidades/{especialidade}/edit'
 */
edit.get = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EspecialidadeController::edit
 * @see app/Http/Controllers/EspecialidadeController.php:69
 * @route '/especialidades/{especialidade}/edit'
 */
edit.head = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EspecialidadeController::edit
 * @see app/Http/Controllers/EspecialidadeController.php:69
 * @route '/especialidades/{especialidade}/edit'
 */
    const editForm = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EspecialidadeController::edit
 * @see app/Http/Controllers/EspecialidadeController.php:69
 * @route '/especialidades/{especialidade}/edit'
 */
        editForm.get = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EspecialidadeController::edit
 * @see app/Http/Controllers/EspecialidadeController.php:69
 * @route '/especialidades/{especialidade}/edit'
 */
        editForm.head = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\EspecialidadeController::update
 * @see app/Http/Controllers/EspecialidadeController.php:80
 * @route '/especialidades/{especialidade}'
 */
export const update = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/especialidades/{especialidade}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\EspecialidadeController::update
 * @see app/Http/Controllers/EspecialidadeController.php:80
 * @route '/especialidades/{especialidade}'
 */
update.url = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { especialidade: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { especialidade: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    especialidade: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        especialidade: typeof args.especialidade === 'object'
                ? args.especialidade.id
                : args.especialidade,
                }

    return update.definition.url
            .replace('{especialidade}', parsedArgs.especialidade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EspecialidadeController::update
 * @see app/Http/Controllers/EspecialidadeController.php:80
 * @route '/especialidades/{especialidade}'
 */
update.put = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\EspecialidadeController::update
 * @see app/Http/Controllers/EspecialidadeController.php:80
 * @route '/especialidades/{especialidade}'
 */
update.patch = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\EspecialidadeController::update
 * @see app/Http/Controllers/EspecialidadeController.php:80
 * @route '/especialidades/{especialidade}'
 */
    const updateForm = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EspecialidadeController::update
 * @see app/Http/Controllers/EspecialidadeController.php:80
 * @route '/especialidades/{especialidade}'
 */
        updateForm.put = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\EspecialidadeController::update
 * @see app/Http/Controllers/EspecialidadeController.php:80
 * @route '/especialidades/{especialidade}'
 */
        updateForm.patch = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\EspecialidadeController::destroy
 * @see app/Http/Controllers/EspecialidadeController.php:94
 * @route '/especialidades/{especialidade}'
 */
export const destroy = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/especialidades/{especialidade}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\EspecialidadeController::destroy
 * @see app/Http/Controllers/EspecialidadeController.php:94
 * @route '/especialidades/{especialidade}'
 */
destroy.url = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { especialidade: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { especialidade: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    especialidade: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        especialidade: typeof args.especialidade === 'object'
                ? args.especialidade.id
                : args.especialidade,
                }

    return destroy.definition.url
            .replace('{especialidade}', parsedArgs.especialidade.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EspecialidadeController::destroy
 * @see app/Http/Controllers/EspecialidadeController.php:94
 * @route '/especialidades/{especialidade}'
 */
destroy.delete = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\EspecialidadeController::destroy
 * @see app/Http/Controllers/EspecialidadeController.php:94
 * @route '/especialidades/{especialidade}'
 */
    const destroyForm = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EspecialidadeController::destroy
 * @see app/Http/Controllers/EspecialidadeController.php:94
 * @route '/especialidades/{especialidade}'
 */
        destroyForm.delete = (args: { especialidade: number | { id: number } } | [especialidade: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const EspecialidadeController = { index, create, store, show, edit, update, destroy }

export default EspecialidadeController