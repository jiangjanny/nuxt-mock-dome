import { useMockApi } from '../../utils/useMockApi'
import { mockRoutes } from '@/server/mock' // 👈 重點

export default defineEventHandler(async (event) => {
    const req = event.node.req
    const config = useRuntimeConfig()

    if (!req.url?.startsWith('/api/')) {
        return
    }

    if (useMockApi()) {
        console.log('Mock API 開啟中，轉交給對應 mock handler')

        const handler = mockRoutes[req.url || '']
        if (handler) {
            console.log('await handler(event)', await handler(event));

            return await handler(event)
        } else {
            // mock 開著但找不到 mock handler，回錯誤
            console.warn(`沒有對應的 mock handler: ${req.url}`)
            return sendError(event, createError({
                statusCode: 404,
                message: `mock API not found for ${req.url}`
            }))
        }
    }

    // 👉 否則走 proxy
    const targetUrl = config.public.realApiUrl + req.url.replace(/^\/api/, '')
    console.log('Proxy to:', targetUrl)

    try {
        const response: any = await $fetch.raw(targetUrl, {
            method: req.method,
            headers: req.headers,
            body: req.method !== 'GET' ? await readBody(event) : undefined,
            throwHttpErrors: false
        })

        if (response.status !== 200) {
            return sendError(event, createError({
                statusCode: response.status,
                message: `Upstream API Error: ${response.status}`
            }))
        }

        return response._data

    } catch (error: any) {
        console.error('Proxy Error:', error)
        return sendError(event, createError({
            statusCode: 500,
            message: 'Proxy failed',
            data: {
                detail: error.message
            }
        }))
    }
})
