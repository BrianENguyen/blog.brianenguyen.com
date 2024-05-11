<script setup>
import { formatDate } from '~/composables/formatDate';
import { convertMonthToName } from '~/composables/convertMonthToName';
import { getYear } from '~/composables/getYear';
import { getMonth } from '~/composables/getMonth';
import { convertMonthToDigit } from '~/composables/convertMonthToDigit';

const route = useRoute()
const yearParam = route.params.year;
const monthParam = route.params.month;

useHead({
  title: `${yearParam}-${monthParam} Blogs - BEN`,
  meta: [
    {
      name: 'description',
      content: `List of blogs in ${yearParam}-${monthParam}`
    }
  ]
})


const blogs = ref([]);

const data = await queryContent('blog')
  .only(['title', 'date', '_path'])
  .sort({ date: -1 })
  .find();

blogs.value = data;

const filteredBlogs = [];
blogs.value.forEach(blog => {
  let year = getYear(blog.date);
  let month = convertMonthToDigit(getMonth(blog.date));
  if (yearParam === year && month == monthParam) {
    filteredBlogs.push(blog);
  }
})
</script>

<template>
  <section :id="`${yearParam}-${monthParam}`" v-if="filteredBlogs.length">
    <h1>Blogs from {{ yearParam }} {{ convertMonthToName(monthParam) }}</h1>
    <div v-for="(blog, i) in filteredBlogs" :key="i" class="mb-4">
      <NuxtLink
        :to="blog._path"
        class="text-black dark:!text-white no-underline hover:!text-brian-blue"
      >
        <time class="block text-gray">{{ formatDate(blog.date) }}</time>
        <span>{{ blog.title }}</span>
      </NuxtLink>
    </div>

    <BackButton :year="yearParam" />
    <BackButton />
  </section>

  <section :id="`${yearParam}-${monthParam}`" v-else>
    <h1>No blogs from {{ yearParam }} {{ convertMonthToName(monthParam) }}!</h1>
    <BackButton />
  </section>
</template>
