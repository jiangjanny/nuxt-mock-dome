<template>
    <div>
        <h2>要保人資料</h2>

        <select v-model="status.value">
            <option value="0">Status 0</option>
            <option value="1">Status 1</option>
            <option value="2">Status 2</option>
        </select>

        <!-- Status 0 / 1 -->
        <div v-if="status.value === '0' || status.value === '1'">
            <input v-model="applicant.applicantidNo" placeholder="身分證字號" />
            <input v-if="status.value === '1'" v-model="applicant.applicantRepRela" placeholder="關係" />
            <input v-model="applicant.applicantName" placeholder="姓名" />
            <select v-model="applicant.applicantBirthdav.year">
                <option v-for="y in years" :key="y">{{ y }}</option>
            </select>
            <select v-model="applicant.applicantBirthdav.month">
                <option v-for="m in months" :key="m">{{ m }}</option>
            </select>
            <select v-model="applicant.applicantBirthdav.day">
                <option v-for="d in days" :key="d">{{ d }}</option>
            </select>
            <div>
                <input v-model="applicant.applicantMobile" placeholder="手機號碼" />
                <div class="error" v-if="errors.applicantMobile">{{ errors.applicantMobile }}</div>
            </div>
            <input v-model="applicant.applicantNatural" placeholder="國家" />
            <input v-model="applicant.applicantJobKind" placeholder="職業" />
            <input v-model="applicant.applicantEmail" placeholder="電子信箱" />
            <input v-model="applicant.applicantAddress.city" placeholder="城市" />
            <input v-model="applicant.applicantAddress.area" placeholder="地區" />
            <input v-model="applicant.applicantAddress.detail" placeholder="地址" />
        </div>

        <!-- Status 2 -->
        <div v-if="status.value === '2'">
            <label>要保人身分別</label>
            <input type="checkbox" v-model="applicant.applicantIsNatural" />

            <input v-model="applicant.applicantRepRela" readonly placeholder="關係 (雇傭)" />

            <input v-model="applicant.applicantidNo" placeholder="身分證字號"
                :disabled="applicant.lockApplicantCheckBox && applicant.applicantIsNatural" />
            <input v-model="applicant.applicantName" placeholder="姓名"
                :disabled="applicant.lockApplicantCheckBox && applicant.applicantIsNatural" />
            <input v-model="applicant.applicantMobile" placeholder="手機號碼"
                :disabled="applicant.lockApplicantCheckBox && applicant.applicantIsNatural" />

            <template v-if="applicant.applicantIsNatural">
                <select v-model="applicant.applicantBirthdav.year">
                    <option v-for="y in years" :key="y">{{ y }}</option>
                </select>
                <select v-model="applicant.applicantBirthdav.month">
                    <option v-for="m in months" :key="m">{{ m }}</option>
                </select>
                <select v-model="applicant.applicantBirthdav.day">
                    <option v-for="d in days" :key="d">{{ d }}</option>
                </select>
                <input v-model="applicant.applicantNatural" placeholder="國家" />
                <input v-model="applicant.applicantJobKind" placeholder="職業" />
                <input v-model="applicant.applicantEmail" placeholder="電子信箱" />
                <input v-model="applicant.applicantAddress.city" placeholder="城市" />
                <input v-model="applicant.applicantAddress.area" placeholder="地區" />
                <input v-model="applicant.applicantAddress.detail" placeholder="地址" />
            </template>

            <template v-else>
                <input v-model="applicant.applicantMobile" placeholder="手機號碼" />
                <input v-model="applicant.applicantEmail" placeholder="電子信箱" />
                <input v-model="applicant.applicantAddress.city" placeholder="城市" />
                <input v-model="applicant.applicantAddress.area" placeholder="地區" />
                <input v-model="applicant.applicantAddress.detail" placeholder="地址" />
            </template>
        </div>

        <button @click="submitAll">送出</button>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { z } from 'zod'
import { applicant, years, months, days } from '@/composables/useInsurance'

// Zod schema
const applicantSchema = z.object({
    applicantidNo: z.string().min(1, '必填'),
    applicantName: z.string().min(1, '必填'),
    applicantBirthdav: z.object({ year: z.string().optional(), month: z.string().optional(), day: z.string().optional() }),
    applicantMobile: z.string().min(1, '必填'),
    applicantNatural: z.string().optional(),
    applicantJobKind: z.string().optional(),
    applicantEmail: z.string().email('格式錯誤'),
    applicantAddress: z.object({ city: z.string().optional(), area: z.string().optional(), detail: z.string().optional() }),
    applicantRepRela: z.string().optional()
})

const errors = reactive<any>({})

function submitAll() {
    const result = applicantSchema.safeParse(applicant)
    if (!result.success) {
        // 將 Zod 格式錯誤轉成簡單 object 顯示
        Object.keys(errors).forEach(key => delete errors[key])
        for (const [key, value] of Object.entries(result.error.format())) {
            errors[key] = (value as any)._errors?.[0] || ''
        }
    } else {
        console.log('驗證通過', applicant)
        Object.keys(errors).forEach(key => delete errors[key])
    }
}
</script>
