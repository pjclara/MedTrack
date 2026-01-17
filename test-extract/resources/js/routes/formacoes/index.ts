import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\FormacaoController::exportMethod
 * @see app/Http/Controllers/FormacaoController.php:187
 * @route '/formacoes/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/formacoes/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FormacaoController::exportMethod
 * @see app/Http/Controllers/FormacaoController.php:187
 * @route '/formacoes/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FormacaoController::exportMethod
 * @see app/Http/Controllers/FormacaoController.php:187
 * @route '/formacoes/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FormacaoController::exportMethod
 * @see app/Http/Controllers/FormacaoController.php:187
 * @route '/formacoes/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FormacaoController::exportMethod
 * @see app/Http/Controllers/FormacaoController.php:187
 * @route '/formacoes/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FormacaoController::exportMethod
 * @see app/Http/Controllers/FormacaoController.php:187
 * @route '/formacoes/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FormacaoController::exportMethod
 * @see app/Http/Controllers/FormacaoController.php:187
 * @route '/formacoes/export'
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
* @see \App\Http\Controllers\FormacaoController::index
 * @see app/Http/Controllers/FormacaoController.php:21
 * @route '/formacoes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/formacoes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FormacaoController::index
 * @see app/Http/Controllers/FormacaoController.php:21
 * @route '/formacoes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FormacaoController::index
 * @see app/Http/Controllers/FormacaoController.php:21
 * @route '/formacoes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FormacaoController::index
 * @see app/Http/Controllers/FormacaoController.php:21
 * @route '/formacoes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FormacaoController::index
 * @see app/Http/Controllers/FormacaoController.php:21
 * @route '/formacoes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FormacaoController::index
 * @see app/Http/Controllers/FormacaoController.php:21
 * @route '/formacoes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FormacaoController::index
 * @see app/Http/Controllers/FormacaoController.php:21
 * @route '/formacoes'
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
* @see \App\Http\Controllers\FormacaoController::create
 * @see app/Http/Controllers/FormacaoController.php:53
 * @route '/formacoes/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/formacoes/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FormacaoController::create
 * @see app/Http/Controllers/FormacaoController.php:53
 * @route '/formacoes/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FormacaoController::create
 * @see app/Http/Controllers/FormacaoController.php:53
 * @route '/formacoes/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FormacaoController::create
 * @see app/Http/Controllers/FormacaoController.php:53
 * @route '/formacoes/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FormacaoController::create
 * @see app/Http/Controllers/FormacaoController.php:53
 * @route '/formacoes/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FormacaoController::create
 * @see app/Http/Controllers/FormacaoController.php:53
 * @route '/formacoes/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FormacaoController::create
 * @see app/Http/Controllers/FormacaoController.php:53
 * @route '/formacoes/create'
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
* @see \App\Http\Controllers\FormacaoController::store
 * @see app/Http/Controllers/FormacaoController.php:63
 * @route '/formacoes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/formacoes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FormacaoController::store
 * @see app/Http/Controllers/FormacaoController.php:63
 * @route '/formacoes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FormacaoController::store
 * @see app/Http/Controllers/FormacaoController.php:63
 * @route '/formacoes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FormacaoController::store
 * @see app/Http/Controllers/FormacaoController.php:63
 * @route '/formacoes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FormacaoController::store
 * @see app/Http/Controllers/FormacaoController.php:63
 * @route '/formacoes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\FormacaoController::show
 * @see app/Http/Controllers/FormacaoController.php:88
 * @route '/formacoes/{formacao}'
 */
export const show = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/formacoes/{formacao}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FormacaoController::show
 * @see app/Http/Controllers/FormacaoController.php:88
 * @route '/formacoes/{formacao}'
 */
