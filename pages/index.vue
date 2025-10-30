<template>
  <!-- Hero Section -->
  <div class="relative h-[90vh] w-[100vw] overflow-hidden">
    <!-- Video Background -->
    <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover">
      <source src="/images/hero-vid.mov" type="video/mp4" />
    </video>

    <!-- Content -->
    <div
      class="relative flex flex-col items-center justify-center bg-gradient-to-b from-[rgba(0,0,0,.9)] via-[rgba(0,0,0,.5)] to-[rgba(0,0,0,0)] p-8 pt-48 pb-24"
    >
      <h1 class="text-ink text-center mb-2 md:mb-4">Timeless Performance</h1>
      <p class="text-ink-100 text-center font-light max-w-3xl mx-auto leading-relaxed">
        Jerry McWorter's cues are celebrated worldwide for their precision, balance, and enduring
        beauty, each one a testament to creativity and craftsmanship at its finest.
      </p>
    </div>
  </div>

  <!-- Section One Cues -->
  <CueSection
    :design-ids="['regal', 'florentine', 'venetian', 'victorian_crown']"
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
    :design-ids="['deco', 'silver-smoke', 'points_interupted']"
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

    <NuxtLink
      to="/evolution"
      class="inline-block text-ink-100 hover:text-ink transition-colors underline underline-offset-4"
    >
      View the evolution →
    </NuxtLink>
  </div>

  <!-- Section Three Cues -->
  <CueSection
    :design-ids="['royal', 'anniversary', 'engrave']"
    add-bottom-margin
    wrapper-class="max-w-[2200px] mx-auto"
  />

  <!-- Past Cues Section -->
  <div class="py-24 md:py-48 px-4 md:px-12 max-w-[2200px] mx-auto">
    <SilverTitle title="Past cues" class="mb-24" />

    <div class="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-8 max-w-5xl mx-auto">
      <div
        v-for="cue in pastCues"
        :key="cue"
        class="overflow-hidden rounded cursor-pointer"
        @click="openModal(cue)"
      >
        <NuxtImg
          :src="`/images/past-cues/${cue}`"
          :alt="`Past cue ${cue}`"
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
        <img
          :src="`/images/past-cues/${selectedImage}`"
          :alt="`Past cue ${selectedImage}`"
          class="max-w-full max-h-full object-contain"
          @click.stop
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  const pastCues = [
    "1163.jpg",
    "1167.jpg",
    "1169.jpg",
    "1174.jpg",
    "1246.jpg",
    "1250.jpg",
    "1252.jpg",
    "1281.jpg",
    "1287.jpg",
    "1290.jpg",
    "1444.jpg",
    "1449.jpg",
    "1453.jpg",
    "1463.jpg",
    "1481.jpg",
    "1485.jpg",
    "1516.jpg",
    "1523.jpg",
    "1541.jpg",
    "1543.jpg",
    "1605.jpg",
    "1608.jpg",
    "1625.jpg",
    "1716.jpeg",
    "1772.jpg",
  ];

  const selectedImage = ref(null);

  const openModal = (cue) => {
    selectedImage.value = cue;
  };

  const closeModal = () => {
    selectedImage.value = null;
  };
</script>
