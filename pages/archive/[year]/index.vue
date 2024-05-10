<script setup>
const route = useRoute()
const year = route.params.year;
</script>
<template>
  <h1>Blogs in {{ year }}</h1>
</template>
