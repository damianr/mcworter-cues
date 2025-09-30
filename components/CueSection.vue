<template>
  <div :class="['flex flex-col gap-8', wrapperClass]">
    <div
      v-for="cue in cues"
      :key="cue.id"
      class="cursor-pointer relative group/item transition-opacity duration-300"
      :class="{
        'opacity-50': hoveredCueId !== null && hoveredCueId !== cue.id,
        'opacity-100': hoveredCueId === null || hoveredCueId === cue.id,
        'mb-24': addBottomMargin,
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
          class="w-full object-fill group-hover/item:scale-[1.01] transition-all duration-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.05)] group-hover/item:drop-shadow-[0_0_24px_rgba(255,255,255,0.1)]"
          loading="lazy"
        />
      </div>

      <!-- Content -->
      <div
        class="absolute top-[50%] right-8 group-hover/item:opacity-100 group-hover/item:top-[40%] opacity-0 transition-all"
      >
        <h4 class="text-base font-bold text-ink mb-0 leading-none">
          {{ cue.title }}
        </h4>
        <span class="text-xs text-ink-200 font-mono">Serial number {{ cue.id }}</span>
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
