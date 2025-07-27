<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">填寫表單</h1>
        <input v-model="form.name" placeholder="姓名" class="border p-2 rounded w-full mb-4" />
        <textarea v-model="form.message" placeholder="留言" class="border p-2 rounded w-full" />
        <ReloadModal :show="showModal" @confirm="confirmReload" @cancel="cancelReload" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import ReloadModal from '~/components/ReloadModal.vue'
import { useReloadConfirm } from '~/composables/useReloadConfirm'

const form = ref({ name: '', message: '' })

watch(form, () => {
    sessionStorage.setItem('formDraft', JSON.stringify(form.value))
}, { deep: true })

onMounted(() => {
    const saved = sessionStorage.getItem('formDraft')
    if (saved) {
        form.value = JSON.parse(saved)
    }
})

const { showModal, confirmReload, cancelReload } = useReloadConfirm()
</script>
