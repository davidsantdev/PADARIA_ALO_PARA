<script setup>
defineProps({
  kicker: { type: String, default: '' },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <section class="relative pt-36 pb-16 px-6 overflow-hidden grain bg-plum text-cream">
    <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-orange/10 float-slower"></div>
    <div class="absolute -left-10 bottom-0 w-40 h-40 rounded-full bg-yolk/10 float-slow"></div>
    <div class="max-w-6xl mx-auto text-center relative">
      <p v-if="kicker" class="text-xs tracking-widest uppercase text-orange mb-4">{{ kicker }}</p>
      <h1 class="font-display text-4xl md:text-5xl font-semibold leading-tight">
        <slot />
      </h1>
      <p v-if="subtitle" class="mt-4 text-cream/70 max-w-xl mx-auto leading-relaxed">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>
