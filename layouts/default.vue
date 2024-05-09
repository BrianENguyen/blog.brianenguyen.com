<template>
  <div class="grid grid-cols-9">
    <div
      class="col-span-7 m-0 mx-auto p-12 min-h-100vh bg-white dark:bg-#1d1d1d border-l-solid border-r-solid border-gray border-1"
    >
      <slot />
    </div>
    <div class="col-span-2 p-2 w-full">
      <span class="text-4xl">Brian Nguyen</span>
      <Navbar />
    </div>
  </div>
</template>
