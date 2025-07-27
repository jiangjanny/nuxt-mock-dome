<!-- components/ConfirmLeaveModal.vue -->
<template>
    <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 shadow-lg text-center">
            <p class="mb-4 text-lg">你尚未儲存資料，確定要離開此頁嗎？</p>
            <div class="flex justify-center gap-4">
                <button class="bg-red-500 text-white px-4 py-2 rounded" @click="$emit('confirm')">確定離開</button>
                <button class="bg-gray-300 text-black px-4 py-2 rounded" @click="$emit('cancel')">取消</button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps<{ show: boolean }>()
defineEmits(['confirm', 'cancel'])
</script>
