<template>
    <div>
        <h1>產品清單 (透過代理 API)</h1>
        <pre>{{ data }}</pre>
    </div>

</template>

<script setup>
const { data } = await $fetch('/api/products')
</script>
