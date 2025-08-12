<script setup lang="ts">
import { useUserProfile } from '~/api/main'
import { useEventBus } from '~/composables/useEventBus'

const { data: user, error, refresh } = useUserProfile()
// const bus = useEventBus()
function manualRefresh() {
    //     refresh()
}

const { data: products, error: productsError } = await useAsyncData('products', () =>
    $fetch('/api/products')
)
// 跨組件觸發用：呼叫事件刷新 userProfile
// function refreshFromOutside() {
//     bus.emit('refreshKey', 'userProfile')
// }


export function logout() {
    const tokenCookie = useCookie('token')
    tokenCookie.value = null
    navigateTo('/login')
}
</script>

<template>
    <div>
        <h2>使用者資料</h2>
        <pre>{{ user }}</pre>
        <button @click="manualRefresh">本組件刷新</button>
    </div>

    <h1>產品清單 (透過代理 API)</h1>
    <pre>{{ products }}</pre>
</template>
