<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Footer />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap');

html {
  color: #202020;
  background-color:  #f8feff ;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  background-color: #0d1011;
  color: #cdd9e5;
}


html.dark a {
  color: #79c2d0;
  transition: 0.3s color;
}
html.dark a:hover {
  color: #efefef;
}

html, body {
  padding: 0;
  margin: 0;
}

#main-content {
  font-size: 18px;
}

h1,
h2,
h3,
h4 {
  font-family: 'Playfair Display', serif;
  font-weight: 200;
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
