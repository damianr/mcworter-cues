<template>
  <div class="min-h-screen bg-bg text-ink p-8">
    <!-- Loading State -->
    <div v-if="authLoading" class="flex justify-center items-center h-64">
      <div class="text-ink-100">Loading...</div>
    </div>

    <!-- Login Form -->
    <div v-else-if="!isAuthenticated" class="max-w-md mx-auto pt-24">
      <h1 class="text-2xl font-bold mb-8 text-center">Admin Login</h1>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm text-ink-100 mb-2">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 bg-bg-100 border border-ink-200 rounded-lg focus:outline-none focus:border-ink text-ink"
            placeholder="your@email.com"
          />
        </div>
        
        <button
          type="submit"
          :disabled="sending"
          class="w-full py-3 bg-ink text-bg font-medium rounded-lg hover:bg-ink-100 transition-colors disabled:opacity-50"
        >
          {{ sending ? 'Sending...' : 'Send Magic Link' }}
        </button>
        
        <p v-if="linkSent" class="text-center text-green-400 text-sm">
          Check your email for the login link!
        </p>
        
        <p v-if="authError" class="text-center text-red-400 text-sm">
          {{ authError }}
        </p>
      </form>
    </div>

    <!-- Admin Interface -->
    <div v-else class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold">Add New Cue</h1>
        <button
          @click="handleSignOut"
          class="text-sm text-ink-100 hover:text-ink underline"
        >
          Sign Out
        </button>
      </div>

      <!-- Cue Form - Single Column Layout -->
      <div class="space-y-6">
        <!-- Row 1: Design & Cue ID side by side -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-ink-100 mb-2">Design</label>
            <select
              v-model="selectedDesignId"
              class="w-full px-4 py-3 bg-bg-100 border border-ink-200 rounded-lg focus:outline-none focus:border-ink text-ink"
            >
              <option value="">Select a design...</option>
              <option v-for="design in designs" :key="design.id" :value="design.id">
                {{ design.title }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-ink-100 mb-2">Cue ID</label>
            <input
              v-model="cueId"
              type="number"
              class="w-full px-4 py-3 bg-bg-100 border border-ink-200 rounded-lg focus:outline-none focus:border-ink text-ink"
              placeholder="e.g. 2345"
            />
          </div>
        </div>

        <!-- Row 2: Image Upload -->
        <div>
          <label class="block text-sm text-ink-100 mb-2">Full Cue Image</label>
          <div
            class="border-2 border-dashed border-ink-200 rounded-lg p-8 text-center cursor-pointer hover:border-ink transition-colors"
            @click="triggerFileInput"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />
            <p v-if="!sourceImage" class="text-ink-100">
              Click or drag to upload full cue image
            </p>
            <p v-else class="text-ink">
              {{ sourceImage.name }} ({{ formatFileSize(sourceImage.size) }})
            </p>
          </div>
        </div>

        <!-- Row 3: Uploaded Image with Landmark Annotation -->
        <div v-if="imageUrl" class="space-y-4">
          <div class="flex justify-between items-center">
            <label class="block text-sm text-ink-100">
              Click to mark wrap boundaries ({{ landmarks.length }}/2)
            </label>
            <button
              v-if="landmarks.length > 0"
              @click="clearLandmarks"
              class="text-xs text-ink-100 hover:text-ink underline"
            >
              Clear
            </button>
          </div>
          
          <div 
            ref="imageContainer"
            class="relative cursor-crosshair border border-ink-200 rounded-lg overflow-hidden"
            @click="handleImageClick"
          >
            <img
              ref="annotationImage"
              :src="imageUrl"
              alt="Full cue"
              class="w-full h-auto"
              @load="onImageLoad"
            />
            <!-- Landmark markers -->
            <div
              v-for="(landmark, index) in landmarks"
              :key="index"
              class="absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-white bg-red-500 shadow-lg"
              :style="{ left: `${landmark.xPercent}%`, top: `${landmark.yPercent}%` }"
            >
              <span class="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-white bg-red-500 px-1 rounded">
                {{ index === 0 ? 'Start' : 'End' }}
              </span>
            </div>
            <!-- Line between landmarks -->
            <svg
              v-if="landmarks.length === 2"
              class="absolute inset-0 w-full h-full pointer-events-none"
            >
              <line
                :x1="`${landmarks[0].xPercent}%`"
                :y1="`${landmarks[0].yPercent}%`"
                :x2="`${landmarks[1].xPercent}%`"
                :y2="`${landmarks[1].yPercent}%`"
                stroke="white"
                stroke-width="2"
                stroke-dasharray="5,5"
              />
            </svg>
          </div>
          
          <p class="text-xs text-ink-200">
            Mark the start and end of the wrap section
          </p>
        </div>

        <!-- Row 4: Generated Images Preview -->
        <div v-if="canGenerate" class="space-y-4">
          <h2 class="text-lg font-medium">Generated Images Preview</h2>
          <p class="text-xs text-ink-200">Click any image to view full size</p>
          
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- List Image 1 -->
            <div 
              class="bg-bg-100 rounded-lg p-2 cursor-pointer hover:bg-bg-200 transition-colors"
              @click="openPreviewModal('list1')"
            >
              <canvas ref="listCanvas1" class="w-full h-auto"></canvas>
              <p class="text-xs text-ink-200 mt-1">Full cue (list/0)</p>
            </div>
            
            <!-- List Image 2 -->
            <div 
              class="bg-bg-100 rounded-lg p-2 cursor-pointer hover:bg-bg-200 transition-colors"
              @click="openPreviewModal('list2')"
            >
              <canvas ref="listCanvas2" class="w-full h-auto"></canvas>
              <p class="text-xs text-ink-200 mt-1">Cropped (list/1)</p>
            </div>
            
            <!-- Detail Image 1 -->
            <div 
              class="bg-bg-100 rounded-lg p-2 cursor-pointer hover:bg-bg-200 transition-colors"
              @click="openPreviewModal('detail1')"
            >
              <canvas ref="detailCanvas1" class="w-full h-auto"></canvas>
              <p class="text-xs text-ink-200 mt-1">Angled (details/0)</p>
            </div>
            
            <!-- Detail Image 2 -->
            <div 
              class="bg-bg-100 rounded-lg p-2 cursor-pointer hover:bg-bg-200 transition-colors"
              @click="openPreviewModal('detail2')"
            >
              <canvas ref="detailCanvas2" class="w-full h-auto"></canvas>
              <p class="text-xs text-ink-200 mt-1">Horizontal (details/1)</p>
            </div>
          </div>
          
          <!-- Generate Button -->
          <button
            @click="generateAndSave"
            :disabled="saving || !canSave"
            class="w-full py-3 bg-ink text-bg font-medium rounded-lg hover:bg-ink-100 transition-colors disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : 'Generate & Save Cue' }}
          </button>
          
          <p v-if="saveError" class="text-red-400 text-sm">{{ saveError }}</p>
          <p v-if="saveSuccess" class="text-green-400 text-sm">Cue saved successfully!</p>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="previewModalImage"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          @click="closePreviewModal"
        >
          <button
            class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            @click="closePreviewModal"
            aria-label="Close modal"
          >
            ×
          </button>
          <img
            :src="previewModalImage"
            alt="Preview"
            class="max-w-full max-h-full object-contain"
            @click.stop
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
const { user, loading: authLoading, error: authError, isAuthenticated, sendMagicLink, signOut } = useAuth();
const { getAllDesigns, loading: cuesLoading } = useCues();

// Auth state
const email = ref('');
const sending = ref(false);
const linkSent = ref(false);

// Form state
const selectedDesignId = ref('');
const cueId = ref('');
const sourceImage = ref(null);
const imageUrl = ref('');
const landmarks = ref([]);
const imageDimensions = ref({ width: 0, height: 0 });

// Canvas refs
const fileInput = ref(null);
const imageContainer = ref(null);
const annotationImage = ref(null);
const listCanvas1 = ref(null);
const listCanvas2 = ref(null);
const detailCanvas1 = ref(null);
const detailCanvas2 = ref(null);

// Save state
const saving = ref(false);
const saveError = ref('');
const saveSuccess = ref(false);

// Preview modal state
const previewModalImage = ref(null);

// Get designs
const designs = computed(() => getAllDesigns());

// Can generate previews
const canGenerate = computed(() => {
  return imageUrl.value && landmarks.value.length === 2;
});

// Can save
const canSave = computed(() => {
  return canGenerate.value && selectedDesignId.value && cueId.value;
});

// Auth handlers
const handleLogin = async () => {
  sending.value = true;
  linkSent.value = false;
  try {
    await sendMagicLink(email.value);
    linkSent.value = true;
  } catch (e) {
    console.error('Login error:', e);
  } finally {
    sending.value = false;
  }
};

const handleSignOut = async () => {
  await signOut();
};

// File handlers
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    loadImage(file);
  }
};

