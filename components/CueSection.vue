<template>
  <div :class="['flex flex-col gap-8', wrapperClass]">
    <div
      v-for="cue in cues"
      :key="cue.id"
      class="cursor-pointer mb-12 md:mb-24 relative group/item transition-opacity duration-400"
      :class="{
        'opacity-75': hoveredCueId !== null && hoveredCueId !== cue.id,
        'opacity-100': hoveredCueId === null || hoveredCueId === cue.id,
      }"
      @click="navigateToCue(cue.id)"
      @mouseenter="hoveredCueId = cue.id"
      @mouseleave="hoveredCueId = null"
    >
      <!-- Images -->
      <div class="flex gap-4 flex-shrink-0 rounded-md">
        <NuxtImg
          :src="cue.images[1]"
          :alt="cue.title"
          class="w-full object-fill transition-all duration-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.05)] group-hover/item:drop-shadow-[0_0_24px_rgba(255,255,255,0.1)]"
          loading="lazy"
        />
      </div>

      <!-- Content -->
      <div
        class="absolute top-[50%] right-4 md:right-8 opacity-100 md:opacity-0 md:group-hover/item:opacity-100 md:group-hover/item:top-[40%] transition-all duration-400"
      >
        <h4 class="text-sm md:text-base font-bold text-ink mb-0 leading-none">
          {{ cue.title }}
        </h4>
        <span class="text-xs text-ink-200 font-mono">#{{ cue.id }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    cues: {
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

  // Track which cue is being hovered
  const hoveredCueId = ref(null);

  const navigateToCue = (id) => {
    navigateTo(`/cue/${id}`);
  };
</script>
