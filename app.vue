<template>
  <div class="min-h-screen bg-bg">
    <AppHeader v-if="!isDetailPage" />
    <NuxtPage />
  </div>
</template>

<script setup>
  const route = useRoute();

  const isDetailPage = computed(() => {
    return route.path.startsWith("/design/") || route.path.startsWith("/cue/");
  });
</script>
