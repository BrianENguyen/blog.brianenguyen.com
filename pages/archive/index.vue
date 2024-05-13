<script setup>
import { getYear } from '~/composables/getYear';
import { getMonth } from '~/composables/getMonth';
import { convertMonthToDigit } from '~/composables/convertMonthToDigit';

useHead({
  title: 'Archive - BEN',
  meta: [
    {
      name: 'description',
      content: 'Archive of all of my blogs'
    }
  ]
})

const blogs = ref([]);
const fetchStatus = ref('fetching');

async function fetchBlogs() {
  const data = await queryContent('blog')
    .only(['title', 'date', '_path'])
    .sort({ date: -1 })
    .find()

  let blogsByYear = {};
  data.forEach(blog => {
    let year = `0_${getYear(blog.date)}`;
    let month = getMonth(blog.date);

    if (!blogsByYear[year]) {
      blogsByYear[year] = {};
    }

    if (!blogsByYear[year][month]) {
      blogsByYear[year][month] = [];
    }

    blogsByYear[year][month].push(blog);
  });
  blogs.value = blogsByYear;
  fetchStatus.value = 'success';
}

onMounted(() => {
  setTimeout(() => {
    if (fetchStatus.value !== 'success') {
      fetchStatus.value = 'delayed';
    }
  }, 2000)
  fetchBlogs();
})
</script>

<template>
  <div>
    <h1>Archive</h1>
    <div v-if="fetchStatus === 'fetching' || fetchStatus === 'delayed'">
      <p>Loading blogs...</p>
      <p v-if="fetchStatus === 'delayed'">
        This seems to be taking a while to fetch the blogs. Maybe reload the
        page?
      </p>
    </div>
    <div
      v-if="blogs && fetchStatus === 'success'"
      v-for="(yearBlogs, year) in blogs"
      :key="year"
    >
      <h2>{{ year.replace(/^\d+_/, '' ) }}</h2>
      <div v-for="(monthBlogs, month) in yearBlogs" :key="month">
        <NuxtLink
          :to="`/archive/${year.replace(/^\d+_/, '' )}/${convertMonthToDigit(month)}`"
        >
          <h3>
            {{ month }} ({{ monthBlogs.length }}
            {{ monthBlogs.length > 1 ? 'blogs' : 'blog' }})
          </h3>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
