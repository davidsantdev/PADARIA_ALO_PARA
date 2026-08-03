<script setup>
import { vReveal } from '../directives/reveal'
import { isSvgMarkup } from '../utils/media'
import ProductCard from '../components/ProductCard.vue'
import PageHeading from '../components/PageHeading.vue'
import boloImg from '../public/bolo.webp'
import bisc from '../public/bisc.webp'
import tortaFrango from '../public/torta-frango.webp'
import { products } from '../data/products'

const features = [
  {
    title: 'Sempre quentinho',
    desc: 'Fornadas frescas do amanhecer até a noite.',
    icon: 'M8 3v3M16 3v3M4 9h16M5 9h14l-1 11H6L5 9Z',
  },
  {
    title: 'Ingredientes honestos',
    desc: 'Manteiga, ovos e farinha do melhor supermercado da região.',
    icon: 'M12 3c3 3 5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 2-6 5-9Z',
  },
  {
    title: 'Feito em pequenos lotes',
    desc: 'Técnica, paciência e sabor que você sente.',
    icon: 'M4 20h16M6 20V10l6-6 6 6v10M10 20v-6h4v6',
  },
]

const explore = [
  {
    title: 'Cardápio',
    desc: 'Mais de 80 opções entre pães, bolos e doces.',
    to: '/cardapio',
    bg: 'linear-gradient(160deg,#F2A65A,#C2703A)',
    img: bisc,
  },
  {
    title: 'Self-Service',
    desc: 'Salgados e bolos por peso, feitos na hora.',
    to: '/self-service',
    bg: 'linear-gradient(160deg,#F3C349,#E9A93B)',
    img: tortaFrango,
  },
  {
    title: 'Nossa história',
    desc: 'Conheça a filosofia por trás da massa.',
    to: '/sobre',
    bg: 'linear-gradient(160deg,#8C4A22,#3A2A24)',
  },
]
</script>

<template>
  <!-- HERO -->
  <section class="relative pt-32 pb-20 px-6 overflow-hidden grain">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p v-reveal class="text-xs tracking-widest uppercase text-inkSoft mb-4">Feito Hoje</p>
        <h1 v-reveal class="font-display text-5xl md:text-6xl font-semibold leading-[1.05]">
          Delicias para <br />
          <span class="italic text-orange">o seu dia</span>
        </h1>
        <p v-reveal class="mt-6 text-inkSoft max-w-md leading-relaxed">
          Pães, salgados e bolos premium feitos do zero. Os ingredientes do melhor supermercado da região.
        </p>
        <div v-reveal class="mt-8 flex items-center gap-4">
          <router-link
            to="/cardapio"
            class="btn-shine glow-pulse inline-flex items-center gap-2 bg-orange text-ink font-semibold px-6 py-3 rounded-full hover:bg-orangeD hover:text-cream transition-colors"
          >
            Ver Cardápio
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </router-link>
        </div>
      </div>

      <div v-reveal="'right'" class="relative">
        <div
          class="rounded-3xl h-80 md:h-96 relative overflow-hidden flex items-center justify-center"
          style="background: linear-gradient(160deg, #F2A65A 0%, #C2703A 50%, #9C4F26 100%);
