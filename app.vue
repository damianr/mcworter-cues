<template>
  <div class="min-h-screen bg-bg">
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
  const route = useRoute();

  // Check if current page is a cue detail page
  const isCueDetailPage = computed(() => {
    return route.path.startsWith("/cue/");
  });
</script>
