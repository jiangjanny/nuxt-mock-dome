<template>
    <div>
        <h2>要保人資料</h2>

        <select v-model="status.value">
            <option value="0">Status 0</option>
            <option value="1">Status 1</option>
            <option value="2">Status 2</option>
        </select>

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
            <div class="error">
                {{ errors['applicantBirthdav.year'] }}
                {{ errors['applicantBirthdav.month'] }}
                {{ errors['applicantBirthdav.day'] }}
            </div>

            <input v-model="applicant.applicantMobile" placeholder="手機號碼" />
            <div class="error">{{ errors.applicantMobile }}</div>

            <input v-model="applicant.applicantNatural" placeholder="國家" />
            <input v-model="applicant.applicantJobKind" placeholder="職業" />
            <input v-model="applicant.applicantEmail" placeholder="電子信箱" />
            <div class="error">{{ errors.applicantEmail }}</div>

            <input v-model="applicant.applicantAddress.city" placeholder="城市" />
            <input v-model="applicant.applicantAddress.area" placeholder="地區" />
            <input v-model="applicant.applicantAddress.detail" placeholder="地址" />
        </div>

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

            <template v-if="applicant.applicantIsNatural">
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
                <div class="error">
                    {{ errors['applicantBirthdav.year'] }}
                    {{ errors['applicantBirthdav.month'] }}
                    {{ errors['applicantBirthdav.day'] }}
                </div>

                <input v-model="applicant.applicantNatural" placeholder="國家" />
                <input v-model="applicant.applicantJobKind" placeholder="職業" />
                <input v-model="applicant.applicantEmail" placeholder="電子信箱" />
                <div class="error">{{ errors.applicantEmail }}</div>

                <input v-model="applicant.applicantAddress.city" placeholder="城市" />
                <input v-model="applicant.applicantAddress.area" placeholder="地區" />
                <input v-model="applicant.applicantAddress.detail" placeholder="地址" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    status: any,
    applicant: any,
    errors: Record<string, string>,
    years: number[],
    months: number[],
    days: number[]
}>()
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