const handleDrop = (event) => {
  const file = event.dataTransfer.files?.[0];
  if (file && file.type.startsWith('image/')) {
    loadImage(file);
  }
};

const loadImage = (file) => {
  sourceImage.value = file;
  imageUrl.value = URL.createObjectURL(file);
  landmarks.value = [];
  saveSuccess.value = false;
  saveError.value = '';
};

const onImageLoad = () => {
  if (annotationImage.value) {
    imageDimensions.value = {
      width: annotationImage.value.naturalWidth,
      height: annotationImage.value.naturalHeight,
    };
  }
};

// Landmark handlers
const handleImageClick = (event) => {
  if (landmarks.value.length >= 2) return;
  
  const rect = event.currentTarget.getBoundingClientRect();
  const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
  const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
  
  landmarks.value.push({ xPercent, yPercent });
  
  if (landmarks.value.length === 2) {
    // Sort landmarks by x position (left to right)
    landmarks.value.sort((a, b) => a.xPercent - b.xPercent);
    generatePreviews();
  }
};

const clearLandmarks = () => {
  landmarks.value = [];
};

// Preview modal handlers
const openPreviewModal = (canvasType) => {
  let canvas;
  switch (canvasType) {
    case 'list1':
      canvas = listCanvas1.value;
      break;
    case 'list2':
      canvas = listCanvas2.value;
      break;
    case 'detail1':
      canvas = detailCanvas1.value;
      break;
    case 'detail2':
      canvas = detailCanvas2.value;
      break;
  }
  if (canvas) {
    previewModalImage.value = canvas.toDataURL('image/png');
  }
};

