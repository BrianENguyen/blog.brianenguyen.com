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
    .only(['title', 'date', 'edited', '_path'])
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
      <BlogListing :blog="blog" v-for="(blog, i) in blogs" :key="i" />
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
