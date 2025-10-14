<template>
  <div class="text-ink min-h-screen relative flex flex-col md:flex-row px-4 md:px-12">
    <div v-if="cue" class="flex flex-col md:flex-row flex-1">
      <!-- cue section -->
      <div class="flex flex-col flex-1 max-w-[340px] pt-16">
        <button @click="$router.back()" class="flex items-center text-ink-100 group flex-none mb-8">
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
        <!-- Title & Serial (Mobile only - at top) -->
        <div class="flex-1 max-h-[700px] flex flex-col justify-center">
          <h1>{{ cue.title }}</h1>
          <p class="text-ink-100 font-body mt-4 text-sm md:text-base">
            {{ cue.description }}
          </p>
        </div>
      </div>

      <!-- Image Section -->
      <div
        class="overflow-hidden rounded-md h-[60vh] md:h-screen flex justify-center items-center flex-1 md:ml-8 relative"
      >
        <!-- Loading Indicator -->
        <div v-if="imageLoading" class="absolute inset-0 flex items-center justify-center">
          <div class="flex flex-col items-center gap-3">
            <div
              class="w-8 h-8 border-2 border-ink-200 border-t-ink rounded-full animate-spin"
            ></div>
            <div class="text-ink-200 text-sm">Loading...</div>
          </div>
        </div>

        <NuxtImg
          :src="cue.images[currentImageIndex]"
          :alt="cue.title"
          :class="[
            'h-full object-contain transition-all duration-300',
            'drop-shadow-[0_0_16px_rgba(255,255,255,0.05)]',
            currentImageIndex === 1 ? 'cursor-zoom-in' : 'cursor-zoom-out',
            { 'opacity-0': imageLoading },
          ]"
          loading="lazy"
          @click="toggleImage"
          @load="imageLoading = false"
        />
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
  const imageLoading = ref(true);

  // Toggle between image 2 (index 1) and image 3 (index 2)
  const toggleImage = () => {
    imageLoading.value = true; // Show loader when switching images
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
