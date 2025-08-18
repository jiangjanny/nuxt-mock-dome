<template>
    <div class="birthday-select">
        <select v-model="birth.year">
            <option v-for="y in years" :key="y">{{ y }}</option>
        </select>
        <select v-model="birth.month">
            <option v-for="m in months" :key="m">{{ m }}</option>
        </select>
        <select v-model="birth.day">
            <option v-for="d in days" :key="d">{{ d }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch } from 'vue'
const props = defineProps<{
    modelValue: { year: string; month: string; day: string }
}>()
const emit = defineEmits(['update:modelValue'])

const birth = reactive({ ...props.modelValue })

watch(birth, () => {
    emit('update:modelValue', { ...birth })
}, { deep: true })

const years = Array.from({ length: 100 }, (_, i) => 1925 + i)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const days = Array.from({ length: 31 }, (_, i) => i + 1)
</script>
