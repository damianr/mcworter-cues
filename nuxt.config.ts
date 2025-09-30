// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "@nuxtjs/tailwindcss", "@nuxt/image"],
  pages: true,
  css: ["~/assets/css/main.css"],
  image: {
    // Enable optimization for better performance
    quality: 80,
    format: ["webp", "png"],
  },
});
