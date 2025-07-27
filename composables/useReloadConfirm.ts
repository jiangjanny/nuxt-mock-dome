import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useReloadConfirm() {
    const showModal = ref(false)

    const handleKeydown = (e: KeyboardEvent) => {
        const isReloadKey =
            e.key === 'F5' ||
            (e.key.toLowerCase() === 'r' && e.ctrlKey)

        if (isReloadKey) {
            e.preventDefault()
            showModal.value = true
        }
    }

    const confirmReload = () => {
        showModal.value = false
        location.reload()
    }

    const cancelReload = () => {
        showModal.value = false
    }

    onMounted(() => {
        window.addEventListener('keydown', handleKeydown)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeydown)
    })

    return { showModal, confirmReload, cancelReload }
}
