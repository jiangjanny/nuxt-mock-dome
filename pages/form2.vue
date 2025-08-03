<template>
    <Form @submit="onSubmit">
        <div v-for="(field, index) in fields" :key="index" class="mb-6 border-b pb-4">
            <div class="mb-2">
                <label class="inline-flex items-center">
                    <input type="checkbox" v-model="field.enabled" :disabled="isCheckboxDisabled(field)" class="mr-2" />
                    啟用輸入（第 {{ index + 1 }} 筆，{{ field.Required ? '必填' : '非必填' }})
                </label>
            </div>

            <Field :name="`names[${index}]`" :rules="field.Required && field.enabled ? 'required' : ''"
                v-slot="{ field: f, errorMessage }">
                <input v-bind="f" type="text" class="border rounded px-2 py-1 w-full" :disabled="!field.enabled"
                    :placeholder="`第 ${index + 1} 筆輸入`" @input="field.name = f.value" />
                <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
            </Field>
        </div>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            送出
        </button>
    </Form>

    <hr />
    <pre>{{ fields }}</pre>
</template>

<script setup>
import { reactive } from 'vue'
import { Form, Field, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { Title } from '#components'

defineRule('required', required)
// initialEnabled 是固定不變的「初始狀態」。

// enabled 是會被 checkbox 綁定改變的狀態。
const rawFields = [
    { name: '', Required: false, initialEnabled: true },
    { name: '', Required: true, initialEnabled: false },
    { name: '', Required: true, initialEnabled: true },
]

const raw = [
    {
        name: 'sd',
        code: 'we',
        item: [
            { title: 'd', name: '', Required: false, initialEnabled: true },
            { title: 'd', name: '', Required: true, initialEnabled: false },
            { title: 'd', name: '', Required: true, initialEnabled: true },
        ]
    },
    {
        name: 'sdewr',
        code: 'wetret',
        item: [
            { title: 'd', name: '', Required: false, initialEnabled: true },
            { title: 'd', name: '', Required: true, initialEnabled: false },
            { title: 'd', name: '', Required: true, initialEnabled: true },
        ]
    },
    {
        name: 'wrsd',
        code: 'we',
        item: [
            { title: 'werd', name: '', Required: false, initialEnabled: true },
            { title: 'd', name: '', Required: true, initialEnabled: false },
            { title: 'werd', name: '', Required: true, initialEnabled: true },
        ]
    },
    {
        name: 'sdeewrwr',
        code: 'wetwerret',
        item: [
            { title: 'we', name: '', Required: false, initialEnabled: true },
            { title: 'werd', name: '', Required: true, initialEnabled: false },
            { title: 'd', name: '', Required: true, initialEnabled: true },
        ]
    }
]

const fields = reactive(rawFields.map(f => ({ ...f, enabled: f.initialEnabled })))

function isCheckboxDisabled(field) {
    return field.Required && field.initialEnabled
}

function onSubmit(values) {
    alert('驗證通過！\n' + JSON.stringify(values, null, 2))
    console.log(values)
}
</script>
