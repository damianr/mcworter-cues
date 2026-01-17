<template>
  <header
    v-if="!isCueDetailPage"
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="{ 'header-scrolled': isScrolled }"
  >
    <div class="max-w-[1400px] mx-auto px-4 md:px-12 py-4 md:py-6">
      <div class="flex items-center justify-between">
        <!-- Left - Brand Name -->
        <NuxtLink to="/" class="text-ink font-heading text-sm md:text-base font-bold">
          mcworter cues
        </NuxtLink>

        <!-- Right - Navigation -->
        <nav class="flex items-center gap-4 md:gap-8 text-xs md:text-sm">
          <NuxtLink
            to="/"
            class="text-ink-100 hover:text-ink transition-colors"
            :class="{ 'text-ink': $route.path === '/' }"
          >
            The cues
          </NuxtLink>
          <!-- <NuxtLink
            to="/evolution"
            class="text-ink-100 hover:text-ink transition-colors"
            :class="{ 'text-ink': $route.path === '/evolution' }"
          >
            The evolution
          </NuxtLink> -->
          <NuxtLink
            to="/about"
            class="text-ink-100 hover:text-ink transition-colors"
            :class="{ 'text-ink': $route.path === '/about' }"
          >
            The cue maker
          </NuxtLink>
          <NuxtLink
            to="/music"
            class="text-ink-100 hover:text-ink transition-colors"
            :class="{ 'text-ink': $route.path === '/music' }"
          >
            Music
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
  const route = useRoute();
  const isScrolled = ref(false);

  // Check if current page is a cue detail page
  const isCueDetailPage = computed(() => {
    return route.path.startsWith("/cue/");
  });

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>

<style scoped>
  .header-scrolled {
    background: linear-gradient(to bottom, rgba(16, 16, 16, 0.8) 0%, transparent 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  }

  /* .header-scrolled::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: #222222;
    mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  } */
</style>
