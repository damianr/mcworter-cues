<template>
  <!-- Hero Section -->
  <div class="relative overflow-hidden">
    <!-- Content -->
    <div
      class="relative flex flex-col items-center justify-center bg-gradient-to-b from-[rgba(0,0,0,.9)] via-[rgba(0,0,0,.5)] to-[rgba(0,0,0,0)] p-8 pt-24 pb-24"
    >
      <NuxtImg
        src="/images/logo-burl.png"
        alt="McWorter Cues Logo"
        class="h-32 w-auto mb-12"
        loading="lazy"
      />
      <h1 class="text-ink text-center mb-2 md:mb-4">
        A cue that actually plays as good as it looks
      </h1>
      <p class="text-ink-100 text-center font-light max-w-3xl mx-auto leading-relaxed">
        McWorter cues are celebrated worldwide for their precision, balance, and timeless elegance, each one a testament to creativity and craftsmanship at its finest.
      </p>
    </div>
  </div>

  <!-- Section One Cues -->
  <CueSection
    v-if="sections.one.length > 0"
    :design-ids="sections.one"
    wrapper-class="max-w-[2200px] mx-auto"
  />

  <!-- About Section -->
  <div class="py-24 md:py-32 px-4 md:px-12 text-center max-w-[1400px] mx-auto">
    <SilverTitle title="About Jerry" class="mb-6" />
    <p class="text-ink-100 font-light max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8">
      For nearly 40 years, Jerry McWorter has poured his skill and passion into crafting cues
      that blend art and precision. Every McWorter Cue shows Jerry's unique eye for materials and harmony of design, it then takes shape layer by layer until it comes alive in the players hand. His work reflects a lifetime devoted to creating cues that play as beautifully
      as they look.
    </p>

    <NuxtLink
      to="/about"
      class="inline-block text-ink-100 hover:text-ink transition-colors underline underline-offset-4"
    >
      Learn more about Jerry →
    </NuxtLink>
  </div>

  <!-- Section Two Cues -->
  <CueSection
    v-if="sections.two.length > 0"
    :design-ids="sections.two"
    add-bottom-margin
    wrapper-class="max-w-[2200px] mx-auto"
  />

  <!-- Evolution Section -->
  <div class="py-24 md:py-32 px-4 md:px-12 text-center max-w-[1400px] mx-auto">
    <SilverTitle title="The Evolution" class="mb-6" />
    <p class="text-ink-100 font-light max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8">
      Over the past thirty years, Jerry McWorter has honed a design language defined by balance,
      simplicity, and feel. What started as a quest for perfect play has matured into an art of
      proportion and flow, where every line and detail exists for a reason. His evolution shows a
      steady refinement, an artist growing more confident in letting the materials and form speak
      for themselves.
    </p>
  </div>

  <!-- Section Three Cues -->
  <CueSection
    v-if="sections.three.length > 0"
    :design-ids="sections.three"
    add-bottom-margin
    wrapper-class="max-w-[2200px] mx-auto"
  />

  <!-- ICCS Section -->
  <template v-if="sections.iccs.length > 0">
    <div class="py-24 md:py-32 px-4 md:px-12 text-center max-w-[1400px] mx-auto">
      <SilverTitle title="ICCS" class="mb-6" />
      <p class="text-ink-100 font-light max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8">
        The International Cue Collectors Show is an organization that produces a semi annual event featuring exceptional cues from master craftsmen around the world. These Cues were created for past ICCS shows.
      </p>
    </div>

    <CueSection
      :design-ids="sections.iccs"
      add-bottom-margin
      wrapper-class="max-w-[2200px] mx-auto"
    />
  </template>

  <!-- Past Cues Section -->
  <div v-if="pastCues.length > 0" class="py-24 md:py-48 px-4 md:px-12 max-w-[2200px] mx-auto">
    <SilverTitle title="Pearls from the past" class="mb-24" />

    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 max-w-5xl mx-auto">
      <div
        v-for="cue in pastCues"
        :key="cue.id"
        class="cursor-pointer"
        @click="cue.designId ? navigateToDesign(cue.designId) : openModal(getPastCueImage(cue))"
      >
        <div class="overflow-hidden rounded mb-2">
          <NuxtImg
            :src="getPastCueImage(cue)"
            :alt="`Past cue ${cue.id}`"
            class="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div class="text-ink-100 text-xs font-light text-center">
          {{ getDesignById(cue.designId)?.title || '' }}
        </div>
      </div>
    </div>
  </div>

  <!-- Image Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
        @click="closeModal"
      >
        <button
          class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
          @click="closeModal"
          aria-label="Close modal"
        >
          ×
        </button>
        <NuxtImg
          :src="selectedImage"
          alt="Past cue"
          class="max-w-full max-h-full object-contain"
          @click.stop
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  const { getAllPastCues, getDesignById, getOptimizedImageUrl, getOrderedDesignSections } = useCues();

  // Split non-ICCS designs into 3 roughly equal sections ordered by most recent cue.
  // ICCS designs are always pinned to the bottom regardless of recency.
  const sections = computed(() => {
    const { main, iccs } = getOrderedDesignSections();
    const total = main.length;
    const s1 = Math.ceil(total / 3);
    const s2 = Math.ceil((total - s1) / 2);
    return {
      one: main.slice(0, s1),
      two: main.slice(s1, s1 + s2),
      three: main.slice(s1 + s2),
      iccs,
    };
  });

  // All design IDs currently shown in CueSections (used to filter past cues)
  const allDisplayedIds = computed(() => [
    ...sections.value.one,
    ...sections.value.two,
    ...sections.value.three,
    ...sections.value.iccs,
  ]);

  // Past cues whose design isn't already shown as a regular cue section
  const pastCues = computed(() => {
    return getAllPastCues().filter((cue) => !allDisplayedIds.value.includes(cue.designId));
  });

  const getPastCueImage = (pastCue) => {
    if (!pastCue) return '';
    let url = '';
    if (pastCue.images?.main) {
      url = pastCue.images.main;
    } else if (pastCue.image) {
      url = pastCue.image.startsWith('http') ? pastCue.image
        : pastCue.image.startsWith('/') ? pastCue.image
        : `/${pastCue.image}`;
    }
    return getOptimizedImageUrl(url, { width: 400, quality: 80 });
  };

  const selectedImage = ref(null);
  const openModal = (imageUrl) => { selectedImage.value = imageUrl; };
  const closeModal = () => { selectedImage.value = null; };
  const navigateToDesign = (designId) => { navigateTo(`/design/${designId}`); };
</script>
