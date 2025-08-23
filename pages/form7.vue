<script setup lang="ts">
import { ref } from 'vue'
import BooleanRadio from '@/components/RadioGroup.vue'

const agree = ref<boolean | null>(null)
</script>

<template>
    <form @submit.prevent="console.log(agree)">
        <p>是否同意服務條款？{{ agree }}</p>
        <BooleanRadio v-model="agree" name="agree" required :labels="{ trueLabel: '同意', falseLabel: '不同意' }" />
        <br />
        <button type="submit">送出</button>
    </form>
</template>
