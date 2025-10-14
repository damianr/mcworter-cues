<template>
  <div :class="['flex flex-col gap-8 mt-12', wrapperClass]">
    <!-- Loading State -->
    <div v-if="isFullCue === null" class="flex justify-center items-center min-h-[200px]">
      <div class="text-ink-200 text-sm">Loading...</div>
    </div>

    <!-- Content -->
    <template v-else>
      <div
        v-for="cue in cues"
        :key="cue.id"
        class="cursor-pointer mb-12 md:mb-24 last:mb-0 relative group/item"
        :class="{
          'px-8': isFullCue,
        }"
        @click="navigateToCue(cue.id)"
      >
        <!-- Images -->
        <div class="flex gap-4 flex-shrink-0 rounded-md">
          <NuxtImg
            :src="isFullCue ? cue.images[4] : cue.images[1]"
            :alt="cue.title"
            class="w-full object-fill transition-all duration-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.05)] group-hover/item:drop-shadow-[0_0_24px_rgba(255,255,255,0.1)]"
            loading="lazy"
          />
        </div>

        <!-- Content - Full Cue Mode -->
        <div
          v-if="isFullCue"
          class="mt-4 text-right pr-4 md:pr-8 opacity-100 md:opacity-0 md:group-hover/item:opacity-100 transition-opacity duration-400"
        >
          <h4 class="text-xs md:text-sm font-bold text-ink mb-0 leading-none">
            {{ cue.title }}
          </h4>
          <div class="text-[10px] text-ink-200 leading-none">#{{ cue.id }}</div>
        </div>

        <!-- Content - Normal Mode -->
        <div
          v-else
          class="absolute top-[50%] right-4 md:right-8 opacity-100 md:opacity-0 md:group-hover/item:opacity-100 md:group-hover/item:top-[40%] transition-all duration-400"
        >
          <h4 class="text-sm md:text-base font-bold text-ink mb-0 leading-none">
            {{ cue.title }}
          </h4>
          <div class="text-xs text-ink-200 font-mono">#{{ cue.id }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
  const props = defineProps({
    cueIds: {
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

  const { getCuesByIds } = useCues();

  // Get cues from IDs
  const cues = computed(() => getCuesByIds(props.cueIds));

  // Detect screen width for responsive full-cue mode
  const isFullCue = ref(null); // null = not determined yet, true/false = determined

  const updateFullCueMode = () => {
    isFullCue.value = window.innerWidth >= 768;
  };

  onMounted(() => {
    updateFullCueMode();
    window.addEventListener("resize", updateFullCueMode);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateFullCueMode);
  });

  const navigateToCue = (id) => {
    navigateTo(`/cue/${id}`);
  };
</script>
