import { ref } from 'vue'

export interface ToastMessage {
    id: number
    title?: string
    description?: string
    color?: 'red' | 'green' | 'blue' | 'yellow'
    duration?: number
}

const toasts = ref<ToastMessage[]>([])

export function useToast() {
    function add(toast: Omit<ToastMessage, 'id'>) {
        const id = Date.now()
        const duration = toast.duration ?? 3000

        toasts.value.push({ id, ...toast })

        if (duration > 0) {
            setTimeout(() => remove(id), duration)
        }
    }

    function remove(id: number) {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }

    return { toasts, add, remove }
}
