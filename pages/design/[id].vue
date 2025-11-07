<template>
  <div
    class="text-ink min-h-screen relative flex flex-col max-w-[1500px] mx-auto md:flex-row px-4 md:px-12"
  >
    <div v-if="design" class="flex flex-col md:flex-row flex-1">
      <!-- description section -->
      <div class="flex flex-col flex-1 max-w-[340px] pt-16 mr-12">
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
        <!-- Title & Description -->
        <div class="flex-1 max-h-[700px] flex flex-col justify-center">
          <h1>{{ design.title }}</h1>
          <!-- <p class="text-ink-100 font-body mt-4 text-sm md:text-base">
            {{ design.description }}
          </p> -->

          <!-- Cue Thumbnails (if multiple cues) -->
          <div v-if="designCues.length > 1" class="mt-8">
            <div class="text-ink-100 text-xs font-mono mb-4">Versions:</div>
            <div class="flex flex-wrap gap-3">
              <div
                v-for="cue in designCues"
                :key="cue.id"
                @click="selectedCueId = cue.id"
                :class="[
                  'cursor-pointer border-2 rounded overflow-hidden transition-all duration-200',
                  selectedCueId === cue.id
                    ? 'border-ink opacity-100'
                    : 'border-ink-200 opacity-50 hover:opacity-75',
                ]"
              >
                <NuxtImg
                  :src="cue.images.details[1]"
                  :alt="`${design.title} #${cue.id}`"
                  class="w-20 h-20 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Section -->
      <div class="flex-1 overflow-y-scroll h-screen flex flex-col relative p-2">
        <!-- Loading Indicator -->
        <div
          v-if="allImagesLoading"
          class="absolute inset-0 flex items-center justify-center bg-bg z-50"
        >
          <div class="flex flex-col items-center gap-3">
            <div
              class="w-8 h-8 border-2 border-ink-200 border-t-ink rounded-full animate-spin"
            ></div>
            <div class="text-ink-200 text-sm">Loading...</div>
          </div>
        </div>

        <div
          class="flex items-center justify-center max-h-[90vh] w-full overflow-clip cursor-pointer image-gradient-bg"
          @click="openModal(selectedCue.images.details[1])"
        >
          <NuxtImg
            :src="selectedCue.images.details[1]"
            :alt="design.title"
            class="h-full object-contain"
            loading="eager"
            @load="onImageLoad(1)"
          />
        </div>
        <div
          class="flex items-center justify-center w-full my-2 overflow-clip cursor-pointer image-gradient-bg"
          @click="openModal(selectedCue.images.details[2])"
        >
          <NuxtImg
            :src="selectedCue.images.details[2]"
            :alt="design.title"
            class="h-full object-contain"
            loading="eager"
            @load="onImageLoad(2)"
          />
        </div>
        <div class="flex gap-2 mb-64">
          <div class="flex-1 bg-bg-100 h-24"></div>
          <div class="flex-1 bg-bg-100 h-24"></div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="!error" class="flex justify-center items-center h-64">
      <div class="text-ink-100">Loading design details...</div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-ink-200 border border-ink-100 rounded-lg p-6 mt-8">
      <h2 class="text-ink font-semibold mb-2">Design Not Found</h2>
      <p class="text-ink-100 mb-4">The requested design could not be found.</p>
      <NuxtLink to="/" class="text-ink hover:text-ink-100"> Return to Home </NuxtLink>
    </div>
  </div>

  <!-- Image Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modalImage"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 image-gradient-bg"
        @click="closeModal"
      >
        <button
          class="absolute top-4 left-4 text-ink-100 text-4xl hover:text-ink-200 transition-colors z-10"
          @click="closeModal"
          aria-label="Close modal"
        >
          ×
        </button>
        <NuxtImg
          :src="modalImage"
          :alt="design?.title"
          class="w-screen h-screen object-contain"
          @click.stop
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  const route = useRoute();
  const designId = route.params.id;

  const { getDesignById, getCuesByDesignId } = useCues();

  const design = ref(null);
  const designCues = ref([]);
  const selectedCueId = ref(null);
  const error = ref(false);
  const modalImage = ref(null);

  // Track loading state for each image
  const loadedImages = ref(new Set());
  const totalImages = 2; // We have 2 images on this page

  const allImagesLoading = computed(() => {
    return loadedImages.value.size < totalImages;
  });

  // Modal functions
  const openModal = (imageSrc) => {
    modalImage.value = imageSrc;
  };

  const closeModal = () => {
    modalImage.value = null;
  };

  // Get the currently selected cue
  const selectedCue = computed(() => {
    return designCues.value.find((cue) => cue.id === selectedCueId.value) || designCues.value[0];
  });

  // Handle individual image load
  const onImageLoad = (imageIndex) => {
    loadedImages.value.add(imageIndex);
  };

  // Watch for cue changes and reset loading state
  watch(selectedCueId, () => {
    loadedImages.value.clear();
  });

  // Find the design and its cues
  onMounted(() => {
    const foundDesign = getDesignById(designId);
    if (foundDesign) {
      design.value = foundDesign;
      designCues.value = getCuesByDesignId(designId);

      if (designCues.value.length > 0) {
        // Select the first (or latest) cue by default
        selectedCueId.value = designCues.value[0].id;
      } else {
        error.value = true;
      }
    } else {
      error.value = true;
    }
  });

  // Set page title
  useHead({
    title: computed(() => (design.value ? `${design.value.title} - Designs` : "Design Details")),
  });
</script>

<style scoped>
  .image-gradient-bg {
    background: linear-gradient(225deg, #2d2d2d 2%, #171717 100%);
  }
</style>
