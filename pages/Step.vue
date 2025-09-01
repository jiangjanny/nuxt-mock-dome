<script setup lang="ts">
import { ref, computed } from "vue"

// 取得當前年
const currentYear = new Date().getFullYear()

// 最小西元年
const minYear = 1920

// 西元轉民國
const toROC = (year: number) => year - 1911

// 開始年月
const startYear = ref<number | null>(null)
const startMonth = ref<number | null>(null)

// 結束年月
const endYear = ref<number | null>(null)
const endMonth = ref<number | null>(null)

// 開始年選單 (1920 ~ 當前年)
const startYearOptions = computed(() =>
    Array.from({ length: currentYear - minYear + 1 }, (_, i) => {
        const y = currentYear - i
        return { label: `民國 ${toROC(y)} 年`, value: y }
    })
)

// 月份選單 (1~12)
const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1
    return { label: `${m} 月`, value: m }
})

// 結束年選單 (依開始年 ~ 當前年)
const endYearOptions = computed(() => {
    if (!startYear.value) return []
    return Array.from({ length: currentYear - startYear.value + 1 }, (_, i) => {
        const y = currentYear - i
        return { label: `民國 ${toROC(y)} 年`, value: y }
    }).filter(y => y.value >= startYear.value!)
})

// 結束年選單 (依開始年 ~ 當前年)
const endmonthOptions = computed(() => {
    if (!startMonth.value) return []
    return monthOptions.filter(y => y.value > startMonth.value!)
})
</script>

<template>
    <div>
        <h2>開始年月</h2>
        <select v-model="startYear">
            <option :value="null">請選擇年份</option>
            <option v-for="y in startYearOptions" :key="y.value" :value="y.value">
                {{ y.label }}
            </option>
        </select>

        <select v-model="startMonth">
            <option :value="null">請選擇月份</option>
            <option v-for="m in monthOptions" :key="m.value" :value="m.value">
                {{ m.label }}
            </option>
        </select>

        <h2>結束年月</h2>
        <select v-model="endYear" :disabled="!startYear">
            <option :value="null">請選擇年份</option>
            <option v-for="y in endYearOptions" :key="y.value" :value="y.value">
                {{ y.label }}
            </option>
        </select>

        <select v-model="endMonth" :disabled="!endYear">
            <option :value="null">請選擇月份</option>
            <option v-for="m in endmonthOptions" :key="m.value" :value="m.value">
                {{ m.label }}
            </option>
        </select>
    </div>
</template>
