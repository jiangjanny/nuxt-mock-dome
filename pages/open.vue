<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const channel = process.client ? new BroadcastChannel('tab-communication') : null
const sessionStorageKey = 'my-session-id'
let sessionId = ''

const onMessage = (event) => {
    if (event.data.type === 'NEW_TAB_OPENED' && event.data.sessionId === sessionId) {
        console.log('收到新分頁開啟訊息，跳轉 Google')
        window.location.href = 'https://www.google.com'
    }
}

onMounted(() => {
    if (!process.client) return

    sessionId = localStorage.getItem(sessionStorageKey)
    if (!sessionId) {
        sessionId = crypto.randomUUID()
        localStorage.setItem(sessionStorageKey, sessionId)
    }

    channel.onmessage = onMessage

    // 新分頁開啟時呼叫（所有分頁載入都會執行）
    channel.postMessage({
        type: 'NEW_TAB_OPENED',
        sessionId
    })
})

onBeforeUnmount(() => {
    if (!process.client) return
    channel.close()
})
</script>

<template>
    <div>
        <h1>Nuxt3 - 多分頁通訊測試</h1>
        <p>右鍵另開分頁或新分頁打開會通知其他分頁跳轉 Google。</p>
    </div>
</template>
