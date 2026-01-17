import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\HospitalController::index
 * @see app/Http/Controllers/HospitalController.php:16
 * @route '/hospitals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hospitals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HospitalController::index
 * @see app/Http/Controllers/HospitalController.php:16
 * @route '/hospitals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HospitalController::index
 * @see app/Http/Controllers/HospitalController.php:16
 * @route '/hospitals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HospitalController::index
 * @see app/Http/Controllers/HospitalController.php:16
 * @route '/hospitals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HospitalController::index
 * @see app/Http/Controllers/HospitalController.php:16
 * @route '/hospitals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HospitalController::index
 * @see app/Http/Controllers/HospitalController.php:16
 * @route '/hospitals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HospitalController::index
 * @see app/Http/Controllers/HospitalController.php:16
 * @route '/hospitals'
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
* @see \App\Http\Controllers\HospitalController::create
 * @see app/Http/Controllers/HospitalController.php:29
 * @route '/hospitals/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/hospitals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HospitalController::create
 * @see app/Http/Controllers/HospitalController.php:29
 * @route '/hospitals/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HospitalController::create
 * @see app/Http/Controllers/HospitalController.php:29
 * @route '/hospitals/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HospitalController::create
 * @see app/Http/Controllers/HospitalController.php:29
 * @route '/hospitals/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HospitalController::create
 * @see app/Http/Controllers/HospitalController.php:29
 * @route '/hospitals/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HospitalController::create
 * @see app/Http/Controllers/HospitalController.php:29
 * @route '/hospitals/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HospitalController::create
 * @see app/Http/Controllers/HospitalController.php:29
 * @route '/hospitals/create'
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
* @see \App\Http\Controllers\HospitalController::store
 * @see app/Http/Controllers/HospitalController.php:37
 * @route '/hospitals'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/hospitals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HospitalController::store
 * @see app/Http/Controllers/HospitalController.php:37
 * @route '/hospitals'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HospitalController::store
 * @see app/Http/Controllers/HospitalController.php:37
 * @route '/hospitals'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HospitalController::store
 * @see app/Http/Controllers/HospitalController.php:37
 * @route '/hospitals'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HospitalController::store
 * @see app/Http/Controllers/HospitalController.php:37
 * @route '/hospitals'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\HospitalController::show
 * @see app/Http/Controllers/HospitalController.php:51
 * @route '/hospitals/{hospital}'
 */
export const show = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/hospitals/{hospital}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HospitalController::show
 * @see app/Http/Controllers/HospitalController.php:51
 * @route '/hospitals/{hospital}'
 */
show.url = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hospital: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { hospital: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    hospital: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        hospital: typeof args.hospital === 'object'
                ? args.hospital.id
                : args.hospital,
                }

    return show.definition.url
            .replace('{hospital}', parsedArgs.hospital.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HospitalController::show
 * @see app/Http/Controllers/HospitalController.php:51
 * @route '/hospitals/{hospital}'
 */
show.get = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HospitalController::show
 * @see app/Http/Controllers/HospitalController.php:51
 * @route '/hospitals/{hospital}'
 */
show.head = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HospitalController::show
 * @see app/Http/Controllers/HospitalController.php:51
 * @route '/hospitals/{hospital}'
 */
    const showForm = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HospitalController::show
 * @see app/Http/Controllers/HospitalController.php:51
 * @route '/hospitals/{hospital}'
 */
        showForm.get = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HospitalController::show
 * @see app/Http/Controllers/HospitalController.php:51
 * @route '/hospitals/{hospital}'
 */
        showForm.head = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\HospitalController::edit
 * @see app/Http/Controllers/HospitalController.php:65
 * @route '/hospitals/{hospital}/edit'
 */
export const edit = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/hospitals/{hospital}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HospitalController::edit
 * @see app/Http/Controllers/HospitalController.php:65
 * @route '/hospitals/{hospital}/edit'
 */
edit.url = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hospital: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { hospital: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    hospital: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        hospital: typeof args.hospital === 'object'
                ? args.hospital.id
                : args.hospital,
                }

    return edit.definition.url
            .replace('{hospital}', parsedArgs.hospital.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HospitalController::edit
 * @see app/Http/Controllers/HospitalController.php:65
 * @route '/hospitals/{hospital}/edit'
 */
edit.get = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HospitalController::edit
 * @see app/Http/Controllers/HospitalController.php:65
 * @route '/hospitals/{hospital}/edit'
 */
edit.head = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HospitalController::edit
 * @see app/Http/Controllers/HospitalController.php:65
 * @route '/hospitals/{hospital}/edit'
 */
    const editForm = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HospitalController::edit
 * @see app/Http/Controllers/HospitalController.php:65
 * @route '/hospitals/{hospital}/edit'
 */
        editForm.get = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HospitalController::edit
 * @see app/Http/Controllers/HospitalController.php:65
 * @route '/hospitals/{hospital}/edit'
 */
        editForm.head = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\HospitalController::update
 * @see app/Http/Controllers/HospitalController.php:79
 * @route '/hospitals/{hospital}'
 */
export const update = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/hospitals/{hospital}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\HospitalController::update
 * @see app/Http/Controllers/HospitalController.php:79
 * @route '/hospitals/{hospital}'
 */
update.url = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hospital: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { hospital: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    hospital: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        hospital: typeof args.hospital === 'object'
                ? args.hospital.id
                : args.hospital,
                }

    return update.definition.url
            .replace('{hospital}', parsedArgs.hospital.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HospitalController::update
 * @see app/Http/Controllers/HospitalController.php:79
 * @route '/hospitals/{hospital}'
 */
update.put = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\HospitalController::update
 * @see app/Http/Controllers/HospitalController.php:79
 * @route '/hospitals/{hospital}'
 */
update.patch = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\HospitalController::update
 * @see app/Http/Controllers/HospitalController.php:79
 * @route '/hospitals/{hospital}'
 */
    const updateForm = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HospitalController::update
 * @see app/Http/Controllers/HospitalController.php:79
 * @route '/hospitals/{hospital}'
 */
        updateForm.put = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\HospitalController::update
 * @see app/Http/Controllers/HospitalController.php:79
 * @route '/hospitals/{hospital}'
 */
        updateForm.patch = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\HospitalController::destroy
 * @see app/Http/Controllers/HospitalController.php:95
 * @route '/hospitals/{hospital}'
 */
export const destroy = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/hospitals/{hospital}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\HospitalController::destroy
 * @see app/Http/Controllers/HospitalController.php:95
 * @route '/hospitals/{hospital}'
 */
destroy.url = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hospital: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { hospital: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    hospital: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        hospital: typeof args.hospital === 'object'
                ? args.hospital.id
                : args.hospital,
                }

    return destroy.definition.url
            .replace('{hospital}', parsedArgs.hospital.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HospitalController::destroy
 * @see app/Http/Controllers/HospitalController.php:95
 * @route '/hospitals/{hospital}'
 */
destroy.delete = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\HospitalController::destroy
 * @see app/Http/Controllers/HospitalController.php:95
 * @route '/hospitals/{hospital}'
 */
    const destroyForm = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HospitalController::destroy
 * @see app/Http/Controllers/HospitalController.php:95
 * @route '/hospitals/{hospital}'
 */
        destroyForm.delete = (args: { hospital: number | { id: number } } | [hospital: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const hospitals = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default hospitals