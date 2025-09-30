<template>
  <div
    class="text-ink min-h-screen bg-bg max-w-screen-xl mx-auto border-x border-[#161616] shadow-xl shadow-[#080808]/60 relative flex px-12"
  >
    <!-- Back Navigation -->
    <div class="pt-8">
      <button
        @click="$router.back()"
        class="flex items-center text-ink-100 hover:text-ink transition-colors"
      >
        <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2" />
        Back to Cues
      </button>
    </div>

    <!-- Cue Details -->
    <div v-if="cue" class="flex gap-8 flex-1">
      <!-- Image Section -->
      <div class="overflow-hidden rounded-md h-screen flex justify-center items-center flex-1 ml-8">
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
      <div class="mt-[200px] flex-none max-w-[400px]">
        <div class="text-sm text-ink-200 font-mono mb-2">Serial number {{ cue.id }}</div>
        <h1>
          {{ cue.title }}
        </h1>
        <p class="text-ink-100 font-body">
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
