<template>
  <NuxtLayout>
    <Navbar />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  color: #202020;
  background-color:  #f8feff ;
}

html a {
  color: #0495b1;
  transition: 0.3s color;
}
html a:hover {
  color: #015768;
}
html.dark {
  color-scheme: dark;
  background-color: #212a2c;
  color: #cdd9e5;
}


html.dark a {
  color: #79c2d0;
  transition: 0.3s color;
}
html.dark a:hover {
  color: #efefef;
}

body, html {
  margin: 0px;
  padding: 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
