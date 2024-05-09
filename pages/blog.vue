<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';

const query: QueryBuilderParams = {
  path: '/blog',
  sort: [{date: -1}]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate().toString().padStart(2, '0');

  return `${year} ${month} ${day}`;
}
</script>

<template>
  <section>
    <ContentList :query="query" v-slot="{ list }">
      <div v-for="(blog, blogIndex) in list" :key="blog._path">
        <div class="sm:grid sm:grid-cols-12">
          <div class="col-span-2">
            <p>{{ formatDate(blog.date) }}</p>
          </div>
          <div class="col-span-10">
            <h2>{{ blog.title }}</h2>
            <p>{{ blog.description }}</p>
            <NuxtLink :to="blog._path">Read More</NuxtLink>
          </div>
        </div>
        <hr class="text-[#454545]" v-if="!(blogIndex === list.length - 1)" />
      </div>
    </ContentList>
  </section>
</template>
