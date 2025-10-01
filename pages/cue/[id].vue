<template>
  <div class="text-ink min-h-screen bg-bg relative flex flex-col md:flex-row px-4 md:px-12">
    <!-- Back Navigation -->
    <div class="pt-6 md:pt-8">
      <button @click="$router.back()" class="flex items-center text-ink-100 group">
        <NuxtImg
          src="/images/back-feather.png"
          alt="Back"
          class="w-10 md:w-14 mr-2 group-hover:opacity-100 opacity-50 transition-opacity duration-300"
        />
        <div
          class="text-xs text-ink-100 font-mono group-hover:opacity-100 opacity-0 transition-opacity duration-300"
        >
          back
        </div>
      </button>
    </div>

    <!-- Cue Details -->
    <div v-if="cue" class="flex flex-col md:flex-row gap-6 md:gap-8 flex-1">
      <!-- Title & Serial (Mobile only - at top) -->
      <div class="md:hidden pt-4">
        <div class="text-xs text-ink-200 font-mono mb-1">Serial number {{ cue.id }}</div>
        <h1 class="text-2xl">
          {{ cue.title }}
        </h1>
      </div>

      <!-- Image Section -->
      <div
        class="overflow-hidden rounded-md h-[60vh] md:h-screen flex justify-center items-center flex-1 md:ml-8"
      >
        <NuxtImg
          :src="cue.images[currentImageIndex]"
          :alt="cue.title"
          :class="[
            'h-full object-contain transition-all duration-300',
            'drop-shadow-[0_0_16px_rgba(255,255,255,0.05)]',
            currentImageIndex === 1 ? 'cursor-zoom-in' : 'cursor-zoom-out',
          ]"
          loading="lazy"
          @click="toggleImage"
        />
      </div>

      <!-- Content -->
      <div class="md:mt-[200px] flex-none md:max-w-[400px] pb-8 md:pb-0">
        <!-- Title & Serial (Desktop only - on right) -->
        <div class="hidden md:block">
          <div class="text-sm text-ink-200 font-mono mb-2">Serial number {{ cue.id }}</div>
          <h1>
            {{ cue.title }}
          </h1>
        </div>

        <!-- Description (both mobile and desktop) -->
        <p class="text-ink-100 font-body text-sm md:text-base">
          {{ cue.description }}
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="!error" class="flex justify-center items-center h-64">
      <div class="text-ink-100">Loading cue details...</div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-ink-200 border border-ink-100 rounded-lg p-6 mt-8">
      <h2 class="text-ink font-semibold mb-2">Cue Not Found</h2>
      <p class="text-ink-100 mb-4">The requested cue could not be found.</p>
      <NuxtLink to="/" class="text-ink hover:text-ink-100"> Return to Cues List </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute();
  const cueId = parseInt(route.params.id);

  const { getCueById } = useCues();

  const cue = ref(null);
  const error = ref(false);
  const currentImageIndex = ref(2); // Start with image 3

  // Toggle between image 2 (index 1) and image 3 (index 2)
  const toggleImage = () => {
    currentImageIndex.value = currentImageIndex.value === 2 ? 3 : 2;
  };

  // Find the cue by ID
  onMounted(() => {
    const foundCue = getCueById(cueId);
    if (foundCue) {
      cue.value = foundCue;
    } else {
      error.value = true;
    }
  });

  // Set page title
  useHead({
    title: computed(() => (cue.value ? `${cue.value.title} - Cues` : "Cue Details")),
  });
</script>
