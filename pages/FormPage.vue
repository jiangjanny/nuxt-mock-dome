<template>
    <div>
        <h2>被保險人資料</h2>
        <input v-model="insured.insuredNo" placeholder="身分證字號" />
        <div class="error">{{ errors.insuredNo }}</div>

        <input v-model="insured.insuredName" placeholder="姓名" />
        <div class="error">{{ errors.insuredName }}</div>

        <select v-model="insured.insuredBirthday.year">
            <option value="">年</option>
            <option v-for="y in years" :key="y">{{ y }}</option>
        </select>
        <select v-model="insured.insuredBirthday.month">
            <option value="">月</option>
            <option v-for="m in months" :key="m">{{ m }}</option>
        </select>
        <select v-model="insured.insuredBirthday.day">
            <option value="">日</option>
            <option v-for="d in days" :key="d">{{ d }}</option>
        </select>
        <div class="error">{{ errors.insuredBirthday }}</div>

        <input v-model="insured.insuredMobile" placeholder="手機號碼" />
        <div class="error">{{ errors.insuredMobile }}</div>

        <input v-model="insured.insuredNation" placeholder="國家" />
        <input v-model="insured.insuredJobKind" placeholder="職業" />
        <input v-model="insured.insuredEmail" placeholder="電子信箱" />
        <div class="error">{{ errors.insuredEmail }}</div>

        <div>
            <input type="radio" id="dewey" name="insured" :value="true" v-model="insured.insured" />
            <label for="dewey">Dewey</label>
        </div>
        <div>
            <input type="radio" id="louie" name="insured" :value="false" v-model="insured.insured" />
            <label for="louie">Louie</label>
        </div>
        <div class="error">{{ errors.insured }}</div>

        <h2>要保人資料</h2>
        <select v-model="status.value">
            <option value="0">Status 0</option>
            <option value="1">Status 1</option>
            <option value="2">Status 2</option>
        </select>

        <!-- Status 0 / 1 -->
        <div v-if="status.value === '0' || status.value === '1'">
            <input v-model="applicant.applicantidNo" placeholder="身分證字號" />
            <div class="error">{{ errors.applicantidNo }}</div>

            <input v-if="status.value === '1'" v-model="applicant.applicantRepRela" placeholder="關係" />

            <input v-model="applicant.applicantName" placeholder="姓名" />
            <div class="error">{{ errors.applicantName }}</div>

            <select v-model="applicant.applicantBirthdav.year">
                <option value="">年</option>
                <option v-for="y in years" :key="y">{{ y }}</option>
            </select>
            <select v-model="applicant.applicantBirthdav.month">
                <option value="">月</option>
                <option v-for="m in months" :key="m">{{ m }}</option>
            </select>
            <select v-model="applicant.applicantBirthdav.day">
                <option value="">日</option>
                <option v-for="d in days" :key="d">{{ d }}</option>
            </select>
            <div class="error">{{ errors.applicantBirthdav }}</div>

            <input v-model="applicant.applicantMobile" placeholder="手機號碼" />
            <div class="error">{{ errors.applicantMobile }}</div>

            <input v-model="applicant.applicantNatural" placeholder="國家" />
            <input v-model="applicant.applicantJobKind" placeholder="職業" />
            <input v-model="applicant.applicantEmail" placeholder="電子信箱" />
            <div class="error">{{ errors.applicantEmail }}</div>
        </div>

        <!-- Status 2 -->
        <div v-if="status.value === '2'">
            <label>要保人身分別</label>
            <input type="checkbox" v-model="applicant.applicantIsNatural" />

            <input v-model="applicant.applicantRepRela" readonly placeholder="關係 (雇傭)" />

            <input v-model="applicant.applicantidNo" placeholder="身分證字號"
                :disabled="applicant.lockApplicantCheckBox && applicant.applicantIsNatural" />
            <div class="error">{{ errors.applicantidNo }}</div>

            <input v-model="applicant.applicantName" placeholder="姓名"
                :disabled="applicant.lockApplicantCheckBox && applicant.applicantIsNatural" />
            <div class="error">{{ errors.applicantName }}</div>

            <input v-model="applicant.applicantMobile" placeholder="手機號碼"
                :disabled="applicant.lockApplicantCheckBox && applicant.applicantIsNatural" />
            <div class="error">{{ errors.applicantMobile }}</div>
        </div>

        <button @click="submitAll">送出</button>
    </div>
