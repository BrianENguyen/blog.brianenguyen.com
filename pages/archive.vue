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

const blogs = await queryContent('blog')
  .only(['title', 'date', 'description', '_path'])
  .sort({ date: -1 })
  .find()
console.log(blogs)
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
  <div v-for="(blogs, i) in blogsByYear" :key="i">
    <h2>{{ i }}</h2>
    <div v-for="blog in blogs">
      {{blog.title}}
    </div>
  </div>
</template>
