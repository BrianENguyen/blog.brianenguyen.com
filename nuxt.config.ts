// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@nuxt/content'],
  components: {
    global: true,
    dirs: ['~/components'],
  },
  content: {
    highlight: {
      theme: {
        default: 'material-theme-lighter',
        dark: 'one-dark-pro',
      },
    },
  },
  css: ['assets/styles/nuxt-content.css'],
});
