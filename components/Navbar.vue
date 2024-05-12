<script setup>
import { isDark } from '~/composables/dark';
import { useToggle } from '@vueuse/shared'
const toggleDark = useToggle(isDark);

let isToggled = ref(false);

function toggleMobileMenu() {
  isToggled.value = !isToggled.value;
}
</script>

<template>
  <nav class="hidden sm:block">
    <NuxtLink to="/" class="decoration-none">
      <span class="text-black dark:text-white text-2xl font-bold">
        Brian's Blog
      </span>
    </NuxtLink>
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
  <nav
    class="fixed sm:hidden bg-white dark:bg-#0e1111 fixed w-[100%] h-100px z-[1] top-0 left-0 transition duration-300 shadow-2xl"
  >
    {{ isToggled }}
    <div
      class="py-8 bg-white dark:bg-#0e1111 md:flex items-center justify-between mx-auto filter-none"
    >
      <div class="absolute  md:static top-8 md:flex items-center">
        <NuxtLink to="/" class="decoration-none ml-12">
          <span class="text-black dark:text-white text-2xl font-bold">
            Brian's Blog
          </span>
        </NuxtLink>
      </div>
      <!-- Mobile menu button -->

      <div>
        <div
          class="i-solar-sun-outline dark:i-solar-moon-line-duotone inline-block absolute right-16 
                cursor-pointer text-3xl text-[#0495b1] hover:text-[#015768]
                transition-color duration-300 dark:text-[#79c2d0] dark:hover:text-[#efefef]"
          @click="toggleDark()"
        />
        <div
          id="mobile-menu-btn"
          class="block absolute right-3 top-10 md:hidden mr-10px cursor-pointer"
          @click="toggleMobileMenu(isToggled)"
        >
          <div
            class="border-1 border-black dark:border-white border-solid w-30px mb-5px"
          />
          <div
            class="border-1 border-black dark:border-white border-solid w-30px mb-5px"
          />
          <div
            class="border-1 border-black dark:border-white border-solid w-30px mb-5px"
          />
        </div>
      </div>
      <!-- Mobile Nav list -->
      <ul
        id="mobile-nav-list"
        class="bg-white dark:bg-#0e1111 md:hidden list-none bg-gray-800 w-full p-0 absolute left-0 top-20 shadow-2xl"
        :class="isToggled ? 'block' : 'hidden'"
      >
        <li v-for="link in links" :key="link" @click="isToggled = false">
          <NuxtLink
            :to="link.path"
            class="text-center py-4 block font-bold text-black dark:text-white decoration-none"
          >
            <span class="uppercase zero:display-none md:block">
              {{ link.name }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
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
          icon: 'i-solar-document-add-broken'
        },
        {
          name: 'Archive',
          path: '/archive',
          icon: 'i-solar-database-broken'
        },
        {
          name: 'Github',
          path: 'https://github.com/brianenguyen/blog.brianenguyen.com',
          icon: 'i-iconoir-github',
          external: true
        },
      ]
    }
  }
}
</script>
