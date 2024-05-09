<script setup>
import { isDark } from '~/composables/dark';
import { useToggle } from '@vueuse/shared'
const toggleDark = useToggle(isDark);
</script>

<template>
  <nav>
    <ul
      class="list-none flex flex-row items-center justify-center space-x-8 p-0"
    >
      <li v-for="link in links" :key="link">
        <NuxtLink :to="link.path">
          <div :class="`${link.icon} text-3xl`" />
        </NuxtLink>
      </li>
      <li>
        <div
          class="i-solar-sun-outline dark:i-solar-moon-line-duotone 
                cursor-pointer text-3xl text-[#0495b1] hover:text-[#015768]
                transition-color duration-300 dark:text-[#79c2d0] dark:hover:text-[#efefef]"
          @click="toggleDark()"
        />
      </li>
      <li>
        <a href="https://github.com/buraiyen/BENplate" target="_blank">
          <div class="i-iconoir-github cursor-pointer text-3xl" />
        </a>
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
          name: 'About',
          path: '/about',
          icon: 'i-solar-sunset-broken'
        },
      ]
    }
  }
}
</script>
