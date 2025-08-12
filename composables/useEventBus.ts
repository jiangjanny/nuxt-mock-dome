// composables/useEventBus.ts
import mitt from 'mitt'

const emitter = mitt()

export function useEventBus() {
    return emitter
}
