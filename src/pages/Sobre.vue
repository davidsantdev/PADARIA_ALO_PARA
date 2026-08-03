<script setup>
import { vReveal } from '../directives/reveal'
import PageHero from '../components/PageHero.vue'
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
  { title: 'A massa', text: 'Farinha, água, sal e tempo. Fermentamos devagar para desenvolver sabor de verdade.' },
  { title: 'As mãos', text: 'Laminamos a manteiga e moldamos cada peça manualmente, lote a lote.' },
  { title: 'O forno', text: 'Assamos em pequenas fornadas, do amanhecer até a noite, sempre fresquinho.' },
]
</script>

<template>
  <div>
  <PageHero kicker="Nossa história" subtitle="Paciência, sabor e nutrição em cada fornada.">
    Filosofia da <span class="italic text-orange">Massa</span>
  </PageHero>

  <section class="py-20 px-6">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div v-reveal="'left'" class="rounded-3xl overflow-hidden h-80 md:h-[420px] relative">
        <img
          :src="boloImg2"
          alt="Moldando a massa na Padaria Alô Pará"
          loading="lazy"
          decoding="async"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div v-reveal="'right'">
        <h2 class="font-display text-3xl font-semibold">Por que fazemos assim</h2>
        <p class="mt-4 text-inkSoft leading-relaxed max-w-md">
          Acreditamos que pão de verdade não tem pressa. Cada etapa — da escolha dos ingredientes ao
          tempo de fermentação — existe para um único objetivo: um sabor que você sente desde a
          primeira mordida.
        </p>
        <ul class="mt-6 space-y-3">
          <li v-for="(item, i) in philosophy" :key="i" v-reveal class="flex items-center gap-3 text-ink/90">
            <svg class="draw-check shrink-0" width="20" height="20" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="9" fill="#F5C84C" opacity=".5" />
              <path d="M6 10.5l2.5 2.5L14 7" stroke="#C97A2B" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="py-20 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
      <div v-reveal class="text-center mb-14">
        <p class="text-xs tracking-widest uppercase text-orangeD font-semibold mb-3">Do trigo à mesa</p>
        <h2 class="font-display text-3xl md:text-4xl font-semibold">
          Como nasce cada <span class="italic text-orange">fornada</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(step, i) in timeline"
          :key="i"
          v-reveal
          class="card-lift bg-cream/60 rounded-2xl p-8 border border-ink/5"
        >
          <p class="font-display text-4xl text-orange/60 font-semibold mb-4">0{{ i + 1 }}</p>
          <h3 class="font-display font-semibold text-lg">{{ step.title }}</h3>
          <p class="text-sm text-inkSoft mt-2 leading-relaxed">{{ step.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="py-20 px-6">
    <div v-reveal class="max-w-4xl mx-auto text-center">
      <h2 class="font-display text-2xl md:text-3xl font-semibold">
        Quer sentir o gosto dessa <span class="italic text-orange">história</span>?
      </h2>
      <router-link
        to="/cardapio"
        class="btn-shine mt-6 inline-flex items-center gap-2 bg-orange text-ink font-semibold px-6 py-3 rounded-full hover:bg-orangeD hover:text-cream transition-colors"
      >
        Ver Cardápio
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </router-link>
    </div>
  </section>
  </div>
</template>
