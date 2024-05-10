<script setup>
function getYear(dateString) {
  let year = "";
  const regex = /\d{4}/;
  const match = dateString.match(regex);
  if (match) {
    year = match[0]
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

const blogs = await queryContent('blog')
  .only(['title', 'date', 'description', '_path'])
  .sort({ date: -1 })
  .find()

let blogsByYear = {};

blogs.forEach(blog => {
  let year = getYear(blog.date);
  if (blogsByYear[year] === undefined) {
    blogsByYear[year] = [];
    blogsByYear[year].push(blog)
  }
  else {
    blogsByYear[year].push(blog)
  }
})
</script>

<template>
  <div>
    <h1>Archive</h1>
    <div v-for="(blogs, i) in blogsByYear" :key="i">
      <h2>{{ i }}</h2>
      <div v-for="blog in blogs" :key="blog.title" class="my-2">
        <p>{{ formatDate(blog.date) }}</p>
        <NuxtLink :to="blog._path">{{ blog.title }}</NuxtLink>
        <p>{{ blog.description }}</p>
      </div>
    </div>
  </div>
</template>
