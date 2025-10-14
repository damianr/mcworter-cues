<template>
  <div>
    <!-- Hero Section -->
    <div class="pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-12 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-ink mb-2 md:mb-4">Timeless Performance</h1>
        <p class="text-ink-100 font-light max-w-3xl mx-auto leading-relaxed">
          Jerry McWorter's cues are celebrated worldwide for their precision, balance, and enduring
          beauty, each one a testament to creativity and craftsmanship at its finest.
        </p>
      </div>
    </div>

    <!-- Section One Cues -->
    <CueSection :cue-ids="[202, 2335, 2311]" wrapper-class="pt-8 md:pt-16" />

    <!-- About Section -->
    <div class="py-24 md:py-48 px-4 md:px-12 text-center">
      <div class="mx-auto">
        <!-- Top border decoration -->
        <div class="mb-12 md:mb-16">
          <DecorativeBorder />
        </div>

        <h1 class="text-ink mb-2 md:mb-4">About Jerry</h1>
        <p class="text-ink-100 font-light max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8">
          For more than 30 years, Jerry McWorter has poured his skill and passion into crafting cues
          that blend art and precision. Every McWorter cue begins with his careful eye for materials
          and balance, then takes shape through his hands, layer by layer, until it feels alive in
          the player's grip. His work reflects a lifetime devoted to creating cues that play as
          beautifully as they look.
        </p>

        <NuxtLink
          to="/about"
          class="inline-block text-ink-100 hover:text-ink transition-colors underline underline-offset-4"
        >
          Learn more about Jerry →
        </NuxtLink>

        <!-- Bottom border decoration -->
        <div class="mt-12 md:mt-16">
          <DecorativeBorder />
        </div>
      </div>
    </div>

    <!-- Section Two Cues -->
    <CueSection :cue-ids="[2312, 2322, 2335]" add-bottom-margin />

    <!-- Evolution Section -->
    <div class="py-24 md:py-48 px-4 md:px-12 text-center">
      <div class="mx-auto">
        <!-- Top border decoration -->
        <div class="mb-12 md:mb-16">
          <DecorativeBorder />
        </div>

        <h1 class="text-ink mb-2 md:mb-4">The Evolution</h1>
        <p class="text-ink-100 font-light max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8">
          Over the past thirty years, Jerry McWorter has honed a design language defined by balance,
          simplicity, and feel. What started as a quest for perfect play has matured into an art of
          proportion and flow, where every line and detail exists for a reason. His evolution shows
          a steady refinement, an artist growing more confident in letting the materials and form
          speak for themselves.
        </p>

        <NuxtLink
          to="/evolution"
          class="inline-block text-ink-100 hover:text-ink transition-colors underline underline-offset-4"
        >
          View the evolution →
        </NuxtLink>

        <!-- Bottom border decoration -->
        <div class="mt-12 md:mt-16">
          <DecorativeBorder />
        </div>
      </div>
    </div>

    <!-- Section Three Cues -->
    <CueSection :cue-ids="[2311, 202, 2322]" add-bottom-margin />
  </div>
</template>

<script setup></script>
