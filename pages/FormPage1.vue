<script setup lang="ts">
import { reactive, ref } from 'vue'
import { z } from 'zod'

// 狀態
const status = ref(1)
const active = ref(false)

// 表單資料
const insured = reactive({
    insured: null as boolean | null
})

// 錯誤訊息
const errors = reactive({
    insured: ''
})

// Zod schema，條件驗證寫在 schema 裡
const insuredSchema = z.object({
    insured: z.boolean().nullable().refine(
        (val) => {
            // 只有在 status.value === 2 && !active.value 時，必須選取
            if (status.value === 2 && !active.value) {
                return val === true || val === false
            }
            return true // 其他狀態不驗證
        },
        { message: '請選擇被保險人' }
    )
})

// submitAll 只需 parse
const submitAll = () => {
    try {
        insuredSchema.parse(insured)
        errors.insured = ''
        alert('驗證通過，表單送出！')
    } catch (e: any) {
        errors.insured = e.errors[0].message
    }
}
</script>

<template>
    <div>
        <h2>被保險人</h2>
        <div>
            <input type="radio" id="dewey" name="insured" :value="true" v-model="insured.insured" />
            <label for="dewey">Dewey</label>
        </div>
        <div>
            <input type="radio" id="louie" name="insured" :value="false" v-model="insured.insured" />
            <label for="louie">Louie</label>
        </div>
        <div class="error">{{ errors.insured }}</div>

        <button @click="submitAll">送出</button>
    </div>
</template>
