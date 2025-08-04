<template>
    <Form v-slot="{ errors }" @submit="handleSubmit">
        <div v-for="(group, groupIndex) in raw" :key="group.code" class="mb-6">
            <h3 class="text-lg font-bold">{{ group.name }}</h3>
            <hr class="mb-2" />

            <div v-for="(item, itemIndex) in group.item" :key="item.title + groupIndex + itemIndex" class="mb-3">
                <!-- Checkbox 控制開啟/關閉 -->
                <label class="flex items-center gap-2">
                    {{ item.initialEnabled }}
                    <input type="checkbox" :checked="item.initialEnabled" :disabled="item.Required === 'Y'"
                        @change="() => toggleItem(groupIndex, itemIndex)" />
                    {{ item.title }}
                    <span v-if="item.Required === 'Y'" class="text-red-500 text-sm">(必填)</span>
                </label>

                <!-- 輸入框 -->
                <div class="mt-1">
                    <Field :name="`group_${groupIndex}_item_${itemIndex}`" v-model="item.name"
                        :rules="item.Required === 'Y' ? 'required' : ''" as="input" class="border px-2 py-1 w-full"
                        placeholder="請輸入" />
                    <ErrorMessage :name="`group_${groupIndex}_item_${itemIndex}`" class="text-red-500 text-sm" />
                </div>
            </div>
        </div>
        {{ raw }}
        <button type="submit" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            提交
        </button>
    </Form>
</template>

<script setup>
import { reactive } from 'vue'
import { Form, Field, ErrorMessage, defineRule, useForm } from 'vee-validate'
import { required } from '@vee-validate/rules'

defineRule('required', required)

// 來源資料：只定義 Required，initialEnabled 由程式生成
const rawData = [
    {
        name: '第一組',
        code: 'group1',
        item: [
            { title: '項目 1', name: '', Required: 'Y' },
            { title: '項目 2', name: '', Required: 'N' },
            { title: '項目 3', name: '', Required: null },
        ],
    },
    {
        name: '第二組',
        code: 'group2',
        item: [
            { title: '項目 A', name: '', Required: 'Y' },
            { title: '項目 B', name: '', Required: null },
            { title: '項目 C', name: '', Required: 'N' },
        ],
    },
]

// 依 Required 自動加上 initialEnabled
const raw = reactive(
    rawData.map(group => ({
        ...group,
        item: group.item.map(item => ({
            ...item,
            initialEnabled: item.Required === 'Y'
        }))
    }))
)

// 切換開關邏輯
const toggleItem = (groupIndex, itemIndex) => {
    const item = raw[groupIndex].item[itemIndex]
    if (item.Required === 'Y') return // 必填不能關閉
    item.initialEnabled = !item.initialEnabled
}

// 驗證與提交
const { validate } = useForm()
const handleSubmit = async () => {
    const { valid } = await validate()
    if (valid) {
        console.log('✅ 表單資料：', raw)
        alert('表單送出成功！')
    } else {
        console.warn('❌ 表單驗證失敗')
    }
}
</script>

<style scoped>
input[type="checkbox"] {
    width: 16px;
    height: 16px;
}
</style>