show.url = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formacao: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { formacao: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    formacao: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        formacao: typeof args.formacao === 'object'
                ? args.formacao.id
                : args.formacao,
                }

    return show.definition.url
            .replace('{formacao}', parsedArgs.formacao.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FormacaoController::show
 * @see app/Http/Controllers/FormacaoController.php:88
 * @route '/formacoes/{formacao}'
 */
show.get = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FormacaoController::show
 * @see app/Http/Controllers/FormacaoController.php:88
 * @route '/formacoes/{formacao}'
 */
show.head = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FormacaoController::show
 * @see app/Http/Controllers/FormacaoController.php:88
 * @route '/formacoes/{formacao}'
 */
    const showForm = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FormacaoController::show
 * @see app/Http/Controllers/FormacaoController.php:88
 * @route '/formacoes/{formacao}'
 */
        showForm.get = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FormacaoController::show
 * @see app/Http/Controllers/FormacaoController.php:88
 * @route '/formacoes/{formacao}'
 */
        showForm.head = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\FormacaoController::edit
 * @see app/Http/Controllers/FormacaoController.php:102
 * @route '/formacoes/{formacao}/edit'
 */
export const edit = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/formacoes/{formacao}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FormacaoController::edit
 * @see app/Http/Controllers/FormacaoController.php:102
 * @route '/formacoes/{formacao}/edit'
 */
edit.url = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formacao: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { formacao: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    formacao: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        formacao: typeof args.formacao === 'object'
                ? args.formacao.id
                : args.formacao,
                }

    return edit.definition.url
            .replace('{formacao}', parsedArgs.formacao.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FormacaoController::edit
 * @see app/Http/Controllers/FormacaoController.php:102
 * @route '/formacoes/{formacao}/edit'
 */
edit.get = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FormacaoController::edit
 * @see app/Http/Controllers/FormacaoController.php:102
 * @route '/formacoes/{formacao}/edit'
 */
edit.head = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FormacaoController::edit
 * @see app/Http/Controllers/FormacaoController.php:102
 * @route '/formacoes/{formacao}/edit'
 */
    const editForm = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FormacaoController::edit
 * @see app/Http/Controllers/FormacaoController.php:102
 * @route '/formacoes/{formacao}/edit'
 */
        editForm.get = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FormacaoController::edit
 * @see app/Http/Controllers/FormacaoController.php:102
 * @route '/formacoes/{formacao}/edit'
 */
        editForm.head = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\FormacaoController::update
 * @see app/Http/Controllers/FormacaoController.php:114
 * @route '/formacoes/{formacao}'
 */
export const update = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/formacoes/{formacao}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\FormacaoController::update
 * @see app/Http/Controllers/FormacaoController.php:114
 * @route '/formacoes/{formacao}'
 */
update.url = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formacao: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { formacao: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    formacao: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        formacao: typeof args.formacao === 'object'
                ? args.formacao.id
                : args.formacao,
                }

    return update.definition.url
            .replace('{formacao}', parsedArgs.formacao.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FormacaoController::update
 * @see app/Http/Controllers/FormacaoController.php:114
 * @route '/formacoes/{formacao}'
 */
update.put = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\FormacaoController::update
 * @see app/Http/Controllers/FormacaoController.php:114
 * @route '/formacoes/{formacao}'
 */
update.patch = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\FormacaoController::update
 * @see app/Http/Controllers/FormacaoController.php:114
 * @route '/formacoes/{formacao}'
 */
    const updateForm = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FormacaoController::update
 * @see app/Http/Controllers/FormacaoController.php:114
 * @route '/formacoes/{formacao}'
 */
        updateForm.put = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\FormacaoController::update
 * @see app/Http/Controllers/FormacaoController.php:114
 * @route '/formacoes/{formacao}'
 */
        updateForm.patch = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\FormacaoController::destroy
 * @see app/Http/Controllers/FormacaoController.php:151
 * @route '/formacoes/{formacao}'
 */
export const destroy = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/formacoes/{formacao}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FormacaoController::destroy
 * @see app/Http/Controllers/FormacaoController.php:151
 * @route '/formacoes/{formacao}'
 */
destroy.url = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formacao: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { formacao: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    formacao: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        formacao: typeof args.formacao === 'object'
                ? args.formacao.id
                : args.formacao,
                }

    return destroy.definition.url
            .replace('{formacao}', parsedArgs.formacao.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FormacaoController::destroy
 * @see app/Http/Controllers/FormacaoController.php:151
 * @route '/formacoes/{formacao}'
 */
destroy.delete = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FormacaoController::destroy
 * @see app/Http/Controllers/FormacaoController.php:151
 * @route '/formacoes/{formacao}'
 */
    const destroyForm = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FormacaoController::destroy
 * @see app/Http/Controllers/FormacaoController.php:151
 * @route '/formacoes/{formacao}'
 */
        destroyForm.delete = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\FormacaoController::download
 * @see app/Http/Controllers/FormacaoController.php:170
 * @route '/formacoes/{formacao}/download'
 */
export const download = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/formacoes/{formacao}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FormacaoController::download
 * @see app/Http/Controllers/FormacaoController.php:170
 * @route '/formacoes/{formacao}/download'
 */
download.url = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formacao: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { formacao: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    formacao: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        formacao: typeof args.formacao === 'object'
                ? args.formacao.id
                : args.formacao,
                }

    return download.definition.url
            .replace('{formacao}', parsedArgs.formacao.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FormacaoController::download
 * @see app/Http/Controllers/FormacaoController.php:170
 * @route '/formacoes/{formacao}/download'
 */
download.get = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FormacaoController::download
 * @see app/Http/Controllers/FormacaoController.php:170
 * @route '/formacoes/{formacao}/download'
 */
download.head = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FormacaoController::download
 * @see app/Http/Controllers/FormacaoController.php:170
 * @route '/formacoes/{formacao}/download'
 */
    const downloadForm = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FormacaoController::download
 * @see app/Http/Controllers/FormacaoController.php:170
 * @route '/formacoes/{formacao}/download'
 */
        downloadForm.get = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FormacaoController::download
 * @see app/Http/Controllers/FormacaoController.php:170
 * @route '/formacoes/{formacao}/download'
 */
        downloadForm.head = (args: { formacao: number | { id: number } } | [formacao: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const formacoes = {
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

export default formacoes