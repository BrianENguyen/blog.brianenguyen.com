<script setup>
import { isDark } from '~/composables/dark';
import { useToggle } from '@vueuse/shared'
const toggleDark = useToggle(isDark);
</script>

<template>
  <nav>
    <ul class="list-none p-0 m-0">
      <li v-for="link in links" :key="link" class="my-3">
        <NuxtLink :to="link.path" class="decoration-none">
          <div :class="`${link.icon} text-3xl inline-block`" />
          <span class="text-brian-blue">
            {{link.name}}
          </span>
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
          name: 'Blog',
          path: '/blog',
          icon: 'i-solar-sunset-broken'
        },
      ]
    }
  }
}
</script>
