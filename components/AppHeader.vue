<template>
  <header
    v-if="!isCueDetailPage"
    class="fixed top-0 w-full max-w-[1400px] z-50 transition-all duration-100"
    :class="{ 'border-b border-[#191919] bg-bg/80 backdrop-blur-md': isScrolled }"
  >
    <div
      class="max-w-screen-xl mx-auto px-4 md:px-12 transition-all duration-100"
      :class="{ 'py-3': isScrolled, 'py-6 md:py-8': !isScrolled }"
    >
      <div class="flex items-center justify-between">
        <!-- Logo Section -->
        <NuxtLink to="/" class="flex items-end">
          <NuxtImg
            src="/images/feather.png"
            loading="lazy"
            class="transition-all duration-100"
            :class="{ 'opacity-0 w-0 h-0 mr-0': isScrolled, 'opacity-100 w-4 mr-4': !isScrolled }"
          />
          <div>
            <h1
              class="font-bold text-ink transition-all duration-100"
              :class="{ 'text-2xl': isScrolled, 'text-4xl': !isScrolled }"
            >
              m<span
                :class="{ 'text-xl': isScrolled, 'text-3xl': !isScrolled }"
                class="transition-all duration-100"
                >c</span
              >worter cues
            </h1>
            <div
              class="text-ink-100 text-xl leading-none font-extralight transition-all duration-100 overflow-hidden"
              :class="{ 'opacity-0 h-0': isScrolled, 'opacity-100 h-auto': !isScrolled }"
            >
              Timeless performance
            </div>
          </div>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            to="/"
            class="text-ink-100 hover:text-ink transition-colors"
            :class="{ 'text-ink': $route.path === '/' }"
          >
            The Cues
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-ink-100 hover:text-ink transition-colors"
            :class="{ 'text-ink': $route.path === '/about' }"
          >
            The Cue Maker
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
