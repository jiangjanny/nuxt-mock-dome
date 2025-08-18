<template>
    <div>
        <h2>被保險人車主資料</h2>
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
        <div class="error">
            {{ errors['insuredBirthday.year'] }}
            {{ errors['insuredBirthday.month'] }}
            {{ errors['insuredBirthday.day'] }}
        </div>

        <input v-model="insured.insuredMobile" placeholder="手機號碼" />
        <div class="error">{{ errors.insuredMobile }}</div>

        <input v-model="insured.insuredNation" placeholder="國家" />
        <input v-model="insured.insuredJobKind" placeholder="職業" />
        <input v-model="insured.insuredEmail" placeholder="電子信箱" />
        <div class="error">{{ errors.insuredEmail }}</div>

        <input v-model="insured.insuredAddress.city" placeholder="城市" />
        <input v-model="insured.insuredAddress.area" placeholder="地區" />
        <input v-model="insured.insuredAddress.detail" placeholder="地址" />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    insured: any,
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
