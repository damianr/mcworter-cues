<template>
  <div class="min-h-screen bg-bg">
    <!-- Fixed noise overlay -->
    <div class="fixed inset-0 pointer-events-none z-0 noise-overlay"></div>

    <AppHeader />
    <main class="max-w-[1400px] mx-auto relative z-10">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
  .noise-overlay::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.08;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    pointer-events: none;
  }
</style>
