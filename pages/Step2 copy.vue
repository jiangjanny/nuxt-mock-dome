<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div v-for="(field, index) in fields" :key="index" style="margin-bottom: 10px;">
                <label>{{ index + 1 }}. {{ field.label }}</label>

                <!-- select -->
                <select v-if="field.type === 'select'" v-model="form[index]" @change="() => handleChange(index)"
                    :disabled="!ready[index]">
                    <option disabled value="">請選擇</option>
                    <option v-for="opt in options[index]" :key="opt.id" :value="opt.id">
                        {{ opt.name }}
                    </option>
                </select>

                <!-- input -->
                <input v-else :type="field.inputType || 'text'" v-model="form[index]" @input="() => handleChange(index)"
                    :disabled="!ready[index]" />

                <!-- 錯誤訊息 -->
                <div v-if="errors[index]" style="color: red; font-size: 12px;">{{ errors[index] }}</div>
            </div>

            <button type="submit">送出</button>
        </form>

        <pre>表單資料: {{ form }}</pre>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { z } from 'zod'

// 欄位設定
const fields = [
    { label: '第一層選擇', type: 'select' },
    { label: '第二層選擇', type: 'select' },
    { label: '第三層輸入', type: 'input' },
    { label: '第四層選擇', type: 'select' },
    { label: '第五層輸入', type: 'input' },
    { label: '第六層選擇', type: 'select' },
    { label: '第七層輸入', type: 'input' },
    { label: '第八層選擇', type: 'select' }
]

// 完整依賴定義：key 是「欄位索引」，值是「此欄位依賴哪些欄位」
// 這邊完整列出欄位間的依賴關係，務必確保依賴不漏
const dependencies = {
    1: [0],   // 第二層依賴第一層
    2: [1],   // 第三層依賴第二層
    3: [2],   // 第四層依賴第三層
    4: [3],   // 第五層依賴第四層
    5: [3],   // 第六層依賴第四層
    6: [4],   // 第七層依賴第五層
    7: [5]    // 第八層依賴第六層
}

const count = fields.length

const form = ref(Array(count).fill(''))
const options = ref(Array(count).fill([]))
const ready = ref(Array(count).fill(false))
const errors = ref(Array(count).fill(''))

// 模擬 API 呼叫，回傳選項
const fetchOptions = async (index, parentValue) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: `${parentValue || 'root'}-opt1`, name: `選項 ${index + 1}-1` },
                { id: `${parentValue || 'root'}-opt2`, name: `選項 ${index + 1}-2` }
            ])
        }, 500)
    })
}

const lastRequestId = ref(0)
let debounceTimer = null

onMounted(async () => {
    // 第一層下拉初始化
    const res = await fetchOptions(0, null)
    options.value[0] = res
    ready.value[0] = res.length > 0

    // 無依賴欄位預設啟用 (input 或 select)
    for (let i = 1; i < count; i++) {
        if (!dependencies[i]) {
            ready.value[i] = true
        }
    }
})

// 遞迴清除所有依賴於 index 的欄位（含下游）
const clearDependents = (index) => {
    for (let i = 0; i < count; i++) {
        const deps = dependencies[i]
        if (deps && deps.includes(index)) {
            form.value[i] = ''
            errors.value[i] = ''
            if (fields[i].type === 'select') {
                options.value[i] = []
                ready.value[i] = false
            } else {
                ready.value[i] = false
            }
            clearDependents(i) // 遞迴清空下游欄位
        }
    }
}

const handleChange = (index) => {
    clearDependents(index)
    errors.value[index] = ''

    if (debounceTimer) clearTimeout(debounceTimer)

    debounceTimer = setTimeout(async () => {
        // 尋找所有直接依賴 index 的欄位
        for (let i = index + 1; i < count; i++) {
            const deps = dependencies[i]
            if (!deps || !deps.includes(index)) continue

            const canFetch = deps.every(d => form.value[d])
            const isSelect = fields[i].type === 'select'

            if (canFetch && isSelect) {
                const currentRequestId = ++lastRequestId.value
                const res = await fetchOptions(i, form.value[deps[0]])
                if (currentRequestId === lastRequestId.value) {
                    options.value[i] = res
                    ready.value[i] = res.length > 0
                }
            } else if (canFetch && fields[i].type === 'input') {
                ready.value[i] = true
            }
        }
    }, 300)
}

// Zod Schema 定義 (範例都是必填，可依需求調整)
// import { z } from 'zod'

const schema = z.tuple([
    z.string().min(1, '第一層必須選擇'),
    z.string().min(1, '第二層必須選擇'),
    z.string().min(1, '第三層必須填寫'),
    z.string().min(1, '第四層必須選擇'),
    z.string().min(1, '第五層必須填寫'),
    z.string().min(1, '第六層必須選擇'),
    z.string().min(1, '第七層必須填寫'),
    z.string().min(1, '第八層必須選擇')
])

const handleSubmit = () => {
    errors.value = Array(count).fill('') // 清空錯誤

    const result = schema.safeParse(form.value)
    if (!result.success) {
        const formattedErrors = result.error.format()
        for (let i = 0; i < count; i++) {
            if (formattedErrors[i]?._errors?.length > 0) {
                errors.value[i] = formattedErrors[i]._errors[0]
            }
        }
        alert('表單驗證失敗，請修正錯誤！')
        return
    }

    alert(`驗證通過！送出資料：\n${JSON.stringify(form.value)}`)
}
</script>
