<template>
  <div class="grid grid-cols-12">
    <div class="col-span-2 p-1"></div>
    <div
      id="main-content"
      class="col-span-8 m-0 p-12 min-h-100vh bg-white dark:bg-#1d1d1d border-l-solid border-r-solid border-#525252 border-1"
    >
      <slot />
    </div>
    <div class="col-span-2 p-3">
      <span class="text-4xl">Brian Nguyen</span>
      <Navbar />
    </div>
  </div>
</template>
