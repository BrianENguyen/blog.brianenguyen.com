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

function getMonth(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { month: 'long' });
}

const blogs = await queryContent('blog')
  .only(['title', 'date', '_path'])
  .sort({ date: -1 })
  .find()

let blogsByYear = {};

blogs.forEach(blog => {
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
</script>

<template>
  <div>
    <h1>Archive</h1>
    <div v-for="(yearBlogs, year) in blogsByYear" :key="year">
      <h2>{{ year.replace(/^\d+_/, '' ) }}</h2>
      <div v-for="(monthBlogs, month) in yearBlogs" :key="month">
        <h3>
          {{ month }} ({{ monthBlogs.length }}
          {{ monthBlogs.length > 1 ? 'blogs' : 'blog' }})
        </h3>
      </div>
    </div>
  </div>
</template>
