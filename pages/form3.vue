<template>
    <Form v-slot="{ errors }">
        <div v-for="(group, groupIndex) in raw" :key="group.code">
            <h3>{{ group.name }}</h3>
            <hr />
            <div v-for="(item, itemIndex) in group.item" :key="item.title" class="mb-2">
                <label>
                    <input type="checkbox" :checked="item.initialEnabled"
                        :disabled="item.Required && !item.initialEnabled"
                        @change="() => toggleItem(groupIndex, itemIndex)" />
                    {{ item.title }}
                </label>

                <div v-if="item.initialEnabled">
                    <Field :name="`group_${groupIndex}_item_${itemIndex}`" v-model="item.name"
                        :rules="item.Required ? 'required' : ''" as="input" placeholder="請輸入"
                        class="border px-2 py-1" />
                    <ErrorMessage :name="`group_${groupIndex}_item_${itemIndex}`" class="text-red-500 text-sm" />
                </div>
            </div>
        </div>

        <button type="submit" class="mt-4 border px-3 py-1">提交</button>
    </Form>
</template>

<script setup>
import { reactive } from 'vue'
import { useForm, Field, Form, ErrorMessage, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'

defineRule('required', required)

const raw = reactive([
    {
        name: 'sd',
        code: 'we',
        item: [
            { title: 'd2', name: '', Required: false, initialEnabled: true },
            { title: 'd3', name: '', Required: true, initialEnabled: false },
            { title: 'd4', name: '', Required: true, initialEnabled: true },
        ]
    },
    {
        name: 'sd345',
        code: 'we',
        item: [
            { title: 'd', name: '', Required: false, initialEnabled: true },
            { title: 'd', name: '', Required: true, initialEnabled: false },
            { title: 'd', name: '', Required: true, initialEnabled: true },
        ]
    },
    {
        name: 'sd345',
        code: 'we',
        item: [
            { title: 'd', name: '', Required: false, initialEnabled: true },
            { title: 'd', name: '', Required: true, initialEnabled: false },
            { title: 'd', name: '', Required: true, initialEnabled: true },
        ]
    },
    // 可依照上方格式繼續
])

// 控制 checkbox 狀態
const toggleItem = (groupIndex, itemIndex) => {
    const item = raw[groupIndex].item[itemIndex]
    if (item.Required && !item.initialEnabled) return // 不允許勾選 Required 的 disabled 項
    item.initialEnabled = !item.initialEnabled
}
</script>