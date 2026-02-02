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

      <!-- Cue Form -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left: Upload & Annotation -->
        <div class="space-y-6">
          <!-- Design Selection -->
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

          <!-- Cue ID -->
          <div>
            <label class="block text-sm text-ink-100 mb-2">Cue ID</label>
            <input
              v-model="cueId"
              type="number"
              class="w-full px-4 py-3 bg-bg-100 border border-ink-200 rounded-lg focus:outline-none focus:border-ink text-ink"
              placeholder="e.g. 2345"
            />
          </div>

          <!-- Image Upload -->
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

          <!-- Landmark Annotation -->
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
        </div>

        <!-- Right: Preview -->
        <div class="space-y-6">
          <h2 class="text-lg font-medium">Generated Images Preview</h2>
          
          <div v-if="!canGenerate" class="text-ink-100 text-sm">
            Upload an image and mark both wrap boundaries to preview generated images.
          </div>
          
          <div v-else class="space-y-6">
            <!-- List Images Preview -->
            <div>
              <h3 class="text-sm text-ink-100 mb-2">List Images (Homepage)</h3>
              <div class="space-y-2">
                <div class="bg-bg-100 rounded-lg p-2">
                  <canvas ref="listCanvas1" class="w-full h-auto"></canvas>
                  <p class="text-xs text-ink-200 mt-1">Full cue (list/0)</p>
                </div>
                <div class="bg-bg-100 rounded-lg p-2">
                  <canvas ref="listCanvas2" class="w-full h-auto"></canvas>
                  <p class="text-xs text-ink-200 mt-1">Cropped (list/1)</p>
                </div>
              </div>
            </div>
            
            <!-- Detail Images Preview -->
            <div>
              <h3 class="text-sm text-ink-100 mb-2">Detail Images (Detail Page)</h3>
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-bg-100 rounded-lg p-2">
                  <canvas ref="detailCanvas1" class="w-full h-auto"></canvas>
                  <p class="text-xs text-ink-200 mt-1">Angled composite (details/0)</p>
                </div>
                <div class="bg-bg-100 rounded-lg p-2">
                  <canvas ref="detailCanvas2" class="w-full h-auto"></canvas>
                  <p class="text-xs text-ink-200 mt-1">Full horizontal (details/1)</p>
                </div>
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
    </div>
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
  
  // Crop to show wrap area with some padding
  const padding = 0.1; // 10% padding on each side
  const cropStart = Math.max(0, wrapStart - padding);
  const cropEnd = Math.min(1, wrapEnd + padding);
  
  const srcX = cropStart * img.naturalWidth;
  const srcWidth = (cropEnd - cropStart) * img.naturalWidth;
  
  canvas.width = srcWidth;
  canvas.height = img.naturalHeight;
  
  ctx.drawImage(
    img,
    srcX, 0, srcWidth, img.naturalHeight,
    0, 0, srcWidth, img.naturalHeight
  );
};

const generateDetailImage1 = (img, noseEnd, buttStart) => {
  const canvas = detailCanvas1.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Extract nose section (left part up to wrap start)
  const noseWidth = noseEnd * img.naturalWidth;
  
  // Extract butt section (right part from wrap end)
  const buttX = buttStart * img.naturalWidth;
  const buttWidth = img.naturalWidth - buttX;
  
  // Calculate canvas size for angled composition
  const angle = 15 * (Math.PI / 180); // 15 degrees
  const canvasWidth = Math.max(noseWidth, buttWidth) * 1.5;
  const canvasHeight = img.naturalHeight * 3;
  
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw nose section (angled)
  ctx.save();
  ctx.translate(canvasWidth * 0.5, canvasHeight * 0.25);
  ctx.rotate(-angle);
  ctx.drawImage(
    img,
    0, 0, noseWidth, img.naturalHeight,
    -noseWidth / 2, -img.naturalHeight / 2, noseWidth, img.naturalHeight
  );
  ctx.restore();
  
  // Draw butt section (angled opposite)
  ctx.save();
  ctx.translate(canvasWidth * 0.5, canvasHeight * 0.75);
  ctx.rotate(angle);
  ctx.drawImage(
    img,
    buttX, 0, buttWidth, img.naturalHeight,
    -buttWidth / 2, -img.naturalHeight / 2, buttWidth, img.naturalHeight
  );
  ctx.restore();
};

const generateDetailImage2 = (img) => {
  const canvas = detailCanvas2.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);
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
