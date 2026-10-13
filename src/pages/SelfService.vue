<script setup>
import { vReveal } from '../directives/reveal'
import PageHero from '../components/PageHero.vue'
import Doodle from '../components/Doodle.vue'
import { selfServiceItems, selfServicePrice } from '../data/selfService'

const steps = [
  { text: 'Escolha a bandeja e monte seu prato com os itens do dia.', tint: 'bg-peach' },
  { text: 'Pese no balcão self-service.', tint: 'bg-sky' },
  { text: 'Pague e aproveite, fresquinho.', tint: 'bg-blush' },
]
</script>

<template>
  <div>
    <PageHero kicker="Monte o seu prato" subtitle="Salgados e bolos fresquinhos, pesados na hora — você escolhe a combinação.">
      <span class="hl">Self-Service</span>
    </PageHero>

    <section class="py-12 md:py-16 px-6">
      <div class="max-w-6xl mx-auto">
        <div v-reveal class="flex justify-center mb-14">
          <p class="relative h-display text-3xl md:text-5xl bg-sun border-2 border-ink rounded-full px-8 pt-2 pb-3 shadow-pop -rotate-2">
            {{ selfServicePrice }}
            <Doodle name="sparkle" class="absolute -right-4 -top-5 w-8 h-8 text-coral" />
          </p>
        </div>

        <!-- flex + justify-center: a última linha (10 itens em 4 colunas) fica centralizada -->
        <div class="flex flex-wrap justify-center gap-5 md:gap-6">
          <article
            v-for="(item, i) in selfServiceItems"
            :key="i"
            v-reveal
            class="card-lift w-[calc(50%-0.625rem)] md:w-[calc(25%-1.125rem)]"
          >
            <div class="squircle h-36 md:h-44 flex items-center justify-center overflow-hidden" :style="{ background: item.bg }">
              <img
                :src="item.icon"
                :alt="item.name"
                loading="lazy"
                decoding="async"
                class="max-w-[200px] w-full h-full object-contain p-2 drop-shadow-md"
              />
            </div>
            <h3 class="h-display text-xl md:text-2xl text-center mt-3 px-1">{{ item.name }}</h3>
          </article>
        </div>
      </div>
    </section>

    <section class="px-4 md:px-6 pb-10">
      <div class="max-w-6xl mx-auto bg-white squircle-lg shadow-card px-6 md:px-12 py-12 md:py-16">
        <h2 v-reveal class="h-display text-4xl md:text-6xl text-center">
          Como <span class="hl">funciona</span>
        </h2>
        <div class="mt-10 grid md:grid-cols-3 gap-5">
          <div
            v-for="(step, i) in steps"
            :key="i"
            v-reveal
            class="squircle-sm p-7"
            :class="step.tint"
          >
            <p class="h-display text-7xl leading-none">{{ i + 1 }}</p>
            <p class="mt-3 text-ink/80 leading-relaxed">{{ step.text }}</p>
          </div>
        </div>
        <div class="text-center mt-10">
          <router-link to="/cardapio" class="btn-pill btn-pill--ghost">Ver cardápio completo</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
