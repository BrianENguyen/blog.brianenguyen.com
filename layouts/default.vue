<template>
  <div class="grid grid-cols-12">
    <div class="col-span-2 p-6">
      <span class="text-4xl">Brian Nguyen</span>
    </div>
    <div
      class="col-span-8 m-0 mx-auto max-w-900px p-4 min-h-100vh bg-white dark:bg-#1d1d1d border-l-solid border-r-solid border-gray border-1"
    >
      <slot />
    </div>
    <div class="col-span-2"></div>
  </div>
</template>