const closePreviewModal = () => {
  previewModalImage.value = null;
};

// Generate preview images
const generatePreviews = () => {
  if (!canGenerate.value) return;
  
  const img = annotationImage.value;
  if (!img) return;
  
  const wrapStart = landmarks.value[0].xPercent / 100;
  const wrapEnd = landmarks.value[1].xPercent / 100;
  
  // Calculate regions
  const noseEnd = wrapStart;
  const buttStart = wrapEnd;
  
  // Generate list image 1: full cue
  generateListImage1(img);
  
  // Generate list image 2: cropped around wrap
  generateListImage2(img, wrapStart, wrapEnd);
  
  // Generate detail image 1: angled nose + butt composite
  generateDetailImage1(img, noseEnd, buttStart);
  
  // Generate detail image 2: full horizontal
  generateDetailImage2(img);
};

const generateListImage1 = (img) => {
  const canvas = listCanvas1.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);
};

const generateListImage2 = (img, wrapStart, wrapEnd) => {
  const canvas = listCanvas2.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // List/1: Nose section at angle, with cue appearing to "run off" the left edge
  // Strategy: rotate the full image, then use canvas bounds to crop with straight edges
  const angle = -8 * (Math.PI / 180);
  const absAngle = Math.abs(angle);
  
  // We want to show from just into the wrap to the nose tip (right edge)
  const wrapPadding = 0.02; // Show only 2% into the wrap
  const visibleStart = wrapEnd - wrapPadding; // Where we want the left edge to cut
  const visibleWidth = 1 - visibleStart; // Proportion of image we want visible
  
  // Calculate canvas size based on the visible portion after rotation
  const visiblePixelWidth = visibleWidth * img.naturalWidth;
  const canvasWidth = visiblePixelWidth * Math.cos(absAngle) + img.naturalHeight * Math.sin(absAngle);
  const canvasHeight = visiblePixelWidth * Math.sin(absAngle) + img.naturalHeight * Math.cos(absAngle);
  
  canvas.width = Math.ceil(canvasWidth);
  canvas.height = Math.ceil(canvasHeight);
  
  // Transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Rotate and position so:
  // - The nose tip (right of source) is at the right edge of canvas
  // - The cue runs off the left edge (cut by straight canvas boundary)
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle);
  
  // Position the full image so the right side (nose) is visible
  // and left side extends beyond canvas (gets clipped)
  const offsetX = (img.naturalWidth / 2) - (visibleStart * img.naturalWidth) - (visiblePixelWidth / 2);
  ctx.drawImage(
    img,
    -img.naturalWidth / 2 + offsetX, -img.naturalHeight / 2
  );
  ctx.restore();
};