box-shadow: 0 4px 12px rgba(156, 79, 38, 0.35), inset 0 1px 0 rgba(255,255,255,0.15);"
        >
          <div class="crumb absolute w-2 h-2 rounded-full bg-yolk" style="left: 20%; animation-delay: 0s"></div>
          <div class="crumb absolute w-1.5 h-1.5 rounded-full bg-cream" style="left: 55%; animation-delay: 1.4s"></div>
          <div class="crumb absolute w-2 h-2 rounded-full bg-yolk" style="left: 75%; animation-delay: 2.6s"></div>

          <img
            :src="boloImg"
            alt="Bolo fresquinho da Padaria Alô Pará"
            width="300"
            height="300"
            fetchpriority="high"
            decoding="async"
            class="float-slow relative z-10 w-[300px] md:w-74 md:h-74 object-contain drop-shadow-2xl"
          />
        </div>
        <div
          class="absolute -top-6 -left-6 bg-cream rounded-full w-20 h-20 flex flex-col items-center justify-center text-[10px] font-semibold text-center shadow-lg spin-slow border border-ink/10"
        >
          100%<br />NATURAL
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="px-6 -mt-2">
    <div class="max-w-6xl mx-auto grid sm:grid-cols-3 gap-5">
      <div
        v-for="(f, i) in features"
        :key="i"
        v-reveal
        class="card-lift bg-white rounded-2xl p-6 shadow-[0_10px_30px_-18px_rgba(36,28,23,.25)] border border-ink/5"
      >
        <div class="icon-badge w-11 h-11 rounded-full flex items-center justify-center mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C97A2B" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" :d="f.icon" />
          </svg>
        </div>
        <h3 class="font-display font-semibold text-lg">{{ f.title }}</h3>
        <p class="text-sm text-inkSoft mt-1 leading-relaxed">{{ f.desc }}</p>
      </div>
    </div>
  </section>

  <!-- PRODUCTS -->
  <section class="py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <PageHeading kicker="Cardápio do dia">
        Produtos feitos <span class="italic text-orange">na hora</span>
      </PageHeading>
      <div class="grid md:grid-cols-3 gap-6 mt-12">
        <ProductCard v-for="(p, i) in products" :key="i" :product="p" :reveal="i % 2 ? 'right' : 'left'" />
      </div>
    </div>
  </section>

  <!-- EXPLORE -->
  <section class="py-24 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
      <PageHeading kicker="Explore" center subtitle="Descubra tudo o que preparamos para o seu dia.">
        O que você vai <span class="italic text-orange">encontrar aqui</span>
      </PageHeading>

      <div class="grid md:grid-cols-3 gap-6 mt-12">
        <router-link
          v-for="(e, i) in explore"
          :key="i"
          :to="e.to"
          v-reveal
          class="card-lift group rounded-2xl overflow-hidden relative h-64 flex flex-col justify-end p-6 text-cream"
          :style="{ background: e.bg }"
        >
          <img
            v-if="e.img"
            :src="e.img"
            alt=""
            loading="lazy"
            decoding="async"
            class="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"></div>
          <div class="relative">
            <h3 class="font-display text-xl font-semibold">{{ e.title }}</h3>
            <p class="text-sm text-cream/75 mt-1">{{ e.desc }}</p>
            <span class="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-orange">
              Ver mais
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </section>

  <!-- PHILOSOPHY CTA -->
  <section class="py-24 px-6">
    <div
      v-reveal
      class="max-w-6xl mx-auto bg-plum text-cream rounded-3xl p-10 md:p-14 relative overflow-hidden grid md:grid-cols-2 gap-10 items-center"
    >
      <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-orange/10 float-slower"></div>
      <div>
        <h2 class="font-display text-3xl md:text-4xl font-semibold leading-tight">
          Paciência, sabor e <span class="italic text-orange">nutrição</span>
        </h2>
        <p class="mt-4 text-cream/70 leading-relaxed max-w-md">
          Fermentação longa, fermento mínimo e ingredientes honestos. Técnica e carinho em cada
          fornada — conheça a nossa filosofia.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row md:justify-end gap-4">
        <router-link
          to="/sobre"
          class="border border-cream/30 text-center px-6 py-3 rounded-full hover:bg-cream/10 transition-colors"
        >
          Nossa história
        </router-link>
        <router-link
          to="/cardapio"
          class="btn-shine bg-orange text-ink text-center font-semibold px-6 py-3 rounded-full hover:bg-orangeD hover:text-cream transition-colors"
        >
          Ver Cardápio
        </router-link>
      </div>
    </div>
  </section>
</template>
