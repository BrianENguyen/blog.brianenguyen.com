<script setup>
import { formatDate } from '~/composables/formatDate';
import { getYear } from '~/composables/getYear';

const route = useRoute()
const yearParam = route.params.year;

const blogs = await queryContent('blog')
  .only(['title', 'date', '_path'])
  .sort({ date: -1 })
  .find();

const filteredBlogs = [];

blogs.forEach(blog => {
  let year = getYear(blog.date);
  if (yearParam === year) {
    filteredBlogs.push(blog);
  }
});
</script>
<template>
  <section :id="yearParam" v-if="filteredBlogs.length">
    <h1>Blogs from {{ yearParam }}</h1>
    <div v-for="(blog, i) in filteredBlogs" :key="i" class="mb-4">
      <NuxtLink
        :to="blog._path"
        class="text-black dark:!text-white no-underline hover:!text-brian-blue"
      >
        <time class="block text-gray">{{ formatDate(blog.date) }}</time>
        <span>{{ blog.title }}</span>
      </NuxtLink>
    </div>
  </section>

  <section :id="yearParam" v-else>
    <h1>No blogs from {{ yearParam }}!</h1>
  </section>
</template>
