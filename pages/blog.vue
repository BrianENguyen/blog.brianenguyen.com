<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';
import { formatDate } from '~/composables/formatDate';

const query: QueryBuilderParams = {
  path: '/blog',
  sort: [{date: -1}]
}

useHead({
  title: 'Blog List - BEN',
  meta: [
    {
      name: 'description',
      content: 'List of my most recent blogs'
    }
  ]
})
</script>

<template>
  <section>
    <h1>Blogs</h1>
    <p>
      Below are some of my most recent blogs that cover a wide range of topics.
      Want to see the full list? Check out the
      <NuxtLink to="/archive">archives!</NuxtLink>
    </p>
    <ContentList :query="query" v-slot="{ list }">
      <div v-for="(blog, i) in list.slice(0,10)" :key="i">
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
          <p>{{ formatDate(blog.date) }}</p>
          <h2>{{ blog.title }}</h2>
          <p>{{ blog.description }}</p>
          <NuxtLink :to="blog._path">Read More</NuxtLink>
        </div>
      </div>
    </ContentList>
  </section>
</template>
