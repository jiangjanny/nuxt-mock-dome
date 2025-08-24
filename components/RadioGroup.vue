<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// 簡單的唯一字串產生器
function uniqueName(prefix = 'radio') {
    return prefix + '_' + Math.random().toString(36).slice(2, 9)
}

const props = defineProps<{
    modelValue: boolean | null
    name?: string
    labels?: { trueLabel: string; falseLabel: string }
    required?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', v: boolean): void
}>()

// 如果沒傳 name，就自己產生
const groupName = props.name || uniqueName()

function update(v: boolean) {
    emit('update:modelValue', v)
}
</script>

<template>
    <div class="radio-group">
        <label>
            <input type="radio" :name="groupName" :checked="modelValue === true" :required="required"
                @change="update(true)" />
            {{ labels?.trueLabel ?? '是' }}
        </label>

        <label>
            <input type="radio" :name="groupName" :checked="modelValue === false" :required="required"
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
