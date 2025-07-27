<template>
    <div>
        <form @submit.prevent="submit">
            <p>輸入內容：<input v-model="text" class="border" /></p>
            <button type="submit">送出</button>
        </form>

        <!-- 自訂離開提示 modal -->
        <ConfirmLeaveModal :show="showModal" @confirm="confirmLeave" @cancel="cancelLeave" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ConfirmLeaveModal from '~/components/ConfirmLeaveModal.vue'
import { useLeaveGuard } from '../composables/useLeaveGuard'

const text = ref('')
const submitted = ref(false)

const submit = () => {
    submitted.value = true
    alert('已送出')
}

// 是否攔截離開
const isDirty = () => text.value !== '' && !submitted.value

// 用 composable 設置 router 守衛 + modal 控制
const {
    showModal,
    confirmLeave,
    cancelLeave
} = useLeaveGuard(isDirty, () => {
    submitted.value = true // 確保不再攔截
})
</script>
