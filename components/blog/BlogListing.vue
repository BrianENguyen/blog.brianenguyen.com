<script setup>
defineProps(['blog']);
</script>

<template>
  <div class="mb-4">
    <NuxtLink
      :to="blog._path"
      class="text-black dark:!text-white no-underline hover:!text-brian-blue"
    >
      <time class="block text-gray">
        <span>
          {{ formatDate(blog.date) }}
        </span>
        <span v-if="blog.edited" class="italic">
          (Edited on {{ formatDate(blog.edited) }})
        </span>
      </time>
      <span>{{ blog.title }}</span>
    </NuxtLink>
  </div>
</template>
