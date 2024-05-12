<template>
  <div>
    <!-- Large -->
    <div class="hidden md:grid grid-cols-12 mt-5">
      <div class="col-span-2 p-1"></div>
      <div
        id="main-content"
        class="rounded col-span-8 m-0 p-12 min-h-100vh 
            bg-white 
            dark:bg-black "
      >
        <slot />
      </div>
      <div class="col-span-2 p-3">
        <Navbar />
      </div>
    </div>

    <!-- Medium -->
    <div class="sm:grid md:hidden grid-cols-12 mt-32 sm:mt-5">
      <div
        id="main-content"
        class="rounded col-span-9 ml-2 p-4 min-h-100vh 
            bg-white 
            dark:bg-black "
      >
        <slot />
      </div>
      <div class="col-span-3 p-3">
        <Navbar />
      </div>
    </div>
  </div>
</template>