</template>

<script setup lang="ts">
import { watch, onMounted, reactive } from 'vue'
import { z } from 'zod'
import { insured, applicant, backupApplicant, status, years, months, days, statusww, active } from '@/composables/useInsurance'

// 驗證錯誤
const errors = reactive<Record<string, string>>({})

// Status 0 同步被保險人資料到要保人
watch([() => status.value, () => insured], () => {
    if (status.value === '0') {
        Object.assign(applicant, {
            applicantidNo: insured.insuredNo,
            applicantName: insured.insuredName,
            applicantBirthdav: { ...insured.insuredBirthday },
            applicantMobile: insured.insuredMobile,
            applicantNatural: insured.insuredNation,
            applicantJobKind: insured.insuredJobKind,
            applicantEmail: insured.insuredEmail,
            applicantAddress: { ...insured.insuredAddress },
            applicantRepRela: ''
        })
    }
})

// Status 2 applicantIsNatural 切換
watch(() => applicant.applicantIsNatural, (newVal) => {
    if (status.value !== '2') return
    if (newVal) {
        // 回復原本資料
        Object.assign(applicant, backupApplicant)
        applicant.applicantidNo = insured.insuredNo
        applicant.applicantName = insured.insuredName
        applicant.applicantMobile = insured.insuredMobile
    } else {
        // 備份目前資料
        Object.assign(backupApplicant, applicant)
        // 清空欄位
        applicant.applicantidNo = ''
        applicant.applicantName = ''
        applicant.applicantBirthdav = { year: '', month: '', day: '' }
        applicant.applicantMobile = ''
        applicant.applicantNatural = ''
        applicant.applicantJobKind = ''
        applicant.applicantEmail = ''
        applicant.applicantAddress = { city: '', area: '', detail: '' }
    }
})

// Zod schema
const insuredSchema = z.object({
    insuredNo: z.string().min(1, '必填'),
    insuredName: z.string().min(1, '必填'),
    insuredBirthday: z.object({ year: z.string().min(1, '必填'), month: z.string().min(1, '必填'), day: z.string().min(1, '必填') }),
    insuredMobile: z.string().min(1, '必填'),
    insuredEmail: z.string().email('格式錯誤'),
    insured: z.boolean().nullable().refine(
        (val) => {
            // 只有在 status.value === 2 && !active.value 時，必須選取
            if (statusww.value === 2 && !active.value) {
                return val === true || val === false
            }
            return true // 其他狀態不驗證
        },
        { message: '請選擇被保險人' }
    )
})
const applicantSchema = z.object({
    applicantidNo: z.string().min(1, '必填'),
    applicantName: z.string().min(1, '必填'),
    applicantBirthdav: z.object({ year: z.string().min(1, '必填'), month: z.string().min(1, '必填'), day: z.string().min(1, '必填') }),
    applicantMobile: z.string().min(1, '必填'),
    applicantEmail: z.string().email('格式錯誤')
})

// 驗證函數
function validate() {
    const insuredResult = insuredSchema.safeParse(insured)
    const applicantResult = applicantSchema.safeParse(applicant)

    Object.keys(errors).forEach(k => delete errors[k])

    if (!insuredResult.success) {
        Object.assign(errors, Object.fromEntries(
            Object.entries(insuredResult.error.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] || ''])
        ))
    }

    if (!applicantResult.success) {
        Object.assign(errors, Object.fromEntries(
            Object.entries(applicantResult.error.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] || ''])
        ))
    }

    return insuredResult.success && applicantResult.success
}

// 格式化生日
function formatBirthday(b: { year: string, month: string, day: string }) {
    if (!b.year || !b.month || !b.day) return ''
    return `${b.year}-${b.month.padStart(2, '0')}-${b.day.padStart(2, '0')}`
}

function submitAll() {
    if (!validate()) return
    console.log({
        insured: { ...insured, insuredBirthday: formatBirthday(insured.insuredBirthday) },
        applicant: { ...applicant, applicantBirthdav: formatBirthday(applicant.applicantBirthdav), applicantIsNatural: applicant.applicantIsNatural ? 'Y' : 'N' }
    })
}
</script>

<style scoped>
input,
select {
    display: block;
    margin-bottom: 8px;
}

.error {
    color: red;
    font-size: 12px;
    margin-bottom: 5px;
}
</style>
