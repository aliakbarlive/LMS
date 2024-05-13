import ApiService from './ApiService'

export async function apiGetCategoriesData<T>() {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/categories',
        method: 'get',
    })
}

export async function apiQueryArticleList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/articles-query',
        method: 'post',
        data,
    })
}

// Get article
export async function apiGetArticle<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `/articles/${params.id}`,
        method: 'get',
    })
}
// Create article
export async function apiPostArticle<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/articles',
        method: 'post',
        data,
    })
}

// Update article
export async function apiUpdateArticle<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `/articles/${data._id}`,
        method: 'put',
        data,
    })
}

// Delete article
export async function apiDeleteArticle<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `/articles/${params._id}`,
        method: 'delete',
    })
}

export async function apiGetOthersArticleList<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: `/articles/${params._id}/others`,
        method: 'get',
        params,
    })
}
// Get categorized articles
export async function apiGetCategorizedArticles<T>() {
    return ApiService.fetchData<T>({
        url: '/categories/categories-with-articles',
        method: 'get',
    })
}

// Get all categories
export async function apiGetCategories<T>() {
    return ApiService.fetchData<T>({
        url: '/categories',
        method: 'get',
    })
}

// Create Category
export async function apiCreateCategory<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/categories',
        method: 'post',
        data,
    })
}

// Update Category
export async function apiUpdateCategory<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `/categories/${data._id}`,
        method: 'put',
        data,
    })
}

// Delete Category
export async function apiDeleteCategory<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `/categories/${params._id}`,
        method: 'delete',
    })
}

// Create article
export async function apiPostCourse<T>(formData: FormData) {
    return ApiService.fetchData<T>({
        url: '/course',
        method: 'post',
        formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

// Get article
export async function apiGetCourse<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `/course/${params.id}`,
        method: 'get',
    })
}
export async function apiGetAllCourse<T>() {
    return ApiService.fetchData<T>({
        url: `/course`,
        method: 'get',
    })
}


export async function apiGetAllUser<T>() {
    return ApiService.fetchData<T>({
        url: `/auth/users`,
        method: 'get',
    })
}