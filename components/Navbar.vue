<script setup>
import { isDark } from '~/composables/dark';
import { useToggle } from '@vueuse/shared'
const toggleDark = useToggle(isDark);
</script>

<template>
  <nav>
    <ul class="list-none p-0 m-0">
      <li v-for="link in links" :key="link" class="my-3">
        <NuxtLink v-if="!link.external" :to="link.path" class="decoration-none">
          <div :class="`${link.icon} text-3xl inline-block`" />
          <span class="ml-2 text-black dark:text-white">
            {{ link.name }}
          </span>
        </NuxtLink>
        <a v-else :href="link.path" target="_blank" class="decoration-none">
          <div :class="`${link.icon} text-3xl inline-block`" />
          <span class="ml-2 text-black dark:text-white">
            {{ link.name }}
          </span>
        </a>
      </li>
      <li>
        <div
          class="i-solar-sun-outline dark:i-solar-moon-line-duotone 
                cursor-pointer text-3xl text-[#0495b1] hover:text-[#015768]
                transition-color duration-300 dark:text-[#79c2d0] dark:hover:text-[#efefef]"
          @click="toggleDark()"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'Home',
          path: '/',
          icon: 'i-solar-home-2-broken',
        },
        {
          name: 'Blog',
          path: '/blog',
          icon: 'i-solar-sunset-broken'
        },
        {
          name: 'Archive',
          path: '/archive',
          icon: 'i-solar-database-broken'
        },
        {
          name: 'Github',
          path: 'https://github.com/Buraiyen',
          icon: 'i-iconoir-github',
          external: true
        },
      ]
    }
  }
}
</script>
