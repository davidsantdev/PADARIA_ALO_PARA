<script setup>
import { vReveal } from '../directives/reveal'
import PageHero from '../components/PageHero.vue'
import { selfServiceItems, selfServicePrice } from '../data/selfService'
</script>

<template>
  <div>
  <PageHero kicker="Monte o seu prato" subtitle="Salgados e bolos fresquinhos, pesados na hora — você escolhe a combinação.">
    <span class="italic text-orange">Self-Service</span>
  </PageHero>

  <section class="py-16 px-6">
    <div class="max-w-6xl mx-auto">
      <div v-reveal class="flex flex-col items-center text-center mb-12">
        <p class="text-lg font-semibold text-orangeD bg-orange/10 px-5 py-2 rounded-full">
          {{ selfServicePrice }}
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="(item, i) in selfServiceItems"
          :key="i"
          v-reveal
          class="card-lift rounded-2xl overflow-hidden bg-white shadow-md"
        >
          <div class="h-32 relative flex items-center justify-center" :style="{ background: item.bg }">
            <img
              :src="item.icon"
              :alt="item.name"
              loading="lazy"
              decoding="async"
              class="w-[200px] h-25 object-contain drop-shadow-md"
            />
          </div>
          <div class="p-3 text-center">
            <p class="text-sm font-semibold text-ink leading-tight">{{ item.name }}</p>
          </div>
        </div>
      </div>

      <div v-reveal class="mt-16 max-w-2xl mx-auto text-center">
        <h2 class="font-display text-2xl font-semibold">Como funciona</h2>
        <div class="mt-6 grid sm:grid-cols-3 gap-6 text-sm text-inkSoft">
          <div>
            <p class="text-2xl font-display text-orange font-semibold mb-1">1</p>
            Escolha a bandeja e monte seu prato com os itens do dia.
          </div>
          <div>
            <p class="text-2xl font-display text-orange font-semibold mb-1">2</p>
            Pese no balcão self-service.
          </div>
          <div>
            <p class="text-2xl font-display text-orange font-semibold mb-1">3</p>
            Pague e aproveite, fresquinho.
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>
