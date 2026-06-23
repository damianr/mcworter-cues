<template>
  <div
    class="max-w-screen-2xl min-h-screen pt-12 md:pt-24 mx-auto border-x-0 md:border-x border-[#191919] md:shadow-xl md:shadow-[#080808]/60"
  >
    <div class="px-4 md:px-24 py-8 md:py-16">
      <!-- Introduction Section -->
      <div class="mb-12 md:mb-16">
        <SilverTitle title="Pool Instruction" class="mb-6 md:mb-8" />
        <div class="max-w-4xl mx-auto text-center space-y-4">
          <p class="text-ink-100 text-sm md:text-base leading-relaxed">
            Tips, drills, and technique from Jerry McWorter. Watch and learn from decades of
            experience at the table.
          </p>
        </div>
      </div>

      <!-- Videos Section -->
      <div class="w-full">
        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div class="flex flex-col items-center">
            <div class="relative w-full max-w-[267px] bg-black rounded overflow-hidden" style="padding-bottom: 177.78%">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/YevdXc_od8w"
                title="Pool Instruction"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="relative w-full max-w-[267px] bg-black rounded overflow-hidden" style="padding-bottom: 177.78%">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/7knlPqrcp0I"
                title="Pool Instruction"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="relative w-full max-w-[267px] bg-black rounded overflow-hidden" style="padding-bottom: 177.78%">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/zrTiRtlLC-Q"
                title="Pool Instruction"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="relative w-full max-w-[267px] bg-black rounded overflow-hidden" style="padding-bottom: 177.78%">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/bN7xgWx_WhE"
                title="Pool Instruction"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Set page title
  useHead({
    title: "Pool Instruction - Jerry McWorter",
  });
</script>
