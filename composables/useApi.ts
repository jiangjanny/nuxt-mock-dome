import type { FetchOptions } from 'ofetch'
import { useToast } from '../composables/useToast'

export function useApi<T>(baseURL: string, url: string, options: Partial<any> = {}) {
    return $fetch<T>(url, {
        ...options,
        baseURL,
        onRequest({ options: any }) {
            const token = useCookie('token').value
            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`
                }
            }
        },
        onResponseError({ response }) {
            if (response.status === 401) {
                // 例如清除 cookie 並跳轉登入頁
                const tokenCookie = useCookie('token')
                tokenCookie.value = null
                navigateTo('/login')
            }
            throw createError({ statusCode: response.status, statusMessage: '認證錯誤' })
        }
    })
}
