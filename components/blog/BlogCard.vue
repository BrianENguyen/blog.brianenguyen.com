<script setup>
import { formatDate } from '~/composables/formatDate';

defineProps(['blog'])
</script>

<template>
  <div
    class="rounded-md 
            dark:bg-[#131313]
              min-h-[200px] h-auto
              p-4
              my-4
              transition-colors
              border-1px dark:border-gray-light border-solid
              border-l-[4px] hover:border-l-brian-blue hover:border-[#434a57]"
  >
    <time class="my-4">
      <span>
        {{ formatDate(blog.date) }}
      </span>
      <span v-if="blog.edited" class="italic">
        (Edited on {{ formatDate(blog.edited) }})
      </span>
    </time>
    <h2>{{ blog.title }}</h2>
    <p>{{ blog.description }}</p>
    <NuxtLink :to="blog._path">Read More</NuxtLink>
  </div>
</template>
