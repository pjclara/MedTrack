import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AuthController::post
 * @see app/Http/Controllers/Admin/AuthController.php:27
 * @route '/admin/login'
 */
export const post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})

post.definition = {
    methods: ["post"],
    url: '/admin/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AuthController::post
 * @see app/Http/Controllers/Admin/AuthController.php:27
 * @route '/admin/login'
 */
post.url = (options?: RouteQueryOptions) => {
    return post.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AuthController::post
 * @see app/Http/Controllers/Admin/AuthController.php:27
 * @route '/admin/login'
 */
post.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AuthController::post
 * @see app/Http/Controllers/Admin/AuthController.php:27
 * @route '/admin/login'
 */
    const postForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: post.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AuthController::post
 * @see app/Http/Controllers/Admin/AuthController.php:27
 * @route '/admin/login'
 */
        postForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: post.url(options),
            method: 'post',
        })
    
    post.form = postForm
const login = {
    post: Object.assign(post, post),
}

export default login