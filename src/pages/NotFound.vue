<script setup>
import { vReveal } from '../directives/reveal'
import Doodle from '../components/Doodle.vue'
</script>

<template>
  <section class="min-h-[65vh] flex items-center justify-center px-6 py-16">
    <div v-reveal class="text-center max-w-md relative">
      <Doodle name="donut" class="absolute -left-14 top-2 w-20 h-20 text-coral/70 -rotate-12 float-slow" />
      <p class="h-display text-[7rem] md:text-[9rem] leading-none relative inline-block">
        404
        <span class="sticker bg-leaf text-base absolute -top-2 -right-8" style="--r: 8deg">Ops!</span>
      </p>
      <h1 class="h-display text-3xl md:text-4xl mt-2">Essa fatia acabou</h1>
      <p class="mt-4 text-inkSoft leading-relaxed">
        A página que você procura não existe ou foi movida. Que tal voltar para o forno?
      </p>
      <router-link to="/" class="btn-pill mt-8">Voltar ao início</router-link>
    </div>
  </section>
</template>
