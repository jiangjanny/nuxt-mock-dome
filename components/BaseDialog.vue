<template>
    <dialog ref="dialog">
        <slot></slot>
    </dialog>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineExpose } from 'vue'

const dialog = ref(null)

function open() {
    dialog.value.showModal()
}

function close() {
    dialog.value.close()
}

defineExpose({
    open,
    close
})
</script>

<style scoped>
dialog {
    border: none;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
