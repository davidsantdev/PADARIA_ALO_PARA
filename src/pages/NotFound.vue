<script setup>
import { vReveal } from '../directives/reveal'
</script>

<template>
  <section class="min-h-[70vh] flex items-center justify-center px-6 pt-24">
    <div v-reveal class="text-center max-w-md">
      <p class="font-display text-8xl font-semibold text-orange/70">404</p>
      <h1 class="font-display text-2xl md:text-3xl font-semibold mt-4">
        Essa fatia acabou
      </h1>
      <p class="mt-3 text-inkSoft leading-relaxed">
        A página que você procura não existe ou foi movida. Que tal voltar para o forno?
      </p>
      <router-link
        to="/"
        class="btn-shine mt-8 inline-flex items-center gap-2 bg-orange text-ink font-semibold px-6 py-3 rounded-full hover:bg-orangeD hover:text-cream transition-colors"
      >
        Voltar ao início
      </router-link>
    </div>
  </section>
</template>
