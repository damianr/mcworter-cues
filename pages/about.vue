<template>
  <div
    class="max-w-screen-2xl min-h-screen pt-12 md:pt-24 mx-auto border-x-0 md:border-x border-[#191919] md:shadow-xl md:shadow-[#080808]/60"
  >
    <div class="px-4 md:px-24 py-8 md:py-16">
      <!-- Biography -->
      <div class="p-6 md:p-12">
        <div class="text-ink-100 leading-relaxed space-y-6 md:space-y-8 text-sm md:text-base">
          <!-- Claims to Fame with Image -->
          <div class="flex flex-col md:flex-row gap-6 md:gap-8">
            <!-- Jerry's Image -->
            <div class="flex-shrink-0 flex justify-center md:justify-start">
              <NuxtImg
                src="/images/jerry.jpg"
                alt="Jerry McWorter"
                class="w-64 h-64 object-cover rounded-lg aspect-square"
                loading="lazy"
              />
            </div>

            <!-- Accolades Content -->
            <div class="space-y-3 md:space-y-4 flex-1">
              <h2 class="text-xl md:text-2xl font-semibold text-ink">Accolades</h2>
              <ul class="space-y-2">
                <li>• American Cuemakers Association Board of Directors: 1996-1998</li>
                <li>• American Cuemakers Association President: 1998-2000</li>
                <li>• Creator and co-producer of the prestigious Gallery of American Cue Art</li>
                <li>• Winner of the Best of Show Award for the "Ebony Jewel" cue 1999</li>
                <li>
                  • Billiards technical director and advisor for commercials, TV shows and feature
                  films
                </li>
                <li>• 2025 recipient of the Trail Blazers Award from The International Cue Collectors show</li>
                <li>• 2024 inducted into the American Cue Makers Hall of Fame</li>
              </ul>
            </div>
          </div>

          <!-- Hall of Fame and Trail Blazers Videos -->
          <div class="space-y-6 md:space-y-8 mt-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              <!-- Hall of Fame Video -->
              <div>
                <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
                  <iframe
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/7loVTbuYaT8"
                    title="Hall of Fame Induction"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
              <!-- Trail Blazers Video -->
              <div>
                <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
                  <iframe
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/OCXfjm_zr_g?si=6OxtWlqzxiH8_lMS"
                    title="Trail Blazers Award"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3 md:space-y-4">
            <h2 class="text-xl md:text-2xl font-semibold text-ink">Early Life & Magic</h2>
            <p>
              Born in Glendale, California, Jerry grew up in La Crescenta. At age 13, Mormon
              missionaries staying in the family guesthouse showed him a card trick. When he asked
              how it was done, they answered, "You figure it out." He did - and came up with a more
              creative way to do it.
            </p>
            <p>
              This sparked his love for magic. By 15, he was working as house magician at a local
              L.A. restaurant, making $100 a night. He became a regular Sunday matinee performer at
              Hollywood's famous Magic Castle, alongside contemporaries like Lance Burton. At 17, he
              won the Pacific Coast Association for Magicians for best close-up magic in the over 21
              category.
            </p>
            <!-- Magic Castle Videos -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              <!-- From Magic Castle to Master Cues -->
              <div>
                <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
                  <iframe
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/tPYe58LByU4"
                    title="From Magic Castle to Master Cues"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
              <!-- Sneaking Into Pool Halls & Learning the Hard Way -->
              <div>
                <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
                  <iframe
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/ttTy9DbI71E"
                    title="Sneaking Into Pool Halls & Learning the Hard Way"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3 md:space-y-4">
            <h2 class="text-xl md:text-2xl font-semibold text-ink">
              The Gallery of American Cue Art
            </h2>
            <p>
              In 1995 Jerry dreamed up the idea of having a "stand alone cue show" featuring the world's best cue makers at a black tie elegant affair. Jerry then enlisted help from one of his best friends and fellow cue maker Thomas Wayne and LA fashion photographer Chuck Montique. The Showcase of American Cue Art came to life at The Biltmore Hotel in Los Angeles California on Dec 8th 1995 (the following year the name was changed to The Gallery of American Cue Art).
            </p>
            <div class="mt-6 max-w-2xl mx-auto">
              <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
                <iframe
                  class="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/rSxnM6866Og"
                  title="History of The Gallery of American Cue Art"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>

          <div class="space-y-3 md:space-y-4">
            <h2 class="text-xl md:text-2xl font-semibold text-ink">Pool & First Cue</h2>
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

          <div class="space-y-3 md:space-y-4">
            <h2 class="text-xl md:text-2xl font-semibold text-ink">
              Birth of McWorter Cues
            </h2>
            <p>
              After returning from a Mormon mission (1983-1985) and facing California's construction
              industry downturn, Jerry saw the need for simple, affordable player-style cues. When
              friend John Robinson declined to make his design, saying "there's too much work for
              too little money," Jerry decided to make it himself.
            </p>
            <p>
              Working 70-80 hours a week, out of money with rent late, Jerry sold his first cue for
              $200 in late 1988. McWorter Cues was officially in business.
            </p>
          </div>

        </div>
      </div>

      <!-- Interviews and Podcasts Section -->
      <div class="w-full mt-12 md:mt-16 space-y-8 md:space-y-12">
        <SilverTitle title="Interviews and Podcasts" class="mb-6 md:mb-8" />
        <div class="space-y-8 md:space-y-12">
          <!-- Landscape Videos Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <!-- First Interview Video -->
            <div>
              <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
                <iframe
                  class="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/eY-3BSadkIs"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <!-- Second Interview Video -->
            <div>
              <div class="relative w-full bg-black rounded overflow-hidden" style="padding-bottom: 56.25%">
                <iframe
                  class="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/wGy8_-vNSrM"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>

          <!-- Portrait Videos Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <!-- Craftsmanship in Action -->
            <div class="flex flex-col items-center">
              <div class="relative w-full max-w-[267px] bg-black rounded overflow-hidden" style="padding-bottom: 178.28%">
                <iframe
                  class="absolute inset-0 w-full h-full"
                  src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1786277435410476%2F&show_text=false&width=267&t=0"
                  style="border: none; overflow: hidden"
                  scrolling="no"
                  frameborder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowfullscreen="true"
                ></iframe>
              </div>
            </div>

            <!-- Behind the Scenes -->
            <div class="flex flex-col items-center">
              <div class="relative w-full max-w-[268px] bg-black rounded overflow-hidden" style="padding-bottom: 178.28%">
                <iframe
                  class="absolute inset-0 w-full h-full"
                  src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F854252153684047%2F&show_text=false&width=268&t=0"
                  style="border: none; overflow: hidden"
                  scrolling="no"
                  frameborder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowfullscreen="true"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-ink-100/20 pt-6 mt-12 md:mt-16">
        <p class="text-ink-200 font-mono text-xs md:text-sm text-center">
          Timeless performance. Uncompromising quality.
        </p>
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
