<script setup>
const randomBlogPath = ref('');

const { data } = await useAsyncData('blog', () => queryContent('blog').find())
if (data.value) {
  const randomNumber = Math.floor(Math.random() * ( data.value.length + 1));
  const randomBlog = data.value[randomNumber];
  if (randomBlog?._path) {
    randomBlogPath.value = randomBlog._path;
  }
}
</script>

<template>
  <article class="nuxt-content">
    <ContentDoc>
      <template #not-found>
        <section class="text-center">
          <h1>Not found</h1>
          <p>Whatever you were looking for does not or no longer exists.</p>
          <p v-if="randomBlogPath">
            While you're here, why not check out a
            <NuxtLink :to="randomBlogPath">random blog?</NuxtLink>
          </p>
        </section>
      </template>
    </ContentDoc>
  </article>
</template>
