<template>
    <div>
        <h2>被保險人車主資料</h2>
        <input v-model="insured.insuredNo" placeholder="身分證字號" />
        <input v-model="insured.insuredName" placeholder="姓名" />
        <select v-model="insured.insuredBirthday.year">
            <option v-for="y in years" :key="y">{{ y }}</option>
        </select>
        <select v-model="insured.insuredBirthday.month">
            <option v-for="m in months" :key="m">{{ m }}</option>
        </select>
        <select v-model="insured.insuredBirthday.day">
            <option v-for="d in days" :key="d">{{ d }}</option>
        </select>
        <input v-model="insured.insuredMobile" placeholder="手機號碼" />
        <input v-model="insured.insuredNation" placeholder="國家" />
        <input v-model="insured.insuredJobKind" placeholder="職業" />
        <input v-model="insured.insuredEmail" placeholder="電子信箱" />
        <input v-model="insured.insuredAddress.city" placeholder="城市" />
        <input v-model="insured.insuredAddress.area" placeholder="地區" />
        <input v-model="insured.insuredAddress.detail" placeholder="地址" />
    </div>
</template>

<script setup lang="ts">
import { insured, years, months, days } from '@/composables/useInsurance'
</script>
