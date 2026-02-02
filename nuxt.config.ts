// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: { port: 3005 },
  modules: ["@nuxt/icon", "@nuxtjs/tailwindcss", "@nuxt/image"],
  pages: true,
  css: ["~/assets/css/main.css"],
  image: {
    // Enable optimization for better performance
    quality: 80,
    format: ["webp", "png"],
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || "https://gphhckptzkwryjjjcltk.supabase.co",
      supabaseKey: process.env.SUPABASE_KEY || "sb_publishable_bOkKNOwOtsaywEr2Pk--RA_O_zUJCxt",
    },
  },
});