const generateDetailImage1 = (img, noseEnd, buttStart) => {
  const canvas = detailCanvas1.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Details/0: Nose on left, butt on right, both leaning RIGHT
  // Strategy: Create composite of both sections, then rotate the whole thing
  const angle = 18 * (Math.PI / 180); // Reduced from 25° to 18°
  
  // NOSE section: RIGHT side of source (from wrap end to tip) + MORE wrap
  const nosePadding = 0.12; // More wrap showing
  const noseStartX = (buttStart - nosePadding) * img.naturalWidth;
  const noseWidth = img.naturalWidth - noseStartX;
  
  // BUTT section: LEFT side of source (handle to wrap start) + EVEN MORE wrap  
  const buttPadding = 0.35; // Increased from 0.25 to show more wrap and run off edge
  const buttEndX = (noseEnd + buttPadding) * img.naturalWidth;
  const buttWidth = buttEndX;
  
  // Gap between sections (before rotation)
  const gap = 30; // Increased by 50%
  
  // Create composite dimensions (both sections side by side, vertically oriented)
  const compositeWidth = img.naturalHeight * 2 + gap;
  const compositeHeight = Math.max(noseWidth, buttWidth);
  
  // Final canvas size after rotating the composite
  const rotatedWidth = compositeWidth * Math.cos(angle) + compositeHeight * Math.sin(angle);
  const rotatedHeight = compositeWidth * Math.sin(angle) + compositeHeight * Math.cos(angle);
  
  // Crop canvas: remove from top (nose closer to top) and a bit from bottom
  const cropTop = rotatedHeight * 0.12; // Crop 12% from top
  const cropBottom = rotatedHeight * 0.05; // Crop 5% from bottom
  
  canvas.width = Math.ceil(rotatedWidth);
  canvas.height = Math.ceil(rotatedHeight - cropTop - cropBottom);
  
  // Transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Rotate entire canvas, then draw both sections
  // Offset to account for top/bottom cropping
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2 - cropTop / 2 + cropBottom / 2);
  ctx.rotate(angle);
  
  // Draw NOSE on left (rotated 90° CCW so tip points up)
  // Offset down so it runs off bottom after rotation
  const noseVerticalOffset = noseWidth * 0.15; // Push down
  ctx.save();
  ctx.translate(-compositeWidth / 2 + img.naturalHeight / 2, noseVerticalOffset);
  ctx.rotate(-Math.PI / 2);
  ctx.drawImage(
    img,
    noseStartX, 0, noseWidth, img.naturalHeight,
    -noseWidth / 2, -img.naturalHeight / 2, noseWidth, img.naturalHeight
  );
  ctx.restore();
  
  // Draw BUTT on right (rotated 90° CCW so handle points down)
  // Offset UP so wrap start is closer to center, handle runs off top
  const buttVerticalOffset = -buttWidth * 0.28; // Push up more
  ctx.save();
  ctx.translate(compositeWidth / 2 - img.naturalHeight / 2, buttVerticalOffset);
  ctx.rotate(-Math.PI / 2);
  ctx.drawImage(
    img,
    0, 0, buttWidth, img.naturalHeight,
    -buttWidth / 2, -img.naturalHeight / 2, buttWidth, img.naturalHeight
  );
  ctx.restore();
  
  ctx.restore();
};

