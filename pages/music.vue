<template>
  <div
    class="max-w-screen-2xl min-h-screen pt-12 md:pt-24 mx-auto border-x-0 md:border-x border-[#191919] md:shadow-xl md:shadow-[#080808]/60"
  >
    <div class="px-4 md:px-24 py-8 md:py-16">
      <!-- Introduction Section -->
      <div class="mb-12 md:mb-16">
        <SilverTitle title="Jerry's Music" class="mb-6 md:mb-8" />
        <div class="max-w-4xl mx-auto text-center space-y-4">
          <p class="text-ink-100 text-sm md:text-base leading-relaxed">
            Jerry is the lead singer and drummer for Hot Roux. Hot Roux is a totally original band
            from Ventura California that has been playing and touring for more than 18 years.
          </p>
          <p class="text-ink-100 text-sm md:text-base leading-relaxed">
            Jerry has been writing songs and recording with his musical partner Brent Harding for
            nearly 30 years.
          </p>
        </div>
      </div>

      <!-- Videos Section -->
      <div class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <!-- Video 1 -->
          <div class="space-y-3">
            <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/KW-0oER5HKg?si=cJyUonZ6XkDZzh-F"
                title="Hot Roux - YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <!-- Video 2 -->
          <div class="space-y-3">
            <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/4s8nXXkVCqM?si=u-19AB93SXPU76tc"
                title="Hot Roux - YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <!-- Video 3 -->
          <div class="space-y-3">
            <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/qwq1KRrpxro?si=O8d0jsUGJP_1hpoO"
                title="Hot Roux - YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <!-- Video 4 -->
          <div class="space-y-3">
            <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/rjbiDbky8uk?si=23YYc45L0hORJR1_"
                title="Hot Roux - YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <!-- Video 5 -->
          <div class="space-y-3">
            <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/TGcDlhmDP6E?si=R0tlrTPLPWriXR1Q"
                title="Hot Roux - YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <!-- Video 6 -->
          <div class="space-y-3">
            <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/yiu_BnOqDcA?si=aNw-Jxv0_W2UiIT-"
                title="Hot Roux - YouTube video player"
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
    title: "Jerry's Music - Hot Roux",
  });
</script>
