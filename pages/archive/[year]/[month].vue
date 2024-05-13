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
const fetchStatus = ref('fetching');

async function fetchBlogs() {
  const data = await queryContent('blog')
    .only(['title', 'date', '_path'])
    .sort({ date: -1 })
    .find();

  const filteredBlogs = [];
  data.forEach(blog => {
    let year = getYear(blog.date);
    let month = convertMonthToDigit(getMonth(blog.date));
    if (yearParam === year && month == monthParam) {
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
  }, 2000);
  fetchBlogs();
})
</script>

<template>
  <div>
    <section
      v-if="fetchStatus === 'fetching' || fetchStatus === 'delayed'"
      :id="`${yearParam}-${monthParam}`"
    >
      <h1>Blogs from {{ yearParam }} {{ convertMonthToName(monthParam) }}</h1>
      <p>Loading...</p>
      <p v-if="fetchStatus === 'delayed'">
        This seems to be taking a while to fetch the blogs. Maybe reload the
        page?
      </p>
    </section>
    <section
      :id="`${yearParam}-${monthParam}`"
      v-if="blogs.length && fetchStatus === 'success'"
    >
      <h1>Blogs from {{ yearParam }} {{ convertMonthToName(monthParam) }}</h1>
      <div v-for="(blog, i) in blogs" :key="i" class="mb-4">
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

    <section
      v-else-if="!blogs.length && fetchStatus === 'success'"
      :id="`${yearParam}-${monthParam}`"
    >
      <h1>
        No blogs from {{ yearParam }} {{ convertMonthToName(monthParam) }}!
      </h1>
      <BackButton />
    </section>
  </div>
</template>
