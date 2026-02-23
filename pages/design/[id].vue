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

        <!-- Admin Controls -->
        <div
          v-if="isAuthenticated && selectedCue && viewMode === 'regular'"
          class="mt-8 pb-12 border-t border-ink-200 pt-6 space-y-2"
        >
          <p class="text-xs text-ink-200 font-mono uppercase tracking-wider mb-3">Admin</p>

          <!-- Publish / Unpublish -->
          <button
            v-if="isUnpublished"
            @click="handlePublish"
            :disabled="publishing"
            class="w-full py-2 px-3 text-sm text-left rounded border border-green-800 hover:border-green-500 text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
          >
            {{ publishing ? 'Publishing...' : '↑ Publish' }}
          </button>
          <button
            v-else
            @click="handleUnpublish"
            :disabled="publishing"
            class="w-full py-2 px-3 text-sm text-left rounded border border-ink-200 hover:border-ink text-ink-100 hover:text-ink transition-colors disabled:opacity-50"
          >
            {{ publishing ? 'Unpublishing...' : '↓ Unpublish' }}
          </button>
          <p v-if="publishError" class="text-red-400 text-xs">{{ publishError }}</p>

          <!-- Checkboxes -->
          <label class="flex items-center gap-3 py-2 px-3 rounded border border-ink-200 cursor-pointer hover:border-ink transition-colors group">
            <input
              type="checkbox"
              :checked="selectedCue?.highlight"
              @change="toggleHighlight"
              class="w-4 h-4 accent-ink cursor-pointer"
            />
            <span class="text-sm text-ink-100 group-hover:text-ink transition-colors">Highlight cue</span>
          </label>
          <label class="flex items-center gap-3 py-2 px-3 rounded border border-ink-200 cursor-pointer hover:border-ink transition-colors group">
            <input
              type="checkbox"
              :checked="design?.is_iccs"
              @change="toggleIccs"
              class="w-4 h-4 accent-ink cursor-pointer"
            />
            <span class="text-sm text-ink-100 group-hover:text-ink transition-colors">ICCS design</span>
          </label>

          <button
            @click="showUploadModal = true"
            class="w-full py-2 px-3 text-sm text-left rounded border border-ink-200 hover:border-ink text-ink-100 hover:text-ink transition-colors"
          >
            + Upload Beauty Images
          </button>
          <button
            @click="openReprocessModal"
            class="w-full py-2 px-3 text-sm text-left rounded border border-ink-200 hover:border-ink text-ink-100 hover:text-ink transition-colors"
          >
            ↻ Change Main Image
          </button>
          <button
            @click="showDeleteModal = true"
            class="w-full py-2 px-3 text-sm text-left rounded border border-red-800 hover:border-red-500 text-red-400 hover:text-red-300 transition-colors"
          >
            × Delete Cue
          </button>
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

          <!-- Beauty images (details[2+]) -->
          <div
            v-for="(imgUrl, i) in getBeautyImages(selectedCue)"
            :key="`beauty-${i}`"
            class="flex items-center justify-center w-full my-2 overflow-clip cursor-pointer image-gradient-bg flex-shrink-0 flex-grow-0"
            @click="openModal(getModalImage(imgUrl))"
          >
            <NuxtImg
              :src="getOptimizedImageUrl(imgUrl, { width: 1500, quality: 85 })"
              :alt="`${design.title} detail`"
              class="h-auto w-full max-h-[90vh] object-contain"
              loading="lazy"
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

  <!-- Upload Beauty Images Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showUploadModal"
        class="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 overflow-y-auto"
        @click.self="closeUploadModal"
      >
        <div class="bg-bg border border-ink-200 rounded-xl w-full max-w-2xl mt-8 mb-8 p-6">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-lg font-semibold">Upload Beauty Images</h2>
              <p class="text-xs text-ink-200 mt-1">Additional detail shots — will appear after the processed images</p>
            </div>
            <button @click="closeUploadModal" class="text-ink-100 hover:text-ink text-3xl leading-none ml-4">×</button>
          </div>

          <div
            class="border-2 border-dashed border-ink-200 rounded-lg p-6 text-center cursor-pointer hover:border-ink transition-colors"
            @click="triggerBeautyFileInput"
            @dragover.prevent
            @drop.prevent="handleBeautyDrop"
          >
            <input
              ref="beautyFileInput"
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="handleBeautyFileSelect"
            />
            <p class="text-ink-100 text-sm">Click or drag images here (multiple allowed)</p>
          </div>

          <div v-if="pendingBeautyImages.length > 0" class="mt-4 grid grid-cols-2 gap-3">
            <div
              v-for="(img, i) in pendingBeautyImages"
              :key="i"
              class="relative bg-bg-100 rounded-lg p-2 group"
            >
              <img :src="img.preview" alt="Preview" class="w-full h-auto rounded object-cover" />
              <p class="text-xs text-ink-200 mt-1">{{ img.width }}×{{ img.height }}px</p>
              <p v-if="img.sizeWarning" class="text-xs text-amber-400">⚠ {{ img.sizeWarning }}</p>
              <p class="text-xs text-ink-200 font-mono">details/{{ nextBeautyIndex + i }}</p>
              <button
                @click.stop="removePendingBeautyImage(i)"
                class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sm"
              >×</button>
            </div>
          </div>

          <p v-if="beautyError" class="text-red-400 text-sm mt-4">{{ beautyError }}</p>
          <p v-if="beautySuccess" class="text-green-400 text-sm mt-4">{{ beautySuccess }}</p>

          <div class="flex gap-3 mt-6">
            <button
              @click="closeUploadModal"
              class="flex-1 py-2 border border-ink-200 rounded text-sm text-ink-100 hover:text-ink hover:border-ink transition-colors"
            >
              Cancel
            </button>
            <button
              @click="uploadBeautyImages"
              :disabled="beautyUploading || pendingBeautyImages.length === 0"
              class="flex-1 py-2 bg-ink text-bg rounded text-sm font-medium hover:bg-ink-100 transition-colors disabled:opacity-50"
            >
              {{ beautyUploading ? 'Uploading...' : `Upload ${pendingBeautyImages.length} Image(s)` }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Change Main Image (Reprocess) Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showReprocessModal" class="fixed inset-0 z-50 bg-bg overflow-y-auto">
        <div class="max-w-4xl mx-auto p-8">
          <div class="flex justify-between items-center mb-8">
            <div>
              <h2 class="text-xl font-semibold">Change Main Image</h2>
              <p class="text-xs text-ink-200 mt-1">Cue #{{ selectedCue?.id }} — replaces the 4 processed images, keeps beauty images</p>
            </div>
            <button @click="closeReprocessModal" class="text-ink-100 hover:text-ink text-3xl leading-none ml-4">×</button>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm text-ink-100 mb-2">New Full Cue Image</label>
              <div
                class="border-2 border-dashed border-ink-200 rounded-lg p-8 text-center cursor-pointer hover:border-ink transition-colors"
                @click="triggerRpFileInput"
                @dragover.prevent
                @drop.prevent="handleRpDrop"
              >
                <input ref="rpFileInput" type="file" accept="image/*" class="hidden" @change="handleRpFileSelect" />
                <p v-if="!rpSourceImage" class="text-ink-100">Click or drag to upload full cue image</p>
                <p v-else class="text-ink">{{ rpSourceImage.name }} ({{ formatFileSize(rpSourceImage.size) }})</p>
              </div>
            </div>

            <div v-if="rpImageUrl" class="space-y-4">
              <div class="flex justify-between items-center">
                <label class="block text-sm text-ink-100">Click to mark wrap boundaries ({{ rpLandmarks.length }}/2)</label>
                <button v-if="rpLandmarks.length > 0" @click="rpLandmarks = []" class="text-xs text-ink-100 hover:text-ink underline">Clear</button>
              </div>
              <div
                ref="rpImageContainer"
                class="relative cursor-crosshair border border-ink-200 rounded-lg overflow-hidden"
                @click="handleRpImageClick"
              >
                <img ref="rpAnnotationImage" :src="rpImageUrl" alt="Full cue" class="w-full h-auto" @load="onRpImageLoad" />
                <div
                  v-for="(lm, i) in rpLandmarks"
                  :key="i"
                  class="absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-white bg-red-500 shadow-lg"
                  :style="{ left: `${lm.xPercent}%`, top: `${lm.yPercent}%` }"
                >
                  <span class="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-white bg-red-500 px-1 rounded">{{ i === 0 ? 'Start' : 'End' }}</span>
                </div>
                <svg v-if="rpLandmarks.length === 2" class="absolute inset-0 w-full h-full pointer-events-none">
                  <line :x1="`${rpLandmarks[0].xPercent}%`" :y1="`${rpLandmarks[0].yPercent}%`" :x2="`${rpLandmarks[1].xPercent}%`" :y2="`${rpLandmarks[1].yPercent}%`" stroke="white" stroke-width="2" stroke-dasharray="5,5" />
                </svg>
              </div>
              <p class="text-xs text-ink-200">Mark the start and end of the wrap section</p>
            </div>

            <div v-if="rpCanGenerate" class="space-y-4">
              <h3 class="text-base font-medium">Generated Images Preview</h3>
              <p class="text-xs text-ink-200">Click any image to view full size</p>
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-bg-100 rounded-lg p-2 cursor-pointer hover:bg-bg-200 transition-colors" @click="openCanvasPreview(rpListCanvas1)">
                  <canvas ref="rpListCanvas1" class="w-full h-auto"></canvas>
                  <p class="text-xs text-ink-200 mt-1">Full cue (list/0)</p>
                </div>
                <div class="bg-bg-100 rounded-lg p-2 cursor-pointer hover:bg-bg-200 transition-colors" @click="openCanvasPreview(rpListCanvas2)">
                  <canvas ref="rpListCanvas2" class="w-full h-auto"></canvas>
                  <p class="text-xs text-ink-200 mt-1">Cropped (list/1)</p>
                </div>
                <div class="bg-bg-100 rounded-lg p-2 cursor-pointer hover:bg-bg-200 transition-colors" @click="openCanvasPreview(rpDetailCanvas1)">
                  <canvas ref="rpDetailCanvas1" class="w-full h-auto"></canvas>
                  <p class="text-xs text-ink-200 mt-1">Angled (details/0)</p>
                </div>
                <div class="bg-bg-100 rounded-lg p-2 cursor-pointer hover:bg-bg-200 transition-colors" @click="openCanvasPreview(rpDetailCanvas2)">
                  <canvas ref="rpDetailCanvas2" class="w-full h-auto"></canvas>
                  <p class="text-xs text-ink-200 mt-1">Horizontal (details/1)</p>
                </div>
              </div>
            </div>

            <p v-if="rpError" class="text-red-400 text-sm">{{ rpError }}</p>
            <p v-if="rpSuccess" class="text-green-400 text-sm">{{ rpSuccess }}</p>

            <div class="flex gap-3">
              <button @click="closeReprocessModal" class="flex-1 py-3 border border-ink-200 rounded text-sm text-ink-100 hover:text-ink hover:border-ink transition-colors">Cancel</button>
              <button
                @click="saveReprocessed"
                :disabled="rpSaving || !rpCanGenerate"
                class="flex-1 py-3 bg-ink text-bg rounded text-sm font-medium hover:bg-ink-100 transition-colors disabled:opacity-50"
              >
                {{ rpSaving ? 'Saving...' : 'Save New Images' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Canvas Preview Modal (above reprocess modal) -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="canvasPreviewSrc"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90"
        @click="canvasPreviewSrc = null"
      >
        <button class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10" @click="canvasPreviewSrc = null">×</button>
        <img :src="canvasPreviewSrc" alt="Preview" class="max-w-full max-h-full object-contain" @click.stop />
      </div>
    </Transition>
  </Teleport>

  <!-- Delete Confirmation Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        @click.self="showDeleteModal = false"
      >
        <div class="bg-bg border border-ink-200 rounded-xl w-full max-w-md p-6">
          <h2 class="text-lg font-semibold mb-2">Delete Cue #{{ selectedCue?.id }}?</h2>
          <p class="text-ink-100 text-sm mb-2">This will permanently delete the cue and all its images from storage.</p>
          <p class="text-red-400 text-sm mb-6">This cannot be undone.</p>
          <p v-if="deleteError" class="text-red-400 text-sm mb-4">{{ deleteError }}</p>
          <div class="flex gap-3">
            <button
              @click="showDeleteModal = false"
              :disabled="deleting"
              class="flex-1 py-2 border border-ink-200 rounded text-sm text-ink-100 hover:text-ink hover:border-ink transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              @click="deleteCue"
              :disabled="deleting"
              class="flex-1 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-500 transition-colors disabled:opacity-50"
            >
              {{ deleting ? 'Deleting...' : 'Delete Permanently' }}
            </button>
          </div>
        </div>
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
    refresh,
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
      const cue = designCues.value.find((c) => c.id === selectedCue.value.id);
      if (cue) cue.published = false;
    } catch (e) {
      console.error("Unpublish error:", e);
      publishError.value = e.message;
    } finally {
      publishing.value = false;
    }
  };

  const toggleHighlight = async () => {
    if (!selectedCue.value) return;
    const $supabase = useNuxtApp().$supabase;
    const newValue = !selectedCue.value.highlight;
    const { error } = await $supabase.from("cues").update({ highlight: newValue }).eq("id", selectedCue.value.id);
    if (error) { console.error("Highlight error:", error); return; }
    const cue = designCues.value.find((c) => c.id === selectedCue.value.id);
    if (cue) cue.highlight = newValue;
    designCues.value = sortCues(designCues.value);
  };

  const toggleIccs = async () => {
    if (!design.value) return;
    const $supabase = useNuxtApp().$supabase;
    const newValue = !design.value.is_iccs;
    const { error } = await $supabase.from("designs").update({ is_iccs: newValue }).eq("id", designId);
    if (error) { console.error("ICCS error:", error); return; }
    design.value.is_iccs = newValue;
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

  // ─── Beauty image display helper ──────────────────────────────────────────

  const getBeautyImages = (cue) => {
    if (!cue?.images?.details || !Array.isArray(cue.images.details)) return [];
    return cue.images.details.slice(2);
  };

  // ─── Shared storage helpers ────────────────────────────────────────────────

  const SUPABASE_BASE_URL = 'https://gphhckptzkwryjjjcltk.supabase.co/storage/v1/object/public/cue-images';

  const uploadImageToStorage = async ($supabase, path, fileOrBlob) => {
    const ext = path.split('.').pop()?.toLowerCase();
    const contentTypes = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp' };
    const contentType = contentTypes[ext] || fileOrBlob.type || 'image/png';
    const { error: uploadError } = await $supabase.storage.from('cue-images').upload(path, fileOrBlob, { contentType, upsert: true });
    if (uploadError) throw uploadError;
    return `${SUPABASE_BASE_URL}/${path}`;
  };

  const canvasToBlob = (canvas) => new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.9));

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const reloadCueData = async () => {
    await refresh();
    initializeDesign();
  };

  // ─── Beauty image upload ───────────────────────────────────────────────────

  const showUploadModal = ref(false);
  const beautyFileInput = ref(null);
  const pendingBeautyImages = ref([]);
  const beautyUploading = ref(false);
  const beautyError = ref('');
  const beautySuccess = ref('');

  const nextBeautyIndex = computed(() => {
    const details = selectedCue.value?.images?.details;
    return Array.isArray(details) ? details.length : 2;
  });

  const getImageDimensions = (file) =>
    new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => { URL.revokeObjectURL(url); resolve({ width: img.naturalWidth, height: img.naturalHeight }); };
      img.src = url;
    });

  const addBeautyImages = async (files) => {
    for (const file of files) {
      const preview = URL.createObjectURL(file);
      const { width, height } = await getImageDimensions(file);
      const maxDim = Math.max(width, height);
      const sizeWarning = maxDim < 1500 ? `Only ${width}×${height}px — may appear blurry at full size` : null;
      pendingBeautyImages.value.push({ file, preview, width, height, sizeWarning });
    }
  };

  const triggerBeautyFileInput = () => beautyFileInput.value?.click();

  const handleBeautyFileSelect = (event) => {
    const files = Array.from(event.target.files || []);
    addBeautyImages(files);
    event.target.value = '';
  };

  const handleBeautyDrop = (event) => {
    const files = Array.from(event.dataTransfer.files || []).filter((f) => f.type.startsWith('image/'));
    addBeautyImages(files);
  };

  const removePendingBeautyImage = (index) => {
    URL.revokeObjectURL(pendingBeautyImages.value[index].preview);
    pendingBeautyImages.value.splice(index, 1);
  };

  const closeUploadModal = () => {
    if (beautyUploading.value) return;
    pendingBeautyImages.value.forEach((img) => URL.revokeObjectURL(img.preview));
    pendingBeautyImages.value = [];
    beautyError.value = '';
    beautySuccess.value = '';
    showUploadModal.value = false;
  };

  const uploadBeautyImages = async () => {
    if (!pendingBeautyImages.value.length || !selectedCue.value) return;
    beautyUploading.value = true;
    beautyError.value = '';
    beautySuccess.value = '';
    try {
      const $supabase = useNuxtApp().$supabase;
      const cue = selectedCue.value;
      const currentDetails = Array.isArray(cue.images?.details) ? [...cue.images.details] : [];
      let nextIndex = currentDetails.length;
      for (const img of pendingBeautyImages.value) {
        const ext = img.file.name.split('.').pop() || 'jpg';
        const path = `${cue.id}/details/${nextIndex}.${ext}`;
        const url = await uploadImageToStorage($supabase, path, img.file);
        currentDetails.push(url);
        nextIndex++;
      }
      const { error: updateError } = await $supabase
        .from('cues')
        .update({ images: { ...cue.images, details: currentDetails } })
        .eq('id', cue.id);
      if (updateError) throw updateError;
      beautySuccess.value = `${pendingBeautyImages.value.length} image(s) uploaded successfully!`;
      pendingBeautyImages.value.forEach((img) => URL.revokeObjectURL(img.preview));
      pendingBeautyImages.value = [];
      await reloadCueData();
      setTimeout(() => { showUploadModal.value = false; beautySuccess.value = ''; }, 1500);
    } catch (e) {
      console.error('Beauty upload error:', e);
      beautyError.value = e.message;
    } finally {
      beautyUploading.value = false;
    }
  };

  // ─── Change main image (reprocess) ────────────────────────────────────────

  const showReprocessModal = ref(false);
  const rpFileInput = ref(null);
  const rpSourceImage = ref(null);
  const rpImageUrl = ref('');
  const rpLandmarks = ref([]);
  const rpImageContainer = ref(null);
  const rpAnnotationImage = ref(null);
  const rpListCanvas1 = ref(null);
  const rpListCanvas2 = ref(null);
  const rpDetailCanvas1 = ref(null);
  const rpDetailCanvas2 = ref(null);
  const rpSaving = ref(false);
  const rpError = ref('');
  const rpSuccess = ref('');
  const canvasPreviewSrc = ref(null);

  const rpCanGenerate = computed(() => rpImageUrl.value && rpLandmarks.value.length === 2);

  const openReprocessModal = () => { showReprocessModal.value = true; };

  const closeReprocessModal = () => {
    if (rpSaving.value) return;
    rpSourceImage.value = null;
    if (rpImageUrl.value) URL.revokeObjectURL(rpImageUrl.value);
    rpImageUrl.value = '';
    rpLandmarks.value = [];
    rpError.value = '';
    rpSuccess.value = '';
    showReprocessModal.value = false;
  };

  const triggerRpFileInput = () => rpFileInput.value?.click();

  const handleRpFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) loadRpImage(file);
  };

  const handleRpDrop = (event) => {
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) loadRpImage(file);
  };

  const loadRpImage = (file) => {
    if (rpImageUrl.value) URL.revokeObjectURL(rpImageUrl.value);
    rpSourceImage.value = file;
    rpImageUrl.value = URL.createObjectURL(file);
    rpLandmarks.value = [];
  };

  const onRpImageLoad = () => {};

  const handleRpImageClick = (event) => {
    if (rpLandmarks.value.length >= 2) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
    rpLandmarks.value.push({ xPercent, yPercent });
    if (rpLandmarks.value.length === 2) {
      rpLandmarks.value.sort((a, b) => a.xPercent - b.xPercent);
      nextTick(() => rpGeneratePreviews());
    }
  };

  watch(rpLandmarks, () => {
    if (rpLandmarks.value.length === 2) nextTick(() => rpGeneratePreviews());
  }, { deep: true });

  const rpGeneratePreviews = () => {
    if (!rpCanGenerate.value) return;
    const img = rpAnnotationImage.value;
    if (!img) return;
    const wrapStart = rpLandmarks.value[0].xPercent / 100;
    const wrapEnd = rpLandmarks.value[1].xPercent / 100;
    rpGenListImage1(img);
    rpGenListImage2(img, wrapStart, wrapEnd);
    rpGenDetailImage1(img, wrapStart, wrapEnd);
    rpGenDetailImage2(img);
  };

  const rpGenListImage1 = (img) => {
    const canvas = rpListCanvas1.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
  };

  const rpGenListImage2 = (img, wrapStart, wrapEnd) => {
    const canvas = rpListCanvas2.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const angle = -8 * (Math.PI / 180);
    const absAngle = Math.abs(angle);
    const wrapPadding = 0.02;
    const visibleStart = wrapEnd - wrapPadding;
    const visibleWidth = 1 - visibleStart;
    const visiblePixelWidth = visibleWidth * img.naturalWidth;
    const canvasWidth = visiblePixelWidth * Math.cos(absAngle) + img.naturalHeight * Math.sin(absAngle);
    const canvasHeight = visiblePixelWidth * Math.sin(absAngle) + img.naturalHeight * Math.cos(absAngle);
    canvas.width = Math.ceil(canvasWidth);
    canvas.height = Math.ceil(canvasHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    const offsetX = img.naturalWidth / 2 - visibleStart * img.naturalWidth - visiblePixelWidth / 2;
    ctx.drawImage(img, -img.naturalWidth / 2 + offsetX, -img.naturalHeight / 2);
    ctx.restore();
  };

  const rpGenDetailImage1 = (img, noseEnd, buttStart) => {
    const canvas = rpDetailCanvas1.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const angle = 18 * (Math.PI / 180);
    const nosePadding = 0.12;
    const noseStartX = (buttStart - nosePadding) * img.naturalWidth;
    const noseWidth = img.naturalWidth - noseStartX;
    const buttPadding = 0.35;
    const buttEndX = (noseEnd + buttPadding) * img.naturalWidth;
    const buttWidth = buttEndX;
    const gap = 30;
    const compositeWidth = img.naturalHeight * 2 + gap;
    const compositeHeight = Math.max(noseWidth, buttWidth);
    const rotatedWidth = compositeWidth * Math.cos(angle) + compositeHeight * Math.sin(angle);
    const rotatedHeight = compositeWidth * Math.sin(angle) + compositeHeight * Math.cos(angle);
    const cropTop = rotatedHeight * 0.12;
    const cropBottom = rotatedHeight * 0.05;
    canvas.width = Math.ceil(rotatedWidth);
    canvas.height = Math.ceil(rotatedHeight - cropTop - cropBottom);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 - cropTop / 2 + cropBottom / 2);
    ctx.rotate(angle);
    const noseVerticalOffset = noseWidth * 0.15;
    ctx.save();
    ctx.translate(-compositeWidth / 2 + img.naturalHeight / 2, noseVerticalOffset);
    ctx.rotate(-Math.PI / 2);
    ctx.drawImage(img, noseStartX, 0, noseWidth, img.naturalHeight, -noseWidth / 2, -img.naturalHeight / 2, noseWidth, img.naturalHeight);
    ctx.restore();
    const buttVerticalOffset = -buttWidth * 0.28;
    ctx.save();
    ctx.translate(compositeWidth / 2 - img.naturalHeight / 2, buttVerticalOffset);
    ctx.rotate(-Math.PI / 2);
    ctx.drawImage(img, 0, 0, buttWidth, img.naturalHeight, -buttWidth / 2, -img.naturalHeight / 2, buttWidth, img.naturalHeight);
    ctx.restore();
    ctx.restore();
  };

  const rpGenDetailImage2 = (img) => {
    const canvas = rpDetailCanvas2.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const angle = -8 * (Math.PI / 180);
    const absAngle = Math.abs(angle);
    const rotatedWidth = img.naturalWidth * Math.cos(absAngle) + img.naturalHeight * Math.sin(absAngle);
    const rotatedHeight = img.naturalWidth * Math.sin(absAngle) + img.naturalHeight * Math.cos(absAngle);
    const padding = 10;
    canvas.width = Math.ceil(rotatedWidth + padding * 2);
    canvas.height = Math.ceil(rotatedHeight + padding * 2);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    ctx.restore();
  };

  const openCanvasPreview = (canvasRef) => {
    if (canvasRef) canvasPreviewSrc.value = canvasRef.toDataURL('image/png');
  };

  const saveReprocessed = async () => {
    if (!rpCanGenerate.value || !selectedCue.value) return;
    rpSaving.value = true;
    rpError.value = '';
    rpSuccess.value = '';
    try {
      const $supabase = useNuxtApp().$supabase;
      const cue = selectedCue.value;
      const basePath = `${cue.id}`;
      const [listBlob1, listBlob2, detailBlob1, detailBlob2] = await Promise.all([
        canvasToBlob(rpListCanvas1.value),
        canvasToBlob(rpListCanvas2.value),
        canvasToBlob(rpDetailCanvas1.value),
        canvasToBlob(rpDetailCanvas2.value),
      ]);
      const [listUrl1, listUrl2, detailUrl1, detailUrl2] = await Promise.all([
        uploadImageToStorage($supabase, `${basePath}/list/0.png`, listBlob1),
        uploadImageToStorage($supabase, `${basePath}/list/1.png`, listBlob2),
        uploadImageToStorage($supabase, `${basePath}/details/0.png`, detailBlob1),
        uploadImageToStorage($supabase, `${basePath}/details/1.png`, detailBlob2),
      ]);
      const existingBeauty = getBeautyImages(cue);
      // Append cache-buster so browsers fetch the new images instead of serving the cached old ones
      const v = `v=${Date.now()}`;
      const bust = (url) => `${url}?${v}`;
      const updatedImages = {
        list: [bust(listUrl1), bust(listUrl2)],
        details: [bust(detailUrl1), bust(detailUrl2), ...existingBeauty],
      };
      const { error: updateError } = await $supabase.from('cues').update({ images: updatedImages }).eq('id', cue.id);
      if (updateError) throw updateError;
      rpSuccess.value = 'Images saved successfully!';
      await reloadCueData();
      setTimeout(() => { closeReprocessModal(); }, 1500);
    } catch (e) {
      console.error('Reprocess error:', e);
      rpError.value = e.message;
    } finally {
      rpSaving.value = false;
    }
  };

  // ─── Delete cue ────────────────────────────────────────────────────────────

  const showDeleteModal = ref(false);
  const deleting = ref(false);
  const deleteError = ref('');

  const deleteCue = async () => {
    if (!selectedCue.value) return;
    deleting.value = true;
    deleteError.value = '';
    try {
      const $supabase = useNuxtApp().$supabase;
      const cue = selectedCue.value;
      const allUrls = [...(cue.images?.list || []), ...(cue.images?.details || [])];
      const storagePaths = allUrls
        .filter(Boolean)
        .map((url) => { const match = url.match(/\/cue-images\/(.+?)(\?|$)/); return match ? match[1] : null; })
        .filter(Boolean);
      if (storagePaths.length > 0) {
        const { error: storageError } = await $supabase.storage.from('cue-images').remove(storagePaths);
        if (storageError) console.warn('Storage delete error (continuing):', storageError);
      }
      const { error: dbError } = await $supabase.from('cues').delete().eq('id', cue.id);
      if (dbError) throw dbError;

      // Update local state immediately — avoids stale-data flash on navigation
      const deletedId = cue.id;
      designCues.value = designCues.value.filter((c) => c.id !== deletedId);
      showDeleteModal.value = false;

      if (designCues.value.length > 0) {
        const nextCue = designCues.value[0];
        selectedCueId.value = nextCue.id;
        viewMode.value = 'regular';
        loadedImages.value.clear();
        navigateTo(`/design/${designId}/${nextCue.id}`, { replace: true });
      } else {
        router.push('/');
      }

      // Sync composable in background
      refresh().catch(console.error);
    } catch (e) {
      console.error('Delete error:', e);
      deleteError.value = e.message;
      deleting.value = false;
    }
  };

  // ─── Page init ─────────────────────────────────────────────────────────────

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
          navigateTo(`/design/${designId}/${designCues.value[0].id}`, { replace: true });
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
