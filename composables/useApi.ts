import type { FetchOptions } from 'ofetch'
import { useToast } from '../composables/useToast'

export function useApi<T>(baseURL: string, url: string, options: Partial<any> = {}) {
    const toast = useToast()

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
            const status = response.status
            const message = (response._data as any)?.message || '系統錯誤，請稍後再試'

            toast.add({
                title: '錯誤',
                description: message,
                color: 'red'
            })

            throw createError({ statusCode: status, statusMessage: message })
        }
    })
}
