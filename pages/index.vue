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
        Jerry McWorter's cues are celebrated worldwide for their precision, balance, and enduring
        beauty, each one a testament to creativity and craftsmanship at its finest.
      </p>
    </div>
  </div>

  <!-- Section One Cues -->
  <CueSection
    :design-ids="['regal', 'florentine', 'venetian', 'victorian-crown', 'map', 'aztec']"
    wrapper-class="max-w-[2200px] mx-auto"
    title="Recent designs"
  />

  <!-- About Section -->
  <div class="py-24 md:py-32 px-4 md:px-12 text-center max-w-[1400px] mx-auto">
    <SilverTitle title="About Jerry" class="mb-6" />
    <p class="text-ink-100 font-light max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8">
      For more than 30 years, Jerry McWorter has poured his skill and passion into crafting cues
      that blend art and precision. Every McWorter cue begins with his careful eye for materials and
      balance, then takes shape through his hands, layer by layer, until it feels alive in the
      player's grip. His work reflects a lifetime devoted to creating cues that play as beautifully
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
      'pinnacle',
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
    :design-ids="['deco', 'anniversary', 'engrave', 'feather']"
    add-bottom-margin
    wrapper-class="max-w-[2200px] mx-auto"
  />

  <!-- Past Cues Section -->
  <div v-if="pastCues.length > 0" class="py-24 md:py-48 px-4 md:px-12 max-w-[2200px] mx-auto">
    <SilverTitle title="Past cues" class="mb-24" />

    <div class="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-8 max-w-5xl mx-auto">
      <div
        v-for="cue in pastCues"
        :key="cue.image"
        class="overflow-hidden rounded cursor-pointer"
        @click="openModal(cue.image)"
      >
        <NuxtImg
          :src="`/${cue.image}`"
          :alt="`Past cue ${cue.image}`"
          class="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
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
          :src="`/${selectedImage}`"
          :alt="`Past cue ${selectedImage}`"
          class="max-w-full max-h-full object-contain"
          @click.stop
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  const { getAllPastCues } = useCues();
  const allPastCues = getAllPastCues();

  // Design IDs that are already displayed in CueSection components
  const displayedDesignIds = [
    "regal",
    "florentine",
    "venetian",
    "victorian-crown",
    "map",
    "aztec",
    "royal",
    "silver-smoke",
    "points-interrupted",
    "six-points",
    "ivory-crown",
    "pinnacle",
    "deco",
    "anniversary",
    "engrave",
    "feather",
  ];

  // Filter past cues to only show those whose design isn't already displayed
  const pastCues = computed(() => {
    return allPastCues.filter((cue) => !displayedDesignIds.includes(cue.designId));
  });

  const selectedImage = ref(null);

  const openModal = (cue) => {
    selectedImage.value = cue;
  };

  const closeModal = () => {
    selectedImage.value = null;
  };
</script>