const generateDetailImage2 = (img) => {
  const canvas = detailCanvas2.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Details/1: Full cue at slight angle (~8 degrees), left LOW, right HIGH
  // Large enough for full-size viewing - negative angle
  const angle = -8 * (Math.PI / 180);
  
  // Calculate canvas size to fit rotated full image with padding
  const absAngle = Math.abs(angle);
  const rotatedWidth = img.naturalWidth * Math.cos(absAngle) + img.naturalHeight * Math.sin(absAngle);
  const rotatedHeight = img.naturalWidth * Math.sin(absAngle) + img.naturalHeight * Math.cos(absAngle);
  
  // Minimal padding, transparent background
  const padding = 10;
  canvas.width = Math.ceil(rotatedWidth + padding * 2);
  canvas.height = Math.ceil(rotatedHeight + padding * 2);
  
  // Transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Rotate and draw full cue - left LOW, right HIGH
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle);
  ctx.drawImage(
    img,
    -img.naturalWidth / 2, -img.naturalHeight / 2
  );
  ctx.restore();
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

// Generate and save
const generateAndSave = async () => {
  if (!canSave.value) return;
  
  saving.value = true;
  saveError.value = '';
  saveSuccess.value = false;
  
  try {
    const nuxtApp = useNuxtApp();
    const $supabase = nuxtApp.$supabase;
    
    // Convert canvases to blobs
    const listBlob1 = await canvasToBlob(listCanvas1.value);
    const listBlob2 = await canvasToBlob(listCanvas2.value);
    const detailBlob1 = await canvasToBlob(detailCanvas1.value);
    const detailBlob2 = await canvasToBlob(detailCanvas2.value);
    
    const cueIdNum = parseInt(cueId.value);
    const basePath = `${cueIdNum}`;
    
    // Upload images to Supabase Storage
    const uploads = await Promise.all([
      uploadImage($supabase, `${basePath}/list/0.png`, listBlob1),
      uploadImage($supabase, `${basePath}/list/1.png`, listBlob2),
      uploadImage($supabase, `${basePath}/details/0.png`, detailBlob1),
      uploadImage($supabase, `${basePath}/details/1.png`, detailBlob2),
    ]);
    
    // Get public URLs
    const baseUrl = `https://gphhckptzkwryjjjcltk.supabase.co/storage/v1/object/public/cue-images`;
    const images = {
      list: [
        `${baseUrl}/${basePath}/list/0.png`,
        `${baseUrl}/${basePath}/list/1.png`,
      ],
      details: [
        `${baseUrl}/${basePath}/details/0.png`,
        `${baseUrl}/${basePath}/details/1.png`,
      ],
    };
    
    // Insert cue record
    const { error: insertError } = await $supabase
      .from('cues')
      .insert({
        id: cueIdNum,
        design_id: selectedDesignId.value,
        images,
        is_past_cue: false,
        highlight: false,
      });
    
    if (insertError) throw insertError;
    
    saveSuccess.value = true;
    
    // Reset form
    setTimeout(() => {
      sourceImage.value = null;
      imageUrl.value = '';
      landmarks.value = [];
      cueId.value = '';
      saveSuccess.value = false;
    }, 2000);
    
  } catch (e) {
    console.error('Save error:', e);
    saveError.value = e.message;
  } finally {
    saving.value = false;
  }
};

const canvasToBlob = (canvas) => {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/png', 0.9);
  });
};

const uploadImage = async ($supabase, path, blob) => {
  const { error } = await $supabase.storage
    .from('cue-images')
    .upload(path, blob, {
      contentType: 'image/png',
      upsert: true,
    });
  
  if (error) throw error;
  return path;
};

// Watch for landmark changes to regenerate previews
watch(landmarks, () => {
  if (landmarks.value.length === 2) {
    nextTick(() => generatePreviews());
  }
}, { deep: true });

// Set page title
useHead({
  title: 'Admin - McWorter Cues',
});
</script>
