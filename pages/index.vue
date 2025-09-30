<template>
  <div
    class="max-w-screen-xl pt-[160px] mx-auto bg-bg border-x outside-border border-bg-100 shadow-xl shadow-[#000000]/30 relative overflow-x-hidden"
  >
    <!-- Section One Cues -->
    <CueSection :cues="sectionOneCues" wrapper-class="pt-16" />

    <!-- About Section -->
    <div class="mx-24 my-48 p-[2px] transition-opacity duration-300 border border-bg-200">
      <div class="flex gap-8 items-start p-12 border border-bg-200">
        <!-- Jerry's Image -->
        <div class="flex-shrink-0">
          <NuxtImg
            src="/images/jerry.jpg"
            alt="Jerry McWorter"
            class="h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>

        <!-- Content -->
        <div class="flex-1 text-ink">
          <h2 class="text-2xl mb-4">About Jerry McWorter</h2>
          <div class="text-ink-100 leading-relaxed space-y-4">
            <p>
              For over two decades, Jerry has been crafting precision instruments that represent the
              pinnacle of billiards excellence. Each cue is meticulously designed and handcrafted to
              deliver unparalleled performance and timeless elegance.
            </p>
            <p>
              Our commitment to quality begins with the careful selection of premium materials and
              extends through every aspect of the manufacturing process. From the initial design
              concept to the final finishing touches, every Jerry McWorter cue embodies our
              dedication to perfection.
            </p>
            <div class="pt-2">
              <NuxtLink
                to="/about"
                class="group inline-flex items-center gap-3 bg-ink text-bg px-6 py-3 rounded-lg hover:bg-ink-100 transition-colors"
              >
                <span class="font-semibold">Learn more about Jerry</span>
                <Icon
                  name="heroicons:arrow-right"
                  class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Two Cues -->
    <CueSection :cues="sectionTwoCues" add-bottom-margin />
  </div>
</template>

<script setup>
  const { getCuesBySection } = useCues();

  // Get cues by section
  const sectionOneCues = getCuesBySection("one");
  const sectionTwoCues = getCuesBySection("two");
</script>
