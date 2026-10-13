<script setup>
import { vReveal } from '../directives/reveal'

defineProps({
  kicker: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  center: { type: Boolean, default: false },
})
</script>

<template>
  <div v-reveal :class="center ? 'text-center' : ''">
    <p v-if="kicker" class="text-xs tracking-widest uppercase text-bronze font-bold mb-3">
      {{ kicker }}
    </p>
    <h2 class="h-display text-4xl md:text-6xl">
      <slot />
    </h2>
    <p
      v-if="subtitle"
      class="mt-4 text-inkSoft leading-relaxed"
      :class="center ? 'max-w-xl mx-auto' : 'max-w-md'"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
