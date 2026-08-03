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
    <p v-if="kicker" class="text-xs tracking-widest uppercase text-orangeD font-semibold mb-3">
      {{ kicker }}
    </p>
    <h2 class="font-display text-3xl md:text-4xl font-semibold leading-tight">
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
