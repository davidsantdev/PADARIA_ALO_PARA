<script setup>
import Doodle from './Doodle.vue'

defineProps({
  kicker: { type: String, default: '' },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <section class="px-4 md:px-6 pt-2 pb-6">
    <div
      class="relative max-w-6xl mx-auto bg-white squircle-lg shadow-card overflow-hidden px-6 py-12 md:py-16 text-center"
    >
      <!-- rabiscos decorativos -->
      <Doodle name="wheat" class="absolute -left-2 bottom-2 w-24 h-24 md:w-36 md:h-36 text-ink/15 -rotate-12" />
      <Doodle name="cookie" class="absolute right-6 top-6 w-14 h-14 md:w-20 md:h-20 text-coral/70 rotate-12 float-slow" />
      <Doodle name="sparkle" class="absolute left-[18%] top-8 w-6 h-6 text-sky" />
      <Doodle name="baguette" class="absolute right-[10%] bottom-4 w-16 h-16 md:w-24 md:h-24 text-ink/15" />

      <div class="relative">
        <p v-if="kicker" class="mb-5">
          <span class="sticker bg-leaf" style="--r: -3deg">{{ kicker }}</span>
        </p>
        <h1 class="h-display text-5xl sm:text-6xl md:text-7xl">
          <slot />
        </h1>
        <p v-if="subtitle" class="mt-5 text-inkSoft max-w-xl mx-auto leading-relaxed text-balance">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </section>
</template>
