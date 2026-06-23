<template>
  <header
    v-if="!isCueDetailPage"
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="{ 'header-scrolled': isScrolled && !mobileMenuOpen, 'header-solid': mobileMenuOpen }"
  >
    <div class="max-w-[1400px] mx-auto px-4 md:px-12 py-4 md:py-6">
      <div class="flex items-center justify-between">
        <!-- Left - Brand Name -->
        <NuxtLink
          to="/"
          class="text-ink font-heading text-sm md:text-base font-bold"
          @click="mobileMenuOpen = false"
        >
          mcworter cues
        </NuxtLink>

        <!-- Mobile - Hamburger Toggle -->
        <button
          type="button"
          class="md:hidden text-ink-100 hover:text-ink transition-colors flex items-center -mr-1 p-1"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Icon :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6" />
        </button>

        <!-- Right - Desktop Navigation -->
        <nav class="hidden md:flex items-center text-xs md:text-sm">
          <div class="flex items-center gap-4 md:gap-8">
            <NuxtLink
              to="/"
              class="text-ink-100 hover:text-ink transition-colors"
              :class="{ 'text-ink': $route.path === '/' }"
            >
              The Cues
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
              The Maker
            </NuxtLink>
            <NuxtLink
              to="/music"
              class="text-ink-100 hover:text-ink transition-colors"
              :class="{ 'text-ink': $route.path === '/music' }"
            >
              Music
            </NuxtLink>
            <NuxtLink
              to="/instructional"
              class="text-ink-100 hover:text-ink transition-colors"
              :class="{ 'text-ink': $route.path === '/instructional' }"
            >
              Instructional
            </NuxtLink>
            <a
              href="mailto:mcwortercues@gmail.com"
              class="text-ink-100 hover:text-ink transition-colors"
            >
              Contact
            </a>
          </div>
          <div class="flex items-center gap-2 ml-3">
            <a
              href="https://www.youtube.com/channel/UCUjNBcrm0vcAoKOmR2vCINA"
              target="_blank"
              rel="noopener noreferrer"
              class="text-ink-100 hover:text-ink transition-colors flex items-center"
              aria-label="YouTube"
              title="YouTube"
            >
              <Icon name="mdi:youtube" class="w-5 h-5 relative top-0.25" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100057621543069"
              target="_blank"
              rel="noopener noreferrer"
              class="text-ink-100 hover:text-ink transition-colors flex items-center"
              aria-label="Facebook"
              title="Facebook"
            >
              <Icon name="mdi:facebook" class="w-5 h-5 relative top-0.25" />
            </a>
          </div>
        </nav>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
      <nav
        v-show="mobileMenuOpen"
        id="mobile-menu"
        class="md:hidden border-t border-bg-200"
      >
        <div class="max-w-[1400px] mx-auto px-4 pb-4 flex flex-col text-sm">
          <NuxtLink
            to="/"
            class="py-3 border-b border-bg-200/60 text-ink-100 hover:text-ink transition-colors"
            :class="{ 'text-ink': $route.path === '/' }"
            @click="mobileMenuOpen = false"
          >
            The Cues
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="py-3 border-b border-bg-200/60 text-ink-100 hover:text-ink transition-colors"
            :class="{ 'text-ink': $route.path === '/about' }"
            @click="mobileMenuOpen = false"
          >
            The Maker
          </NuxtLink>
          <NuxtLink
            to="/music"
            class="py-3 border-b border-bg-200/60 text-ink-100 hover:text-ink transition-colors"
            :class="{ 'text-ink': $route.path === '/music' }"
            @click="mobileMenuOpen = false"
          >
            Music
          </NuxtLink>
          <NuxtLink
            to="/instructional"
            class="py-3 border-b border-bg-200/60 text-ink-100 hover:text-ink transition-colors"
            :class="{ 'text-ink': $route.path === '/instructional' }"
            @click="mobileMenuOpen = false"
          >
            Instructional
          </NuxtLink>
          <a
            href="mailto:mcwortercues@gmail.com"
            class="py-3 text-ink-100 hover:text-ink transition-colors"
            @click="mobileMenuOpen = false"
          >
            Contact
          </a>
          <div class="flex items-center gap-4 pt-4">
            <a
              href="https://www.youtube.com/channel/UCUjNBcrm0vcAoKOmR2vCINA"
              target="_blank"
              rel="noopener noreferrer"
              class="text-ink-100 hover:text-ink transition-colors flex items-center"
              aria-label="YouTube"
              title="YouTube"
            >
              <Icon name="mdi:youtube" class="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100057621543069"
              target="_blank"
              rel="noopener noreferrer"
              class="text-ink-100 hover:text-ink transition-colors flex items-center"
              aria-label="Facebook"
              title="Facebook"
            >
              <Icon name="mdi:facebook" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </nav>
  </header>
</template>

<script setup>
  const route = useRoute();
  const isScrolled = ref(false);
  const mobileMenuOpen = ref(false);

  // Check if current page is a cue detail page
  const isCueDetailPage = computed(() => {
    return route.path.startsWith("/cue/");
  });

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
  };

  const handleResize = () => {
    // Close the mobile menu when resizing up to the desktop breakpoint
    if (window.innerWidth >= 768) {
      mobileMenuOpen.value = false;
    }
  };

  // Close the mobile menu on navigation (also covers browser back/forward)
  watch(
    () => route.path,
    () => {
      mobileMenuOpen.value = false;
    }
  );

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
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

  /* Solid backdrop while the mobile menu is open so links stay legible */
  .header-solid {
    background: rgba(16, 16, 16, 0.97);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
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
