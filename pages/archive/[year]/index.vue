<script setup>
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

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate().toString().padStart(2, '0');

  return `${year} ${month} ${day}`;
}

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
  <section :id="yearParam">
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
</template>
