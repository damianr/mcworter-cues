<template>
  <div
    :class="[
      [
        'cue-vignette relative overflow-hidden flex flex-col gap-8 border-y border-bg-200 px-4 md:px-8',
        title ? 'pt-[100px] pb-[200px]' : 'py-[200px]',
      ],
      wrapperClass,
    ]"
  >
    <!-- Loading State -->
    <div v-if="isFullCue === null" class="flex justify-center items-center min-h-[200px]">
      <div class="text-ink-200 text-sm">Loading...</div>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- INSERT_YOUR_CODE -->
      <SilverTitle v-if="title" :title="title" class="mb-12 md:mb-16" />
      <div
        v-for="design in designs"
        :key="design.designId"
        class="cursor-pointer mb-12 md:mb-24 last:mb-0 relative group/item"
        :class="{
          'px-8': isFullCue,
        }"
        @click="navigateToDesign(design.designId)"
      >
        <!-- Images -->
        <div class="flex gap-4 flex-shrink-0 rounded-md">
          <NuxtImg
            :src="getCurrentImageSrc(design)"
            :alt="design.title"
            class="w-full object-fill"
            loading="lazy"
          />
        </div>

        <!-- Content - Full Cue Mode -->
        <div
          v-if="isFullCue"
          class="mt-4 text-center opacity-100 md:opacity-0 md:group-hover/item:opacity-100 transition-opacity duration-400"
        >
          <h4 class="text-xs md:text-sm font-bold text-ink mb-2 leading-none">
            {{ design.title }}
          </h4>
          <!-- Variant Dots -->
          <div
            v-if="design.cues.length > 1"
            class="flex justify-center gap-2"
            @click.stop
          >
            <button
              v-for="(cue, index) in design.cues"
              :key="cue.id"
              :class="[
                'w-2 h-2 rounded-full transition-all duration-200',
                (currentCueIndices[design.designId] || 0) === index
                  ? 'bg-ink scale-125'
                  : 'bg-ink-200 hover:bg-ink-100',
              ]"
              @mouseenter="setCueIndex(design.designId, index)"
              @click="setCueIndex(design.designId, index)"
              :aria-label="`Switch to variant ${index + 1}`"
            />
          </div>
        </div>

        <!-- Content - Normal Mode -->
        <div
          v-else
          class="absolute top-[50%] right-4 md:right-8 opacity-100 md:opacity-0 md:group-hover/item:opacity-100 md:group-hover/item:top-[40%] transition-all duration-400"
        >
          <h4 class="text-sm md:text-base font-bold text-ink mb-2 leading-none">
            {{ design.title }}
          </h4>
          <div class="text-xs text-ink-200 font-mono mb-2">#{{ getCurrentCue(design).id }}</div>
          <!-- Variant Dots -->
          <div
            v-if="design.cues.length > 1"
            class="flex gap-2"
            @click.stop
          >
            <button
              v-for="(cue, index) in design.cues"
              :key="cue.id"
              :class="[
                'w-2 h-2 rounded-full transition-all duration-200',
                (currentCueIndices[design.designId] || 0) === index
                  ? 'bg-ink scale-125'
                  : 'bg-ink-200 hover:bg-ink-100',
              ]"
              @mouseenter="setCueIndex(design.designId, index)"
              @click="setCueIndex(design.designId, index)"
              :aria-label="`Switch to variant ${index + 1}`"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      default: "",
    },
    designIds: {
      type: Array,
      required: true,
    },
    wrapperClass: {
      type: String,
      default: "",
    },
    addBottomMargin: {
      type: Boolean,
      default: false,
    },
  });

  const { getDesignsWithAllCues } = useCues();

  // Get all designs with all their cues
  const designs = computed(() => getDesignsWithAllCues(props.designIds));

  // Track current cue index for each design
  const currentCueIndices = ref({});

  // Detect screen width for responsive full-cue mode
  const isFullCue = ref(null); // null = not determined yet, true/false = determined

  const updateFullCueMode = () => {
    isFullCue.value = window.innerWidth >= 768;
  };

  // Initialize cue index for a design
  const initializeCueIndex = (designId) => {
    if (currentCueIndices.value[designId] === undefined) {
      currentCueIndices.value[designId] = 0;
    }
  };

  // Get the current image source for a design
  const getCurrentImageSrc = (design) => {
    initializeCueIndex(design.designId);
    const currentIndex = currentCueIndices.value[design.designId] || 0;
    const currentCue = design.cues[currentIndex];
    return isFullCue.value ? currentCue.images.list[1] : currentCue.images.list[2];
  };

  // Get the current cue for a design
  const getCurrentCue = (design) => {
    initializeCueIndex(design.designId);
    const currentIndex = currentCueIndices.value[design.designId] || 0;
    return design.cues[currentIndex];
  };

  // Set cue index manually
  const setCueIndex = (designId, index) => {
    currentCueIndices.value[designId] = index;
  };

  onMounted(() => {
    updateFullCueMode();
    window.addEventListener("resize", updateFullCueMode);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateFullCueMode);
  });

  const navigateToDesign = (designId) => {
    navigateTo(`/design/${designId}`);
  };
</script>

<style scoped>
  .cue-vignette {
    position: relative;
    z-index: 0; /* create stacking context */
  }

  /* ensure content sits above vignettes */
  .cue-vignette > * {
    position: relative;
    z-index: 1;
  }

  .cue-vignette::before,
  .cue-vignette::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    pointer-events: none;
    z-index: 0; /* behind content */
  }

  .cue-vignette::before {
    top: 0;
    height: 24rem;
    background: radial-gradient(120% 70% at 50% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  }

  .cue-vignette::after {
    bottom: 0;
    height: 24rem;
    background: radial-gradient(
      120% 70% at 50% 100%,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 40%
    );
  }

  @media (min-width: 768px) {
    .cue-vignette::before {
      height: 32rem;
    }
    .cue-vignette::after {
      height: 32rem;
    }
  }
</style>
