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
      <BlogCard v-for="(blog ,i) in list.slice(0, 10)" :blog="blog" :key="i" />
    </ContentList>
  </section>
</template>
