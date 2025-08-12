import { useApi } from '../composables/useApi'
import { useAsyncData, useRuntimeConfig } from '#app'
// import { useEventBus } from '~/composables/useEventBus'

const refreshKey = 'userProfile'

export function useUserProfile() {
    // const bus = useEventBus()
    const config = useRuntimeConfig()
    const baseURL = 'https://randomuser.me'

    // useAsyncData 必須在函式裡呼叫，且 key 唯一
    const result = useAsyncData(refreshKey, () =>
        useApi(baseURL, '/api')
    )

    // 監聽跨組件刷新事件
    // bus.on('refreshKey', (key) => {
    //     if (key === refreshKey) {
    //         result.refresh()
    //     }
    // })

    return result
}
