<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    modelValue: boolean | null
    name: string
    labels?: { trueLabel: string; falseLabel: string } // 外層傳入文字
    required?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', v: boolean): void
}>()

function update(v: boolean) {
    emit('update:modelValue', v)
}
</script>

<template>
    <div class="radio-group">
        <label>
            <input type="radio" :name="name" :checked="modelValue === true" :required="required"
                @change="update(true)" />
            {{ labels?.trueLabel ?? '是' }}
        </label>

        <label>
            <input type="radio" :name="name" :checked="modelValue === false" :required="required"
                @change="update(false)" />
            {{ labels?.falseLabel ?? '否' }}
        </label>
    </div>
</template>

<style scoped>
.radio-group {
    display: flex;
    gap: 12px;
}
</style>
