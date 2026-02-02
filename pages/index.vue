<template>
  <!-- Hero Section -->
  <div class="relative overflow-hidden">
    <!-- Video Background -->
    <!-- <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover">
      <source src="/images/hero-vid.mov" type="video/mp4" />
    </video> -->

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
    :design-ids="['regal', 'florentine', 'venetian', 'victorian-crown', 'pinnacle']"
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
    :design-ids="[
      'royal',
      'silver-smoke',
      'points-interrupted',
      'six-points',
      'ivory-crown',
    ]"
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

    <!-- <NuxtLink
      to="/evolution"
      class="inline-block text-ink-100 hover:text-ink transition-colors underline underline-offset-4"
    >
      View the evolution →
    </NuxtLink> -->
  </div>

  <!-- Section Three Cues -->
  <CueSection
    :design-ids="['deco', 'anniversary', 'engrave', 'aztec']"
    add-bottom-margin
    wrapper-class="max-w-[2200px] mx-auto"
  />

  <!-- ICCS Section -->
  <div class="py-24 md:py-32 px-4 md:px-12 text-center max-w-[1400px] mx-auto">
    <SilverTitle title="ICCS" class="mb-6" />
    <p class="text-ink-100 font-light max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8">
      The International Cue Collectors Show is an organization that produces a semi annual event featuring exceptional cues from master craftsmen around the world. These Cues were created for past ICCS shows.
    </p>
  </div>

  <!-- ICCS Cues -->
  <CueSection
    :design-ids="['map', 'feather']"
    add-bottom-margin
    wrapper-class="max-w-[2200px] mx-auto"
  />

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
  const { getAllPastCues, getDesignById, loading } = useCues();

  // Design IDs that are already displayed in CueSection components
  const displayedDesignIds = [
    "regal",
    "florentine",
    "venetian",
    "victorian-crown",
    "pinnacle",
    "royal",
    "silver-smoke",
    "points-interrupted",
    "six-points",
    "ivory-crown",
    "deco",
    "anniversary",
    "engrave",
    "aztec",
    "map",
    "feather",
  ];

  // Filter past cues to only show those whose design isn't already displayed
  const pastCues = computed(() => {
    const allPastCues = getAllPastCues();
    return allPastCues.filter((cue) => !displayedDesignIds.includes(cue.designId));
  });

  // Helper to get past cue image URL
  const getPastCueImage = (pastCue) => {
    if (!pastCue) return '';
    // Supabase format: images.main contains full URL
    if (pastCue.images?.main) {
      return pastCue.images.main;
    }
    // Backwards compatible format: image property
    if (pastCue.image) {
      if (pastCue.image.startsWith('http')) {
        return pastCue.image;
      }
      return pastCue.image.startsWith('/') ? pastCue.image : `/${pastCue.image}`;
    }
    return '';
  };

  const selectedImage = ref(null);

  const openModal = (imageUrl) => {
    selectedImage.value = imageUrl;
  };

  const closeModal = () => {
    selectedImage.value = null;
  };

  const navigateToDesign = (designId) => {
    navigateTo(`/design/${designId}`);
  };
</script>
