<script setup lang="ts">
import { ref } from 'vue'
import BooleanRadio from '@/components/RadioGroup.vue'

const agreeA = ref<boolean | null>(null)
const agreeB = ref<boolean | null>(null)
</script>

<template>
    <form @submit.prevent="console.log({ agreeA, agreeB })">
        <p>是否同意服務條款？{{ agreeB }}</p>

        <!-- 不用手動寫 name -->
        <BooleanRadio v-model="agreeA" required :labels="{ trueLabel: '同意1', falseLabel: '不同意1' }" />
        <BooleanRadio v-model="agreeB" required :labels="{ trueLabel: '同意', falseLabel: '不同意' }" />

        <br />
        <button type="submit">送出</button>
    </form>
</template>
