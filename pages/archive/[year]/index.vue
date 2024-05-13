<script setup>
import { formatDate } from '~/composables/formatDate';
import { getYear } from '~/composables/getYear';

const route = useRoute()
const yearParam = route.params.year;

useHead({
  title: `${yearParam} Blogs - BEN`,
  meta: [
    {
      name: 'description',
      content: `List of blogs in ${yearParam}`
    }
  ]
});


const blogs = ref([]);
const fetchStatus = ref('fetching');

async function fetchBlogs() {
  const data = await queryContent('blog')
    .only(['title', 'date', '_path'])
    .sort({ date: -1 })
    .find();

  const filteredBlogs = [];
  data.forEach(blog => {
    let year = getYear(blog.date);
    if (yearParam === year) {
      filteredBlogs.push(blog);
    }
  })
  blogs.value = filteredBlogs;
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
    <section
      v-if="fetchStatus === 'fetching' || fetchStatus === 'delayed'"
      :id="yearParam"
    >
      <h1>Blogs from {{ yearParam }}</h1>
      <p>Loading...</p>
      <p v-if="fetchStatus === 'delayed'">
        This seems to be taking a while to fetch the blogs. Maybe reload the
        page?
      </p>
    </section>

    <section v-if="blogs.length && fetchStatus === 'success'" :id="yearParam">
      <h1>Blogs from {{ yearParam }}</h1>
      <div v-for="(blog, i) in blogs" :key="i" class="mb-4">
        <NuxtLink
          :to="blog._path"
          class="text-black dark:!text-white no-underline hover:!text-brian-blue"
        >
          <time class="block text-gray">{{ formatDate(blog.date) }}</time>
          <span>{{ blog.title }}</span>
        </NuxtLink>
      </div>
      <BackButton />
    </section>

    <section
      v-else-if="!blogs.length && fetchStatus === 'success'"
      :id="yearParam"
    >
      <h1>No blogs from {{ yearParam }}!</h1>
      <BackButton />
    </section>
  </div>
</template>
