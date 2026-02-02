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

          <!-- Publish status banner (admin only) -->
          <div
            v-if="isAuthenticated && selectedCue"
            class="mt-4 p-3 rounded-lg border"
            :style="{
              backgroundColor: isUnpublished ? 'rgba(202, 138, 4, 0.2)' : 'rgba(22, 163, 74, 0.2)',
              borderColor: isUnpublished ? 'rgba(202, 138, 4, 0.5)' : 'rgba(22, 163, 74, 0.5)'
            }"
          >
            <div class="flex items-center justify-between gap-4">
              <span :class="isUnpublished ? 'text-yellow-400' : 'text-green-400'" class="text-sm">
                {{ isUnpublished ? 'Unpublished - only visible to admins' : 'Published - visible to everyone' }}
              </span>
              <button
                v-if="isUnpublished"
                @click="handlePublish"
                :disabled="publishing"
                class="px-4 py-2 bg-green-600 text-ink text-sm font-medium rounded hover:bg-green-500 transition-colors disabled:opacity-50"
              >
                {{ publishing ? "Publishing..." : "Publish" }}
              </button>
              <button
                v-else
                @click="handleUnpublish"
                :disabled="publishing"
                class="px-4 py-2 bg-yellow-600 text-ink text-sm font-medium rounded hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                {{ publishing ? "Unpublishing..." : "Unpublish" }}
              </button>
            </div>
            <p v-if="publishError" class="text-red-400 text-xs mt-2">{{ publishError }}</p>
          </div>

          <!-- Combined Cue Thumbnails -->
          <div
            v-if="
              designCues.length > 1 ||
              (designCues.length === 1 && pastCues.length > 0) ||
              pastCues.length > 0
            "
            class="mt-8"
          >
            <div class="flex flex-wrap gap-3">
              <!-- Regular Cue Thumbnails -->
              <div
                v-for="cue in designCues"
                :key="cue.id"
                @click="selectRegularCue(cue.id)"
                :class="[
                  'cursor-pointer border-2 rounded overflow-hidden transition-all duration-200',
                  viewMode === 'regular' && selectedCueId === cue.id
                    ? 'border-ink opacity-100'
                    : 'border-ink-200 opacity-50 hover:opacity-75',
                ]"
              >
                <NuxtImg
                  :src="getThumbnailImage(cue, 0)"
                  :alt="`${design.title} #${cue.id}`"
                  class="w-20 h-20 object-cover"
                  loading="lazy"
                />
              </div>
              <!-- Past Cue Thumbnails -->
              <div
                v-for="(pastCue, index) in pastCues"
                :key="`past-${index}`"
                @click="selectPastCue(index)"
                :class="[
                  'cursor-pointer border-2 rounded overflow-hidden transition-all duration-200',
                  viewMode === 'past' && selectedPastCueIndex === index
                    ? 'border-ink opacity-100'
                    : 'border-ink-200 opacity-50 hover:opacity-75',
                ]"
              >
                <NuxtImg
                  :src="getPastCueThumbnail(pastCue)"
                  :alt="`${design.title} past cue`"
                  class="w-20 h-20 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Section -->
      <div
        class="flex-1 overflow-y-auto flex flex-col relative p-2"
        style="height: 100vh; max-height: 100vh"
      >
        <!-- Loading Indicator -->
        <div
          v-if="allImagesLoading && designCues.length > 0"
          class="absolute inset-0 flex items-center justify-center bg-bg z-50"
        >
          <div class="flex flex-col items-center gap-3">
            <div
              class="w-8 h-8 border-2 border-ink-200 border-t-ink rounded-full animate-spin"
            ></div>
            <div class="text-ink-200 text-sm">Loading...</div>
          </div>
        </div>

        <!-- Regular Cue Images -->
        <template v-if="viewMode === 'regular' && designCues.length > 0">
          <div
            class="flex items-center justify-center w-full overflow-clip cursor-pointer image-gradient-bg"
            style="height: 90vh; max-height: 90vh; min-height: 90vh"
            @click="openModal(getModalImage(getRawDetailImage(selectedCue, 0)))"
          >
            <NuxtImg
              :src="getDetailImage(selectedCue, 0)"
              :alt="design.title"
              class="h-full w-auto object-contain"
              loading="eager"
              @load="onImageLoad(1)"
            />
          </div>
          <div
            class="flex items-center justify-center w-full my-2 overflow-clip cursor-pointer image-gradient-bg flex-shrink-0 flex-grow-0"
            @click="openModal(getModalImage(getRawDetailImage(selectedCue, 1)))"
          >
            <NuxtImg
              :src="getDetailImage(selectedCue, 1)"
              :alt="design.title"
              class="h-auto w-full max-h-[90vh] object-contain"
              loading="eager"
              @load="onImageLoad(2)"
            />
          </div>
        </template>

        <!-- Past Cue Images -->
        <template
          v-else-if="viewMode === 'past' && pastCues.length > 0 && selectedPastCueIndex !== null"
        >
          <div
            class="flex items-center justify-center w-full overflow-clip cursor-pointer image-gradient-bg"
            style="height: 90vh; max-height: 90vh; min-height: 90vh"
            @click="openModal(getModalImage(getRawPastCueImage(pastCues[selectedPastCueIndex])))"
          >
            <NuxtImg
              :src="getPastCueImage(pastCues[selectedPastCueIndex])"
              :alt="design.title"
              class="h-full w-auto object-contain"
              loading="eager"
            />
          </div>
        </template>

        <!-- Fallback: Past Cue Images (when no regular cues) -->
        <template v-else-if="designCues.length === 0 && pastCues.length > 0">
          <div
            v-for="(pastCue, index) in pastCues"
            :key="`past-main-${index}`"
            class="flex items-center justify-center w-full overflow-clip cursor-pointer image-gradient-bg"
            :style="
              index === 0
                ? 'height: 90vh; max-height: 90vh; min-height: 90vh;'
                : 'margin-top: 0.5rem;'
            "
            @click="openModal(getModalImage(getRawPastCueImage(pastCue)))"
          >
            <NuxtImg
              :src="getPastCueImage(pastCue)"
              :alt="design.title"
              :class="
                index === 0
                  ? 'h-full w-auto object-contain'
                  : 'h-auto w-full max-h-[90vh] object-contain'
              "
              loading="eager"
            />
          </div>
        </template>

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
  const router = useRouter();
  const designId = route.params.id;

  // Parse cueId from URL path (e.g., /design/ivory-crown/1234)
  const pathParts = route.path.split("/").filter(Boolean);
  const cueIdFromUrl =
    pathParts.length === 3
      ? pathParts[2] // Keep as string to handle both numeric IDs and past cue IDs
      : null;

  const {
    getDesignById,
    getCuesByDesignId,
    getPastCuesByDesignId,
    sortCues,
    getOptimizedImageUrl,
    loading,
    designs,
    publishCue,
    unpublishCue,
  } = useCues();
  const { isAuthenticated } = useAuth();

  const design = ref(null);
  const designCues = ref([]);
  const pastCues = ref([]);
  const selectedCueId = ref(null);
  const selectedPastCueIndex = ref(null);
  const viewMode = ref("regular"); // 'regular' or 'past'
  const error = ref(false);
  const modalImage = ref(null);
  const publishing = ref(false);
  const publishError = ref("");

  // Track loading state for each image
  const loadedImages = ref(new Set());
  const totalImages = computed(() => {
    return designCues.value.length > 0 ? 2 : 0; // Only track loading for regular cues
  });

  const allImagesLoading = computed(() => {
    return designCues.value.length > 0 && loadedImages.value.size < totalImages.value;
  });

  // Helper to get raw detail image URL (handles both array and object formats)
  const getRawDetailImage = (cue, index) => {
    if (!cue?.images?.details) return "";
    const details = cue.images.details;
    // Array format (Supabase)
    if (Array.isArray(details)) {
      return details[index] || "";
    }
    // Object format (old static data with 1-indexed keys)
    return details[index + 1] || "";
  };

  // Get optimized detail image for display (1200px for retina)
  const getDetailImage = (cue, index) => {
    const url = getRawDetailImage(cue, index);
    return getOptimizedImageUrl(url, { width: 1200, quality: 85 });
  };

  // Get optimized thumbnail for small previews (200px for 80x80 display)
  const getThumbnailImage = (cue, index) => {
    const url = getRawDetailImage(cue, index);
    return getOptimizedImageUrl(url, { width: 200, quality: 80 });
  };

  // Helper to get raw past cue image URL
  const getRawPastCueImage = (pastCue) => {
    if (!pastCue) return "";
    // Supabase format: images.main contains full URL
    if (pastCue.images?.main) {
      return pastCue.images.main;
    }
    // Backwards compatible format: image property with relative path
    if (pastCue.image) {
      if (pastCue.image.startsWith("http")) {
        return pastCue.image;
      }
      return pastCue.image.startsWith("/") ? pastCue.image : `/${pastCue.image}`;
    }
    return "";
  };

  // Get optimized past cue image for display (800px for detail view)
  const getPastCueImage = (pastCue) => {
    const url = getRawPastCueImage(pastCue);
    return getOptimizedImageUrl(url, { width: 800, quality: 85 });
  };

  // Get optimized past cue thumbnail (200px for sidebar)
  const getPastCueThumbnail = (pastCue) => {
    const url = getRawPastCueImage(pastCue);
    return getOptimizedImageUrl(url, { width: 200, quality: 80 });
  };

  // Get full-size image for modal (larger for high-res viewing)
  const getModalImage = (url) => {
    return getOptimizedImageUrl(url, { width: 2000, quality: 90 });
  };

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

  // Check if current cue is unpublished
  const isUnpublished = computed(() => {
    return selectedCue.value && selectedCue.value.published === false;
  });

  // Publish the current cue
  const handlePublish = async () => {
    if (!selectedCue.value) return;
    publishing.value = true;
    publishError.value = "";
    try {
      await publishCue(selectedCue.value.id);
      // Update local state
      const cue = designCues.value.find((c) => c.id === selectedCue.value.id);
      if (cue) cue.published = true;
    } catch (e) {
      console.error("Publish error:", e);
      publishError.value = e.message;
    } finally {
      publishing.value = false;
    }
  };

  // Unpublish the current cue
  const handleUnpublish = async () => {
    if (!selectedCue.value) return;
    publishing.value = true;
    publishError.value = "";
    try {
      await unpublishCue(selectedCue.value.id);
      // Update local state
      const cue = designCues.value.find((c) => c.id === selectedCue.value.id);
      if (cue) cue.published = false;
    } catch (e) {
      console.error("Unpublish error:", e);
      publishError.value = e.message;
    } finally {
      publishing.value = false;
    }
  };

  // Handle individual image load
  const onImageLoad = (imageIndex) => {
    loadedImages.value.add(imageIndex);
  };

  // Select regular cue
  const selectRegularCue = (cueId) => {
    selectedCueId.value = cueId;
    viewMode.value = "regular";
    selectedPastCueIndex.value = null;
    loadedImages.value.clear();
    // Update URL with cue ID
    navigateTo(`/design/${designId}/${cueId}`, { replace: true });
  };

  // Select past cue
  const selectPastCue = (index) => {
    selectedPastCueIndex.value = index;
    viewMode.value = "past";
    selectedCueId.value = null;
    // Update URL with past cue ID
    navigateTo(`/design/${designId}/${pastCues.value[index].id}`, { replace: true });
  };

  // Watch for cue changes and reset loading state
  watch(selectedCueId, () => {
    if (selectedCueId.value !== null) {
      loadedImages.value.clear();
    }
  });

  // Initialize design data
  const initializeDesign = () => {
    const foundDesign = getDesignById(designId);
    if (foundDesign) {
      design.value = foundDesign;
      const unsortedCues = getCuesByDesignId(designId);
      designCues.value = sortCues(unsortedCues);
      pastCues.value = getPastCuesByDesignId(designId);

      if (designCues.value.length > 0) {
        if (cueIdFromUrl) {
          const numericId = parseInt(cueIdFromUrl);
          const cueExists =
            !isNaN(numericId) && designCues.value.find((cue) => cue.id === numericId);
          if (cueExists) {
            selectedCueId.value = numericId;
            viewMode.value = "regular";
          } else {
            const pastCueIndex = pastCues.value.findIndex(
              (pastCue) => String(pastCue.id) === cueIdFromUrl
            );
            if (pastCueIndex !== -1) {
              selectedPastCueIndex.value = pastCueIndex;
              viewMode.value = "past";
              selectedCueId.value = null;
            } else {
              selectedCueId.value = designCues.value[0].id;
              viewMode.value = "regular";
              navigateTo(`/design/${designId}/${designCues.value[0].id}`, { replace: true });
            }
          }
        } else {
          selectedCueId.value = designCues.value[0].id;
          viewMode.value = "regular";
        }
      } else if (pastCues.value.length > 0) {
        if (cueIdFromUrl) {
          const pastCueIndex = pastCues.value.findIndex(
            (pastCue) => String(pastCue.id) === cueIdFromUrl
          );
          if (pastCueIndex !== -1) {
            selectedPastCueIndex.value = pastCueIndex;
          } else {
            selectedPastCueIndex.value = 0;
          }
        } else {
          selectedPastCueIndex.value = 0;
        }
        viewMode.value = "past";
      } else {
        error.value = true;
      }
    } else {
      error.value = true;
    }
  };

  // Watch for data to load, then initialize
  watch(
    [loading, designs],
    ([newLoading, newDesigns]) => {
      if (!newLoading && newDesigns.length > 0 && !design.value) {
        initializeDesign();
      }
    },
    { immediate: true }
  );

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
