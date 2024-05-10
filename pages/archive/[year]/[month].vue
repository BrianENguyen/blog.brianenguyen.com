<script setup>
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate().toString().padStart(2, '0');

  return `${year} ${month} ${day}`;
}

function convertMonthToName(month) {
  const date = new Date(2024, month - 1, 1);
  return date.toLocaleDateString('default', { month: 'long' });
}

function getYear(dateString) {
  let year = "";
  const regex = /\d{4}/;
  const match = dateString.match(regex);
  if (match) {
    year = match[0];
    return year;
  }
  return "";
}

function getMonth(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { month: 'long' });
}

function convertMonthToDigit(month) {
  const date = Date.parse(month + "1, 1999");
  return new Date(date).getMonth() + 1
}

const route = useRoute()
const yearParam = route.params.year;
const monthParam = route.params.month;

const blogs = await queryContent('blog')
  .only(['title', 'date', '_path'])
  .sort({ date: -1 })
  .find();

const filteredBlogs = [];
blogs.forEach(blog => {
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
  </section>

  <section :id="`${yearParam}-${monthParam}`" v-else>
    <h1>No blogs from {{ yearParam }} {{ convertMonthToName(monthParam) }}!</h1>
  </section>
</template>
