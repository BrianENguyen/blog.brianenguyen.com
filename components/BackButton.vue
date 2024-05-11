<script setup>
defineProps(['year'])
</script>

<template>
  <div>
    <NuxtLink v-if="year" :to="`/archive/${year}`">
      &#x2190; Back to {{ year }}</NuxtLink
    >
    <NuxtLink v-else to="/archive"> &#x2190; Back to archives</NuxtLink>
  </div>
</template>
