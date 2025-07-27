import { ref, onBeforeUnmount } from 'vue'

export function useReloadGuard(onConfirmReload: () => void) {
    const showModal = ref(false)
    let triggerByRefresh = false

    const show = () => {
        triggerByRefresh = true
        showModal.value = true
    }

    const confirm = () => {
        showModal.value = false
        if (triggerByRefresh) {
            onConfirmReload()
        }
    }

    const cancel = () => {
        showModal.value = false
        triggerByRefresh = false
    }

    // 自訂模擬「刷新」行為 (例如按 F5)
    const handleKeydown = (e: KeyboardEvent) => {
        if ((e.key === 'F5') || (e.ctrlKey && e.key === 'r')) {
            e.preventDefault()
            show()
        }
    }

    // 可加入 visibilitychange 做支援（可選）
    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            // show()
        }
    }

    onMounted(() => {
        window.addEventListener('keydown', handleKeydown)
        document.addEventListener('visibilitychange', handleVisibilityChange)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeydown)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
    })

    return { showModal, confirm, cancel }
}
