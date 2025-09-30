<template>
  <div
    class="max-w-screen-2xl min-h-screen pt-[160px] mx-auto border-x border-[#191919] shadow-xl shadow-[#080808]/60"
  >
    <div class="px-24 py-16">
      <!-- About Section -->
      <div class="p-12 border border-bg-200">
        <div class="flex gap-8 items-start">
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
            <h1 class="mb-4">About Jerry McWorter</h1>
            <div class="text-ink-100 leading-relaxed space-y-4">
              <p>
                For over two decades, Jerry has been crafting precision instruments that represent
                the pinnacle of billiards excellence. Each cue is meticulously designed and
                handcrafted to deliver unparalleled performance and timeless elegance.
              </p>
              <p>
                Our commitment to quality begins with the careful selection of premium materials and
                extends through every aspect of the manufacturing process. From the initial design
                concept to the final finishing touches, every Jerry McWorter cue embodies our
                dedication to perfection.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Biography -->
      <div class="mt-12 p-12 border border-bg-200">
        <div class="text-ink-100 leading-relaxed space-y-8 max-w-4xl">
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-ink">Claims to Fame</h2>
            <ul class="space-y-2">
              <li>• American Cuemakers Association Board of Directors: 1996-1998</li>
              <li>• American Cuemakers Association President: 1998-2000</li>
              <li>• Co-Producer of the prestigious Gallery of American Cue Art</li>
              <li>• Winner of the Best of Show Award for the "Ebony Jewel" cue 1999</li>
              <li>
                • Billiards technical director and advisor for commercials, TV shows and feature
                films
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-ink">Early Life & Magic</h2>
            <p>
              Born in Glendale, California, Jerry grew up in La Crescenta. At age 13, Mormon
              missionaries staying in the family guesthouse showed him a card trick. When he asked
              how it was done, they answered, "You figure it out." He did - and came up with a more
              creative way to do it.
            </p>
            <p>
              This sparked his love for magic. By 15, he was working as house magician at a local
              L.A. restaurant, making $100 a night. He became a regular Sunday matinee performer at
              Hollywood's famous Magic Castle, alongside contemporaries like Lance Burton. At 16, he
              won the Pacific Coast Association for Magicians for best close-up magic in the over 21
              category.
            </p>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-ink">Pool & First Cue</h2>
            <p>
              In 1982, when Jerry was 17, fellow magician and pool player Dean Dill introduced him
              to pool for money. Jerry quickly learned the basics and began seeing local greats like
              Ismael "Morro" Paez and Keith McCready play in L.A.
            </p>
            <p>
              His senior year in high school, Jerry made his first pool cue in wood shop - the very
              first McWorter Cue was born. "Like all first cues," he admits, "it was less than
              wonderful."
            </p>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-ink">Birth of McWorter Custom Cues</h2>
            <p>
              After returning from a Mormon mission (1983-1985) and facing California's construction
              industry downturn, Jerry saw the need for simple, affordable player-style cues. When
              friend John Robinson declined to make his design, saying "there's too much work for
              too little money," Jerry decided to make it himself.
            </p>
            <p>
              Working 70-80 hours a week, out of money with rent late, Jerry sold his first cue for
              $200 in late 1988. McWorter Custom Cues was officially in business.
            </p>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-ink">Evolution & Recognition</h2>
            <p>
              "I made a lot of ugly cues in the early days," Jerry admits, "but they played good!
              One of my smarter business moves was not putting my name on those early ones."
            </p>
            <p>
              After discovering Robinson was right about simple cues, Jerry added embellishments and
              six-point designs. He insisted on doing all his own work rather than using catalog
              parts, determined to learn every technique for the long haul.
            </p>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-ink">The Gallery of American Cue Art</h2>
            <p>
              In 1995, Jerry joined with Thomas Wayne and Chuck Montique to produce the "Showcase of
              American Cue Art" (later "The Gallery of American Cue Art"). This unique concept
              served as a genuine turning point in cue making history, showcasing the "art" of cue
              making in the style this functional art form deserved.
            </p>
          </div>

          <div class="border-t border-ink-100/20 pt-6 mt-8">
            <p class="text-ink-200 font-mono text-sm text-center">
              Timeless performance. Uncompromising quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Set page title
  useHead({
    title: "The Cue Maker - Jerry McWorter",
  });
</script>
