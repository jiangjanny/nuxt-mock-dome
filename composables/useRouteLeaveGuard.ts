// composables/useLeaveGuard.ts
import { useRouter, useRoute } from 'vue-router'
import { ref, onBeforeUnmount } from 'vue'

export function useLeaveGuard(shouldBlock: () => boolean, onConfirmLeave: () => void) {
    const router = useRouter()
    const route = useRoute()
    const showModal = ref(false)
    const nextRoute = ref<any>(null)

    const handler = router.beforeEach((to, from, next) => {
        if (!shouldBlock()) {
            return next()
        }
        if (to.fullPath !== from.fullPath) {
            showModal.value = true
            nextRoute.value = to
            return next(false)
        }
        next()
    })

    const confirmLeave = () => {
        showModal.value = false
        onConfirmLeave()
        router.push(nextRoute.value)
    }

    const cancelLeave = () => {
        showModal.value = false
        nextRoute.value = null
    }

    onBeforeUnmount(() => {
        handler() // 移除導航守衛
    })

    return {
        showModal,
        confirmLeave,
        cancelLeave,
    }
}
