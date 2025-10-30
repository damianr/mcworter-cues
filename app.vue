<template>
  <Analytics />
  <div class="min-h-screen bg-bg">
    <AppHeader v-if="!isDetailPage" />
    <NuxtPage />
  </div>
</template>

<script setup>
  import { Analytics } from "@vercel/analytics/nuxt";
  const route = useRoute();

  const isDetailPage = computed(() => {
    return route.path.startsWith("/design/") || route.path.startsWith("/cue/");
  });
</script>
