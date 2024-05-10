<script setup>
defineProps(['link'])
</script>

<template>
  <NuxtLink :to="link"><ContentSlot /></NuxtLink>
</template>
