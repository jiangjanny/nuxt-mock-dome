<template>
    <div v-if="show" class="">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-md shadow-xl">
            <h2 class="text-lg font-semibold mb-4">確定要離開嗎？</h2>
            <p class="mb-4">你輸入的資料可能會遺失，是否確定要離開此頁？</p>
            <div class="">
                <button class="px-4 py-2 bg-gray-300 rounded" @click="$emit('cancel')">取消</button>
                <button class="px-4 py-2 bg-red-600 text-white rounded" @click="$emit('confirm')">確定</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>()
defineEmits(['confirm', 'cancel'])
</script>
