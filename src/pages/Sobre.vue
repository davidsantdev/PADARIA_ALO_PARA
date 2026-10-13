<script setup>
import { vReveal } from '../directives/reveal'
import PageHero from '../components/PageHero.vue'
import Doodle from '../components/Doodle.vue'
import boloImg2 from '../public/bolo2.webp'

const philosophy = [
  'Sempre quentinho',
  'Manteiga e ovos locais',
  'Produtos do melhor mercado da região',
  'Fermentação longa, fermento mínimo',
  'Pequenos lotes, atenção total',
  'Sem atalhos — só técnica e tempo',
]

const timeline = [
  {
    title: 'A massa',
    text: 'Farinha, água, sal e tempo. Fermentamos devagar para desenvolver sabor de verdade.',
    doodle: 'wheat',
    tint: 'bg-peach',
  },
  {
    title: 'As mãos',
    text: 'Laminamos a manteiga e moldamos cada peça manualmente, lote a lote.',
    doodle: 'croissant',
    tint: 'bg-sky',
  },
  {
    title: 'O forno',
    text: 'Assamos em pequenas fornadas, do amanhecer até a noite, sempre fresquinho.',
    doodle: 'steam',
    tint: 'bg-blush',
  },
]
</script>

<template>
  <div>
    <PageHero kicker="Nossa história" subtitle="Paciência, sabor e nutrição em cada fornada.">
      Filosofia da <span class="hl">Massa</span>
    </PageHero>

    <section class="py-14 md:py-20 px-6">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div v-reveal="'left'" class="relative">
          <div class="squircle-lg overflow-hidden aspect-[5/4] relative border-2 border-ink shadow-pop -rotate-2">
            <img
              :src="boloImg2"
              alt="Bolo de chocolate com morangos da Padaria Alô Pará"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <span class="sticker bg-coral text-ink absolute -bottom-4 right-4 md:right-8 text-lg" style="--r: 5deg">Feito do zero</span>
        </div>

        <div v-reveal="'right'">
          <Doodle name="squiggle" class="w-16 h-6 text-sky mb-4" />
          <h2 class="h-display text-4xl md:text-6xl">Por que fazemos <span class="hl">assim</span></h2>
          <p class="mt-5 text-inkSoft leading-relaxed max-w-md">
            Acreditamos que pão de verdade não tem pressa. Cada etapa — da escolha dos ingredientes ao
            tempo de fermentação — existe para um único objetivo: um sabor que você sente desde a
            primeira mordida.
          </p>
          <ul class="mt-7 space-y-3">
            <li v-for="(item, i) in philosophy" :key="i" v-reveal class="flex items-center gap-3 font-medium">
              <svg class="draw-check shrink-0" width="26" height="26" viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="9" fill="#FFDD4A" stroke="#2B1713" stroke-width="1.4" />
                <path d="M6 10.5l2.5 2.5L14 7" stroke="#2B1713" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="px-4 md:px-6 pb-10">
      <div class="max-w-6xl mx-auto bg-white squircle-lg shadow-card px-6 md:px-12 py-12 md:py-16">
        <div v-reveal class="text-center mb-12">
          <p class="text-xs tracking-widest uppercase text-bronze font-bold mb-3">Do trigo à mesa</p>
          <h2 class="h-display text-4xl md:text-6xl">
            Como nasce cada <span class="hl">fornada</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-5">
          <div
            v-for="(step, i) in timeline"
            :key="i"
            v-reveal
            class="card-lift squircle p-8"
            :class="step.tint"
          >
            <div class="flex items-start justify-between">
              <p class="h-display text-7xl leading-none">0{{ i + 1 }}</p>
              <Doodle :name="step.doodle" class="w-12 h-12 text-ink/70" />
            </div>
            <h3 class="h-display text-3xl mt-4">{{ step.title }}</h3>
            <p class="mt-2 text-ink/75 leading-relaxed">{{ step.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 md:px-6 pb-6">
      <div
        v-reveal
        class="on-dark max-w-4xl mx-auto bg-plum text-cream squircle-lg px-6 py-12 text-center"
      >
        <h2 class="h-display text-4xl md:text-5xl">
          Quer sentir o gosto dessa <span class="hl">história</span>?
        </h2>
        <router-link to="/cardapio" class="btn-pill mt-7">Ver cardápio</router-link>
      </div>
    </section>
  </div>
</template>
