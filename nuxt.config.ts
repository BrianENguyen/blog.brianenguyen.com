// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8000,
    host: '0.0.0.0',
  },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
  },
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
